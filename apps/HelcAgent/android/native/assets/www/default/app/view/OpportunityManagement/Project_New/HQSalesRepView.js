
/* JavaScript content from app/view/OpportunityManagement/Project_New/HQSalesRepView.js in folder common */

Ext.define('HelcAgent.view.OpportunityManagement.Project_New.HQSalesRepView',{
	extend: 'Ext.tab.Panel',
	id:'HQSalesRepPanel',
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
		listeners:{
			  activeitemchange:function( tabPanel, value, oldValue, eOpts ){
				  oldValue.setHidden(true);
				  if(value)
					  value.setHidden(false);
			  }
		  },
	  	  items: [{
	  		  id:'salesRepToolbar',
	  	  	  xtype: 'toolbar',
	          docked: 'top',
	          title: '总部跟踪人员',
	          cls:'textf',
	          items: [{
	        	  id:'HQSalesRepPanelBack',
	          	  xtype: 'button',
	              ui: 'back',
	              text: '返回'
	          },{
	        	  xtype:'spacer'
	          },{
	        	  xtype:'button',
	        	  id:'HQSalesRepPanelComplete',
	        	  text:'确认选择',
	          }]
	      },
	      {
	    	  id:'HQSalesRepPanel_panel',
	    	  xtype: 'panel',
	          title:'查询条件',
	          cls:'textf',
	          items: [{
	        	  id:'HQSalesRepPanel_formpanel',
	        	  xtype:'formpanel',
	        	  height:'100%',
	        	  items:[{
	        		  xtype: 'fieldset',
	        		  title: '查询条件',
	        		  cls:'textf',
	        		  items: [{
	        			  id:'lastName',
	                      xtype: 'textfield',
	                      label: '姓氏',
	                      labelWidth:'35%',
	                      placeHolder:'请输入姓氏',
	                  },
	                  {
	                	  id:'firstName',
	                      xtype: 'textfield',
	                      label: '名字',
	                      labelWidth:'35%',
	                      placeHolder: '请输入名字',
	                  },
	                  {
	                	 id:'salesRepLoginName',
	                	 xtype:'textfield',
	                	 label:'用户',
	                     labelWidth:'35%',
	                     placeHolder: '请输入用户',
	                  },
	                  {
	                	  id:'positionName',
	                      xtype: 'textfield',
	                      label: '职位',
	                      labelWidth:'35%',
	                      placeHolder: '请输入职位',
	                      
	                  },
	                  {
	                	id:'division',
	                	xtype:'textfield',
	                	label:'部门',
	                	labelWidth:'35%',
	                    placeHolder: '请输入部门',
	                  },
	                  {
	                	  id:'positionType',
	                	  xtype:'selectfield',
	                	  label:'职位类型',
	                	  labelWidth:'35%',
	                	  placeHolder:'请输入职位类型',
	                	  //value:'一级分公司',
	                	  options:[
	                	      
	                		  {text:'销售代表',value:'销售代表'},
	                	  ]
	                  },{
	                	  id:'salesRepOrganization',
	                	  xtype:'textfield',
	                	  label:'所在分公司',
	                	  labelWidth:'35%',
	                	  placeHolder:'请输入所在分公司'
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
	                              id:'HQSalesRepQuery',
	                              margin: '15 0',
	                              width: '90%',
	                              text: '查询',
	                              
	                          },
	                          {
	                              xtype: 'spacer'
	                          }
	                      ]
	                  },]
	        	  }]
	          },]
	      },{
	    	id:'HQSalesRepListContainer',  
	    	xtype: 'container',
            title: '人员别表',
            items: [
				  {
					    xtype: 'segmentedbutton',
					    margin: 10,
					    cls:'textf',
					    items: [
						        {
						            xtype: 'button',						          
						            text: '选中删除',
						            handler:function(){
						            	var records = Ext.getCmp('HQSalesRepList').getSelection();
						            	if(records.length==0){
						            		Ext.Msg.alert('提示','请选择一条数据！');
						            		return;
						            	}
						            	var store = Ext.data.StoreManager.get('HQSalesRepStore');
						            	if(!store)
						            		store = Ext.create('HelcAgent.store.OpportunityManagement.Project_New.HQSalesRepStore');
						            	store.remove(records[0]);
						            }
						        },
						        {
						            xtype: 'button',
						            text: '全部删除',
						            handler:function(){
						            	var store = Ext.data.StoreManager.get('HQSalesRepStore');
						            	if(!store)
						            		store = Ext.create('HelcAgent.store.OpportunityManagement.Project_New.HQSalesRepStore');
						            	store.removeAll();
						            }
						        }
						    ]
				  },
                {
                    xtype: 'list',
                    height: '92%',
                    id:'HQSalesRepList',
                    store:'HQSalesRepStore',
                    itemTpl: [
							'<table border=0 width=100% style="color:#666" class="textf">'+
							'  <tr>'+
							'     <td width=10% rowspan="2">'+
							'        <div name="groupkung_HQSalesRepanalysislist" class="p_judge_box2" id="groupkung_HQSalesRepanalysislist">3</div>'+
							'     </td>'+
							'     <td width=90%>{ActiveLastName}{ActiveFirstName} </td>'+
							'  </tr>'+
							'  <tr>'+
							'      <td width=90%>{Division}  &nbsp; {Name}</td>'+
							'  </tr>'+
							'</table>',
                    ],
                }
            ]
	      }]
	}
});