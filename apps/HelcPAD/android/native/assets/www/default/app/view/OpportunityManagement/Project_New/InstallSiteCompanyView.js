
/* JavaScript content from app/view/OpportunityManagement/Project_New/InstallSiteCompanyView.js in folder common */

Ext.define('HelcPAD.view.OpportunityManagement.Project_New.InstallSiteCompanyView',{
	extend: 'Ext.tab.Panel',
	id:'installSiteCompanySelect',
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
	          title: '选择安装所在分公司',
	          cls:'textf',
	          items: [{
	        	  id:'installSiteCompanySelect_back',
	          	  xtype: 'button',
	              ui: 'back',
	              text: '返回'
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
	        			  id:'partyId',
	                      xtype: 'textfield',
	                      label: '分公司编码',
	                      labelWidth:'47%',
	                      placeHolder:'请输入分公司编码',
	                      //value:'1-KO1VE'
	                  },
	                  {
	                	  id:'companyName',
	                      xtype: 'textfield',
	                      label: '分公司名称',
	                      labelWidth:'47%',
	                      placeHolder: '请输入分公司名称',
	                      //value:'汕头'
	                  },
	                  {
	                	  id:'parentOrganizationName',
	                      xtype: 'textfield',
	                      label: '上级组织',
	                      labelWidth:'47%',
	                      placeHolder: '请输入上级组织',
	                      //value:'营业工程总部'
	                  },
	                  {
	                	  id:'companyType',
	                	  xtype:'selectfield',
	                	  label:'分公司类型',
	                	  labelWidth:'47%',
	                	  placeHolder:'请输入分公司类型',
	                	  //value:'一级分公司',
	                	  options:[
	                		  {text:'一级分公司',value:'一级分公司'},
	                		  {text:'二级分公司',value:'二级分公司'},
	                		  {text:'销售公司',value:'销售公司'},
	                		  {text:'工程公司',value:'工程公司'},
	                		 
	                	  ]
	                  },
	                  {
	                	  id:'companyProvince',
	                	  xtype:'selectfield',
	                	  label:'分工公司所在省',
	                	  labelWidth:'47%',
	                  },
	                  {
	                	  id:'companyCity',
	                	  xtype:'selectfield',
	                	  label:'分工公司所在市',
	                	  labelWidth:'47%',
	                  },
	                  {
	                	  id:'companyCounty',
	                	  xtype:'selectfield',
	                	  label:'分工公司所在区',
	                	  labelWidth:'47%',
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
	                              id:'companyQuery',
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
	    	id:'companyListContainer',  
	    	xtype: 'container',
            title: '分公司列表',
            items: [
                  //功能多余，暂时屏蔽  xcx 2017-9-18  
				  /*{
					    xtype: 'segmentedbutton',
					    margin: 10,
					    cls:'textf',
					    items: [
						        {
						            xtype: 'button',
						            id:'custornAddress_new_id_DGSC',
						            text: '选中删除',
						            handler:function(){
						            	var records = Ext.getCmp('companyList').getSelection();
						            	if(records.length==0){
						            		Ext.Msg.alert('提示','请选择一条数据！');
						            		return;
						            	}
						            	var store = Ext.data.StoreManager.get('InstallSiteCompanyStore');
						            	if(!store)
						            		store = Ext.create('HelcPAD.store.OpportunityManagement.Project_New.InstallSiteCompanyStore');
						            	console.log(records);
						            	store.remove(records[0]);
						            }
						        },
						        {
						            xtype: 'button',
						            id:'custornAddress_new_id_QBSC',
						            text: '全部删除',
						            handler:function(){
						            	var store = Ext.data.StoreManager.get('InstallSiteCompanyStore');
						            	if(!store)
						            		store = Ext.create('HelcPAD.store.OpportunityManagement.Project_New.InstallSiteCompanyStore');
						            	store.removeAll();
						            }
						        }
						    ]
				  },*/
                {
                    xtype: 'list',
                    height: '92%',
                    id:'companyList',
                    store:'InstallSiteCompanyStore',
                    itemTpl: [
                            //2016-06-08
							/*'<table border=0 width=100% style="color:#666" class="textf">'+
							'  <tr>'+
							'     <td width=10% rowspan="2">'+
							'        <div name="groupkung_companyanalysislist" class="p_judge_box2" id="groupkung_companyanalysislist">3</div>'+
							'     </td>'+
							'     <td width=90%>{Name} </td>'+
							'  </tr>'+
							'  <tr>'+
							'      <td width=90%>{StreetAddress}  {Type}  {Organization} </td>'+
							'  </tr>'+
							'</table>',*/
                            '<table border=0 width=100% style="color:#666" class="textf">'+
							'  <tr>'+
							/*'     <td width=10% rowspan="2">'+
							'        <div name="groupkung_companyanalysislist" class="p_judge_box2" id="groupkung_companyanalysislist">3</div>'+
							'     </td>'+*/
							'     <td width=90%>{Name} </td>'+
							'  </tr>'+
							'  <tr>'+
							'      <td width=90%>{StreetAddress}  {Type}  {Organization} </td>'+
							'  </tr>'+
							'</table>',
                    ],
                }
            ]
	      }]
	}
});