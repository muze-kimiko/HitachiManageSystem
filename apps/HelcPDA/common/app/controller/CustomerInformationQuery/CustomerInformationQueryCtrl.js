Ext.define('HelcPDA.controller.CustomerInformationQuery.CustomerInformationQueryCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'CustomerInformationQueryCtrlID',
config:{
		//wangGuoYiJiaoxinqiSummit_id List_Customer
		control:{
			"button#search_ID":{
				tap:'init2'
			},"list#List_Customer":{
				itemtap:'init3'
			},
		}
},
init2:function(){
	//alert('ok');
	var  obj=Ext.getCmp('customer_id');
	var value=obj.getValue();
	var iswhere="where ACCNT_NAME like '%"+value+"%'";
	 getResult=function(res){
		 //console.log(res);
		 //alert('ok');
		 var list=[];
		 for(var i=0;i<res.rows.length;i++){
			 list[i]=res.rows[i];
		 }
		 //console.log(list);
		 //console.log(list[0]);
		 store=Ext.data.StoreManager.get("installtaskStore2");
			if(!store){
				store=Ext.create("HelcPDA.store.install.installtask.installtaskStore2");
			}
			store.setData(list,this);
	 };
	
	var content={};
	content.iswhere = iswhere;
	this.connectServer(getResult,"customerAction.do?method=toSearch",JSON.stringify(content));
	
},
init3:function(obj, index, target, record, e, eOpts){
	var object=Ext.getCmp('CustomerInformation_ID');
	if(!object){
		object=Ext.create('HelcPDA.view.CustomerInformationQuery.CustomerInformation');
	}
	Ext.Viewport.setActiveItem(object);
	 store=Ext.data.StoreManager.get("installtaskStore2");
		if(!store){
			store=Ext.create("HelcPDA.store.install.installtask.installtaskStore2");
		}
		var ACCNT_NAME=store.getAt(index).get('ACCNT_NAME');
		var iswhere="where ACCNT_NAME like '%"+ACCNT_NAME+"%'";
		 getResult=function(res){
            //console.log(res);
            var list=[];
            for(var i=0;i<res.rows.length;i++){
            	list[i]=res.rows[i];
            }
            var obj1=Ext.getCmp('ACCNT_ATTR');
            obj1.setValue(list[0].ACCNT_ATTR);
            var obj2=Ext.getCmp('ACCNT_KA_NUM');
            obj2.setValue(list[0].ACCNT_KA_NUM);
            var obj3=Ext.getCmp('MP_TYPE');
            obj3.setValue(list[0].MP_TYPE);
            var obj4=Ext.getCmp('ACCNT_PROPERTY');
            obj4.setValue(list[0].ACCNT_PROPERTY);
            var obj5=Ext.getCmp('ACCNT_TYPE');
            obj5.setValue(list[0].ACCNT_TYPE);
            var obj6=Ext.getCmp('ACCNT_SUB_TYPE');
            obj6.setValue(list[0].ACCNT_SUB_TYPE);
            var obj7=Ext.getCmp('STATUS');
            obj7.setValue(list[0].STATUS);
            var obj8=Ext.getCmp('ACCNT_CODE');
            obj8.setValue(list[0].ACCNT_CODE);
            var obj9=Ext.getCmp('MAIN_FAX_NUM');
            obj9.setValue(list[0].MAIN_FAX_NUM);
            var obj10=Ext.getCmp('MAIN_PHONE_NUM');
            obj10.setValue(list[0].MAIN_PHONE_NUM);
            var obj11=Ext.getCmp('ACCNT_NAME');
            obj11.setValue(list[0].ACCNT_NAME);
            var obj12=Ext.getCmp('COMPANY_ID');
            obj12.setValue(list[0].COMPANY_ID);
            var obj13=Ext.getCmp('ADDRESS_ID');
            obj13.setValue(list[0].ADDRESS_ID);
		 }; 
		 var content={};
		content.iswhere = iswhere;
		this.connectServer(getResult,"customerAction.do?method=toSearch",JSON.stringify(content));
}
});