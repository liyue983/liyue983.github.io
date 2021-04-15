//格式化时间戳
Date.prototype.format = function (format) {
    var date =
    {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};

userName = document.getElementById('username');
userId = document.getElementById('userid');
deptName = document.getElementById('deptname');
placeName = document.getElementById('placename');
formatTime = document.getElementById('formatTime')

userName.innerText = '张三';
userId.innerText = '123456765432123456';
deptName.innerText = '电子信息与光学工程学院';
placeName.innerText = '津南理科食堂一楼';
formatTime.innerText = (new Date()).format('yyyy.MM.dd hh:mm:ss');

setInterval("formatTime.innerText = (new Date()).format('yyyy.MM.dd hh:mm:ss');", 1000);
