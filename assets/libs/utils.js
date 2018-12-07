// window.BASE_URL = 'http://192.168.0.243:8765/api/portal';
window.BASE_URL = 'http://192.168.0.200:4600';
// window.BASE_URL = 'http://192.168.0.25:25003';
window.adminEvent = '../api/event',
window.ovauth = '../api/auth',
window.ovvote = '../api/ov-vote',
window.ovEmployee = '../api/ov-employee',
window.ovadmin = '../api/ov-admin',//swagger 11011
window.enterpriseAdminPoint = ovadmin + '/enterpriseAdmin',
window.enterpriseInfoPoint = ovadmin + '/enterpriseInfo',
window.enterpriseAppPoint = ovadmin + '/enterpriseApp',
window.enterpriseAccountPoint = ovadmin + '/employee',
window.enterpriseGroup = ovadmin + '/group',
window.enterpriseService = ovadmin + '/food',
window.enterpriseServiceDining = ovadmin + '/restaurant',
window.enterpriseActivity = ovadmin + '/activity',
window.enterpriseTakeout = ovadmin + '/takeoutInfo',
window.enterpriseOrderInfo = ovadmin + '/takeoutOrderInfo',
window.restaurant = '../api/ov-restaurantflow',
window.groupOutlay = ovadmin + '/groupOutlay',
window.official  = '../api/ov-official',
window.UEDITOR_SERVER_URL = "../../../../api/ov-admin/ossFile/uploadInfoFiles";
window.viewpicture = '../api/ov-employee/ossFile/readPic?appId='+localStorage.getItem('appId')+'&eId='+localStorage.getItem('eid')+'&url=';//访问不了外网图片不显示的问题
window.downloadFile = '../api/ov-employee/ossFile/downloadExcel?appId='+localStorage.getItem('appId')+'&eId='+localStorage.getItem('eid')+'&url=';//访问不了外网下载不了的问题
//上传文件经过网关时，需要加前缀/zuul/，同时nginx也需要相对于的配置
window.uploadApiEndpoint = '/zuul/api/';
window.mbcMail = '@cmbchina.com';
//咨询的baseUrl
window.SNSApi = '/sns/api/v2';              
// window.adminApiEndPoint = 'http://192.168.0.243:25001',
// window.businessApiEndPoinst = 'http://192.168.0.243:25003'
//上传文件经过网关时，需要加前缀/zuul/，同时nginx也需要相对于的配置
// window.uploadApiEndpoint = 'http://192.168.0.141:10090/zuul/api/';


(function _p_initloader(){  
    var _config = function(){
        var tokenFail = true;
        window.WConfig = {
            AjaxSetup:{
                // async: false,
                beforeSend: function beforeSend(xhr) {
                    //可以设置自定义标头
                    xhr.setRequestHeader('Authorization', TokenStorage.get());
                },
                timeout:1*60000,
                base_params:{
                    appId: LocalStorageUtil.getItem('appId') || '',
                    eId: LocalStorageUtil.getItem('eid') || ''
                },
                statusCode: {
                    401: function() {
                        if(tokenFail) {
                            tokenFail = false;
                            LocalStorageUtil.clearUserInfo();
                            alert("请进行登录！");
                            window.location.href='../login/index.html'
                        }else{
                            tokenFail = true;
                        }
                    },
                    403: function () {
                        alert("您暂无权限访问该页面！");
                        window.location.href = "../console/";
                    }
                },
                error: function(status){
                    ULoadingDialog.hide();
                    if(status !== 401){
                        // EventHub.emit('ErrorToast');
                    }
                }
            }
        }
    }

    var _createCommonObject = function(){
        window.LocalStorageUtil = (function () {

            var keys = {
                PARAM: 'param',
                USER_INFO: 'user_info'
            }
        
            var _setItem = function _setItem(key, value) {
                sessionStorage.setItem(key, value);
            };
        
            var _getItem = function _getItem(key, defaultValue) {
                return sessionStorage.getItem(key) || defaultValue;
            };
        
            var _removeItem = function _removeItem(key) {
                sessionStorage.removeItem(key);
            };
        
            var _setLocalItem = function _setItem(key, value) {
                localStorage.setItem(key, value);
            };
        
            var _getLocalItem = function _getItem(key, defaultValue) {
                return localStorage.getItem(key) || defaultValue;
            };
        
            var _removeLocalItem = function _removeItem(key) {
                localStorage.removeItem(key);
            };
        
            return {
                setItem: function(key,value,isSession){
                    if(isSession==false || isSession==undefined){
                        _setLocalItem(key,value);
                    }else{
                        _setItem(key,value);
                    }
                },
                getItem: function(key,defaultValue,isSession){
                    if(isSession==false || isSession==undefined){
                       return  _getLocalItem(key,defaultValue);
                    }else{
                       return  _getItem(key,defaultValue);
                    }
                },
                removeItem: function(key,isSession){
                    if(isSession==false || isSession==undefined){
                        _removeLocalItem(key);
                    }else{
                        _removeItem(key);
                    }   
                },
                setParam: function (key,param) {
                    _setItem(key, JSON.stringify(param))
                },
                getParam: function (key) {
                    var paramObj;
                    var param = _getItem(key);
                    if (param != undefined) {
                        paramObj = JSON.parse(param);
                    }
                    return paramObj;
                },
                setUserInfo: function (userInfo) {
                    this.setItem(keys.USER_INFO, JSON.stringify(userInfo));
                },
                getUserInfo: function () {
                    var paramObj;
                    var param = this.getItem(keys.USER_INFO);
                    if (param != undefined) {
                        paramObj = JSON.parse(param);
                    }
                    return paramObj;
                },
                clearUserInfo: function () {
                    // this.removeItem(keys.USER_INFO);
                    TokenStorage.put("");
                    // LocalStorageUtil.removeItem("jwt",true);
                    LocalStorageUtil.removeItem("user_name",true);
                    LocalStorageUtil.removeItem("menu-permission",true);
                }
            };
        })()
        

        window.TokenStorage = (function(){
            var TOKEN_ITEM_NAME = 'token_item_name';
            var _saveToken = function(token){
                LocalStorageUtil.setItem(TOKEN_ITEM_NAME,token);
            }
        
            var _getToken = function(){
                return LocalStorageUtil.getItem(TOKEN_ITEM_NAME,'');
            }
        
            return {
                put:_saveToken,
                get:_getToken
            }
        })();
    }
    
    // token失效，不加载当前页面，跳转到登录页
    function _checkLogin () {
        var url = window.location.href;
        var urlArr = [
            '/console/'
        ];
        for (var i = 0; i < urlArr.length; i++) {
            if (url.indexOf(urlArr[i]) > 0) {
                var _token = TokenStorage.get();
                // var _user = LocalStorageUtil.getItem('user_name', '', true);
                if(!_token) {
                    alert('请进行登录！');
                    window.location.href = '../login/';
                    // return backToLogin();
                }
                return ;
                // return !_token?window.location.href = '../login':'';
            }
        } 
        // var _token = TokenStorage.get();
        // var _ystId = LocalStorageUtil.getItem('ystId','',false);
        // if (!_token){
        //     window.location.href = '../console/#/console-login';
        // }else if(!_ystId){
        //     window.location.href = '../console/#/console-staff';
        // }
    }

    // 跳转回登录界面
    window.backToLogin = function(entry){
        if(!entry) {
            var arrEntry  = ['LOGIN','LOGIN_ADMINISTRATION','LOGIN_UNION'],
                queryInfo = JSON.parse(LocalStorageUtil.getItem('querInfo'));
            
            var appId = LocalStorageUtil.getItem('appId', '', false);
            entry = arrEntry[appId];
        }
        switch (entry) {
            case "LOGIN":
                window.location.href="../login";
                break;
            case "LOGIN_UNION":
                window.location.href="../login-union";
                break;
            case "LOGIN_ADMINISTRATION":
                window.location.href="../login-administration";
                break;
            default:
                window.location.href="../login";
                break;
        }
    }

    // 权限管控方法
    window.EnterpriseAuth = function() {
        var url = window.location.href;
        var urlArr = [
            'config',
            'app-setting'
        ]
        for(var i = 0,len = urlArr.length;i<len;i++) {
            if (url.indexOf(urlArr[i]) > 0 ) {
                var accountType = JSON.parse(LocalStorageUtil.getItem('queryInfo','',false)).accountType;
                if(accountType!=1) {
                    alert('你的权限不够！');
                    window.location.href = '../console';
                    return false;
                }
                return ;
            }
        }
    }

    // var tokenFail  = true;
    // var _hook = function(){
    //     if(EventHub){
    //         EventHub.on(EventHub.PLATFORM_LOADING,function(action){
    //             if(action == 'show'){
    //                 ULoadingDialog.show();
    //             }else if(action == 'hide'){
    //                 ULoadingDialog.hide();
    //             }
    //         });
    //         // EventHub.on(EventHub.PLATFORM_AJAX_STATUS,function(status){
    //         //     if(status==401 && tokenFail){
    //         //         tokenFail = false;
    //         //         LocalStorageUtil.clearUserInfo();
    //         //         alert("请进行登录！");
    //         //         window.location.href = "../console-login/index.html";
    //         //     }
    //         // });
    //         var tokenFail = true;
    //         // EventHub.on(EventHub.PLATFORM_AJAX_STATUS, function (status) {
    //             //到登录页面的时候重置 window那段清除网络在登录页面才回来的影响
    //             // var tokenFail = LocalStorageUtil.getItem('tokenFail',false,true);
    //         //     if (status == 401 && tokenFail) {
    //         //         tokenFail = false;
    //         //         LocalStorageUtil.clearUserInfo();
    //         //         alert("请进行登录！");
    //         //         //如果本身是在登录页 也不会有问题，登录页不应该由token401的返回
    //         //         window.location.href = "../login/";
    //         //     }else{
    //         //         tokenFail = true;
    //         //     }
    //         // });
    //     }
    // }
    _createCommonObject();
    _config();
    _checkLogin();
    // _hook();
})();

var generateUUID = function() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}
var GetParam = function (name) {
    var search = document.location.search || document.location.hash;
    var pattern = new RegExp('[?&]' + name + '\=([^&]+)', 'g');
    var matcher = pattern.exec(search);
    var items = null;
    if (matcher != null) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1]);
            } catch (e) {
                items = matcher[1];
            }
        }
    }
    return items;
};
var luhnCheck = function(bankno) {
    var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位（与luhn进行比较）
    var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
    var newArr = new Array();
    for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
    }
    var arrJiShu = new Array(); //奇数位*2的积 <9
    var arrJiShu2 = new Array(); //奇数位*2的积 >9
    var arrOuShu = new Array(); //偶数位数组
    for (var j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) { //奇数位
            if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
            else arrJiShu2.push(parseInt(newArr[j]) * 2);
        } else //偶数位
            arrOuShu.push(newArr[j]);
    }

    var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
    for (var h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    var sumJiShu = 0; //奇数位*2 < 9 的数组之和
    var sumOuShu = 0; //偶数位数组之和
    var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal = 0;
    for (var m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }

    for (var n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }

    for (var p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

    //计算luhn值
    var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    var luhn = 10 - k;

    if (lastNum == luhn) {
        //luhn验证通过;
        return true;
    } else {
        //银行卡号必须符合luhn校验
        return false;
    }
}

var idCardValidator = (function(){
    function isIdCard(arrIdCard) {
        var tag = false;
        var sigma = 0;
        var a = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var w = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
        for (var i = 0; i < 17; i++) {
            var ai = parseInt(arrIdCard.substring(i, i + 1));
            var wi = a[i];
            sigma += ai * wi;
        }
        var number = sigma % 11;
        var check_number = w[number];
        if (arrIdCard.substring(17) != check_number) {
            tag = false;
        } else {
            tag = true;
        }
        return tag;
    }
    
    function idCard15To18(id) {
        var W = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
        var A = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
        var i, j, s = 0;
        var newid;
        newid = id;
        newid = newid.substring(0, 6) + "19" + newid.substring(6, id.length);
        for (i = 0; i < newid.length; i++) {
            j = parseInt(newid.substring(i, i + 1)) * W[i];
            s = s + j;
        }
        s = s % 11;
        newid = newid + A[s];
        return newid;
    }

    return {
        validate:function(cardNo){
            if(cardNo == undefined || cardNo == ''){
                return false;
            }
            if(cardNo.length == 15 ){
                cardNo = idCard15To18(cardNo);
            }
            return isIdCard(cardNo);
        }
    }
})();

// 脱敏
var Desensitization = function (v, len, start, sign) {//值，长度，开始脱敏的下标，标识：数值或字符串
    if(v){
        var val = v.split(''), 
            idx = start ? start : 0, 
            _start, 
            _end;
        if (idx < 0) { //从后面数起
            if (len == 0) {   //长度为0，从头开始加密
                _start = 0;
            } else {   //长度不为0，从后面idx起往前数len位
                _start = val.length + idx - len + 1; 
            }
            _end = val.length + idx + 1;
        } else if (idx >= 0) { //从头开始，从idx下标开始，到sign标识为止
            _start = idx;
            if(sign){
                _end = typeof (sign == "number") ? v.length + sign : v.indexOf(sign);
            }else if(len == 0){
                _end = val.length;
            }else{
                _end = len ? len + idx : v.length;
            }
        }
        for (var i = _start; i < _end; i++) {
            val[i] = '*';
        }
        return val.join('');
    }else{
        return v;
    }
}

var CheckIsLogin = function(){
    var isLogin = false;
    var userInfo = LocalStorageUtil.getUserInfo();
    if(userInfo != undefined){
        isLogin = true;
    }
    return isLogin;
}

/**
 * 数字格式化
 * 方法ToDigits2和formatMoney是之前后端写的，这里复制过来
 *
 * formaTime:
 * @param time 日期
 * @param [format] 格式 {"yyy-mm-dd"（默认）|"yyyy-mm-dd hh:mm:ss"|"yyyy/mm/dd"|"yyyy/mm/dd hh:mm:ss"}
 *
 *
 */
var UFormatter = (function(){
    return {
        ToDigits2 : function (floatVal) {
            var strResult = parseFloat(floatVal).toFixed(4).toString();
            return parseFloat(strResult.substr(0, strResult.length - 2));
        },
        formatMoney : function (m, fixedNumParm) {
            if(m==undefined){
                m = "0";
            }
            if(m==0){
                m=m+"";
            }
            m = m ? m:'';
            m = m.toString();
            var newStr = "";
            var fixedNum = fixedNumParm || 2;
            if (m.indexOf('.') > -1 || fixedNumParm != undefined) {
                m = parseFloat(m);
                var _t = m.toFixed(fixedNum).split('.');
                var a = _t[0];
                var b = _t[1];
                if (a.length > 12) {
                    newStr = a.substr(0, a.length - 12) + "," + a.substr(a.length - 12, 3) + "," + a.substr(a.length - 9, 3) + "," + a.substr(a.length - 6, 3) + "," + a.substr(a.length - 3, 3) + "." + b;
                } else if (a.length > 9) {
                    newStr = a.substr(0, a.length - 9) + "," + a.substr(a.length - 9, 3) + "," + a.substr(a.length - 6, 3) + "," + a.substr(a.length - 3, 3) + "." + b;
                } else if (a.length > 6) {
                    newStr = a.substr(0, a.length - 6) + "," + a.substr(a.length - 6, 3) + "," + a.substr(a.length - 3, 3) + "." + b;
                } else if (a.length > 3) {
                    newStr = a.substr(0, a.length - 3) + "," + a.substr(a.length - 3, 3) + "." + b;
                } else {
                    newStr = a + "." + b;
                }
            } else {
                if (m.length > 12) {
                    newStr = m.substr(0, m.length - 12) + "," + m.substr(m.length - 12, 3) + "," + m.substr(m.length - 9, 3) + "," + m.substr(m.length - 6, 3) + "," + m.substr(m.length - 3, 3);
                } else if (m.length > 9) {
                    newStr = m.substr(0, m.length - 9) + "," + m.substr(m.length - 9, 3) + "," + m.substr(m.length - 6, 3) + "," + m.substr(m.length - 3, 3);
                } else if (m.length > 6) {
                    newStr = m.substr(0, m.length - 6) + "," + m.substr(m.length - 6, 3) + "," + m.substr(m.length - 3, 3);
                } else if (m.length > 3) {
                    newStr = m.substr(0, m.length - 3) + "," + m.substr(m.length - 3, 3);
                } else {
                    newStr = m;
                }
            }
            return newStr;
        },
        formatMoneyNoRound : function (m, fixedNumParm) {
            m = m ? m:''
            m = m.toString();
            var newStr = "";
            var fixedNum = fixedNumParm || 2;
            if (m.indexOf('.') > -1 || fixedNumParm != undefined) {
                m = parseFloat(m);
                var _t = m.toFixed(fixedNum+1).split('.');
                var a = _t[0];
                var b = _t[1];
                if (a.length > 12) {
                    newStr = a.substr(0, a.length - 12) + "," + a.substr(a.length - 12, 3) + "," + a.substr(a.length - 9, 3) + "," + a.substr(a.length - 6, 3) + "," + a.substr(a.length - 3, 3) + "." + b.substr(0,2);
                } else if (a.length > 9) {
                    newStr = a.substr(0, a.length - 9) + "," + a.substr(a.length - 9, 3) + "," + a.substr(a.length - 6, 3) + "," + a.substr(a.length - 3, 3) + "." + b.substr(0,2);
                } else if (a.length > 6) {
                    newStr = a.substr(0, a.length - 6) + "," + a.substr(a.length - 6, 3) + "," + a.substr(a.length - 3, 3) + "." + b.substr(0,2);
                } else if (a.length > 3) {
                    newStr = a.substr(0, a.length - 3) + "," + a.substr(a.length - 3, 3) + "." + b.substr(0,2);
                } else {
                    newStr = a + "." + b.substr(0,2);
                }
            } else {
                if (m.length > 12) {
                    newStr = m.substr(0, m.length - 12) + "," + m.substr(m.length - 12, 3) + "," + m.substr(m.length - 9, 3) + "," + m.substr(m.length - 6, 3) + "," + m.substr(m.length - 3, 3);
                } else if (m.length > 9) {
                    newStr = m.substr(0, m.length - 9) + "," + m.substr(m.length - 9, 3) + "," + m.substr(m.length - 6, 3) + "," + m.substr(m.length - 3, 3);
                } else if (m.length > 6) {
                    newStr = m.substr(0, m.length - 6) + "," + m.substr(m.length - 6, 3) + "," + m.substr(m.length - 3, 3);
                } else if (m.length > 3) {
                    newStr = m.substr(0, m.length - 3) + "," + m.substr(m.length - 3, 3);
                } else {
                    newStr = m;
                }
            }
            return newStr;
        },
        formatTime : function(time, format){
            var _time = new Date(time), TArr;
            var format = format ? format.toLowerCase() : "yyyy-mm-dd";
            var Ddigit = function(n){
                var _n = Number(n);
                _n = _n > 9 ? _n : "0"+_n;
                return _n;
            };
            if(typeof time == "string" && time.indexOf("-") > -1){
                var ps = time.split(" ");
                var pd = ps[0].split("-");
                var pt = ps.length>1 ? ps[1].split(":"): ["00","00","00"];
                TArr = [pd[0], Ddigit(pd[1]), Ddigit(pd[2]), Ddigit(pt[0]), Ddigit(pt[1]), Ddigit(pt[2])];
            } else {
                var _y = _time.getFullYear();
                var _mon = _time.getMonth() + 1;
                var _d = _time.getDate();
                var _h = _time.getHours();
                var _m = _time.getMinutes();
                var _s = _time.getSeconds();
                TArr = [_y, Ddigit(_mon), Ddigit(_d), Ddigit(_h), Ddigit(_m), Ddigit(_s)];
            }
            var TStr;
            if(format == "yyyy-mm-dd"){
                TStr = TArr[0] + "-" + TArr[1] + "-" + TArr[2];
            }else if(format == "yyyy-mm-dd hh:mm"){
                TStr = TArr[0] + "-" + TArr[1] + "-" + TArr[2] + " " + TArr[3] + ":" + TArr[4];
            }else if(format == "yyyy-mm-dd hh:mm:ss"){
                TStr = TArr[0] + "-" + TArr[1] + "-" + TArr[2] + " " + TArr[3] + ":" + TArr[4] +":" + TArr[5];
            }else if(format == "yyyy/mm/dd"){
                TStr = TArr[0] + "/" + TArr[1] + "/" + TArr[2];
            }else if(format == "yyyy/mm/dd hh:mm:ss"){
                TStr = TArr[0] + "/" + TArr[1] + "/" + TArr[2] + " " + TArr[3] + ":" + TArr[4] +":" + TArr[5];
            }
            return TStr;
        },
        formatBankCard:function (bankid) {
            var v = bankid;
            if(/\S{5}/.test(v)){
                v = v.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
            }
            return v;
        }
    };
})();

/**
 * Earnings - 收益计算公式:本金×预期年化收益率×投资期限/[360]天
 * @param [day] {默认：360}
 * 说明：(以下三项传入参数顺序不要求)
 *       本金 - 传入的单位是元
 *       预期年化收益率 - 传入的值是百分比值
 *       投资期限 - 单位天
 */
var UMath = (function(){
    return {
        Earnings:function(a,b,c,day){
            var _earnings;
            if(!day){
                day = 360;
            }
            _earnings = UFormatter.ToDigits2(a * b / 100 * c / day);
            return _earnings;
        }
    }
})();

//脱敏
var HideInfo = function(str,begin,end){
    if(str == undefined || str == ''){
        return str;
    }
    var p2 = end - str.length-1;
    var p1 = str.length-begin+p2+1;
    return Desensitization(str,p1,p2);
};

 // 文件下载 去掉路径
var FetchFileName = function (name, delimiter) {
    var _delimiter = delimiter ? delimiter : '\\';
    var array = name.split('\\');
    var _name = array[array.length - 1];
    return _name;
}

