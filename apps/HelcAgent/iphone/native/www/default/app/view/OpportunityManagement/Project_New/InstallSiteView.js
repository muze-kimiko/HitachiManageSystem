
/* JavaScript content from app/view/OpportunityManagement/Project_New/InstallSiteView.js in folder common */
Ext.define('HelcAgent.view.OpportunityManagement.Project_New.InstallSiteView',{
	extend: 'Ext.tab.Panel',
	id:'installSitePanel',
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
	          title: '选择安装地点',
	          cls:'textf',
	          items: [{
	        	  id:'installSiteBack',
	          	  xtype: 'button',
	              ui: 'back',
	              text: '返回'
	          },{
	        	  xtype:'spacer'
	          },{
	        	  id:'toInstallSiteBuild',
	        	  xtype:'button',
	        	  text:'新建线索地点'
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
	        			  id:'installSiteCountry',
	                      xtype: 'textfield',
	                      label: '国家地区',
	                      labelWidth:'40%',
	                      value:'中国',
	                      readOnly:true
	                  },{
	                	  id:'installSiteProjectArea',
	                	  xtype:'selectfield',
	                	  label:'区域',
	                	  labelWidth:'40%',
	                	  options:[
	                	       {text:'请选择',value:''},    
	                	       {text:'华北',value:'华北'},
	                	       {text:'华中',value:'华中'},
	                	       {text:'华东',value:'华东'},
	                	       {text:'华南',value:'华南'},
	                	       {text:'东北',value:'东北'},
	                	       {text:'西北',value:'西北'},
	                	       {text:'西南',value:'西南'},
	                	       {text:'港澳台',value:'港澳台'},
	                	       
	                	  ]
	                  },
	                  {
	                	  id:'installSiteProvince',
	                      xtype: 'selectfield',
	                      label: '省级',
	                      labelWidth:'40%',
	                  },
	                  {
	                	  id:'installSiteCity',
	                      xtype: 'selectfield',
	                      label: '城市',
	                      labelWidth:'40%',
	                  },
	                  {
	                	  id:'installSiteCounty',
	                	  xtype:'selectfield',
	                	  label:'县/区',
	                	  labelWidth:'40%',
	                  },
	                  {
	                	  id:'installSiteAddress',
	                	  xtype:'textfield',
	                	  label:'安装地址',
	                	  labelWidth:'40%',
	                	  placeHolder:'请输入安装地址，可使用通配符',
	                  },{
	                	id:'installSiteComeSource',
	                	xtype:'hiddenfield'
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
	                              id:'installSiteQuery',
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
	    	id:'installSiteListContainer',  
	    	xtype: 'container',
	    	title: '线索地点列表',
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
						            	var records = Ext.getCmp('installSiteList').getSelection();
						            	if(records.length==0){
						            		Ext.Msg.alert('提示','请选择一条数据！');
						            		return;
						            	}
						            	var store = Ext.data.StoreManager.get('InstallSiteStore');
						            	if(!store)
						            		store = Ext.create('HelcAgent.store.OpportunityManagement.Project_New.InstallSiteStore');
						            	store.remove(records[0]);
						            }
						        },
						        {
						            xtype: 'button',
						            text: '全部删除',
						            handler:function(){
						            	var store = Ext.data.StoreManager.get('InstallSiteStore');
						            	if(!store)
						            		store = Ext.create('HelcAgent.store.OpportunityManagement.Project_New.InstallSiteStore');
						            	store.removeAll();
						            }
						        }
						    ]
				  },
            {
                xtype: 'list',
                height: '92%',
                id:'installSiteList',
                store:'InstallSiteStore',
                itemTpl: [
							'<table border=0 width=100% style="color:#666" class="textf">'+
							'  <tr>'+
							'     <td width=10% rowspan="2">'+
							'        <div name="groupkung_installSiteanalysislist" class="p_judge_box2" id="groupkung_installSiteanalysislist">3</div>'+
							'     </td>'+
							'     <td width=90%>{HELProvince} {HELCity} {HELCounty} </td>'+
							'  </tr>'+
							'  <tr>'+
							'      <td width=90%>{HELAddress}</td>'+
							'  </tr>'+
							'</table>',
                ],
            }
        ]
	      }]
	
	}
});