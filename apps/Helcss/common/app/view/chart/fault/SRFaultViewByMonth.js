Ext.define('Helcss.view.chart.fault.SRFaultViewByMonth', {
    extend: 'Ext.Panel',
    requires : ["Helcss.store.chart.fault.SRFaultByMonthChartStore",
                "Helcss.store.chart.fault.SRFaultByMonthDetailStore",
                "Helcss.store.chart.fault.SRFaultByMonthStore"],
    id : 'srfaultbymonth_view',
    config: {
    	title : '<b id="bb" style="font-size:18pt;">月度受信趋势</b>',
    	style: 'background-color:#000000;',
//    	style: 'background:#efeff4;',
    	items : [{
			xtype : 'panel',
			id:'srfaultbymonth_view_panel',
			height: 1000,
//			layout : 'vbox',
			style: 'background: #efeff4;',
			padding: '10 10 0 10',
			items : [{
				xtype: 'panel',
				id:'btn_QUAN',
				width: 200,
                height: 40,
                top: 0,
                right: 20,
                style: 'filter:alpha(opacity=80);opacity:0.6;',
                items: [
                    {
                        xtype: 'button',
                        id:'btn_sr_prevmonth',
                        left: 0,
                        style: 'border:0px;',
                        width: 40,
                        iconCls: 'arrow_left',
                        text: ''
                    },
                    {
//                        xtype: 'label',
                    	xtype : 'button',
                    	id:'but_SRYM',
                        html: '<span id="d_SRYM" style="font-size:18px"></span>',
                        left: 50,
                        margin: '10 0 0 0',
                        width: 105,
                        baseCls:'x-label',
                        handler:function(){
                        	if(this.overlay!=null){
                        		this.overlay.destroy();
                        		this.overlay = null;
                        	}
                        	var optSRYM = new Array();
                        	for(var i = -4;i<=0;i++){
                        		optSRYM[i+4] = {text:(cdate.getFullYear()+i)+"年",value:(cdate.getFullYear()+i)};
                        	}
                        	this.overlay = Ext.Viewport.add({
             				   xtype:'formpanel',
             				   id:'ovl_SRYM',
             				   modal:true,
             				   hideOnMaskTap:true,	
             				   showAnimation:{
             					   type:'popIn',
             					   duration:250,
             					   easing:'ease-out'
             				   },
             				   hideAnimation:{
             					   type:'popOut',
             					   duration:250,
             					   easing:'ease-out'
             				   },
//             				   centered:true,
//             				   width:Ext.filterPlatform('ie10')?'100%':(Ext.os.deviceType=='Phone')?260:400,
//             				   height:Ext.filterPlatform('ie10')?'30%':Ext.os.deviceType=='Phone'?220:400,
             				   width:200,
             				   height:170,
//             				   styleHtmlContent:true,
             				   items:[
									{
									    xtype: 'fieldset',
									    border:0,
									    margin: '7 7 auto 7',
									    items: [
									        {
									            xtype: 'selectfield',
									            id: 'o_SRY',
									            label: '年度',
									            labelWidth:'40%',
									            options:optSRYM,
									            defaultTabletPickerConfig:{
									            	width:200,
									            }
									        },
									        {
									            xtype: 'selectfield',
									            id: 'o_SRM',
									            label: '月份',
									            labelWidth:'40%',
									            options: [
									                {text: '1月',value: '01'},
									                {text: '2月',value: '02'},
									                {text: '3月',value: '03'},
									                {text: '4月',value: '04'},
									                {text: '5月',value: '05'},
									                {text: '6月',value: '06'},
									                {text: '7月',value: '07'},
									                {text: '8月',value: '08'},
									                {text: '9月',value: '09'},
									                {text: '10月',value: '10'},
									                {text: '11月',value: '11'},
									                {text: '12月',value: '12'},
									            ],
										        defaultTabletPickerConfig:{
									            	width:200,
									            }
									        }
									    ]
									},
									{
									    xtype: 'button',
									    id: 'c_SRYM',
									    margin: '15 auto',
									    width: '50%',
									    text: '确定',
									}

             				   ],
             				   scrollable:false
             			   });
                        this.overlay.showBy(Ext.getCmp('but_SRYM'),'tc-bc');
                        var self_o_SRY = Ext.getCmp('o_SRY');
                		var ops_o_SRY = SRYM.substring(0, 4);
                		self_o_SRY.setValue(ops_o_SRY);
                		var self_o_SRM = Ext.getCmp('o_SRM');
                		var ops_o_SRM = SRYM.substring(5, 7);
                		self_o_SRM.setValue(ops_o_SRM);
                        },
                    },
                    {
                        xtype: 'button',
                        id:'btn_sr_nextmonth',
                        left: 155,
                        right: 0,
                        style: 'border:0px;',
                        width: 40,
                        iconCls: 'arrow_right',
                        text: ''
                    }
                ]
			},{
				height:445,
//				style : 'height : 50%',
				id : 'srfaultbymonth_chart',
		    	xtype : 'chart',
		    	background: "none",
	            store: 'SRFaultByMonthChartStore',
	            animate: true,
	            // 菜单
	            interactions: ['panzoom','itemhighlight'],
	            listeners: {
             	   itemtap: function(series,item, e){
            		   myLoading.show();
            		   var srfaultbymonth_list_tb_title = Ext.getCmp('srfaultbymonth_list_tb_title');
            		   
            		   var srcharbymonthStore = Ext.data.StoreManager.get("SRFaultByMonthChartStore"); 
            		   if (!srcharbymonthStore) { 
            			   srcharbymonthStore = Ext.create("Helcss.store.chart.fault.SRFaultByMonthChartStore"); 
            		   }
            		   var srfaultbymonth_de_Store = Ext.data.StoreManager.get("SRFaultByMonthDetailStore"); 
            		   if (!srfaultbymonth_de_Store) { 
            			   srfaultbymonth_de_Store = Ext.create("Helcss.store.chart.fault.SRFaultByMonthDetailStore"); 
            		   }
            		   var date = srcharbymonthStore.getAt(item.index).get('name');
            		   var invocationData = {
            		              adapter : 'HttpAdapter',  
            		              procedure : 'getStories',
            		              parameters : ['faultReportAction.do?method=toSearchFault_OneDay', "{'DATE_DAY':'"+ date +"','SRYM':'" + SRYM + "'}"]
            		      }; 
            		  	//Ext.Msg.wait('提示','正在处理数据，请稍候'); 
            		  	WL.Client.invokeProcedure(invocationData, {
            		          onSuccess : function (result) {
            		          	var httpStatusCode = result.status;
            		          	if (200 == httpStatusCode) {
            		                  var invocationResult = result.invocationResult;
            		                  var isSuccessful = invocationResult.isSuccessful;
            		                  if (true == isSuccessful) {
            		                  	var status = invocationResult.status.code;
            		                  	if (status == 250) {
            		                  		myLoading.hide();
            		                          var result = invocationResult.content;
            		                          // 转化成JSON对象
            		                          var json = eval("("+ result +")");
            		                          srfaultbymonth_de_Store.setData(json.items, this);
            		                          srfaultbymonth_list_tb_title.setTitle("本月"+date+"日受信明细清单(<span style=''>宗数："+ json.count +"</span>)");
            		                  	} else {
            		                  		myLoading.hide();
            		                  		alert("服务器出错！");
            		                  	}
            		                  } else {
            		                	myLoading.hide();
            		                  	alert("网络出错！");
            		                  }
            		              } else {
            		            	myLoading.hide();
            		              	alert("网络出错！");
            		              }
            		          },  
            		          onFailure : function () {myLoading.hide();alert('ff');}
            		      });
            		   
            		   
               		}
        },
                
	            series: [
	 	                {
	 	                    type: 'line',
//	 	                   id : 'my_boxupbymonth',
	 	                    xField: 'name',
	 	                    yField: 'value',
	 	                    title: '线性视图',
	 	                    style: {
	 	                        smooth: true,// 是否顺滑
	 	                        stroke: '#e5c89d',
	 	                        lineWidth: 4,
	 	                        shadowColor: 'rgba(0,0,0,0.7)',// 阴影样式
	 	                        shadowBlur: 0,
	 	                        shadowOffsetX: 0,
	 	                        shadowOffsetY: 0
	 	                    },
	 	                    highlightCfg: {
	 	                        scale: 2
	 	                    },
	 	                    marker: { // 每一个点的样式
	 	                        type: 'circle',
	 	                        stroke: '#c59752',
	 	                        fill: '#c59752',
	 	                        lineWidth: 1,
	 	                        radius: 3,
	 	                        shadowColor: 'rgba(0,0,0,0.7)',
	 	                        shadowBlur: 0,
	 	                        shadowOffsetX: 0,
	 	                        shadowOffsetY: 0,
	 	                        fx: {duration: 300}
	 	                    },
	 	                }
	 	           ],
	 	           axes: [
	 		                {// Y轴
	 		                    type: 'numeric',
	 		                    position: 'left',
	 		                    title : '宗数(单位：宗)',
	 		                    grid: {
	 		                        odd: {
	 		                            fill: '#fafafa'
	 		                        }
	 		                    },
	 		                    maxZoom: 1,
	 		                    minZoom: 1,
//	 		                   majorTickSteps: 5,
	 		                    style: {
	 		                        axisLine: false,
//	 		                        estStepSize: 30,// Y每一格的区分
	 		                        stroke: '#ddd'
	 		                    },
	 		                   minimum: 0// 设定最大最小值，如果不设定就默认取加载数据的最大最小
	 		                    //maximum: 700
	 		                },
	 		                {// X轴
	 		                    type: 'category',
	 		                    title : '日期 (本月)',
	 		                    position: 'bottom',
	 		                    visibleRange: [0, 0.6], //可见区域占全部的百分比
	 		                    minimum: 0,
	 		                    style: {
//	 		                        estStepSize: 120,
	 		                        stroke: '#999'
	 		                    }
	 		                }
	 		            ]
		    },{
                xtype: 'panel',
                margin: '10 0 0 0',
                style: 'float:left;width: 35%;',
                id:'srfaultbymonth_view_list',
                height: 425,
                items: [
                    {
                        xtype: 'toolbar',
                        id:'srfaultbymonth_view_SXTJBB',
                        docked: 'top',
                        height: 40,
                        title: '受信统计报表'
                    },{
        		    	xtype : 'list',
        		    	id: 'srfaultbymonth_list',
        		    	scrollable : false,
        		    	height: 385,
        		    	store : 'SRFaultByMonthStore',
        				itemTpl : '<div>{TEXTNAME}<span style="">{TEXTRATE}</span><span style="float:right;color:#808080;">{VALUE}</span></div>',
        				emptyText : '<div class="chat-list-empty-text">没有找到记录</div>'
        			}
                ]
            },{
                xtype: 'panel',
                id:'srfaultbymonth_list_panel',
                margin: '10 0 0 0',
                padding: '0 0 0 10',
                style: 'float:left; width: 65%',
                height: 425,
                items: [
                    {
                    	id : 'srfaultbymonth_list_tb_title',
                        xtype: 'titlebar',
                        docked: 'top',
                        margin: '0 0 0 10',
                        height: 40,
                        title: '受信明细清单'
                    },{
        		    	xtype : 'list',
        		    	height: 385,
        		    	id: 'srfaultbymonth_detail_list',
                        style : 'width: 100%;',
        		    	store : 'SRFaultByMonthDetailStore',
        				itemTpl : '<div><h1 style="font-size:22px;">{SR_FAULT_DOMAIN}<span style="margin-left:10px;font-size:16px;color:#808080;">{SR_CREATED_TIME}</span></h1>'+
        				'<div>{SR_ABSTRACT}<font style="float:right;color:red;">{SR_BOXUP}</font></div>'+
        				'<div style="display:none;color:#808080;">到场:{ARRIVE_TIME}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp完成: {REPAIR_COMPLETE_TIME}</div></div>',
        				emptyText : '<div class="chat-list-empty-text">没有找到记录</div>'
        			}
                ]
            }]
		}],
		listeners:[
			   {
				   fn:'bbb',
				   event:'tap',
				   delegate:'#l_SRYM'
			   }
		]
    },
    
    bbb : function(button,e,eOpts){
    	WL.Logger.debug('aaaaaa');
    },
    
    initialize: function() {
    	if(PDsystem==1){
    		//alert('我在SRFaultViewByMonth页面');
        	//线性图
    		Ext.getCmp('srfaultbymonth_chart').setMargin('40px 0 0 0');
        	Ext.getCmp("srfaultbymonth_chart").setHeight(255);
        	Ext.getCmp("srfaultbymonth_chart").setWidth('95%');
        	//受信统计报表
        	Ext.getCmp('srfaultbymonth_view_SXTJBB').setStyle('font-size:9pt');
        	Ext.getCmp('srfaultbymonth_list').setItemTpl('<div style="font-size:9pt;margin:0 0 25px 0;"><span style="float:left;width:100%">{TEXTNAME}{TEXTRATE}</span><span style="float:left;color:#808080;">{VALUE}</span></div>');
        	Ext.getCmp('srfaultbymonth_list').setEmptyText('<div class="chat-list-empty-text" style="font-size:9pt;">没有找到记录</div>'); 
        	//受信明细清单
        	Ext.getCmp('srfaultbymonth_list_tb_title').setStyle('font-size:9pt');
        	var trim=
        	'<div>'+
        		'<h1 style="font-size:9pt;">{SR_FAULT_DOMAIN}'+
        			'<span style="margin-left:10px;font-size:9pt;color:#808080;">{SR_CREATED_TIME}</span>'+
        		'</h1>'+
        		'<div style="font-size:9pt;">{SR_ABSTRACT}'+
        			'<font style="float:right;color:red;">{SR_BOXUP}</font>'+
        		'</div>'+
        		'<div style="display:none;color:#808080;">到场:{ARRIVE_TIME}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp完成: {REPAIR_COMPLETE_TIME}'+
        		'</div>'+
        	'</div>';
        	Ext.getCmp('srfaultbymonth_detail_list').setItemTpl(trim);
        	Ext.getCmp('srfaultbymonth_detail_list').setScrollable(false);
        	
        	//日期查询
        	Ext.getCmp('btn_QUAN').setHeight(30);
        	Ext.getCmp('btn_sr_prevmonth').setHeight(30);
        	Ext.getCmp('btn_sr_nextmonth').setHeight(30);
        	Ext.getCmp('but_SRYM').setMargin('5 0 0 0');
    	};
    },
    
    srfaultbymonth_chart_itemtap: function(series,item, event,eOpts){
    	//alert('aaaaa');
		   myLoading.show();
		   var srfaultbymonth_list_tb_title = Ext.getCmp('srfaultbymonth_list_tb_title');
		   
		   var srcharbymonthStore = Ext.data.StoreManager.get("SRFaultByMonthChartStore"); 
		   if (!srcharbymonthStore) { 
			   srcharbymonthStore = Ext.create("Helcss.store.chart.fault.SRFaultByMonthChartStore"); 
		   }
		   var srfaultbymonth_de_Store = Ext.data.StoreManager.get("SRFaultByMonthDetailStore"); 
		   if (!srfaultbymonth_de_Store) { 
			   srfaultbymonth_de_Store = Ext.create("Helcss.store.chart.fault.SRFaultByMonthDetailStore"); 
		   }
		   var date = srcharbymonthStore.getAt(item.index).get('name');
		   var invocationData = {
		              adapter : 'HttpAdapter',  
		              procedure : 'getStories',
		              parameters : ['faultReportAction.do?method=toSearchFault_OneDay', "{'DATE_DAY':'"+ date +"','SRYM':'" + SRYM + "'}"]
		      }; 
		  	//Ext.Msg.wait('提示','正在处理数据，请稍候'); 
		  	WL.Client.invokeProcedure(invocationData, {
		          onSuccess : function (result) {
		          	var httpStatusCode = result.status;
		          	if (200 == httpStatusCode) {
		                  var invocationResult = result.invocationResult;
		                  var isSuccessful = invocationResult.isSuccessful;
		                  if (true == isSuccessful) {
		                  	var status = invocationResult.status.code;
		                  	if (status == 250) {
		                  		myLoading.hide();
		                          var result = invocationResult.content;
		                          // 转化成JSON对象
		                          var json = eval("("+ result +")");
		                          srfaultbymonth_de_Store.setData(json.items, this);
		                          srfaultbymonth_list_tb_title.setTitle("本月"+date+"日受信明细清单(<span style=''>宗数："+ json.count +"</span>)");
		                  	} else {
		                  		myLoading.hide();
		                  		alert("服务器出错！");
		                  	}
		                  } else {
		                	myLoading.hide();
		                  	alert("网络出错！");
		                  }
		              } else {
		            	myLoading.hide();
		              	alert("网络出错！");
		              }
		          },  
		          onFailure : function () {myLoading.hide();alert('ff');}
		      });
		},
		
		srfaultbymonth_chart_itemclick: function(series,item, event,eOpts){
			alert('aaa');
		}
    
});
