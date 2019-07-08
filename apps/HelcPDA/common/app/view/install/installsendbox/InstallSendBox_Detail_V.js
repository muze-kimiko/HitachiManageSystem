Ext.define('HelcPDA.view.install.installsendbox.InstallSendBox_Detail_V', {
    extend: 'Ext.Panel',
    id:'instsb_detail_view',
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
                title: '箱头发货详细信息',
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
                        id: 'btn_commit',
                        text: '提交'
                    }
                ]
            },
            {
                xtype: 'tabpanel',
                flex: 1,
                id: 'tp_instsb_bdetail',
                items: [
                    {
                        xtype: 'container',
                        title: '查看数据',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'formpanel',
                                height: '100%',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        title: '',
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                id: 'tf_instsb_CONTRACT_NO',
                                                label: '合同号',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'tf_instsb_EQUIPMENT_NO',
                                                label: '设备号',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },
                                            {
                                                xtype: 'textfield',
                                                id: 'tf_instsb_ELVBOX_NAME',
                                                label: '箱头',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },{
                                                xtype: 'textfield',
                                                id: 'tf_instsb_ELVBOX_DESC',
                                                label: '箱头说明',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },{
                                                xtype: 'textfield',
                                                id: 'tf_instsb_METHOD_TYPE',
                                                label: '发运类型',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },{
                                                xtype: 'textfield',
                                                id: 'tf_instsb_STORE_DATE',
                                                label: '入仓日期',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },{
                                                xtype: 'textfield',
                                                id: 'tf_instsb_SUBINV_NAME',
                                                label: '在仓库',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },{
                                                xtype: 'textfield',
                                                id: 'tf_instsb_DELIVERY_DATE',
                                                label: '合同行交货期',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },{
                                                xtype: 'textfield',
                                                id: 'tf_instsb_PLAN_ARRIVE_DATE',
                                                label: '计划运抵日期',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },{
                                                xtype: 'textfield',
                                                id: 'tf_instsb_PLAN_CONSIGN_DATE',
                                                label: '计划发货日期',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },{
                                                xtype: 'textfield',
                                                id: 'tf_instsb_ELV_NEED_BY_DATE',
                                                label: '最新计划产出日期',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },{
                                                xtype: 'textfield',
                                                id: 'tf_instsb_ELV_NEED_BY_DATE_MIR',
                                                label: '箱头作业指令产出日期',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },{
                                                xtype: 'textfield',
                                                id: 'tf_instsb_VENDOR_NAME',
                                                label: '物流公司',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },{
                                                xtype: 'textfield',
                                                id: 'tf_instsb_DAYS',
                                                label: '运输天数',
                                                labelWidth: '40%',
                                                readOnly: true
                                            },{
                                                xtype: 'textfield',
                                                id: 'tf_instsb_STATUS',
                                                label: '状态',
                                                labelWidth: '40%',
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
                                			}
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: '录入数据',
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'formpanel',
                                flex: 1,
                                id: 'fp_instsb_input',
                                items: [
                                    {
                                        xtype: 'fieldset',
                                        instructions: '<div id="instsb_plain" style="margin:0 auto;width:92%;text-align:left;"></div>',
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
                                           },
                                            {
                                                xtype: 'textfield',
                                                id: 'tf_instsb_FAST_ARRIVE_DATE',
                                                label: '最快运抵日期',
                                                labelWidth: '50%',
                                                readOnly: true
                                            }]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    
    initialize: function() {
    	var tabp = Ext.getCmp('tp_instsb_bdetail');
    	tabp.setActiveItem(tabp.getInnerItems()[0]);
    },
    
    initData: function(boxName) {
    	Ext.getCmp('sf_instsb_DATA_STATUS').setValue('ISSUED');
		Ext.getCmp('sf_instsb_ENG_REASONS').setValue('0');
		Ext.getCmp('dpf_DEMAND_ARRIVE_DATE').setValue('');
		Ext.getCmp('tf_instsb_FAST_ARRIVE_DATE').setValue('');
		Ext.getCmp('hfinstsb_value_id').setValue('');
    	// 找显示出来的数据
		var selection_find = {tcode:'INSTALL_SENDBOX',tid:boxName.split("-")[0].substring(3)};
		var options = {exact : false};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults2){
			var length = arrayResults2.length;
			if (length < 1) {
				WL.Toast.show('找不到本地数据！请用批量进行勾单');
				return ;
			}
			var flag = false;
			var stext = null;
			for (var i = 0; i < length; i ++) {
				stext = arrayResults2[i].json.stext;
				if(stext.ELVBOX_NAME == boxName) {
					flag = true;
					break;
				}
			}
			if (!flag) {
				WL.Toast.show('找不到本地数据！请用批量进行勾单');
				return ;
			}
			Ext.getCmp('tf_instsb_CONTRACT_NO').setValue(stext.CONTRACT_NO); 
	    	Ext.getCmp('tf_instsb_EQUIPMENT_NO').setValue(stext.EQUIPMENT_NO); 
	    	Ext.getCmp('tf_instsb_ELVBOX_NAME').setValue(stext.ELVBOX_NAME); 
	    	Ext.getCmp('tf_instsb_ELVBOX_DESC').setValue(stext.ELVBOX_DESC); 
	    	Ext.getCmp('tf_instsb_METHOD_TYPE').setValue(stext.METHOD_TYPE); 
	    	Ext.getCmp('tf_instsb_STORE_DATE').setValue(stext.STORE_DATE); 
	    	Ext.getCmp('tf_instsb_SUBINV_NAME').setValue(stext.SUBINV_NAME); 
	    	Ext.getCmp('tf_instsb_DELIVERY_DATE').setValue(stext.DELIVERY_DATE); 
	    	Ext.getCmp('tf_instsb_PLAN_ARRIVE_DATE').setValue(stext.PLAN_ARRIVE_DATE); 
	    	Ext.getCmp('tf_instsb_PLAN_CONSIGN_DATE').setValue(stext.PLAN_CONSIGN_DATE); 
	    	Ext.getCmp('tf_instsb_ELV_NEED_BY_DATE').setValue(stext.ELV_NEED_BY_DATE); 
	    	Ext.getCmp('tf_instsb_ELV_NEED_BY_DATE_MIR').setValue(stext.ELV_NEED_BY_DATE_MIR); 
	    	Ext.getCmp('tf_instsb_VENDOR_NAME').setValue(stext.VENDOR_NAME); 
	    	Ext.getCmp('tf_instsb_DAYS').setValue(stext.DAYS);
	    	if (stext.DATA_SOURCE == 'EBS') {
	    		Ext.getCmp('tf_instsb_STATUS').setValue("N");	    		
	    		Ext.getCmp('fp_instsb_input').setDisabled(false);
	    		Ext.getCmp('btn_instsb_suretime').setDisabled(false);
	    	} else {
	    		Ext.getCmp('tf_instsb_STATUS').setValue("Y");
	    		Ext.getCmp('fp_instsb_input').setDisabled(true);
	    		Ext.getCmp('btn_instsb_suretime').setDisabled(true);
	    	}
	    	toInitData();
		}).fail(function(errorObject){
		});
    	
		// 找曾今填过的数据
		selection_find = {tcode:'INSTALL_VALUE_SENDBOX',tid:boxName};
		options = {exact : false};
		WL.JSONStore.get(collectionName).find(selection_find,options).then(function(arrayResults){
			var length = arrayResults.length;
			if (length < 1) {
				return ;
			}
			var stext = arrayResults[0].json.stext; 
			Ext.getCmp('sf_instsb_DATA_STATUS').setValue(stext.DATA_STATUS);
			Ext.getCmp('sf_instsb_ENG_REASONS').setValue(stext.ENG_REASONS);
//			var DEMAND_ARRIVE_DATE_TIME = new Date(stext.DEMAND_ARRIVE_DATE.replace(/-/g,"/"));
			var DEMAND_ARRIVE_DATE_TIME = new Date(stext.DEMAND_ARRIVE_DATE);
			Ext.getCmp('dpf_DEMAND_ARRIVE_DATE').setValue(stext.DEMAND_ARRIVE_DATE);
			
			Ext.getCmp('hfinstsb_value_id').setValue(arrayResults[0]._id);
		}).fail(function(errorObject){
		});
		
		function toInitData() {
			// 设置推荐时间
			var ENG_REASONS = Ext.getCmp("sf_instsb_ENG_REASONS").getValue();
			var ELV_NEED_BY_DATE = Ext.getCmp("tf_instsb_ELV_NEED_BY_DATE").getValue();
			var days = parseInt(Ext.getCmp('tf_instsb_DAYS').getValue());
			var targetdate = new Date();
			targetdate.setDate(targetdate.getDate()+days+3+1);
			var fast_time;
			var fast_time_str;
			var most_new_time = new Date(ELV_NEED_BY_DATE.replace(/-/g,"/"));
			most_new_time.setDate(most_new_time.getDate()+days+1);
			if (ELV_NEED_BY_DATE != "" && ENG_REASONS == "0" && targetdate < most_new_time) {
//			if (ELV_NEED_BY_DATE == "" || (ENG_REASONS != "0" && targetdate < most_new_time)) {
				
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
			
			document.getElementById("instsb_plain").innerHTML = "注：如果现在是进行批量操作，那么所依据的最新计划产出日期为所选箱头中最大的最新计划产出日期！最新计划产出日期为:"+ELV_NEED_BY_DATE;
		}
    }

});