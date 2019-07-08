
/* JavaScript content from resources/js/ipadremote.js in folder common */
/* 大屏遥控类 */
var Remote = {

    createNew: function() {

        var remote = {};
        var remoteIP = '';
        var cmsIP = '10.96.129.99:8080';
        var screenMode = '1';
        var godMode = false;
        var areaCode = 'all';
        var areaName = '';
        
        remote.isGodMode = function() {
            return godMode || !(Ext.os.is.iOS || Ext.os.is.android);
        };
        
        remote.setGodMode = function(enabled) {
            godMode = enabled;
        };

        remote.setScreenMode = function(mode) {
            mode = mode || '1';
            switch(mode) {
                case '0':
                    screenMode = '0';	// 大屏
                    break;
                default:
                    screenMode = '1';	// 默认中屏
            }
        };
        
        remote.getScreenMode = function() {
            return screenMode;
        };
        
        remote.setArea = function(area) {
            area = area || 'all';
            areaCode = area;
            switch(area) {
                case 'huanan':
                    areaName = '广州';
                    break;
                case 'huadong':
                    areaName = '上海';
                    break;
                case 'huabei':
                    areaName = '天津';
                    break;
                case 'huaxi':
                    areaName = '成都';
                    break;
                default:
                    areaName = '';
                    break;
                    
            }
        };
        
        remote.getArea = function() {
            return { 
                code: areaCode,
                name: areaName
            };
        };
        
        var codes = [
            {key:'nav_indexList_6',fn:'toCustomerServicePage',isIframe:false},
            {key:'nav_indexList_80',fn:'toWorkModePage1',isIframe:false},
            {key:'nav_indexList_81',fn:'toWorkModePage2',isIframe:false},
            
            {key:'Service_subNav.service_ChinaMap_DataCity',fn:'getWeather',isIframe:true},
            {key:'Online_subNav2.service_ChinaMap_DataCity',fn:'getWeather',isIframe:true},
            {key:'Service_subNav_RegionMap',fn:'toCSAreaPage',isIframe:true},
            {key:'service_ChinaMap_BtnYs',fn:'switchHighlight',isIframe:true},
            {key:'Service_subNav.service_News_Stop_0',fn:'stopSwitchingNewsList',isIframe:true},
            {key:'Service_subNav.service_News_Stop_1',fn:'switchNewsList',isIframe:true},
            {key:'Service_subNav.service_News_DataNews',fn:'getNewsDetails',isIframe:true},
            {key:'Service_subNav.backToNewsList',fn:'backToNewsList',isIframe:true},
            {key:'service_customer_btnStop_0',fn:'stopSwitchingCSList',isIframe:true},
            {key:'service_customer_btnStop_1',fn:'switchCSList',isIframe:true},
            {key:'service_Branch',fn:'toBranchPage',isIframe:true},
            {key:'Service_subNav_RegionMap.service_News_Stop_0',fn:'stopSwitchingNewsList',isIframe:true},
            {key:'Service_subNav_RegionMap.service_News_Stop_1',fn:'switchNewsList',isIframe:true},
            {key:'Service_subNav_RegionMap.service_News_DataNews',fn:'getNewsDetails',isIframe:true},
            {key:'Service_subNav_RegionMap.backToNewsList',fn:'backToNewsList',isIframe:true},
            {key:'subNav_Branch_0',fn:'switchToFaultquipment',isIframe:true},
            {key:'subNav_Branch_1',fn:'switchToMaintenancePanel',isIframe:true},            
            {key:'Service_liftDetailed',fn:'GOTOMONITOR',isIframe:false},
            {key:'Service_station_btnStop_0',fn:'stopSwitchingStationList',isIframe:true},
            {key:'Service_station_btnStop_1',fn:'switchingStationList',isIframe:true},
            {key:'Service_branchMap_DataRegion',fn:'panToStation',isIframe:true},
            
            {key:'service_demo_btnLast',fn:'switchFaultTrustData',isIframe:true},
            {key:'service_demo_btnNext',fn:'switchFaultTrustData',isIframe:true},
            {key:'service_demo_btnMonitor',fn:'gotoFTElevator',isIframe:true},

            // 遥监画面
            {key:'Service_liftDetailed_listNav_0',fn:'switchToMonitorData',isIframe:true},
            {key:'Service_liftDetailed_listNav_1',fn:'switchToElevatorSituation',isIframe:true},
            {key:'Service_liftDetailed_listNav_2',fn:'switchToElevatorReplace',isIframe:true},
            
            // 工作模式
            {key:'Online_BtnOnline1',fn:'toWorkModePage2',isIframe:false},
            {key:'Online_BtnOnline2',fn:'toWorkModePage1',isIframe:false},
            {key:'Online_subNav2.service_News_Stop_0',fn:'stopSwitchingNewsList',isIframe:true},
            {key:'Online_subNav2.service_News_Stop_1',fn:'switchNewsList',isIframe:true},
            {key:'Online_subNav2.service_News_DataNews',fn:'getNewsDetails',isIframe:true},
            {key:'Online_subNav2.backToNewsList',fn:'backToNewsList',isIframe:true},
            
            // 工作模式（中屏）
            {key:'Online_ListNav2_3',fn:'switchToFaultquipment',isIframe:true},
            {key:'Online_ListNav2_4',fn:'switchToMaintenancePanel',isIframe:true},
            
            //安装 
            {key:'service_BtnInstall',fn:'toInstallPage',isIframe:false},
            {key:'Install_Region',fn:'toAreaManagePage',isIframe:true},
            {key:'Install_Branch',fn:'toBranchPage',isIframe:true},
            {key:'Install_Contract',fn:'toContractPage',isIframe:true},
            {key:'Install_Project_BtnPrev',fn:'updateContractCenterInfo',isIframe:true},
            {key:'Install_Project_BtnNext',fn:'updateContractCenterInfo',isIframe:true},
            {key:'Install_Projects_List',fn:'updateContractCenterInfo',isIframe:true},            
            {key:'Install_Project_BtnDetail',fn:'toIDInfopage',isIframe:true},
            {key:'Install_Elevator_List',fn:'updateIDCenterInfo',isIframe:true},
            
            //生命周期
            {key:'Lifecycle_Elevator',fn:'toLifecyclePage',isIframe:false},
            {key:'Lifecycle_Elevator_Node',fn:'goLifecycleStep',isIframe:true},
            
            //配件
            {key:'service_BtnParts',fn:'toAreaRepoPage',isIframe:false},
            {key:'Parts_Warehouse',fn:'toRegionalRepoPage',isIframe:true},
            {key:'Parts_City',fn:'toProvinceRepoPage',isIframe:true},
        ];

        remote.setIP = function(ip) {
            remoteIP = ip;
        };

        remote.getIP = function() {
            return remoteIP;
        };

        remote.setCmsIP = function(ip) {
            cmsIP = ip;
        };

        remote.getCmsIP = function() {
            return cmsIP;
        };

        remote.send = function(object, index, parm, onSuccess, onFailure) {

           //console.log(object, index, parm, onSuccess, onFailure);

           if (!remoteIP || remoteIP === '') {
               if (onFailure && typeof(onFailure) === 'function') {
                   console.log('remote server IP not set!');
                   onFailure();
               }
               return;
           }

           var key;
           if (typeof(object) === 'object') {
               key = object.getId() + (index === undefined ? '' : '_' + index);
           } else {
               key = object + (index === undefined ? '' : '_' + index);
           }
           if(parm===undefined) parm = '';

           var fn = '';
           if (key.substring(0, 1) === '#') { // 不转换直接发送前端机指令
               fn = key.substring(1, key.lenght);
           } else { // 按控件找对应前端机指令
               for (var i = 0; i < codes.length; i++) {
                   if (key === codes[i].key) {
                       fn = codes[i].fn;
                       if (codes[i].isIframe) {
                           fn = 'window.getIframeWindow().' + fn;
                       }
                       break;
                   }
               }
           }
//             console.log('=======>', key);
           if (fn === '') {
               console.log('remote.send()', key + ' not found!');
               if (onFailure && typeof(onFailure) === 'function') {
                   onFailure();
               }
               return;
           }
           console.log('remote.send()', fn + '(\'' + parm + '\')');
           if(!global.isWorklight()) return;

           Ext.data.JsonP.request({
               url: 'http://' + remoteIP,
               params: {
                   code: fn,
                   parm: parm
               },
               callbackKey: 'callback',
               success: function(result, request) {
                   console.log(result);
                   if (onSuccess && typeof(onSuccess) === 'function') {
                       onSuccess(result);
                   }
               },
               failure: function() {
                   if (onFailure && typeof(onFailure) === 'function') {
                       onFailure();
                   } else {
                       Ext.toast('遥控请求' + fn + '(' + parm + ')' + '失败!');
                   }
               }
           });
           //console.log('remote:', key + (parm===''? '':',') + parm);
        };

        return remote;

    }
};
var remote = Remote.createNew();


/* 灯光、音响、显示遥控类(WebSocket) */
var DeviceRemote = {

    createNew: function() {

        var deviceRemote = {};
        var deviceIP = '';//'10.96.129.99:9000';
        var connection;
        var connected = false;

        deviceRemote.setIP = function(ip) {
            deviceIP = ip;
        };

        deviceRemote.getIP = function() {
            return deviceIP;
        };

        /* 智能中控反馈解释 */
        var processQuery = function(data) {
            if(data==='') return;
            var dataType = data.substr(0,5);
            switch(dataType) {
                case 'DTSYS':
                case 'DTLGT':
                case '1CSYS':
                case '1CPJ1':
                case '2FLGT':
                case '3FLGT':
                case 'DYSYS':
                case 'DYLGT':
                case 'DYSIG':
                case 'DYPJ1':
                case 'DYPJ2':
                    deviceRemote.setOn(data);
                    break;
                    
                case 'DTSIG':
                    var sigin = data.substr(6, 1);
                    var sigot = data.substr(8, 1);
                    deviceRemote.setOn(dataType + 'IN' + sigin);
                    deviceRemote.setOn(dataType + 'OT' + sigot);
                    break;
                    
                case 'DTVOL':
                    Ext.getCmp('DTVOL').setValues(data.substr(5,2));
                    break;
                case '1CVOL':
                case 'DYVOL':
                    Ext.getCmp(data.substr(0,7)).setValues(data.substr(7,2));
                    break;
                    
                default:
                    console.log(dataType + ' un-processed.');
                    break;
            }
        };
        
        /* 点亮当前按钮、熄灭相关按钮 */
        deviceRemote.setOn = function(id) {
            // 对应控制按钮存在？
            var btn = Ext.getCmp(id);
            if(!btn) return;

            // 点亮控制按钮
            btn.setOn();

            // 熄灭相关按钮
            var r = btn.getRelativeId();
            for(var i=0; i<r.length; i++) {
                var obj = Ext.getCmp(r[i]);
                if(obj) obj.setOff();
            }
        };
        
        deviceRemote.open = function(onOpen) {            
            onOpen = onOpen || Ext.emptyFn;

            var ip = this.getIP();
            if(!ip || ip==='') {
                return;
            }

            connection = new WebSocket('ws://' + ip);
            console.log(connection);

            connection.onopen = function(e) {
                console.log('Connected.');
                connected = true; 
                onOpen();
            };
            connection.onclose = function(){
                connected = false;
                Ext.toast('已断开与智能中控(' + ip + ')的连接');
                console.log('Connection closed.');
            };

            connection.onmessage = function(e) {
                console.log('WebSocket:', e.data);
                if(e.data.indexOf('Error')>-1) {
                    Ext.Msg.alert('注意', e.data, Ext.emptyFn);
                } else {
                    var data = e.data.split(',');
                    for(var i=0;i<data.length;i++) {
                        processQuery(data[i]);
                    }
                }
            };
            connection.onerror = function(e) {
                console.log(e.data);
            };
        };

        deviceRemote.close = function() {
            forceClose = true;
            connection.close();
        };

        deviceRemote.send = function(msg) {
            if(!connected) return;
            console.log('Sending "' + msg + '"');
            connection.send(msg + ',');
        };
        
        deviceRemote.batchSend = function(msgs) {
            if(!connected) return;
            (function(){
                if(msgs.length===0) return;
                var msg = msgs.shift();
                console.log('Sending "' + msg + '"');
                connection.send(msg + ',');
                setTimeout(arguments.callee, 100);
            })();
        };
        
        return deviceRemote;

    } 
};
var deviceRemote = DeviceRemote.createNew();



/* 空调遥控类 */
var AcRemote = {

    createNew: function() {

        var acRemote = {};
        var remoteIP = '';//'10.98.48.148:6060';
        
        acRemote.setIP = function(ip) {
            remoteIP = ip;
        };

        acRemote.getIP = function() {
            return remoteIP;
        };

        acRemote.send = function(code, onSuccess, onFailure) {

           if (!remoteIP || remoteIP === '') {
               if (onFailure && typeof(onFailure) === 'function') {
                   console.log('AC server IP not set!');
                   onFailure();
               }
               return;
           }
           console.log('ac.send()', code);

           Ext.data.JsonP.request({
               url: 'http://' + remoteIP,
               params: {
                   code: code,
               },
               callbackKey: 'callback',
               timeout: 500,
               success: function(result, request) {
                   console.log(result);
                   if (onSuccess && typeof(onSuccess) === 'function') {
                       onSuccess(result);
                   }
               },
               failure: function() {
                   if (onFailure && typeof(onFailure) === 'function') {
                       onFailure(result);
                   } else {
                       console.log('空调遥控请求'+ code + '失败!');
                       Ext.toast('空调遥控请求失败!');
                   }
               }
           });
        };

        return acRemote;

    }
};
var acRemote = AcRemote.createNew();


/* 窗口路径类 */
var ViewPath = {

    createNew: function() {

        var viewpath = {};
        var path = [];

        viewpath.initial = function(name) {
            path = [name];
            //console.log('initial:', viewPath.print());
        };

        viewpath.push = function(name) {
            path.push(name);
            //console.log('push:', viewPath.print());
        };

        viewpath.pop = function() {
            path.pop();
            //console.log('pop:', viewPath.print());
        };

        viewpath.replace = function(name) {
            path.pop();
            path.push(name);
            //console.log('replace:', viewPath.print());
        };
        
        viewpath.getLast = function() {
            return path[path.length - 1];
        };
        
        viewpath.print = function() {
            return path.join(' > ');
        };

        return viewpath;

    } 
};
var viewPath = ViewPath.createNew();


/* 子窗口类 */
var SubView = {

    createNew: function() {

        var subview = {};

        subview.show = function(parm) {

            var classname = parm.classname; //子窗口的类名
            var parent = parm.parent;// || Ext.getCmp('remote_Main'); //默认在顶层开子窗口
            //             console.log(parent);

            // 没有子窗口
            if(!classname) {
                parent.setItems([]);
                return;
            }
            classname = APPID + '.view.' + classname;

            // 查找将显示的子窗口是否已创建
            var viewobj = null;
            var panels = Ext.ComponentQuery.query('panel');
            for(var i=0; i<panels.length; i++) {
                if(classname === panels[i].$className) {
                    viewobj = panels[i];
                    break;
                }
            }

            // 创建子窗口
            if(!viewobj) {
                var onInitial = Ext.emptyFn;
                if(parm && parm.onInitial && typeof(parm.onInitial)==='function') {
                    onInitial = parm.onInitial;
                }
                var onShow = Ext.emptyFn;
                if(parm && parm.onShow && typeof(parm.onShow)==='function') {
                    onShow = parm.onShow;
                }
                viewobj = Ext.create(
                    classname, 
                    {
                        parm: parm,
                        flex:1,
                        listeners: {
                            initialize: onInitial,
                            painted: onShow
                        }
                    }
                );

                //加入子窗口
                parent.setItems([viewobj]);
            } else {
                if(parm && parm.onShow && typeof(parm.onShow)==='function') {
                    parm.onShow();
                }
                if(parm && parm.onInitial && typeof(parm.onInitial)==='function') {
                    parm.onInitial();
                }
            }
        };

        return subview;

    } 
};
var subView = SubView.createNew();


// 虚拟键盘类
// var VirtualKeyboard = {
//     createNew: function() {

//         var virtualkeyboard = {};
//         var vkbd = null;
//         var textfield, container;        

//         virtualkeyboard.toggle = function(parm) {
//             textfield = parm.textfield;
//             container = parm.container;

//             if(!vkbd) {
//                 this.show();
//             } else {
//                 this.hide();
//             }
//         };

//         virtualkeyboard.show = function() {
//             var me = this;

//             vkbd = Ext.create('HelcRemote.view.remote_Keyboard');
//             container.add(vkbd);
//             vkbd.show();

//             container.addListener('destroy', function() { 
//                 me.hide();
//             });            
//         };

//         virtualkeyboard.hide = function() {
//             if(container && vkbd) {
//                 container.remove(vkbd, true);
//                 //vkbd.hide();
//                 //vkbd.destroy();
//                 vkbd = null;
//             }
//         };

//         virtualkeyboard.key = function(s) {
//             var text = this.getValue();
//             if(s==='退格') {
//                 text = text.substring(0, text.length - 1);
//             } else {
//                 text += s;
//             }
//             textfield.setValue(text);
//         };

//         virtualkeyboard.getValue = function() {
//             return textfield.getValue();
//         };

//         return virtualkeyboard;

//     }    
// };
// var virtualKeyboard = VirtualKeyboard.createNew();