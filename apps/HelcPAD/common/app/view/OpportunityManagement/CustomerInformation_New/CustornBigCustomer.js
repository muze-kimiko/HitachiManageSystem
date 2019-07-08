

Ext.define('HelcPAD.view.OpportunityManagement.CustomerInformation_New.CustornBigCustomer', {
	  extend: 'Ext.tab.Panel',
	  id:'custornBigCustomer_new_id',
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
	        'Ext.XTemplate',
	  ],

	  config: {
	  	  items: [{
	  	  	  xtype: 'toolbar',
	          docked: 'top',
	          title: '父客户',
	          cls:'textf',
	          items: [{
	        	  id:'custornBigCustomer_new_id_FH',
	          	  xtype: 'button',
	              ui: 'back',
	              text: '返回'
	          },{
	          	  xtype: 'spacer'
	          },{
	        	  id:'custornBigCustomer_new_id_QD',
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
	        		  title: '所有可输入的查询条件均支持模糊查询',
	        		  cls:'textf',
	        		  items: [ {
	                    	id:'custornBigCustomer_new_id_KHBH',
	                        xtype: 'textfield',
	                        labelWidth: '40%',
	                        label: '客户编号',
	                        cls:'textf',
	                        placeHolder: '请输入客户编号',
	                        //value:'BAB0017381'
	                    },
	                    {
	                    	id:'custornBigCustomer_new_id_KHMC',
	                        xtype: 'textfield',
	                        labelWidth: '40%',
	                        label: '客户名称',
	                        cls:'textf',
	                        placeHolder: '请输入客户名称',
	                        //value:'万科企业股',
	                    },
	                    {
	                    	id:'custornBigCustomer_new_id_dmORsfz',
	                        xtype: 'textfield',
	                        labelWidth: '60%',
	                        label: '组织机构代码/身份证号',
	                        cls:'textf',
	                        placeHolder: '请输入组织机构代码或身份证号',
	                        //value:'20150731001'
	                    },
	                    {
	                    	id:'custornBigCustomer_new_id_dkhbm',
	                        xtype: 'textfield',
	                        labelWidth: '60%',
	                        label: '大客户编码',
	                        cls:'textf',
	                        placeHolder: '请输入大客户编码',
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
	                              id:'custornBigCustomer_new_id_CX',
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
                      xtype: 'list',
                      height: '100%',
                      id:'custornBigCustomer_new_id_list',
                      store:'ClientStoreF',
                      itemTpl: [
							'<table border=0 width=100% style="color:#666" class="textf">'+
							'  <tr>'+
							'     <td width=10% rowspan="3">'+
							'        <div name="groupkung_custornBigCustomer" class="p_judge_box2" id="conkung_custornBigCustomer">3</div>'+
							'     </td>'+
							'     <td width=90%>{EBScn}  {Organization}</td>'+
							'  </tr>'+
							'  <tr>'+
							'      <td width=90%>{EBSname}  {AccountStatus}</td>'+
							'  </tr>'+
							'</table>',
                      ],
                  }
              ]
	      }]
      }

});

