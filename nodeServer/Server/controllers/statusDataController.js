const StatusData = require("../model/statusData");
var logger = require("../LogModule");
var client = require("../connProccess/mqttConnect").client;
const label = {label: "StatusController"};


var statusDataController = {
    statusSearch : function( req, res ){
        logger.info("Status Seaching.",label);
        StatusData.find( (err, data)=>{
            res.json(data);
        }).sort({ time: -1}).limit(1);
    },
    command : function( req, res ){
        let command = req.body.value+"";
        let topic = "home/control/" + req.body.id;
        client.publish(topic, command);
        res.json( {result: "OK"} );
    }
}
module.exports = statusDataController;