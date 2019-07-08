Ext.define('HelcOA.controller.ForApprovalProcess.DailyOffice.POFormExamineCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	config:{
		control:{
			//上一页
			'button#PO_arrow_up':{
				tap:'PO_arrow_up',
			 },
			 //下一页
			 'button#PO_arrow_down':{
				 tap:'PO_arrow_down',
			 },
		}
	},
	
	
	initPOForm : function(){
		var po_header_id = Ext.getCmp('po_header_id').getValue();
//		var po_header_id = '924661';
		var store = this.getStore('POFormStore','HelcOA.store.startTheProcess.DailyOffice.POFormStore');
		var start = '0';
		var limit = '8';
		var getResult=function(res){
			var result = ""+res.count/8+"";
			if(result=='NaN'){
				return;
			}
			var count;
			if(result.indexOf(".")!=-1){
				count = parseInt(res.count/8)+1;
			}else{
				count = parseInt(res.count/8);
			}
			if(res.count==0){
				Ext.getCmp('PO_page').setText('0/0');
			}else{
				Ext.getCmp('PO_page').setText('1/'+count);
			}
			var data = res.data;
			cc.log(data);
			store.setData(data);
		};
		
		var params = {};
		params.method = 'POFormExamine';
		params.parameters = [po_header_id,start,limit,userkey];
		this.connectServer_BPM(getResult,params);
		cc.log(params.parameters);
	},
	
	PO_arrow_up : function(){
		var po_header_id = Ext.getCmp('po_header_id').getValue();
//		var po_header_id = '924661';
		var store = this.getStore('POFormStore','HelcOA.store.startTheProcess.DailyOffice.POFormStore');
		var items = store.data.items;
		if(items.length == 0){
			return;
		}
		var startNum =  parseInt(items[0].data.line_num)-9;
		var start = startNum.toString();
		if(start <0){
			Ext.Msg.alert('这是第一页!');
			return;
		};
		var limitNum = startNum+8;
		var limit = limitNum.toString();
		var getResult=function(res){
			var count = res.count/8;
			var data = res.data;
			var page = (parseInt(data[0].line_num/8))+1;
			Ext.getCmp('PO_page').setText(page+'/'+count);
			cc.log(data);
			store.setData(data);
		};
		
		var params = {};
		params.method = 'POFormExamine';
		params.parameters = [po_header_id,start,limit,userkey];
		this.connectServer_BPM(getResult,params);
	},
	
	
	PO_arrow_down : function(){
		var po_header_id = Ext.getCmp('po_header_id').getValue();
//		var po_header_id = '924661';
		var store = this.getStore('POFormStore','HelcOA.store.startTheProcess.DailyOffice.POFormStore');
		var items = store.data.items;
		if(typeof(items[7]) == "undefined"){
			return;
		};
		var startNum =  parseInt(items[7].data.line_num);
		var start = startNum.toString();
		var limitNum = startNum+8;
		var limit = limitNum.toString();
		var getResult=function(res){
			var data = res.data;
			if(data.length == 0){
				Ext.Msg.alert('这是最后一页了!');
				return;
			}
			var count = res.count/8;
			var page = (parseInt(data[0].line_num/8))+1;
			Ext.getCmp('PO_page').setText(page+'/'+count);
			store.setData(data);
		};
		
		var params = {};
		params.method = 'POFormExamine';
		params.parameters = [po_header_id,start,limit,userkey];
		this.connectServer_BPM(getResult,params);
	},
});