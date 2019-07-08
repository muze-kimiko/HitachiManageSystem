
/* JavaScript content from app/store/chart/fault/SRFaultByMonthChartStore.js in folder common */
Ext.define("Helcss.store.chart.fault.SRFaultByMonthChartStore", {
	extend : 'Ext.data.Store',
	requires : ["Helcss.model.chart.fault.SRFaultByMonthChartModel"],
    config : {
    	model : 'Helcss.model.chart.fault.SRFaultByMonthChartModel'
    		/*
		data: [
		        { name: 'Jan', value: 5, value2: 412 },
		        { name: 'Feb', value: 23, value2: 142 },
		        { name: 'Mar', value: 83, value2: 113 },
		        { name: 'Apr', value: 233, value2: 634 },
		        { name: 'May', value: 509, value2: 240 },
		        { name: 'Jun', value: 664, value2: 102 },
		        { name: 'Jul', value: 144, value2: 425 },
		        { name: 'Aug', value: 179, value2: 324 },
		        { name: 'Sep', value: 546, value2: 39 },
		        { name: 'Oct', value: 591, value2: 142 },
		        { name: 'Nov', value: 288, value2: 523 },
		        { name: 'Dec', value: 109, value2: 634 }
		    ]
		    */
    }
});