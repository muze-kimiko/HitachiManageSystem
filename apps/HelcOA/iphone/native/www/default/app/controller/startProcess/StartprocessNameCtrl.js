
/* JavaScript content from app/controller/startProcess/StartprocessNameCtrl.js in folder common */
Ext.define('HelcOA.controller.startProcess.StartprocessNameCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	id:'StartprocessNameCtrl_id',
	config:{
		control:{
			"list#StartprocessNameList":{
				itemtap:'init1'
			},
		}	
	},
	init1:function(obj, index, target, record, e, eOpts){
		//alert('ok');
				 store=Ext.data.StoreManager.get("StartProcessS");
			if(!store){
				store=Ext.create("HelcOA.store.startProsess.StartProcessS");
			}
			var title=store.getAt(index).get('title');
		console.log(title);
			if(title=='流程名01'){
				var obj=Ext.getCmp('MeetingRoomReservationTable_id');
				if(!obj){
					obj=Ext.create('HelcOA.view.startProcess.DailyOffice.MeetingRoomReservationTable');
				}
				Ext.Viewport.setActiveItem(obj);
		     }else if(title=='流程名02'){
		    	 var obj=Ext.getCmp('ContactBookUseOfficialCars_id');
					if(!obj){
						obj=Ext.create('HelcOA.view.startProcess.DailyOffice.ContactBookUseOfficialCars');
					}
					Ext.Viewport.setActiveItem(obj);
		     }else if(title=='流程名04'){
		    	 var obj=Ext.getCmp('CompanyIssuedOfficialCarUse_id');
					if(!obj){
						obj=Ext.create('HelcOA.view.startProcess.DailyOffice.CompanyIssuedOfficialCarUse');
					}
					Ext.Viewport.setActiveItem(obj);
		     }else if(title=='流程名05'){
		    	 var obj=Ext.getCmp('CompanyContractApproval_id');
					if(!obj){
						obj=Ext.create('HelcOA.view.startProcess.DailyOffice.CompanyContractApproval');
					}
					Ext.Viewport.setActiveItem(obj);
		     }else if(title=='流程名06'){
		    	 var obj=Ext.getCmp('CompanyRulesRegulationsApprovalProcess_id');
					if(!obj){
						obj=Ext.create('HelcOA.view.startProcess.DailyOffice.CompanyRulesRegulationsApprovalProcess');
					}
					Ext.Viewport.setActiveItem(obj);
		     }else if(title=='流程名07'){
		    	 var obj=Ext.getCmp('InternalLegalAdvisoryElectronFlowTable_id');
					if(!obj){
						obj=Ext.create('HelcOA.view.startProcess.DailyOffice.InternalLegalAdvisoryElectronFlowTable');
					}
					Ext.Viewport.setActiveItem(obj);
		     }else if(title=='流程名08'){
		    	 var obj=Ext.getCmp('RequestForTravel_id');
					if(!obj){
						obj=Ext.create('HelcOA.view.startProcess.DailyOffice.RequestForTravel');
					}
					Ext.Viewport.setActiveItem(obj);
		     }else if(title=='流程名09'){
		    	 var obj=Ext.getCmp('ChapterSealForContract_id');
					if(!obj){
						obj=Ext.create('HelcOA.view.startProcess.DailyOffice.ChapterSealForContract');
					}
					Ext.Viewport.setActiveItem(obj);
		     }else if(title=='流程名10'){
		    	 var obj=Ext.getCmp('OverseasTravelApplicationForm_id');
					if(!obj){
						obj=Ext.create('HelcOA.view.startProcess.DailyOffice.OverseasTravelApplicationForm');
					}
					Ext.Viewport.setActiveItem(obj);
		     }else if(title=='流程名11'){
		    	 var obj=Ext.getCmp('WorkContactBook_id');
					if(!obj){
						obj=Ext.create('HelcOA.view.startProcess.DailyOffice.WorkContactBook');
					}
					Ext.Viewport.setActiveItem(obj);
		     }else if(title=='流程名12'){
		    	 var obj=Ext.getCmp('InvestmentCompanyManagerApplicationForm_id');
					if(!obj){
						obj=Ext.create('HelcOA.view.startProcess.DailyOffice.InvestmentCompanyManagerApplicationForm');
					}
					Ext.Viewport.setActiveItem(obj);
		     }
	}
});