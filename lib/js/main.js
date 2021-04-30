$(document).ready(function () {
    $("#send").click(function () {
        $.ajax({
            type: "POST",
            url: "https://service-05nvlcg7-1256919413.bj.apigw.tencentcs.com/release/APIService-1619771401",
            data: JSON.stringify({
                searchMethod: $('#search').val(),
                Id: $("#id").val(),
                isAll: ($('#isAll').prop('checked')) ? 1 : 0
            }),
            dataType: "json",
            success: function (result) {
                console.log(result)
                $('#box').html(JSON.stringify(result));
            }
        });
    });
    paramName = $.getUrlParam('name');
    if (paramName != null) {
        $("#id").val(paramName);
        $("#send").click()
    }
});



(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);