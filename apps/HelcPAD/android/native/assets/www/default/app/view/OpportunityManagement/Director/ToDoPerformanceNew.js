
/* JavaScript content from app/view/OpportunityManagement/Director/ToDoPerformanceNew.js in folder common */

Ext.define('HelcPAD.view.OpportunityManagement.Director.ToDoPerformanceNew', {
    extend: 'Ext.Container',
    id:'ToDoPerformanceNew_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        items: [
			{
			    xtype: 'toolbar',
			    docked: 'top',
			    title: '经销商业绩确认',
			    cls:'textf',
			    height:45,
			},
			{
                xtype: 'toolbar',
                docked: 'top',
                height: 130,
                layout: 'hbox',
                style: 'background:#EDEBF1;',
                html:'<div style="width=100%">'+
                		'<div class="anOneDiv">'+
                			'<div class="kOne ysBlue anOne" id="ToDoPerformanceNew_id_SYY">'+SYB+'</div>'+
                			'<div class="kOne ysRed anOne" id="ToDoPerformanceNew_id_CX">查询</div>'+
                		'</div>'+
                		'<div>'+
                			'<input type="text" class="anThreeDiv" placeholder="请输入合同号" id="ToDoPerformanceNew_id_HTH"/>'+
                		'</div>'+
                		'<div>'+
            				'<input type="text" class="anThreeDiv" placeholder="请输入关键字(商机名称、客户名称、使用单位)" id="ToDoPerformanceNew_id_GJZ"/>'+
            			'</div>'+
                	 '</div>',
            },
        
            {
            	id:'ToDoPerformanceNew_id_list',
			    xtype: 'list',
			    height: "100%",
			    store:'ToDoPerformanceAgentListStore',
			    itemTpl: [
					'<table border=0 width=100%>',
					'    <tr><td width=50%>{Name}</td><td width=50% colspan = "2" >{ContractNumber}</td></tr>',
					'    <tr><td width=100% colspan = "3">{Account}</td></tr>',
					'    <tr><td width=100% colspan = "3">{OpptyFinalUser}</td></tr>',
					'    <tr><td width=40%>{OpportunityNumber}</td><td width=30%>{SalesRep}</td><td width=30%>{OpptyStatus}</td></tr>',
					'</table>'
			    ],
			    onItemDisclosure: true
			}
            
          
        ]
    },

});
