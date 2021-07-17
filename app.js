'use strict';

const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate({projectId: 'dummy'});

const pubsubClient = require('./resources/pubsubClient');
require('./resources/setupPubSub')(pubsubClient);

const firestoreClient = require('./resources/firestoreClient');

function listenForMessages() {
  const subscription = pubsubClient.topic('translate').
      subscription('translateSubscription');

  const messageHandler = async message => {
    let data = JSON.parse(message.data.toString());

    require('./resources/mockGoogleTranslate').init();

    const destLanguage = data.en ? "fr" : "en";
    const sourceText = data.en || data.fr;

    const [translation] = await translate.translate(sourceText, destLanguage);

    const updateObject = {};
    updateObject[destLanguage] = translation;

    await firestoreClient.collection('films').
        doc(data.filmId).
        collection('quotes').
        doc(data.quoteId).
        update(updateObject);

    console.log('processed');

    message.ack();
  };

  // Listen for new messages until timeout is hit
  subscription.on('message', (message) => messageHandler(message));
}

listenForMessages();
