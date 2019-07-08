
/* JavaScript content from app/controller/InstallCtr.js in folder common */
/**
 * 安装模块的控制器
 */
Ext.define("Helcss.controller.InstallCtr", {
	extend : "Helcss.controller.ApplicationController",
	requires: ['Ext.Menu'], 
	config : {
		   refs : {
			   
			   inst_city_back : 'button[id=inst_city_back]',
		   
			   xs_instpname_back : 'button[id=xs_instpname_back]',
			   
			   inst_infolist_back : 'button[id=inst_infolist_back]',
			   
			   inst_info_detail_back : 'button[id=inst_info_detail_back]',
		   
		},
		control : { 
			
			inst_city_back : {
				tap : 'inst_city_back'
			},
			
			xs_instpname_back : {
				tap : 'xs_instpname_back'
			},
			
			inst_infolist_back : {
				tap : 'inst_infolist_back'
			},
			
			inst_info_detail_back : {
				tap : 'inst_info_detail_back'
			},
			
			"#inst_city_list" : {
				itemtap : 'inst_city_list'
			},
			
			"#inst_pname_list" : {
				itemtap : 'inst_pname_list'
			},
			
			"#inst_info_list" : {
				itemtap : 'inst_info_list'
			}
			
		}
	},
	
	/**
	 * 安装城市列表点击返回
	 */
	inst_city_back : function() {
		var main = Ext.getCmp('mainmenu');
		if(!main){
			main = Ext.create('Helcss.view.MainMenu');
		}
		Ext.Viewport.setActiveItem(main);
		
		var store = Ext.data.StoreManager.get("InstallCityListStore");
		if (store) {
			store.setData([],this);			
		}
	},
	
	/**
	 * 城市列表点击每项
	 */
	inst_city_list : function(obj, index, target, record, e, eOpts) {
		var store = Ext.data.StoreManager.get("InstallCityListStore");
		var city=store.getAt(index).get('city'); 
		
		var main = Ext.getCmp('inst_pname_listview');
		if(!main){
			main = Ext.create('Helcss.view.install.InstallPNameView');
		}
		Ext.Viewport.setActiveItem(main);
		xs_city=city;
		this.connectSql(main.loadPname, "procedure_InstPNameList", city,null);
	},
	
	
	
	
	
	/**
	 * 安装项目列表点击返回
	 */
	xs_instpname_back : function() {
		var main = Ext.getCmp('inst_city_listview');
		if(!main){
			main = Ext.create('Helcss.view.install.InstallCityListView');
		}
		Ext.Viewport.setActiveItem(main);
		
		var store = Ext.data.StoreManager.get("InstallPNameListStore");
		if (store) {
			store.setData([],this);			
		}
	},
	/**
	 * 安装项目列表点击每项
	 */
	inst_pname_list : function(obj, index, target, record, e, eOpts) {
		var main = Ext.getCmp('inst_info_listview');
		if(!main){
			main = Ext.create('Helcss.view.install.InstallInfoListView');
		}
		Ext.Viewport.setActiveItem(main);
		
		Ext.getCmp('inst_info_pcityname').setData({'inst_city':"",'inst_pname':""});
		
		var store = Ext.data.StoreManager.get("InstallPNameListStore");
		var pname=store.getAt(index).get('ProjectName'); 
		xs_domain=pname;
		this.connectSql(main.loadInfo, "procedure_infoList", xs_city, pname);
	},
	
	
	
	
	/**
	 * 安装项目信息列表点击返回
	 */
	inst_infolist_back : function() {
		var main = Ext.getCmp('inst_pname_listview');
		if(!main){
			main = Ext.create('Helcss.view.install.InstallPNameView');
		}
		Ext.Viewport.setActiveItem(main);
		
		var store = Ext.data.StoreManager.get("InstallInfoListStore");
		if (store) {
			store.setData([],this);			
		}
	},
	/**
	 * 安装项目信息列表点击每项
	 */
	inst_info_list : function(obj, index, target, record, e, eOpts) {
		var main;
		if(PDsystem==1){
			main = Ext.getCmp('inst_info_detailview_az');
			if(!main){
				main = Ext.create('Helcss.view.install.InstInfoDetailView_AZ');
			}
			Ext.Viewport.setActiveItem(main);
		}else{
			main = Ext.getCmp('inst_info_detailview');
			if(!main){
				main = Ext.create('Helcss.view.install.InstInfoDetailView');
			}
			Ext.Viewport.setActiveItem(main);
		};
		
		var store = Ext.data.StoreManager.get("InstallInfoListStore");
		
		var eno=store.getAt(index).get('ElevatorNo'); 
		xs_ele_no = eno; 
		this.connectSql(main.loadInfo, "procedure_infoDetail", eno, null);
	},
	
	
	
	/**
	 * 安装项目详细信息点击返回
	 */
	inst_info_detail_back : function() {
		var main = Ext.getCmp('inst_info_listview');
		if(!main){
			main = Ext.create('Helcss.view.install.InstallInfoListView');
		}
		Ext.Viewport.setActiveItem(main);
		if(PDsystem==1){
			Ext.getCmp('inst_info_detailview_az').destroy();
		}else{
			Ext.getCmp('inst_info_detailview').destroy();
		};
		
	}
	
});