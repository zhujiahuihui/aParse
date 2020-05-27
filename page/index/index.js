var AParse = require('/util/aParse/aParse.js')

//   console.log(this)
console.log(AParse.aParse)
Page({
  data: {
	  AParse:AParse
  },
  onShow() {
   console.log('页面显示')
  },
  onLoad() {
	   let article = `
      <h3>
      <span style="color:red">钉钉小程序</span>
      <span style="color:green">富文本解析</span>
      <span style="color:blue">解决方案</span>
      </h3>
  `
  console.log(this,222222)
    /**
     * 使用说明：
    * AParse.AParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */

    let that = this;
    // AParse.aParse('article', 'html', article, that, 5);
 
    	// 获取免登授权码（这个方法api文档提供）
			dd.getAuthCode({
				success: res => {
					this.authCode = res.authCode
				}
			})

			// 根据appkey和appSecret获取 access_token
			let _this = this
			dd.httpRequest({
				url: 'https://oapi.dingtalk.com/gettoken?appkey=dingppfmbnnby6sf2cbe&appsecret=VOPOaA49nzTKbr1MjFq7FGG-sJh2U2eyFdn3fPe8Jj0JvttEAHMbGmiDddR3S9Bs',
				success: function(res) {
					_this.access_token = res.data.access_token
					// 根据access_token获取userid
					dd.httpRequest({
						url: 'https://oapi.dingtalk.com/user/getuserinfo?access_token=' + _this.access_token + '&code=' + _this.authCode,
						success: function(res) {
							_this.userid = res.data.userid
							// 关闭当前页面，跳转到应用内的某个指定页面。

							dd.redirectTo({
								url: '/page/identityAuth/identityAuth?openid=' + _this.userid,
								// url: '../identityAuth/identityAuth',
							});
							// console.log(uni.redirectTo)
							console.log(_this.userid)
							// uni.reLaunch({
							// 	url: '../identityAuth/identityAuth'
							// })
							// 根据access_token和userid获取用户详情
							// dd.httpRequest({
							// 	url: 'https://oapi.dingtalk.com/user/get?access_token=' + _this.access_token + '&userid=' + _this.userid,
							// 	success: function(res) {
							// 		console.log("用户详情");
							// 		console.log(res);
							// 		console.log(this)
							// 	}
							// })
						}
					})
				}
			})
  },
});
