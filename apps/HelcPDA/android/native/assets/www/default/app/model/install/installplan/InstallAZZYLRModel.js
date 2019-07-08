
/* JavaScript content from app/model/install/installplan/InstallAZZYLRModel.js in folder common */
/***
 * 安装资源录入专用模板  2014-6-12 xcx
 */
Ext.define('HelcPDA.model.install.installplan.InstallAZZYLRModel',{
	extend:'Ext.data.Model',
	config:{
		fields:[//查找服务商用到的字段
		        //服务商                  服务商ID
		        'VENDOR_NAME','VENDOR_ID',
		        //用于查找到的人员字段
		        'IDS','NAMES',
		        //时间 
		        'TIME',
		        ]
	}
});