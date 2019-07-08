//全局变量
this.myBusyIndicator=new WL.BusyIndicator('content',{text:"登录中"});
this.myLoading=new WL.BusyIndicator('content',{text:"加载数据中"});
this.myProcessing=new WL.BusyIndicator('content',{text:"处理中"});

Ext.application({ 
	name : 'MyTest',
	views : ['HomeView',],
	         
 	stores : [],
 	          
	models : [],
	
	controllers : ['HomeViewCtr',],
 
	launch : function() {
		Ext.Viewport.add(Ext.create('MyTest.view.HomeView'));
	},
});
