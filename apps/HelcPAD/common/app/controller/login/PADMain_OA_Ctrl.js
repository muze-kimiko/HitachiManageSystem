Ext.define('HelcPAD.controller.login.PADMain_OA_Ctrl', {
	extend:'HelcPAD.controller.ApplicationController_OA',
	
	config: {
        control: {
        	//OA移动办公
			"dataview#oaMobileOffice":{
				itemtap:'oaMobileOffice'
			},
        }
	},
	
	//OA移动办公
	oaMobileOffice:function(obj, index, target, record, e, eOpts){
		var obj = this;
		var text = record.data.text;
		if(text == '公司通讯录'){
			obj.NextView('telephonesearch_id','HelcPAD.view.OaMobileOffice.Contacts.TelephoneSearch');
			var data=[];
			data[0]={value:'0000',text:'【全部】'};
			data[1]={value:'1001',text:'日立电梯（中国）有限公司'};
			data[2]={value:'1074',text:'日立电梯（中国）有限公司广州工厂'};
			data[3]={value:'1058',text:'日立电梯（广州）自动扶梯有限公司'};
			data[4]={value:'1042',text:'广州日滨科技发展有限公司'};
			data[5]={value:'1002',text:'日立电梯（上海）有限公司'};
			data[6]={value:'1003',text:'日立楼宇设备制造（天津）有限公司'};
			data[7]={value:'1059',text:'日立电梯（成都）有限公司'};
			data[8]={value:'1041',text:'日立电梯电机(广州)有限公司'};
			data[9]={value:'1062',text:'日立数字安防系统(上海)有限公司'};
			Ext.getCmp('telephonesearch_id_company').setOptions(eval(data));
		}else if(text == 'OA电子流程'){
			getResult = function(res) {
				console.log(res);
				//cc.log(res);
				if(typeof(res)=="undefined"){
					WL.Toast.show("服务器出错!");
				} else if (res.isSuccessful == false) {
					WL.Toast.show('用户名或者密码错误!');
				} else if (res.isSuccessful == true) {
					_vt = res.data._vt;
					userkey = res.data.userkey;
					jieguoOne();
				//bmp获取数据
				    var myParam = [_vt,password];
					var params = {};
					params.adpName = 'HttpAdapter_BPM';
					params.prodNmae = 'startTheProcess';
					params.prmName = myParam;
				    obj.connectServerComm(getResult1,params);	
					
				}
			};
			var content = {
				name : OA_df_usernames,
				password : password
			};
			//测试用户名
			usernames=OA_df_usernames;
			this.connectServer2(getResult, content);
			
			
			//符合条件
			function jieguoOne(){
				obj.NextView('installProject_ep_id','HelcPAD.view.OaMobileOffice.ElectronicProcess.installProject');
				var informationList_data  = [];
		    	informationList_data.push(
						{
							title: '出差申请',
		                    color: '#fbb726',
		                    icon: 's'
						}
				);
		    	informationList_data.push(
						{
							title: '境外出差申请',
		                    color: '#fbb726',
		                    icon: 's'
						}
				);
		    	informationList_data.push(
						{
							title: '用印申请',
		                    color: '#fbb726',
		                    icon: 's'
						}
				);
		    	informationList_data.push(
						{
							title: '合同校正章(1)用印申请',
		                    color: '#fbb726',
		                    icon: 's'
						}
				);
		    	informationList_data.push(
						{
							title: '接待客户工作联络流程',
		                    color: '#fbb726',
		                    icon: 's'
						}
				);
		    	Ext.getCmp('install_project_list_ep').setData(informationList_data);
			};
	/////////////////////////////////////////////////////////////////////////////
			//bpm获取数据
			var getResult1=function(res){
				cc.log("----------------res-----------------");
				var ovar = eval("("+ res.toProcessListResponse.ovar +")");
				cc.log(ovar.data);
				var i,cs=0;
				var userSolist=[];
				var tp_data={};
				for(i=0;i<ovar.data.length;i++){
					if(ovar.data[i].bpdname=="出差申请")
					{
	    	    	tp_data.bpdname=ovar.data[i].bpdname;
	    	    	tp_data.appacronym=ovar.data[i].appacronym;
	    	    	tp_data.appid=ovar.data[i].appid;
	    	    	tp_data.appname=ovar.data[i].appname;
	    	    	tp_data.bpdid=ovar.data[i].bpdid;
	    	    	tp_data.cfgid=ovar.data[i].cfgid;
	    	    	tp_data.id1=ovar.data[i].id1;
	    	    	tp_data.snapshotcreatedon=ovar.data[i].snapshotcreatedon;
	    	    	tp_data.snapshotid=ovar.data[i].snapshotid;
	    	    	tp_data.snapshotname=ovar.data[i].snapshotname;
	    	    	userSolist[cs]=tp_data;
	    	    	cs++;
	    	    	}
				}
				

				var store=Ext.data.StoreManager.get("startTheProcessStore");
				if(!store){
					store=Ext.create("HelcPAD.store.OaMobileOffice.ElectronicProcess.startTheProcessStore");
				}
				store.setData(userSolist[0]);   

			};


			
			
			
		}else if(text=='设置'){
			
		}else if(text=='退出登录'){
			var main = Ext.getCmp('padlogin_id');
      	 	if(!main){
      		 main = Ext.create('HelcPAD.view.login.PADLogin');
      	 	}
      	 	Ext.Viewport.setActiveItem(main);
      	 	ViewArray.splice(ViewArray.length-1,1);
      	 	ViewArray = [];
			//obj.showBackView('padlogin_id','HelcPAD.view.login.PADLogin');
		};
		
	},

});