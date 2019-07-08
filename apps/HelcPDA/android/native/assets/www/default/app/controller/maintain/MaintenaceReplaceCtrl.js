
/* JavaScript content from app/controller/maintain/MaintenaceReplaceCtrl.js in folder common */
Ext.define("HelcPDA.controller.maintain.MaintenaceReplaceCtrl",{
	extend:'HelcPDA.controller.ApplicationController',
	   config: {
	        control: {
	            "button#toSerach": {
	                tap: 'onButtonTap'
	            },
	            "list#serach_ChanceList":{
	            	itemtap:"ontapList"
	            },
	            "button#addtoItem":{
	            	tap:'addtoItem'
	            },
	            "list#changePieceList":{
	            	itemtap:'changePieceList'
	            },
	            "button#modifyChangePiece":{
	            	tap:'modifyChangePiece'
	            },
	            "button#savePiece":{
	            	tap:'savePiece'
	            },
	            "button#back_Maintain":{
	            	tap:'back_Maintain'
	            }
	        }
	    },
	    
	    //点击搜索时生成的搜索列表
	    onButtonTap:function(){
	    	var obj=this;
	        var serach_Cont=Ext.getCmp("serach_Cont").getValue();
	        var content="{'part_num':'"+serach_Cont+"'}";
	        var getResult=function(res){
	        	if(res.part_num.length>0){
	        		var PanelId='listPanel';
		        	var ListArray={};
		        	ListArray.id='serach_ChanceList';
		        	ListArray.StoreName='MaintenaceReplaceStore';
		        	ListArray.StoreFullName='HelcPDA.store.maintain.MaintenaceReplaceStore';
		        	ListArray.StoreParam=["part_num"];
		        	var Data=res.part_num;
		        	obj.getList(PanelId,ListArray,Data);
	        	}else{
	        		WL.Toast.show("暂无查询信息");
	        	}
	        	
	        		         };
	        
	            if(serach_Cont==null||serach_Cont==""||typeof(serach_Cont)=="undefined"){
	            	WL.Toast.show("物料名称或图号不能为空"); 
		        }else{
		        	this.connectServer(getResult, 'maintainancePlanItemListAction.do?method=toSearchPart_forPDA3', content);
		        }
	    },
	    //点击选择搜索列表的选项触发的事件
	    ontapList:function(obj,index,target,record,e,eOpts){
	    	var listPanel=Ext.getCmp('Panel_List_Id');
	    	if(listPanel){
	    		listPanel.destroy();
	    	}
	      var store=this.getStore('MaintenaceReplaceStore',"HelcPDA.store.maintain.MaintenaceReplaceStore"); 
       	   var part_num=store.getAt(index).get('part_num'); 
        	var content="{'part_num':'"+part_num+"'}";

	    	var getResult=function(res){
	    		Ext.getCmp('NAME').setValue(res.part_num.NAME);
	    		Ext.getCmp('FIGURE_NUM').setValue(res.part_num.FIGURE_NUM);
	    		Ext.getCmp('MATERIAL_SPC').setValue(res.part_num.MATERIAL_SPC);
	    		Ext.getCmp('MEASURE_UNIT').setValue(res.part_num.MEASURE_UNIT);
	    		Ext.getCmp('MODEL_SPEC').setValue(res.part_num.MODEL_SPEC);
		    	Ext.getCmp('Product_Batch').setValue();
		    	Ext.getCmp('Product_Date').setValue();
		    	Ext.getCmp('Parts_Used_Quantity').setValue();
		    	Ext.getCmp('Quote_Time').setValue();
		    	Ext.getCmp('Quotation').setValue();
		    	Ext.getCmp('Quote_Statue').setValue();
		    	Ext.getCmp('Comments').setValue();
		    	Ext.getCmp('PARTS_ID').setValue(res.part_num.PART_NUM);
		    	Ext.getCmp('SBL_ROW_ID').setValue(res.part_num.SBL_ROW_ID);
	    	};
	    	this.connectServer(getResult, 'maintainancePlanItemListAction.do?method=toSearchPartDetail', content);
	    },
	    //点击增加换件清单
	    addtoItem:function(obj,e,eOpts ){
	     	var MaintainReplacePieceStore=this.getStore('MaintainReplacePieceStore',"HelcPDA.store.maintain.MaintainReplacePieceStore");
			var new_data =[];
	    	var NAME=Ext.getCmp('NAME').getValue();
	    	//数量
	    	var Parts_Used_Quantity=Ext.getCmp('Parts_Used_Quantity').getValue();
	    	//批号
	    	var Product_Batch=Ext.getCmp('Product_Batch').getValue();
	    	//生产日期
	    	var Product_Date=Ext.getCmp('Product_Date').getValue();
	    	
	    	var MODEL_SPEC=Ext.getCmp('MODEL_SPEC').getValue();
	    	var FIGURE_NUM=Ext.getCmp('FIGURE_NUM').getValue();
	    	var MATERIAL_SPC=Ext.getCmp('MATERIAL_SPC').getValue();
	    	var MEASURE_UNIT=Ext.getCmp('MEASURE_UNIT').getValue();
	    	
	    	//报价日期
	    	var Quote_Time=Ext.getCmp('Quote_Time').getValue();
	    	//底单
	    	var Quotation=Ext.getCmp('Quotation').getValue();
	    	//状态
	    	var Quote_Statue=Ext.getCmp('Quote_Statue').getValue();
	    	//备注
	    	var Comments=Ext.getCmp('Comments').getValue();
	    	
	        var PARTS_ID=Ext.getCmp('PARTS_ID').getValue();
	        var SBL_ROW_ID=Ext.getCmp('SBL_ROW_ID').getValue();
	    	console.log('我要查找的东西是SBL_ROW_ID:'+SBL_ROW_ID+'  PARTS_ID:'+PARTS_ID+'  Product_Date:'+Product_Date);
	    	if(NAME==""||NAME==null||typeof(NAME)=="undefined"){
	    		WL.Toast.show("名称不能为空"); 
	    		return;
	    	}
	    	if(Parts_Used_Quantity==""||Parts_Used_Quantity==null||typeof(Parts_Used_Quantity)=="undefined"){
	    		WL.Toast.show("数量不能为空"); 
	    		return;
	    	}
	    	
	    	var list=Ext.Array.pluck(MaintainReplacePieceStore.getData().items,'data');
	    	var length_ = list.length;
	    	for(var i=0;i<length_;i++){
	    		var newdata_item = {};
	    		
	    		var name = list[i].NAME;
		    	var product_batch=list[i].PRODUCT_BATCH;
		    	var product_date=list[i].PRODUCT_DATE;
		    	var model_spec=list[i].MODEL_SPEC;
		    	var figure_num=list[i].FIGURE_NUM;
		    	var material_spc=list[i].MATERIAL_SPC;
		    	var measure_unit=list[i].MEASURE_UNIT;
		    	var parts_used_quantity=list[i].QUANTITY;
		    	var quote_time=list[i].QUOTE_TIME;
		    	var quotation=list[i].QUOTATION;
		    	var quote_statue=list[i].QUOTE_STATUE;
		    	var comments=list[i].COMMENTS;
		    	var sbl_row_id =list[i].SBL_ROW_ID;
			    var parts_id=list[i].PART_ID;
			    
	    		newdata_item.NAME = name; 
	    		newdata_item.PRODUCT_BATCH=product_batch;
	    		newdata_item.PRODUCT_DATE=product_date;
	    		newdata_item.MODEL_SPEC=model_spec;
	    		newdata_item.FIGURE_NUM=figure_num;
	    		newdata_item.MATERIAL_SPC=material_spc;
	    		newdata_item.MEASURE_UNIT=measure_unit;
	    		newdata_item.QUANTITY=parts_used_quantity;
	    		newdata_item.QUOTE_TIME=quote_time;
	    		newdata_item.QUOTATION=quotation;
	    		newdata_item.QUOTE_STATUE=quote_statue;
	    		newdata_item.COMMENTS=comments;
	    		newdata_item.SBL_ROW_ID=sbl_row_id;
	    		newdata_item.PART_ID=parts_id;
	    		
	    		console.log(newdata_item);
	    		new_data[i]=newdata_item;
	    	}
	    	
	    	new_data[length_] ={NAME:NAME,
	    			PRODUCT_BATCH:Product_Batch,
	    			PRODUCT_DATE:Product_Date,
	    			MODEL_SPEC:MODEL_SPEC,
	    			FIGURE_NUM:FIGURE_NUM,
	    			MATERIAL_SPC:MATERIAL_SPC,
	    			MEASURE_UNIT:MEASURE_UNIT,
	    			QUANTITY:Parts_Used_Quantity,
	    			QUOTE_TIME:Quote_Time,
	    			QUOTATION:Quotation,
	    			QUOTE_STATUE:Quote_Statue,
	    			COMMENTS:Comments,
	    			SBL_ROW_ID:SBL_ROW_ID,
	    			PART_ID:PARTS_ID};
	    	console.log('集合查询:'+JSON.stringify(new_data));
	    	list = new_data; 
	    	
	    	MaintainReplacePieceStore.setData(list);
	    	WL.Toast.show("添加成功");
	    	Ext.getCmp('hidddenListIndex').setValue();
	    },
	    //在list界面进行删除或tap事件
	    changePieceList:function(obj, index, target, record, e, eOpts ){  	
	     	var MaintainReplacePieceStore=this.getStore('MaintainReplacePieceStore',"HelcPDA.store.maintain.MaintainReplacePieceStore");
			if(event.target.id=="1"){
			 	MaintainReplacePieceStore.removeAt(index);
			}else{
				 Ext.getCmp('NAME').setValue(MaintainReplacePieceStore.getAt(index).get('NAME'));
		         Ext.getCmp('Product_Batch').setValue(MaintainReplacePieceStore.getAt(index).get('PRODUCT_BATCH'));
		         Ext.getCmp('Product_Date').setValue(MaintainReplacePieceStore.getAt(index).get('PRODUCT_DATE'));
		         Ext.getCmp('MODEL_SPEC').setValue(MaintainReplacePieceStore.getAt(index).get('MODEL_SPEC'));
		         Ext.getCmp('FIGURE_NUM').setValue(MaintainReplacePieceStore.getAt(index).get('FIGURE_NUM'));
		         Ext.getCmp('MATERIAL_SPC').setValue(MaintainReplacePieceStore.getAt(index).get('MATERIAL_SPC'));
		         
		         //Ext.getCmp('Parts_Used_Quantity').setValue(MaintainReplacePieceStore.getAt(index).get('Parts_Used_Quantity'));

		         Ext.getCmp('MEASURE_UNIT').setValue(MaintainReplacePieceStore.getAt(index).get('MEASURE_UNIT'));
		         Ext.getCmp('Parts_Used_Quantity').setValue(MaintainReplacePieceStore.getAt(index).get('QUANTITY'));
		         Ext.getCmp('Quote_Time').setValue(MaintainReplacePieceStore.getAt(index).get('QUOTE_TIME'));
		         Ext.getCmp('Quotation').setValue(MaintainReplacePieceStore.getAt(index).get('QUOTATION'));
		         Ext.getCmp('Quote_Statue').setValue(MaintainReplacePieceStore.getAt(index).get('QUOTE_STATUE'));
		         Ext.getCmp('Comments').setValue(MaintainReplacePieceStore.getAt(index).get('COMMENTS'));

		         Ext.getCmp('hidddenListIndex').setValue(index);
		         Ext.getCmp('PARTS_ID').setValue(MaintainReplacePieceStore.getAt(index).get('PARTS_ID'));
			     Ext.getCmp('SBL_ROW_ID').setValue(MaintainReplacePieceStore.getAt(index).get('SBL_ROW_ID'));
			     Ext.getCmp('Rep_panel').setActiveItem(0);
			}
//	    	var thisList=Ext.getCmp('changePieceList');
//	    	thisList.removeAt(index);
	    },
	    //点击修改清单触发
	      modifyChangePiece:function(obj,e,eOpts){
	    	
	    	var MaintainReplacePieceStore=this.getStore('MaintainReplacePieceStore',"HelcPDA.store.maintain.MaintainReplacePieceStore");
			var list=Ext.Array.pluck(MaintainReplacePieceStore.getData().items,'data');
	    	var NAME=Ext.getCmp('NAME').getValue();
	    	var Product_Batch=Ext.getCmp('Product_Batch').getValue();
	    	var Product_Date=Ext.getCmp('Product_Date').getValue();
	    	var MODEL_SPEC=Ext.getCmp('MODEL_SPEC').getValue();
	    	var FIGURE_NUM=Ext.getCmp('FIGURE_NUM').getValue();
	    	var MATERIAL_SPC=Ext.getCmp('MATERIAL_SPC').getValue();
	    	var MEASURE_UNIT=Ext.getCmp('MEASURE_UNIT').getValue();
	    	var Parts_Used_Quantity=Ext.getCmp('Parts_Used_Quantity').getValue();
	    	var Quote_Time=Ext.getCmp('Quote_Time').getValue();
	    	var Quotation=Ext.getCmp('Quotation').getValue();
	    	var Quote_Statue=Ext.getCmp('Quote_Statue').getValue();
	    	var Comments=Ext.getCmp('Comments').getValue();
	    	var PARTS_ID=Ext.getCmp('PARTS_ID').getValue();
		    var SBL_ROW_ID=Ext.getCmp('SBL_ROW_ID').getValue();
	    	if(NAME==""||NAME==null||typeof(NAME)=="undefined"){
	    		WL.Toast.show("名称不能为空");
	    		return;
	    	}
	    	if(Parts_Used_Quantity==""||Parts_Used_Quantity==null||typeof(Parts_Used_Quantity)=="undefined"){
	    		WL.Toast.show("数量不能为空");
	    		return;
	    	}
	    	
	    	var newData={NAME:NAME,
	    			PRODUCT_BATCH:Product_Batch,
	    			PRODUCT_DATE:Product_Date,
	    			MODEL_SPEC:MODEL_SPEC,
	    			FIGURE_NUM:FIGURE_NUM,
	    			MATERIAL_SPC:MATERIAL_SPC,
	    			MEASURE_UNIT:MEASURE_UNIT,
	    			QUANTITY:Parts_Used_Quantity,
	    			QUOTE_TIME:Quote_Time,
	    			QUOTATION:Quotation,
	    			QUOTE_STATUE:Quote_Statue,
	    			COMMENTS:Comments,
	    			SBL_ROW_ID:SBL_ROW_ID,
	    			PART_ID:PARTS_ID};
	    	
	    	console.log('修改后的:'+newData);
	    	
	    	var index=Ext.getCmp('hidddenListIndex').getValue();
	    	//当不经过index选取，保存后直接点击修改时
	    	if(index==""||index==null||typeof(index)=="undefined"){
	    		WL.Toast.show("请先选择要修改的对象");
	    		return;
	    		//list.splice(list.length-1,1,newData);
	    	}else{
	    		list.splice(index,1,newData);
	    	}
	    	MaintainReplacePieceStore.setData(list);
	    }
	    ,
	    //保存当前存储在list的东西
	    savePiece:function(){
	    	var MaintainReplacePieceStore=this.getStore('MaintainReplacePieceStore',"HelcPDA.store.maintain.MaintainReplacePieceStore");
	    	var list=Ext.Array.pluck(MaintainReplacePieceStore.getData().items,'data');
	    	var tid=Ext.getCmp('hidden2MP_ID').getValue();
	    	var query={tid:tid,tcode:'mainfields'};
	    	var options={exact:true};
	    	WL.JSONStore.get(collectionName).find(query,options).then(function(res){
	    		var query3={tid:res[0].json.stext.MP_ID+"--"+res[0].json.stext.PLAN_START_DT,tcode:'_PARK'};
	    		WL.JSONStore.get(collectionName).find(query3,options).then(function(rest){
	    			if(typeof(rest[0])=="undefined"){
		    			var  query1={jnlno:res[0].json.jnlno,tcode:"_PARK",tid:res[0].json.stext.MP_ID+"--"+res[0].json.stext.PLAN_START_DT,stext:list,stext_read:res[0].json.stext_read,
			          			files:res[0].json.files,files_read:res[0].json.files_read,status:res[0].json.status,uuid:res[0].json.uuid,versionCode:res[0].json.versionCode,versionName:res[0].json.versionName,created_time:res[0].json.created_time,
			       				last_updated_time:res[0].json.last_updated_time,ext1:res[0].json.ext1,ext2:res[0].json.ext2,ext3:res[0].json.ext3,ext4:res[0].json.ext4,ext5:res[0].json.ext5};
					    
			    		WL.JSONStore.get(collectionName).add(query1).then(function(){
			    			WL.Toast.show("成功添加数据");
				    	}).fail(function(err){
				    		WL.Toast.show("添加数据失败");
				    	});
		    		}else{
		    			var  query2={_id:rest[0]._id,json:{jnlno:res[0].json.jnlno,tcode:"_PARK",tid:res[0].json.stext.MP_ID+"--"+res[0].json.stext.PLAN_START_DT,stext:list,stext_read:res[0].json.stext_read,
			          			files:res[0].json.files,files_read:res[0].json.files_read,status:res[0].json.status,uuid:res[0].json.uuid,versionCode:res[0].json.versionCode,versionName:res[0].json.versionName,created_time:res[0].json.created_time,
			       				last_updated_time:res[0].json.last_updated_time,ext1:res[0].json.ext1,ext2:res[0].json.ext2,ext3:res[0].json.ext3,ext4:res[0].json.ext4,ext5:res[0].json.ext5}}; 
		    			
			    		WL.JSONStore.get(collectionName).replace(query2).then(function(){
			    			WL.Toast.show("修改数据成功");
				    	}).fail(function(err){
				    		WL.Toast.show("修改数据失败");
				    	});
		    			
		    		}
    			}).fail(function(){
    				WL.Toast.show("查找换件数据失败");
    			});
	    		
	    		
	    	}).fail(function(){
	    		
	    		
	    	});
	    	
	    },
	    //返回到主页面
	    back_Maintain:function(){
	    	var obj=this;
	    	navigator.notification.confirm('是否保存数据？',function(btn){
	 			if(btn ==2){
	 				obj.savePiece();
					obj.BackView();
	 			}else{
	 				obj.BackView();
	 				return;
	 			}
	 		},"提示","取消,确定");
/*	    	Ext.Msg.confirm('你好','是否保存数据？',function(btn){
					if (btn == 'yes'){
						obj.savePiece();
						obj.BackView();
					}else{
						obj.BackView();
						return;
					}
   			});*/	
	    }

	
});