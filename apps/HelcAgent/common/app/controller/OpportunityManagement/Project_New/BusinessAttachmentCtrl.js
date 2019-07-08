
//获取图片转换Base64位字符串
var SrcDirs=[];

Ext.define('HelcAgent.controller.OpportunityManagement.Project_New.BusinessAttachmentCtrl',{
	extend:'HelcAgent.controller.ApplicationController',
	config:{
		control:{
			 //商机附件  返回 
			 'button#BusinessAttachment_new_id_FH':{
			 	tap:'BusinessAttachment_new_id_FH',
			 },
			 	 
			 //商机附件  拍摄照片
			 'button#BusinessAttachment_new_id_PSZP':{
			 	 tap:'BusinessAttachment_new_id_PSZP',
			 },
			 
			 //商机附件 选取照片
			 'button#BusinessAttachment_new_id_XQZP':{
				 tap:'BusinessAttachment_new_id_XQZP'
			 },
			 
			 //商机附件  删除图片
			 'list#businessattachment_listV':{
		    	 itemtap:'businessattachment_listV'
		     },
		     
		     //商机附件 上传
		     'button#businessattachment_new_id_SC':{
		    	 tap:'businessattachment_new_id_SC'
		     },
		},	
	},
	businessattachment_new_id_SC:function(){
		var obj = this;
		Ext.Msg.show({
			   title: '温馨提示',
			   message: '上传附件？',
			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
			   fn: function(buttonId) {
				   if(buttonId == 'yes'){
					   obj.uploadAtt();
				   }
				}
		   });
	},
	//商机附件 上传
	uploadAtt:function(){
		//this.TuPianJM();Fsrc,src
		//var businessattchmentOpportunity = Ext.getCmp('businessattchmentOpportunity').getData();
		var obj = this; 
	/*	 
		obj.pictures[0] = {
				AttachmentType:'',
				Comments:'',
				Id:null,
				OpptyFileBuffer:short,
				OpptyFileDate:'',
				OpptyFileExt:'jpeg',
				OpptyFileName:'oppty'+Ext.Date.now()+i,
				OpptyFileSize:'',
				OpptyFileSrcPath:'',
				OpptyFileSrcType:'',
				OpptyId:businessattchmentOpportunity.RowId
		};*/
		
		if(!obj.pictures.length){
			Ext.Msg.alert('提示','您还没有选取文件');
			return;
		}
		
		var attachmentType = document.getElementsByName('attachmentType');
		
		var flag = false;
		for(var i=0;i<attachmentType.length;i++){
			if(attachmentType[i].value==''){
				Ext.Msg.alert('提示','请选择附件类型');
				flag = true;
				break;
			}
		}
		
		if(flag)
			return ;
		var count = obj.pictures.length;
		var param = [];
		
		for(var i=0;i<count;i++){
			obj.pictures[i].userID = userID;
			obj.pictures[i].AttachmentType = attachmentType[i].value;
			param[i] = obj.pictures[i];
		}
		
		var num = 0;
		var params = {
				adpName:'HttpAdapter_PAD_Custom',
				prodName:'uploadAnnex',
				parameters:param[num] 
		};
		
		var getResult = function(result){
			num++;
			params.parameters= param[num];
			if(count!=num)
				obj.connectServer_queryOpportunity(this,params);
			else{
				if(!result.OpptyAttSynchronize_Output){
					Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
					return ;
				}
				picture_list = null;
				Ext.Msg.alert('提示','上传完成！');
				obj.BackView();
			}
		};
		
		this.connectServer_queryOpportunity(getResult,params);
	},
	
	//图片解码  
	TuPianJM:function(){/*
    	for(var i=0;i<picture_list.length;i++){
    		var src = picture_list[i].src;
        	if(src.substring(0,4)=="file"){
        		var readSrc = src.substring(7,src.length);
        		cordova.exec(callOK,callFailure,'FileUpLoad','upload',[{READSRC:readSrc}]);
        		function callOK(data){
        			WL.Toast.show('调用成功，把图片转码了');
        			//WL.Toast.show(data);
        			var dataObj={};
        			dataObj.data = data;
        			SrcDirs[i]=dataObj;
        		}
        		
        		function callFailure(data){
        			WL.Toast.show('callFailure上传图片失败');
        		}
        		
        	}else{
        		//alert("RUI是:"+src);
        		cordova.exec(ruicallOK,ruicallFailure,'UriToFile','uritofile',[src]);
        		function ruicallOK(data){
        			
        			cordova.exec(ruiTOfilecallOK,ruiTOfilecallFailure,'FileUpLoad','upload',[data]);
            		
            		function ruiTOfilecallOK(data){
            			//alert("调用成功，RUI转成绝对路径后，把图片转码了");
            			var dataObj={};
            			dataObj.data = data;
            			SrcDirs[i]=dataObj;
            		}
            		
            		function ruiTOfilecallFailure(data){
            			WL.Toast.show('ruiTOfilecallFailure上传图片失败');
            		}
        		}
        		
        		function ruicallFailure(data){
        			WL.Toast.show('转化uri失败');
        		};
        	}
    	};*/
	},
	
	//点击删除一张图片
	businessattachment_listV:function(list, index, target, record, e, eOpts){
		var obj  = this;
    	var store=obj.getStore('PictureStore','HelcAgent.model.OpportunityManagement.Project_New.OpptyPictureModel');
    	
    	if(event.target.id=="businessattachment_listV_DELETE"){
    		var obj = this;
    		Ext.Msg.show({
    			   title: '温馨提示',
    			   message: '删除附件？',
    			   buttons: [{text:'取消', itemId:'no'},{text:'确定', itemId:'yes'}],
    			   fn: function(buttonId) {
    				   if(buttonId == 'yes'){
    					   var storeLength = store.getCount();
    			    		var picturesLength = picture_list.length;
    			    		
    			    		store.removeAt(index);
    			    		var storeIndex = index-(storeLength-picturesLength)-1;
    			    		
    			    		if(index>storeIndex){
    			    			
    							picture_list.splice(storeIndex,1);
    						}
    			    		
    			    		else if(storeLength==picturesLength)
    			    			picture_list.splice(index,1);

    			    		obj.refreshPic(obj);
    					   
    				   }
    			   }
    			});
    		
    		
    	}else if(event.target.id=="attachmentType"){
    		
    	}else{
    		this.NextView('custornBigImg_new_id','HelcAgent.view.OpportunityManagement.CustomerInformation_New.CustornBigImg');
    		var src = '';
    		if(!record.raw.Id)
    			src = record.raw.OpptyFileSrcPath;
    		else
    			src = record.raw.OpptyFileBuffer;
    		Ext.getCmp('custornBigImg_new_id_img').setSrc(src);
    	}
    },
	
	//商机附件 选取照片
	BusinessAttachment_new_id_XQZP:function(){
		this.PAD_GGFS_XQZP('businessattachment_listV',this.refreshPic,this);
		
		/*var obj=this;
    	var store=obj.getStore('PictureStore','HelcAgent.model.OpportunityManagement.Project_New.PictureModel');
	
    	function onFail(e){
    		WL.Toast.show("取消选择图片");
    	}
    	function onPhotoURISuccess(data){
    		var tempPic={};
			tempPic.src= data; // "data:image/jpeg;base64," +
			console.log("data:image/jpeg;base64," + data);
    		picture_list.push(tempPic);
    		var length=picture_list.length;
			Ext.getCmp('businessattachment_listV').setHeight(length==0?0:(length+1)*35);
    		store.setData(picture_list);
    	}
    	// capture callback
    	navigator.camera.getPicture(onPhotoURISuccess, onFail, 
    		{
    		quality: 80,
    	    destinationType: navigator.camera.DestinationType.FILE_URI ,
    	    sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
    	    allowEdit: true
    		});*/
		
	},
	
	//商机附件  拍摄照片
	BusinessAttachment_new_id_PSZP:function(){
		this.PAD_GGFS_PSZP('businessattachment_listV',this.refreshPic,this);
		
    	/*var obj=this;
    	navigator.camera.getPicture(
				function(data){
					var tempPic={};
					tempPic.src= data;//"data:image/jpeg;base64," +
					console.log("data:image/jpeg;base64," + data);
					picture_list.push(tempPic);
					var length=picture_list.length;
					Ext.getCmp('businessattachment_listV').setHeight(length==0?0:(length+1)*35);
					var store=obj.getStore('PictureStore','HelcAgent..OpportunityManagement.Project_New.PictureModel');
					store.setData(picture_list);
				},
				function(e){
					WL.Toast.show("取消选择图片");
				},
				{
					quality: 20,
					destinationType:navigator.camera.DestinationType.FILE_URI , 
					sourceType: navigator.camera.PictureSourceType.CAMERA,
					allowEdit: true,
					encodingType: Camera.EncodingType.JPEG, 
					targetWidth: value,
					targetHeight: value,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: true,
					correctOrientation: true,
					cameraDirection: Camera.Direction.BACK 
				});*/
		
	},
	
	//商机附件  返回
	BusinessAttachment_new_id_FH:function(){
		this.BackView();
		obj.pictures = [];
		picture_list = [];
		var store=obj.getStore('OpptyPictureStore','HelcAgent.store.OpportunityManagement.Project_New.OpptyPictureStore');
		store.setData([]);
	},
	
	//附件下载
	toInit:function(){
		var obj=this;
		this.pictures = [];
		var businessattchmentOpportunity = Ext.getCmp('businessattchmentOpportunity').getData();
		if(businessattchmentOpportunity.OpptyStatus!='大项目部退回'&&businessattchmentOpportunity.OpptyStatus!='申请流失'&&businessattchmentOpportunity.OpptyStatus!='提交大项目部'&&businessattchmentOpportunity.OpptyStatus!='完成'&&businessattchmentOpportunity.OpptyStatus!='流失'&&businessattchmentOpportunity.OpptyStatus!='已提交')
			Ext.getCmp('businessattachment_new_id_SC').setHidden(false);
		else
			Ext.getCmp('businessattachment_new_id_SC').setHidden(true);
		var param = {
				userID:userID,
				opptyId:businessattchmentOpportunity.RowId
		};
		
		var params = {
 				adpName:'HttpAdapter_PAD_Custom',
 				prodName:'downloadAnnex',
 				parameters:param
 		};
		
		var getResult = function(result){
			
			if(!result.OpptyAttQuery_Output){
				Ext.Msg.alert('提示','服务器繁忙，请稍后重试！');
				return ;
			}else if(result.OpptyAttQuery_Output.NumOutputObjects==0)
				Ext.Msg.alert('提示','该商机无附件！');
			var data = result.OpptyAttQuery_Output.ListOfHelEaiAppOpportunityAttachment.ListOfHelOpportunityAttachment.HelOpportunityAttachment;
			
			/*var list = Ext.getCmp('businessattachment_listV');
			var tpl =new Ext.XTemplate('<div style="width:100%; margin:0; padding:0;">'+
			'    <img src={OpptyFileBuffer} style="float:left; margin:0; padding:0;width:40px;height:30px;"></img>{Id}'+
			'    <div style="float:right;">'+
			'    <img  id="businessattachment_listV_DELETE" style="width:18px;" src="images/delete01.png"/>'+
			'    </div>'+
			'<div style="float:right;margin-left:10;margin-bottom:2;"><tpl if="Id==undefined"><select name="attachmentType"></select></tpl><tpl if="Id!=undefined">{AttachmentType}</tpl></div>'+
			'</div>');
			list.setItemTpl(tpl);*/
			var store = Ext.data.StoreManager.get('OpptyPictureStore');
			if(!store)
				store = Ext.create('HelcAgent.store.OpportunityManagement.Project_New.OpptyPictureStore');
			if(result.OpptyAttQuery_Output.NumOutputObjects=='0'){
				
			}else if(result.OpptyAttQuery_Output.NumOutputObjects=='1'){
				data.OpptyFileBuffer = 'data:image/jpeg;base64,'+data.OpptyFileBuffer.CDATA;
				store.setData([data]);
			}else{
				for(var i=0;i<data.length;i++){
					data[i].OpptyFileBuffer = 'data:image/jpeg;base64,'+data[i].OpptyFileBuffer.CDATA;
				}
				store.setData(data);
			}
			picture_list = [];
			
		};
		
		obj.connectServer_queryOpportunity(getResult,params);
		
	},
	//将拍摄和选取的附件更新到添加数组中
	refreshPic:function(ctrl){
		
		var obj = ctrl;//.getApplication().getController('HelcAgent.controller.OpportunityManagement.Project_New.BusinessAttachmentCtrl');
		var businessattchmentOpportunity = Ext.getCmp('businessattchmentOpportunity').getData();
		for(var i=0;i<picture_list.length;i++){
    		obj.pictures[i] = {
    				AttachmentType:'',
    				Comments:'',
    				Id:null,
    				OpptyFileBuffer:picture_list[i].Fsrc,
    				OpptyFileDate:'',
    				OpptyFileExt:'jpeg',
    				OpptyFileName:'oppty'+Ext.Date.now()+i,
    				OpptyFileSize:'',
    				OpptyFileSrcPath:picture_list[i].src,
    				OpptyFileSrcType:'',
    				OpptyId:businessattchmentOpportunity.RowId
    		};
    	}
		
		var store=obj.getStore('OpptyPictureStore','HelcAgent.store.OpportunityManagement.Project_New.OpptyPictureStore');
		
		var temp = [];
		
		var storeNum = store.getCount();
		
		for(var i=0;i<storeNum;i++){
			if(!store.getAt(i).get('Id'))
				break;
			var exitItem = {};
			exitItem.AttachmentType=store.getAt(i).get('AttachmentType'),
			exitItem.Comments=store.getAt(i).get('Comments'),
			exitItem.Id=store.getAt(i).get('Id'),
			exitItem.OpptyFileBuffer=store.getAt(i).get('OpptyFileBuffer'),
			exitItem.OpptyFileDate=store.getAt(i).get('OpptyFileDate'),
			exitItem.OpptyFileExt=store.getAt(i).get('OpptyFileExt'),
			exitItem.OpptyFileName=store.getAt(i).get('OpptyFileName'),
			exitItem.OpptyFileSize=store.getAt(i).get('OpptyFileSize'),
			exitItem.OpptyFileSrcPath=store.getAt(i).get('OpptyFileSrcPath'),
			exitItem.OpptyFileSrcType=store.getAt(i).get('OpptyFileSrcType'),
			exitItem.OpptyId=store.getAt(i).get('OpptyId');
			
			temp[i] = exitItem;
		}
		
		store.setData(temp);
		
		for(var i=0;i<obj.pictures.length;i++){
			store.addData(obj.pictures[i]);
		}
		
		var select = document.getElementsByName('attachmentType');
		
		var attachmentType = obj.extractionData('HEL_ATTACHMENT_TYPE');
		
		for(var i=0;i<select.length;i++){
			select[i].options = [];
			for(var j=0;j<attachmentType.length;j++){
				if(j==0)
					select[i].options[j] = new Option('请选择附件类型','');
				else
					select[i].options[j] = new Option(attachmentType[j].LIS_VAL,attachmentType[j].LIS_VAL);
			}
		}
		
	}
});	



