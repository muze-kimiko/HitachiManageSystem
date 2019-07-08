
/* JavaScript content from app/controller/ForApprovalProcess/DailyOffice/jobContactBookCtrl.js in folder common */

var picture_list=[];
var SrcDirs=[];
Ext.define('HelcOA.controller.ForApprovalProcess.DailyOffice.jobContactBookCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	config:{
		control:{
			//预留备用
			"button#take_picture":{
				tap:'take_picture'
			},
			"button#see_picture":{
				tap:'see_picture'
			},"list#picture_listV_ck":{
		    	   itemtap:'picture_listV_ck'
		    },"button#fujian_img_delete_ck":{
		    	tap:'fujian_img_delete_ck'
		    }
//		    "button#uploadPiece": {
//        		tap: 'uploadPiece'
//        	},
		}
	},
	
	take_picture:function(){
		
		var obj=this;
    	navigator.camera.getPicture(
				function(data){
					var tempPic={};
					tempPic.src= "data:image/jpeg;base64," + data;//"data:image/jpeg;base64," +
					console.log("data:image/jpeg;base64," + data);
					picture_list.push(tempPic);
					var length=picture_list.length;
					Ext.getCmp('picture_listV').setHeight(length==0?0:(length+1)*35);
					var store=obj.getStore('jobContactBook_Store','HelcOA.store.startTheProcess.DailyOffice.jobContactBook_Store');
					store.setData(picture_list);
					//zhj
					var dataObj={};
					dataObj.filecode = data;
					dataObj.filename ="未命名.jpg";
					SrcDirs.push(dataObj);
		            var imgstore =obj.getStore('Base64_Store','HelcOA.store.startTheProcess.DailyOffice.Base64_Store');
			    	imgstore.setData(SrcDirs);
					
					
				},
				function(e){
					WL.Toast.show("取消选择图片");
				},
				{
					quality: 20,
					destinationType:navigator.camera.DestinationType.DATA_URL , 
					sourceType: navigator.camera.PictureSourceType.CAMERA,
					allowEdit: true,
					encodingType: Camera.EncodingType.JPEG, 
//					targetWidth: value,
//					targetHeight: value,
					popoverOptions: CameraPopoverOptions,
					saveToPhotoAlbum: true,
					correctOrientation: true,
					cameraDirection: Camera.Direction.BACK 
				});	
    	this.uploadPiece();
    	
	},
	see_picture:function(){
	
		var obj=this;
		var store=obj.getStore('jobContactBook_Store','HelcOA.store.startTheProcess.jobContactBook_Store');
	  
    	function onFail(e){
    		WL.Toast.show("取消选择图片");
    	}
    	function onPhotoURISuccess(data){
    		var tempPic={};
			tempPic.src= data; // "data:image/jpeg;base64," +
			//alert("data:image/jpeg;base64," + data);
    		picture_list.push(tempPic);
    		var length=picture_list.length;
			Ext.getCmp('picture_listV').setHeight(length==0?0:(length+1)*35);
			store.setData(picture_list);
			//zhj
			var dataObj={};
			dataObj.filecode = data;
			dataObj.filename ="未命名.jpg";
			SrcDirs.push(dataObj);
            var imgstore =obj.getStore('Base64_Store','HelcOA.store.startTheProcess.DailyOffice.Base64_Store');
	    	imgstore.setData(SrcDirs);
			
    	}
    	// capture callback
    	navigator.camera.getPicture(onPhotoURISuccess, onFail, 
    		{
    		quality: 80,
    	    destinationType: navigator.camera.DestinationType.DATA_URL ,
    	    sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,
    	    allowEdit: true
    		});
    	this.uploadPiece();
	},
	  //点击看图片
	picture_listV_ck:function(obj, index, target, record, e, eOpts){
		//alert(record.get('filename'));
		var fjfilename=record.get('filename');
	    var piid=Ext.getCmp('piid').getValue();
    
	    //fjfilename="1.doc";
		if(fjfilename.indexOf(".jpg")<0)
	     {  
			if(fjfilename.indexOf(".jpeg")<0){
			  Ext.Msg.alert("","手机暂不支持看图片以外的文件,请到电脑端查看！");
			     return;
		  }
		  }
		var obj=this;
    	var store=this.getStore('jobContactBook_ck_Store','HelcOA.store.ForApprovalProcess.DailyOffice.jobContactBook_ck_Store');
        console.log("zhaa:"+store.getAt(0).get('filename'))
     
    	function getresult(res){
    	 
    	 var base64sj =res.GetattachReturn.CDATA;
    	 if(base64sj==piid)
    		{
    		 Ext.Msg.alert("显示失败！","暂时不支持中文文件名！");
    	    return
    	    }
    	 //console.log("hehe:"+base64sj);
         //var stauts =eval("("+res+")").stauts;
    	//提交备用
    	var imgstore =obj.getStore('Base64_Store','HelcOA.store.ForApprovalProcess.DailyOffice.Base64_Store');
        imgstore.setData(res);   
    		Ext.Viewport.add({
				xtype:'panel',
				id:'fujian_img',
				height:'80%',
		     	width: '90%',
				hideOnMaskTap: false,
	 	            centered: true,
			     	modal: true,
			     	style: 'background:#ccc',
			        items: [{
			                xtype: 'container',
			                height: '100%',
			                margin: '100 auto 0 auto',
			                padding: '',
			                style: 'background:#fff',
			                width: '100%',
			                layout: 'vbox',
			                items: [
			                    {
			                        xtype: 'toolbar',
			                        id:'fujian_img_toolbar',
			                        docked: 'top',
			                        title: '',
			                        items: [
//			                            {
//				                                xtype: 'button',
//				                                id:'fujian_img_update',
//				                                text:'重命名',  
//				                         },
			                            {
			                                xtype: 'spacer',
			                            },
			                            {
			                                xtype: 'button',
			                                iconCls: 'delete',
			                                //text: '',
			                                id:'fujian_img_delete_ck',
			                            }
			                        ]
			                    },
			                    {
			                        xtype: 'formpanel',
			                        padding: 10,
			                        height: '100%',
			                        items: [
			                             {
                                        	xtype: 'image',
                                        	id:'fj_img',
                                        	height:428,
                                        	margin: '0 0 10 0',
                                        	//src:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAdACkDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6prldT+IPhTStan0nVPEOmWGowIskkN3cLDtDcjliBkgg4znBBxXVVw3jT4U+DvGmppqPiLRY7q+VBH5yzSxMVHTOxhnHvmgC3/wsnwR/0OHhz/waQf8AxVfPfxd8Twah+0J4d1Dwj4o0CCSLRZIo9Tnuo5LS3lK3XDsCVBIZQAc8svB6HuvEPwu+Cvh+5W31bS0gnYbvLF3eOQPUhXOPxrynxN4R+H0HxO0q50jTmuPBMdmftlrHNOJJZz5oG0yMGGMwnhgMD61nKrTi7OSO2jluLrpSpUpNPZ2dvv2PZv2c/HmveK28T6T4nvLDUrrRZ4kTUbEoY7hX8wZBQBSP3eQQBw3IBFezfLXz78OfE3gDwVqV7/wjGjapYQ6isEcsbEygMjSYb5pGbkSYwPTpX0HRGpCXwszxOCr4VpV4ON9roK5fx14MsfGNtbQahcXcCQMzr9ncDOQOoIIPT0rp6XtVSipKz2MaVadGaqU3ZrZnA+GfhV4b0RpWa3OpNJgA3wWQIPYYA/SvKvhjbTeOfjgfFOi6SdH8I6AktpCvleULmYq6ElePmxISeOAqg8mvpOmhQBwKUYRj8KNK2Lr15OVWbbfmPoooqzA//9k=',
                                        	
                                        },{
			                            	xtype: 'textfield',
			                                id: 'listindex',
			                                name: 'listindex',
			                                hidden: true,
			                            }
			                        ]
			                    },

			                ]
			            }]
			});
    		var src=base64sj;
    		var title=record.get('filename');
    		Ext.getCmp("fujian_img_toolbar").setTitle(title);
    		//document.getElementById("img").innerHTML="<img src="+base64sj+"</img>";
    		Ext.getCmp('fj_img').setSrc("data:image/jpeg;base64,"+src);
    		Ext.getCmp("listindex").setValue(index);
    }

    
    
    var datas=piid+"*"+fjfilename;
    console.log("lala:"+datas);
    var params={
    method:'fujian_ck', 
    parameters:[datas]
    };
    this.connectServer_fj(getresult,params);
    },
    fujian_img_delete_ck:function(){	
    	Ext.getCmp('fujian_img').destroy();
    },

//    uploadPiece : function(){
//    	
//    	var obj = this;
//    	var SrcDirs = [];
//    	var i;
//    	var filename;
//    	for(i=0;i<picture_list.length;i++){
//    		var src = picture_list[i].src;
//        	if(src.substring(0,4)=="file"){
//        		//alert("路径是绝对路径，src="+src);
//        		var readSrc = src.substring(7,src.length);
//        		filename=src.substring(src.lastIndexOf("/")+1,src.length);
//        		//alert("hehe!"+filename);
//        		cordova.exec(callOK,callFailure,'FileUpLoad','upload',[{READSRC:readSrc}]);
//        		
//        		function callOK(data){
//        			//alert("调用成功，把图片转码了");
//        			var dataObj={};
//        			dataObj.filecode = data;
//        			dataObj.filename=filename;
//        			//alert("hehe+"+data);
//        			SrcDirs[i]=dataObj;
//        			
//        		}
//        		
//        		function callFailure(data){
//        			WL.Toast.show('callFailure上传图片失败');
//        		}
//        		
//        	}else{
//        		///alert("RUI是:"+src);
//        		cordova.exec(ruicallOK,ruicallFailure,'FileUpLoad','uritofile',[src]);
//        		function ruicallOK(data){
//        			
//        			filename=data.substring(data.lastIndexOf("/")+1,data.length);
//        			//alert("hehe!"+filename);
//        			cordova.exec(ruiTOfilecallOK,ruiTOfilecallFailure,'FileUpLoad','upload',[{READSRC:data}]);
//            		
//            		function ruiTOfilecallOK(data){
//            			//alert("调用成功，RUI转成绝对路径后，把图片转码了");
//            			var dataObj={};
//            			dataObj.filecode = data;
//            			dataObj.filename=filename;
//            			SrcDirs[i]=dataObj;
//            			
//            		}
//            		
//            		function ruiTOfilecallFailure(data){
//            			WL.Toast.show('ruiTOfilecallFailure上传图片失败');
//            		}
//        		}
//        		
//        		function ruicallFailure(data){
//        			WL.Toast.show('转化uri失败');
//        		}
//        	}
//    	};
//    	var imgstore =obj.getStore('Base64_Store','HelcOA.store.startTheProcess.DailyOffice.Base64_Store');
//    	imgstore.setData(SrcDirs);
// //    	contentdata={SrcDirs:SrcDirs};
////		var content= JSON.stringify(contentdata);
////	    var getResult=function(res){
////	    	WL.Toast.show(res.msginfo);
////	    };
////	        
////	    obj.connectServer(getResult, 'fileUpLoadAction.do?method=toUpLoad', content);
////    	
//    	
//    },

});