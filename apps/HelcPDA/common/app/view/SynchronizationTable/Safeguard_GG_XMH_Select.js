
Ext.define('HelcPDA.view.SynchronizationTable.Safeguard_GG_XMH_Select', {
	extend: 'Ext.Panel',
	id:'Safeguard_GG_XMH_Select_id',
    requires: [
        'Ext.Toolbar',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.Spacer',
        'Ext.Button',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
	  	  	  xtype: 'toolbar',
	          docked: 'top',
	          title: '项目号查询',
	          items: [{
	        	  id:'Safeguard_GG_XMH_Select_id_FH',
	          	  xtype: 'button',
	              ui: 'back',
	              text: '返回'
	          },{
	        	  xtype:'spacer'
	          },{
	        	  xtype:'button',
	        	  id:'Safeguard_GG_XMH_Select_id_QD',
	        	  text:'确定',
	        	  hidden:true,
	          }]
	      },
            {
                xtype: 'tabpanel',
                id:'Safeguard_GG_XMH_Select_tabpanel',
                flex: 1,
                items: [
                    {
                        xtype: 'formpanel',
                        title: '查询',
                        items: [
                            {
				                xtype: 'fieldset',
				                instructions: '所有条件支持模糊查询,多条件能增快查询速度',
				                title: '查询条件',
				                cls:'textf',
				                items: [
									{
										id:'Select_ContentName',
										xtype: 'textfield',
										label: '项目名称',
										labelWidth:'40%',
									},
									{
										id:'Select_ContentLocation',
										xtype: 'textfield',
										label: '位置',
										labelWidth:'40%',
									},
									{
										id:'Select_ContentType',
										xtype: 'selectfield',
										label: '项目类型',
										labelWidth:'40%',
										value:'vlaue',
										options:[
										   {text:'请选择',value:''},
										   {text:'直梯',value:'直梯'},
										   {text:'扶梯',value:'扶梯'},
										   {text:'抱闸解体',value:'抱闸解体'},
										],
									},
									{
										id:'Select_ContentProjectTaskNo',
										xtype: 'textfield',
										label: '项目号',
										labelWidth:'40%',
									},
									{
										id:'Select_ContentCover',
										xtype: 'textfield',
										label: '适用范围',
										labelWidth:'40%',
									},
									{
										id:'Select_ContentOperateStandard',
										xtype: 'textfield',
										label: '作业标准',
										labelWidth:'40%',
									},
									{
										id:'Select_ContentOperateContent',
										xtype: 'textfield',
										label: '作业内容',
										labelWidth:'40%',
									},
									{
										id:'Select_ContentProjectRequire',
										xtype: 'textfield',
										label: '项目要求',
										labelWidth:'40%',
									},
									{//存放装载项目号的控件ID
										id:'Safeguard_GG_XMH_Select_id_Name',
									    xtype: 'hiddenfield',
									},
									{
									      xtype: 'panel',
									      layout: {
									          type: 'hbox',
									          align: 'center'
									      },
									      items: [
									          {
									              xtype: 'spacer'
									          },
									          {
									              xtype: 'button',
									              id:'Safeguard_GG_XMH_Select_id_CX',
									              margin: '15 0',
									              width: '90%',
									              text: '查询',
									              
									          },
									          {
									              xtype: 'spacer'
									          }
									      ]
									  },
				                ]
				            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: '结果',
                        layout: 'vbox',
                        items: [
							{
							    xtype: 'list',
							    height: '100%',
							    id:'Safeguard_GG_XMH_Select_id_list',
							    store:'SynchronizationTable_XMH_Store',
							    itemTpl: [
											'<table border=0 width=100% style="color:#666" class="textf">'+
											'  <tr>'+
											'     <td width=10% rowspan="2">'+
											'        <div name="XMH_Name" class="p_judge_box2" id="XMH_Id">3</div>'+
											'     </td>'+
											'     <td width=90%>{ContentProjectTaskNo}</td>'+
											'  </tr>'+
											'  <tr>'+
											'      <td width=90%>{ContentName}</td>'+
											'  </tr>'+
											'</table>',
							    ],
							    onItemDisclosure: true,
							},
                        ]
                    },
                    
                ]
            }
        ]
    }

});