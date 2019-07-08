
/* JavaScript content from js/CommonUtil.js in folder common */
// 页面跳转类
var ViewUtil = {

    createNew: function() {

        var viewutil = {};
        var viewArray = [];
        var VIEWPATH = 'HelcMES.view.';

        /*
         * 记录当前页面，并进入下一页面
         * viewId: 页面ID
         * className: 页面的userClassName
         * parm: 传递给下一页面的参数，为任何对象。用法: initialConfig.parm
         */
        viewutil.goNext = function(viewId, className, parm) {
            // 记录页面路径
            var currentView = Ext.Viewport.getActiveItem();
            var currentViewId = currentView.getId();
            var currentClassName = currentView.$className;
            viewArray.push({
                viewId: currentViewId,
                className: currentClassName
            });

            // 销毁残留页面（一般情况下不存在残留）
            var nextView = Ext.getCmp(viewId);
            if(nextView){
                nextView.destroy();
            }

            // 进入下一页面
            className = className || VIEWPATH + viewId;
            /*if(!className) {
                className = VIEWPATH + viewId;
            }*/
            nextView = Ext.create(className, {parm: parm});
            Ext.Viewport.setActiveItem(nextView);
//            Ext.Viewport.animateActiveItem(nextView,{ type: 'slide', direction: 'left' });
//            Ext.Viewport.animateActiveItem(nextView,{ type: 'fade' });
            //console.log(viewArray);
        };

        /*
         * 回到已记录的上一页面
         */
        viewutil.goLast = function() { 
            // 销毁当前页面
            Ext.Viewport.getActiveItem().destroy();

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
//            Ext.Viewport.animateActiveItem(lastView,{ type: 'slide', direction: 'right' });
            //console.log(viewArray);
        };

        /*
         * 销毁已记录的路径，并直接打开指定页面
         * 参数同goNext
         */
        viewutil.go = function(viewId, className, parm) {
            var lastView;

            // 销毁当前页面
            lastView = Ext.Viewport.getActiveItem();
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
            className = className || VIEWPATH + viewId;
            /*if(!className) {
                className = VIEWPATH + viewId;
            }*/
            var nextView = Ext.getCmp(viewId);
            if(!nextView) {
                nextView = Ext.create(className);
            }
            Ext.Viewport.setActiveItem(nextView);
            //console.log(viewArray);
        };

        return viewutil;

    } 
};
var viewUtil = ViewUtil.createNew();

//加密高速缓存类
var CacheUtil = {
		
	createNew:function(){
		var cacheutil = {};
		var credentialsKey = 'EncryptedCache_key';
		
		cacheutil.doclose = function(){
			WL.EncryptedCache.close(
				function(status){console.log('---关闭加密高速缓存成功');},
				function(status){console.log('---关闭加密高速缓存失败|'+transStatus(status));}
			);
		},
		
		cacheutil.doWrite = function(ckeys){
			WL.EncryptedCache.open(credentialsKey,true,
				function(status){
					console.log('---打开加密高速缓存成功');
					WL.EncryptedCache.read('datas',
				    	function(value){
							var tobj = {};
					    	if(value==null){
					    		console.log('---原数据不存在');
					    	}else{
					    		console.log('---读取原数据成功|'+value);
					    		tobj = Ext.JSON.decode(value,true);
					    		console.log('---原数据',value);
					    	}
					    	for(var i = 0;i < ckeys.length;i++){
				    			tobj[ckeys[i].ckey] = ckeys[i].cvalue;
				    		}
					    	console.log('---新数据',Ext.JSON.encode(tobj));
					    	
					    	WL.EncryptedCache.write('datas',Ext.JSON.encode(tobj),
								function(status){
									console.log('---写入成功');
									cacheutil.doclose();
								},
								function(status){
									console.log('---写入失败|'+transStatus(status));
									cacheutil.doclose();
								}
							);
				    	},
				    	function(status){
				    		console.log('---读取失败|'+transStatus(status));
				    		cacheutil.doclose();
				    	}
					);
				},
				function(status){
					console.log('---创建和打开加密高速缓存失败|'+transStatus(status));
					cacheutil.doclose();
				}
			);
		},
		
		cacheutil.doRead = function(callbackfn){
			WL.EncryptedCache.open(credentialsKey,true,
				function(status){
					console.log('---打开加密高速缓存成功');
					WL.EncryptedCache.read('datas',
				    	function(value){
					    	if(value==null){
					    		console.log('---读取失败');
					    	}else{
					    		console.log('---获取成功|'+value);
					    	}
					    	cacheutil.doclose();
					    	callbackfn(value==null?'':value);
				    	},
				    	function(status){
				    		console.log('---获取失败|'+transStatus(status));
				    		cacheutil.doclose();
				    		callbackfn('');
				    	}
					);
				},
				function(status){
					console.log('---创建和打开加密高速缓存失败|'+transStatus(status));
					cacheutil.doclose();
				}
			);
		}
		
		transStatus = function(status){
			var tmpStatus = '';
			switch(status){
    		case WL.EncryptedCache.ERROR_KEY_CREATION_IN_PROGRESS:
    			tmpStatus = 'ERROR:KEY_CREATION_IN_PROGRESS';   
    			break;
    		case WL.EncryptedCache.ERROR_LOCAL_STORAGE_NOT_SUPPORTED:
    			tmpStatus = 'ERROR:LOCAL_STORAGE_NOT_SUPPORTED';   
    			break;
    		case WL.EncryptedCache.ERROR_NO_EOC:
    			tmpStatus = 'ERROR:NO_EOC';   
    			break;
    		case WL.EncryptedCache.ERROR_COULD_NOT_GENERATE_KEY:
    			tmpStatus = 'ERROR:COULD_NOT_GENERATE_KEY';   
    			break;
    		case WL.EncryptedCache.ERROR_CREDENTIALS_MISMATCH:
    			tmpStatus = 'ERROR:CREDENTIALS_MISMATCH';   
    			break;
    		case WL.EncryptedCache.ERROR_EOC_CLOSED:
    			tmpStatus = 'ERROR:EOC_CLOSED';   
    			break;
    		}
			return tmpStatus;
		}
		
		return cacheutil;
	},
};

var cacheUtil = CacheUtil.createNew();