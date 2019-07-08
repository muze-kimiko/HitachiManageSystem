
Ext.define('HelcPDA.view.SynchronizationTable.Safeguard_GG_People_Select', {
	extend: 'Ext.Panel',
	id:'Safeguard_GG_People_Select_id',
    requires: [
        'Ext.Toolbar',
        'Ext.tab.Panel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.Spacer',
        'Ext.Button',
        'Ext.dataview.List',
        'Ext.XTemplate'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
              id:'Safeguard_GG_People_Select_id_Toolbar',
	  	  	  xtype: 'toolbar',
	          docked: 'top',
	          title: '',
	          items: [{
	        	  id:'Safeguard_GG_People_Select_id_FH',
	          	  xtype: 'button',
	              ui: 'back',
	              text: '返回'
	          },{
	        	  xtype:'spacer'
	          },{
	        	  xtype:'button',
	        	  id:'Safeguard_GG_People_Select_id_QD',
	        	  text:'确定',
	        	  hidden:true,
	          }]
	      },
            {
                xtype: 'tabpanel',
                id:'Safeguard_GG_People_Select_id_Tabpanel',
                flex: 1,
                items: [
                    {
                        xtype: 'formpanel',
                        title: '查询',
                        items: [
                            {
				                xtype: 'fieldset',
				                instructions: '所有条件支持模糊查询,多条件能增快查询速度',
				                title: '查询条件',
				                cls:'textf',
				                items: [
									{
										id:'Id',
										xtype: 'textfield',
										label: '用户ID',
										labelWidth:'40%',
									},
									{
										id:'FullName',
										xtype: 'textfield',
										label: '姓名',
										labelWidth:'40%',
									},
									{
										id:'FM',
										xtype: 'selectfield',
										label: '性别',
										labelWidth:'40%',
										value:'vlaue',
										options:[
										   {text:'请选择',value:''},
										   {text:'男',value:'男'},
										   {text:'女',value:'女'},
										],
									},
									{
										id:'MaintainingPosition',
										xtype: 'textfield',
										label: '职位',
										labelWidth:'40%',
										listeners:[{
				                        	fn:function(component,eOpts){
				                        		var me=this;
				                        		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
				                        	},
				                        	event:'initialize'
				                        }],
				                        readOnly:true,
									},
									{
										id:'MaitainingPersonType',
										xtype: 'textfield',
										label: '人员类型',
										labelWidth:'40%',
									},
									{
										id:'JobTitle',
										xtype: 'textfield',
										label: '职称',
										labelWidth:'40%',
									},
									{
										id:'CompanyName',
										xtype: 'textfield',
										label: '所属司',
										labelWidth:'40%',
										listeners:[{
				                        	fn:function(component,eOpts){
				                        		var me=this;
				                        		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
				                        	},
				                        	event:'initialize'
				                        }],
				                        readOnly:true,
									},
									{//所属司ID
										id:'CompanyName_ID',
										xtype: 'hiddenfield',
									},
									{
										id:'StationName',
										xtype: 'textfield',
										label: '所属站',
										labelWidth:'40%',
										listeners:[{
				                        	fn:function(component,eOpts){
				                        		var me=this;
				                        		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
				                        	},
				                        	event:'initialize'
				                        }],
				                        readOnly:true,
									},
									{//所属站ID
										id:'StationName_ID',
										xtype: 'hiddenfield',
									},
									{
										id:'PrimaryOrganizationName',
										xtype: 'textfield',
										label: '所属组织',
										labelWidth:'40%',
									},
									{
										id:'AreaName',
										xtype: 'textfield',
										label: '所属片',
										labelWidth:'40%',
										listeners:[{
				                        	fn:function(component,eOpts){
				                        		var me=this;
				                        		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
				                        	},
				                        	event:'initialize'
				                        }],
				                        readOnly:true,
									},
									{//所属片ID
										id:'AreaName_ID',
										xtype: 'hiddenfield',
									},
									{
										id:'GroupName',
										xtype: 'textfield',
										label: '所属组',
										labelWidth:'40%',
										listeners:[{
				                        	fn:function(component,eOpts){
				                        		var me=this;
				                        		me.element.on('tap',function(e,t) {me.fireEvent('tap',me,e,t); },me);
				                        	},
				                        	event:'initialize'
				                        }],
				                        readOnly:true,
									},
									{//所属组ID
										id:'GroupName_ID',
										xtype: 'hiddenfield',
									},
									{
										id:'WorkPhone',
										xtype: 'numberfield',
										label: '电话号码',
										labelWidth:'40%',
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
									              id:'Safeguard_GG_People_Select_id_CX',
									              margin: '15 0',
									              width: '90%',
									              text: '查询',
									              
									          },
									          {
									              xtype: 'spacer'
									          }
									      ]
									  },
									  {//装载选择人所存放的位置
										  id:'GG_People_Name',
										  xtype: 'hiddenfield',
									  },
									  {//装载选择人ID所存放的位置
										  id:'GG_People_Name_ID',
										  xtype: 'hiddenfield',
									  },
				                ]
				            }
                        ]
                    },
                    {
                        xtype: 'container',
                        title: '结果',
                        layout: 'vbox',
                        items: [
							{
							    xtype: 'list',
							    height: '100%',
							    id:'Safeguard_GG_People_Select_id_list',
							    store:'Safeguard_GG_People_Select_Store',
							    itemTpl: [
											'<table border=0 width=100% style="color:#666" class="textf">'+
											'  <tr>'+
											'     <td width=10% rowspan="2">'+
											'        <div name="GG_PeopleName" class="p_judge_box2" id="GG_People">3</div>'+
											'     </td>'+
											'     <td width=90%>{FullName}</td>'+
											'  </tr>'+
											'</table>',
							    ],
							},
                        ]
                    },
                    
                ]
            }
        ]
    }

});