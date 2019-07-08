Ext.define('HelcPAD.view.OpportunityManagement.Project_New.BeInChargeOf.ProjectWaitForLoseList',{
	extend: 'Ext.Container',
	 id:'projectWaitForLoseListContainer',
	 config:{
		 items:[
	            {
	                xtype: 'toolbar',
	                docked: 'top',
	                title: '待流失商机',
	                cls:'textf',
	                /*items: [
	                    {
	                    	id:'projectWaitForLoseListBack',
	                        xtype: 'button',
	                        ui: 'back',
	                        text: '返回'
	                    },
	                    {
	                        xtype: 'spacer'
	                    },
	                    
	                ]*/
	            },{
	            	xtype:'toolbar',
	                 docked: 'top',
	                 height: '6%',
	                 layout: 'hbox',
	                 style: 'background:#EDEBF1;',
	                 html:'<div style="width:100%">'+
			                 '<div class="anOneDiv">'+
				    			'<div class="ysBlue anOne" style="width:96%;" onclick="object.getController(\'OpportunityManagement.Project_New.BeInChargeOf.ProjectWaitForLoseCtrl\').projectWaitForLoseListBack();">'+SYB+'</div>'+
				    		 '</div>'+
	                	 '</div>',
	            },
	            {
					id:'waitForLoseOpptyList',
				    xtype: 'list',
				    height: '100%',
				    store:'DirectorOpptyStore',
				    itemTpl: [
						'<table border=0 width=100% style="color:#666" class="textf">'+
						'  <tr>'+

						'     <td width=50% style="font-size:12px;">{OpportunityNumber}</td>'+
						'     <td width=50% style="font-size:12px;">{Name}</td>'+
						'  </tr>'+
						'  <tr>'+
						'      <td style="font-size:12px;">{OpptyStatus}</td>'+
						'	   <td style="font-size:12px;">{Account}</td>'+
						'  </tr>'+
						'</table>',
				        /*'<div><input type=\'checkbox\'>商机编号	商机名称</div>',
				        '<div>商机状态	客户名称</div>'*/
				    ],
				    onItemDisclosure: true
				
	            },
	            
	           
	        ]
	 }
});