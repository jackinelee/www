function GetGroups(urlServer,access_token) {
    var _url = urlServer + 'api/usergroups';
    var result = undefined;
    $.ajax({
        type: 'GET',
        url: _url + '?access_token=' + access_token,
        crossDomain: true,
        //data: JSON.stringify(params),
        dataType: 'json',
        async: false,
        success: function (responseData, textStatus, jqXHR) {
            result = responseData;
        },
        error: function (responseData, textStatus, errorThrown) {
        }
    });
    return result;
}

function GetToken(urlServer,userid,password){
           var result="";
 
       try {
                               var params = {
                    "userid": userid,
                    "pswd": password
                };
                $.ajax({
                    type: 'POST',
                    url: urlServer + 'api/auth',
                    crossDomain: true,
                    data: JSON.stringify(params),
                    dataType: 'json',
                    success: function (o) {
                     result=o.token
                    },
                    error: function (Response) {
                        window.location.href = 'login.html';
                    }
                });
            } catch (error) {
                window.location.href = 'login.html';
            }
            return result;
}