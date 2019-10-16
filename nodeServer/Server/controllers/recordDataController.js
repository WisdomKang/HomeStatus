const StatusData = require("../model/statusData");
var logger = require("../LogModule");

const label = {label: "recordDataController"};;

module.exports =  function( message ){
    try {
        let data = JSON.parse(message);
        let statusData = new StatusData();
        statusData.temp = data.temp;
        statusData.humi = data.humi;
        statusData.dust = data.dust.toFixed(2);
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
}