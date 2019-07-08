
/* JavaScript content from app/view/install/InstInfoDetailView_AZ.js in folder common */
Ext.define('Helcss.view.install.InstInfoDetailView_AZ', {
    extend: 'Ext.Panel',
    id:'inst_info_detailview_az',
    config: {
    	fullscreen: true,
    	layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                title:'<b>工号详细资料</b>',
                style:'font-size:12pt',
                items: [
                    {
                        xtype: 'button',
                        id:'inst_info_detail_back',
                        ui: 'back',
                        text: '返回'
                    }
                ]
            }/*,{
                xtype: 'panel',
                id:'inst_info_pcitynameeno',
                height: 49,
                tpl: [
                    '<div style="float:left;padding-left:15px;width:90%;line-height:49px;text-align:left;">',
                    '<h1 style="font-size:26pt;font-weight:bold;color:#000;text-indent:15px">{inst_city}    {inst_pname}   {inst_eno}</h1></div>'
                ], 
                width: '100%'
                	
            }*/,
            {
                xtype: 'formpanel', 
                id: 'inst_detail_form',
                baseCls: 'x-form myform',
                flex: 1,
                margin: '0 auto',
                width: '100%',
                items: [
                    {
                        xtype: 'fieldset',
                        items: [
                            {
                            	xtype: 'autoTextArea',
                                id:'INST_INFO_D_CNO',
                                cls:'YaoJiao_size',
                                label: '安装合同号',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                            	xtype: 'autoTextArea',
                                id:'INST_INFO_D_CUNO',
                                cls:'YaoJiao_size',
                                label: '对方合同号',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                            	xtype: 'autoTextArea',
                                id:'INST_INFO_D_ENO',
                                cls:'YaoJiao_size',
                                label: '生产工号',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                            	xtype: 'autoTextArea',
                                id:'INST_INFO_D_UNIT',
                                cls:'YaoJiao_size',
                                label: '使用单位',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                            	xtype: 'autoTextArea',
                                id:'INST_INFO_D_CITY',
                                cls:'YaoJiao_size',
                                label: '安装市区',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                            	xtype: 'autoTextArea',
                                id:'INST_INFO_D_CZM',
                                cls:'YaoJiao_size',
                                label: '层/站/门',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                            	xtype: 'autoTextArea',
                                id:'INST_INFO_D_ETYPE',
                                cls:'YaoJiao_size',
                                label: '电梯型号',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                            	xtype: 'autoTextArea',
                                id:'INST_INFO_D_EMP',
                                cls:'YaoJiao_size',
                                label: '监理人员',
                                labelWidth: '40%',
                                readOnly: true
                            },{
                            	xtype: 'autoTextArea',
                                id:'INST_INFO_D_STATUS',
                                cls:'YaoJiao_size',
                                label: '项目状态',
                                labelWidth: '40%',
                                readOnly: true
                            },
                            {
                            	xtype: 'autoTextArea',
                                id:'INST_INFO_D_ADDRESS',
                                cls:'YaoJiao_size',
                                label: '安装地址',
                                labelWidth: '40%',
                                readOnly: true
                            }  
                        ]
                    }
                ]
            }
        ]
    },
    initialize: function() {   
    },
    
    
    loadInfo: function(resultSet) {
//    	Ext.getCmp('inst_info_pcitynameeno').setData({'inst_city':xs_city,'inst_pname':xs_domain,'inst_eno':xs_ele_no}); 
    	
    	Ext.getCmp('INST_INFO_D_CNO').setValue(resultSet[0].ENGCONTRACT_NUMBER);
        Ext.getCmp('INST_INFO_D_CUNO').setValue(resultSet[0].CLIENT_ENGCONTRACT_NUMBER);
        Ext.getCmp('INST_INFO_D_ENO').setValue(resultSet[0].ELEVATOR_NO);
        Ext.getCmp('INST_INFO_D_UNIT').setValue(resultSet[0].UNIT);
        Ext.getCmp('INST_INFO_D_CITY').setValue(resultSet[0].CITY);
        Ext.getCmp('INST_INFO_D_CZM').setValue(resultSet[0].PARAM_C+"/"+resultSet[0].PARAM_Z+"/"+resultSet[0].PARAM_M);
        Ext.getCmp('INST_INFO_D_ETYPE').setValue(resultSet[0].CM_ELEVATOR_TYPE_NAME);
        Ext.getCmp('INST_INFO_D_EMP').setValue(resultSet[0].EMP);
        Ext.getCmp('INST_INFO_D_STATUS').setValue(resultSet[0].STATUS);
        Ext.getCmp('INST_INFO_D_ADDRESS').setValue(resultSet[0].INSTALL_ADDRESS);
    }

});