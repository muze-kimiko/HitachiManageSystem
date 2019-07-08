
/* JavaScript content from app/view/appworkspace/BatchApply/BatchList.js in folder common */


Ext.define('HelcPAD.view.appworkspace.BatchApply.BatchList', {
    extend: 'Ext.Container',
    id:'batchList_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '需审批单据',
                cls:'textfTwo',
                items: [
                    {
                    	id:'batchList_id_FH',
                        xtype: 'button',
                        ui: 'back',
                        text: '返回'
                    },{
                    	xtype:'spacer'
                    },
                    {
                    	id:'batchList_id_hidden',
                        xtype: 'hiddenfield',
                    }
                ]
            },
            {
                xtype: 'toolbar',
                cls:'textfTwo',
                docked: 'top',
                height: 50,
                layout: 'hbox',
                style: 'background:#EDEBF1;',
                html:'<div style="width=100%">'+
                		'<div class="anOneDiv">'+
                			'<div class="kOne ysBlue anOne" onclick="object.getController(\'appworkspace.BatchApply.BatchListCtrl\').backlistSJ(\'审批并指派\');">审批并指派</div>'+
                			'<div class="kOne ysRed anOne" onclick="object.getController(\'appworkspace.BatchApply.BatchListCtrl\').backlistSJ(\'拒绝\');">拒绝</div>'+
                		'</div>'+
                	 '</div>',
            },
            {
            	 xtype: 'list',
            	 height: '100%',
                 id:'batchList_id_list',
                 store:'BatchListStore',
                 itemTpl: [
						'<table border=0 width=100%>',
						'     <tr><td width=10% rowspan="9">'+
						'        <div name="BatchListName" class="p_judge_box2" id="BatchListID">3</div>'+
						'     </td></tr>'+
						'    <tr><td width=55%>{BILL_TYPE_NAME}</td><td width=35%>{CONTRACT_NO}</td></tr>',
						'    <tr><td colspan=2 width=90%>{CUSTOMER_NAME}</td></tr>',
						'    <tr><td colspan=2 width=90%>{FINAL_USE_UNIT}</td></tr>',
						'<tpl if="BILL_TYPE_NAME == \'特殊排产发货申请流程\'">',
						'    <tr><td width=45%>{RESPER_EMP}</td><td width=45%><button  id="ReasonCommentID" class="i_Button_List_Small">查看说明</button></td></tr>',//hzy04170
						'<tpl else>',
						'    <tr><td colspan=2 width=90%>{RESPER_EMP}</td></tr>',
						'</tpl>',
						'    <tr><td colspan=2 width=90%>{SIGNER_EMP}</td></tr>',
						'    <tr><td colspan=2 width=90%>{BILL_TYPE_NAME}</td></tr>',
						'    <tr><td colspan=2 width=90%>{FLOW_NAME}</td></tr>',
						'    <tr><td colspan=2 width=90%>{APPROVE_OPINION}</td></tr>',
						'</table>'

   						/*'<table border=0 width=100% style="color:#666" class="textf">'+
   						'  <tr>'+
   						'     <td width=10% rowspan="2">'+
   						'        <div name="BatchListName" class="p_judge_box2" id="BatchListID">3</div>'+
   						'     </td>'+
   						'     <td width=90%>{CUSTOMER_NAME}{CONTRACT_NO}</td>'+
   						'  </tr>'+
   						'  <tr>'+
   						'      <td width=90%>{Type}</td>'+
   						'  </tr>'+
   						'</table>',*/
                 ],
                 
            	/*id:'batchList_id_list',
                xtype: 'list',
                height: '100%',
                store:'BatchListStore',
                cls:'textfTwo',
                itemTpl: [
                          '<div>'+
                          '<div name="BatchListNameFFGG" class="p_judge_box2" id="BatchListIDFFDD">3</div>'+
                          '<div>{CUSTOMER_NAME}{CONTRACT_NO}</div>'+
                          '</div>',
                          
                          '<table border=0 width=100% style="color:#666" class="textf">'+
  						'  <tr>'+
  						'     <td width=10% rowspan="2">'+
  						'        <div name="BatchListNameFFGG" class="p_judge_box2" id="BatchListIDFFDD">3</div>'+
  						'     </td>'+
  						'     <td width=90%>{CUSTOMER_NAME}{CONTRACT_NO}</td>'+
  						'  </tr>'+
  						'  <tr>'+
  						'      <td width=90%></td>'+
  						'  </tr>'+
  						'</table>',
  						
                    '<table border=0 width=100%>',
                    '     <tr><td width=10% rowspan="9">'+
                    '        <div name="BatchListName" class="p_judge_box2" id="BatchListID">3</div>'+
                    '     </td></tr>'+
                    '    <tr><td width=55%>{BILL_TYPE_NAME}</td><td width=35%>{CONTRACT_NO}</td></tr>',
                    '    <tr><td colspan=2 width=90%>{CUSTOMER_NAME}</td></tr>',
                    '    <tr><td colspan=2 width=90%>{FINAL_USE_UNIT}</td></tr>',
                    '    <tr><td colspan=2 width=90%>{RESPER_EMP}</td></tr>',
                    '    <tr><td colspan=2 width=90%>{SIGNER_EMP}</td></tr>',
                    '    <tr><td colspan=2 width=90%>{BILL_TYPE_NAME}</td></tr>',
                    '    <tr><td colspan=2 width=90%>{FLOW_NAME}</td></tr>',
                    '    <tr><td colspan=2 width=90%>{APPROVE_OPINION}</td></tr>',
                    '</table>'
                ],
                onItemDisclosure: true*/
            }
        ]
    }

});