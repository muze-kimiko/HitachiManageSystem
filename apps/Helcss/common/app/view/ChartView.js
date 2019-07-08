Ext.define('Helcss.view.ChartView', {
	extend: 'Ext.Panel',
	requires : [ "Helcss.controller.ApplicationController"],
    id:'chartview',
    fullscreen : true,
    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '<b>报表</b>',
                items: [
                    {
                        xtype: 'button',
                        text: '首页',
                        ui: 'back',
                        id : 'btn_chart_back',
                    },
                    {
                    	xtype: 'spacer',
                    }
                    /*
                    ,
                    {
                        xtype: 'button',
                        text: '刷新数据',
                        id : 'btn_chart_refresh',
                    }
                    */
                ]
            },{
            	xtype : 'tabpanel',
            	id : 'tp_chart',
            	style: 'background: white;height:100%;',
				defaults : {
					flex : 1
				},
				items : [{
					xclass : 'Helcss.view.chart.fault.FaultView'
				},{
					xclass : 'Helcss.view.chart.boxup.BoxUpView'
				}]
            }]
     },
     
    initialize: function() {
    	
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
     * 初始化故障数据
     */
    handleFaultResult : function (result) {
    	var sto_fault = Ext.data.StoreManager.get("FaultStore"); 
		if (!sto_fault) { 
			sto_fault = Ext.create("Helcss.store.chart.fault.FaultStore"); 
		} 
		
		var sto_fault_d = Ext.data.StoreManager.get("FaultDetailStore"); 
		if (!sto_fault_d) { 
			sto_fault_d = Ext.create("Helcss.store.chart.fault.FaultDetailStore"); 
		}
		
		var sto_fault_c = Ext.data.StoreManager.get("FaultChartStore"); 
		if (!sto_fault_c) { 
			sto_fault_c = Ext.create("Helcss.store.chart.fault.FaultChartStore"); 
		}
		
		sto_fault_d.setData(result.items, this);
        sto_fault.setData(result.monthitem, this);
        sto_fault_c.setData(result.chart_fault, this);
        
        // 获取最大的数,设置Y轴最大值
        var length = result.chart_fault.length;
        var maxNum = 0;
        for (var i = 0; i < length; i ++) {
        	if (result.chart_fault[i].value > maxNum) {
        		maxNum = result.chart_fault[i].value;
        	}
        }
        var ax = Ext.getCmp('fault_chart');
		ax.getAxes()[0].setMaximum((maxNum+1));
		ax.getAxes()[0].setMajorTickSteps((maxNum+1));
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
        var fault_list_tb_title = Ext.getCmp('fault_list_tb_title');
		fault_list_tb_title.setTitle("<h2>本月"+myDate.getDate()+"日受信明细清单(宗数:"+ sto_fault_d.getCount() +")</h2>");
		
    },
    
    /*
     * 初始化困人数据
     */
    handleBoxUpResult : function (result) {
    	var sto_boxup = Ext.data.StoreManager.get("BoxUpStore"); 
		if (!sto_boxup) { 
			sto_boxup = Ext.create("Helcss.store.chart.boxup.BoxUpStore"); 
		} 
		
		var sto_boxup_d = Ext.data.StoreManager.get("BoxUpDetailStore"); 
		if (!sto_boxup_d) { 
			sto_boxup_d = Ext.create("Helcss.store.chart.boxup.BoxUpDetailStore"); 
		}
		
		var sto_boxup_c = Ext.data.StoreManager.get("BoxUpChartStore"); 
		if (!sto_boxup_c) { 
			sto_boxup_c = Ext.create("Helcss.store.chart.boxup.BoxUpChartStore"); 
		}
		
		sto_boxup_d.setData(result.items, this);
        sto_boxup.setData(result.monthitem, this);
        sto_boxup_c.setData(result.chart_boxup, this);
        
        // 获取最大的数,设置Y轴大小
        /**/
        var length = result.chart_boxup.length;
        var maxNum_b = 0;
        for (var i = 0; i < length; i ++) {
        	if (result.chart_boxup[i].value > maxNum_b) {
        		maxNum_b = result.chart_boxup[i].value;
        	}
        }
        var ax = Ext.getCmp('boxup_chart');
		ax.getAxes()[0].setMaximum((maxNum_b+1));
		ax.getAxes()[0].setMinZoom(ax.getAxes()[0].getMaxZoom());
		ax.getAxes()[0].setMajorTickSteps(maxNum_b+1);
		
		// 获取最大的数,设置X轴大小
		/*
        var maxNum_x = result.lastdate;
		ax.getAxes()[1].setMaximum((maxNum_x));
        */
		ax.setHighlightItem(null); //设置没有点被选中
		var myDate = new Date();
        var boxup_list_tb_title = Ext.getCmp('boxup_list_tb_title');
		boxup_list_tb_title.setTitle("<h2>本月"+myDate.getDate()+"日困人明细清单(宗数:"+ sto_boxup_d.getCount() +")</h2>");
		
    },

});