# cinequotes-translate-worker
Cinequotes Translate Worker

## Install
```bash
cd cinequotes-translate-worker
npm install
```

## Prerequisites
1) Make sure a Firestore emulator runs locally - ``host: 0.0.0.0``, ``port: 8505``
2) Make sure a PubSub emulator runs locally - ``host: 0.0.0.0``, ``port: 8085``

## Run
```bash
export PUBSUB_EMULATOR_HOST=0.0.0.0:8085
export FIRESTORE_EMULATOR_HOST=0.0.0.0:8505
node app.js
```