console.log("Hello I'm dashboard!");

function refreshStatus(){
    $.ajax({
        url: "/home/status",
        type: "get",
        accept: "application/json",
        contentType: "application/json; charset=utf8",
        dateType : "json",
        success: (data)=>{
            console.log( JSON.stringify(data, null ,4));
            var statusData = data[0];

            $("#temp").html(statusData.temp+"℃");
            $("#humi").html(statusData.humi+"%");
            $("#dust").html(statusData.dust+"㎍/㎣");
            let uptTime = new Date(statusData.time);
            let timeStr = uptTime.getHours() +":"+ uptTime.getMinutes();

            $("#uptTime").html("update time: "+timeStr);
        }
    });
}

function onLed( id , value){
    let data = { id : id, value : value };
    $.ajax({
        url: "/home/control",
        type: "post",
        accept: "application/json",
        contentType: "application/json; charset=utf8",
        dateType : "json",
        data: JSON.stringify(data),
        success: (data)=>{
            console.log(data);
        }
    });
}
$(document).ready(function(){
    refreshStatus();
    setInterval( refreshStatus, 60000);
});