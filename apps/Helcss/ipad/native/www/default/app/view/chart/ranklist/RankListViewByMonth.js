
/* JavaScript content from app/view/chart/ranklist/RankListViewByMonth.js in folder common */
Ext.define('Helcss.view.chart.ranklist.RankListViewByMonth', {
    extend: 'Ext.Panel',
    requires : ["Helcss.store.chart.ranklist.RankListByMonthDomainStore",
                "Helcss.store.chart.ranklist.RankListByMonthElevatorStore"
                ],
    id : 'ranklistbymonth_view',
    config: {
    	layout:'vbox',
    	items : [{
			xtype : 'container',
			id:'ranklistbymonth_view_container',
			height: 1000,
			style: 'background: #efeff4;height:100%;',
			padding: '10 10 0 10',
			items : [{
				xtype: 'panel',
				id:'btn_rl_QUAN',
				width: 200,
                height: 40,
                top: 10,
                right: 10,
                style: 'filter:alpha(opacity=80);opacity:0.6;',
                items: [
                    {
                        xtype: 'button',
                        id:'btn_rl_prevmonth',
                        left: 0,
                        style: 'border:0px;',
                        width: 40,
                        iconCls: 'arrow_left',
                        text: ''
                    },
                    {
//                        xtype: 'label',
                        xtype: 'button',
                        id:'but_RLYM',
                        html: '<span id="d_RLYM" style="font-size:18px"></span>',
                        left: 50,
                        margin: '10 0 0 0',
                        width: 105,
                        baseCls:'x-label',
                        handler:function(){
                        	if(this.overlay!=null){
                        		this.overlay.destroy();
                        		this.overlay = null;
                        	}
                        	var optRLYM = new Array();
                        	for(var i = -4;i<=0;i++){
                        		optRLYM[i+4] = {text:(cdate.getFullYear()+i)+"年",value:(cdate.getFullYear()+i)};
                        	}
                        	this.overlay = Ext.Viewport.add({
             				   xtype:'formpanel',
             				   id:'ovl_RLYM',
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
             				   height:180,
//             				   styleHtmlContent:true,
             				   items:[
									{
									    xtype: 'fieldset',
									    border:0,
									    margin: '7 7 auto 7',
									    items: [
									        {
									            xtype: 'selectfield',
									            id: 'o_RLY',
									            label: '年度',
									            labelWidth:'40%',
									            options:optRLYM,
									            defaultTabletPickerConfig:{
									            	width:200,
									            }
									        },
									        {
									            xtype: 'selectfield',
									            id: 'o_RLM',
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
									    id: 'c_RLYM',
									    margin: '15 auto',
									    width: '50%',
									    text: '确定',
									}

             				   ],
             				   scrollable:false
             			   });
                        this.overlay.showBy(Ext.getCmp('but_RLYM'),'tc-bc');
                        var self_o_RLY = Ext.getCmp('o_RLY');
                		var ops_o_RLY = RLYM.substring(0, 4);
                		self_o_RLY.setValue(ops_o_RLY);
                		var self_o_RLM = Ext.getCmp('o_RLM');
                		var ops_o_RLM = RLYM.substring(5, 7);
                		self_o_RLM.setValue(ops_o_RLM);
                        },
                    },
                    {
                        xtype: 'button',
                        id:'btn_rl_nextmonth',
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
                xtype: 'container',
                id:'ranklistbymonth_domain_container',
                margin: '0 0 0 0',
                style: 'float:left;width: 100%',
                height: 435,
                items: [
                    {
                        xtype: 'toolbar',
                        id: 'ranklistbymonth_domain_list_title',
                        docked: 'top',
                        title: '<b>困人多发地盘排行榜</b>',
                        height: 40,
                    },{
        		    	xtype : 'list',
        		    	id: 'ranklistbymonth_domain_list_head',
        		    	height: 40,
                        style : 'width: 100%;',
                        scrollable : false,
                        data : [{'SEQ':'排名','COMPANY':'分公司','DOMAIN':'地盘名称','NUM':'困人宗数'}],
                        itemTpl : '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>'+
    							'<td width="10%" style="border-left:#e5c89d solid 1px;text-align:center">{SEQ}</td>'+
    							'<td width="35%" style="border-left:#e5c89d solid 1px;text-align:center">{COMPANY}</td>'+
    							'<td width="30%" style="border-left:#e5c89d solid 1px;text-align:center">{DOMAIN}</td>'+
    							'<td width="25%" style="border-left:#e5c89d solid 1px;border-right:#e5c89d solid 1px;text-align:center">{NUM}</td>'+
    							'</tr></table>',
    					emptyText : '<div class="chat-list-empty-text">没有找到记录</div>'
        			},{
        		    	xtype : 'list',
        		    	id: 'ranklistbymonth_domain_list',
        		    	height: 355,
        		    	margin: '1 0 0 0',
        		    	scrollable : true,
        		    	store : 'RankListByMonthDomainStore',
        				itemTpl : '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>'+
		    					'<td width="10%" style="border-left:#e5c89d solid 1px;text-align:center">{SEQ}</td>'+
		    					'<td width="35%" style="padding-left:10px;border-left:#e5c89d solid 1px;text-align:left">{COMPANY}</td>'+
		    					'<td width="30%" style="padding-left:10px;border-left:#e5c89d solid 1px;text-align:left">{DOMAIN}</td>'+
		    					'<td width="25%" style="border-left:#e5c89d solid 1px;border-right:#e5c89d solid 1px;text-align:center">{NUM}</td>'+
		    					'</tr></table>',
        				emptyText : '<div class="chat-list-empty-text">没有找到记录</div>'
        			}
                ]
            },{
                xtype: 'container',
                id:'ranklistbymonth_elevator_container',
                margin: '15 0 0 0',
                padding: '0 0 0 0',
                height: 430,
                style: 'float:left; width: 100%',
                items: [
                    {
                    	id : 'ranklistbymonth_elevator_list_title',
                        xtype: 'titlebar',
                        docked: 'top',
                        margin: '0 0 0 0',
                        title: '<b>困人多发工号排行榜</b>',
                        height: 40,
                    },{
        		    	xtype : 'list',
        		    	id: 'ranklistbymonth_elevator_list_head',
        		    	height: 40,
                        style : 'width: 100%;',
                        scrollable : false,
                        data : [{'SEQ':'排名','ELE_NO':'工号','NUM':'困人宗数','COMPANY':'分公司','DOMAIN':'地盘名称'}],
        				itemTpl : '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>'+
    							'<td width="10%" style="border-left:#e5c89d solid 1px;text-align:center">{SEQ}</td>'+
    							'<td width="23%" style="border-left:#e5c89d solid 1px;text-align:center">{ELE_NO}</td>'+
    							'<td width="12%" style="border-left:#e5c89d solid 1px;text-align:center">{NUM}</td>'+
    							'<td width="30%" style="border-left:#e5c89d solid 1px;text-align:center">{COMPANY}</td>'+
    							'<td width="25%" style="border-left:#e5c89d solid 1px;border-right:#e5c89d solid 1px;text-align:center">{DOMAIN}</td>'+
    							'</tr></table>',
        				emptyText : '<div class="chat-list-empty-text">没有找到记录</div>'
        			},{
        		    	xtype : 'list',
        		    	id: 'ranklistbymonth_elevator_list',
        		    	height: 350,
                        style : 'width: 100%;',
                        margin: '1 0 0 0',
        		    	store : 'RankListByMonthElevatorStore',
        				itemTpl : '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>'+
    							'<td width="10%" style="border-left:#e5c89d solid 1px;text-align:center">{SEQ}</td>'+
    							'<td width="23%" style="padding-left:10px;border-left:#e5c89d solid 1px;text-align:left">{ELE_NO}</td>'+
    							'<td width="12%" style="border-left:#e5c89d solid 1px;text-align:center">{NUM}</td>'+
    							'<td width="30%" style="padding-left:10px;border-left:#e5c89d solid 1px;text-align:left">{COMPANY}</td>'+
    							'<td width="25%" style="padding-left:10px;border-left:#e5c89d solid 1px;border-right:#e5c89d solid 1px;text-align:left">{DOMAIN}</td>'+
    							'</tr></table>',
        				emptyText : '<div class="chat-list-empty-text">没有找到记录</div>'
        			}
                ]
            },]
		}]
    },
    
    initialize: function() {
    	if(PDsystem==1){
    		//困人多发地盘排行榜
    		Ext.getCmp('ranklistbymonth_domain_container').setMargin('50px 0 0 0');
    		Ext.getCmp('ranklistbymonth_domain_list_head').setStyle('width: 100%;font-size:9pt');
    		Ext.getCmp('ranklistbymonth_domain_list').setStyle('font-size:9pt');
    		Ext.getCmp('ranklistbymonth_domain_list').setScrollable(false);
    		var data='<table width="100%" height="40px" border="0" cellspacing="0" cellpadding="0"><tr>'+
			'<td width="10%" height="40px" style="border-left:#e5c89d solid 1px;text-align:center">{SEQ}</td>'+
			'<td width="35%" height="40px" style="padding-left:10px;border-left:#e5c89d solid 1px;text-align:left">{COMPANY}</td>'+
			'<td width="30%" height="40px" style="padding-left:10px;border-left:#e5c89d solid 1px;text-align:left">{DOMAIN}</td>'+
			'<td width="25%" height="40px" style="border-left:#e5c89d solid 1px;border-right:#e5c89d solid 1px;text-align:center">{NUM}</td>'+
			'</tr></table>';
    		Ext.getCmp('ranklistbymonth_domain_list').setItemTpl(data);
    		
    		//困人多发工号排行榜
     		Ext.getCmp('ranklistbymonth_elevator_list_head').setStyle('width: 100%;font-size:9pt');
    		Ext.getCmp('ranklistbymonth_elevator_list').setStyle('font-size:9pt');
    		Ext.getCmp('ranklistbymonth_elevator_list').setScrollable(false);
    		var data2='<table width="100%" height="40px" border="0" cellspacing="0" cellpadding="0"><tr>'+
			'<td width="10%" height="40px" style="border-left:#e5c89d solid 1px;text-align:center">{SEQ}</td>'+
			'<td width="23%" height="40px" style="padding-left:10px;border-left:#e5c89d solid 1px;text-align:left">{ELE_NO}</td>'+
			'<td width="12%" height="40px" style="border-left:#e5c89d solid 1px;text-align:center">{NUM}</td>'+
			'<td width="30%" height="40px" style="padding-left:10px;border-left:#e5c89d solid 1px;text-align:left">{COMPANY}</td>'+
			'<td width="25%" height="40px" style="padding-left:10px;border-left:#e5c89d solid 1px;border-right:#e5c89d solid 1px;text-align:left">{DOMAIN}</td>'+
			'</tr></table>';
    		Ext.getCmp('ranklistbymonth_elevator_list').setItemTpl(data2);
    		
    		//日期查询
        	Ext.getCmp('btn_rl_QUAN').setHeight(30);
        	Ext.getCmp('btn_rl_prevmonth').setHeight(30);
        	Ext.getCmp('btn_rl_nextmonth').setHeight(30);
        	Ext.getCmp('but_RLYM').setMargin('5 0 0 0');
    	};
    }

});
