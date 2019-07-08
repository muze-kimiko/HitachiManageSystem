Ext.define('HelcPDA.view.maintain.maintenance_ready',{
	extend:'Ext.Container',
	id:'main_ready_id',
	config:{
		items:[
			{
			xtype:'toolbar',
			docked:'top',
			title:'读数录入',
			items:[{
				xtype:'button',
				id:'reBack_id',
				text:'返回',
				listeners:{
					tap:function(){
						var PLAN_STATUS=Ext.getCmp('PLAN_STATUS').getValue();
						if(PLAN_STATUS=='已提交'||PLAN_STATUS=='正在等待提交'){
							/*var obj=Ext.getCmp('maintenance_id');
							if(!obj){
								obj=Ext.create('HelcPDA.view.maintain.maintenance_item');
							}
							Ext.Viewport.setActiveItem(obj);*/
							var main = Ext.getCmp('maintenance_id');
					   	 	if(!main){
					   		 main = Ext.create('HelcPDA.view.maintain.maintenance_item');
					   	 	}
					   	 	//销毁返回前的页面
							var ViewId = Ext.Viewport.getActiveItem().id;
							var viewName=Ext.getCmp(ViewId);
							if(viewName){
								viewName.destroy();
							}
							
					   	 	Ext.Viewport.setActiveItem(main);
					   	 	ViewArray.splice(ViewArray.length-1,1);

						}else{
						navigator.notification.confirm('要保存未提交的数据吗？',function(btn){
				 			if(btn ==2){
								var DSLR=Ext.getCmp('maintenance_FLAG').getValue();
								if(DSLR=='0'){
									WL.Toast.show("必须是损坏处理或者是保存读数");
								};
								
							//	Ext.Viewport.setActiveItem(Ext.getCmp('maintenance_ready'));
								var obj1=Ext.getCmp('text_id1');
							    var value1=obj1.getValue();
							    var obj2=Ext.getCmp('text_id2');
							    var value2=obj2.getValue();
								var obj5=Ext.getCmp('hidden1');
								var value5=obj5.getValue();
								var obj6=Ext.getCmp('hidden2');
								var value6=obj6.getValue();
								var obj7=Ext.getCmp('text_id3');
								var value7=obj7.getValue();
								    var obj8=Ext.getCmp('text_id4');
								    var value8=obj8.getValue();
								var TASK_ROW_ID2=Ext.getCmp('hidden2Task_row_Id').getValue();
								var MP_ID2=Ext.getCmp('hidden2_stext_MP_ID').getValue();
								var Str=MP_ID2+'_'+TASK_ROW_ID2;
						//		var collectionName ='user';
								var data1={tcode:'PLAN_PITEM',tid:Str};
								
								var ASSET_NUM = Ext.getCmp("ASSET_NUM").getValue();
								var HIS_COUNTs = Ext.getCmp("HIS_COUNT").getValue();
								var CURR_COUNTs = Ext.getCmp("CURR_COUNT").getValue();
								var mi_sbl_row_id=Ext.getCmp('mi_sbl_row_id').getValue();
								var options={};
								WL.JSONStore.get(collectionName).remove(data1,options).then(function(){	
									
									var keys = ['ASSET_ID','CUR_RUNNING_TIMES','RUNNING_TIME','WHETHER_BREAKDOWN','WHETHER_SAVE'];
									var values = [ASSET_NUM,value7,value8,value5,value6];
									var values_tt = {HIS_RUNNING_TIMES:value1,SASSETX_CUR_RUNNING_TIMES:value2,WHETHER_BREAKDOWN:value5,WHETHER_SAVE:value6,NOW_RUNNING_TIMES:value7,RUNNING_TIMES:value8};
									var types = ['text','int','int','int','int'];
									var stextt = {values_t:values_tt,SBL_ROW_ID:mi_sbl_row_id,ROW_ID:TASK_ROW_ID2,HIS_COUNT:HIS_COUNTs,CURR_COUNT:CURR_COUNTs,key:keys,value:values,type:types};
									//var stextt = {HIS_RUNNING_TIMES:value1,SASSETX_CUR_RUNNING_TIMES:value2,WHETHER_BREAKDOWN:value5,WHETHER_SAVE:value6,NOW_RUNNING_TIMES:value7,RUNNING_TIMES:value8};
									var data={tcode:'PLAN_PITEM',tid:Str,stext:stextt};
									var options = {};
										WL.JSONStore.get(collectionName).add(data, options)
										.then(function (numberOfDocumentsAdded) {
										 WL.Toast.show('保存成功');
										// alert('保存成功');
										 obj7.setValue();
										 obj8.setValue();
										});
									});
							}else{
								Ext.getCmp('text_id3').setValue();
								Ext.getCmp('text_id4').setValue();
								return;
							}
				 		},"返回","取消,确定");

						var main = Ext.getCmp('maintenance_id');
				   	 	if(!main){
				   		 main = Ext.create('HelcPDA.view.maintain.maintenance_item');
				   	 	}
				   	 	//销毁返回前的页面
						var ViewId = Ext.Viewport.getActiveItem().id;
						var viewName=Ext.getCmp(ViewId);
						if(viewName){
							viewName.destroy();
						}
						
				   	 	Ext.Viewport.setActiveItem(main);
				   	 	ViewArray.splice(ViewArray.length-1,1);
							// Ext.getCmp('main_ready_id').destroy();
					}
					}
				}
			},{
				xtype:'spacer'
			},{
				xtype:'button',
				id:'button_id',
				text:'保存',
				
				listeners:{
					tap:function(){
						var PLAN_STATUS=Ext.getCmp('PLAN_STATUS').getValue();
						if(PLAN_STATUS=='已提交'||PLAN_STATUS=='正在等待提交'){
							 WL.Toast.show('已提交或正在等待提交的数据，不能修改');
						}else{
				    var obj1=Ext.getCmp('text_id1');
				    var value1=obj1.getValue();
				    var obj2=Ext.getCmp('text_id2');
				    var value2=obj2.getValue();
					var obj5=Ext.getCmp('hidden1');
					var value5=obj5.getValue();
					var obj6=Ext.getCmp('hidden2');
					var value6=obj6.getValue();
					 var obj7=Ext.getCmp('text_id3');
					    var value7=obj7.getValue();
					    var obj8=Ext.getCmp('text_id4');
					    var value8=obj8.getValue();
					var TASK_ROW_ID2=Ext.getCmp('hidden2Task_row_Id').getValue();
					var MP_ID2=Ext.getCmp('hidden2_stext_MP_ID').getValue();
					var Str=MP_ID2+'_'+TASK_ROW_ID2;
			//		var collectionName ='user';
					var data1={tcode:'PLAN_PITEM',tid:Str};
					
					var ASSET_NUM = Ext.getCmp("ASSET_NUM").getValue();
					var HIS_COUNTs = Ext.getCmp("HIS_COUNT").getValue();
					var CURR_COUNTs = Ext.getCmp("CURR_COUNT").getValue();
					var mi_sbl_row_id=Ext.getCmp('mi_sbl_row_id').getValue();
					var options={};
					WL.JSONStore.get(collectionName).remove(data1,options).then(function(){	
						
					var keys = ['ASSET_ID','CUR_RUNNING_TIMES','RUNNING_TIME','WHETHER_BREAKDOWN','WHETHER_SAVE'];
					var values = [ASSET_NUM,value7,value8,value5,value6];
					var values_tt = {HIS_RUNNING_TIMES:value1,SASSETX_CUR_RUNNING_TIMES:value2,WHETHER_BREAKDOWN:value5,WHETHER_SAVE:value6,NOW_RUNNING_TIMES:value7,RUNNING_TIMES:value8};
					var types = ['text','int','int','int','int'];
					var stextt = {values_t:values_tt,SBL_ROW_ID:mi_sbl_row_id,ROW_ID:TASK_ROW_ID2,HIS_COUNT:HIS_COUNTs,CURR_COUNT:CURR_COUNTs,key:keys,value:values,type:types};
					//var stextt = {HIS_RUNNING_TIMES:value1,SASSETX_CUR_RUNNING_TIMES:value2,WHETHER_BREAKDOWN:value5,WHETHER_SAVE:value6,NOW_RUNNING_TIMES:value7,RUNNING_TIMES:value8};
					var data={tcode:'PLAN_PITEM',tid:Str,stext:stextt};
					var options = {};
					WL.JSONStore.get(collectionName).add(data, options)
					.then(function (numberOfDocumentsAdded) {
						 WL.Toast.show('保存成功');
					});
					});
					}
					}
				}
		
			}]
		},{
			xtype:'formpanel',
			height:'100%',
		    width:'100%',
		   layout:{
			   align:'center'
		   },
			items:[{
				xtype:'fieldset',
				title:'电梯读数记录',				
				items:[
				       {
				xtype:'textfield',
				id:'text_id1',
				label:'工号累计启动次数:',
				 labelWidth: '60%',
				value:0,
				readOnly:true,
				style: 'background:gray'
			},{
				
					xtype:'textfield',
					label:'工号最新启动次数:',
					 labelWidth: '60%',
					id:'text_id2',
					value:'0',
					readOnly:true,
					style: 'background:gray'
				
			},{
				xtype:'numberfield',
				label:'当前启动次数:',
				id:'text_id3',
				 labelWidth: '60%'
				
			},{
				 xtype: 'numberfield',
				 id:'text_id4',
                 label: '运行时间(h):',
                 labelWidth: '60%',
                 listeners:{      
                	 keyup:function(obj,e, eOpts ){
 						var on=Ext.getCmp('text_id4');
 						var ov=on.getValue();
 						var od=parseInt(ov)*200;
 						var ob=Ext.getCmp('text_id3');
 						ob.setValue(od);
 					}
 					}
			},{
				xtype:'hiddenfield',
				id:'hidden1',
				value:0
			},{
				xtype:'hiddenfield',
				id:'hidden2',
				value:0
			},{
				html:'<br>'
			},
			{
				xtype:'container',
                layout:{
                	
                	type:'hbox',
                	pack:'center'
                },
				items:[{
					xtype:'button', 
					id:'button_id1',
					text:'损坏处理',
					listeners:{
	                	tap:function(){
	                		//用于判断是否单机过损坏处理按钮或保存读数数按钮
	                		var PLAN_STATUS=Ext.getCmp('PLAN_STATUS').getValue();
							if(PLAN_STATUS=='已提交'||PLAN_STATUS=='正在等待提交'){
								 WL.Toast.show('已提交或正在等待提交的数据，不能修改');
							}{
	                		Ext.getCmp('maintenance_FLAG').setValue('1');
	                		
	                		var obj=Ext.getCmp('hidden1');
	                		obj.setValue(1);                	
	                		var obj1=Ext.getCmp('hidden2');
	                		obj1.setValue(0);
	                		var oj3=Ext.getCmp('text_id3');
	                		var vj3=oj3.getValue();
	                		var vj13=parseInt(vj3);
	                		if(vj3==null){
	                			//alert('请输入当前启动次数');
	                			WL.Toast.show('请输入当前启动次数');
	                		}else{
	                			var oj2=Ext.getCmp('text_id1');
	                			var vj2=oj2.getValue();
	                			var vj12=parseInt(vj2);
	                			if(vj3<vj2){
	                				//alert('当前启动次数小于工号启动次数');
	                				WL.Toast.show('当前启动次数小于工号启动次数');
	                			}else{
	                				
	    	                		var vj4=vj13+vj12;
	    	                		oj2.setValue(vj4);
	                			}
	                		}
	                		
							}
	                		
	                		}
	                }
				},{
					html:'&nbsp;&nbsp;&nbsp;'
				},{
					xtype:'button',
					id:'button_id2',
					text:'保存读数',
					listeners:{
	                	tap:function(){
	                		//用于判断是否单机过损坏处理按钮或保存读数数按钮
	                		var PLAN_STATUS=Ext.getCmp('PLAN_STATUS').getValue();
							if(PLAN_STATUS=='已提交'||PLAN_STATUS=='正在等待提交'){
								 WL.Toast.show('已提交或正在等待提交的数据，不能修改');
							}{
	                		Ext.getCmp('maintenance_FLAG').setValue('1');
	                		
	                		var obj=Ext.getCmp('hidden1');
	                		obj.setValue(1);                	
	                		var obj1=Ext.getCmp('hidden2');
	                		obj1.setValue(0);
	                		var oj3=Ext.getCmp('text_id3');
	                		var vj3=oj3.getValue();
	                		if(vj3==null){
	                			alert('请输入当前启动次数');
	                		}else{
	                			   var oj2=Ext.getCmp('text_id2');
	                			      oj2.setValue(vj3);
	                		}
	                	
	                	}
							
							
	                	}
	                }
				}],
             
			}],
			html:'<br><div>启动次数填写说明:</div><br><div>1,当前启动次数必须大于工号最新启动次数,点击"保存读数"时,"当前启动次数"将会替代"最新启动次数"</div><br><div>2,若出现计数器损坏或归零,请点击"损坏处理".系统将执行:工号累计启动次数=工号最新启动次数+当前启动次数</div>',
			}]
		}]
	}
});