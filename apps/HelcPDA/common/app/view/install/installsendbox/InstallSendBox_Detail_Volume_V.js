Ext.define('HelcPDA.view.install.installsendbox.InstallSendBox_Detail_Volume_V', {
    extend: 'Ext.Panel',
    id:'instsb_detail_Volume_view',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.DatePicker',
        'Ext.picker.Date'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '箱头发货详批量',
                items: [
                    {
                        xtype: 'button',
                        ui: 'back',
                        text: '返回',
                        id: 'btn_instsb_detailback'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'btn_vol_commit',
                        text: '提交'
                    }
                ]
            },{
                xtype: 'container',
                layout: 'vbox',
                flex: 1,
                items: [
                    {
                        xtype: 'formpanel',
                        flex: 1,
                        items: [
                            {
                                xtype: 'fieldset',
                                instructions: '<div id="instsb_vol_plain" style="margin:0 auto;width:92%;text-align:left;"></div>',
                                title: '',
                                items: [
                                    {
                                        xtype: 'selectfield',
                                        label: '处理状况',
                                        labelWidth: '50%',
                                        placeHolder: '请选择',
                                        id: 'sf_instsb_DATA_STATUS',
                                        options: [
                                            {
                                                text: '下达',
                                                value: 'ISSUED'
                                            },
                                            {
                                                text: '不处理',
                                                value: 'IGNORED'
                                            }
                                        ],
                                        usePicker: 'auto'
                                    },{
                                    	xtype: 'panel',
                                    	id: 'pnl_value',
                                    	items: [{
                                            xtype: 'selectfield',
                                            label: '工程例外原因',
                                            labelWidth: '50%',
                                            placeHolder: '请选择',
                                            id:'sf_instsb_ENG_REASONS',
                                            options: [
                                                {
                                                    text: '无',
                                                    value: '0'
                                                },
                                                {
                                                    text: '分批',
                                                    value: 'BATCH'
                                                },
                                                {
                                                    text: '其他',
                                                    value: 'OTHERS'
                                                }
                                            ],
                                            usePicker: 'auto'
                                        },{
                                            xtype:'panel',
                                            layout:'hbox',
                                            style: 'width:100%;',
                                            items:[/*{
                                                xtype: 'datepickerfield',
                                                label: '要求运抵日期',
                                                labelWidth: '60%',
                                                width: '80%',
                                                placeHolder: '请输入日期',
                                                id: 'dpf_DEMAND_ARRIVE_DATE',
                                                dateFormat: 'Y-m-d',
                                                picker: {
                                                    slotOrder: [
                                                        'year',
                                                        'month',
                                                        'day'
                                                    ],
                                                    doneButton: '完成',
                                                    cancelButton: '取消'
                                                }
                                            }*/{
                                                xtype: 'textfield',
                                                label: '要求运抵日期',
                                                labelWidth: '60%',
                                                width: '80%',
                                                placeHolder: '请输入日期',
                                                id: 'dpf_DEMAND_ARRIVE_DATE',
                                                readOnly:true,
                                                disabled:false,
                                                listeners:{
                                                	focus:function(){
                                                		initDate1('dpf_DEMAND_ARRIVE_DATE','运抵日期');
                                                	}
                                                }
                                            },{
                                        	xtype:'button',
                                            width:'20%',
                                            text: '最快',
                                            id:'btn_instsb_suretime',
                                            listeners:{
                                            	tap:function() {
                                            		var value = Ext.getCmp('tf_instsb_FAST_ARRIVE_DATE').getValue();
                                            		var DEMAND_ARRIVE_DATE_TIME = new Date(value);
                                            		Ext.getCmp('dpf_DEMAND_ARRIVE_DATE').setValue(value);
                                            	}
                                            }
                                       }]
                                   },/*{
                                            xtype: 'datepickerfield',
                                            label: '要求日期',
                                            labelWidth: '40%',
                                            placeHolder: '请输入要求抵达日期',
                                            id: 'dpf_DEMAND_ARRIVE_DATE',
                                            dateFormat: 'Y-m-d',
                                            picker: {
                                                slotOrder: [
                                                    'year',
                                                    'month',
                                                    'day'
                                                ],
                                                doneButton: '完成',
                                                cancelButton: '取消'
                                            }
                                        },*/
                                        {
                                            xtype: 'textfield',
                                            id: 'tf_instsb_FAST_ARRIVE_DATE',
                                            label: '最快日期',
                                            labelWidth: '50%',
                                            readOnly: true
                                        },{
                            				xtype:'hiddenfield',
                            				id:'hfinstsb_most_new_time',
                            			},{
                            				xtype:'hiddenfield',
                            				id:'hfinstsb_targettime',
                            			},{
                            				xtype:'hiddenfield',
                            				id:'hfinstsb_value_id',
                            			},{
                            				xtype:'hiddenfield',
                            				id:'hf_instsb_DAYS',
                            			},{
                            				xtype:'hiddenfield',
                            				id:'hf_instsb_ELV_NEED_BY_DATE',
                            			},{
                            				xtype:'hiddenfield',
                            				id:'hf_instsb_shows',
                            			},{
                            				xtype:'hiddenfield',
                            				id:'hf_instsb_values',
                            			}]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    
    initData: function(boxNames,tid) {
    	Ext.getCmp('sf_instsb_DATA_STATUS').setValue('ISSUED');
		Ext.getCmp('sf_instsb_ENG_REASONS').setValue('0');
		Ext.getCmp('dpf_DEMAND_ARRIVE_DATE').setValue('');
		Ext.getCmp('tf_instsb_FAST_ARRIVE_DATE').setValue('');
		var shows = [];
		var values = [];
		// 查找value
		var selection_find = {tcode:'INSTALL_VALUE_SENDBOX',tid:parseInt(tid.substring(3)).toString()};
		var options = {exact : false};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(result_value){
			// 查找show
			selection_find = {tcode:'INSTALL_SENDBOX',tid:parseInt(tid.substring(3)).toString()};
			options = {exact : false};
			WL.JSONStore.get(collectionName).find(selection_find,options).then(function(result_js){
				var length = result_js.length;
				var needdate_max = '';
				var day_max = 0;
				for (var i = 0; i < length; i ++) {
					var item = result_js[i].json.stext;
					if (boxNames.indexOf(item.ELVBOX_NAME) == -1) {
						continue ;
					} 
					var needdate_temp;
					needdate_temp = item.ELV_NEED_BY_DATE;
					if (needdate_temp!='' && needdate_temp!=null && needdate_temp!='null' && needdate_temp!=undefined) {
						needdate_temp = new Date(needdate_temp.replace(/-/g,"/"));
						if (needdate_max == '' || needdate_max<needdate_temp) {
							needdate_max = needdate_temp;						
						}
					}
					if (day_max < item.DAYS) {
						day_max = item.DAYS;
					}
					shows[shows.length] = result_js[i];
					for (var j = 0;j < result_value.length; j ++) {
						if (result_value[j].json.tid.indexOf(item.ELVBOX_NAME)) {
							values[values.length] = result_value[j];
							break;
						}
					}
				}
				Ext.getCmp('hf_instsb_shows').setValue(JSON.stringify(shows));
				Ext.getCmp('hf_instsb_values').setValue(JSON.stringify(values));
				Ext.getCmp("hf_instsb_ELV_NEED_BY_DATE").setValue(Ext.Date.format(needdate_max,'Y-m-d'));
				Ext.getCmp('hf_instsb_DAYS').setValue(day_max);
				toInitData();
			}).fail(function(errorObject){
			});
		}).fail(function(errorObject){
		});
		
		function toInitData() {
			// 设置推荐时间
			var ENG_REASONS = Ext.getCmp("sf_instsb_ENG_REASONS").getValue();
			var ELV_NEED_BY_DATE = Ext.getCmp("hf_instsb_ELV_NEED_BY_DATE").getValue();
			var days = parseInt(Ext.getCmp('hf_instsb_DAYS').getValue());
			var targetdate = new Date();
			targetdate.setDate(targetdate.getDate()+days+3+1);
			var fast_time;
			var fast_time_str;
			var most_new_time = new Date(ELV_NEED_BY_DATE.replace(/-/g,"/"));
			most_new_time.setDate(most_new_time.getDate()+days+1);
			if (ELV_NEED_BY_DATE != "" && ENG_REASONS == "0" && targetdate < most_new_time) {
				fast_time = most_new_time;
			} else{
				fast_time = targetdate;
			}
			var y = fast_time.getFullYear();
			var m = fast_time.getMonth()+1;
			var d = fast_time.getDate();
			if(m <= 9) m = "0"+m;
			if(d <= 9) d = "0"+d;
			fast_time_str = y+'-'+m+'-'+d;
			
			
			var y_ = most_new_time.getFullYear();
			var m_ = most_new_time.getMonth()+1;
			var d_ = most_new_time.getDate();
			if(m_ <= 9) m_ = "0"+m_;
			if(d_ <= 9) d_ = "0"+d_;
			Ext.getCmp("hfinstsb_most_new_time").setValue((y_+'-'+m_+'-'+d_));
			
			var y1 = targetdate.getFullYear();
			var m1 = targetdate.getMonth()+1;
			var d1 = targetdate.getDate();
			if(m1 <= 9) m1 = "0"+m1;
			if(d1 <= 9) d1 = "0"+d1;
			Ext.getCmp("hfinstsb_targettime").setValue(y1+'-'+m1+'-'+d1);
			Ext.getCmp('tf_instsb_FAST_ARRIVE_DATE').setValue(fast_time_str);
			
			document.getElementById("instsb_vol_plain").innerHTML = "注：如果现在是进行批量操作，那么所依据的最新计划产出日期为所选箱头中最大的最新计划产出日期！最新计划产出日期为:"+ELV_NEED_BY_DATE;
		}
    }

});