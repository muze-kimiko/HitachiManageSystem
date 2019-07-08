Ext.define('HelcAgent.view.OpportunityManagement.Project_New.InstallSiteBuildView',{
	extend: 'Ext.tab.Panel',
	id:'installSiteBuildPanel',
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

		
	  	  items: [{
	  	  	  xtype: 'toolbar',
	          docked: 'top',
	          title: '选择线索地点',
	          cls:'textf',
	          items: [{
	        	  id:'installSiteBuildBack',
	          	  xtype: 'button',
	              ui: 'back',
	              text: '返回'
	          },{
	        	  xtype:'spacer'
	          },{
	        	  id:'installSiteBuildBtn',
	        	  xtype:'button',
	        	  text:'新建'
	          }]
	      },
	      {
	    	  xtype: 'panel',
	          title:'线索地址新建',
	          cls:'textf',
	          items: [{
	        	  xtype:'formpanel',
	        	  height:'100%',
	        	  items:[{
	        		  xtype: 'fieldset',
	        		  title: '安装地信息',
	        		  cls:'textf',
	        		  items: [{
	        			  id:'installSiteBuildCountry',
	                      xtype: 'textfield',
	                      label: '国家地区',
	                      labelWidth:'35%',
	                      value:'中国',
	                      readOnly:true
	                  },
	                  {
	                	  id:'installSiteBuildProjectArea',
	                	  xtype:'selectfield',
	                	  label:'区域',
	                	  labelWidth:'35%',
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
	                	  id:'installSiteBuildProvince',
	                      xtype: 'selectfield',
	                      label: '省级',
	                      labelWidth:'35%',
	                  },
	                  {
	                	  id:'installSiteBuildCity',
	                      xtype: 'selectfield',
	                      label: '城市',
	                      labelWidth:'35%',
	                  },
	                  {
	                	  id:'installSiteBuildCounty',
	                	  xtype:'selectfield',
	                	  label:'县/区',
	                	  labelWidth:'35%',
	                  },
	                  {
	                	  id:'installSiteBuildAddress',
	                	  xtype:'textfield',
	                	  label:'安装地址',
	                	  labelWidth:'35%',
	                  },	                 
	                  ]
	        	  }]
	          },]
	      },]
	
	}
});