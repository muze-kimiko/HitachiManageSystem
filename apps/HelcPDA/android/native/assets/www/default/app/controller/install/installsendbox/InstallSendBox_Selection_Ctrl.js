
/* JavaScript content from app/controller/install/installsendbox/InstallSendBox_Selection_Ctrl.js in folder common */
Ext.define('HelcPDA.controller.install.installsendbox.InstallSendBox_Selection_Ctrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'instsb_list_ctrl',
	config:{
		refs:{
		},
		control:{
			// 点击下载
			'button#btn_instsb_downdate':{
				tap:'down_Load'
			},

			// 转到工号列表
			'list#instsb_list': {
				itemtap:'toSendBoxEnoList'
			},
			
			// 转到箱头列表
			'list#instsb_enolist': {
				itemtap:'toSendBoxBoxList'
			},
			
			'button#btn_instsb_selback': {
				tap:'selBackToCnoList'
			},
			
			'button#instsb_searchdata_btn': {
				tap:'selBackToCnoList_local'
			},
			
			'button#btn_instsb_listback': {
				tap:'selBackToInstMenu'
			},
			
			'button#btn_instsb_todownload': {
				tap:'instsbToDownLoad'
			},
			
			'button#btn_instsb_tosearch': {
				tap:'instsbToSerach'
			},
			
			'button#btn_instsb_backToCnoList': {
				tap:'instsbBackToCnoList'
			},
			
			// 工号转到批量箱头
			'button#btn_instsb_evol': {
				tap:'enoToSendBoxDetail'
			},
			
		}
	},
	
	// 工号列表到批量箱头
	enoToSendBoxDetail: function() {
		var obj_c = this;
		var cno = Ext.getCmp('hfinstsb_contractno').getValue();
		var store = Ext.data.StoreManager.get('InstallSendBox_list_Store');
		var names = document.getElementsByName('instsb_eno_check');
		var enoname_str = '';
		var boxname_str = '';
		var length = names.length;
		for (var i = 0; i < length; i ++) {
			if (names[i].className=='p_judge_box_clicked') {
				if(enoname_str=='') {
					enoname_str += store.getAt(i).get('MSGTITLE');
				} else {
					enoname_str += '_'+store.getAt(i).get('MSGTITLE');					
				}
			}
		}
		
		if (enoname_str=='') {
			WL.Toast.show('没有数据被选中！');
			return ;
		}
		
		// 拼装选择的箱头
		var selection_find = {tcode:'INSTALL_SENDBOX',tid:parseInt(cno.substring(2)).toString()};
		var options = {exact : false};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
			var length = arrayResults2.length;
			if (length < 1) {
				WL.Toast.show('找不到本地数据！请同步试试');
				return ;
			}
			for (var i = 0; i < length; i ++) {
				var item = arrayResults2[i].json.stext;
				// 筛选已提交未提交数量
				if (item.DATA_SOURCE == "EBS" && enoname_str.indexOf(item.ELEVATOR_NO) != -1) {
					if (boxname_str == '') {
						boxname_str += item.ELVBOX_NAME;
					} else {
						boxname_str += '_'+item.ELVBOX_NAME;
					}
				}
			}
			if (boxname_str != '') {
				obj_c.NextView("instsb_detail_Volume_view","HelcPDA.view.install.installsendbox.InstallSendBox_Detail_Volume_V");
				var obj = Ext.getCmp('instsb_detail_Volume_view');
				obj.initData(boxname_str,cno);
				Ext.getCmp('hfinstsb_VolFlag').setValue('ENO');
			}
		}).fail(function(errorObject){
		});		
	},
	
	instsbBackToCnoList: function() {
		var store = Ext.data.StoreManager.get('InstallSendBox_list_Store');
		store.setData([]);
		this.showBackView('instsb_list_view','HelcPDA.view.install.installsendbox.InstallSendBox_List_V');
		var obj_v = Ext.getCmp('instsb_list_view');
		obj_v.loadDataJST();
	},
	
	instsbToSerach: function() {
		this.NextView('instsb_search_v','HelcPDA.view.install.installsendbox.InstallSendBox_Search_V');
	},
	
	instsbToDownLoad: function() {
		this.NextView('instsb_sel_v','HelcPDA.view.install.installsendbox.InstallSendBox_Selection_V');
	},
	
	//返回到安装菜单界面
	selBackToInstMenu: function() {
//		var flag = Ext.getCmp('hfmenu_daiban_flag').getValue();
//		if (flag == 0) {
			this.BackView();
//    		this.showBackView('installProject_id','HelcPDA.view.install.installProject');
//		} else {
//			this.BackView();
//    		this.showBackView('MenusView_id','HelcPDA.view.MenusView');
//		}
	},
	
	// 返回
	selBackToCnoList: function() {
		this.showBackView("instsb_list_view","HelcPDA.view.install.installsendbox.InstallSendBox_List_V");
	},
	
	// 查询返回
	selBackToCnoList_local: function() {
		this.showBackView("instsb_list_view","HelcPDA.view.install.installsendbox.InstallSendBox_List_V");
		// 显示数据在List上
		var obj_v = Ext.getCmp('instsb_list_view');
		obj_v.loadDataJST();
	},
	
	// 转到每一个箱头列表
	toSendBoxBoxList: function(obj, index, target, record, e, eOpts) {
		var store = Ext.data.StoreManager.get('InstallSendBox_list_Store');
		if (!store) { 
			store = Ext.create("HelcPDA.store.install.installsendbox.InstallSendBox_list_Store"); 
		}
		var eno = store.getAt(index).get('MSGTITLE');
		if(event.target.id != 'instsb_eno_checkid'){//instsb_elist
			store.setData([]);
			this.NextView("instsb_boxlist_view","HelcPDA.view.install.installsendbox.InstallSendBox_BoxList_V");
			var obj_v = Ext.getCmp('instsb_boxlist_view');
			obj_v.loadDataJST_BoxList(eno);
		} else {
			var sbenoCheck = document.getElementsByName("instsb_eno_check");
			if(sbenoCheck[index].className=='p_judge_box')
            {
				var length = sbenoCheck.length;
				var index_temp = 0;
				for (var i = 0; i < length; i ++) {
					if (sbenoCheck[i].className == 'p_judge_box_clicked') {
						index_temp ++;
					}
					if(index_temp > 2) {
						WL.Toast.show('每次勾选不能超过3个工号！');
						return ;
					}
				}
                sbenoCheck[index].className = 'p_judge_box_clicked';
            }
            else
            {
                sbenoCheck[index].className = 'p_judge_box';
            }
		}
	},
	
	// 转到箱头工号列表
	toSendBoxEnoList: function(obj, index, target, record, e, eOpts) {
		var store = Ext.data.StoreManager.get('InstallSendBox_list_Store');
		if (!store) { 
			store = Ext.create("HelcPDA.store.install.installsendbox.InstallSendBox_list_Store"); 
		}
		var cno = store.getAt(index).get('MSGTITLE').split('/')[0];
		store.setData([]);
		this.NextView("instsb_enolist_view","HelcPDA.view.install.installsendbox.InstallSendBox_EnoList_V");
		var obj_v = Ext.getCmp('instsb_enolist_view');
		obj_v.loadDataJST_Eno(cno);
	},
	
	//下载数据
	down_Load : function(){
		var store = Ext.data.StoreManager.get('InstallSendBox_list_Store');
		if (!store) { 
			store = Ext.create("HelcPDA.store.install.installsendbox.InstallSendBox_list_Store"); 
		}
		store.setData([]);
		var ENGCONTRACT_NUMBER=Ext.getCmp('tf_instsb_con').getValue();
		var ELEVATOR_NO=Ext.getCmp('tf_insteno_eno').getValue();
		var CUSTOMER_NAME=Ext.getCmp('tf_insteno_pro').getValue();
		this.showBackView("instsb_list_view","HelcPDA.view.install.installsendbox.InstallSendBox_List_V");
		
		var sobj = {};
		var selection = {};
		selection.ENGCONTRACT_NUMBER = ENGCONTRACT_NUMBER;
		selection.ELEVATOR_NO = ELEVATOR_NO;
		selection.CUSTOMER_NAME = CUSTOMER_NAME;
		sobj.sel = selection; 
		sobj.obj = this;
		
		var keys="{'CONTRACT_NO':'"+ENGCONTRACT_NUMBER+"','init_person_id':'"+
		init_person_id+"',CONTRACT_NO:'"+ENGCONTRACT_NUMBER+"',ELEVATOR_NO:'"+
		ELEVATOR_NO+"',PROJECT_NAME:'"+CUSTOMER_NAME+"'}";
		
		// 查找之前先删除本地数据
		var query = {tcode : 'INSTALL_SENDBOX'};
		var options = {};
		WL.JSONStore.get(collectionName).remove(query, options)
		.then(function(numberOfDocumentsRemoved) {
			query = {tcode : 'INSTALL_VALUE_SENDBOX'};
			WL.JSONStore.get(collectionName).remove(query, options)
			.then(function(result) {
			})
			.fail(function(errorObject) {
			});
		})
		.fail(function(errorObject) {
		});
		// 开始访问服务器
		this.connectServerMainTain(this.toCountTimes,sobj,"installBoxAction.do?method=toSearchCount",keys);
	},
	
	toCountTimes:function(result,sobj){
		var obj = sobj.obj;
		var select = sobj.sel;
		// 如果没有数据就返回
		if (result.count < 1) {
			WL.Toast.show('找不到对应数据！');
			return ;
		}
		var instalcount=parseInt((result.count/200)+1);
		//查询起始位置
		var INT_WSH_LINE_ID=0;
		var index = 0;
		///var ENGCONTRACT_NUMBER=Ext.getCmp('tf_instsb_con').getValue();
		var ENGCONTRACT_NUMBER = select.ENGCONTRACT_NUMBER;
		//var ELEVATOR_NO=Ext.getCmp('tf_insteno_eno').getValue();
		var ELEVATOR_NO = select.ELEVATOR_NO;
		//var CUSTOMER_NAME=Ext.getCmp('tf_insteno_pro').getValue();
		var CUSTOMER_NAME = select.CUSTOMER_NAME;
		var td={};
		td.CONTRACT_NO=ENGCONTRACT_NUMBER;
		td.ELEVATOR_NO=ELEVATOR_NO; 
		td.CUSTOMER_NAME=CUSTOMER_NAME; 
		td.init_person_id=init_person_id; 
		td.INT_WSH_LINE_ID=INT_WSH_LINE_ID;
		obj.connectServerMainTain(handleResult,obj,"installBoxAction.do?method=toSearch",JSON.stringify(td));
		function handleResult(result,obj) {
			index ++;
			td.INT_WSH_LINE_ID = result.INT_WSH_LINE_ID;
			
			// 保存数据进JSONSTORE
			var length=result.item.length;
			var data = [];
			for(var i=0;i<length;i++){
				var item = result.item[i];
				var id=item.CONTRACT_NO+'_'+item.ELEVATOR_NO+'_'+item.ELVBOX_NAME;
				data[i]={tcode:'INSTALL_SENDBOX',tid:id,stext:item};
			};
			if(data.length==0){
				WL.Toast.show('数据不存在');
			} else {
				WL.JSONStore.get(collectionName).add(data).then(function(){
					if (index == (instalcount)) {
						// 显示数据在List上
						var obj_v = Ext.getCmp('instsb_list_view');
						obj_v.loadDataJST();
					}
				}).fail(function(errorObject){
				});
			}
			
			// 当次获取完时
			if (index < instalcount) {
				obj.connectServerMainTain(handleResult,obj,"installBoxAction.do?method=toSearch",JSON.stringify(td));
			} else {
				return ;
			}
		}
		
	}

});

/*  
002  * MAP对象，实现MAP功能  
003  *  
004  * 接口：  
005  * size()     获取MAP元素个数  
006  * isEmpty()    判断MAP是否为空  
007  * clear()     删除MAP所有元素  
008  * put(key, value)   向MAP中增加元素（key, value)   
009  * remove(key)    删除指定KEY的元素，成功返回True，失败返回False  
010  * get(key)    获取指定KEY的元素值VALUE，失败返回NULL  
011  * element(index)   获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL  
012  * containsKey(key)  判断MAP中是否含有指定KEY的元素  
013  * containsValue(value) 判断MAP中是否含有指定VALUE的元素  
014  * values()    获取MAP中所有VALUE的数组（ARRAY）  
015  * keys()     获取MAP中所有KEY的数组（ARRAY）  
016  *  
017  * 例子：  
018  * var map = new Map();  
019  *  
020  * map.put("key", "value");  
021  * var val = map.get("key")  
023  *  
024  */ 
 function Map() {  
     this.elements = new Array();  
    
     //获取MAP元素个数  
     this.size = function() {  
         return this.elements.length;  
     };  
    
     //判断MAP是否为空  
     this.isEmpty = function() {  
         return (this.elements.length < 1);  
     };
    
     //删除MAP所有元素  
     this.clear = function() {  
         this.elements = new Array();  
     };  
    
     //向MAP中增加元素（key, value)   
     this.put = function(_key, _value) {
    	 this.remove(_key);
         this.elements.push( {  
             key : _key,  
             value : _value  
         });  
     };  
    
     //删除指定KEY的元素，成功返回True，失败返回False  
     this.remove = function(_key) {  
         var bln = false;  
         try {  
             for (i = 0; i < this.elements.length; i++) {  
                 if (this.elements[i].key == _key) {  
                     this.elements.splice(i, 1);  
                     return true;  
                 }  
             }  
         } catch (e) {  
             bln = false;  
         }  
         return bln;  
     };  
    
     //获取指定KEY的元素值VALUE，失败返回NULL  
     this.get = function(_key) {  
         try {  
             for (i = 0; i < this.elements.length; i++) {  
                 if (this.elements[i].key == _key) {  
                     return this.elements[i].value;  
                 }  
             }  
         } catch (e) {  
             return null;  
         }  
     };  
   
     //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL  
     this.element = function(_index) {  
         if (_index < 0 || _index >= this.elements.length) {  
             return null;  
         }  
         return this.elements[_index];  
     };
    
     //判断MAP中是否含有指定KEY的元素  
     this.containsKey = function(_key) {  
         var bln = false;  
         try {  
             for (i = 0; i < this.elements.length; i++) {  
                 if (this.elements[i].key == _key) {  
                     bln = true;  
                 }  
             }  
         } catch (e) {  
             bln = false;  
         }  
         return bln;  
     };  
    
     //判断MAP中是否含有指定VALUE的元素  
     this.containsValue = function(_value) {  
         var bln = false;  
         try {  
             for (i = 0; i < this.elements.length; i++) {  
                 if (this.elements[i].value == _value) {  
                     bln = true;  
                 }  
             }  
         } catch (e) {  
             bln = false;  
         }  
         return bln;  
     };  
    
     //获取MAP中所有VALUE的数组（ARRAY）  
     this.values = function() {  
         var arr = new Array();  
         for (i = 0; i < this.elements.length; i++) {  
             arr.push(this.elements[i].value);  
         }  
         return arr;  
     };  
    
     //获取MAP中所有KEY的数组（ARRAY）  
     this.keys = function() {  
         var arr = new Array();  
         for (i = 0; i < this.elements.length; i++) {  
             arr.push(this.elements[i].key);  
         }  
         return arr;  
     };  
 } 
