
/* JavaScript content from app/controller/report/pdabbxx/pdabbxxCtrl.js in folder common */
Ext.define('HelcPDA.controller.report.pdabbxx.pdabbxxCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'installCompleteCtrl',
	config:{
		refs:{
	
			to_List:'button[id=pdabbxx]',
			
			pdabbxx_List:'list[id=pdabbxx_List]',

			pdabbxx_back:'button[id=pdabbxx_back]',
		},
		control:{
			to_List:{
				tap:'pdabbxx_list',
			},

			pdabbxx_List:{
				itemtap:'pdabbxx_List',
			},

			pdabbxx_back:{
				tap:'pdabbxx_back',
			}
		}
	},
	pdabbxx_back:function(){
		this.BackView();
		var store=obj.getStore('pdabbxx_List_Store','HelcPDA.store.report.pdabbxx.pdabbxx_List_Store');	
		store.setData([]);
		
	},
	//进入list页面
	pdabbxx_list:function(){
		var obj=this;
		this.NextView('Pdabbxx_List_View','HelcPDA.view.report.pdabbxx.Pdabbxx_List_View');
		var hqflag=HQFlag;
		var companyid=Ext.getCmp('choiceCompany').getValue();
		if(companyid==null||typeof(companyid)=='undefined'){	
			companyid="";
		}
		var companycode=company_code;
		//var choiceCompany=Ext.getCmp('choiceCompany');
		var choiceType=Ext.getCmp('choiceType').getValue();
		if(choiceType==null||typeof(companyid)=='undefined'){
			choiceType="A";
		}
		
		 function getResult(res){
			    
				console.log(JSON.stringify(res));
				var store=obj.getStore('pdabbxx_List_Store','HelcPDA.store.report.pdabbxx.pdabbxx_List_Store');	
				//console.log("hehe"+JSON.stringify(res.item));
				store.setData(res.item);
				
				
				//console.log("hehee"+res.COMPANY+"sdasad"+res.TYPE);
				Ext.getCmp('choiceType').setOptions(res.TYPE);
				Ext.getCmp('choiceType').addListener('change',function(){
					var store=obj.getStore('pdabbxx_List_Store','HelcPDA.store.report.pdabbxx.pdabbxx_List_Store');
					var choiceCompany=Ext.getCmp('choiceCompany');
					var companyid="";
					var value=choiceCompany.getValue();
					if(value==''||value==null||typeof(value)=='undefined'){
						companyid="";
					}else{
						companyid=value;
					}
					var choiceType=Ext.getCmp('choiceType').getValue();

					function getResult(res){
						
						store.setData(res.item);
						obj.HideWaitting();
					}
					var content={HQFlag:hqflag,company_id:companyid,company_code:companycode,type:choiceType};
					obj.connectServer(getResult,'pdabbxx.do?method=toSearch', JSON.stringify(content));
					obj.Waitting('获取数据中...');
				});
				Ext.getCmp('choiceCompany').setOptions(res.COMPANY);
				Ext.getCmp('choiceCompany').addListener('change',function(){
					var store=obj.getStore('pdabbxx_List_Store','HelcPDA.store.report.pdabbxx.pdabbxx_List_Store');
					var choiceCompany=Ext.getCmp('choiceCompany').getValue();
					var choiceType=Ext.getCmp('choiceType').getValue();
					var companyid=choiceCompany;
					if(choiceType==null||typeof(choiceType)=='undefined'){
						choiceType="A";
					}

					function getResult(res){
					
						store.setData(res.item);
						obj.HideWaitting();
					}
					var content={HQFlag:hqflag,company_id:companyid,company_code:companycode,type:choiceType};
					obj.connectServer(getResult,'pdabbxx.do?method=toSearch', JSON.stringify(content));
					obj.Waitting('获取数据中...');
				});
				obj.HideWaitting();
		 }
		var content={HQFlag:hqflag,company_id:companyid,company_code:companycode,type:choiceType};
	    this.connectServer(getResult,'pdabbxx.do?method=toSearch', JSON.stringify(content));
	    obj.Waitting('获取数据中...');
	},

	pdabbxx_List:function(obj,index,target,record,e,eOpts){
		
		this.NextView('Pdabbxx_View','HelcPDA.view.report.pdabbxx.Pdabbxx_View');
		var i;
		//var store=this.getStore('pdabbxx_List_Store','HelcPDA.store.report.pdabbxx.pdabbxx_List_Store');	
        var name=['AREA','COMPANY','LOGIN_TOTAL','LOGIN_1_2','RATE_1_2','LOGIN_3_8','RATE_3_8',
                   'LOGIN_9_15','RATE_9_15','LOGIN_16_30','RATE_16_30','LOGIN_31_60','RATE_31_60',
                   'LOGIN_60','RATE_60'
                   ];
       // console.log(record.get('AREA'));
        
        for(i=0;i<name.length;i++){
        	Ext.getCmp(name[i]).setValue(record.get(name[i]));
        }
	}    
});

