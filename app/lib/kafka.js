const kafka = require("simple-kafka-producer");
const config = require("../config");

const kafkaInterop = {

    init: () => {
        kafka.configure(config.kafka)
        kafka.initProducer();
    },

    handleArray: (statementArray, dryRun=false)=> {

        let ids = [];

        for (let statement of statementArray) {
            ids.push(statement.id);
            if (!dryRun)
                kafka.publishStatement(statement);
        }

        return ids;
    },

    handleStatement: (statement, dryRun=false) => {
        if (!dryRun)
            kafka.publishStatement(statement);
        return [payload.id];
    },

    handlePayload: (payload, dryRun=false) => {
        if (Array.isArray(payload))
            kafkaInterop.handleArray(payload, dryRun);
        else 
            kafkaInterop.handleStatement(payload, dryRun);
    },

    publishStatement: (statement) => kafka.produceMessage(config.kafka.topic, statement),
}

module.exports = kafkaInterop;