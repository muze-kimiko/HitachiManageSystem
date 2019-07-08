Ext.define('HelcAgent.view.OpportunityManagement.Agents.CustomerSelectView',{
	extend: 'Ext.Panel',
	id:'customerSelectXJ',
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
	          height:45,
	      },{
	    	  xtype:'toolbar',
          	  docked:'top',
          	  height:45,
          	  layout:'hbox',
          	  style:'background:#EDEBF1;',
	          html:'<div style="width=100%">'+
			         	  '<div class="anOneDiv">'+
			    			'<div class="ysZhOne anOne" id="customerSelect_back" onclick="object.getController(\'OpportunityManagement.Agents.CustomerSelectCtrl\').customerSelect_back();" style="width:29%;">'+SYB+'</div>'+
			    			'<div class="ysZhTwo anOne" id="custornerQuery" onclick="object.getController(\'OpportunityManagement.Agents.CustomerSelectCtrl\').custornerQuery();" style="width:29%;">查询</div>'+
			    			'<div class="ysZhThree anOne" id="confirmCheckClient" onclick="object.getController(\'OpportunityManagement.Agents.CustomerSelectCtrl\').confirmCustomer();" style="width:29%;">确认</div>'+
			    		  '</div>'+
					'</div>',
	      },
	      {
	    	  xtype: 'panel',
	          title:'查询条件',
	          height:60,
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
	                  }]
	        	  }]
	          },]
	      },
	      {
              xtype: 'list',
              id:'custornListXJ',
              store:'ClientStore',
              itemTpl: [
						'<table border=0 width=100% style="color:#666" class="textf">'+
						'  <tr>'+
						'     <td width=10% rowspan="2">'+
						'        <div name="groupkung_custornanalysislistXJ" class="p_judge_box2" id="groupkung_custornanalysislistXJ">3</div>'+
						'     </td>'+
						'     <td width=90%>{Name}</td>'+
						'  </tr>'+
						'</table>',
              ],
          
	      }]
	}
});