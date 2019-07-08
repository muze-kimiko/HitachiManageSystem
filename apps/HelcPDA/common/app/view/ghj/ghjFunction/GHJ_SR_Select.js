

Ext.define('HelcPDA.view.ghj.ghjFunction.GHJ_SR_Select', {
	  extend: 'Ext.tab.Panel',
	  id:'GHJ_SR_Select_id',
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

	  config: {
	  	  items: [{
	  	  	  xtype: 'toolbar',
	          docked: 'top',
	          title: '服务请求查询',
	          items: [{
	        	  id:'GHJ_SR_Select_id_FH',
	          	  xtype: 'button',
	              ui: 'back',
	              text: '返回'
	          },{
	          	  xtype: 'spacer'
	          },{
	        	  id:'GHJ_SR_Select_id_QD',
	          	  xtype: 'button',
	              text: '确定',
	              hidden:true,
	          },]
	      },
	      {
	    	  xtype: 'panel',
	          title:'查询条件',
	          items: [{
	        	  xtype:'formpanel',
	        	  height:'100%',
	        	  items:[{
	        		  xtype: 'fieldset',
	        		  title: '支持模糊查询',
	        		  cls:'textf',
	        		  items: [{
	        			  id:'SR_SRNumber',
	                      xtype: 'textfield',
	                      label: '服务请求编号',
	                      labelWidth: 130,
	                  },
	                  {
	                	  id:'SR_ServiceRequestSource',
	                      xtype: 'selectfield',
	                      label: '服务请求来源',
	                      labelWidth: 130,
	                  },
	                  {
	                	  id:'SR_Abstract',
	                      xtype: 'textfield',
	                      label: '受信内容',
	                      labelWidth: 130,
	                  },
	                  {
	                	  id:'SR_StartTime',
	                      xtype: 'textfield',
	                      label: '受信时间',
	                      labelWidth: 130,
	                      listeners:{
	                        	focus:function(){
	                        		initDate1('SR_StartTime','受信时间');
	                        	}
	                      },
	                      placeHolder:'请选择受信时间',
	                      readOnly: true,
	                  },
	                  {
	                	  id:'SR_BoxUp',
	                      xtype: 'selectfield',
	                      label: '是否困人',
	                      labelWidth: 130,
	                  },
	                  {
	                	  id:'SR_AssetNumber',
	                      xtype: 'textfield',
	                      label: '故障工号',
	                      labelWidth: 130,
	                  },
	                  {
	                	  id:'SR_Company',
	                      xtype: 'selectfield',
	                      label: '所属司',
	                      labelWidth: 130,
	                  },
	                  {
	                	  id:'SR_AssetDomainName',
	                      xtype: 'textfield',
	                      label: '工号地盘',
	                      labelWidth: 130,
	                  },
	                  {
	                	  id:'SR_AssetAddress',
	                      xtype: 'textfield',
	                      label: '工号地址',
	                      labelWidth: 130,
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
	                              id:'GHJ_SR_Select_id_CX',
	                              margin: '15 0',
	                              width: '90%',
	                              text: '查询'
	                          },
	                          {
	                              xtype: 'spacer'
	                          }
	                      ]
	                  },]
	        	  }]
	          },]
	      },{
	    	  xtype: 'container',
              title: '查询结果',
              items: [
                  {
                      xtype: 'list',
                      height: '100%',
                      id:'GHJ_SR_Select_id_list',
                      store:'GHJ_SR_SelectStore',
                      itemTpl: [
							'<table border=0 width=100% style="color:#666" class="textf">'+
							'  <tr>'+
							'     <td width=10% rowspan="2">'+
							'        <div name="groupkung_GHJ_SR_Select" class="p_judge_box2" id="conkung_GHJ_SR_Select">3</div>'+
							'     </td>'+
							'     <td width=50%>{SRNumber} </td>'+
							'     <td width=40%>{StartTime}</td>'+
							'  </tr>'+
							'</table>',
                      ],
                  }
              ]
	      }]
      }

});
