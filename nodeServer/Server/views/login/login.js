
function loginSubmit(){
    console.log("submit");
    $.ajax({
        url:"/login/sign",
        method:'POST',
        dataType: "json",
        data: '{id:"test", password: "testpassword" }'
    }).done( (req)=>{
        console.log("done");
        console.log( JSON.stringify( req , null ,4 ));
    }).fail( (xhr, status, errorThrown)=> {
        console.log("fail");
        console.log(errorThrown);
        console.log(status);
    })

}