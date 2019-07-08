
/* JavaScript content from app/view/OpportunityManagement/Project_New/KeyContactConstructView.js in folder common */
Ext.define('HelcPAD.view.OpportunityManagement.Project_New.KeyContactConstructView',{
	extend: 'Ext.tab.Panel',
	id:'keyContactConstructPanel',
	config:{
			items:[
			       {
			    	   xtype:'toolbar',
			    	   docked:'top',
				       title: '新建联系人',
				       cls:'textf',
				       items:[
				              {
				            	  id:'keyContactConstructBack',
				            	  xtype:'button',
				            	  ui:'back',
				            	  text:'返回'
				              }
				       ]
			       },{

				    	  xtype: 'panel',
				          title:'联系人信息',
				          cls:'textf',
				          items: [{
				        	  xtype:'formpanel',
				        	  height:'100%',
				        	  items:[{
				        		  xtype: 'fieldset',
				        		  cls:'textf',
				        		  items: [{
				        			  id:'contactConstructLastName',
				                      xtype: 'textfield',
				                      label: '姓氏',
				                      labelWidth:'35%',
				                      placeHolder:'请输入姓氏',
				                      //value:'张'
				                  },
				                  {
				                	  id:'contactConstructFirstName',
				                      xtype: 'textfield',
				                      label: '名字',
				                      labelWidth:'35%',
				                      placeHolder: '请输入名字',
				                      //value:'振宇'
				                  },
				                  {
				                	id:'contactConstructSex',
				                	xtype:'selectfield',
				                	label:'性别',
				                	labelWidth:'35%',
				                	options:[
				                	         {text:'请选择',value:''},
				                	         {text:'先生',value:'先生'},
				                	         {text:'女士',value:'女士'},
				                	         {text:'小姐',value:'小姐'},
				                	         {text:'夫人',value:'夫人'},
				                	         {text:'博士',value:'博士'}
				                	]
				                  },
				                  {
				                	  id:'constructjobTitle',
				                	  xtype:'textfield',
				                	  label:'职称',
				                	  labelWidth:'35%',
				                	  placeHolder:'请输入职称'
				                	  
				                  },
				                  {
				                	  id:'constructWorkPhone',
				                      xtype: 'textfield',
				                      label: '办公电话',
				                      labelWidth:'35%',
				                      placeHolder: '请输入办公电话',
				                      
				                  },
				                  {
				                	  id:'keyContactConstructAccount',
				                	  xtype:'textfield',
				                	  label:'客户',
				                	  labelWidth:'47%',
				                	  width:'75%',
				                	  style:'float:left',
				                	  placeHolder:'关联客户'	  
				                  },
				                  {
				                	  id:'toKeyContactConstructAccount',
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
				                              id:'keyContactConstruct',
				                              margin: '15 0',
				                              width: '90%',
				                              text: '新建',
				                              
				                          },
				                          {
				                              xtype: 'spacer'
				                          }
				                      ]
				                  },]
				        	  }]
				          },]
				      
			       }
			]
	}
});