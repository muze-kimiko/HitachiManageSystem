
/* JavaScript content from app/model/install/sendingbutnoentry/Sending_No_Entry_JobNo_Model.js in folder common */
Ext.define(
		'HelcPDA.model.install.sendingbutnoentry.Sending_No_Entry_JobNo_Model',
		{
			extend : 'Ext.data.Model',
			config : {
				fields : [ 'ENGCONTRACT_NUMBER', 'SEQ_NUM', 'ELEVATOR_STATUS',
						'ELEVATOR_NO','UNENTRANCE_REASON']
			}
		});