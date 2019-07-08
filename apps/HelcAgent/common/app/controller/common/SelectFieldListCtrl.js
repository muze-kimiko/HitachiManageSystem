Ext.define('HelcAgent.controller.common.SelectFieldListCtrl', {
	extend:'HelcAgent.controller.ApplicationController',

	config: {
        control: {
        	//返回
			'button#selectFieldList_FH':{
				tap:'selectFieldList_FH'
			},
			
			//list
			'list#selectFieldList_list':{
				itemsingletap:'selectFieldList_list'
			},
        }
	},
	//返回
	selectFieldList_FH:function(){
		this.BackView();
		var nullIf = true;
		for(var j = 0 ;j<ViewArray.length;j++){
			if(ViewArray[j].ViewId =='clueCreateAgent')
				nullIf = false;
		}
		if(nullIf)
			return ;
		var length = ViewArray.length-1;
		for(var i=length;i>-1;i--){
			if(ViewArray[i].ViewId!='clueCreateAgent'){
				ViewArray.splice(ViewArray.length-1,1);
			}else{
				this.BackView();
				break;
			}
		}
	},
		
	//list
	selectFieldList_list:function(dataview, index, target, record, e, eOpts){
		var text = record.data.value;
		this.BackView();
		var nullIf = true;
		for(var j = 0 ;j<ViewArray.length;j++){
			if(ViewArray[j].ViewId =='clueCreateAgent')
				nullIf = false;
		}
		
		var length = ViewArray.length-1;
		for(var i=length;i>-1;i--){
			if(nullIf)
				break ;
			if(ViewArray[i].ViewId!='clueCreateAgent'){
				ViewArray.splice(ViewArray.length-1,1);
			}else{
				this.BackView();
				break;
			}
		}
		Ext.getCmp(this.Id).setValue(text);
		//Ext.getCmp(this.Id).blur();
	},
	
	//公共的进入方法
	SelectFieldList_GGFF:function(obj,Files){
		var tb=Files.getLabel();
		var id=Files.getId();
		var Data=Files.getOptions();
		if(Data[0].text=='请选择')
			Data = Data.slice(1);
		obj.NextView('selectFieldList_id','HelcAgent.view.common.SelectFieldList');
		Ext.getCmp('selectFieldList_id_tb').setTitle(tb);
		this.Id=id;
		var SFdata = this.getStore('SelectFieldListStore','HelcAgent.store.common.SelectFieldListStore');
		/*var SFdata=Ext.data.StoreManager.get('SelectFieldListStore');
	    if(!SFdata) {
	    	SFdata = Ext.create("HelcAgent.store.common.SelectFieldListStore");
	    };*/
	    SFdata.setData(Data);
	},
});