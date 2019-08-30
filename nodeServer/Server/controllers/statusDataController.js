const StatusData = require("../model/statusData");
var logger = require("../LogModule");
const label = {label: "StatusController"};
var mqttConnect = require("../connProccess/mqttConnect");

var statusDataController = {
    statusRecord : function( message ){
        try {
            let data = JSON.parse(message);
            let statusData = new StatusData();
            statusData.temp = data.temp;
            statusData.humi = data.humi;
            statusData.dust = data.dust;
            statusData.last_command = data.last_command;
            statusData.time = new Date();
            statusData.save((err ,data)=>{
                if(err){
                    logger.error(err, label);
                }else{
                    logger.info( "save data"+message , label);
                }
                
            });
        } catch (error) {
            logger.error(error, label);
        }
    },
    statusSearch : function( req, res ){
        logger.info("Status Seaching.",label);
        StatusData.find( (err, data)=>{
            console.log(data);
            res.json(data);
        }).sort({ time: -1}).limit(1);
    },
    command : function( req, res ){
        console.log("I'm command function");
        mqttConnect.client.publish("home/command", req.body);
    }
}

module.exports = statusDataController;