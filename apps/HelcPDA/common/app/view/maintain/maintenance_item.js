Ext.define('HelcPDA.view.maintain.maintenance_item',{
	extend:'Ext.Container',
	id:'maintenance_id',
	
	config:{
		items:[{
			xtype:'toolbar',
			docked:'top',
			title:'保养项目',
			items:[{
				xtype:'button',
				id:'buttonID',
				text:'保存',
				listeners:{
					tap:function(){
						//var ogj=Ext.getCmp('maintenance_id');
						
						var PLAN_STATUS=Ext.getCmp('PLAN_STATUS').getValue();
						if(PLAN_STATUS=='已提交'||PLAN_STATUS=='正在等待提交'){
							 WL.Toast.show('已提交或正在等待提交的数据,不能修改');
							Ext.Viewport.setActiveItem(Ext.getCmp('DetailPanel'));
						}else{
							var ogj=Ext.getCmp('maintenance_id');
							ogj.dongtaiadd();
						}
						
						var sto1=Ext.data.StoreManager.get("maintenProStroe");
						if(!sto1){
							sto1=Ext.create("HelcPDA.store.maintain.maintenProStroe");
						};
						sto1.setData([]);
					}
				}
			}]
		},{
			xtype:'formpanel',
			height:'100%',
			items:[{
				xtype:'fieldset',
				items:[
				{
					//隐藏文本框
					xtype:'hiddenfield',
					id:'maintenance_FLAG',
					value:'0'
				},
				{
    				//用于存放选工号最新启动次数
    				xtype:'hiddenfield',
    				id:'CURR_COUNT_index2',
    				value:''
    			},
				{
					xtype:'textfield',
					id:'textfield_id',
					label:'项目名称:',
					labelWidth:'40%',
					readOnly:true
					
				},{
					xtype:'textfield',
					id:'textfield_id1',
					label:'项目类型:',
					labelWidth:'40%',
					readOnly:true
					
				},{
					xtype:'textfield',
					id:'textfield_id2',
					label:'项目描述:',
					labelWidth:'40%',
					readOnly:true
					
				},{
					xtype:'textfield',
					id:'textfield_id3',
					label:'标准时长:',
					labelWidth:'40%',
					readOnly:true
				
				},{
					xtype:'textfield',
					id:'textfield_id4',
					label:'基数(分钟):',
					labelWidth:'40%',
					readOnly:true
				
				},{
					xtype:'hiddenfield',
					id:'mi_sbl_row_id'
				},{
					xtype:'selectfield',
					ui:'back',
					style:'background:gray',
					id: 'sel',
					label:'完成状态:',
					labelWidth:'40%',
					options:[{
					text:'未完成',
				    value:'未完成'
					},{
						text:'已完成',
					   value:'已完成'
					}],
					listeners:{
						change:function(obj, value, oldValue, eOpts ){
							var pc=Ext.getCmp('t_button2');
							var  flag=pc.getHidden();
							//当整备详细信息存在的时候
							if(flag==false){
								var DSLR=Ext.getCmp('maintenance_FLAG').getValue();
								if(DSLR=='0' && Ext.getCmp('hf_spc_flag').getValue() == 'MNAME'){
									var sel = Ext.getCmp('sel');
									sel.setValue('未完成');
									//WL.Toast.show("请完成整备项目详细");
									Ext.Msg.alert("请完成整备项目详细");
									return;
								}else if(DSLR=='1' || (DSLR=='0' && Ext.getCmp('hf_spc_flag').getValue() == 'LNAME')){
									//监听选择按键，判断是否保存数据,不保存不让先完成'已完成'
									//获取基数的值
									var obj=Ext.getCmp('textfield_id');
									var valu=obj.getValue();
									var coll=WL.JSONStore.get(collectionName);
									var data={tcode:'mainxmlName'};
									var zhi=null;
									var options={};
									coll.find(data,options).then(function(arrayResults){
										var akb=arrayResults[0].json;
						   		        zhi=akb.stext;
									    console.log(zhi.MNAMELIST);
								        console.log(zhi.MOTHERNAME);
								        var flag=0;
										if(flag==0){
									    	for(var i=0;i<zhi.MOTHERNAME.length;i++){
												console.log(zhi.MOTHERNAME[i].indexOf(valu));
												if(zhi.MOTHERNAME[i].indexOf(valu)!=-1){
													flag=2;
													console.log(flag);
													var sto1=Ext.data.StoreManager.get("maintenProStroe");
													if(!sto1){
														sto1=Ext.create("HelcPDA.store.maintain.maintenProStroe");
													};
													var data2=sto1.getData();
													if(data2.length==0){
														WL.Toast.show('请先完成整备信息');
														//Ext.Msg.alert('请先完成整备信息');
														var sel = Ext.getCmp('sel');
														sel.setValue('未完成');
													}else{
														for(var i=0;i<data2.length;i++){
															var record = sto1.getAt(i).get('project_information');
															var a=record.split("/");
															if(a[1]=='未填写'){
																WL.Toast.show('请先完成整备信息');
																var sel = Ext.getCmp('sel');
																sel.setValue('未完成');
																return;
															}else if((a[1]=='已填写')&&(i==data2.length-1)){
																var sel = Ext.getCmp('sel');
																sel.setValue('已完成');
															};
														};
													};
													return;
												};
											};
											
											for(var i=0;i<zhi.MNAMELIST.length;i++){
												console.log('aa');
												flag=3;
												if(zhi.MNAMELIST[i].indexOf(valu)!=-1){
													var TASK_ROW_ID2=Ext.getCmp('hidden2Task_row_Id').getValue();
													var MP_ID2=Ext.getCmp('hidden2_stext_MP_ID').getValue();
													var Str=MP_ID2+'_'+TASK_ROW_ID2;
													var TASK_ROW_ID2=Ext.getCmp('hidden2Task_row_Id').getValue();
													var data1={tcode:'PLAN_PITEM',tid:Str};
													var options={};
													var coll=WL.JSONStore.get(collectionName);
																	
													coll.find(data1,options).then(function(arrayResults){
														console.log(arrayResults.length);
														if(arrayResults.length==0){
															WL.Toast.show('请先完成整备信息');
															var sel = Ext.getCmp('sel');
															sel.setValue('未完成');
														}else{
															console.log(arrayResults[0].json.stext);
															var sel = Ext.getCmp('sel');
															sel.setValue('已完成');
														};
													}).fail(function(errorObject){
															alert("保持出错");
													});
													return;
												};
											};
										}else{
									    	WL.Toast.show('请先完成整备信息');
											var sel = Ext.getCmp('sel');
											sel.setValue('未完成');
											return;
										};
									}).fail(function(errorObject){
										alert("保存出错");
									});
								};
							};
							
						////////////////////////////	
						},
					}
					
				},{
					xtype:'textfield',
					id:'textfield_id6',
					readOnly:true,
					label:'说明:'
				},{
					xtype:'autoTextArea',
					id:'textfield_id7',	
				},{
    				xtype:'hiddenfield',
    				id:'hf_spc_flag',
    			}]
		}]
		},{
			xtype:'toolbar',
			docked:'bottom',
			items:[/*{
				xtype:'button',
				id:'t_button',
				text:'主页'
			},*/{
				xtype:'button',
				docked:'right',
				id:'t_button2',
				text:'整备详细信息',
				
				listeners:{
					//判断是跳转到那个页面
					tap:function(){
						var obj=Ext.getCmp('textfield_id');
						var value=obj.getValue();
						//alert(value);
	   
						var coll=WL.JSONStore.get(collectionName);
						var data={tcode:'mainxmlName'};
						var zhi=null;
						
						var options={
						};
						
						coll.find(data,options).then(function(arrayResults){
							var akb=arrayResults[0].json;
						     zhi=akb.stext;

								var temp =value;
								console.log(temp);
								Ext.create('HelcPDA.view.maintain.maintenance_ready');
								var pc=Ext.getCmp('t_button2');
								pc.setHidden(false);
								var flag=0;
								for(var i=0;i<zhi.MNAMELIST.length;i++){
									if(zhi.MNAMELIST[i].indexOf(temp)!=-1){
										/*var pro=Ext.getCmp('main_ready_id');
										if(!pro){
											pro=Ext.create('HelcPDA.view.maintain.maintenance_ready');
										}
										Ext.Viewport.setActiveItem(pro);*/
										//this.NextView("main_ready_id","HelcPDA.view.maintain.maintenance_ready");
										
										var ViewId = Ext.Viewport.getActiveItem().id;
										var ViewName = Ext.Viewport.getActiveItem().__proto__.$className;
										ViewArray.push({ViewId:ViewId,ViewName:ViewName});
										var viewName=Ext.getCmp('main_ready_id');
										   if(viewName){
											   viewName.destroy();
										   }
									    Ext.Viewport.setActiveItem(Ext.create('HelcPDA.view.maintain.maintenance_ready'));
										
										
										
										var obs=Ext.getCmp('text_id2');
										var obValue=obs.getValue();
										var TASK_ROW_ID2=Ext.getCmp('hidden2Task_row_Id').getValue();
										var MP_ID2=Ext.getCmp('hidden2_stext_MP_ID').getValue();
										var Str=MP_ID2+'_'+TASK_ROW_ID2;
							
										var data1={tcode:'PLAN_PITEM',tid:Str};
										var options={};
										var coll=WL.JSONStore.get(collectionName);
										
										coll.find(data1,options).then(function(arrayResults){
											console.log(arrayResults.length);
											if(arrayResults.length==0){
												
											}else{
												var akb=arrayResults[0].json;
												var zhi=akb.stext.values_t;
												console.log(zhi)
												var obs=Ext.getCmp('text_id2');
												obs.setValue(zhi.SASSETX_CUR_RUNNING_TIMES);
												 var obj7=Ext.getCmp('text_id3');
												 obj7.setValue(zhi.NOW_RUNNING_TIMES);
												    var obj8=Ext.getCmp('text_id4');
												    obj8.setValue(zhi.RUNNING_TIMES);
											}
											
										  
										}).fail(function(errorObject){
											alert("保存出错");
										});
										flag=1;
										break;
									}else{
										flag=0;
									}
								};
								//用于存放选工号最新启动次数
								var curr_two=Ext.getCmp('CURR_COUNT_index2').getValue();
								Ext.getCmp('text_id2').setValue(curr_two);
								
								if(flag==0){
									for(var i=0;i<zhi.MOTHERNAME.length;i++){
										if(zhi.MOTHERNAME[i].indexOf(temp)!=-1){
											var pro=Ext.getCmp('pj');
											if(!pro){
												pro=Ext.create('HelcPDA.view.maintain.maintenance_project');
											}
											Ext.Viewport.setActiveItem(pro);

											var ab=zhi.MOTHERNAME[i];
											
											var data = [];
									
											for(var i=0;i<zhi.MOTHERNAMES.length;i++){
												
												if(zhi.MOTHERNAMES[i].indexOf(ab)!=-1){
												
												for(var j=0;j<zhi.MOTHERNAMES[i].length-1;j++){
													var dataitem = {};
													var str=zhi.MOTHERNAMES[i][j];
													
													var b=str.split("_");
													
													dataitem.project_information=b[1];
													dataitem.project_id = b[0];
													data[j] = dataitem;
													
													}
												}
											}
											
											flag=1;
											break;
										}
									}
									
									var TASK_ROW_ID=Ext.getCmp('hidden2Task_row_Id').getValue();
									var MP_ID=Ext.getCmp('hidden2_stext_MP_ID').getValue();
									var stry=MP_ID+'_'+TASK_ROW_ID;
									data1={tcode:'PLAN_PITEM',tid:stry};
									var result=null;
											
									var coll=WL.JSONStore.get(collectionName);
									var options = {exact : false};
									coll.find(data1,options).then(function(arrayResults){
										var name_data = '';
										for (var j = 0; j < arrayResults.length; j ++) {
												name_data += arrayResults[j].json.tid;
										}
											
										for (var i=0;i<data.length;i++) {
											if(name_data.indexOf(data[i].project_information)!=-1){
												data[i].project_information +='/已填写';
											}else{
												data[i].project_information +='/未填写';
											}
										}
										var sto=Ext.data.StoreManager.get("maintenProStroe");
										if(!sto){
											sto=Ext.create("HelcPDA.store.maintain.maintenProStroe");
										}
										sto.setData(data);
													
									}).fail(function(errorObject){
														alert("保存出错");
									});
									
									if(flag==0){
								
											pc.setHidden(true);
										
									}
								}
									
				                
         
								
						}).fail(function(errorObject){
							alert(errorObject);
						});
					

				
					}
				}
			}]
		}
	]},

	//保存方法
	dongtaiadd:function(){
		//完成状态
		var obj5=Ext.getCmp('sel');
		var value5=obj5.getValue();
		//用于存放 mainitem tid
		var ob=Ext.getCmp('hidden2_maintem_Tid');
		var Str=ob.getValue();
		//取出MP_ID和下标
		var MP_ID=Ext.getCmp('hidden2_stext_MP_ID').getValue(); 
		var index=Ext.getCmp('store_index').getValue();
		//alert('Str  '+Str);
		var data={tcode:'MAINITEM',tid:MP_ID+"/"};
		var coll=WL.JSONStore.get(collectionName);
		var options = {};
		coll.find(data,options).then(function (arrayResults) {
			var akb=arrayResults[index].json;
		     zhi=akb.stext;
		     zhi.PLAN_TIMES=value5;
		     console.log(zhi.PLAN_TIMES);
			     query={_id:arrayResults[index]._id,json:{tcode:'MAINITEM',tid:akb.tid,stext:zhi}};
			     options={};
			     coll.replace(query,options).then(function () {
			    	 WL.Toast.show('保存成功');
			    	 console.log('保存成功');
			    	 var MaintList=Ext.data.StoreManager.get('MaintenaceProtectPrjectStore'); 
					 if (!MaintList) { 
		      			MaintList = Ext.create("HelcPDA.store.maintain.MaintenaceProtectPrjectStore"); 
		      		};
		      		coll.find(data,options).then(function (array) {
		      			var tempArray=new Array();
		      			var length=array.length;
		      			for(var i=0;i<length;i++){
		      				var stextz=arrayResults[i].json.stext;
		      				tempArray.push(stextz);
		      			}
		      			MaintList.setData(tempArray);
		      			
		      		});
		      		Ext.Viewport.setActiveItem(Ext.getCmp('DetailPanel'));
			     }).fail(function(errorObject){
						alert("保持出错");
					});
		}).fail(function(errorObject){
			alert("保持出错");
		});
	},
	
	
	remove:function(){
	
			var TASK_ROW_ID2=Ext.getCmp('hidden2Task_row_Id').getValue();
			var MP_ID2=Ext.getCmp('hidden2_stext_MP_ID').getValue();
			var Str=TASK_ROW_ID2+'_'+MP_ID2;
		 var coll=WL.JSONStore.get(collectionName);
					var data={tcode:'MAINTAIN',tid:Str};
			var options={
				
			};
			coll.remove(data,options).then(function(){
				var obj=Ext.getCmp('textfield_id');
				var value=obj.getValue();
				var obj1=Ext.getCmp('textfield_id1');
				var value1=obj1.getValue();
				var obj2=Ext.getCmp('textfield_id2');
				var value2=obj2.getValue();
				var obj3=Ext.getCmp('textfield_id3');
				var value3=obj3.getValue();
				var obj4=Ext.getCmp('textfield_id4');
				var value4=obj4.getValue();
				var obj5=Ext.getCmp('sel');
				var value5=obj5.getValue();
			
				var obj6=Ext.getCmp('textfield_id7');
				var value6=obj6.getValue();
				var data={tcode:'MAINTAIN',tid:Str,stext:"{TASK_NAME:'"+value+"',PLAN_STATUS:'"+value1+"',TASK_DESCRIPTION:'"+value2+"',TASK_STAND_TIME:'"+value3+"',TASK_RADIX:'"+value4+"',PLAN_TIMES:'"+value5+"',COMMENTS:'"+value6+"'}"};
			
				var collectionName='user';
				var coll=WL.JSONStore.get(collectionName);
				var options = {};
				coll.add(data,options).then(function () {
				
				}).fail(function(errorObject){
					alert("保持出错");
				});
					
			});
	 }
	
});