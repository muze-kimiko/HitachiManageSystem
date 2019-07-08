
/* JavaScript content from app/controller/appworkspace/BatchApply/BatchApplyCtrl.js in folder common */
Ext.define('HelcPAD.controller.appworkspace.BatchApply.BatchApplyCtrl', {
	extend:'HelcPAD.controller.ApplicationController',
	config:{
		control:{
			
		    //待审批单据 页面 返回  被共用了
		    'button#batchList_id_FH':{
		    	tap:'batchList_id_FH'
		    },
		    
		    'button#batchApply_id_FH':{
		    	tap:'batchList_id_FH'
		    },
		    
		    'button#batchApplyDetail_id_FH':{
		    	tap:'batchList_id_FH'
		    },
		    
			
			//申请分批单页面 list
			'list#batchApply_list':{
				itemtap:'batchApply_list'
			},
			
		}
	},
	
	batchList_id_FH:function(){
		this.BackView();
	},
	
	batchApply_list:function(dataview, index, target, record, e, eOpts){
		if(record.data.ELEVATOR_NO=='此条分批单不存在分批单行'){
			return;
		};
		
		this.NextView('batchApplyDetail','HelcPAD.view.appworkspace.BatchApply.BatchApplyDetail');
		//cc.log(record.data);
		Ext.getCmp('SUBMIT_NUM').setValue(record.data.SUBMIT_NUM);
		Ext.getCmp('LOT_NUM').setValue(record.data.LOT_NUM);
		Ext.getCmp('REASON').setValue(record.data.REASON);
		Ext.getCmp('NEED_DELIVER_DATE').setValue(record.data.NEED_DELIVER_DATE);
		Ext.getCmp('SPLIT_BOXHEADER').setValue(record.data.SPLIT_BOXHEADER);
		Ext.getCmp('SPLIT_PART').setValue(record.data.SPLIT_PART);
		Ext.getCmp('DELIVERY_DATE').setValue(record.data.DELIVERY_DATE);
		Ext.getCmp('DELIVERY_DESC').setValue(record.data.DELIVERY_DESC);
		Ext.getCmp('BUSINESS_COMMENTS').setValue(record.data.BUSINESS_COMMENTS);
		Ext.getCmp('ENABLE_FLAG').setValue(record.data.ENABLE_FLAG);
		Ext.getCmp('STATUS_MEAN').setValue(record.data.STATUS_MEAN);
		Ext.getCmp('REJECT_MEAN').setValue(record.data.REJECT_MEAN);
		Ext.getCmp('DESIGNTYPE').setValue(record.data.DESIGNTYPE);
		Ext.getCmp('PRODUCETYPE').setValue(record.data.PRODUCETYPE);
	},
	
	
});


	