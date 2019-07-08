Ext.define('Helcss.view.chart.ranklist.RankListViewByYear', {
    extend: 'Ext.Panel',
    requires : ["Helcss.store.chart.ranklist.RankListByMonthDomainStore",//因为结构相同，所以使用bymonth的store
                "Helcss.store.chart.ranklist.RankListByMonthElevatorStore"//因为结构相同，所以使用bymonth的store
                ],
    id : 'ranklistbyyear_view',
    config: {
    	layout:'vbox',
    	items : [{
			xtype : 'container',
			id:'ranklistbyyear_view_RankListViewByYear',
			height: 1000,
			style: 'background: #efeff4;height:100%;',
			padding: '10 10 0 10',
			items : [{
				xtype: 'panel',
				id:'but_rl_QUAN',
				width: 160,
                height: 40,
                top: 10,
                right: 10,
                style: 'filter:alpha(opacity=80);opacity:0.6;',
                items: [
                    {
                        xtype: 'button',
                        id:'btn_rl_prevyear',
                        left: 0,
                        style: 'border:0px;',
                        width: 40,
                        iconCls: 'arrow_left',
                        text: ''
                    },
                    {
//                        xtype: 'label',
                        xtype: 'button',
                        id:'but_RLY',
                        html: '<span id="d_RLY" style="font-size:18px"></span>',
                        left: 30,
                        margin: '10 0 0 0',
                        width: 105,
                        baseCls:'x-label',
                        handler:function(){
                        	if(this.overlay!=null){
                        		this.overlay.destroy();
                        		this.overlay = null;
                        	}
                        	var optRLY = new Array();
                        	for(var i = -4;i<=0;i++){
                        		optRLY[i+4] = {text:(cdate.getFullYear()+i)+"年",value:(cdate.getFullYear()+i)};
                        	}
                        	this.overlay = Ext.Viewport.add({
             				   xtype:'formpanel',
             				   id:'ovl_RLY',
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
             				   width:160,
             				   height:130,
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
									            labelWidth:'47%',
									            options:optRLY,
									            defaultTabletPickerConfig:{
									            	width:160,
									            }
									        },
									    ]
									},
									{
									    xtype: 'button',
									    id: 'c_RLY',
									    margin: '15 auto',
									    width: '50%',
									    text: '确定',
									}

             				   ],
             				   scrollable:false
             			   });
                        this.overlay.showBy(Ext.getCmp('but_RLY'),'tc-bc');
                        var self_o_RLY = Ext.getCmp('o_RLY');
                        self_o_RLY.setValue(RLY);
                        
                        if(PDsystem==1){
                        	Ext.getCmp('ovl_RLY').setWidth(175);
                        };
                		
                        },
                    },
                    {
                        xtype: 'button',
                        id:'btn_rl_nextyear',
                        left: 115,
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
                id:'ranklistbyyear_view_container',
                margin: '0 0 0 0',
                style: 'float:left;width: 100%',
                height: 435,
                items: [
                    {
                        xtype: 'toolbar',
                        id: 'ranklistbyyear_domain_list_title',
                        docked: 'top',
                        title: '<b>困人多发地盘排行榜</b>',
                        height: 40,
                    },{
        		    	xtype : 'list',
        		    	id: 'ranklistbyyear_domain_list_head',
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
        		    	id: 'ranklistbyyear_domain_list',
        		    	height: 355,
        		    	margin: '1 0 0 0',
        		    	scrollable : true,
        		    	store : 'RankListByMonthDomainStore',//因为结构相同，所以使用bymonth的store
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
                id:'ranklistbyyear_elevator_container',
                margin: '15 0 0 0',
                padding: '0 0 0 0',
                height: 430,
                style: 'float:left; width: 100%',
                items: [
                    {
                    	id : 'ranklistbyyear_elevator_list_title',
                        xtype: 'titlebar',
                        docked: 'top',
                        margin: '0 0 0 0',
                        title: '<b>困人多发工号排行榜</b>',
                        height: 40,
                    },{
        		    	xtype : 'list',
        		    	id: 'ranklistbyyear_elevator_list_head',
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
        		    	id: 'ranklistbyyear_elevator_list',
        		    	height: 350,
                        style : 'width: 100%;',
                        margin: '1 0 0 0',
        		    	store : 'RankListByMonthElevatorStore',//因为结构相同，所以使用bymonth的store
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
    		Ext.getCmp('ranklistbyyear_view_container').setMargin('50px 0 0 0');
    		//困人多发地盘排行榜
    		Ext.getCmp('ranklistbyyear_domain_list_head').setStyle('width: 100%;font-size:9pt');
    		Ext.getCmp('ranklistbyyear_domain_list').setStyle('font-size:9pt');
    		Ext.getCmp('ranklistbyyear_domain_list').setScrollable(false);
    		var yearlist='<table width="100%" height="40px" border="0" cellspacing="0" cellpadding="0"><tr>'+
			'<td width="10%" height="40px" style="border-left:#e5c89d solid 1px;text-align:center">{SEQ}</td>'+
			'<td width="35%" height="40px" style="padding-left:10px;border-left:#e5c89d solid 1px;text-align:left">{COMPANY}</td>'+
			'<td width="30%" height="40px" style="padding-left:10px;border-left:#e5c89d solid 1px;text-align:left">{DOMAIN}</td>'+
			'<td width="25%" height="40px" style="border-left:#e5c89d solid 1px;border-right:#e5c89d solid 1px;text-align:center">{NUM}</td>'+
			'</tr></table>';
    		Ext.getCmp('ranklistbyyear_domain_list').setItemTpl(yearlist);
    		//困人多发工号排行榜
     		Ext.getCmp('ranklistbyyear_elevator_list_head').setStyle('width: 100%;font-size:9pt');
    		Ext.getCmp('ranklistbyyear_elevator_list').setStyle('font-size:9pt');
    		Ext.getCmp('ranklistbyyear_elevator_list').setScrollable(false);
    		var yesrlist2= '<table width="100%" height="40px" border="0" cellspacing="0" cellpadding="0"><tr>'+
			'<td width="10%" height="40px" style="border-left:#e5c89d solid 1px;text-align:center">{SEQ}</td>'+
			'<td width="23%" height="40px" style="padding-left:10px;border-left:#e5c89d solid 1px;text-align:left">{ELE_NO}</td>'+
			'<td width="12%" height="40px" style="border-left:#e5c89d solid 1px;text-align:center">{NUM}</td>'+
			'<td width="30%" height="40px" style="padding-left:10px;border-left:#e5c89d solid 1px;text-align:left">{COMPANY}</td>'+
			'<td width="25%" height="40px" style="padding-left:10px;border-left:#e5c89d solid 1px;border-right:#e5c89d solid 1px;text-align:left">{DOMAIN}</td>'+
			'</tr></table>';
    		Ext.getCmp('ranklistbyyear_elevator_list').setItemTpl(yesrlist2);
    		
    		//日期查询
        	Ext.getCmp('but_rl_QUAN').setHeight(30);
        	Ext.getCmp('btn_rl_prevyear').setHeight(30);
        	Ext.getCmp('btn_rl_nextyear').setHeight(30);
        	Ext.getCmp('but_RLY').setMargin('5 0 0 0');
    	};
    }

});
