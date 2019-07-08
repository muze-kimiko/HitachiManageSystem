/*
 * File: app/view/RegularInspection/RI_Item.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.4.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.4.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('HelcPDA.view.RegularInspection.RI_Item', {
    extend: 'Ext.tab.Panel',
    id: 'RI_Item',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Toggle',
        'Ext.field.Select',
        'Ext.dataview.DataView',
        'Ext.XTemplate',
        'Ext.SegmentedButton'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '项目明细',
                items: [
                    {
                        xtype: 'button',
                        id: 'btn_RI_Item_back',
                        ui: 'back'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id: 'btn_RI_Item_save',
                        text: '保存'
                    }
                ]
            },
            {
                xtype: 'formpanel',
                title: '菜单信息',
                layout: 'vbox',
                items: [
                    {
                        xtype: 'fieldset',
                        id: 'FS_RI_Item',
                        title: '',
                        defaults: {
                            labelWidth: 130
                        },
                        items: [
                            {
                            	xtype: 'hiddenfield',
                            	id: 'H_RI_Item_Id'
                            },
                            {
                            	xtype: 'hiddenfield',
                            	id: 'H_RI_Item_ChkElevatorItemId'
                            },
                            {
                            	xtype: 'hiddenfield',
                            	id: 'H_RI_Item_SaveFlag'
                            },
                            {
                                xtype: 'togglefield',
                                id: 'T_RI_Item_PoorJudgmentFlag',
                                label: '是否A级不良',
                                listeners: {
                                    change: function(field, newValue, oldValue) {
                                    	Ext.getCmp('H_RI_Item_SaveFlag').setValue('Y');
                                    }
                                }
//                                usePicker: true,
//                                options: [
//	                                  {text: '请选择',value: ''},
//	                                  {text: '是',value: 'Y'},
//	                                  {text: '否',value: 'N'},
//                                ]
                            },
                            {
                                xtype: 'selectfield',
                                id: 'T_RI_Item_RespType',
                                label: '责任分类',
                                usePicker: true,
                                options: [
	                                  {text: '请选择',value: ''},
	                                  {text: '安装',value: '安装'},
	                                  {text: '保养',value: '保养'},
	                                  {text: '制品',value: '制品'},
	                                  {text: '客户',value: '客户'},
	                                  {text: '其他',value: '其他'},
                                ]
                            },
//                            {
//                                xtype: 'autoTextArea',
//                                id: 'T_RI_Item_PoorJudgmentComments',
//                                label: '不良项目说明'
//                            },
                            {
                                xtype: 'autoTextArea',
                                id: 'T_RI_Item_Comments',
                                label: '备注说明'
                            },
                            {
                                xtype: 'selectfield',
                                id: 'T_RI_Item_FixStatus',
                                label: '整改情况',
                                usePicker: true,
                                options: [
	                                  {text: '请选择',value: ''},
	                                  {text: '未整改',value: '未整改'},
	                                  {text: '已整改',value: '已整改'},
	                                  {text: '已发函',value: '已发函'},
                                ]
                            },
                            {
                            	xtype: 'datepickerfield',
                                id: 'T_RI_Item_FixDate',
                                label: '整改时间',
                                placeHolder: '月/日/年',
                                dateFormat: 'm/d/Y',
                                picker: {
                                	value: {
                                        month: new Date().getMonth()+1,
                                        day: new Date().getDate(),
                                        year: new Date().getFullYear(),
                                    },
                                    slotOrder: ['month','day','year'],
                                    yearFrom: new Date().getFullYear()-1,
                                    yearTo: new Date().getFullYear()+1,
                                    doneButton: '确定',
                                    cancelButton: '取消',
                                    toolbar: {
                                    	xtype: 'titlebar',
                                    	docked: 'top',
                                    	items: [
                                    		{
                                    			xtype: 'button',
                                    			align: 'right',
                                    			text: '清除',
                                    			handler: function(button,e){
                                    				var v_datepicker = button.getParent().getParent().getParent();
                                    				v_datepicker.fireEvent('change', v_datepicker, null);
													v_datepicker.hide();
													Ext.util.InputBlocker.unblockInputs();
                                    			}
                                    		}
                                    	]
                                    }
                                }
                            },
                        ]
                    }
                ]
            },
            {
                xtype: 'container',
                id: 'tab_AttList',
                title: '附件信息',
                layout: 'vbox',
                items: [
					{
						xtype: 'hiddenfield',
						id: 'H_tab_AttList'
					},
                    {
                        xtype: 'dataview',
                        id: 'DV_RI_Item',
                    	store: 'ST_RI_Item',
                        flex: 1,
                        cls: 'photo-dv',
                    	inline: true,
                    	itemTpl: [
                      	    '<div style="height:100%;text-align:center">',
                      	    '<img style="width:90%;height:90%;margin-top:7px;" src="data:image/{FileExt};base64,{FileContent}">',
                      	    '</div>'
                      	]
                    },
                    {
                        xtype: 'segmentedbutton',
                        docked: 'bottom',
                        margin: '0 5 5 5',
                        items: [
                            {
                                xtype: 'button',
                                flex: 1,
                                id: 'btn_RI_Item_camera',
                                text: '拍照'
                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                id: 'btn_RI_Item_album',
                                text: '相册'
                            }
                        ]
                    }
                ]
            }
        ]
    }

});