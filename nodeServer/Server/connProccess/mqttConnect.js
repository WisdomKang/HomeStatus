//MQTT Connect setting
var mqtt = require("mqtt");
var record = require("../controllers/recordDataController");
var mqttOptions = {
    clientId: "admin",
    username: "admin",
    password: "home4975",
}

var client;

var logger = require("../LogModule");
const label = { label : "MqttConnect"};

var MQTTConn = {
    connect : new Promise(function(resolve){
        client = mqtt.connect("mqtt://192.168.12.11:1883", mqttOptions);
        client.on("connect" , ()=>{
            logger.info("Connected to MQTT broker", label);
            client.subscribe("home/status", (err)=>{
                if(err) logger.error("Check Connection or Setting" , label);
                else logger.info("Subscribing 'home/status'", label);
            });
        });

        client.on('reconnect', ()=>{
            logger.info("Reconnecting to MQTT broker", label);
        });

        client.on("message" , ( topic , message )=>{
            record(message);
        });

        client.on("error", (err)=>{
            logger.error(err , label);
        });
        resolve();
    }),
    client : client
}

module.exports = MQTTConn;