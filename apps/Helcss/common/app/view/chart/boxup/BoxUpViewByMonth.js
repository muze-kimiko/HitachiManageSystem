Ext.define('Helcss.view.chart.boxup.BoxUpViewByMonth', {
    extend: 'Ext.Panel',
    requires : ["Helcss.store.chart.boxup.BoxUpByMonthChartStore",
                "Helcss.store.chart.boxup.BoxUpByMonthDetailStore",
                "Helcss.store.chart.boxup.BoxUpByMonthStore"],
    id : 'boxupbymonth_view',
    config: {
    	title : '<b style="font-size:18pt;">当月困人</b>',
    	style: 'background-color:#efeff4;',
    	items : [{
			xtype : 'container',
			id:'boxupbymonth_view_container',
			height: 1000,
			style: 'background: #efeff4;height:100%;',
			padding: '10 10 0 10',
			items : [{
				xtype: 'panel',
				id:'but_QUAN',
				width: 200,
                height: 40,
                top: 0,
                right: 20,
                style: 'filter:alpha(opacity=80);opacity:0.6;',
                items: [
                    {
                        xtype: 'button',
                        id:'btn_bu_prevmonth',
                        left: 0,
                        style: 'border:0px;',
                        width: 40,
                        iconCls: 'arrow_left',
                        text: ''
                    },
                    {
//                        xtype: 'label',
                        xtype: 'button',
                        id:'but_BUYM',
                        html: '<span id="d_BUYM" style="font-size:18px"></span>',
                        left: 50,
                        margin: '10 0 0 0',
                        width: 105,
                        baseCls:'x-label',
                        handler:function(){
                        	if(this.overlay!=null){
                        		this.overlay.destroy();
                        		this.overlay = null;
                        	}
                        	var optBUYM = new Array();
                        	for(var i = -4;i<=0;i++){
                        		optBUYM[i+4] = {text:(cdate.getFullYear()+i)+"年",value:(cdate.getFullYear()+i)};
                        	}
                        	this.overlay = Ext.Viewport.add({
             				   xtype:'formpanel',
             				   id:'ovl_BUYM',
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
									            id: 'o_BUY',
									            label: '年度',
									            labelWidth:'40%',
									            options:optBUYM,
									            defaultTabletPickerConfig:{
									            	width:200,
									            }
									        },
									        {
									            xtype: 'selectfield',
									            id: 'o_BUM',
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
									    id: 'c_BUYM',
									    margin: '15 auto',
									    width: '50%',
									    text: '确定',
									}

             				   ],
             				   scrollable:false
             			   });
                        this.overlay.showBy(Ext.getCmp('but_BUYM'),'tc-bc');
                        var self_o_BUY = Ext.getCmp('o_BUY');
                		var ops_o_BUY = BUYM.substring(0, 4);
                		self_o_BUY.setValue(ops_o_BUY);
                		var self_o_BUM = Ext.getCmp('o_BUM');
                		var ops_o_BUM = BUYM.substring(5, 7);
                		self_o_BUM.setValue(ops_o_BUM);
                        },
                    },
                    {
                        xtype: 'button',
                        id:'btn_bu_nextmonth',
                        left: 155,
                        right: 0,
                        style: 'border:0px;',
                        width: 40,
                        iconCls: 'arrow_right',
                        text: ''
                    }
                ]
			}
			,{
				height:445,
//				style : 'height : 50%',
				id : 'boxupbymonth_chart',
		    	xtype : 'chart',
		    	background: "none",
	            store: 'BoxUpByMonthChartStore',
	            animate: true,
	            // 菜单
	            interactions: ['panzoom','itemhighlight'],
	            listeners: { 
	                	   itemtap: function(series,item, e){
	                		   myLoading.show();
	                		   var boxupbymonth_list_tb_title = Ext.getCmp('boxupbymonth_list_tb_title');
	                		   
	                		   var boxupbymonthStore = Ext.data.StoreManager.get("BoxUpByMonthChartStore"); 
	                		   if (!boxupbymonthStore) { 
	                			   boxupbymonthStore = Ext.create("Helcss.store.chart.boxup.BoxUpByMonthChartStore"); 
	                		   }
	                			  
	                		   var boxupbymonth_de_Store = Ext.data.StoreManager.get("BoxUpByMonthDetailStore"); 
	                		   if (!boxupbymonth_de_Store) { 
	                			   boxupbymonth_de_Store = Ext.create("Helcss.store.chart.boxup.BoxUpByMonthDetailStore"); 
	                		   }
	                		   var date = boxupbymonthStore.getAt(item.index).get('name');
	                		   var invocationData = {
	                		              adapter : 'HttpAdapter',  
	                		              procedure : 'getStories',
	                		              parameters : ['faultReportAction.do?method=toSearchBoxUp_OneDay', "{'DATE_DAY':'"+ date +"','BUYM':'" + BUYM + "'}"]
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
	                		                          boxupbymonth_de_Store.setData(json.items, this);
	                		                          boxupbymonth_list_tb_title.setTitle("本月"+date+"日困人明细清单(<span style=''>宗数："+ json.count +"</span>)");
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
	 	                   id : 'my_boxupbymonth',
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
//	 	                        stroke: '#0d1f96',
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
	 		                        estStepSize: 20,
	 		                        stroke: '#999'
	 		                    }
	 		                }
	 		            ]
		    },{
                xtype: 'container',
                margin: '10 0 0 0',
                style: 'float:left;width: 40%',
                height: 425,
                items: [
                    {
                        xtype: 'toolbar',
                        id:'boxupbymonth_view_KRTJBB',
                        docked: 'top',
                        title: '困人统计报表',
                        height: 40,
                    },{
        		    	xtype : 'list',
        		    	id: 'boxupbymonth_list',
        		    	height: 385,
        		    	scrollable : false,
        		    	store : 'BoxUpByMonthStore',
        				itemTpl : '<div>{TEXTNAME}<span style="">{TEXTRATE}</span><span style="float:right;color:#808080;">{VALUE}</span></div>',
        				emptyText : '<div class="chat-list-empty-text">没有找到记录</div>'
        			}
                ]
            },{
                xtype: 'container',
                id:'boxupbymonth_list_tb_container',
                margin: '10 0 0 0',
                padding: '0 0 0 10',
                height: 425,
                style: 'float:left; width: 60%',
                items: [
                    {
                    	id : 'boxupbymonth_list_tb_title',
                        xtype: 'titlebar',
                        docked: 'top',
                        margin: '0 0 0 10',
                        title: '困人明细清单',
                        height: 40,
                    },{
        		    	xtype : 'list',
        		    	id: 'boxupbymonth_detail_list',
        		    	height: 385,
                        style : 'width: 100%;',
        		    	store : 'BoxUpByMonthDetailStore',
        				itemTpl : '<div><h1 style="font-size:22px;">{SR_FAULT_DOMAIN}<span style="margin-left:10px;font-size:16px;color:#808080;">{DB_LAST_UPD_SRC}</span></h1>'+
        				'<div>{SR_ABSTRACT}<font style="display:none;float:right;color:red;">困人</font></div>'+
        				'<div style="display:none;color:#808080;">到场:{ARRIVE_TIME}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp完成: {REPAIR_COMPLETE_TIME}</div></div>',
        				emptyText : '<div class="chat-list-empty-text">没有找到记录</div>'
        			}
                ]
            }]
		}]
    },
    
    initialize: function() {
    	if(PDsystem==1){
    		//线性图
    		Ext.getCmp('boxupbymonth_chart').setMargin('40px 0 0 0');
        	Ext.getCmp("boxupbymonth_chart").setHeight(255);
        	Ext.getCmp("boxupbymonth_chart").setWidth('95%');
        	//return;
        	//困人统计报表
        	Ext.getCmp('boxupbymonth_view_KRTJBB').setStyle('font-size:9pt');
        	Ext.getCmp('boxupbymonth_list').setStyle('font-size:9pt');
        	//困人明细清单
        	Ext.getCmp('boxupbymonth_list_tb_title').setStyle('font-size:9pt');
        	Ext.getCmp('boxupbymonth_detail_list').setStyle('width: 100%;font-size:9pt');
        	var trim=
        	'<div>'+
        		'<h1 style="font-size:9pt;">EE{SR_FAULT_DOMAIN}'+
        			'<span style="margin-left:10px;font-size:9pt;color:#808080;">FF{DB_LAST_UPD_SRC}</span>'+
        		'</h1>'+
        		'<div>GG{SR_ABSTRACT}'+
        			'<font style="display:none;float:right;color:red;">困人</font>'+
        		'</div>'+
        		'<div style="display:none;color:#808080;">到场:{ARRIVE_TIME}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp完成: {REPAIR_COMPLETE_TIME}</div>'+
        	'</div>';
        	Ext.getCmp('boxupbymonth_detail_list').setItemTpl(trim);
        	Ext.getCmp('boxupbymonth_detail_list').setScrollable(false);
        	
        	//日期查询
        	Ext.getCmp('but_QUAN').setHeight(30);
        	Ext.getCmp('btn_bu_prevmonth').setHeight(30);
        	Ext.getCmp('btn_bu_nextmonth').setHeight(30);
        	Ext.getCmp('but_BUYM').setMargin('5 0 0 0');
        	
    	};
    }

});
