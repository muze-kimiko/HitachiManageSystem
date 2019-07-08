
/* JavaScript content from app/controller/ChaoDianZengFei/CDZFMainOtherCtrl.js in folder common */
Ext.define("HelcApprove.controller.ChaoDianZengFei.CDZFMainOtherCtrl", {
	extend : "HelcApprove.controller.ApplicationController",
	config : {
		control : {
			"textfield#tf_research_add" : {
				blur : 'onResearchTextChangeAdd'
			},
			
			"textfield#tf_feeToAdd_add" : {
				blur : 'onFeeToAddTextChangeAdd'
			},
		}
	},
	
	// 工程期望价达到工程SPL 改变时
	onResearchTextChangeAdd: function() {
	  //安装期望价达到安装SPL
	   var toSPL = Ext.getCmp("tf_research_add").getValue();
	   //服务费需增加
	   var feeToAdd = Ext.getCmp('tf_feeToAdd_add').getValue();
	   //工程SPL价
	   var pSPL = Ext.getCmp('tf_pSPL_add').getValue();
	   //工程期望价
	   var pPrice = Ext.getCmp('tf_pprice_add').getValue();
	   //设备期望价
	   var dPrice = Ext.getCmp('CDZF_XX_SPQWJ').getValue();
	   var reg = new RegExp('￥','g');
	   dPrice = dPrice.replace(reg,'');
	   if (isNaN(toSPL) || toSPL == "" || toSPL == null || toSPL == undefined) {
		   Ext.Msg.alert("提示", "工程期望价达到工程SPL只能填写数字！");
		   Ext.getCmp("tf_research_add").setValue("");
		   Ext.getCmp('tf_feeToAdd_add').setValue("");
		   return ;
	   }
	   
	   //服务费需增加=(工程SPL*95%-工程期望价)/设备期望价
	   if(Number(pSPL)*(Number(toSPL)/100)-Number(pPrice) >= 0) {
		   Ext.getCmp("tf_research_add").setValue(parseFloat(toSPL).toFixed(2));
		   //alert('toSPL: ' + toSPL);
		   //alert('feeToAdd' + feeToAdd);
		   //alert('pSPL: ' + pSPL);
		   //alert('pPrice: ' + pPrice);
		   Ext.getCmp('tf_feeToAdd_add').setValue(parseFloat((Number(pSPL)*(Number(toSPL)/100)-Number(pPrice))/Number(dPrice) *100).toFixed(2));
	   } else {
		   Ext.getCmp('tf_feeToAdd_add').setValue("");
	   }
	},
	
	// 服务费需增加改变时
	onFeeToAddTextChangeAdd: function() {
		//安装期望价达到安装SPL
		var toSPL = Ext.getCmp("tf_research_add").getValue();
	    //服务费需增加
		var feeToAdd = Ext.getCmp('tf_feeToAdd_add').getValue();
		//工程SPL价
		var pSPL = Ext.getCmp('tf_pSPL_add').getValue();
		//工程期望价
		var pPrice = Ext.getCmp('tf_pprice_add').getValue();
		//设备期望价
		var dPrice = Ext.getCmp('CDZF_XX_SPQWJ').getValue();
		var reg = new RegExp('￥','g');
		dPrice = dPrice.replace(reg,'');
		if (isNaN(feeToAdd) || feeToAdd == "" || feeToAdd == null || feeToAdd == undefined) {
			   Ext.Msg.alert("提示", "服务费需增加只能填写数字！");
			   Ext.getCmp("tf_research_add").setValue("");
			   Ext.getCmp('tf_feeToAdd_add').setValue("");
			   return ;
		  }
		
	    if(feeToAdd != null && feeToAdd !="") {
	    	Ext.getCmp('tf_feeToAdd_add').setValue(parseFloat(feeToAdd).toFixed(2));
	    	Ext.getCmp("tf_research_add").setValue(parseFloat(((Number(feeToAdd)/100*Number(dPrice) + Number(pPrice))/Number(pSPL))*100).toFixed(2));
	    } 
	},
	
});
