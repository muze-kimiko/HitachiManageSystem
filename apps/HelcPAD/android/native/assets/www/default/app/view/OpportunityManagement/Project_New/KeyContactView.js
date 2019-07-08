
/* JavaScript content from app/view/OpportunityManagement/Project_New/KeyContactView.js in folder common */

Ext.define('HelcPAD.view.OpportunityManagement.Project_New.KeyContactView',{
	extend: 'Ext.tab.Panel',
	id:'keyContactPanel',
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
	  	  	  xtype: 'toolbar',
	          docked: 'top',
	          title: '选择联系人',
	          cls:'textf',
	          items: [{
	        	  id:'KeyContactPanelback',
	          	  xtype: 'button',
	              ui: 'back',
	              text: '返回'
	          },{
	        	  xtype:'spacer',
	          },{
	        	  id:'buildContact',
	        	  xtype:'button',
	        	  text:'新建联系人'
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
	        		  title: '查询条件',
	        		  cls:'textf',
	        		  items: [{
	        			  id:'contactLastName',
	                      xtype: 'textfield',
	                      label: '姓氏',
	                      labelWidth:'35%',
	                      placeHolder:'请输入姓氏',
	                      //value:'张'
	                  },
	                  {
	                	  id:'contactFirstName',
	                      xtype: 'textfield',
	                      label: '名字',
	                      labelWidth:'35%',
	                      placeHolder: '请输入名字',
	                      //value:'振宇'
	                  },
	                  {
	                	id:'contactSex',
	                	xtype:'selectfield',
	                	label:'性别',
	                	labelWidth:'35%',
	                	options:[
	                	         {text:'请选择',value:''},
	                	         {text:'先生',value:'先生'},
	                	         {text:'女士',value:'女士'},
	                	         {text:'小姐',value:'小姐'},
	                	         {text:'夫人',value:'夫人'},
	                	         {text:'博士',value:'博士'},
	                	]
	                  },
	                  {
	                	  id:'jobTitle',
	                	  xtype:'textfield',
	                	  label:'职称',
	                	  labelWidth:'35%',
	                	  placeHolder:'请输入职称'
	                	  
	                  },
	                  {
	                	  id:'workPhone',
	                      xtype: 'textfield',
	                      label: '办公电话',
	                      labelWidth:'35%',
	                      placeHolder: '请输入办公电话',
	                      
	                  },
	                  {
	                	  id:'keyContactAccount',
	                	  xtype:'textfield',
	                	  label:'客户',
	                	  labelWidth:'47%',
	                	  width:'75%',
	                	  style:'float:left',
	                	  placeHolder:'选择客户'	  
	                  },
	                  {
	                	  id:'toKeyContactAccount',
	                	  xtype:'button',
	                	  style:'float:left',
	                	  margin: '9 0 0 0',
	                	  width:'25%',
	                	  text:'详情'
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
	                              id:'keyContactQuery',
	                              margin: '15 0',
	                              width: '90%',
	                              text: '查找',
	                              
	                          },
	                          {
	                              xtype: 'spacer'
	                          }
	                      ]
	                  },]
	        	  }]
	          },]
	      },{
	    	id:'keyContactContainer',  
	    	xtype: 'container',
            title: '联系人列表',
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
						            	var records = Ext.getCmp('keyContactList').getSelection();
						            	if(records.length==0){
						            		Ext.Msg.alert('提示','请选择一条数据！');
						            		return;
						            	}
						            	var store = Ext.data.StoreManager.get('KeyContactStore');
						            	if(!store)
						            		store = Ext.create('HelcPAD.store.OpportunityManagement.Project_New.KeyContactStore');
						            	store.remove(records[0]);
						            }
						        },
						        {
						            xtype: 'button',
						            text: '全部删除',
						            handler:function(){
						            	var store = Ext.data.StoreManager.get('KeyContactStore');
						            	if(!store)
						            		store = Ext.create('HelcPAD.store.OpportunityManagement.Project_New.KeyContactStore');
						            	store.removeAll();
						            }
						        }
						    ]
				  },
                {
                    xtype: 'list',
                    height: '92%',
                    id:'keyContactList',
                    store:'KeyContactStore',
                    itemTpl: [
							'<table border=0 width=100% style="color:#666" class="textf">'+
							'  <tr>'+
							'     <td width=10% rowspan="2">'+
							'        <div name="groupkung_keyContactanalysislist" class="p_judge_box2" id="groupkung_keyContactanalysislist">3</div>'+
							'     </td>'+
							'     <td width=90%>{LastName}{FirstName} </td>'+
							'  </tr>'+
							'  <tr>'+
							'      <td width=90%>{Account}</td>'+
							'  </tr>'+
							'</table>',
                    ],
                }
            ]
	      }]
	}
});