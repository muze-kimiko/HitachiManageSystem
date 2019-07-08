Ext.define("HelcOA.store.WeekMeet.WeekMeetStore",{
	extend:'Ext.data.Store',
	requires:["HelcOA.model.WeekMeet.WeekMeetModel"],
	config:{
		model:'HelcOA.model.WeekMeet.WeekMeetModel',
	}
});