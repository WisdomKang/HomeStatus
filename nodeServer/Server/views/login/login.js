
var data = {id:"test", password: "testpassword" };
function loginSubmit(){
    console.log("submit");
    $.ajax({
        url: "/login/sign",
        type: "post",
        accept: "application/json",
        contentType: "application/json; charset=utf8",
        data: JSON.stringify( data),
        dateType : "json",
        success: (data)=>{
            console.log( JSON.stringify(data, null ,4));
            if( data.login ) location.href = "/dashboard";
            else alert("Login Error.");
        }
    });
}