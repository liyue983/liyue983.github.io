$(document).ready(function () {
    $("#clear").click(function () { $("#id").val("") })
    $("#send").click(function () {
        $("#loading").show();
        $.ajax({
            type: "POST",
            url: "https://service-05nvlcg7-1256919413.bj.apigw.tencentcs.com/release/APIService-1619771401",
            data: JSON.stringify({
                searchMethod: $('#searchByName').prop('checked') ? "Name" : "Table",
                Id: $("#id").val(),
                isAll: ($('#isAll').prop('checked')) ? 1 : 0
            }),
            dataType: "json",
            success: function (result) {
                $("#loading").hide();
                console.log(result)
                $('#box').html(JSON.stringify(result));
                if ("error" in result || "errorMessage" in result) { $('#box').show(); console.log('error'); return }
                $('#box').hide();
                $("#results").html("");
                if (result.length == 0) { $("#results").html("未搜索到结果") }
                for (var i = 0, len = result.length; i < len; i++) {
                    $("#results").append("<li class=\"ui-border-t\"><p><span>" + result[i].devName + "  " + result[i].owner + "</span></p><h4>开始：" + result[i].start + "</h4><h4>结束：" + result[i].end + "</h4></li>");
                }
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