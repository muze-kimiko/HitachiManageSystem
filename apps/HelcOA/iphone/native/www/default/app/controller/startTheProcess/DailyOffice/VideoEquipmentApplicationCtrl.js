
/* JavaScript content from app/controller/startTheProcess/DailyOffice/VideoEquipmentApplicationCtrl.js in folder common */
Ext.define('HelcOA.controller.startTheProcess.DailyOffice.VideoEquipmentApplicationCtrl',{
	extend:'HelcOA.controller.ApplicationController',
	config:{
		control:{
			//返回到申请页面
			"button#back_videoE":{
				tap:'back_videoE'
			},
			//点击进入选择分公司
			"button#S_meetingrooms":{
				tap:'S_meetingrooms'
			},
			//确定选择分会场
			"button#commit_SvideoE":{
				tap:'commit_SvideoE'
			},
			//选择分会场
			"list#MeetingRoomsList":{
				itemtap:'MeetingRoomsList'
			},
		}
	},
	
	commit_SvideoE : function(){
		var sbenoCheck=document.getElementsByName('MeetingRooms_color2');
		this.showBackView('qc_VideoEquipmentApplicationForm_id','HelcOA.view.startTheProcess.DailyOffice.VideoEquipmentApplicationForm');
		var store = this.getStore('MeetingRoomsStore','HelcOA.store.startTheProcess.DailyOffice.MeetingRoomsStore');
		var hasChosen = store.data;
		var newdata = [];
		for(var i=0;i<hasChosen.length;i++){
			var item_ = {};
			item_.value = hasChosen.getAt(i).get('company');
			newdata[newdata.length] = item_;
		} 
		var meetingroomsText = "";
		for(var i=0;i<sbenoCheck.length;i++){
			if(sbenoCheck[i].className=='p_judge_box_clicked'){
				var value = store.getAt(i).get('company');
				if(meetingroomsText==""){
					meetingroomsText = value;
				}else{
					meetingroomsText = meetingroomsText+','+value;
				}
			}
		}
		Ext.getCmp('meetingrooms').setValue(meetingroomsText);
	},
	
	back_videoE : function(){
		this.BackAndDestroy('qc_VideoEquipmentApplicationForm_id','HelcOA.view.startTheProcess.DailyOffice.VideoEquipmentApplicationForm');
	},
	
	MeetingRoomsList : function(obj, index, target, record, e, eOpts){
		var sbenoCheck=document.getElementsByName('MeetingRooms_color2');
		if(sbenoCheck[index].className=='p_judge_box'){
			sbenoCheck[index].className = 'p_judge_box_clicked';
	    }else{
	    	sbenoCheck[index].className = 'p_judge_box';
	    };
	},
	
	S_meetingrooms : function(){
		var meetingroos = Ext.getCmp('meetingrooms').getValue();
		if(meetingroos == ""){
			this.NextView('qc_MeetingRooms_id','HelcOA.view.startTheProcess.DailyOffice.MeetingRooms');
			var store = this.getStore("MeetingRoomsStore","HelcOA.store.startTheProcess.DailyOffice.MeetingRoomsStore");
			store.setData([
			               {company:'东莞分公司'},
			               {company:'汕头分公司'},
			               {company:'佛山分公司'},
			               {company:'惠州分公司'},
			               {company:'珠海分公司'},
			               {company:'深圳分公司'},
			               {company:'西安分公司'},
			               {company:'甘肃分公司'},
			               {company:'新疆分公司'},
			               {company:'山东分公司'},
			               {company:'福建分公司'},
			               {company:'沈阳分公司'},
			               {company:'武汉分公司'},
			               {company:'江苏分公司'},
			               {company:'苏州分公司'},
			               {company:'南宁分公司'},
			               {company:'湖南分公司'},
			               {company:'江西分公司'},
			               {company:'河南分公司'},
			               {company:'安徽分公司'},
			               {company:'黑龙江分公司'},
			               {company:'云南分公司'},
			               {company:'贵州分公司'},
			               {company:'深圳市日历电梯销售有限公司'},
			               {company:'上海日历电梯销售有限公司'},
			               {company:'上海日历电梯工程有限公司'},
			               {company:'天津日立电梯工程技术服务有限公司'},
			               {company:'重庆日立电梯营销工程有限公司'},
			               {company:'北京日立电梯工程技术服务有限公司'},
			               {company:'北京日立电梯营销有限公司'},
			               {company:'四川日立电梯营销工程有限公司'},
			               {company:'山西分公司'},
			               {company:'四川分公司'},
			               {company:'广州分公司'},
			               {company:'深圳市日立电梯工程有限公司'},
			               {company:'日立电梯电机（广州）有限公司'},
			               {company:'青岛分公司'},
			               {company:'大石会场'},
			               {company:'中信会场'},
			               {company:'珠规会场'},
			               {company:'天津楼宇'},
			               {company:'上海工厂'},
			               {company:'潍坊分公司'},
			               {company:'成都工厂'},
			               {company:'海南司'},
			               {company:'郴州分公司'},
			               {company:'杭州营销公司'},
			               {company:'杭州工程公司'},
			               {company:'吉林工程公司'},
			               {company:'临沂分公司'},
			               {company:'柳州分公司'},
			               {company:'绵阳分公司'},
			               {company:'洛阳分公司'},
			               {company:'宁夏分公司'},
			               {company:'泉州分公司'},
			               {company:'芜湖分公司'},
			               {company:'扬州分公司'},
			               {company:'湛江分公司'},
			               ]);
		}else{
			this.showBackView('qc_MeetingRooms_id','HelcOA.view.startTheProcess.DailyOffice.MeetingRooms');
		}
	}
	
});