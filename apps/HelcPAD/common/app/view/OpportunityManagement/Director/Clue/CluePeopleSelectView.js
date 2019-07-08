
Ext.define('HelcPAD.view.OpportunityManagement.Director.Clue.CluePeopleSelectView',{
	extend: 'Ext.tab.Panel',
	id:'cluePeopleSelectView',
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
	  		  id:'cluePeopleSelectViewToolbar',
	  	  	  xtype: 'toolbar',
	          docked: 'top',
	          title: '总部跟踪人员',
	          cls:'textf',
	          items: [
	          /*{
	        	  id:'cluePeopleSelectView_FH',
	          	  xtype: 'button',
	              ui: 'back',
	              text: '返回'
	          },
	          {
	        	  xtype:'spacer'
	          },
	          {
	        	  xtype:'button',
	        	  id:'cluePeopleSelectView_QR',
	        	  text:'确认',
	          }*/
	          ]
	      },
	      {
          	id:'cluePeopleSelectView_toolbar',
              xtype: 'toolbar',
              docked: 'top',
              layout: 'hbox',
              style: 'background:#EDEBF1;',
          },
	      {
	    	  id:'cluePeopleSelectView_panel',
	    	  xtype: 'panel',
	          title:'查询条件',
	          cls:'textf',
	          items: [{
	        	  id:'cluePeopleSelectView_formpanel',
	        	  xtype:'formpanel',
	        	  height:'100%',
	        	  items:[{
	        		  xtype: 'fieldset',
	        		  title: '查询条件',
	        		  cls:'textf',
	        		  items: [{
	        			  id:'cluePeopleSelectView_lastName',
	                      xtype: 'textfield',
	                      label: '姓氏',
	                      labelWidth:'35%',
	                      placeHolder:'请输入姓氏',
	                  },
	                  {
	                	  id:'cluePeopleSelectView_firstName',
	                      xtype: 'textfield',
	                      label: '名字',
	                      labelWidth:'35%',
	                      placeHolder: '请输入名字',
	                  },
	                  {
	                	 id:'cluePeopleSelectView_salesRepLoginName',
	                	 xtype:'textfield',
	                	 label:'用户',
	                     labelWidth:'35%',
	                     placeHolder: '请输入用户',
	                  },
	                  {
	                	  id:'cluePeopleSelectView_positionName',
	                      xtype: 'textfield',
	                      label: '职位',
	                      labelWidth:'35%',
	                      placeHolder: '请输入职位',
	                      
	                  },
	                  {
	                	id:'cluePeopleSelectView_division',
	                	xtype:'textfield',
	                	label:'部门',
	                	labelWidth:'35%',
	                    placeHolder: '请输入部门',
	                  },
	                  {
	                	  id:'cluePeopleSelectView_positionType',
	                	  xtype:'selectfield',
	                	  label:'职位类型',
	                	  labelWidth:'35%',
	                	  placeHolder:'请输入职位类型',
	                	  value:'一级分公司',
	                	  options:[
	                	      
	                		  {text:'销售代表',value:'销售代表'},
	                	  ]
	                  },{
	                	  id:'cluePeopleSelectView_salesRepOrganization',
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
	                              id:'cluePeopleSelectView_CX',
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
	    	id:'cluePeopleSelectViewListContainer',  
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
						            	var records = Ext.getCmp('cluePeopleSelectViewList').getSelection();
						            	if(records.length==0){
						            		Ext.Msg.alert('提示','请选择一条数据！');
						            		return;
						            	}
						            	var store = Ext.data.StoreManager.get('ClueResultStore');
						            	if(!store)
						            		store = Ext.create('HelcPAD.store.OpportunityManagement.Director.Clue.ClueResultStore');
						            	store.remove(records[0]);
						            }
						        },
						        {
						            xtype: 'button',
						            text: '全部删除',
						            handler:function(){
						            	var store = Ext.data.StoreManager.get('ClueResultStore');
						            	if(!store)
						            		store = Ext.create('HelcPAD.store.OpportunityManagement.Director.Clue.ClueResultStore');
						            	store.removeAll();
						            }
						        }
						    ]
				  },
                {
                    xtype: 'list',
                    height: '92%',
                    id:'cluePeopleSelectViewList',
                    store:'ClueResultStore',
                    itemTpl: [
							'<table border=0 width=100% style="color:#666" class="textf">'+
							'  <tr>'+
							'     <td width=10% rowspan="2">'+
							'        <div name="groupkung_cluePeopleSelectViewlist" class="p_judge_box2" id="conkung_cluePeopleSelectViewlist">3</div>'+
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