// @import jquery
/**
 * request 处理
 * @version v0.0.1
 * @type {{post: lib_quest.post, get: lib_quest.get}}
 */

var lib_quest = {
    /**
     *
     * @method get
     * @for lib_quest
     * @param {url} url 请求地址
     * @param {json} dataObject 数据对象如{"name":"张三"}
     * @param {function} successFunc(data) 请求成功处理函数
     * @param {function} errorFunc(data) 请求错误处理函数
     * @param {boolean} async 是否异步，默认值暂时为false
     */
    get: function (url, dataObject, successFunc, errorFunc, async) {
        if (!async) {
            async = false
        }
        $.ajax({
            type: 'GET',
            url: url,
            async: async,
            data: dataObject,
            success: successFunc,
            error: errorFunc
        });

    },
    /**
     *
     * @method post
     * @for lib_quest
     * @param {url} url 请求地址
     * @param {json} dataObject 数据对象如{"name":"张三"}
     * @param {function} successFunc(data) 请求成功处理函数
     * @param {function} errorFunc(data) 请求错误处理函数
     * @param {boolean} async 是否异步，默认值暂时为false
     */
    post: function (url, dataObject, successFunc, errorFunc, async) {
        if (!async) {
            async = false
        }
        $.ajax({
            type: 'POST',
            url: url,
            async: async,
            data: dataObject,
            success: successFunc,
            error: errorFunc
        });
    }
};