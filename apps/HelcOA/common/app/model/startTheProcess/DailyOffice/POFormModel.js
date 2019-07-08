Ext.define('HelcOA.model.startTheProcess.DailyOffice.POFormModel',{
	extend:'Ext.data.Model',
	config:{
		fields:[
		        'line_num','item_number','item_description','unit_meas_lookup_code',
		        'quantity','unit_price','line_amount','need_by_date']
	}
});