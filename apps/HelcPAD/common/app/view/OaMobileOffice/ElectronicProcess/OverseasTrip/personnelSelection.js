/**
 * 人员选择
 */
Ext.define('HelcPAD.view.OaMobileOffice.ElectronicProcess.OverseasTrip.personnelSelection', {
	    extend: 'Ext.Panel',
	    id: 'qc_personnelSelection_id',
	    requires: [
	        'Ext.Toolbar',
	        'Ext.Button',
	        'Ext.Spacer',
	        'Ext.field.Text',
	        'Ext.dataview.List',
	        'Ext.XTemplate'
	    ],
	    config: {
	        style: 'background-color:#edebf1',
	        layout: 'vbox',
	        items: [
	            {
	                xtype: 'toolbar',
	                docked: 'top',
	                title: '人员选择',
	                items: [
	                    {
	                        xtype: 'button',
	                        id: 'nqc_returnApprovaOpinion_ID',
	                        text: '取消',
	                        ui: 'back'
	                    },
	                    {
	                        xtype: 'spacer'
	                    },
	                    {
	                        xtype: 'button',
	                        id: 'nqc_CompleteChoice_ID',
	                        text: '确认'
	                    }
	                ]
	            },
	            {
	                xtype: 'toolbar',
	                id: 'select_person_TB',
	                docked: 'top',
	                items: [
	                    {
	                        xtype: 'textfield',
	                        id: 'qx_inquireCon_ID',
	                        width: '80%',
	                        label: '',
	                        placeHolder: '请输入查询条件'
	                    },
	                    {
	                        xtype: 'button',
	                        id: 'nqx_inquire_ID',
	                        text: '查找'
	                    }
	                ]
	            },
	            {
	                xtype: 'list',
	                flex: 1,
	                id: 'nqc_Camdodates_ID',
                    store:'personnelSelectionS',
                    itemTpl: [
                              '<table border=0 width=100%>',
                              '    <tr>',
                              '        <td style="width:50px">',
                              '           <div name="p_judge_color" class="p_judge_box" id="p_judge_color">3</div>',
                              '        </td>',
                              '        <td>',
                              '            <span style="font-size:20px;">{value}</span>',
                              '        </td>',
                              '    </tr>',
                              '</table>'
                          ]
	            },
	            {
	            	xtype:'hiddenfield',
	            	id:'QC_name1'
	            },
	            {
	            	xtype:'hiddenfield',
	            	id:'QC_forkname'
	            },
	            {
	            	xtype:'hiddenfield',
	            	id:'QC_conds'
	            },
	            {
	            	xtype:'hiddenfield',
	            	id:'QC_idx'
	            },
	            {
	            	xtype:'hiddenfield',
	            	id:'QC_multflag'
	            },
	            {
	            	xtype:'hiddenfield',
	            	id:'QC_multqty'
	            }
	        ]
	    }

	});