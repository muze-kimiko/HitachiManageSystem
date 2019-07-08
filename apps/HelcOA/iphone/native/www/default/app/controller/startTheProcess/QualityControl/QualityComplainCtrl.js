
/* JavaScript content from app/controller/startTheProcess/QualityControl/QualityComplainCtrl.js in folder common */
Ext.define('HelcOA.controller.startTheProcess.QualityControl.QualityComplainCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	config:{
		control:{
		}
	},
	
	checkvalue50 : function() {
		var node = Ext.getCmp('node').getValue();
		if(node=="质量部审核"){
			if(Ext.getCmp('tsdj').getValue()==""){
				Ext.Msg.alert('投诉等级不能为空');
				return false;
			}
			if(Ext.getCmp('tslx').getValue()==""){
				Ext.Msg.alert('投诉类型不能为空');
				return false;
			}
			if(Ext.getCmp('gjr').getValue()==""){
				Ext.Msg.alert('质量部跟进人不能为空');
				return false;
			}
			if(Ext.getCmp('gsdw').getValue()==""){
				Ext.Msg.alert('归属单位不能为空');
				return false;
			}
			if(Ext.getCmp('tsflag').getValue()=="是"){
				Ext.getCmp('tsdj').setValue("公司级投诉");
				Ext.getCmp('sendreader').setValue("组织_工程品证部科长");
			}
		}
		
	    
	    if (node=="填写反馈单"){
	    	if(Ext.getCmp('shzt').getValue()==""){
	    		Ext.Msg.alert("售后状态不能为空");
	    		return false;
	    	}
	    	if(Ext.getCmp('gjqk_textarea').getValue()==""){
				Ext.Msg.alert('跟进情况不能为空');
				return false;
			}
	    	if(Ext.getCmp('clbf_textarea').getValue()==""){
	    		Ext.Msg.alert('处理办法不能为空');
	    		return false;
	    	}
	    	if(Ext.getCmp('gjjg_textarea').getValue()==""){
	    		Ext.Msg.alert('跟进结果不能为空');
	    		return false;
	    	}
	    }
	    
	    if (node=="质量部判责"){
	    	if(Ext.getCmp('blfl').getValue()==""){
	    		Ext.Msg.alert("请选择不良分类");
	    		return false;
	    	}
	    	if(Ext.getCmp('zzdj').getValue()==""){
				Ext.Msg.alert('最终投诉等级不能为空');
				return false;
			}
	    	if(Ext.getCmp('zzbm').getValue()==""){
	    		Ext.Msg.alert('主责部门不能为空');
	    		return false;
	    	}
	    	if(Ext.getCmp('wcdate').getValue()==""){
	    		Ext.Msg.alert('完成日期不能为空');
	    		return false;
	    	}
	    }
	    
	      return true;
	}	    
	    
	
	
});