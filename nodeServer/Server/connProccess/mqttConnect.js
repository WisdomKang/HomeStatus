//MQTT Connect setting
var mqtt = require("mqtt");
var statusDataController = require('../controllers/StatusDataController');
var mqttOptions = {
    clientId: "guest",
    username: "guest",
    password: "guest",
}

var logger = require("../LogModule");
const label = { label : "MqttConnect"};
var mqttClient;

function Connect(){
    mqttClient = mqtt.connect("mqtt://192.168.12.9:1883", mqttOptions);
    mqttClient.on("connect" , ()=>{
        logger.info("Connected to MQTT broker", label);
        mqttClient.subscribe("home/status", (err)=>{
            if(err) logger.error("Check Connection or Setting" , label);
            else logger.info("Subscribing 'home/status'", label);
        });
    });

    mqttClient.on('reconnect', ()=>{
        logger.info("Reconnecting to MQTT broker", label);
    })

    mqttClient.on("message" , ( topic , message )=>{
        logger.info("message :" + message , label);
        statusDataController.statusRecord(message);
    });
    
    mqttClient.on("error", (err)=>{
        logger.error(err , label);
    });
}

var MqttSetConn = {
    MqttConnect : Connect,
    client : mqttClient
}

module.exports = MqttSetConn;