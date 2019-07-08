
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
            	id:'batchList_id_list',
                xtype: 'list',
                height: '100%',
                store:'BatchListStore',
                cls:'textfTwo',
                itemTpl: [
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
                onItemDisclosure: true
            }
        ]
    }

});