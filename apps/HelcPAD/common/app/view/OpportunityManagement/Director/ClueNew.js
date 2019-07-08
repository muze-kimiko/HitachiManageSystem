
Ext.define('HelcPAD.view.OpportunityManagement.Director.ClueNew', {
    extend: 'Ext.Container',
    id:'ClueNew_id',
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
			    title: '线索查询',
			    cls:'textf',
			    height:45,
			},
			{
                xtype: 'toolbar',
                docked: 'top',
                height: 192,
                layout: 'hbox',
                style: 'background:#EDEBF1;',
                html:'<div style="width=100%">'+
                		'<div class="anOneDiv">'+
                			'<div class="kOne ysBlue anOne" id="ClueNew_id_SYY">'+SYB+'</div>'+
                			'<div class="kOne ysRed anOne" id="ClueNew_id_CX">查询</div>'+
                		'</div>'+
                		'<div>'+
                			'<input type="text" class="anTwoDiv" placeholder="请输入线索编号" id="ClueNew_id_XSBH"/>'+
                		'</div>'+
                		'<div>'+
            				'<input type="text" class="anTwoDiv" placeholder="请输入项目名称" id="ClueNew_id_XMMC"/>'+
            			'</div>'+
            			'<div style="margin:0px 2% 0px 2%;" class="zDefineSelect">'+
						'<select id="ClueNew_id_select">'+
						  '<option value="">请选择</option>'+  
						'</select>'+
						'</div>'+
						'<div style="margin:4px 2% 0px 2%;" class="zDefineSelect">'+
					    '<select id="ClueNew_id_select_Two">'+
						  '<option value="">请选择</option>'+  
						  '<option value="经销商" selected="selected">经销商</option>'+  
						  '<option value="外部线索">外来数据</option>'+   
						'</select>'+
						'</div>'+
                	 '</div>',
            },
        
            {
            	id:'ClueNew_id_list',
			    xtype: 'list',
			    height: "100%",
			    store:'ClueDirectorXSCXStore',
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
