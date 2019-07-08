Ext.define('HelcPAD.controller.common.HangCtrl', {
	extend:'HelcPAD.controller.ApplicationController',

	config: {
        control: {
        	//返回
			'button#hang_id_FH':{
				tap:'hang_id_FH'
			},
			
        }
	},
		
	
	//返回
	hang_id_FH:function(){
		this.BackView();
	},
		
});