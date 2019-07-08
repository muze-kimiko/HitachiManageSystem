
/* JavaScript content from app/view/chart/fault/FaultView.js in folder common */
Ext.define('Helcss.view.chart.fault.FaultView', {
    extend: 'Ext.Panel',
    requires : ["Helcss.store.chart.fault.FaultChartStore",
                "Helcss.store.chart.fault.FaultDetailStore",
                "Helcss.store.chart.fault.FaultStore"],
    id : 'fault_view',
    config: {
    	title : '<b>当月受信</b>',
    	style: 'background-color:#efeff4;',
    	items : [{
			xtype : 'panel',
			//layout : 'vbox',
			style: 'background: #efeff4;height:100%;',
			padding: '10 10 0 10',
			items : [{
				style : 'height : 50%',
				id : 'fault_chart',
		    	xtype : 'chart',
		    	background: "none",
	            store: 'FaultChartStore',
	            animate: true,
	            // 菜单
	            interactions: ['panzoom','itemhighlight'],
	            /**/
	            listeners: { 
	                	   itemtap: function(series,item, e){
	                		   myLoading.show();
	                		   var fault_list_tb_title = Ext.getCmp('fault_list_tb_title');
	                		   
	                		   var charStore = Ext.data.StoreManager.get("FaultChartStore"); 
	                		   if (!charStore) { 
	                			   charStore = Ext.create("Helcss.store.chart.fault.FaultChartStore"); 
	                		   }
	                			  
	                		   var fault_de_Store = Ext.data.StoreManager.get("FaultDetailStore"); 
	                		   if (!fault_de_Store) { 
	                			   fault_de_Store = Ext.create("Helcss.store.chart.fault.FaultDetailStore"); 
	                		   }
	                		   var date = charStore.getAt(item.index).get('name');
	                		   var invocationData = {
	                		              adapter : 'HttpAdapter',  
	                		              procedure : 'getStories',
	                		              parameters : ['faultReportAction.do?method=toSearchFault_OneDay', "{'DATE_DAY':'"+ date +"'}"]
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
	                		                          fault_de_Store.setData(json.items, this);
	                		                          fault_list_tb_title.setTitle("<h2>本月"+date+"日受信明细清单(宗数:"+ json.count +")</h2>");
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
	 	                    xField: 'name',
	 	                    yField: 'value',
	 	                    title: '线性视图',
	 	                    style: {
	 	                        smooth: true,// 是否顺滑
	 	                        stroke: '#115fa6',
	 	                        lineWidth: 3,
	 	                        shadowColor: 'rgba(0,0,0,0.7)',// 阴影样式
	 	                        shadowBlur: 10,
	 	                        shadowOffsetX: 3,
	 	                        shadowOffsetY: 3
	 	                    },
	 	                    highlightCfg: {
	 	                        scale: 2
	 	                    },
	 	                    marker: { // 每一个点的样式
	 	                        type: 'circle',
	 	                        stroke: '#0d1f96',
	 	                        fill: '#115fa6',
	 	                        lineWidth: 2,
	 	                        radius: 4,
	 	                        shadowColor: 'rgba(0,0,0,0.7)',
	 	                        shadowBlur: 10,
	 	                        shadowOffsetX: 3,
	 	                        shadowOffsetY: 3,
	 	                        fx: {duration: 300}
	 	                    },
	 	                },
	 	                /*,
	 	               {
	 	                    type: 'bar',
	 	                    xField: 'name',
	 	                    yField: ['value'],
	 	                    title: ['Bar'],
	 	                    style: {
	 	                        maxBarWidth: 15,
	 	                        lineWidth: 1.5,
	 	                        fill: "#a61120",
	 	                        stroke: 'black',
	 	                        shadowColor: 'rgba(0,0,0,0.7)',
	 	                        shadowBlur: 10,
	 	                        shadowOffsetX: 3,
	 	                        shadowOffsetY: 3
	 	                    }
	 	                }
	 	                */
	 	           ],
	 	           axes: [
	 		                {// Y轴
	 		                    type: 'numeric',
	 		                    position: 'left',
	 		                    title : '宗数(单位:宗)',
	 		                    grid: {
	 		                        odd: {
	 		                            fill: '#fafafa'
	 		                        }
	 		                    },
	 		                   //visibleRange: [0, 0.8],
	 		                 /*   maxZoom: 1,//最大收和缩
	 		                    minZoom: 1,*/
	 		                    majorTickSteps: 50,
	 		                    style: {
	 		                        axisLine: false,
//	 		                        estStepSize: 20,// Y每一格的区分
	 		                        stroke: '#ddd',
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
	 		                        estStepSize: 20,
	 		                        stroke: '#999'
	 		                    }
	 		                }
	 		            ]
		    },{
                xtype: 'panel',
                margin: '10 0 0 0',
                style: 'float:left;width: 35%',
                height: 425,
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        height: 40,
                        title: '<h2>受信统计报表<h2>'
                    },{
        		    	xtype : 'list',
        		    	id: 'fault_list',
        		    	scrollable : false,
        		    	height: 385,
        		    	store : 'FaultStore',
        				itemTpl : '<div>{TEXTNAME}<span style="">{TEXTRATE}</span><span style="float:right;color:#808080;">{VALUE}</span></div>',
        				emptyText : '<div class="chat-list-empty-text">没有找到记录</div>'
        			}
                ]
            },{
                xtype: 'panel',
                margin: '10 0 0 0',
                padding: '0 0 0 10',
                style: 'float:left; width: 65%',
                height: 425,
                items: [
                    {
                    	id : 'fault_list_tb_title',
                        xtype: 'titlebar',
                        docked: 'top',
                        margin: '0 0 0 10',
                        height: 40,
                        title: '<h2>受信明细清单</h2>'
                    },{
        		    	xtype : 'list',
        		    	height: 385,
        		    	id: 'fault_detail_list',
                        style : 'width: 100%;',
        		    	store : 'FaultDetailStore',
        				itemTpl : '<div><h3>{SR_FAULT_DOMAIN}<span style="margin-left:10px;">{SR_CREATED_TIME}</span></h3>'+
        				'<div><font color="#808080">{SR_ABSTRACT}</font><font style="float:right;color:red;">{SR_BOXUP}</font></div>'+
        				'<div style="display:none;color:#808080;">到场:{ARRIVE_TIME}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp完成:{REPAIR_COMPLETE_TIME}</div></div>',
        				emptyText : '<div class="chat-list-empty-text">没有找到记录</div>'
        			}
                ]
            }]
		}]
    },
    
    initialize: function() {
    	//alert('我在FaultView页面');
    }
    
});
