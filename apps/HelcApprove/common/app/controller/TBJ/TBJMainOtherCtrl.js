Ext.define("HelcApprove.controller.TBJ.TBJMainOtherCtrl", {
	extend : "HelcApprove.controller.ApplicationController",
	config : {
		control : {
			"textfield#tf_arate" : {
				blur : 'onArateTextChange'
			},
			
			"textfield#tf_adprice" : {
				blur : 'onAdpriceTextChange'
			},
			
			"textfield#tf_research" : {
				blur : 'onResearchTextChange'
			},
			
			"textfield#tf_feeToAdd" : {
				blur : 'onFeeToAddTextChange'
			},
			
			"textfield#tf_atprice" : {
				blur : 'onAtpriceTextChange'
			},
			
			"textfield#tf_atrate" : {
				blur : 'onAtrateTextChange'
			},
			
		}
	},
	
	// 工程期望价达到工程SPL 改变时
	onResearchTextChange: function() {
	  //安装期望价达到安装SPL
	   var toSPL = Ext.getCmp("tf_research").getValue();
	   //服务费需增加
	   var feeToAdd = Ext.getCmp('tf_feeToAdd').getValue();
	   //工程SPL价
	   var pSPL = Ext.getCmp('tf_pSPL').getValue();
	   //工程期望价
	   var pPrice = Ext.getCmp('tf_pprice').getValue();
	   //设备期望价
	   var dPrice = Ext.getCmp('tf_dprice').getValue();
	   if (isNaN(toSPL) || toSPL == "" || toSPL == null || toSPL == undefined) {
		   Ext.Msg.alert("提示", "工程期望价达到工程SPL只能填写数字！");
		   Ext.getCmp("tf_research").setValue("");
		   Ext.getCmp('tf_feeToAdd').setValue("");
		   return ;
	   }
	   
	   //服务费需增加=(工程SPL*95%-工程期望价)/设备期望价
	   if(Number(pSPL)*(Number(toSPL)/100)-Number(pPrice) >= 0) {
		   Ext.getCmp("tf_research").setValue(parseFloat(toSPL).toFixed(2));
		   Ext.getCmp('tf_feeToAdd').setValue(parseFloat((Number(pSPL)*(Number(toSPL)/100)-Number(pPrice))/Number(dPrice) *100).toFixed(2));
	   } else {
		   Ext.getCmp('tf_feeToAdd').setValue("");
	   }
	},
	
	// 服务费需增加改变时
	onFeeToAddTextChange: function() {
		//安装期望价达到安装SPL
		var toSPL = Ext.getCmp("tf_research").getValue();
	    //服务费需增加
		var feeToAdd = Ext.getCmp('tf_feeToAdd').getValue();
		//工程SPL价
		var pSPL = Ext.getCmp('tf_pSPL').getValue();
		//工程期望价
		var pPrice = Ext.getCmp('tf_pprice').getValue();
		//设备期望价
		var dPrice = Ext.getCmp('tf_dprice').getValue();
		
		if (isNaN(feeToAdd) || feeToAdd == "" || feeToAdd == null || feeToAdd == undefined) {
			   Ext.Msg.alert("提示", "服务费需增加只能填写数字！");
			   Ext.getCmp("tf_research").setValue("");
			   Ext.getCmp('tf_feeToAdd').setValue("");
			   return ;
		  }
		
	    if(feeToAdd != null && feeToAdd !="") {
	    	Ext.getCmp('tf_feeToAdd').setValue(parseFloat(feeToAdd).toFixed(2));
	    	Ext.getCmp("tf_research").setValue(parseFloat(((Number(feeToAdd)/100*Number(dPrice) + Number(pPrice))/Number(pSPL))*100).toFixed(2));
	    } 
	},
	
	// 建议营业设备期望价
	onAdpriceTextChange: function() {
	    var dspl = Ext.getCmp('tf_dSPL').getValue();
	    var adprice = Ext.getCmp('tf_adprice');
	    var arate_field = Ext.getCmp('tf_arate');
	    if(adprice.getValue() == null || adprice.getValue() == "") {
	    	adprice.setValue("");
	        arate_field.setValue("");
	        return;
	    }
	    if(!isNaN(adprice.getValue()) && adprice.getValue() != ""){
	        adprice.setValue(parseFloat(adprice.getValue()).toFixed(2));
	    } else {
	        Ext.Msg.alert("提示", "请将 建议营业设备期望价 改为数字");
	        adprice.setValue("");
	        arate_field.setValue("");
	        return;
	    }
	    var arate = parseFloat(adprice.getValue())/parseFloat(dspl) - 1;
	    arate_field.setValue((parseFloat(arate)*100).toFixed(2));
	    
	},
	
	// 建议设备价浮率改变时
	onArateTextChange: function() {
	     var dspl = Ext.getCmp('tf_dSPL').getValue();
	     var arate = Ext.getCmp('tf_arate');
	     var adprice_field = Ext.getCmp('tf_adprice');
	     if(arate.getValue() == null || arate.getValue() == "") {
	         arate.setValue('');
	         adprice_field.setValue('');
	         return;
	     }
	     var temp = null;
	     if(!isNaN(arate.getValue()) && arate.getValue() != "") {
	         temp = (parseFloat(arate.getValue())/100).toFixed(4);
	         arate.setValue(parseFloat(temp*100).toFixed(2));
	     } else {
	         Ext.Msg.alert("提示", "请将 建议设备价浮率 改为数字");
	         arate.setValue("");
	         adprice_field.setValue("");
	         return;
	     }
	     
	    var adprice = parseFloat(dspl)*(1+parseFloat(temp));
	    adprice_field.setValue(adprice.toFixed(2));
	},
	
	// 建议运输价
	onAtpriceTextChange: function() {
		var tf_atprice = Ext.getCmp("tf_atprice");
		if(isNaN(tf_atprice.getValue()) || tf_atprice.getValue() == "") {
			tf_atprice.setValue("");
		}
	},
	
	// 建议运输浮率
	onAtrateTextChange: function() {
		var tf_atrate = Ext.getCmp("tf_atrate");
		if(isNaN(tf_atrate.getValue()) || tf_atrate.getValue() == "") {
			tf_atrate.setValue("");
		}
	}
	
});
