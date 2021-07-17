module.exports = (client) => {
  const topic = client.topic('translate');

  topic.create((err) => {console.error('createTopErr');});
  topic.createSubscription('translateSubscription',
      (err) => {console.error('createSubErr');});
};
