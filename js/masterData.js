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