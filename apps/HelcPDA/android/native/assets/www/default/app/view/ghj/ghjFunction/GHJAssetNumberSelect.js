
/* JavaScript content from app/view/ghj/ghjFunction/GHJAssetNumberSelect.js in folder common */


Ext.define('HelcPDA.view.ghj.ghjFunction.GHJAssetNumberSelect', {
	  extend: 'Ext.tab.Panel',
	  id:'GHJAssetNumberSelect_id',
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
	          title: '工号查询',
	          items: [{
	        	  id:'GHJAssetNumberSelect_id_FH',
	          	  xtype: 'button',
	              ui: 'back',
	              text: '返回'
	          },{
	          	  xtype: 'spacer'
	          },{
	        	  id:'GHJAssetNumberSelect_id_QD',
	          	  xtype: 'button',
	              text: '确定'
	          }]
	      },
	      {
	    	  xtype: 'panel',
	          title:'查询条件',
	          items: [{
	        	  xtype:'formpanel',
	        	  height:'100%',
	        	  items:[{
	        		  xtype: 'fieldset',
	        		  title: '支持模糊查询',
	        		  cls:'textf',
	        		  items: [{
	        			  id:'NS_AssetNumber',
	                      xtype: 'textfield',
	                      label: '工号',
	                      labelWidth: 130,
	                      value:'07G',
	                  },
	                  /*{
	                	  id:'NS_ProductPart',
	                      xtype: 'textfield',
	                      label: '梯型',
	                      labelWidth: 130,
	                      hidden:true,
	                  },
	                  {
	                	  id:'NS_ProductName',
	                      xtype: 'textfield',
	                      label: '梯种',
	                      labelWidth: 130,
	                      hidden:true,
	                  },
	                  {
	                	  id:'NS_CompanyOrganization',
	                      xtype: 'textfield',
	                      label: '所属司',
	                      labelWidth: 130,
	                      hidden:true,
	                  },
	                  {
	                	  id:'NS_Organization',
	                      xtype: 'textfield',
	                      label: '所属站',
	                      labelWidth: 130,
	                      hidden:true,
	                  },*/
	                  {
	                	  id:'NS_AssetAddress',
	                      xtype: 'textfield',
	                      label: '地址',
	                      labelWidth: 130,
	                  },
	                  {
	                	  id:'NS_AssetDomainName',
	                      xtype: 'textfield',
	                      label: '地盘',
	                      labelWidth: 130,
	                  },
	                  {
	                	  id:'NS_EdificeName',
	                      xtype: 'textfield',
	                      label: '大楼',
	                      labelWidth: 130,
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
	                              id:'GHJAssetNumberSelect_id_CX',
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
              title: '查询结果',
              items: [
                  {
                      xtype: 'list',
                      height: '100%',
                      id:'GHJAssetNumberSelect_id_list',
                      store:'GHJAssetNumberSelectStore',
                      itemTpl: [
							'<table border=0 width=100% style="color:#666" class="textf">'+
							'  <tr>'+
							'     <td width=10% rowspan="2">'+
							'        <div name="groupkung_GHJAssetNumberSelect" class="p_judge_box2" id="conkung_GHJAssetNumberSelect">3</div>'+
							'     </td>'+
							'     <td width=90%>{AssetNumber}</td>'+
							'  </tr>'+
							'  <tr>'+
							'      <td width=90%>{AssetAddress}</td>'+
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