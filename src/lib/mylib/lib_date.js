var lib_date = {
    register: function () {
        Date.prototype.format = function (formatStr) {
            var str = formatStr;
            var Week = ['日', '一', '二', '三', '四', '五', '六'];
            str = str.replace(/yyyy|YYYY/, this.getFullYear());
            str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
            str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
            return str;
        };
    },
    /**
     * 日期格式化（原型扩展或重载）
     * 格式 YYYY/yyyy/ 表示年份
     * MM/M 月份
     * dd/DD/d/D 日期
     * @method formatDate
     * @returns 日期字符串
     * @param {Date} date 日期
     * @param {string} formatString 模板格式
     */
    formatDate: function (date, formatString) {
        var str = formatString;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];
        str = str.replace(/yyyy|YYYY/, date.getFullYear());
        str = str.replace(/MM/, (date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1));
        str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
        return str;
    },
    demo: function () {
        var d1 = new Date();
        // alert(new Date().format("yyyy-MM-dd"));
        alert(this.formatDate(d1, "yyyy-mm-dd"));
    }
};