Ext.define('HelcPAD.store.OpportunityManagement.Director.ClueDirectorStore',{
	extend:'Ext.data.Store',
	requires:['HelcPAD.model.OpportunityManagement.Director.ClueDirectorModel'],
	config:{
		model:'HelcPAD.model.OpportunityManagement.Director.ClueDirectorModel',
		
		/*pageSize: 10,
        proxy: {
            type: "ajax",
 
            //每页显示多少条的变量名，默认为limit
            limitParam: 'limit',
            //当前请求的页数的变量名，默认为page             
            pageParam: 'page',
            //请求的服务器的地址
            //url : config.actionUrl+"listTopologyPic.action",
            reader: {
                type: "json",
                rootProperty: "list"//保护store数据的json变量名
            }
        },
        autoLoad: false//是否自动加载，一般为否
*/	},
});