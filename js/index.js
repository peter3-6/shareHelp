// mui插件初始化
mui.init();
//页面数据初始化加载函数
mui.ready(function() {
	//	var mobile = '15993435023';
	//	var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	//	console.log(reg.test(mobile));
	//	var timestamp = Date.parse(new Date());//获取当前时间戳1
	//	var timestamp = (new Date()).valueOf(); //获取当前时间戳2
	//	var nonceStr = Math.random().toString(36).substr(2);
	//	console.log(timestamp, nonceStr);
});
//点击为我助力按钮的事件     
mui('#mui-button-row').on('tap', '#_submit', function() {
	var userName = mui('#userName')[0].value.replace(/\s+/g, "");
	//	console.log(userName.length);
	//	var $str = userName.replace(/\s+/g,""); //截取空字符串   
	var mobileNumber = mui('#mobileNumber')[0].value.replace(/\s+/g, "");
	//	$mobileNumber(mobileNumber);
	var wechatNumber = mui('#wechatNumber')[0].value.replace(/\s+/g, "");
	//	$wechatNumber(wechatNumber); //微信號
	//	console.log(userName, mobileNumber, wechatNumber);
	//		var btnArray = ['1','是'];
	//	mui.confirm('请输入合法的姓名', '温馨提示', ['确定'],function(e){
	//		console.log(e)
	//	});
	name(userName, mobileNumber, wechatNumber);
	//	var _userName = userName == '' || userName == null || userName == undefined;
	//	var _mobileNumber = mobileNumber == '' || mobileNumber == null || mobileNumber == undefined;
	//	var _wechatNumber = wechatNumber == '' || wechatNumber == null || wechatNumber == undefined;
});

function name(userName, mobileNumber, wechatNumber) {
	//	console.log(userName, mobileNumber, wechatNumber);
	$userName(userName, mobileNumber, wechatNumber);
};
//正则判断姓名
function $userName(userName, mobileNumber, wechatNumber) {
	//	console.log(userName, mobileNumber, wechatNumber);
	var chinese = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
	//	var chinese = /^[\u4e00-\u9fa5]+$/;
	if(!chinese.test(userName)) {
		mui.toast('请输入合法的姓名', {
			duration: 'long',
			type: 'div',
		})
		return false;
	} else {
		$mobileNumber(userName, mobileNumber, wechatNumber);
		return true;
	}
};
//正则判断手机号
function $mobileNumber(userName, mobileNumber, wechatNumber) {
	console.log(userName, mobileNumber, wechatNumber);
	var mobileReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	//	var mobileReg = /^[1][3,4,5,7,8][0-9]{9}$/;
	///^1[34578]\d{9}$/;
	//	var mobileReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
	if(!mobileReg.test(mobileNumber)) {
		mui.toast('请输入合法的手机号', {
			duration: 'long',
			type: 'div',
		})
		return false;
	} else {
		$wechatNumber(userName, mobileNumber, wechatNumber);
		return true;
	}
};
//正则判断微信号
function $wechatNumber(userName, mobileNumber, wechatNumber) {
	console.log(userName, mobileNumber, wechatNumber);
	var wxReg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
	if(!wxReg.test(wechatNumber)) {
		mui.toast('请输入合法的微信号', {
			duration: 'long',
			type: 'div',
		});
		return false;
	} else {
//		postIndex(userName, mobileNumber, wechatNumber);
 youdao();
		return true;
	}
};
//有道
function youdao() {
	var url = "http://fanyi.youdao.com/openapi.do";
    mui.ajax(url,{
        data:{
            keyfrom:"abc1243",
            key:"1207861310",
            type:"data",
            doctype:"json",
            version:"1.1",
        },
        dataType:'json',//服务器返回json格式数据
        type:'post',//HTTP请求类型
        timeout:10000,//超时时间设置为10秒；
        success:function(data){
            //JSON.stringify()将 JSON对象转为json字符串 
            var data = JSON.stringify(data);
            alert(data);
        },
        error:function(xhr,type,errorThrown){
            //异常处理；
            console.log(type);
        }
    });
};

//给后台发送数据(data：姓名、手机号、微信号)
function postIndex(userName, mobileNumber, wechatNumber) {
	console.log(userName, mobileNumber, wechatNumber);
	var _data = {
		'userName': userName,
		'phoneNo': mobileNumber,
		'wxNo': wechatNumber,
	};
	var data = JSON.stringify(_data);
	console.log(_data);
	console.log(data);
	mui.ajax('http://196j624f16.iask.in/cpuPlus/clientView/generalize/add', {
		data: data,
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		headers: {
			//			'Content-Type': 'application/json'
			"content-type": "application/x-www-form-urlencoded; charset=utf-8"
		},
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log(data);
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			mui.alert("<网络连接失败，请重新尝试一下>", "错误", "OK", null);
			console.log(type);
			console.log(JSON.stringify(xhr));
		}
	});
};