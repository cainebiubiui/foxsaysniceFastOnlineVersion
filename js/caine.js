
(function(window){

    var clearAllElements=function(elements){
        while(elements.firstChild){
            var clear=elements.removeChild(elements.firstChild);
            clear = null;
        }
    }

    function setCookie(key,value){
        var Days = 10;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = key + "="+ escape(value) + ";expires=" + exp.toGMTString();
    }

    function getCookie(key){
        var arr = document.cookie.match(new RegExp("(^| )"+key+"=([^;]*)(;|$)"));
        if(arr != null) return unescape(arr[2]); return null;
    }

    function delCookie(key){
        var exp = new Date();
        exp.setTime(exp.getTime()-1000);
        var cval=getCookie(key);
        if(cval!=null) document.cookie= key + "="+cval+";expires="+exp.toGMTString();
    }

    var add_listener=function(obj, event, code){
        if(browser_info()==1){
            obj.attachEvent("on" +event, code);
        }else{
            obj.addEventListener(event, code, false);
        }
    }

    var Caine = {
        clear_all_elements:clearAllElements,
        setcookie:setCookie,
        getcookie:getCookie,
        delcookie:delCookie,
        add_listener:add_listener

    }

    if (typeof define === 'function' && define.amd) {
        define( Caine );
    } else {
        window.Caine = Caine;
    }

})( window );

var $ = function (obj) {
    return document.querySelector(obj);
}

var $n=function(obj){
    return [].slice.call(document.querySelectorAll(obj));
}

var io=function(obj){
    console.log(obj);
}

//***********************************************************************
var browser_info=function(){

    var iUserAgent = navigator.userAgent;
    var iAppVersion = parseFloat(navigator.appVersion);
    var isOpera = iUserAgent.indexOf("Opera") > -1;
    var isKHTML = iUserAgent.indexOf("KHTML") > -1 || iUserAgent.indexOf("Konqueror") > -1 || iUserAgent.indexOf("AppleWebKit") > -1;
    if(isKHTML){
        var isChrome = iUserAgent.indexOf("Chrome") > -1;
        var isSafari = iUserAgent.indexOf("AppleWebKit") > -1 && !isChrome;
        var isKonq = iUserAgent.indexOf("Konqueror") > -1;
    }
    var isIE = iUserAgent.indexOf("compatible") > -1 && iUserAgent.indexOf("MSIE") > -1 && !isOpera;
    var isMoz = iUserAgent.indexOf("Gecko") > -1 && !isKHTML;
    var isNS4 = !isOpera && !isMoz && !isKHTML && !isIE && (iUserAgent.indexOf("Mozilla") ==0) && (navigator.appName == "Netscape") && (fAppVersion >=4.0 && fAppVersion <= 5.0);
//此处为检测平台
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh");
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if(isIE) {
        //此处没用userAgent来检测，主要是考虑IE9浏览器按F12可以切换到IE7，IE8;用userAgent会检测不出来
        if (parseInt($.browser.version, 10) <= 6) {
            alert("ohps，请更换更现代的浏览器来获得好的体验;)");
        }else{

        }

        return 1;
    }else{
        return 0;
    }

}




