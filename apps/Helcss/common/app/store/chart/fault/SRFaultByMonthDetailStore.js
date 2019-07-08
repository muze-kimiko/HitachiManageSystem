Ext.define("Helcss.store.chart.fault.SRFaultByMonthDetailStore", {
	extend : 'Ext.data.Store',
	requires : ["Helcss.model.chart.fault.SRFaultByMonthDetailModel"],
    config : {
    	model : 'Helcss.model.chart.fault.SRFaultByMonthDetailModel'
    	/*
		data : [{DB_LAST_UPD_SRC : '2013-12-12 14:12:05', SR_FAULT_DOMAIN : '广州，地盘1', SR_ABSTRACT : '门坏了....不开门....', ARRIVE_TIME : '12:10:02', REPAIR_COMPLETE_TIME : '14:51:10'},
		        {DB_LAST_UPD_SRC : '2013-12-12 14:12:05', SR_FAULT_DOMAIN : '广州，地盘2', SR_ABSTRACT : '门坏了....不开门....', ARRIVE_TIME : '12:10:02', REPAIR_COMPLETE_TIME : '14:51:10'},
		        {DB_LAST_UPD_SRC : '2013-12-12 14:12:05', SR_FAULT_DOMAIN : '广州，地盘3', SR_ABSTRACT : '门坏了....不开门....', ARRIVE_TIME : '12:10:02', REPAIR_COMPLETE_TIME : '14:51:10'},
		        {DB_LAST_UPD_SRC : '2013-12-12 14:12:05', SR_FAULT_DOMAIN : '广州，地盘4', SR_ABSTRACT : '门坏了....不开门....', ARRIVE_TIME : '12:10:02', REPAIR_COMPLETE_TIME : '14:51:10'},
		        {DB_LAST_UPD_SRC : '2013-12-12 14:12:05', SR_FAULT_DOMAIN : '广州，地盘5', SR_ABSTRACT : '门坏了....不开门....', ARRIVE_TIME : '12:10:02', REPAIR_COMPLETE_TIME : '14:51:10'},
		        {DB_LAST_UPD_SRC : '2013-12-12 14:12:05', SR_FAULT_DOMAIN : '广州，地盘6', SR_ABSTRACT : '门坏了....不开门....', ARRIVE_TIME : '12:10:02', REPAIR_COMPLETE_TIME : '14:51:10'}]
		        */
    }
});