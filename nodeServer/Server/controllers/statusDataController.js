var StatusData = require("../model/statusData");

var statusDataController = {
    statusRecord : function( dataStr ){
        console.log( JSON.stringify(dataStr , null , 4 ) ) ;
        let data = dataStr;
        let statusData = new StatusData();
        statusData.temp = data.temp;
        statusData.humi = data.humi;
        statusData.dust = data.dust;
        statusData.time = new Date();

        statusData.save((err)=> {
            if(err) return 0;
            else return 1;
        });
    }
}

module.exports = statusDataController;