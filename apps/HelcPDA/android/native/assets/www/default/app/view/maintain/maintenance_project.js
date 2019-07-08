
/* JavaScript content from app/view/maintain/maintenance_project.js in folder common */
Ext.define('HelcPDA.view.maintain.maintenance_project',{
	extend:'Ext.Panel',
	id:'pj',

	config:{
		items:[{
			xtype:'toolbar',
			docked:'top',
			title:'项目实绩',
			items:[{
				xtype:'button',
				id:'go_home_id',
				text:'返回'
			}]
		},{
			xtype:'container',
			height:'100%',
			items:[{
				xtype:'list',
				id:'list_id',
				height:'100%',
				onItemDisclosure:true,
				itemTpl:'<div>{project_information}</div>',
				store:'maintenProStroe'
			}]
			
		}]
	}
});