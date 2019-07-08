Ext.define('HelcPAD.view.OpportunityManagement.Project_New.CustomerSelectView',{
	extend: 'Ext.Panel',
	id:'customerSelect',
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
	config:{
		/*listeners:{
			  activeitemchange:function( tabPanel, value, oldValue, eOpts ){
				  oldValue.setHidden(true);
				  if(value)
					  value.setHidden(false);
			  }
		  },*/
	  	  items: [{
	  	  	  xtype: 'toolbar',
	          docked: 'top',
	          title: '客户选择',
	          cls:'textf',
	          items: [/*{
	        	  id:'customerSelect_back',
	          	  xtype: 'button',
	              ui: 'back',
	              text: '返回'
	          },*/{
	        	  id:'comeSource',
	        	  xtype:'hiddenfield',
	          }],
	          height:45,
	      },{
	    	  xtype:'toolbar',
          	  docked:'top',
          	  height:50,
          	  layout:'hbox',
          	  style:'background:#EDEBF1;',
	          html:'<div style="width=100%">'+
			         	  '<div class="anOneDiv">'+
			    			'<div class="ysZhOne anOne" id="customerSelect_back" onclick="object.getController(\'OpportunityManagement.Project_New.CustomerSelectCtrl\').customerSelect_back();" style="width:29%;">'+SYB+'</div>'+
			    			'<div class="ysZhTwo anOne" id="custornerQuery" onclick="object.getController(\'OpportunityManagement.Project_New.CustomerSelectCtrl\').custornerQuery();" style="width:29%;">查询</div>'+
			    			'<div class="ysZhThree anOne" id="confirmCheckClient" onclick="object.getController(\'OpportunityManagement.Project_New.CustomerSelectCtrl\').confirmCustomer();" style="width:29%;">确认</div>'+
			    		  '</div>'+
					'</div>',
	      },
	      {
	    	  xtype: 'panel',
	          title:'查询条件',
	          height:210,
	          cls:'textf',
	          items: [{
	        	  xtype:'formpanel',
	        	  height:'100%',
	        	  items:[{
	        		  xtype: 'fieldset',
	        		  cls:'textf',
	        		  items: [{
	        			  id:'custornerName',
	                      xtype: 'textfield',
	                      label: '客户',
	                      placeHolder:'请输入需要查询的客户',
	                      //value:'2015'
	                  },
	                  {
	                	  id:'custornerCSN',
	                      xtype: 'textfield',
	                      label: '客户编码',
	                      placeHolder: '请输入客户编码',
	                      //value:'BAB005'
	                  },
	                  {
	                	  id:'organizationId',
	                	  xtype:'textfield',
	                	  label:'组织代码',
	                	  placeHolder:'请输入组织代码'
	                  },
	                  {
	                	  id:'custornerAccountStatus',
	                      xtype: 'selectfield',
	                      label: '状态',
	                      placeHolder: '请输入客户状态',
	                      options:[
	                          {text:'任意',value:'任意'},
	                          {text:'有效',value:'有效'},
	                          {text:'潜在',value:'潜在'},
	                          
	                      ]
	                  },
	                  /*{
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
	                              id:'custornerQuery',
	                              margin: '15 0',
	                              width: '90%',
	                              text: '查询',
	                              
	                          },
	                          {
	                              xtype: 'spacer'
	                          }
	                      ]
	                  }*/]
	        	  }]
	          },]
	      },{
              xtype: 'list',
              //height: '71%',
              id:'custornList',
              store:'ClientStore',
              itemTpl: [
						'<table border=0 width=100% style="color:#666" class="textf">'+
						'  <tr>'+
						'     <td width=10% rowspan="2">'+
						'        <div name="groupkung_custornanalysislist" class="p_judge_box2" id="groupkung_custornanalysislist">3</div>'+
						'     </td>'+
						'     <td width=90%>{Name}  {CSN}  {Organization}  {AccountAttribute}  {AccountStatus}</td>'+
						'  </tr>'+
						'  <tr>'+
						'      <td width=90%>{Type}</td>'+
						'  </tr>'+
						'</table>',
              ],
          
	      },/*{
	    	  id:'custornListContainer',
	    	  xtype: 'container',
            title: '客户列表',
            items: [
				  {
					    xtype: 'segmentedbutton',
					    margin: 10,
					    cls:'textf',
					    items: [
					        {
					            xtype: 'button',
					            id:'custornAddress_new_id_DGSC',
					            text: '选中删除',
					            handler:function(){
					            	var records = Ext.getCmp('custornList').getSelection();
					            	if(records.length==0){
					            		Ext.Msg.alert('提示','请选择一条数据！');
					            		return;
					            	}
					            	var store = Ext.data.StoreManager.get('ClientStore');
					            	if(!store)
					            		store = Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.ClientStore');
					            	store.remove(records[0]);
					            }
					        },
					        {
					            xtype: 'button',
					            id:'custornAddress_new_id_QBSC',
					            text: '全部删除',
					            handler:function(){
					            	var store = Ext.data.StoreManager.get('ClientStore');
					            	if(!store)
					            		store = Ext.create('HelcPAD.store.OpportunityManagement.CustomerInformation_New.ClientStore');
					            	store.removeAll();
					            }
					        }
					    ]
				  },
                {
                    xtype: 'list',
                    height: '92%',
                    id:'custornList',
                    store:'ClientStore',
                    itemTpl: [
							'<table border=0 width=100% style="color:#666" class="textf">'+
							'  <tr>'+
							'     <td width=10% rowspan="2">'+
							'        <div name="groupkung_custornanalysislist" class="p_judge_box2" id="groupkung_custornanalysislist">3</div>'+
							'     </td>'+
							'     <td width=90%>{Name}  {CSN}  {Organization}  {AccountAttribute}  {AccountStatus}</td>'+
							'  </tr>'+
							'  <tr>'+
							'      <td width=90%>{Type}</td>'+
							'  </tr>'+
							'</table>',
                    ],
                }
            ]
	      }*/]
	}
});