Ext.define('HelcPAD.view.OpportunityManagement.Project_New.BeInChargeOf.ProjectQueryDirectorList',{
	extend:'Ext.Container',
	id:'ProjectQueryDirectorListContainer',
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
		    	 title:'商机查询',
		    	 cls:'textf',
		    	 height:45,
		     },{
		    	 id:'ProjectQueryDirectorListContainer_toolbar',
		    	 xtype:'toolbar',
		    	 docked:'top',
		    	 height:165,
		    	 layout:'hbox',
		    	 style: 'background:#EDEBF1;',
		    	 html:'<div style="width:100%">'+
		    	 		'<div class="anOneDiv">'+
		    	 			'<div class="ysBlue anOne" style="width:46%" onclick="object.getController(\'OpportunityManagement.Project_New.BeInChargeOf.ProjectQueryDirectorListCtrl\').opptyQueryBackMethod();" >'+SYB+'</div>'+
		    	 			'<div class="ysRed anOne" style="width:46%" onclick="object.getController(\'OpportunityManagement.Project_New.BeInChargeOf.ProjectQueryDirectorListCtrl\').opptyQueryMethod();">查询</div>'+
		    	 		'</div>'+
		    	 		'<div>'+
		    			  '<input type="text" class="anTwoDiv" id="queryDirectCondition" placeholder=" 请输入商机名称、客户、使用单位" />'+
		    			  '<input type="text" class="anTwoDiv" style="width:45%;margin-top:5px;" placeHolder="请选择最后操作时间" id="queryDirectStartTime" readOnly=true onClick="initDate1(this.id+\'\',\'请选择最后操作时间\');"><span style="float:left;margin:5px 0px auto 0px;">-</span><input type="text" class="anTwoDiv" style="width:45%;margin-top:5px;" placeHolder="请选择最后操作时间" id="queryDirectEndTime" readOnly=true onClick="initDate1(this.id+\'\',\'请选择最后操作时间\');">'+
		    		    '</div>'+
		    		    '<div class="zDefineSelect">'+
						 '<select id="queryDirectOpptyStatus">'+
						/* 	'<option value="">请选择商机状态</option>'+
						 	'<option value="新建">新建</option>'+
							'<option value="已提交">已提交</option>'+
							'<option value="跟进">跟进</option>'+
							'<option value="报价">报价</option>'+
							'<option value="流失">流失</option>'+
							'<option value="提交大项目部">提交大项目部</option>'+
							'<option value="大项目部报价">大项目部报价</option>'+
							'<option value="大项目部跟进">大项目部跟进</option>'+
							'<option value="大项目部退回">大项目部退回</option>'+
							'<option value="拒绝">拒绝</option>'+
							'<option value="申请流失">申请流失</option>'+*/
						 '</select>'+
					    '</div>'+
					    '<div style="margin:5px 2% 0px 2%" class="zDefineSelect">'+
						 '<select id="queryDirectOpptyZW">'+
						 '</select>'+
					  '</div>'+
		    		 '</div>',
		     },{
            	id:'projectQueryDirectorListOuter',
                xtype: 'list',
                //height:'95%',
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
		            	id:'projectQueryDirectorListPagPlugin',
		            	xclass: 'Ext.plugin.ListPaging',
		                autoPaging: false,
		                hidden:true,
		                loadMoreText:'<div id="projectQueryDirectorPagPlugin" style="width:100%;color:#E0E0E0;height:1%;">上拉加载更多数据</div>'
		            }],
                onItemDisclosure: true
	            
	            }
		]
	}
});