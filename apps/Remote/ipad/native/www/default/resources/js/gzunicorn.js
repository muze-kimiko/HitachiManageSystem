
/* JavaScript content from resources/js/gzunicorn.js in folder common */
var APPID   = 'HelcRemote';
var VERSION = '1.86';
var BUILD   = '20161230';
var SERVERDATA = true;

// 全局类
var Global = {

    createNew: function() {

        var global = {};

        /***** 版本号 *****/
        global.version = VERSION;
        global.build   = BUILD;

        /***** 运行在Worklight环境？ *****/
        global.isWorklight = function() { return SERVERDATA /*(typeof(WL)!=='undefined')*/; };


        /***** 用户类型 ******/
        var userType = null;
        global.setUserTypeAdmin = function() { userType = 'ADMIN'; };
        global.setUserTypeNormal = function() { userType = 'NORMAL'; };
        global.isAdmin = function() { return(userType === 'ADMIN'); };

        /***** 用户ID *****/
        var userId = 'Demo';
        global.setUserId = function(id) { 
            userId = id || 'Demo'; 
            dataUtil.setLocalVariable('USERID', userId);
        };
        global.getUserId = function() { 
            return(userId); 
        };

        /***** 用户名 *****/
        var userName = '演示帐号';
        global.setUserName = function(name) { 
            userName = name;
        };
        global.getUserName = function() { 
            return(userName); 
        };

        /***** 用户头像 *****/
        var userAvatorSrc;
        global.setUserAvatorSrc = function(src) {
            if(!src || src==='') {
                userAvatorSrc = global.isAdmin()? 'resources/images/home_icon02.png':'resources/images/home_icon.png';
            } else if(src.slice(-4)==='.png' || src.slice(-4)==='.jpg') {
                userAvatorSrc = src;
            } else {
                //userAvatorSrc = 'data:image/jpeg;base64,' + src; 
                userAvatorSrc = src; 
            }
        };
        global.getUserAvatorSrc = function() { return(userAvatorSrc); };

        /*
         * 检查字符串是否电话号码
         * 匹配格式：
         * 	11位手机号码
         *	3-4位区号，7-8位直播号码，1－4位分机号
         *	如：12345678901、1234-12345678-1234
         */
        global.isTelNo = function(tel) {
            //严格检查 return !!tel.match(/^((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$/);
            return !!tel.match(/^\d[\d\-]*$/); // 简单检查：数字和减号，减号不能在开头。            
        };

        /* 2位数补0 */
        global.pad2 = function(number) {
            return (number < 10 ? '0' : '') + number;
        };

        return global;

    } 
};
var global = Global.createNew();


// 数据类
var DataUtil = {
    createNew: function() {

        var dataUtil = {};

        dataUtil.createStore = function(id) {
            var store = Ext.data.StoreManager.lookup(id);
            if(!store) {
                store = Ext.create(APPID + '.store.' + id);
            }
            store.setData([]);
            return store;
        };

        dataUtil.setLocalVariable = function(id, value) {
            if(1===0/*global.isWorklight()*/) {
                WL.EncryptedCache.open(
                    APPID, true, 
                    function(status) {}, 
                    function(status) { console.log('OPEN WL CACHE FAIL'); }
                );
                WL.EncryptedCache.write(
                    id, value, 
                    function(status) {}, 
                    function(status) { console.log('WRITE WL CACHE FAIL'); }
                );
            } else {
                var local = Ext.create('HelcRemote.model.LocalStorage', {id:id, value:value});
                local.save();
            }
        };

        dataUtil.getLocalVariable = function(id, onSuccess) {
            if(1===0/*global.isWorklight()*/) {
                WL.EncryptedCache.open(
                    APPID, true, 
                    function(status) {}, 
                    function(status) { console.log('OPEN WL CACHE FAIL'); }
                );
                WL.EncryptedCache.read(
                    id, 
                    function(value) {onSuccess(value);}, 
                    function(status) { console.log('READ WL CACHE FAIL'); }
                );
            } else {
                var value = '';
                var store = Ext.create('Ext.data.Store',{model: 'HelcRemote.model.LocalStorage'});
                if(store) {
                    store.load(function() {
                        //console.log(store.getData());
                        var i = store.find('id', id);
                        if(i>=0) {
                            value = store.getAt(i).get('value');
                            onSuccess(value);
                        }
                    });
                }
            }
        };

        return dataUtil;
    }
};
var dataUtil = DataUtil.createNew();

// 页面跳转类
var ViewUtil = {

    createNew: function() {

        var viewutil = {};

        var viewArray = [];
        var VIEWPATH = APPID + '.view.';

        /*
         * 记录当前页面，并进入下一页面
         * className: 页面的userClassName
         * parm: 传递给下一页面的参数，为任何对象。用法: initialConfig.parm
         */
        viewutil.goNext = function(className, parm) {
            // 记录页面路径
            var currentView = Ext.Viewport.getActiveItem();
            var currentViewId = currentView.getId();
            var currentClassName = currentView.$className;
            viewArray.push({
                viewId: currentViewId,
                className: currentClassName
            });

            // 进入下一页面
            var onInitial = Ext.emptyFn;
            if(parm && parm.onInitial && typeof(parm.onInitial)==='function') {
                onInitial = parm.onInitial;
            }
            var onShow = Ext.emptyFn;
            if(parm && parm.onShow && typeof(parm.onShow)==='function') {
                onShow = parm.onShow;
            }
            nextView = Ext.create(VIEWPATH + className, {
                parm: parm,
                listeners: [{
                    event: 'initialize',
                    fn: onInitial
                },{
                    event: 'painted',
                    fn: onShow
                }]
            });
            Ext.Viewport.setActiveItem(nextView);
            //console.log(viewArray);
        };

        /*
         * 回到已记录的上一页面
         */
        viewutil.goLast = function() {
            // 销毁当前页面
            var currentView = Ext.Viewport.getActiveItem();

            // 取出上一页面
            var v = viewArray.pop();
            var viewId = v.viewId;
            var className = v.className;

            // 进入上一页面
            var lastView = Ext.getCmp(viewId);
            if(!lastView){
                lastView = Ext.create(className);
            }
            Ext.Viewport.setActiveItem(lastView);
            currentView.destroy();

            return(viewId);
            //console.log(viewArray);
        };

        /*
         * 销毁已记录的路径，并直接打开指定页面
         * 参数同goNext
         */
        viewutil.go = function(className, parm) {
            // 销毁当前页面
            var lastView = Ext.Viewport.getActiveItem();
            if(lastView) {
                lastView.destroy();
            }

            // 销毁已保存的页面
            for(var i=0; i<viewArray.length; i++) {
                lastView = Ext.getCmp(viewArray[i].viewId);
                if(lastView){
                    lastView.destroy();
                }
            }
            viewArray = [];

            // 进入指定页面
            var nextView = Ext.create(VIEWPATH + className, {parm: parm});
            Ext.Viewport.setActiveItem(nextView);
            //console.log(viewArray);
        };

        return viewutil;

    }
};
var viewUtil = ViewUtil.createNew();


// 设备相关类
var Phone = {

    createNew: function() {

        var phone = {};

        /* 
         * 获得照片
         * 参数:
         *	callback	- 回调方法，成功回调照片文件、或base64编码串
         *	source		- 相机或相册，CAMEAR/ALBUM
         *	direction	- 前镜头或后镜头，FRONT/BACK
         *	width height- 尺寸
         * 
         */
        var imgIndex = 1;
        phone.takePhoto = function(parm) {

            var callbackfn = parm.callback;
            if(!callbackfn || typeof(callbackfn) !== "function") return;

            parm.source    = parm.source || 'CAMERA';
            parm.direction = parm.direction || 'BACK' ;
            parm.width     = parm.width  || 640;
            parm.height    = parm.height || 640;

            // 来源：相机、相册
            var sourceType;
            switch(parm.source.toUpperCase()) {
                case 'ALBUM':
                    sourceType = 2;
                    break;

                default:
                    sourceType = 1;
                    break;
            }

            // 相机方向
            var direction;            
            switch(parm.direction.toUpperCase()) {
                case 'FRONT':
                    direction = 1;
                    break;

                default:
                    direction = 0;
                    break;
            }

            // 相片大小
            var width  = parm.width;
            var height = parm.height;

            if(navigator.camera) {

                navigator.camera.getPicture(
                    function(data) {
                        callbackfn('data:image/jpeg;base64,' + data);
                    },
                    function(e) {
                        console.log("Error getting picture: ", e);
                        callbackfn('');
                    },
                    {
                        quality: 95,

                        destinationType: 0,

                        sourceType : sourceType,

                        allowEdit : true,

                        encodingType: 0,         

                        targetWidth  : width,
                        targetHeight : height,

                        correctOrientation: true,

                        saveToPhotoAlbum: false,

                        cameraDirection: direction
                    }
                );

            } else {
                // 没有相机
                var filename = 'resources/images/avatar' + imgIndex +'.jpg';
                imgIndex = imgIndex===3? 1:imgIndex+1;
                callbackfn(filename);
            }
        };


        return phone;

    } 
};
var phone = Phone.createNew();


// 地图类
// 参考资料：http://www.mrbackkom.com/html5新标准/2013/08/27/geolocation03.html
var Map = {

    createNew: function() {

        var map = {};

        var mapArray = [];

        /*
         * 查找已创建的地图
         * id: 地图容器的id
         */
        map.lookup = function(id) {
            for(var i=0; i<mapArray.length; i++) {
                if(mapArray[i].id === id) {
                    return mapArray[i].map;
                }
            }
            return null;
        };

        /*
         * 创建地图
         * id: 地图容器的id
         * lng: 中心经度
         * lat: 中心纬度
         * zoom: 缩放级别
         */
        map.create = function (id, parm) {

            return; // 暂时屏蔽地图功能

            if(!parm) parm = {};

            var lng = parm.lng;
            var lat = parm.lat;
            var zoom = parm.zoom;

            var amap = this.lookup(id);
            if(amap) return {
                id:id, 
                map:amap
            };

            var p = map.getLocation();
            lng = lng || p.lng;
            lat = lat || p.lat;
            zoom = zoom || 15;

            amap = new BMap.Map(id);
            amap.centerAndZoom(new BMap.Point(lng, lat), zoom);

            // 添加缩放控件
            var navigationControl = new BMap.NavigationControl({
                // 靠左上角位置
                anchor: BMAP_ANCHOR_TOP_LEFT,
                // LARGE类型
                type: BMAP_NAVIGATION_CONTROL_SMALL,
                // 启用显示定位
                enableGeolocation: true
            });
            amap.addControl(navigationControl);

            // 添加定位控件
            var geolocationControl = new BMap.GeolocationControl();
            amap.addControl(geolocationControl);

            mapArray.push({
                id: id,
                map: amap,
                center: {
                    lng: lng, 
                    lat: lat
                },
                zoom: zoom
            });

            //console.log(mapArray);
            return({
                id: id, 
                map: amap
            });

        };

        /*
         * 销毁全部地图
         */
        map.destroyAll = function() {

            return; // 暂时屏蔽地图功能

            for(var i=0; i<mapArray.length; i++) {
                mapArray[i].map = null;
                delete mapArray[i].map;
            }
            mapArray = [];
        };

        /*
         * 加标注
         */
        map.addMarker = function(amap, parm) {

            return; // 暂时屏蔽地图功能

            var size = new BMap.Size(parm.sizeX, parm.sizeY);
            var offset = new BMap.Size(parm.offsetX, parm.offsetY);
            var offset_i = new BMap.Size(0, -parm.offsetY);
            var icon = new BMap.Icon(parm.img, size, {anchor: offset});
            var infoW = parm.infoW;
            var infoH = parm.infoH;

            var point = new BMap.Point(parm.lng, parm.lat);
            var marker = new BMap.Marker(point, {icon: icon});    
            amap.addOverlay(marker);

            var title = parm.title;
            var content = parm.content;
            if(title===''||content==='') return;            
            marker.addEventListener(
                'click', 
                function(e) {
                    var opts = {
                        width : infoW,
                        height: infoH,
                        offset: offset_i,
                        title : title,
                        enableMessage: false
                    };
                    var p = e.target;
                    var info_point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                    var infoWindow = new BMap.InfoWindow(content, opts); 
                    amap.openInfoWindow(infoWindow, info_point);
                }
            );
        };

        /*
         * 定位开关
         */
        var currentLng = 0, currentLat = 0;
        var currentAddr = '';
        var geolocationTask;
        map.startGetPosition = function() {
            //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
            //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
            //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
            //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
            //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
            //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
            //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
            //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
            //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)        

            var geolocation = new BMap.Geolocation();            
            geolocationTask = Ext.create('Ext.util.DelayedTask', function() {
                geolocation.getCurrentPosition(function(ret){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        currentLng = ret.point.lng;
                        currentLat = ret.point.lat;
                        currentAddr = ret.address.province + ret.address.city + ret.address.district + ret.address.street + ret.address.street_number;
                        console.log(Ext.Date.format(new Date(), 'Y-m-d H:i:s ') + currentAddr + '(' + currentLng + ',' + currentLat + ')');
                        geolocationTask.delay(10*60*1000); // 10分钟定位一次
                        //geolocationTask.delay(3000);
                    }        
                }, {enableHighAccuracy: true});
            }, this);
            geolocationTask.delay(0);
        };

        map.stopGetPosition = function() {
            geolocationTask.cancel();
        };

        /*
         * 取当前定位
         */
        map.getLocation = function() {
            var p = {
                lng: currentLng,
                lat: currentLat,
                addr: currentAddr
            };
            return p;
        };

        return map;

    } 
};
var map = Map.createNew();


// 弹出菜单类
var PopMenu = {

    createNew: function() {

        var popmenu = {};

        var menuArray = [];
        var VIEWPATH = APPID + '.view.';
        var showByObject = null;
        var lastClassName = null;

        /*
         * 查找已创建的弹出菜单
         * className: 页面的userClassName
         */
        var _find = function(className) {
            for(var i=0; i<menuArray.length; i++) {
                if(menuArray[i].name === className) {
                    return menuArray[i].menu;
                }
            }
            return null;
        };

        /*
         * 显示弹出菜单（或任何可显示的页面）
         * className: 页面的userClassName
         */
        popmenu.show = function(className, object) {
            var menu = _find(className);
            if(!menu) {
                menu = Ext.create(VIEWPATH + className);
                menuArray.push({
                    name: className, 
                    menu: menu
                });
                if(!object) {
                    Ext.Viewport.add(menu);
                }
            }
            if(object) {
                menu.showBy(object);
                showByObject = object;
            } else {
                menu.show();
            }
            lastClassName = className;
            //console.log(menuArray);
        };

        /*
         * 隐藏弹出菜单
         * className: 页面的userClassName
         */
        popmenu.hide = function(className){

            className = className || lastClassName;
            /*if(!className) {
                className = lastClassName;
            }*/
            var menu = _find(className);
            if(menu) {
                menu.hide();
            }
            showByObject = null;
            lastClassName = null;
            //console.log(menuArray);
        };

        /*
         * 取弹出菜单的依附对象
         */
        popmenu.getShowBy = function() {
            return showByObject;
        };

        return popmenu;

    } 
};
var popMenu = PopMenu.createNew();

// 正在载入类
var LoadMask = {

    createNew: function() {

        var loadMask = {};

        var maskView = null;
        var cancelFn;
        var maskCount = 0;

        loadMask.show = function(msg, fn) {

            //loadMask.hide();
            if(maskCount>0) {
                maskCount = maskCount + 1;
                return;
            }
            maskCount = 1;

            cancelFn = fn || Ext.emptyFn;
            var loadingMsg = msg || '请稍候...';
            loadingMsg = '<div style="color:#fff;text-align:center">' +
                '<i class="fa fa-2x fa-spinner fa-spin"></i><br><br>' + loadingMsg + '</div>';
            maskView = new Ext.Panel({
                zIndex: 999,
                style: 'background: rgba(0, 0, 0, 0.75) center center no-repeat',
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                items: [
                    {
                        xtype: 'panel',
                        docked: 'top',
                        height: 40,
                        items: [
                            {
                                xtype: 'button',
                                handler: function(button, e) {
                                    loadMask.hide();
                                    cancelFn();
                                },
                                docked: 'right',
                                margin: 10,
                                style: 'border:none;background: rgba(0, 0, 0, 0) center center no-repeat',
                                text: '<i class="fa fa-close" style="color:#fff"></i>'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        height: 100,
                        html: loadingMsg,
                        width: '100%'
                    }
                ]
            });

            Ext.Viewport.add(maskView);            
            maskView.show();
        };

        loadMask.hide = function(forceHide) {
            forceHide = forceHide || false;
            maskCount = forceHide? 0 : maskCount - 1;
            if(maskCount===0) {
                if(maskView) {
                    maskView.hide();
                    Ext.Viewport.remove(maskView);
                    maskView.destroy();
                }
            }
        };

        /* Sencha 2.4.2 已提供Ext.toast()
        var toastView = null;
        loadMask.toast = function(msg, duration) {
            var toastMsg = msg || '操作已完成！';
            var toastDuration = duration || 1000;
            toastView = new Ext.Panel({
                centered: true,
                height: 80,
                hideAnimation: {type:'fadeOut', duration:500},
                modal: true,
                hideOnMaskTap: true,
                style: 'border-radius:8px;border:4px solid #fff;',
                width: '61.8%',
                layout: {
                    type: 'vbox',
                    align: 'center',
                    pack: 'center'
                },
                items: [
                    {
                        xtype: 'label',
                        html: toastMsg
                    }
                ]
            });
            Ext.Viewport.add(toastView);
            toastView.show();
            toastView.on('hide', function() {
                Ext.Viewport.remove(toastView);
                toastView.destroy();
            });
            var task = Ext.create('Ext.util.DelayedTask', function() {
                toastView.hide();
            }, this);
            task.delay(toastDuration);
        };
        */

        return loadMask;

    } 
};
var loadMask = LoadMask.createNew();

// JSON编码类
var JsonUtil = {
    //定义换行符
    n: "\n",
    //定义制表符
    t: "\t",
    //转换String
    convertToString: function(obj) {
        return JsonUtil.__writeObj(obj, 1);
    },
    //写对象
    __writeObj: function(obj, //对象
                          level, //层次（基数为1）
                          isInArray) { //此对象是否在一个集合内
        //如果为空，直接输出null
        if (obj === null) {
            return "null";
        }
        //为普通类型，直接输出值
        if (obj.constructor == Number || obj.constructor == Date || obj.constructor == String || obj.constructor == Boolean) {
            var v = obj.toString();
            var tab = isInArray ? JsonUtil.__repeatStr(JsonUtil.t, level - 1) : "";
            if (obj.constructor == String || obj.constructor == Date) {
                //时间格式化只是单纯输出字符串，而不是Date对象
                return tab + ("\"" + v + "\"");
            }
            else if (obj.constructor == Boolean) {
                return tab + v.toLowerCase();
            }
            else {
                return tab + (v);
            }
        }
        //写Json对象，缓存字符串
        var currentObjStrings = [];
        //遍历属性
        for (var name in obj) {
            var temp = [];
            //格式化Tab
            var paddingTab = JsonUtil.__repeatStr(JsonUtil.t, level);
            temp.push(paddingTab);
            //写出属性名
            temp.push("\"" + name + "\" : ");
            var val = obj[name];
            if (val === null) {
                temp.push("null");
            }
            else {
                var c = val.constructor;
                if (c == Array) { //如果为集合，循环内部对象
                    temp.push(JsonUtil.n + paddingTab + "[" + JsonUtil.n);
                    var levelUp = level + 2; //层级+2
                    var tempArrValue = []; //集合元素相关字符串缓存片段
                    for (var i = 0; i < val.length; i++) {
                        //递归写对象
                        tempArrValue.push(JsonUtil.__writeObj(val[i], levelUp, true));
                    }
                    temp.push(tempArrValue.join("," + JsonUtil.n));
                    temp.push(JsonUtil.n + paddingTab + "]");
                }
                else if (c == Function) {
                    temp.push("[Function]");
                }
                else {
                    //递归写对象
                    temp.push(JsonUtil.__writeObj(val, level + 1));
                }
            }
            //加入当前对象“属性”字符串
            currentObjStrings.push(temp.join(""));
        }
        return (level > 1 && !isInArray ? JsonUtil.n: "") + //如果Json对象是内部，就要换行格式化
            JsonUtil.__repeatStr(JsonUtil.t, level - 1) + "{" + JsonUtil.n + //加层次Tab格式化
            currentObjStrings.join("," + JsonUtil.n) + //串联所有属性值
            JsonUtil.n + JsonUtil.__repeatStr(JsonUtil.t, level - 1) + "}"; //封闭对象
    },
    __isArray: function(obj) {
        if (obj) {
            return obj.constructor == Array;
        }
        return false;
    },
    __repeatStr: function(str, times) {
        var newStr = [];
        if (times > 0) {
            for (var i = 0; i < times; i++) {
                newStr.push(str);
            }
        }
        return newStr.join("");
    }
};

// Base64编解码类
var Base64 = {

    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    encode : function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64;
            } else if (isNaN(i)) {
                a = 64;
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + 
                this._keyStr.charAt(u) + this._keyStr.charAt(a);
        }
        return t;
    },

    decode : function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r);
            }
            if (a != 64) {
                t = t + String.fromCharCode(i);
            }
        }
        t = Base64._utf8_decode(t);
        return t;
    },

    _utf8_encode : function(e) {
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128);
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128);
            }
        }
        return t;
    },

    _utf8_decode : function(e) {
        var t = "";
        var n = 0;
        var r = 0, c1 = 0, c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++;
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2;
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3;
            }
        }
        return t;
    }
};