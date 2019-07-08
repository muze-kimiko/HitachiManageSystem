Ext.define('HelcPDA.store.waitingdata.WaitingForCommitDataStore',{
	extend:'Ext.data.Store',
	config:{
		fields:['msg_title','msg_body','msg_result','id']
	},
});