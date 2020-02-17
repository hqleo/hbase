$(document).ready(function() {
  // com init
  com = !window.com ? {} : window.com;
  com["loginForm"] = new Vue({
    el: "#loginForm",
    data: {
      labelPosition: "right",
      formData: {
        userId: "",
        password: "",
        checkCode: ""
      }
    },
    methods: {
      //获取验证码
      act_getVerifyCode: function() {
        console.log("act_getVerifyCode");
      },
      //登陆
      act_login: function() {
        console.log("act_login");
      }
    }
  });
});
