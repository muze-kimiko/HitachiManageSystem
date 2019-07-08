
/* JavaScript content from app/model/BPMProcess/BPMProcessModel.js in folder common */
Ext.define('HelcOA.model.BPMProcess.BPMProcessModel',{
	extend:'Ext.data.Model',
	config:{
		fields:['activity_name','arr_time','billno','df_man','eflag',
		        'flag','hd_man','piid','pro_lev','proc_name',
		        'proc_name_dist','stay_time','subject','vt']
	}
});