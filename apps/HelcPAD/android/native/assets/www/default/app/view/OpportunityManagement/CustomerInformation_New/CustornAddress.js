
/* JavaScript content from app/view/OpportunityManagement/CustomerInformation_New/CustornAddress.js in folder common */


Ext.define('HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustornAddress', {
	  extend: 'Ext.tab.Panel',
	  id:'custornAddress_new_id',
	  requires: [
	        'Ext.Toolbar',
	        'Ext.Button',
	        'Ext.Spacer',
	        'Ext.tab.Panel',
	        'Ext.form.Panel',
	        'Ext.form.FieldSet',
	        'Ext.field.Select',
	        'Ext.field.Text',
	        'Ext.SegmentedButton',
	        'Ext.dataview.List',
	        'Ext.XTemplate'
	  ],

	  config: {
	  	  items: [{
	  	  	  xtype: 'toolbar',
	          docked: 'top',
	          title: '业务联系地址',
	          cls:'textf',
	          items: [{
	        	  id:'CustornAddress_new_id_FH',
	          	  xtype: 'button',
	              ui: 'back',
	              text: '返回'
	          },{
	          	  xtype: 'spacer'
	          },{
	        	  id:'CustornAddress_new_id_XJ',
	          	  xtype: 'button',
	              text: '新建',
	              //hidden:true,
	          },{
	        	  id:'CustornAddress_new_id_QD',
	          	  xtype: 'button',
	              text: '确定',
	          }]
	      },
	      {
	    	  xtype: 'panel',
	          title:'查询条件',
	          cls:'textf',
	          items: [{
	        	  xtype:'formpanel',
	        	  height:'100%',
	        	  items:[{
	        		  xtype: 'fieldset',
	        		  title: '查询条件(详细地址支持模糊查询,例:郴州市*)',
	        		  cls:'textf',
	        		  items: [{
	        			  id:'custornAddress_new_id_Country',
	                      xtype: 'textfield',
	                      label: '国家/地区',
	                      value:'中国',
	                      readOnly:true, 
	                      labelWidth: 130,
	                  },
	                  {
	                	  id:'custornAddress_new_id_Province',
	                      xtype: 'selectfield',
	                      label: '省/(直辖)市',
	                      labelWidth: 130,
	                      //placeHolder: '按录入人职位所在组织'
	                  },
	                  {
	                	  id:'custornAddress_new_id_City',
	                      xtype: 'selectfield',
	                      label: '城市',
	                      labelWidth: 130,
	                      //placeHolder: '系统自动生成'
	                  },
	                  {
	                	  id:'custornAddress_new_id_County',
	                      xtype: 'selectfield',
	                      label: '县\区',
	                      labelWidth: 130,
	                      //placeHolder: '请输入邮政编码'
	                  },
	                  {
	                	  id:'custornAddress_new_id_StreetAddress',
	                      xtype: 'textfield',
	                      label: '详细地址',
	                      placeHolder: '请输入详细地址'
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
	                              id:'custornAddress_new_id_CX',
	                              margin: '15 0',
	                              width: '90%',
	                              text: '查询'
	                          },
	                          {
	                              xtype: 'spacer'
	                          }
	                      ]
	                  },]
	        	  }]
	          },]
	      },{
	    	  xtype: 'container',
              title: '选中地址',
              items: [
				  {
					    xtype: 'segmentedbutton',
					    margin: 10,
					    cls:'textf',
					    items: [
					        {
					            xtype: 'button',
					            id:'custornAddress_new_id_DGSC',
					            text: '选中删除'
					        },
					        {
					            xtype: 'button',
					            id:'custornAddress_new_id_QBSC',
					            text: '全部删除'
					        }
					    ]
				  },
                  {
                      xtype: 'list',
                      height: '100%',
                      id:'custornAddress_new_id_list',
                      store:'CustornAddressTwoStore',
                      itemTpl: [
							'<table border=0 width=100% style="color:#666" class="textf">'+
							'  <tr>'+
							'     <td width=10% rowspan="3">'+
							'        <div name="groupkung_custornAddress" class="p_judge_box2" id="conkung_custornAddress">3</div>'+
							'     </td>'+
							'     <td width=90%>{Country}  {Province}  {City}  {County}  {PostalCode}</td>'+
							'  </tr>'+
							'  <tr>'+
							'      <td width=90%>{StreetAddress}</td>'+
							'  </tr>'+
							'</table>',
                      ],
                  }
              ]
	      }]
      }

});









/*{
xtype:'container',
title: '客户地址',
cls:'textf',
// layout:'hbox',
//height: '100%',
items: [
{
    xtype: 'list',
    width: '100%',
    store:'CsStore',
    itemTpl: [
        '<div><input type=\'checkbox\'>　姓名　性别　部门　职位</div>'
    ],
    onItemDisclosure: true
}
    {
        xtype: 'fieldset',
        title: '查询条件',
        cls:'textf',
        items: [
            {
                xtype: 'textfield',
                label: '国家/地区'
            },
            {
                xtype: 'textfield',
                label: '省/(直辖)市',
                placeHolder: '按录入人职位所在组织'
            },
            {
                xtype: 'textfield',
                label: '城市',
                placeHolder: '系统自动生成'
            },
            {
                xtype: 'textfield',
                label: '邮政编码',
                placeHolder: '这里显示客户名称'
            },
            {
                xtype: 'textfield',
                label: '详细地址',
                placeHolder: '潜在'
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
                        id:'custornAddress_new_id_CX',
                        margin: '15 0',
                        width: '90%',
                        text: '查询'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
        ]
    },
    
]
},*/