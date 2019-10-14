

function loginSubmit(){
    let data = {id: $("#ID").val(), password: $("#Password").val() };
    console.log("submit");
    $.ajax({
        url: "/login/sign",
        type: "post",
        accept: "application/json",
        contentType: "application/json; charset=utf8",
        data: JSON.stringify(data),
        dateType : "json",
        success: (data)=>{
            console.log( JSON.stringify(data, null ,4));
            if( data.login ) location.href = "/dashboard";
            else alert("Login Error.");
        }
    });
}