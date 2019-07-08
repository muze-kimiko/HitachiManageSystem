
/* JavaScript content from app/view/OpportunityManagement/Director/ToDoClueNew.js in folder common */

Ext.define('HelcPAD.view.OpportunityManagement.Director.ToDoClueNew', {
    extend: 'Ext.Container',
    id:'ToDoClueNew_id',
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
			    title: '待处理线索',
			    cls:'textf',
			    height:45,
			},
			{
                xtype: 'toolbar',
                docked: 'top',
                height: 160,
                layout: 'hbox',
                style: 'background:#EDEBF1;',
                html:'<div style="width=100%">'+
                		'<div class="anOneDiv">'+
                			'<div class="kOne ysBlue anOne" id="ToDoClueNew_id_SYY">'+SYB+'</div>'+
                			'<div class="kOne ysRed anOne" id="ToDoClueNew_id_CX">查询</div>'+
                		'</div>'+
                		'<div>'+
                			'<input type="text" class="anTwoDiv" placeholder="请输入经销商名称" id="ToDoClueNew_DYSMC"/>'+
                		'</div>'+
                		'<div>'+
            				'<input type="text" class="anTwoDiv" placeholder="请输入项目名称" id="ToDoClueNew_XMMC"/>'+
            			'</div>'+
						'<div style="margin:0px 2% 0px 2%;" class="zDefineSelect">'+
					    '<select id="ToDoClueNew_id_select">'+
						  '<option value="">请选择</option>'+  
						  '<option value="经销商">经销商</option>'+  
						  '<option value="外部线索">BCI</option>'+ 
						'</select>'+
						'</div>'+
                	 '</div>',
            },
        
            {
            	id:'ToDoClueNew_id_list',
			    xtype: 'list',
			    height: "100%",
			    store:'ClueDirectorStore',
			    itemTpl: [
					/*'<table border=0 width=100%>',
					'    <tr><td width=30%>线索编号</td><td width=70%>提交日期时间</td></tr>',
					'    <tr><td width=30%>报备人/td><td width=70%>项目名称</td></tr>',
					'    <tr><td colspan=2>代理商名称</td></tr>',
					'    <tr><td colspan=2>项目地址</td><</tr>',
					'</table>'*/
			              
					'<table border=0 width=100%>',
					'    <tr><td width=30%>{Id}</td><td width=70%>{SubmitDate}</td></tr>',
					'    <tr><td width=30%>{RegistrationPerson}</td><td width=70%>{ProjectName}</td></tr>',
					'    <tr><td colspan=2>{AgentName}</td></tr>',
					'    <tr><td colspan=2>{StreetAddress}</td></tr>',
					'</table>'
			    ],
		
			}
            
          
        ]
    },

});
