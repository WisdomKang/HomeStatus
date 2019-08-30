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
            var temp = $("#temp");
            var humi = $("#humi");
            var dust = $("#dust");
            var time = $("#uptTime");

            temp.html(statusData.temp+"℃");
            humi.html(statusData.humi+"%");
            dust.html(statusData.dust+"㎍/㎣");
            time.html("update time:"+statusData.time);
        }
    })
}
$(document).ready(function(){
    refreshStatus();
    setInterval( refreshStatus, 60000);
});