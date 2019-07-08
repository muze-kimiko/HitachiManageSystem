Ext.define('HelcPDA.controller.maintain.New_InstructionBookCtrl', {
    extend: 'HelcPDA.controller.ApplicationController',
    
    config: {
        control: {
        	"button#btn_New_InstructionBook": {
        		tap: 'Onbtn_New_InstructionBookTap'
        	},
        	"list#L_New_InstructionBook":{
        		itemtap:'OnL_New_InstructionBookItemtap'
        	},
        	"button#btn_New_InstructionBookL1": {
        		tap: 'Onbtn_New_InstructionBookTap'
        	},
        	"list#L_New_InstructionBookL1":{
        		itemtap:'OnL_New_InstructionBookL1Itemtap'
        	},
        	"button#btn_New_InstructionBookL2": {
        		tap: 'Onbtn_New_InstructionBookTap'
        	},
        	"list#L_New_InstructionBookL2":{
        		itemtap:'OnL_New_InstructionBookL2Itemtap'
        	},
        	"button#Back_btn_New_InstructionBook_PhotoView": {
        		tap: 'Onbtn_New_InstructionBookTap'
        	},
        }
    },
    
    Onbtn_New_InstructionBookTap : function(thisObj,e,eOpts){
    	MainCtr.BackView();
    },
    
    OnL_New_InstructionBookItemtap : function(thisObj,index,target,record,e,eOpts){
    	console.log(record.data.Children);
    	if(record.data.Children != ''){
    		var v_data = [];
    		var v_children = record.data.Children.HelMaintainingPlanTemplateTask; 
    		if(v_children.length){
    			for(var i = 0;i<v_children.length;i++){
    				v_data.push({
    					TaskGroupName:v_children[i].TaskGroupName,
    					TaskDescription:v_children[i].TaskDescription,
    					TaskRadix:v_children[i].TaskRadix,
    					TaskStandTime:v_children[i].TaskStandTime,
    					TaskType:v_children[i].TaskType,
    					Children:v_children[i].ListOfHelMeasureProject,
    				});
    			}
    		}else{
    			v_data.push({
					TaskGroupName:v_children.TaskGroupName,
					TaskDescription:v_children.TaskDescription,
					TaskRadix:v_children.TaskRadix,
					TaskStandTime:v_children.TaskStandTime,
					TaskType:v_children.TaskType,
					Children:v_children.ListOfHelMeasureProject,
				});
    		}
    		
    		this.NextView('New_InstructionBookL1','HelcPDA.view.maintain.New_InstructionBookL1');
			Ext.getCmp('L_New_InstructionBookL1').getStore().setData(v_data);
    	}else{
//    		Ext.Msg.alert('温馨提示','没有相关指示书内容！');
    		Ext.toast('没有更多的内容了！',1000);
    	}
    },
    
    OnL_New_InstructionBookL1Itemtap : function(thisObj,index,target,record,e,eOpts){
    	console.log(record.data.Children);
    	if(record.data.Children != ''){
    		var v_data = [];
    		var v_children = record.data.Children.HelMeasureProject; 
    		if(v_children.length){
    			for(var i = 0;i<v_children.length;i++){
    				v_data.push({
    					MeasureProjectContent:v_children[i].MeasureProjectContent,
    					MeasureProjectContentName:v_children[i].MeasureProjectContentName,
    					MeasureProjectNo:v_children[i].MeasureProjectNo,
    					MeasureProjectRequest:v_children[i].MeasureProjectRequest,
    					MeasureProjectStandard:v_children[i].MeasureProjectStandard,
    					Children:v_children[i].ListOfHelMaintainPlanContentAttachment,
    				});
    			}
    		}else{
    			v_data.push({
    				MeasureProjectContent:v_children.MeasureProjectContent,
					MeasureProjectContentName:v_childre.MeasureProjectContentName,
					MeasureProjectNo:v_children.MeasureProjectNo,
					MeasureProjectRequest:v_children.MeasureProjectRequest,
					MeasureProjectStandard:v_children.MeasureProjectStandard,
					Children:v_children.ListOfHelMaintainPlanContentAttachment,
				});
    		}
    		
    		this.NextView('New_InstructionBookL2','HelcPDA.view.maintain.New_InstructionBookL2');
			Ext.getCmp('L_New_InstructionBookL2').getStore().setData(v_data);
    	}else{
//    		Ext.Msg.alert('温馨提示','没有相关指示书内容！');
    		Ext.toast('没有更多的内容了！',1000);
    	}
    },
    
    OnL_New_InstructionBookL2Itemtap : function(thisObj,index,target,record,e,eOpts){
    	console.log(record.data.Children);
    	if(record.data.Children != ''){
    		var v_children = record.data.Children.HelMaintainPlanContentAttachment;
    		this.NextView('New_InstructionBook_PhotoView','HelcPDA.view.maintain.New_InstructionBook_PhotoView');
    		Ext.getCmp('Con_New_InstructionBook_PhotoView').setHtml('<img style="width:100%" src="data:'+v_children.RecFileExt+'/png;base64,'+v_children.RecFileBuffer.CDATA+'">');
    	}else{
    		Ext.toast('没有更多的内容了！',1000);
    	}
    },
});
