
/* JavaScript content from app/view/OpportunityManagement/Project_New/BeInChargeOf/ProjectDirectorLookForPage.js in folder common */
Ext.define('HelcPAD.view.OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorLookForPage',{
	extend:'Ext.Container',
	id:'ProjectDirectorLookForListContainer',
	requires: [
	           'Ext.Toolbar',
	           'Ext.dataview.List',
	           'Ext.XTemplate'
	       ],
	config:{
		items:[
		     {
		    	 xtype:'toolbar',
		    	 docked:'top',
		    	 title:'商机查看',
		    	 cls:'textf'
		     },{
		    	 xtype:'toolbar',
		    	 docked:'top',
		    	 height:'6%',
		    	 layout:'hbox',
		    	 style: 'background:#EDEBF1;',
		    	 html:'<div style="width:100%">'+
		    	 		'<div class="anOneDiv">'+
		    	 			'<div class="ysZhOne anOne" style="width:96%" onclick="object.getController(\'OpportunityManagement.Project_New.BeInChargeOf.ProjectDirectorResultCtrl\').projectdirectorresult_new_id_FH();" >'+SYB+'</div>'+
		    	 		'</div>'
		     },{
            	id:'projectDirectorLookForListOuter',
                xtype: 'list',
                height:'100%',
                store:'DirectorOpptyStore',
                cls:'textf',
                itemCls:'textf',
                width:'100%',
                style:'float:left',
                itemTpl: [
                    '<table border=0 width=100% style="color:#666"height=80>',
                    '  <tr>',
                    '    <td style="color:#000;padding-left:20px;font-size:12px;" colspan = "2">{OpportunityNumber}</td>',
                    '  </tr>',
                    '  <tr>',
                    '    <td width=40% style="padding-left:20px;font-size:12px;">{OpptyStatus}</td>',
                    '    <td width=60% style="padding-left:20px;font-size:12px;">{Name}</td>',
                    '  </tr>',
                    '  <tr>',
                    '	<td colspan = "2" style="padding-left:20px;font-size:12px;">{Account}</td>',
                    '  </tr>',
                    '</table>'
                    /*'<div><input type=\'checkbox\'>商机编号	商机名称</div>',
                    '<div>商机状态	客户名称</div>'*/
                ],
                plugins:[{
		            	id:'projectDirectorLookForListPagPlugin',
		            	xclass: 'Ext.plugin.ListPaging',
		                autoPaging: false,
		                loadMoreText:'<div id="projectDirectorLookForPagPlugin" style="width:100%;color:#5B5B5B;height:1%;">上拉加载更多数据</div>'
		            }],
                onItemDisclosure: true
	            
	            }
		]
	}
});