
/* JavaScript content from app/controller/ChartCtr.js in folder common */
/**
 * 视图报表的控制器
 */
Ext.define("Helcss.controller.ChartCtr", {
	extend : "Helcss.controller.ApplicationController",
	requires: ['Ext.Menu'], 
	config : {
		   refs : {
			   
		   chart_back : 'button[id=btn_chart_back]',
		   
		   btn_sr_prevmonth_a : 'button[id=btn_sr_prevmonth]',
		   
		   btn_sr_nextmonth_a : 'button[id=btn_sr_nextmonth]',
		   
		   btn_sr_prevyear_a : 'button[id=btn_sr_prevyear]',
		   
		   btn_sr_nextyear_a : 'button[id=btn_sr_nextyear]',
		   
		   btn_rpt_1_a : 'button[id=btn_rpt_1]',
		   
		   btn_rpt_2_a : 'button[id=btn_rpt_2]',
		   
		   btn_rpt_3_a : 'button[id=btn_rpt_3]',
		   
		   srchart_back : 'button[id=btn_srchart_back]',
		   
		   chart_refresh : 'button[id=btn_chart_refresh]',
		   
		   fault_charts : '#fault_chart'
			   
		},
		control : { 
			
			chart_back:{
				tap : 'chart_back'
			},
			
			srchart_back:{
				tap : 'srchart_back'
			},
			
			btn_sr_prevmonth_a:{
				tap : 'btn_sr_prevmonth_a'
			},
			
			btn_sr_nextmonth_a:{
				tap : 'btn_sr_nextmonth_a'
			},
			
			btn_sr_prevyear_a:{
				tap : 'btn_sr_prevyear_a'
			},
			
			btn_sr_nextyear_a:{
				tap : 'btn_sr_nextyear_a'
			},
			
			'button[id=btn_bu_prevmonth]':{
				tap : 'btn_bu_prevmonth_a'
			},
			
			'button[id=btn_bu_nextmonth]':{
				tap : 'btn_bu_nextmonth_a'
			},
			
			'button[id=btn_bu_prevyear]':{
				tap : 'btn_bu_prevyear_a'
			},
			
			'button[id=btn_bu_nextyear]':{
				tap : 'btn_bu_nextyear_a'
			},
			
			'button[id=btn_rl_prevmonth]':{
				tap : 'btn_rl_prevmonth_a'
			},
			
			'button[id=btn_rl_nextmonth]':{
				tap : 'btn_rl_nextmonth_a'
			},
			
			'button[id=btn_rl_prevyear]':{
				tap : 'btn_rl_prevyear_a'
			},
			
			'button[id=btn_rl_nextyear]':{
				tap : 'btn_rl_nextyear_a'
			},
			
			btn_rpt_1_a:{
				tap : 'switch_report1'
			},
			
			btn_rpt_2_a:{
				tap : 'switch_report2'
			},
			
			btn_rpt_3_a:{
				tap : 'switch_report3'
			},
			
			'button[id=btn_m_1]':{
				tap : 'btn_m_1_a'
			},
			
			'button[id=btn_y_1]':{
				tap : 'btn_y_1_a'
			},
			
			'button[id=btn_m_2]':{
				tap : 'btn_m_2_a'
			},
			
			'button[id=btn_y_2]':{
				tap : 'btn_y_2_a'
			},
			
			'button[id=btn_m_3]':{
				tap : 'btn_m_3_a'
			},
			
			'button[id=btn_y_3]':{
				tap : 'btn_y_3_a'
			},
			
			'button[id=c_SRYM]':{
				tap : 'c_SRYM_a'
			},
			
			'button[id=c_BUYM]':{
				tap : 'c_BUYM_a'
			},
			
			'button[id=c_RLYM]':{
				tap : 'c_RLYM_a'
			},
			
			'button[id=c_SRY]':{
				tap : 'c_SRY_a'
			},
			
			'button[id=c_BUY]':{
				tap : 'c_BUY_a'
			},
			
			'button[id=c_RLY]':{
				tap : 'c_RLY_a'
			},
			
			chart_refresh:{
				tap : 'chart_refresh'
			},

			'#fault_list' : {
				itemtap : 'fault_list'
			},
			
			'#fault_detail_list' : {
				itemtap : 'fault_detail_list'
			},
			
			'#boxup_list' : {
				itemtap : 'boxup_list'
			},
			
			'#boxup_detail_list' : {
				itemtap : 'boxup_detail_list'
			},
			
			'#ranklistbyyear_domain_list':{
				itemtap : 'ranklistbyyear_domain_list_deselect'
			},
			'#ranklistbyyear_domain_list_head':{
				itemtap : 'ranklistbyyear_domain_list_head_deselect'
			},
			'#ranklistbyyear_elevator_list':{
				itemtap : 'ranklistbyyear_elevator_list_deselect'
			},
			'#ranklistbyyear_elevator_list_head':{
				itemtap : 'ranklistbyyear_elevator_list_head_deselect'
			},
			
			'#ranklistbymonth_domain_list':{
				itemtap : 'ranklistbymonth_domain_list_deselect'
			},
			'#ranklistbymonth_domain_list_head':{
				itemtap : 'ranklistbymonth_domain_list_head_deselect'
			},
			'#ranklistbymonth_elevator_list':{
				itemtap : 'ranklistbymonth_elevator_list_deselect'
			},
			'#ranklistbymonth_elevator_list_head':{
				itemtap : 'ranklistbymonth_elevator_list_head_deselect'
			},
			
			'#tp_chart' : {
				activeitemchange : 'tp_chart'
			},
			
			'#charttest' : {
				itemtap : 'chart_a'
			},
			
			'#srfaultbyyear_detail_list' : {
				itemtap : 'srfaultbyyear_detail_list_a'
			},
			
			'#boxupbyyear_detail_list' : {
				itemtap : 'boxupbyyear_detail_list_a'
			}
		}
	},
	
	fault_list : function() {
		var list = Ext.getCmp('fault_list');
		this.deselectListItem(list);
	},
	
	fault_detail_list : function() {
		var list = Ext.getCmp('fault_detail_list');
		this.deselectListItem(list);
	},
	
	boxup_list : function() {
		var list = Ext.getCmp('boxup_list');
		this.deselectListItem(list);
	},
	
	boxup_detail_list : function() {
		var list = Ext.getCmp('boxup_detail_list');
		this.deselectListItem(list);
	},
	
	ranklistbyyear_domain_list_deselect : function(){
		var list = Ext.getCmp('ranklistbyyear_domain_list');
		this.deselectListItem(list);
	},
	
	ranklistbyyear_domain_list_head_deselect : function(){
		var list = Ext.getCmp('ranklistbyyear_domain_list_head');
		this.deselectListItem(list);
	},
	
	ranklistbyyear_elevator_list_deselect : function(){
		var list = Ext.getCmp('ranklistbyyear_elevator_list');
		this.deselectListItem(list);
	},
	
	ranklistbyyear_elevator_list_head_deselect : function(){
		var list = Ext.getCmp('ranklistbyyear_elevator_list_head');
		this.deselectListItem(list);
	},
	
	ranklistbymonth_domain_list_deselect : function(){
		var list = Ext.getCmp('ranklistbymonth_domain_list');
		this.deselectListItem(list);
	},
	
	ranklistbymonth_domain_list_head_deselect : function(){
		var list = Ext.getCmp('ranklistbymonth_domain_list_head');
		this.deselectListItem(list);
	},
	
	ranklistbymonth_elevator_list_deselect : function(){
		var list = Ext.getCmp('ranklistbymonth_elevator_list');
		this.deselectListItem(list);
	},
	
	ranklistbymonth_elevator_list_head_deselect : function(){
		var list = Ext.getCmp('ranklistbymonth_elevator_list_head');
		this.deselectListItem(list);
	},
	
	tp_chart : function(obj, value, oldValue, eOpts) {
		/*
		var sto_boxup_c = Ext.data.StoreManager.get("BoxUpChartStore");
		alert("length: " + sto_boxup_c.getCount());
		if (value.id == 'boxup_view' && sto_boxup_c.getCount()==0) {
			var obj = Ext.getCmp("chartview");
			// 获取数据 - 困人		
			this.connectServer(obj.handleBoxUpResult, "faultReportAction.do?method=toSearchBoxUp", "{'username':'水果','password':'a12345'}");			
		}
		*/
	},
	
	btn_sr_prevmonth_a : function() {
		cdate = new Date(SRYM);
		cdate.setMonth(cdate.getMonth()-1);
		SRYM = cdate.getFullYear()+"-";
		if(cdate.getMonth()+1<10){
			SRYM += "0";
		}
		SRYM += (cdate.getMonth()+1);
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleSRFaultResultByMonth, "faultReportAction.do?method=toSearchFaultByMonth", "{'SRYM':'" + SRYM + "'}");
	},
	
	btn_sr_nextmonth_a : function() {
		cdate = new Date(SRYM);
		cdate.setMonth(cdate.getMonth()+1);
		SRYM = cdate.getFullYear()+"-";
		if(cdate.getMonth()+1<10){
			SRYM += "0";
		}
		SRYM += (cdate.getMonth()+1);
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleSRFaultResultByMonth, "faultReportAction.do?method=toSearchFaultByMonth", "{'SRYM':'" + SRYM + "'}");
	},
	
	btn_sr_prevyear_a : function() {
		SRY = SRY-1;
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleSRFaultResultByYear, "faultReportAction.do?method=toSearchFaultByYear", "{'SRY':'" + SRY + "'}");
	},
	
	btn_sr_nextyear_a : function() {
		SRY = SRY+1;
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleSRFaultResultByYear, "faultReportAction.do?method=toSearchFaultByYear", "{'SRY':'" + SRY + "'}");
	},
	
	btn_bu_prevmonth_a : function() {
		cdate = new Date(BUYM);
		cdate.setMonth(cdate.getMonth()-1);
		BUYM = cdate.getFullYear()+"-";
		if(cdate.getMonth()+1<10){
			BUYM += "0";
		}
		BUYM += (cdate.getMonth()+1);
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleBoxUpResultByMonth, "faultReportAction.do?method=toSearchBoxUpByMonth", "{'BUYM':'" + BUYM + "'}");
	},
	
	btn_bu_nextmonth_a : function() {
		cdate = new Date(BUYM);
		cdate.setMonth(cdate.getMonth()+1);
		BUYM = cdate.getFullYear()+"-";
		if(cdate.getMonth()+1<10){
			BUYM += "0";
		}
		BUYM += (cdate.getMonth()+1);
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleBoxUpResultByMonth, "faultReportAction.do?method=toSearchBoxUpByMonth", "{'BUYM':'" + BUYM + "'}");
	},
	
	btn_bu_prevyear_a : function() {
		BUY = BUY-1;
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleBoxUpResultByYear, "faultReportAction.do?method=toSearchBoxUpByYear", "{'BUY':'" + BUY + "'}");
	},
	
	btn_bu_nextyear_a : function() {
		BUY = BUY+1;
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleBoxUpResultByYear, "faultReportAction.do?method=toSearchBoxUpByYear", "{'BUY':'" + BUY + "'}");
	},
	
	btn_rl_prevmonth_a : function() {
		cdate = new Date(RLYM);
		cdate.setMonth(cdate.getMonth()-1);
		RLYM = cdate.getFullYear()+"-";
		if(cdate.getMonth()+1<10){
			RLYM += "0";
		}
		RLYM += (cdate.getMonth()+1);
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleRankListResultByMonth, "faultReportAction.do?method=toSearchRankListByMonth", "{'RLYM':'" + RLYM + "'}");
	},
	
	btn_rl_nextmonth_a : function() {
		cdate = new Date(RLYM);
		cdate.setMonth(cdate.getMonth()+1);
		RLYM = cdate.getFullYear()+"-";
		if(cdate.getMonth()+1<10){
			RLYM += "0";
		}
		RLYM += (cdate.getMonth()+1);
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleRankListResultByMonth, "faultReportAction.do?method=toSearchRankListByMonth", "{'RLYM':'" + RLYM + "'}");
	},
	
	btn_rl_prevyear_a : function() {
		RLY = RLY-1;
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleRankListResultByYear, "faultReportAction.do?method=toSearchRankListByYear", "{'RLY':'" + RLY + "'}");
	},
	
	btn_rl_nextyear_a : function() {
		RLY = RLY+1;
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleRankListResultByYear, "faultReportAction.do?method=toSearchRankListByYear", "{'RLY':'" + RLY + "'}");
	},
	
	btn_m_1_a : function() {
		var tmp_obj = Ext.getCmp('srfaultbymonth_view');
		if(!tmp_obj){
			tmp_obj = Ext.create('Helcss.view.chart.fault.SRFaultViewByMonth');
		}
		Ext.getCmp('tp_srchart').removeAll( false,false);
		Ext.getCmp('tp_srchart').setActiveItem( tmp_obj );
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleSRFaultResultByMonth, "faultReportAction.do?method=toSearchFaultByMonth", "{'SRYM':'" + SRYM + "'}");
		this.switch_btn(1,'m');
	},
	
	btn_y_1_a : function() {
		var tmp_obj = Ext.getCmp('srfaultbyyear_view');
		if(!tmp_obj){
			tmp_obj = Ext.create('Helcss.view.chart.fault.SRFaultViewByYear');
		}
		Ext.getCmp('tp_srchart').removeAll( false,false);
		Ext.getCmp('tp_srchart').setActiveItem( tmp_obj );
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleSRFaultResultByYear, "faultReportAction.do?method=toSearchFaultByYear", "{'SRY':'" + SRY + "'}");
		this.switch_btn(1,'y');
	},
	
	btn_m_2_a : function() {
		var tmp_obj = Ext.getCmp('boxupbymonth_view');
		if(!tmp_obj){
			tmp_obj = Ext.create('Helcss.view.chart.boxup.BoxUpViewByMonth');
		}
		Ext.getCmp('tp_srchart').removeAll( false,false);
		Ext.getCmp('tp_srchart').setActiveItem( tmp_obj );
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleBoxUpResultByMonth, "faultReportAction.do?method=toSearchBoxUpByMonth", "{'BUYM':'" + BUYM + "'}");
		this.switch_btn(2, 'm');
	},
	
	btn_y_2_a : function() {
		var tmp_obj = Ext.getCmp('boxupbyyear_view');
		if(!tmp_obj){
			tmp_obj = Ext.create('Helcss.view.chart.boxup.BoxUpViewByYear');
		}
		Ext.getCmp('tp_srchart').removeAll( false,false);
		Ext.getCmp('tp_srchart').setActiveItem( tmp_obj );
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleBoxUpResultByYear, "faultReportAction.do?method=toSearchBoxUpByYear", "{'BUY':'" + BUY + "'}");
		this.switch_btn(2, 'y');
	},
	
	btn_m_3_a : function() {
		var tmp_obj = Ext.getCmp('ranklistbymonth_view');
		if(!tmp_obj){
			tmp_obj = Ext.create('Helcss.view.chart.ranklist.RankListViewByMonth');
		}
		Ext.getCmp('tp_srchart').removeAll( false,false);
		Ext.getCmp('tp_srchart').setActiveItem( tmp_obj );
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleRankListResultByMonth, "faultReportAction.do?method=toSearchRankListByMonth", "{'RLYM':'" + RLYM + "'}");
		this.switch_btn(3, 'm');
	},
	
	btn_y_3_a : function() {
		var tmp_obj = Ext.getCmp('ranklistbyyear_view');
		if(!tmp_obj){
			tmp_obj = Ext.create('Helcss.view.chart.ranklist.RankListViewByYear');
		}
		Ext.getCmp('tp_srchart').removeAll( false,false);
		Ext.getCmp('tp_srchart').setActiveItem( tmp_obj );
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleRankListResultByYear, "faultReportAction.do?method=toSearchRankListByYear", "{'RLY':'" + RLY + "'}");
		this.switch_btn(3, 'y');
	},
	
	c_SRYM_a : function(){
		SRYM = Ext.getCmp("o_SRY").getValue()+'-'+Ext.getCmp("o_SRM").getValue();
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleSRFaultResultByMonth, "faultReportAction.do?method=toSearchFaultByMonth", "{'SRYM':'" + SRYM + "'}");
		obj = Ext.getCmp("ovl_SRYM");
		obj.hide();
		obj.destroy();
	},
	
	c_BUYM_a : function(){
		BUYM = Ext.getCmp("o_BUY").getValue()+'-'+Ext.getCmp("o_BUM").getValue();
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleBoxUpResultByMonth, "faultReportAction.do?method=toSearchBoxUpByMonth", "{'BUYM':'" + BUYM + "'}");
		obj = Ext.getCmp("ovl_BUYM");
		obj.hide();
		obj.destroy();
	},
	
	c_RLYM_a : function(){
		RLYM = Ext.getCmp("o_RLY").getValue()+'-'+Ext.getCmp("o_RLM").getValue();
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleRankListResultByMonth, "faultReportAction.do?method=toSearchRankListByMonth", "{'RLYM':'" + RLYM + "'}");
		obj = Ext.getCmp("ovl_RLYM");
		obj.hide();
		obj.destroy();
	},
	
	c_SRY_a : function(){
		SRY = Ext.getCmp("o_SRY").getValue();
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleSRFaultResultByYear, "faultReportAction.do?method=toSearchFaultByYear", "{'SRY':'" + SRY + "'}");
		obj = Ext.getCmp("ovl_SRY");
		obj.hide();
		obj.destroy();
	},
	
	c_BUY_a : function(){
		BUY = Ext.getCmp("o_BUY").getValue();
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleBoxUpResultByYear, "faultReportAction.do?method=toSearchBoxUpByYear", "{'BUY':'" + BUY + "'}");
		obj = Ext.getCmp("ovl_BUY");
		obj.hide();
		obj.destroy();
	},
	
	c_RLY_a : function(){
		RLY = Ext.getCmp("o_RLY").getValue();
		var obj = Ext.getCmp("srchartview");
		this.connectServer(obj.handleRankListResultByYear, "faultReportAction.do?method=toSearchRankListByYear", "{'RLY':'" + RLY + "'}");
		obj = Ext.getCmp("ovl_RLY");
		obj.hide();
		obj.destroy();
	},
	
	chart_back : function() {
		this.showBackView('mainmenu', 'Helcss.view.MainMenu');
		/*Ext.getCmp('boxup_view').destroy();
		Ext.getCmp('fault_view').destroy();
		Ext.getCmp('chartview').destroy();*/
	},
	
	srchart_back : function() {
		this.showBackView('mainmenu', 'Helcss.view.MainMenu');
		/*Ext.getCmp('boxup_view').destroy();
		Ext.getCmp('fault_view').destroy();
		Ext.getCmp('chartview').destroy();*/
	},
	
	chart_refresh : function() {
		var ax = Ext.getCmp('tp_chart');
		var bb = document.getElementById("bb");
		
		var ax = Ext.getCmp('fault_chart');
		//var atItem = ax.getHighlightItem();
		var atItem = ax.getSeries()[0];
		var point = ax.getItemForPoint('33', '3');
		//alert("value: " + point.record.get('value')+"  name:"+point.record.get('name'));
		ax.setHighlightItem(point);
		
		
		var obj = Ext.getCmp("chartview");
		var tp_chart = Ext.getCmp("tp_chart");
		var itemId = tp_chart.getActiveItem().getId();
		if (itemId == 'fault_view') {
			this.connectServer(obj.handleFaultResult, "faultReportAction.do?method=toSearchFault", "{'username':'水果','password':'a12345'}");
		} else if (itemId == 'boxup_view') {
			this.connectServer(obj.handleBoxUpResult, "faultReportAction.do?method=toSearchBoxUp", "{'username':'水果','password':'a12345'}");
		}
	},
	
	handleResult : function (result) {
		//alert("chart handle...: " + result.items[0].name);
		var store = Ext.data.StoreManager.get("ChartStore"); 
		if (!store) {
		  store = Ext.create("Helcss.store.ChartStore"); 
		}
		store.setData(result.items,this);
	},
	
	switch_report : function (n){
	    var	btn;
	    
	    if( current_report == n ) {
	        // 如果点击当前报表，则开/关条件Bar
	        if( Ext.getCmp('TimeBar').getHidden() ) {
	            Ext.getCmp('TimeBar').show();
	        } else {
	            Ext.getCmp('TimeBar').hide();
	        }    
	    } else {
	        // 转到另一报表，并关闭条件Bar
	        Ext.getCmp('TimeBar').show();
	        current_report = n;
	        btn_m_tmp = Ext.getCmp('btn_m_'+n);
	        btn_m_tmp.setStyle('background:#ffffff;');
	        btn_m_tmp.setText('<font color=#e5c89d>'+all_rep_btn_txt[n-1][0]+'</font>')
	        btn_y_tmp = Ext.getCmp('btn_y_'+n);
	        btn_y_tmp.setStyle('background:#ffffff;');
	        btn_y_tmp.setText('<font color=#e5c89d>'+all_rep_btn_txt[n-1][1]+'</font>')
//	        show_report(1);
	    }
	    
	    for(var i=1; i<=3; i++) {
	        btn = Ext.getCmp('btn_rpt_'+i);
	        btn_m = Ext.getCmp('btn_m_'+i);
	        btn_y = Ext.getCmp('btn_y_'+i);
	        sp_m = Ext.getCmp('sp_m_'+i);
	        sp_y = Ext.getCmp('sp_y_'+i);
	        if(i==current_report) {	// 当前报表按钮
	            btn.setStyle('background:#e5c89d;');
	            btn.setText('<font color=white>'+txt[i-1]+'</font>');
//	            btn.setIconCls(icn[i-1]+' whitecolor');
	            btn_m.show();
	            btn_y.show();
	            sp_m.show();
	            sp_y.show();
	        } else {				// 未选中报表按钮
	            btn.setStyle('background:white;');
	            btn.setText(txt[i-1]);            
//	            btn.setIconCls(icn[i-1]);
	            btn_m.hide();
	            btn_y.hide();
	            sp_m.hide();
	            sp_y.hide();
	        }
	    }
	},
	
	switch_btn:function (n,btn){
		var btn_m_tmp = Ext.getCmp('btn_m_'+n);
		var btn_y_tmp = Ext.getCmp('btn_y_'+n);
		if(btn=='m'){
			btn_m_tmp.setStyle('background:#e5c89d;');
			btn_m_tmp.setText('<font color=white>'+all_rep_btn_txt[n-1][0]+'</font>');
			btn_y_tmp.setStyle('background:#ffffff;');
			btn_y_tmp.setText('<font color=#e5c89d>'+all_rep_btn_txt[n-1][1]+'</font>');
		}else if(btn=='y'){
			btn_m_tmp.setStyle('background:#ffffff;');
			btn_m_tmp.setText('<font color=#e5c89d>'+all_rep_btn_txt[n-1][0]+'</font>');
			btn_y_tmp.setStyle('background:#e5c89d;');
			btn_y_tmp.setText('<font color=white>'+all_rep_btn_txt[n-1][1]+'</font>');
		}
	},
	
	switch_report1 : function (){
		this.switch_report(1);
	},
	
	switch_report2 : function (){
		this.switch_report(2);
	},
	
	switch_report3 : function (){
		this.switch_report(3);
	},
	
	chart_a : function(series,item, e){
		alert('aaaaa');
	},
	
	srfaultbyyear_detail_list_a : function(record, index){
		var tmp_obj = Ext.getCmp('srfaultbymonth_view');
		if(!tmp_obj){
			tmp_obj = Ext.create('Helcss.view.chart.fault.SRFaultViewByMonth');
		}
		Ext.getCmp('tp_srchart').removeAll( false,false);
		Ext.getCmp('tp_srchart').setActiveItem( tmp_obj );
		var obj = Ext.getCmp("srchartview");
		index+=1;
		SRYM = SRY+'-'+(index<10?'0'+index:index);
		WL.Logger.debug(SRYM);
		this.connectServer(obj.handleSRFaultResultByMonth, "faultReportAction.do?method=toSearchFaultByMonth", "{'SRYM':'" + SRYM + "'}");
	},
	
	boxupbyyear_detail_list_a : function(record, index){
		var tmp_obj = Ext.getCmp('boxupbymonth_view');
		if(!tmp_obj){
			tmp_obj = Ext.create('Helcss.view.chart.boxup.BoxUpViewByMonth');
		}
		Ext.getCmp('tp_srchart').removeAll( false,false);
		Ext.getCmp('tp_srchart').setActiveItem( tmp_obj );
		var obj = Ext.getCmp("srchartview");
		index+=1;
		BUYM = BUY+'-'+(index<10?'0'+index:index);
		this.connectServer(obj.handleBoxUpResultByMonth, "faultReportAction.do?method=toSearchBoxUpByMonth", "{'BUYM':'" + BUYM + "'}");
	},
});