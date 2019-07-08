Ext.define('HelcPDA.controller.oa.startTheProcess.BusinessService.MaintainTransformCtrl',{
	extend:'HelcPDA.controller.ApplicationController_OA',
	config:{
		control:{
		}
	},
	
	setvaluedate : function() {
        var myDate = new Date();
        var datestr=myDate.toLocaleDateString();
        var timestr=myDate.toTimeString();
        datestr=datestr.replace("年","-");
        datestr=datestr.replace("月","-");
        datestr=datestr.replace("日","");
        timestr=timestr.replace(" UTC+0800","");
        datestr=datestr+" "+timestr;
	    var node = Ext.getCmp('node').getValue();
	    if (node=="业务科市场分析员审核确认") {
	    	Ext.getCmp('qwdate').setValue(datestr);
	    }
	    if (node=="技术科科长审核处理" || node=="技术科工程师进行处理") {
	    	Ext.getCmp('qwdate2').setValue(datestr);
	    }
	    if (node=="业务科市场分析员确认") {
	    	Ext.getCmp('qwdate3').setValue(datestr);
	    }
	    if (node=="分公司工程部长或以上审核确认") {
	    	Ext.getCmp('qwdategcbz').setValue(datestr);
	    }
	    if (node=="分公司确认完工") {
	    	Ext.getCmp('qwdatebgr').setValue(datestr);
	    }
	}
	
	
});