const pubsub = require('@google-cloud/pubsub');
const grpc = require('@grpc/grpc-js');

const [pubsubHost, pubsubPort] = process.env.PUBSUB_EMULATOR_HOST.split(':');

module.exports = new pubsub.PubSub({
  projectId: 'dummy',
  servicePath: pubsubHost,
  port: pubsubPort,
  sslCreds: grpc.credentials.createInsecure(),
});
