
/* JavaScript content from app/view/chart/boxup/BoxUpView.js in folder common */
Ext.define('Helcss.view.chart.boxup.BoxUpView', {
    extend: 'Ext.Panel',
    requires : ["Helcss.store.chart.boxup.BoxUpChartStore",
                "Helcss.store.chart.boxup.BoxUpDetailStore",
                "Helcss.store.chart.boxup.BoxUpStore"],
    id : 'boxup_view',
    config: {
    	title : '<b>当月困人</b>',
    	style: 'background-color:#efeff4;',
    	items : [{
			xtype : 'container',
			style: 'background: #efeff4;height:100%;',
			padding: '10 10 0 10',
			items : [{
				style : 'height : 50%',
				id : 'boxup_chart',
		    	xtype : 'chart',
		    	background: "none",
	            store: 'BoxUpChartStore',
	            animate: true,
	            // 菜单
	            interactions: ['panzoom','itemhighlight'],
	            listeners: { 
	                	   itemtap: function(series,item, e){
	                		   myLoading.show();
	                		   var boxup_list_tb_title = Ext.getCmp('boxup_list_tb_title');
	                		   
	                		   var boxupStore = Ext.data.StoreManager.get("BoxUpChartStore"); 
	                		   if (!boxupStore) { 
	                			   boxupStore = Ext.create("Helcss.store.chart.boxup.BoxUpChartStore"); 
	                		   }
	                			  
	                		   var boxup_de_Store = Ext.data.StoreManager.get("BoxUpDetailStore"); 
	                		   if (!boxup_de_Store) { 
	                			   boxup_de_Store = Ext.create("Helcss.store.chart.boxup.BoxUpDetailStore"); 
	                		   }
	                		   var date = boxupStore.getAt(item.index).get('name');
	                		   var invocationData = {
	                		              adapter : 'HttpAdapter',  
	                		              procedure : 'getStories',
	                		              parameters : ['faultReportAction.do?method=toSearchBoxUp_OneDay', "{'DATE_DAY':'"+ date +"'}"]
	                		      }; 
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
	                		                          boxup_de_Store.setData(json.items, this);
	                		                          boxup_list_tb_title.setTitle("<h2>本月"+date+"日困人明细清单(宗数:"+ json.count +")</h2>");
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
	 	                   id : 'my_boxup',
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
	 		                        estStepSize: 20,
	 		                        stroke: '#999'
	 		                    }
	 		                }
	 		            ]
		    },{
                xtype: 'container',
                margin: '10 0 0 0',
                style: 'float:left;width: 35%',
                height: 425,
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        title: '<h1>困人统计报表</h1>',
                        height: 40,
                    },{
        		    	xtype : 'list',
        		    	id: 'boxup_list',
        		    	height: 385,
        		    	scrollable : false,
        		    	store : 'BoxUpStore',
        				itemTpl : '<div>{TEXTNAME}<span style="">{TEXTRATE}</span><span style="float:right;color:#808080;">{VALUE}</span></div>',
        				emptyText : '<div class="chat-list-empty-text">没有找到记录</div>'
        			}
                ]
            },{
                xtype: 'container',
                margin: '10 0 0 0',
                padding: '0 0 0 10',
                height: 425,
                style: 'float:left; width: 65%',
                items: [
                    {
                    	id : 'boxup_list_tb_title',
                        xtype: 'titlebar',
                        docked: 'top',
                        margin: '0 0 0 10',
                        title: '<h1>困人明细清单</h1>',
                        height: 40,
                    },{
        		    	xtype : 'list',
        		    	id: 'boxup_detail_list',
        		    	height: 385,
                        style : 'width: 100%;',
        		    	store : 'BoxUpDetailStore',
        				itemTpl : '<div><h2>{SR_FAULT_DOMAIN}<span style="margin-left:10px;">{DB_LAST_UPD_SRC}</span></h2>'+
        				'<div><font color="#808080">{SR_ABSTRACT}</font><font style="display:none;float:right;color:red;">困人</font></div>'+
        				'<div style="display:none;color:#808080;">到场:{ARRIVE_TIME}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp完成: {REPAIR_COMPLETE_TIME}</div></div>',
        				emptyText : '<div class="chat-list-empty-text">没有找到记录</div>'
        			}
                ]
            }]
		}]
    },
    
    initialize: function() {
    }

});
