var btnLogin = document.getElementById('do-login');
var idLogin = document.getElementById('login');

btnLogin.onclick = function(){
    var userId = document.getElementById('username').value;
    var userPass = document.getElementById('password').value;
    if (userId == 'admin' && userPass == 'admin') {
        $(location).attr('href', "Area-wise-Sec-unit-details.html");
    } else {
        document.getElementById("errormsg").innerHTML = "Please Check, You have entered an invalid User ID or Password";
        $('#username').val('');
        $('#password').val('');
    }
   
    

    // $.ajax({
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": sessionStorage.getItem("tokenType")+" "+sessionStorage.getItem("accessToken"),
    //     },
    //         type: "POST",
             
    //         url: "http://localhost:8090/EMSPro/api/auth/signin",
    //         timeout: 15000,
    //         data:JSON.stringify(loginCridential),
    //         success: function(res) {
    //             if (res && res.status === 401) {
    //                 document.getElementById("errormsg").innerHTML = res.message;
    //             } else if(res.username == null || res.username == ""){
    //                 document.getElementById("errormsg").innerHTML =  "Please Check, You have entered an invalid User ID or Password";
    //             }else {
    //                 console.log(res,'res');
    //         sessionStorage.setItem("user", res.username);
    //          sessionStorage.setItem("accessToken",res.accessToken); 
    //         sessionStorage.setItem("tokenType", res.tokenType);
    //         sessionStorage.setItem("userRole", res.roleName);
    //         $(location).attr('href', "home.html");
                 
    //             }
    //         },
    //         error: function() {
    //             document.getElementById("errormsg").innerHTML = "Please Check, You have entered an invalid User ID or Password";
    //             $('#user-name').val('');
    //             $('#pwd').val('');
    //         }
    
    //     });
}

var input = document.getElementById("password");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("do-login").click();
    }
});