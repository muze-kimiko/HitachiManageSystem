/**
 * 抽查 基础数据  xcx 2014-11-12
 */

Ext.define('HelcPDA.view.selective_examination.CC_List', {
    extend: 'Ext.Panel',
    id:'CC_List_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.dataview.List',
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '基础数据',
                items: [{
                	xtype: 'button',
				    ui:'back',
				    text: '返回',
				    id: 'CC_List_id_FH',
				},{
					xtype: 'spacer'
				},{
					xtype: 'button',
				    ui:'back',
				    text: '确定',
				    id: 'CC_List_id_QD',
				},{
                	//用于判断是从那个页签进入
    				xtype:'hiddenfield',
    				id:'CC_List_id_IF',
    				value:''
    			},]
            },{
            	xtype: 'list',
                id:'CC_Select_List',
                height: '100%',
                itemId: 'CC_Select_List',
                itemTpl: [
				  	 	'<table border=0 width=100% style="color:#666">',
						'  <tr>',
						'    <td width=10% rowspan="5">',
						'	   <div name="groupCheckboxinstall" class="p_judge_box" id="pid_CC" style="color:{color};">3</div>',
						'    </td>',
						'    <td width=50% style="color:#000;height:32px">序号:{SUCCESSION}</td>',
						'    <td width=40% style="text-align: right">作业组名:{TASK_GROUP_NAME}</td>',
						'  </tr>',
						'  <tr>',
						'    <td>作业项目:{TASK_NAME}</td>',
						/*'      <input type="hidden" name="install_ENGCONTRACT_NUMBER" value="{ENGCONTRACT_NUMBER}"> ',*/
						'    <td style="text-align: right">项目说明:{TASK_EXPLAIN}</td>',
						'  </tr>',
						
						'  <tr>',
						'    <td>责任分类:{QUESTION_TYPE}</td>',
						'    <td style="text-align: right">扣分标准:{STANDARD_DEDUCTION}</td>',
						'  </tr>',
						
						'  <tr>',
						'    <td>国际项目作业要求:{GLOBAL_TASK_DEMAND}</td>',
						'    <td style="text-align: right">整备项目作业要求:{HOSTLING_TASK_DEMAND}</td>',
						'  </tr>',
						
						'  <tr>',
						'    <td></td>',
						'    <td style="text-align: right">扣分备注说明:<select id="{ROW_ID}"></select></td>',
						'  </tr>',
						'</table>'
                ],
                onItemDisclosure: true,
                store:'MV_CX_MAIN_RAN_INS_Store'
            },

//--------------------分离的      
        ]
    }
});