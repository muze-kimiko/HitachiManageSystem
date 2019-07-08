Ext.define('HelcPAD.view.OpportunityManagement.Project_New.NewHQSalesRepView',{
	extend: 'Ext.Panel',
	id:'NewHQSalesRepPanel',
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
	  		  id:'newSalesRepToolbar',
	  	  	  xtype: 'toolbar',
	          docked: 'top',
	          title: '总部跟踪人员',
	          cls:'textf',
	          /*items: [{
	        	  id:'newHQSalesRepPanelBack',
	          	  xtype: 'button',
	              ui: 'back',
	              text: '返回'
	          },{
	        	  xtype:'spacer'
	          },{
	        	  xtype:'button',
	        	  id:'HQSalesRepPanelComplete',
	        	  text:'确认选择',
	          }]*/
	      },{
	    	  xtype:'toolbar',
          	  docked:'top',
          	  height:50,
          	  layout:'hbox',
          	  style:'background:#EDEBF1;',
	          html:'<div style="width=100%">'+
			         	  '<div class="anOneDiv">'+
			    			'<div class="ysZhOne anOne" id="newHQSalesRepBack" onclick="object.getController(\'OpportunityManagement.Project_New.HQSalesRepCtrl\').HQSalesRepPanelBack();" style="width:29%;">'+SYB+'</div>'+
			    			'<div class="ysZhTwo anOne" id="newHQSalesRepQuery" onclick="object.getController(\'OpportunityManagement.Project_New.HQSalesRepCtrl\').NewHQSalesRepQuery();" style="width:29%;">查询</div>'+
			    			'<div class="ysZhThree anOne" id="confirmCheckNewHQSalesRep" onclick="object.getController(\'OpportunityManagement.Project_New.HQSalesRepCtrl\').confirmNewHQSalesRep();" style="width:29%;">确认</div>'+
			    		  '</div>'+
					'</div>',
	      },
	      {
	    	  id:'newHQSalesRepPanel_panel',
	    	  xtype: 'panel',
	          title:'查询条件',
	          cls:'textf',
	          height:170,
	          items: [{
	        	  id:'newHQSalesRepPanel_formpanel',
	        	  xtype:'formpanel',
	        	  height:'100%',
	        	  scrollable:false,
	        	  items:[{
	        		  xtype: 'fieldset',
	        		  cls:'textf',
	        		  items: [{
	        			  id:'salesRepLastName',
	                      xtype: 'textfield',
	                      label: '姓氏',
	                      labelWidth:'35%',
	                      placeHolder:'请输入姓氏',
	                  },
	                  {
	                	  id:'salesRepFirstName',
	                      xtype: 'textfield',
	                      label: '名字',
	                      labelWidth:'35%',
	                      placeHolder: '请输入名字',
	                  },
	                  {
	                	 id:'newSalesRepLoginName',
	                	 xtype:'textfield',
	                	 label:'用户',
	                     labelWidth:'35%',
	                     placeHolder: '请输入用户',
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
	                              id:'HQSalesRepQuery',
	                              margin: '15 0',
	                              width: '90%',
	                              text: '查询',
	                              
	                          },
	                          {
	                              xtype: 'spacer'
	                          }
	                      ]
	                  },*/]
	        	  }]
	          },]
	      },{
              xtype: 'list',
              height: '60%',
              id:'NewHQSalesRepList',
              store:'NewHQSalesRepStore',
              itemTpl: [
						'<table border=0 width=100% style="color:#666" class="textf">'+
						'  <tr>'+
						'     <td width=10% rowspan="2">'+
						'        <div name="newgroupkung_HQSalesRepanalysislist" class="p_judge_box2" id="newgroupkung_HQSalesRepanalysislist">3</div>'+
						'     </td>'+
						'     <td width=90%>{ActiveLastName}{ActiveFirstName} </td>'+
						'  </tr>'+
						'  <tr>'+
						'      <td width=90%>{Division}  &nbsp; {Name}</td>'+
						'  </tr>'+
						'</table>',
              ],
          },/*{
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
						            		store = Ext.create('HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore');
						            	store.remove(records[0]);
						            }
						        },
						        {
						            xtype: 'button',
						            text: '全部删除',
						            handler:function(){
						            	var store = Ext.data.StoreManager.get('HQSalesRepStore');
						            	if(!store)
						            		store = Ext.create('HelcPAD.store.OpportunityManagement.Project_New.HQSalesRepStore');
						            	store.removeAll();
						            }
						        }
						    ]
				  },
                {
                    xtype: 'list',
                    height: '92%',
                    id:'NewHQSalesRepList',
                    store:'NewHQSalesRepStore',
                    itemTpl: [
							'<table border=0 width=100% style="color:#666" class="textf">'+
							'  <tr>'+
							'     <td width=10% rowspan="2">'+
							'        <div name="newgroupkung_HQSalesRepanalysislist" class="p_judge_box2" id="newgroupkung_HQSalesRepanalysislist">3</div>'+
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
	      }*/]
	}
});