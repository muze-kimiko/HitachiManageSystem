Ext.define('HelcPDA.controller.fault.FaultHandlingReportPanelAccessoriesCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
			
			Accessories:'button[id=Accessories]',
			
			Add_Accessories:'button[id=add_Accessories]',
			Modify_Accessories:'button[id=modify_Accessories]',
//			Cancel_Accessories:'button[id=cancel_Accessories]',

			SearchAccessories:'button[id=searchAccessories]',
			SearchAccessoriesList:'list[id=searchAccessoriesList]',
			AccessoriesList:'list[id=accessoriesList]',
			
			Commit_Accessories:'button[id=Commit_Accessories]',
			
		},
		control:{
			SearchAccessoriesList:{
				itemtap:'SearchAccessoriesList'
			},
			AccessoriesList: {
				itemtap:'AccessoriesList'
			},
			Accessories:{
				tap:'Accessories',
			},
			Add_Accessories:{
				tap:'Add_Accessories',
			},
			Modify_Accessories:{
				tap:'Modify_Accessories',
			},
			SearchAccessories:{
				tap:'SearchAccessories',
			},
			Commit_Accessories:{
				tap:'Commit_Accessories',
			},
		},
	},
	
	 
    Accessories : function(){
    	var obj=this;
    	this.NextView('faultHandlingReportPanelAccessories','HelcPDA.view.fault.FaultHandlingReportPanelAccessories');
        Ext.Viewport.removeMenu('right');
    	var AccessoriesStore=Ext.data.StoreManager.get('AccessoriesStore');
  		if (!AccessoriesStore) { 
  			AccessoriesStore = Ext.create("HelcPDA.store.fault.AccessoriesStore"); 
  		}; 
        var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue(); 
	  	var content=JSON.stringify({iswhere:"WHERE ACTIVITY_ID='"+ACTIVITY_ID+"'"});
	  	var getResult=function(res){
	  		AccessoriesStore.setData(res.rows);
	  		obj.setStyle();
	  	};
	  	this.connectServer(getResult, 'gzbaogao_peijianAction.do?method=toSearch', content);
    },
	
//提交配件
	Commit_Accessories : function(){
		var obj = this;
		 //检查进入时状态是什么，如果是已提交或者未提交，设置用户是否能操作数据
		if(this.getJXCL_SubmitVerification('')){
			return;
		};
     	 /*var fault_listId=Ext.getCmp('fault_list').getActiveItem().getId();
     	 if(fault_listId=='FaultHandWYSHButton'||fault_listId=='FaultHandWYTJButton'){
     		 WL.Toast.show('已提交或已审核,不能提交.');
    		    return;
     	 }*/
		var Name = Ext.getCmp('accessoriesName').getValue();
		var quantity = Ext.getCmp('accessories_quantity').getValue();
		var AccessoriesStore=Ext.data.StoreManager.get('AccessoriesStore');
		if (!AccessoriesStore) { 
			AccessoriesStore = Ext.create("HelcPDA.store.fault.AccessoriesStore"); 
		}; 
		var AccessList = AccessoriesStore.data.items;
		var AccessArray = [];
	    
		
		if(AccessList.length==0){
			if(Name == "" || quantity ==""){
				WL.Toast.show("请添加故障的配件");
				return;
			}
			if(quantity<=0){
				WL.Toast.show("配件数量必须大于0");
				return;
			}
			if(Name != "" && quantity !=""){
				obj.Add_Accessories();
				for(var i =0;i<AccessList.length;i++){
					AccessArray[i] = AccessList[i].data;
				};
				var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue(); 
			  	var content="{'rows':"+JSON.stringify(AccessArray)+",'ACTIVITY_ID':'"+ACTIVITY_ID+"'}";
			  	var getResult=function(res){
			  		var str=res.msginfo;
			  	};
			  	this.connectServer(getResult, 'gzbaogao_peijianAction.do?method=toAdds', content);
			  	return;
			}
		}else{
			if(Name != "" && quantity !=""){
				obj.Add_Accessories();
				for(var i =0;i<AccessList.length;i++){
					AccessArray[i] = AccessList[i].data;
				};
				var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue(); 
			  	var content="{'rows':"+JSON.stringify(AccessArray)+",'ACTIVITY_ID':'"+ACTIVITY_ID+"'}";
			  	var getResult=function(res){
			  		var str=res.msginfo;
			 		WL.Toast.show(str);
			  	};
			  	this.connectServer(getResult, 'gzbaogao_peijianAction.do?method=toAdds', content);
			  	return;
			}
			if(Name == "" && quantity ==""){
				var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue(); 
				for(var i =0;i<AccessList.length;i++){
					AccessArray[i] = AccessList[i].data;
				};
			  	var content="{'rows':"+JSON.stringify(AccessArray)+",'ACTIVITY_ID':'"+ACTIVITY_ID+"'}";
			  	var getResult=function(res){
			  		var str=res.msginfo;
			  		obj.setStyle();
			  		obj.clearValue();
			 		WL.Toast.show(str);
			  	};
			  	this.connectServer(getResult, 'gzbaogao_peijianAction.do?method=toAdds', content);
			  	return;
			}
			if(Name != "" && quantity ==""){
				obj.Add_Accessories();
				return;
			}
			if(Name == "" && quantity !=""){
				obj.Add_Accessories();
				return;
			}
		}
		
	},
	//添加样式
	setStyle:function(){
		var AccessoriesStore=Ext.data.StoreManager.get('AccessoriesStore');
		if (!AccessoriesStore) { 
			AccessoriesStore = Ext.create("HelcPDA.store.fault.AccessoriesStore"); 
		}; 
		var AccessList = AccessoriesStore.data.items;
		var Fault_AccContainer=document.getElementById('Fault_AccContainer');
		if(AccessList.length>0){
 			Fault_AccContainer.innerHTML="配件清单("+AccessList.length+")";
 			Fault_AccContainer.style.color='red';
  		}else{
 			Fault_AccContainer.innerHTML="配件清单";
 			Fault_AccContainer.style.color='';
 		}
		
	},
	//清除数据
	clearValue:function(){
		 Ext.getCmp('accessoriesName').setValue("");
		 Ext.getCmp('accessories_quantity').setValue("");
	},
//查找物料
	SearchAccessories : function(){
		var AccessoriesField=Ext.getCmp("accessoriesField").getValue();
		var content="{'AccessoriesField':'"+AccessoriesField+"'}";
		
        var getResult=function(res){
        	if(res.count>0){
        		var listPanel=Ext.getCmp('listPanel');
            	if(listPanel){
            		listPanel.destroy();
            	}
            	if(!lists){
            		var lists=Ext.Viewport.add({
            		     xtype:'panel',
            		     id:'listPanel',
            		     height:'80%',
            		     width:'90%',
            		     modal: true,
            		     hideOnMaskTap: true,
         	             centered: true,
            		     items:[
            		            {xtype:'fieldset',
            		            	height:'100%',
            		            	width:'100%',
            		             items:[{
            		            	xtype:'list',     		
         		        		    id:'searchAccessoriesList',
         		        		    store:'AccessoriesListStore',
         		        		    height:'100%',
         		        		    width:'100%',
         		        		    itemTpl:[
         		        		            '<div>{MATERIAL_SPC}<div>'
         		        		            ]
            		            }] 
            		            }]
            	});
            		lists.show();
            	}
            
            	var datads=Ext.data.StoreManager.get('AccessoriesListStore');
        		if(!datads){
        			datads=Ext.create('HelcPDA.store.fault.AccessoriesListStore');
        		}
        		var str=res.rows;
        		datads.setData(str);
        	}else{
        		WL.Toast.show("暂无查询信息");
        	}
         };
        
            if(AccessoriesField==null||AccessoriesField==""||typeof(AccessoriesField)=="undefined"){
            	WL.Toast.show("物料名称或图号不能为空"); 
	        }else{
	        	this.connectServer(getResult, 'gzbaogao_peijianAction.do?method=PDA3_SearchbyPartname', content);
	        }
    },
	
//点击选择搜索列表的选项触发的事件
    SearchAccessoriesList : function(obj,index,target,record,e,eOpts){
    	var listPanel=Ext.getCmp('listPanel');
    	if(listPanel){
    		listPanel.destroy();
    	}
    	
        var store = Ext.data.StoreManager.get("AccessoriesListStore"); 
   		  if (!store) { 
   		    store = Ext.create("HelcPDA.store.fault.AccessoriesListStore"); 
   		  }   
		  
   	   var NAME=store.getAt(index).get('NAME'); 
   	   var PART_ID=store.getAt(index).get('PART_ID'); 
	   Ext.getCmp('accessoriesName').setValue(NAME);
	   Ext.getCmp('PARTS_ID').setValue(PART_ID);
    },
    
    
//点击增加换件清单
    Add_Accessories : function(obj, e, eOpts ){
    	var AccessoriesStore=Ext.data.StoreManager.get('AccessoriesStore');
		if (!AccessoriesStore) { 
			AccessoriesStore = Ext.create("HelcPDA.store.fault.AccessoriesStore"); 
		};
		
		var new_data =[];
		var new_PARTS_ID=Ext.getCmp('PARTS_ID').getValue();
    	var new_accessoriesName=Ext.getCmp('accessoriesName').getValue();
    	var new_accessories_quantity=Ext.getCmp('accessories_quantity').getValue();
    	var new_part_NUM=Ext.getCmp('part_NUM').getValue();
    	var new_accessories_Remark=Ext.getCmp('accessories_Remark').getValue();
    	var new_produce_Time=Ext.getCmp('produce_Time').getValue();
    	var new_quotation_Time=Ext.getCmp('quotation_Time').getValue();
    	var new_base_List=Ext.getCmp('base_List').getValue();
    	var new_quote_Statue=Ext.getCmp('quote_Statue').getValue();
    	
    	
    	if(new_accessoriesName==""||new_accessoriesName==null||typeof(new_accessoriesName)=="undefined"){
    		WL.Toast.show("名称不能为空"); 
    		return;
    	}
    	if(new_accessories_quantity==""||new_accessories_quantity==null||typeof(new_accessories_quantity)=="undefined"){
    		WL.Toast.show("数量不能为空"); 
    		return;
    	}
    	if(new_accessories_quantity<=0){
			WL.Toast.show("配件数量必须大于0");
			return;
		}
		var PARTS_ID=Ext.getCmp('PARTS_ID').getValue();
		var list=Ext.Array.pluck(AccessoriesStore.getData().items,'data');
    	var length=list.length;
		for(var i=0;i<length;i++){
			   if(PARTS_ID==list[i].PARTS_ID){
				    WL.Toast.show("请勿添加重复的配件");
					return; 
			   }	
		}
    	
    	var list = AccessoriesStore.data.items;
    	var length_ = AccessoriesStore.data.items.length;
    	for(var i=0;i<length_;i++){
    		
    		var newdata_item = {};
    		var PARTS_ID = list[i].data.PARTS_ID;
    		var accessoriesName = list[i].data.PARTS_NAMES;
	    	var product_batch=list[i].data.PRODUCT_BATCH;
	    	var product_date=list[i].data.PRODUCT_DATE;
	    	var parts_used_quantity=list[i].data.PARTS_USED_QUANTITY;
	    	var quote_time=list[i].data.QUOTE_TIME;
	    	var quotation=list[i].data.QUOTATION;
	    	var quote_statue=list[i].data.QUOTE_STATUE;
	    	var comments=list[i].data.COMMENTS;
	    	
	    	newdata_item.PARTS_ID = PARTS_ID; 
    		newdata_item.PARTS_NAMES = accessoriesName; 
    		newdata_item.PRODUCT_BATCH=product_batch;
    		newdata_item.PRODUCT_DATE=product_date;
    		newdata_item.PARTS_USED_QUANTITY=parts_used_quantity;
    		newdata_item.QUOTE_TIME=quote_time;
    		newdata_item.QUOTATION=quotation;
    		newdata_item.QUOTE_STATUE=quote_statue;
    		newdata_item.COMMENTS=comments;
    		new_data[i]=newdata_item;
    	}
    	
    	new_data[length_] ={PARTS_ID:new_PARTS_ID,PARTS_NAMES:new_accessoriesName,PRODUCT_BATCH:new_part_NUM,PRODUCT_DATE:new_produce_Time,
    			PARTS_USED_QUANTITY:new_accessories_quantity,QUOTE_TIME:new_quotation_Time,QUOTATION:new_base_List,
    			QUOTE_STATUE:new_quote_Statue,COMMENTS:new_accessories_Remark};
    	list = new_data; 
    	AccessoriesStore.setData(list);
    	this.setStyle();
    	this.clearValue();
    	WL.Toast.show("增加成功"); 
    },
    
  //在list界面进行删除或tap事件
    AccessoriesList : function(obk, index, target, record, e, eOpts ){
    	var obj=this;
    	var AccessoriesStore=Ext.data.StoreManager.get('AccessoriesStore');
		if (!AccessoriesStore) { 
			AccessoriesStore = Ext.create("HelcPDA.store.fault.AccessoriesStore"); 
		};
		function getResult(){
			WL.Toast.show("删除成功");
		}
		if(event.target.id=="1"){
			navigator.notification.confirm('确定删除信息？',function(btn){
	 			if(btn ==2){
				AccessoriesStore.removeAt(index);
			    var list=Ext.Array.pluck(AccessoriesStore.getData().items,'data');
			    var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue(); 
		  	    var content="{'rows':"+JSON.stringify(list)+",'ACTIVITY_ID':'"+ACTIVITY_ID+"'}";
		  	    obj.connectServer(getResult, 'gzbaogao_peijianAction.do?method=toAdds', content);
		  	    obj.setStyle();
	 			}else{
	 				return;
	 			}
	 		},"提示","取消,确定");
//			Ext.Msg.confirm('你好','删除信息？',function(btn){
//				if (btn == 'yes'){
//					AccessoriesStore.removeAt(index);
//					var list=Ext.Array.pluck(AccessoriesStore.getData().items,'data');
//					var ACTIVITY_ID=Ext.getCmp("ACTIVITY_ID").getValue(); 
//				  	var content="{'rows':"+JSON.stringify(list)+",'ACTIVITY_ID':'"+ACTIVITY_ID+"'}";
//				  	obj.connectServer(getResult, 'gzbaogao_peijianAction.do?method=toAdds', content);
//				  	obj.setStyle();
//					AccessoriesStore.removeAt(index);
//		            list.splice(index, 1);
//				}else{
//					return;
//				}
//			});
		}else{
			 Ext.getCmp('Access_tab').setActiveItem(Ext.getCmp('Access_info'));
 			 Ext.getCmp('PARTS_ID').setValue(AccessoriesStore.getAt(index).get('PARTS_ID'));
			 Ext.getCmp('accessoriesName').setValue(AccessoriesStore.getAt(index).get('PARTS_NAMES'));
	         Ext.getCmp('accessories_quantity').setValue(AccessoriesStore.getAt(index).get('PARTS_USED_QUANTITY'));
	         Ext.getCmp('part_NUM').setValue(AccessoriesStore.getAt(index).get('PRODUCT_BATCH'));
	         Ext.getCmp('accessories_Remark').setValue(AccessoriesStore.getAt(index).get('COMMENTS'));
	         Ext.getCmp('produce_Time').setValue(AccessoriesStore.getAt(index).get('PRODUCT_DATE')=='1900-01-01 00:00'?'':AccessoriesStore.getAt(index).get('PRODUCT_DATE'));
	         Ext.getCmp('quotation_Time').setValue(AccessoriesStore.getAt(index).get('QUOTE_TIME')=='1900-01-01 00:00'?'':AccessoriesStore.getAt(index).get('QUOTE_TIME'));
	         Ext.getCmp('base_List').setValue(AccessoriesStore.getAt(index).get('QUOTATION'));
	         Ext.getCmp('quote_Statue').setValue(AccessoriesStore.getAt(index).get('QUOTE_STATUE'));
	         Ext.getCmp('AcchidddenListIndex').setValue(index);
		}
    
    },
    
	//修改配件
    Modify_Accessories : function(obj,e,eOpts){
		var AccessoriesStore=Ext.data.StoreManager.get('AccessoriesStore');
		if (!AccessoriesStore) { 
			AccessoriesStore = Ext.create("HelcPDA.store.fault.AccessoriesStore"); 
		};
		var list = AccessoriesStore.data.items;	
		var PARTS_ID=Ext.getCmp("PARTS_ID").getValue();
		var accessoriesName=Ext.getCmp("accessoriesName").getValue();
		var accessories_quantity=Ext.getCmp("accessories_quantity").getValue();
		var part_NUM=Ext.getCmp("part_NUM").getValue();
		var accessories_Remark=Ext.getCmp("accessories_Remark").getValue();
		var produce_Time=Ext.getCmp("produce_Time").getValue();
		var quotation_Time=Ext.getCmp("quotation_Time").getValue();
		var base_List=Ext.getCmp("base_List").getValue();
		var quote_Statue=Ext.getCmp("quote_Statue").getValue();
		
		if(accessoriesName==""||accessoriesName==null||typeof(accessoriesName)=="undefined"){
			WL.Toast.show("名称不能为空"); 
    		return;
    	}	
		if(accessories_quantity==""||accessories_quantity==null||typeof(accessories_quantity)=="undefined"){
			WL.Toast.show("数量不能为空"); 
			return;
		}	
	    	
	    var newData={PARTS_ID:PARTS_ID,PARTS_NAMES:accessoriesName,PRODUCT_BATCH:part_NUM,PRODUCT_DATE:produce_Time,
	    		PARTS_USED_QUANTITY:accessories_quantity,QUOTE_TIME:quotation_Time,QUOTATION:base_List,
	    		QUOTE_STATUE:quote_Statue,COMMENTS:accessories_Remark};
	    
	    var index=Ext.getCmp('AcchidddenListIndex').getValue();
	    //当不经过index选取，保存后直接点击修改时
	    if(index==""||index==null||typeof(index)=="undefined"){
	    	WL.Toast.show("请先选择要修改的对象");
	    	return;
	    }else{
	    	//防止修改为一样的
	    	var list=Ext.Array.pluck(AccessoriesStore.getData().items,'data');
//	    	var flag=true;
    		var length=list.length;
    		list.splice(index,1,newData);
	    	AccessoriesStore.setData(list);
	    	Ext.getCmp('AcchidddenListIndex').setValue('');
// 		    for(var i=0;i<length;i++){
// 		    	//不和自己做比较  index 代表自己的位置，length-1和下标对应。
// 		    	if(index==length-1){
// 		    	   //修改自己的时候,不能让自己和别的partid一样,如果和自己一样，随便改
// 		    		if(PARTS_ID==list[i].PARTS_ID){
// 		    			list.splice(index,1,newData);
//				    	AccessoriesStore.setData(list);
//				    	Ext.getCmp('AcchidddenListIndex').setValue('');
//                        break;  
// 		    		}else{
// 		    			//和自己不一样,验证其它情况
// 		    			for(var j=0;j<length;j++){
// 	 		    			//循环验证到自己的时候跳过
// 	 		    			if(index==length-1){
// 	 		    				continue;
// 	 		    			}else{
// 	 		    			   //验证别的吧，在最后一次验证完就修改。	
// 	 		    				if(PARTS_ID==list[j].PARTS_ID){
// 			 	  	    			WL.Toast.show('请勿将配件修改的和列表中的配件数据相同');
// 			 	  	    		    break;
// 	 		    				}
// 	 		    				//最后一次了
// 	 		    				if(j==length-1){
// 	 			 	  	    	    //验证通过了。
// 	 			 	  	    		list.splice(index,1,newData);
// 	 					    		AccessoriesStore.setData(list);
// 	 					    		Ext.getCmp('AcchidddenListIndex').setValue('');
// 	 					    		break;
// 	 		    				}
// 	 		    			}
// 	 		    		}	
// 		    		}
// 		    		continue;	
// 		    	}
// 		    }
	    }
	    
	},
	
});