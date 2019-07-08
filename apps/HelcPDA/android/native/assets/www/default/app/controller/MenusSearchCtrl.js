
/* JavaScript content from app/controller/MenusSearchCtrl.js in folder common */
//专门为主业查询模块编写的页面跳转方法
Ext.define('HelcPDA.controller.MenusSearchCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'MenusSearchCtrl_id',
	config:{
		control:{
			//查询模块 判断是否进行配件信息查询
			"list#informationList_id":{
				itemtap:'informationList_id'
			},
		}
	},
	
	//查询模块 判断是否进行配件信息查询
	informationList_id:function(obk, index, target, record, e, eOpts ){
		var list=Ext.getCmp('informationList_id');
		//console.log(list.getData());
		//return;
		var title=JSON.stringify(list.getData()[index].title);
		//alert(title);
		//return;
		/*if(title=='"物流运单"'){
			this.NextView('TransportSearch','HelcPDA.view.transport.TransportSearch');
		};*/
		if(title=='"历史故障"'){
			this.NextView('historyFault-VID','HelcPDA.view.historyFault.historyFault-V');
		};
		if(title=='"电梯信息"'){
			this.NextView('ElevatorInformation_id','HelcPDA.view.ElevatorInformation.ElevatorInformation');
		};
		if(title=='"客户信息"'){
			this.NextView('customer-vid','HelcPDA.view.customer.customer-v');
		};
		if(title=='"合同信息"'){
			this.NextView('Compactlist','HelcPDA.view.compact.CompactSearchPanel');
		};
		if(title=='"证件信息"'){
			this.NextView('CertificatesInfo_Search','HelcPDA.view.certificatesinfo.CertificatesInfo_Search');
			
			var objId=Ext.getCmp('V_JOB_TYPE_CODE');
			getResult=function(res){
	   	 		var list=[];
	   	 		list=res.item;
	   	 		objId.setOptions(list);
	   	 	};
	   	 	this.connectServer(getResult,'certificatesInfoAction.do?method=toGet_JOB_TYPE_CODE','');
		};
		
		
		if(title=='"配件信息"'){
			this.NextView('com_part_Project_id','HelcPDA.view.fitting.com_part_Project');
			var install_project_list_data  = [];//安装项目子模块列表
			install_project_list_data.push(
					{
                          title: '常用配件',
                          color: '#62bb47',
                          number: '1',
                          icon: 'l'
                    }
			);
			install_project_list_data.push(
					{
						title: '物流运单',
                        //id:'transport_s',
                        color: '#fbb726',
                        number: '2',
                        icon: 's'
					}
			);
			Ext.getCmp('com_part_Project_list').setData(install_project_list_data);
		};
		
		if(title == '"手机号码信息"'){
			this.NextView('cellphoneList','HelcPDA.view.cellphoneinfo.InputCellphoneNumber');
		}
	},
	
});