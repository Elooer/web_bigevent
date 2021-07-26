// 每次请求接口前会先调用这个函数
// 在这个函数中可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    // 统一为有权限的接口，设置 headers 请求头
    if (options.url.indexOf('/my/' !== -1)) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载 complete 回调函数 
    options.complete = function(res) {
        // console.log('执行l');
        // console.log(res);
        // 在complete回调函数中，可以用res.response.JSON拿到服务器相应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.强制清空 token
            localStorage.removeItem('token');
            // 2.强制跳转到登录页
            location.href = '/login.html';
        }
    }
})