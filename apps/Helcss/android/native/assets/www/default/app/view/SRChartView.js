
/* JavaScript content from app/view/SRChartView.js in folder common */
Ext.define('Helcss.view.SRChartView', {
	extend: 'Ext.Panel',
	requires : [ "Helcss.controller.ApplicationController"],
    id:'srchartview',
    fullscreen : true,
    config: {
        items: [
            {
                xtype: 'toolbar',
                id:'srchartview_toolbar',
                docked: 'top',
                title: '<b>统计报表</b>',
                items: [
                    {
                        xtype: 'button',
                        text: '首页',
                        ui: 'back',
                        id : 'btn_srchart_back',
                    },
                    {
                    	xtype: 'spacer',
                    }
                ]
            }
            ,{
                xtype: 'toolbar',
                docked: 'top',
                id: 'RptTypeBar',
                style: 'background:white;',
                ui: 'light',
                items: [
                    
                    {
                    	xtype: 'spacer',
                    },
                    {
                        xtype: 'button',
                        id: 'btn_rpt_1',
                        text: '受信统计报表'
                    },
                    {
                    	xtype: 'spacer',
                    },
                    {
                        xtype: 'button',
                        id: 'btn_rpt_2',
                        text: '困人统计报表'
                    },
                    {
                    	xtype: 'spacer',
                    },
                    {
                        xtype: 'button',
                        id: 'btn_rpt_3',
                        text: '困人故障排行榜'
                    },
                    {
                    	xtype: 'spacer',
                    },
                    
                    /*
                    {
                    	xtype: 'spacer',
                    },
                    {
                        xtype: 'segmentedbutton',
                        items: [
							{
							    xtype: 'button',
							    id: 'btn_rpt_1',
							    text: '受信统计报表'
							},
							{
							    xtype: 'button',
							    id: 'btn_rpt_2',
							    text: '困人统计报表'
							},
							{
							    xtype: 'button',
							    id: 'btn_rpt_3',
							    text: '困人故障排行榜'
							},
                        ]
                    },
                    {
                    	xtype: 'spacer',
                    },
                    */
                ]
            }
            ,{
                xtype: 'panel',
                hidden: true,
                id: 'TimeBar',
                style: 'border-bottom:#ccc solid 1px;background:url(images/tbbg.jpg);',
                width: '100%',
                layout: 'hbox',
                items: [
					{
						xtype: 'spacer',
					},
                    {
                        xtype: 'button',
                        id: 'btn_m_1',
                        hidden: false,
                        style: 'border:none;margin:4px;font-size:0.9em;',
                        text: '受信月度数据'
                    },
                    {
						xtype: 'spacer',
						id:'sp_m_1',
						hidden: false,
					},
                    {
                        xtype: 'button',
                        id: 'btn_y_1',
                        hidden: false,
                        style: 'border:none;margin:4px;font-size:0.9em;',
                        text: '受信年度数据'
                    },
                    {
						xtype: 'spacer',
						id:'sp_y_1',
						hidden: false,
					},
                    {
                        xtype: 'button',
                        id: 'btn_m_2',
                        hidden: true,
                        style: 'border:none;margin:4px;font-size:0.9em;',
                        text: '困人月度数据'
                    },
                    {
						xtype: 'spacer',
						id:'sp_m_2',
						hidden: true,
					},
                    {
                        xtype: 'button',
                        id: 'btn_y_2',
                        hidden: true,
                        style: 'border:none;margin:4px;font-size:0.9em;',
                        text: '困人年度数据'
                    },
                    {
						xtype: 'spacer',
						id:'sp_y_2',
						hidden: true,
					},
                    {
                        xtype: 'button',
                        id: 'btn_m_3',
                        hidden: true,
                        style: 'border:none;margin:4px;font-size:0.9em;',
                        text: '困人故障月度排行榜'
                    },
                    {
						xtype: 'spacer',
						id:'sp_m_3',
						hidden: true,
					},
                    {
                        xtype: 'button',
                        id: 'btn_y_3',
                        hidden: true,
                        style: 'border:none;margin:4px;font-size:0.9em;',
                        text: '困人故障年度排行榜'
                    },
                    {
						xtype: 'spacer',
						id:'sp_y_3',
						hidden: true,
					},
                ]
            },
            {
            	xtype:'panel',
            	id : 'tp_srchart',
            	height:'100%',	
            	defaults : {
					flex : 1
				},
            },
            ]
     },
     
    initialize: function() {
    	if(PDsystem==1){
    		Ext.getCmp('srchartview_toolbar').setStyle('font-size:12pt');
    		
    		Ext.getCmp("tp_srchart").setScrollable(true);
    		//导航条
    		Ext.getCmp("btn_rpt_1").setWidth('30%');
    		Ext.getCmp('btn_rpt_1').setStyle('font-size:9pt');
    		Ext.getCmp("btn_rpt_2").setWidth('30%');
    		Ext.getCmp('btn_rpt_2').setStyle('font-size:9pt');
    		Ext.getCmp("btn_rpt_3").setWidth('34%');
    		Ext.getCmp('btn_rpt_3').setStyle('font-size:9pt');
    		//二级导航条
    		Ext.getCmp('TimeBar').setStyle('border-bottom:#ccc solid 1px;background:url(images/tbbg.jpg);font-size:9pt;');
    	};
    },
    
    initData : function () {
    	/*
    	var tp_chart = Ext.getCmp("tp_chart");
    	tp_chart.setActiveItem(tp_chart.getInnerItems()[0]);
    	var sto_fault_c = Ext.data.StoreManager.get("FaultChartStore");
    	if (sto_fault_c) {
    		sto_fault_c = Ext.create("Helcss.store.chart.fault.FaultDetailStore"); 
    	}
    	
		
    	var sto_boxup_c = Ext.data.StoreManager.get("BoxUpChartStore");
    	if (sto_boxup_c) {
    		sto_boxup_c = Ext.create("Helcss.store.chart.boxup.BoxUpChartStore");
    		alert("长度：" + sto_boxup_c.getCount());
    	}
    	*/
    },
    
    /*
     * 初始化故障月度数据
     */
    handleSRFaultResultByMonth : function (result) {
    	var sto_srfaultbymonth = Ext.data.StoreManager.get("SRFaultByMonthStore"); 
		if (!sto_srfaultbymonth) { 
			sto_srfaultbymonth = Ext.create("Helcss.store.chart.fault.SRFaultByMonthStore"); 
		} 
		
		var sto_srfaultbymonth_d = Ext.data.StoreManager.get("SRFaultByMonthDetailStore"); 
		if (!sto_srfaultbymonth_d) { 
			sto_srfaultbymonth_d = Ext.create("Helcss.store.chart.fault.SRFaultByMonthDetailStore"); 
		}
		
		var sto_srfaultbymonth_c = Ext.data.StoreManager.get("SRFaultByMonthChartStore"); 
		if (!sto_srfaultbymonth_c) { 
			sto_srfaultbymonth_c = Ext.create("Helcss.store.chart.fault.SRFaultByMonthChartStore"); 
		}
		
		//受信月
		if(PDsystem==1){
			//alert(result.items.length);
			//清单数量
			var num=result.items.length;
			//清单长度
			var numData=70*num;
			//var leng=Ext.getCmp("srfaultbymonth_detail_list").getHeight();
			if(numData>385){
				//alert('数量超过');
				var zs=800+numData-355;
				//全局
				Ext.getCmp("srfaultbymonth_view_panel").setHeight(zs);
				
				Ext.getCmp("srfaultbymonth_list_panel").setHeight(numData+40);
				Ext.getCmp("srfaultbymonth_detail_list").setHeight(numData);
				
				if(numData<500){
					Ext.getCmp("srfaultbymonth_view_list").setHeight(numData+40);
					Ext.getCmp("srfaultbymonth_list").setHeight(numData);
				};
			}else{
				//alert('数量没超过');
				Ext.getCmp("srfaultbymonth_view_panel").setHeight(800);
				Ext.getCmp("srfaultbymonth_list_panel").setHeight(425);
				Ext.getCmp("srfaultbymonth_detail_list").setHeight(385);
				
				Ext.getCmp("srfaultbymonth_view_list").setHeight(425);
				Ext.getCmp("srfaultbymonth_list").setHeight(385);
			};
			
		};
		
		sto_srfaultbymonth_d.setData(result.items, this);
        sto_srfaultbymonth.setData(result.monthitem, this);
        sto_srfaultbymonth_c.setData(result.chart_fault, this);
        
        // 获取最大的数,设置Y轴最大值
        var length = result.chart_fault.length;
        var maxNum = 0;
        for (var i = 0; i < length; i ++) {
        	if (result.chart_fault[i].value > maxNum) {
        		maxNum = result.chart_fault[i].value;
        	}
        }
        var ax = Ext.getCmp('srfaultbymonth_chart');
		ax.getAxes()[0].setMaximum((maxNum+(maxNum*0.1)));
		ax.getAxes()[0].setMajorTickSteps((maxNum+(maxNum*0.1)));
//		ax.getAxes()[0].setMinZoom(ax.getAxes()[0].getMaxZoom());
		ax.setHighlightItem(null);
		//ax.getAxes()[0].setMinZoom(ax.getAxes()[0].getMaxZoom());
		//ax.getAxes()[0].setMinZoom(0);
		//ax.getAxes()[0].setMaxZoom(0);
		// X轴的显示区域
		/*
		if (result.chart_fault.length < 10) {
			ax.getAxes()[1].setVisibleRange([0,1]);
		} else {
			ax.getAxes()[1].setVisibleRange([0,0.6]);
		}
		*/
		// 获取最大的数,设置X轴大小
		/* 
        var maxNum_x = result.lastdate;
		ax.getAxes()[1].setMaximum((maxNum_x));
       */
		var myDate = new Date();
//		var srfaultbymonth_chart = Ext.getCmp('srfaultbymonth_chart');
		ax.redraw();
		
        var srfaultbymonth_list_tb_title = Ext.getCmp('srfaultbymonth_list_tb_title');
//		srfaultbymonth_list_tb_title.setTitle("本月"+myDate.getDate()+"日受信明细清单(<span style=''>宗数："+ sto_srfaultbymonth_d.getCount() +"</span>)");
        srfaultbymonth_list_tb_title.setTitle("本月1日受信明细清单(<span style=''>宗数："+ sto_srfaultbymonth_d.getCount() +"</span>)");
        document.getElementById("d_SRYM").innerHTML = SRYM.replace("-", "年")+"月";
//        ax.setHeight(450);
//		WL.Logger.debug("ax height:"+ax.getHeight());
    },
    
    /*
     * 初始化故障年度数据
     */
    handleSRFaultResultByYear : function (result) {
    	var sto_srfaultbyyear = Ext.data.StoreManager.get("SRFaultByYearStore"); 
		if (!sto_srfaultbyyear) { 
			sto_srfaultbyyear = Ext.create("Helcss.store.chart.fault.SRFaultByYearStore"); 
		} 
		
		var sto_srfaultbyyear_d = Ext.data.StoreManager.get("SRFaultByYearDetailStore"); 
		if (!sto_srfaultbyyear_d) { 
			sto_srfaultbyyear_d = Ext.create("Helcss.store.chart.fault.SRFaultByYearDetailStore"); 
		}
		
		var sto_srfaultbyyear_c = Ext.data.StoreManager.get("SRFaultByYearChartStore"); 
		if (!sto_srfaultbyyear_c) { 
			sto_srfaultbyyear_c = Ext.create("Helcss.store.chart.fault.SRFaultByYearChartStore"); 
		}
		
		sto_srfaultbyyear_d.setData(result.items, this);
		sto_srfaultbyyear.setData(result.ja_sum, this);
		sto_srfaultbyyear_c.setData(result.ja_monthchart, this);
        
        // 获取最大的数,设置Y轴最大值
        var length = result.ja_monthchart.length;
        var maxNum = 0;
        for (var i = 0; i < length; i ++) {
        	if (result.ja_monthchart[i].value > maxNum) {
        		maxNum = result.ja_monthchart[i].value;
        	}
        }
        var axy = Ext.getCmp('srfaultbyyear_chart');
		axy.getAxes()[0].setMaximum(maxNum+(maxNum*0.1));
		axy.getAxes()[0].setMajorTickSteps(12);
//		axy.getAxes()[0].setMinorTickSteps(50);
		axy.setHighlightItem(null);
		var srfaultbyyear_list_tb_title = Ext.getCmp('srfaultbyyear_list_tb_title');
		if(PDsystem==1){
			srfaultbyyear_list_tb_title.setTitle("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr>"+
					"<td width=\"10%\" style=\"text-align:center\">合计</td>"+
					"<td width=\"30%\" style=\"text-align:left\">电梯台量："+result.ja_sum[0].sumcount+"</td>"+
					"<td width=\"30%\" style=\"text-align:left\">受信宗数："+result.ja_sum[0].sumcmfnum+"</td>"+
					"<td width=\"30%\" style=\"text-align:left\">出动率(%)："+result.ja_sum[0].sumcmfrate+"</td>"+
					"</tr></table>");
		}else{
			srfaultbyyear_list_tb_title.setTitle("<table width=\"705\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr>"+
					"<td width=\"10%\" style=\"text-align:center\">合计</td>"+
					"<td width=\"30%\" style=\"text-align:left\">电梯台量："+result.ja_sum[0].sumcount+"</td>"+
					"<td width=\"30%\" style=\"text-align:left\">受信宗数："+result.ja_sum[0].sumcmfnum+"</td>"+
					"<td width=\"30%\" style=\"text-align:left\">出动率(%)："+result.ja_sum[0].sumcmfrate+"</td>"+
					"</tr></table>");
		};
		axy.redraw();
		document.getElementById("d_SRY").innerHTML = SRY+"年";
//        srfaultbymonth_list_tb_title.setTitle("本月1日受信明细清单(<span style=''>宗数："+ sto_srfaultbymonth_d.getCount() +"</span>)");
//        document.getElementById("d_SRYM").innerHTML = SRYM.replace("-", "年")+"月";
		
    },
    
    /*
     * 初始化困人数据
     */
    handleBoxUpResultByMonth : function (result) {
    	
    	var sto_boxupbymonth = Ext.data.StoreManager.get("BoxUpByMonthStore"); 
		if (!sto_boxupbymonth) { 
			sto_boxupbymonth = Ext.create("Helcss.store.chart.boxup.BoxUpByMonthStore"); 
		} 
		
		var sto_boxupbymonth_d = Ext.data.StoreManager.get("BoxUpByMonthDetailStore"); 
		if (!sto_boxupbymonth_d) { 
			sto_boxupbymonth_d = Ext.create("Helcss.store.chart.boxup.BoxUpByMonthDetailStore"); 
		}
		
		var sto_boxupbymonth_c = Ext.data.StoreManager.get("BoxUpByMonthChartStore"); 
		if (!sto_boxupbymonth_c) { 
			sto_boxupbymonth_c = Ext.create("Helcss.store.chart.boxup.BoxUpByMonthChartStore"); 
		}
		
		//困人月
		if(PDsystem==1){
			//alert(result.items.length);
			var num=result.items.length;
			var numData=75*num;
			var leng=Ext.getCmp("boxupbymonth_detail_list").getHeight();
			if(numData>leng){
				var zs=(1000+100)+numData;
				Ext.getCmp("boxupbymonth_view_container").setHeight(zs);
				Ext.getCmp("boxupbymonth_list_tb_container").setHeight(numData+40);
				Ext.getCmp("boxupbymonth_detail_list").setHeight(numData);
			}else{
				Ext.getCmp("boxupbymonth_view_container").setHeight(800);
				Ext.getCmp("boxupbymonth_list_tb_container").setHeight(425);
				Ext.getCmp("boxupbymonth_detail_list").setHeight(385);
			};
		};
		
		
		sto_boxupbymonth_d.setData(result.items, this);
		sto_boxupbymonth.setData(result.monthitem, this);
		sto_boxupbymonth_c.setData(result.chart_boxup, this);
        
        // 获取最大的数,设置Y轴大小
        /**/
        var length = result.chart_boxup.length;
        var maxNum_b = 0;
        for (var i = 0; i < length; i ++) {
        	if (result.chart_boxup[i].value > maxNum_b) {
        		maxNum_b = result.chart_boxup[i].value;
        	}
        }
        var ax = Ext.getCmp('boxupbymonth_chart');
		ax.getAxes()[0].setMaximum(Math.ceil(maxNum_b*1.1));
		ax.getAxes()[0].setMinZoom(ax.getAxes()[0].getMaxZoom());
		ax.getAxes()[0].setMajorTickSteps(Math.ceil(maxNum_b*1.1));
		ax.redraw();
		
		// 获取最大的数,设置X轴大小
		/*
        var maxNum_x = result.lastdate;
		ax.getAxes()[1].setMaximum((maxNum_x));
        */
		ax.setHighlightItem(null); //设置没有点被选中
        var boxupbymonth_list_tb_title = Ext.getCmp('boxupbymonth_list_tb_title');
        boxupbymonth_list_tb_title.setTitle("本月1日困人明细清单(<span style=''>宗数："+ sto_boxupbymonth_d.getCount() +"</span>)");
        document.getElementById("d_BUYM").innerHTML = BUYM.replace("-", "年")+"月";
    },
    
    handleBoxUpResultByYear : function (result) {
    	var sto_boxupbyyear = Ext.data.StoreManager.get("BoxUpByYearStore"); 
		if (!sto_boxupbyyear) { 
			sto_boxupbyyear = Ext.create("Helcss.store.chart.boxup.BoxUpByYearStore"); 
		} 
		
		var sto_boxupbyyear_d = Ext.data.StoreManager.get("BoxUpByYearDetailStore"); 
		if (!sto_boxupbyyear_d) { 
			sto_boxupbyyear_d = Ext.create("Helcss.store.chart.boxup.BoxUpByYearDetailStore"); 
		}
		
		var sto_boxupbyyear_c = Ext.data.StoreManager.get("BoxUpByYearChartStore"); 
		if (!sto_boxupbyyear_c) { 
			sto_boxupbyyear_c = Ext.create("Helcss.store.chart.boxup.BoxUpByYearChartStore"); 
		}
		
		sto_boxupbyyear_d.setData(result.items, this);
		sto_boxupbyyear.setData(result.ja_sum, this);
		sto_boxupbyyear_c.setData(result.ja_monthchart, this);
        
        // 获取最大的数,设置Y轴最大值
        var length = result.ja_monthchart.length;
        var maxNum = 0;
        for (var i = 0; i < length; i ++) {
        	if (result.ja_monthchart[i].value > maxNum) {
        		maxNum = result.ja_monthchart[i].value;
        	}
        }
        var axy = Ext.getCmp('boxupbyyear_chart');
		axy.getAxes()[0].setMaximum(Math.ceil(maxNum*1.1));
		axy.getAxes()[0].setMajorTickSteps(5);
//		axy.getAxes()[0].setMinorTickSteps(50);
		axy.setHighlightItem(null);
		var boxupbyyear_list_tb_title = Ext.getCmp('boxupbyyear_list_tb_title');
		if(PDsystem==1){
			boxupbyyear_list_tb_title.setTitle("<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr>"+
					"<td width=\"10%\" style=\"text-align:center\">合计</td>"+
					"<td width=\"30%\" style=\"text-align:left\">电梯台量："+result.ja_sum[0].sumcount+"</td>"+
					"<td width=\"30%\" style=\"text-align:left\">困人宗数："+result.ja_sum[0].sumcmfboxnum+"</td>"+
					"<td width=\"30%\" style=\"text-align:left\">困人率(‰)："+result.ja_sum[0].sumcmfboxrate+"</td>"+
					"</tr></table>");
		}else{
			boxupbyyear_list_tb_title.setTitle("<table width=\"705\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr>"+
					"<td width=\"10%\" style=\"text-align:center\">合计</td>"+
					"<td width=\"30%\" style=\"text-align:left\">电梯台量："+result.ja_sum[0].sumcount+"</td>"+
					"<td width=\"30%\" style=\"text-align:left\">困人宗数："+result.ja_sum[0].sumcmfboxnum+"</td>"+
					"<td width=\"30%\" style=\"text-align:left\">困人率(‰)："+result.ja_sum[0].sumcmfboxrate+"</td>"+
					"</tr></table>");
		};

		axy.redraw();
		document.getElementById("d_BUY").innerHTML = BUY+"年";
//        srfaultbymonth_list_tb_title.setTitle("本月1日受信明细清单(<span style=''>宗数："+ sto_srfaultbymonth_d.getCount() +"</span>)");
//        document.getElementById("d_SRYM").innerHTML = SRYM.replace("-", "年")+"月";
		
    },
    
    handleRankListResultByMonth : function (result) {
    	var sto_ranklistbymonth_d = Ext.data.StoreManager.get("RankListByMonthDomainStore"); 
		if (!sto_ranklistbymonth_d) { 
			sto_ranklistbymonth_d = Ext.create("Helcss.store.chart.ranklist.RankListByMonthDomainStore"); 
		} 
		
		var sto_ranklistbymonth_e = Ext.data.StoreManager.get("RankListByMonthElevatorStore"); 
		if (!sto_ranklistbymonth_e) { 
			sto_ranklistbymonth_e = Ext.create("Helcss.store.chart.ranklist.RankListByMonthElevatorStore"); 
		}
		
		if(PDsystem==1){
			//alert(result.mult_domain.length);
			//alert(result.mult_elevator.length);
			var mult_domain=result.mult_domain.length;
			var mult_elevator=result.mult_elevator.length;
		
			if(mult_domain!=0){
				var dataNum=(61*mult_domain)+(70*mult_elevator)+50;
				Ext.getCmp('ranklistbymonth_view_container').setHeight(dataNum);
				
				Ext.getCmp('ranklistbymonth_domain_container').setHeight((61*mult_domain)+35);
				Ext.getCmp('ranklistbymonth_domain_list').setHeight((60*mult_domain));
			}else{
				Ext.getCmp('ranklistbymonth_view_container').setHeight(1000);
				
				Ext.getCmp('ranklistbymonth_domain_container').setHeight(435);
				Ext.getCmp('ranklistbymonth_domain_list').setHeight(355);
			};
			
			
			if(mult_elevator!=0){
				Ext.getCmp('ranklistbymonth_elevator_container').setHeight((61*mult_elevator)+15);
				Ext.getCmp('ranklistbymonth_elevator_list').setHeight((60*mult_elevator));
			}else{
				Ext.getCmp('ranklistbymonth_elevator_container').setHeight(430);
				Ext.getCmp('ranklistbymonth_elevator_list').setHeight(350);
			};
			
		};

		
		sto_ranklistbymonth_d.setData(result.mult_domain, this);
		sto_ranklistbymonth_e.setData(result.mult_elevator, this);
		
//        var boxupbymonth_list_tb_title = Ext.getCmp('boxupbymonth_list_tb_title');
//        boxupbymonth_list_tb_title.setTitle("本月1日困人明细清单(<span style=''>宗数："+ sto_boxupbymonth_d.getCount() +"</span>)");
        document.getElementById("d_RLYM").innerHTML = RLYM.replace("-", "年")+"月";
    },
    
    handleRankListResultByYear : function (result) {
    	var sto_ranklistbyyear_d = Ext.data.StoreManager.get("RankListByMonthDomainStore"); 
		if (!sto_ranklistbyyear_d) { 
			sto_ranklistbyyear_d = Ext.create("Helcss.store.chart.ranklist.RankListByMonthDomainStore"); 
		} 
		
		var sto_ranklistbyyear_e = Ext.data.StoreManager.get("RankListByMonthElevatorStore"); 
		if (!sto_ranklistbyyear_e) { 
			sto_ranklistbyyear_e = Ext.create("Helcss.store.chart.ranklist.RankListByMonthElevatorStore"); 
		}
		
		if(PDsystem==1){
			//alert(result.mult_domain.length);
			//alert(result.mult_elevator.length);
			var mult_domain=result.mult_domain.length;
			var mult_elevator=result.mult_elevator.length;
			
			if(mult_domain!=0){
				Ext.getCmp('ranklistbyyear_view_RankListViewByYear').setHeight((61*mult_domain)+(70*mult_elevator)+60);
				
				Ext.getCmp('ranklistbyyear_view_container').setHeight((61*mult_domain)+30);
				Ext.getCmp('ranklistbyyear_domain_list').setHeight((60*mult_domain));
			}else{
				Ext.getCmp('ranklistbyyear_view_RankListViewByYear').setHeight(1000);
				Ext.getCmp('ranklistbyyear_view_container').setHeight(435);
				Ext.getCmp('ranklistbyyear_domain_list').setHeight(355);
			};
			
			if(mult_elevator!=0){
				Ext.getCmp('ranklistbyyear_elevator_container').setHeight((61*mult_domain)+30);
				Ext.getCmp('ranklistbyyear_elevator_list').setHeight((60*mult_elevator));
			}else{
				Ext.getCmp('ranklistbyyear_elevator_container').setHeight(430);
				Ext.getCmp('ranklistbyyear_elevator_list').setHeight(350);
			};
			
		};
		
		sto_ranklistbyyear_d.setData(result.mult_domain, this);
		sto_ranklistbyyear_e.setData(result.mult_elevator, this);
		
//        var boxupbymonth_list_tb_title = Ext.getCmp('boxupbymonth_list_tb_title');
//        boxupbymonth_list_tb_title.setTitle("本月1日困人明细清单(<span style=''>宗数："+ sto_boxupbymonth_d.getCount() +"</span>)");
        document.getElementById("d_RLY").innerHTML = RLY+"年";
    },

    /*
    show_report : function(x){
//    	WL.Logger.debug("x:"+x);
    	var tmp_obj1 = Ext.getCmp('srfaultbyyear_view');
		if(!tmp_obj1){
			tmp_obj1 = Ext.create('Helcss.view.chart.fault.SRFaultViewByYear');
		}
		WL.Logger.debug("items:"+Ext.getCmp("srchartview").getItems());
		WL.Logger.debug("itemslength:"+Ext.getCmp("srchartview").getItems().length);
//		for(var i in Ext.getCmp("srchartview").getItems()){
//			
//			WL.Logger.debug("item:"+Ext.getCmp("srchartview").getItems()[i].getItemId());
//		}
//		for(var i=0;i<Ext.getCmp("srchartview").getItems().length;i++){
//			WL.Logger.debug("item:"+Ext.getCmp("srchartview").getItems()[i].getId());
//		}
		Ext.getCmp('tp_srchart').removeAll( true,true);
		Ext.getCmp('tp_srchart').setActiveItem( tmp_obj1 );
//		Ext.getCmp('Helcss.controller.ApplicationController').connectServer(Ext.getCmp('srchartview').handleSRFaultResultByYear, "faultReportAction.do?method=toSearchFaultByYear", "{'SRY':'" + SRY + "'}");
		Ext.app.Application.getController('Helcss.controller.ApplicationController').connectServer(Ext.getCmp('srchartview').handleSRFaultResultByYear, "faultReportAction.do?method=toSearchFaultByYear", "{'SRY':'" + SRY + "'}");
//		Ext.getCmp('srchartview').
//		Ext.getCmp('srfaultbymonth_view').destroy();
//		Ext.getCmp("srchartview").add( tmp_obj1 );
//    	WL.Logger.debug("x:"+x);
    }
    */
});