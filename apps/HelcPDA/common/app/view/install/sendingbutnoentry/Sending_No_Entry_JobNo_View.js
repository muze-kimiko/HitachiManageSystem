Ext
		.define(
				'HelcPDA.view.install.sendingbutnoentry.Sending_No_Entry_JobNo_View',
				{
					extend : 'Ext.Panel',
					id : 'SNEL_JobNo_View_ID',
					requires : [ 'Ext.Toolbar', 'Ext.Button', 'Ext.Spacer',
							'Ext.dataview.List', 'Ext.XTemplate' ],

					config : {
						layout: 'vbox',
						items : [
								{
									xtype : 'toolbar',
									docked : 'top',
									title : '已发货未进场－工号列表',
									items : [ {
										xtype : 'button',
										id : 'back_To_SNEL_View',
										ui : 'back',
										text : '返回'
									}, {
										xtype : 'spacer'
									}, {
										xtype : 'button',
										id : 'SNEL_Batch_Button',
										text : '批量'
									} ]
								},
								{
									xtype : 'toolbar',
									docked : 'top',
									items : [ {
										xtype : 'spacer'
									}, {
										xtype : 'button',
										id : 'SNEL_Checked_All',
										text : '全选'
									}, {
										xtype : 'button',
										id : 'SNEL_Checked_Invert',
										text : '反选'
									} ]
								},
								{
									xtype : 'list',
									id : 'SNEL_JobNo_List',
									height : '100%',
									store : 'Sending_No_Entry_JobNo_Store',
									itemTpl : [
											'<table border=0 width=100%>',
											'  <tr>',
											'    <td width="10%" rowspan="2">',
											'		<div name="SNEL_JobNo_Checkbox" id="SNEL_JobNo_Checkbox" class="p_judge_box" style="color:{color};">3</div>',
											'    </td>',
											'    <td width="80%">',
											'      <span style="font-size:22px;">{ELEVATOR_NO}</span>',
											// ' <span
											// style="color:#666">批次:{SEQ_NUM}</span>',
											'    </td>',
											'  </tr>',
											'  <tr>',
											'      <td width="80%" style="text-align: left">状态:<span style="margin-left:5px;background:green;color:white;border:green 2px solid;">{ELEVATOR_STATUS}</span></td>',
											'  </tr>', '</table>'

									],
									onItemDisclosure : true
								} ],
						listeners : [ {
							fn : 'SNEL_JobNo_ListItemTap',
							event : 'itemtap',
							delegate : '#SNEL_JobNo_List'
						} ]
					},
					SNEL_JobNo_ListItemTap : function(dataview, index, target, record,
							e, eOpts) {
						if (e.target.id === 'SNEL_JobNo_Checkbox') {
							if (record.get('sel') === '0') {
								record.set('sel', '1');
								record.set('color', '#ccc');
							} else {
								record.set('sel', '0');
								record.set('color', '#e03a3e');
							}
						}
					}
				});