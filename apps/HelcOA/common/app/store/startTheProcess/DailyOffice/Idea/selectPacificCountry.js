Ext.define('HelcOA.store.startTheProcess.DailyOffice.Idea.selectPacificCountry',{
	extend:'Ext.data.Store',
	id:'selectPacificCountry_ID',
	requires:['HelcOA.model.startTheProcess.DailyOffice.Idea.selectCountryModel'],
	config:{
		model:'HelcOA.model.startTheProcess.DailyOffice.Idea.selectCountryModel',
		data:[
		      {
		    	  text: '请选择出访国家',
		    	  value: ''
		      },  
			{
			    text: '澳大利亚',
			    value: '澳大利亚'
			},
			{
			    text: '新西兰',
			    value: '新西兰'
			},
			{
			    text: '西萨摩亚',
			    value: '西萨摩亚'
			},
			    {
			        text: '斐济',
			        value: '斐济'
			    },
			    {
			        text: '巴布亚新几内亚',
			        value: '巴布亚新几内亚'
			    },
			    {
			        text: '密克罗尼西亚',
			        value: '密克罗尼西亚'
			    },
			    {
			        text: '马绍尔群岛',
			        value: '马绍尔群岛'
			    },
			    {
			        text: '瓦努阿图',
			        value: '瓦努阿图'
			    },
			    {
			        text: '基里巴斯',
			        value: '基里巴斯'
			    },
			    {
			        text: '汤加',
			        value: '汤加'
			    },
			    {
			        text: '帕劳',
			        value: '帕劳'
			    },
			    {
			        text: '库克群岛',
			        value: '库克群岛'
			    },
			    {
			        text: '所罗门群岛',
			        value: '所罗门群岛'
			    }, 
		]
	},
});