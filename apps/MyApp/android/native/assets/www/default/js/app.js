
/* JavaScript content from js/app.js in folder common */
//全局变量
this.myBusyIndicator=new WL.BusyIndicator('content',{text:"登录中"});
this.myLoading=new WL.BusyIndicator('content',{text:"加载数据中"});
this.myProcessing=new WL.BusyIndicator('content',{text:"处理中"});

Ext.application({ 
	name : 'MyApp',
	views : ['HomeView','ToView',],
	         
 	stores : [],
 	          
	models : [],
	
	controllers : ['HomeViewCtr',],
 
	launch : function() {
		Ext.Viewport.add(Ext.create('MyApp.view.HomeView'));
	},
});
