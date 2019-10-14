//MQTT Connect setting
var mqtt = require("mqtt");
var record = require("../controllers/recordDataController");
var mqttOptions = {
    clientId: "guest",
    username: "guest",
    password: "guest",
}

var logger = require("../LogModule");
const label = { label : "MqttConnect"};

var mqttClient = mqtt.connect("mqtt://localhost:1883", mqttOptions);

mqttClient.on("connect" , ()=>{
    logger.info("Connected to MQTT broker", label);
    mqttClient.subscribe("home/status", (err)=>{
        if(err) logger.error("Check Connection or Setting" , label);
        else logger.info("Subscribing 'home/status'", label);
    });
});


mqttClient.on('reconnect', ()=>{
    logger.info("Reconnecting to MQTT broker", label);
});

mqttClient.on("message" , ( topic , message )=>{
    record(message);
});

mqttClient.on("error", (err)=>{
    logger.error(err , label);
});

module.exports.client = mqttClient;