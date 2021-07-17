'use strict';

const nock = require('nock');

const translateDate = require('./translateData.json');

const init = () => {
  nock('https://translation.googleapis.com').
      post('/language/translate/v2/').
      reply(200, (uri, requestBody) => {
        const initialText = requestBody.q[0];

        const translateRow = translateDate.find(tr => {
          return Object.values(tr).indexOf(initialText) > -1;
        });

        let translateText = translateRow && translateRow[requestBody.target] ||
            initialText;
        let sourceLanguage = translateRow && Object.keys(translateRow).
            find(key => translateRow[key] === initialText) || 'en';

        return {
          'data': {
            'translations': [
              {
                'translatedText': translateText,
                'detectedSourceLanguage': sourceLanguage,
              },
            ],
          },
        };
      });
};

module.exports = {
  init,
};



