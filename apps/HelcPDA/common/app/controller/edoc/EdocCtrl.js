Ext.define('HelcPDA.controller.edoc.EdocCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		control:{
			"container#edoc_view":{
				initialize:'edoc_view_init'
			},
		},
	},
	
	edoc_view_init : function(){
		var obj = this;
		var getResult = function(res){
			var v_list = [];
			var tmpStore=Ext.data.StoreManager.get('EdocStore');
			if(!tmpStore){
				tmpStore = Ext.create("HelcPDA.store.edoc.EdocStore");
			}
			
			if(typeof(res.GetZuixinFabuWenjianResponse) != 'undefined'){
				var response = res.GetZuixinFabuWenjianResponse.GetZuixinFabuWenjianResult;
				response = eval("("+ response +")")
//				console.log(response);
				
				if(response != ''){
					if(response.length){
						for(var x = 0; x < response.length;x++){
							v_list.push({
								id:response[x].id,
								bianhao:response[x].bianhao,
								wenDangBiaoti:response[x].wenDangBiaoti,
								banben:response[x].banben,
								fabuRiqi:response[x].fabuRiqi,
							})
						}
						
						tmpStore.setData(v_list);
						tmpStore.sort('fabuRiqi','DESC');
					}
				}else{
					tmpStore.setData(v_list);
					Ext.Msg.alert('温馨提示','没有工程文件公告');
				}
			}else{
				tmpStore.setData(v_list);
				Ext.Msg.alert('温馨提示','没有工程文件公告');
			}
			
		};
		
		var fulluserid = '00000000'+userid;
		fulluserid = fulluserid.slice(-8);
//		fulluserid = '00009339';
		var parameters = {
				userid : fulluserid,
		}
		
		obj.getDataFromEdoc(getResult, parameters);
	},
	
});
