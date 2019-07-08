
/* JavaScript content from app/controller/OaMobileOffice/Contacts/TelephoneListCtrl.js in folder common */
Ext.define('HelcPAD.controller.OaMobileOffice.Contacts.TelephoneListCtrl',{
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			//返回按钮
			"button#telephonelist_id_FH":{
				tap:'telephonelist_id_FH'
			},
			
			//联系人 list
			"list#telephonelist_id_list":{
				itemtap:'telephonelist_id_list'
			},
		}
	},
	
	//返回按钮
	telephonelist_id_FH:function(){
		this.showBackView('telephonesearch_id','HelcPAD.view.OaMobileOffice.Contacts.TelephoneSearch');
		//清空
		var tempArray=['telephonesearch_id_company','telephonesearch_id_name','telephonesearch_id_department','telephonesearch_id_number','telephonesearch_id_SpecialNumber'];
		for(var i=0;i<tempArray.length;i++){
			Ext.getCmp(tempArray[i]).setValue('');
		};
	},
	
	//联系人 list
	telephonelist_id_list:function(dataview, index, target, record, e, eOpts){
		//alert(event.target.id);
		if(event.target.id!='telid'){
			this.NextView('telephonedetailed_id','HelcPAD.view.OaMobileOffice.Contacts.TelephoneDetailed');
			var datads=Ext.data.StoreManager.get('TelephoneAddressStore');
			if(!datads){
				datads=Ext.create('HelcPAD.store.OaMobileOffice.Contacts.TelephoneAddressStore');
			};
			
			//数据仓
			var name=[];
			name[0]='ORGNAME';
			name[1]='DEPTNAME';
			name[2]='PSNCODE';
			name[3]='PSNNAME';
			name[4]='DTEL';
			//name[5]='OTEL1';
			name[5]='OTEL2';
			name[6]='EMAIL2';
			//textfield控件名
			var tf=[];
			tf[0]='orgname';
			tf[1]='deptname';
			tf[2]='psncode';
			tf[3]='psnname';
			tf[4]='dtel';
			//tf[5]='otel1';
			tf[5]='otel2';
			tf[6]='email2';
			var leng=tf.length;
			
			Ext.getCmp(tf[0]).setValue(datads.getAt(index).get(name[0]));
			
			var one=datads.getAt(index).get(name[1]);
			Ext.getCmp(tf[1]).setValue(one.trim());
			
			var two=datads.getAt(index).get(name[2]);
			var two2=two.substr(1,8);
			//cc.log(two2);
			Ext.getCmp(tf[2]).setValue(two2);
			
			Ext.getCmp(tf[3]).setValue(datads.getAt(index).get(name[3]));
			
			var four=datads.getAt(index).get(name[4]);
			//没有号码2
			//cc.log(four);
			if(four==null){
				Ext.getCmp(tf[4]).setValue('');
			}else{
				var four2=four.substr(4,5);
				//cc.log('four2 '+four2);
				Ext.getCmp(tf[4]).setValue(four2);	
			};
			
			Ext.getCmp(tf[5]).setValue(datads.getAt(index).get(name[5]));
			
			Ext.getCmp(tf[6]).setValue(datads.getAt(index).get(name[6]));
			
			if(datads.getAt(index).get('OTEL1')==null){
				Ext.getCmp('otel1').setValue('');
			}else{
				Ext.getCmp('otel1').setHtml("<a style='position:absolute;top:25%;left:0px;' href='tel:"+datads.getAt(index).get('OTEL1')+"'>"+datads.getAt(index).get('OTEL1')+"</a>");
			};
		};
		
	},


});