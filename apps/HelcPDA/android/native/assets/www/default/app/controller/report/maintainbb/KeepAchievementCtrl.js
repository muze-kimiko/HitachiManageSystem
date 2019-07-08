
/* JavaScript content from app/controller/report/maintainbb/KeepAchievementCtrl.js in folder common */
var Achiviment_tpl=null;
Ext.define('HelcPDA.controller.report.maintainbb.KeepAchievementCtrl',{
	extend:'HelcPDA.controller.ApplicationController',
	id:'keepAchievementCtrl',
	config:{
		refs:{
			//进入维保业绩报表界面
			to_keepAchivmentBb:'button[id=keepAchivmentBb]',
			//选择对应日期，查找对应数据
			to_changeDate:'textfield[id=KeepAchiv_date]',
			//点击list的一条记录，进入详细界面
			to_listItem:'list[id=keepAchiv_list]',
			//说明show
			to_infoshow:'button[id=info_show]',
			//返回
			keepAchiv_back:'button[id=keepAchiv_back]'
		},
		control:{
			to_keepAchivmentBb:{
				tap:'toKeepAchivmentBb'
			},
			to_changeDate:{
				change:'to_changeDate'
			},
			to_listItem:{
				itemtap:'to_listItem'
			},
			to_infoshow:{
				tap:'to_infoshow'
			},
			keepAchiv_back:{
				tap:'keepAchiv_back'
			}
		}
	},
	keepAchiv_back:function(){
           this.BackView();
	},
   //进入维保业绩报表界面
   toKeepAchivmentBb:function(){
	   this.NextView('keepAchievement_List_View','HelcPDA.view.report.maintainbb.KeepAchievement_List_View');
	   var date=new Date();
	   if(date.getDate()<=9){
		   date.setMonth(date.getMonth()-1);
	   }else{	
		   date.setMonth(date.getMonth());
	   }
	   var date1=date.getFullYear()+'年'+date.getMonth()+'月';
	   Ext.getCmp('showDate').setHtml("报表统计年月:"+date1);
	   Achiviment_tpl='[';
	   for(var i=date.getMonth();i>0;i--){
		  Achiviment_tpl+="{value:'"+date.getFullYear()+"年"+i+"月"+"',text:'"+date.getFullYear()+"年"+i+"月"+"'},";
	  }
	  for(var i=12;i>date.getMonth();i--){
		  if(i==(date.getMonth()+1)){
			  Achiviment_tpl+="{value:'"+(date.getFullYear()-1)+"年"+i+"月"+"',text:'"+(date.getFullYear()-1)+"年"+i+"月"+"'}]";
		  }else{
			  Achiviment_tpl+="{value:'"+(date.getFullYear()-1)+"年"+i+"月"+"',text:'"+(date.getFullYear()-1)+"年"+i+"月"+"'},";
		  }
	  }
	   var store=this.getStore('KeepAchievementListStore','HelcPDA.store.report.maintainbb.KeepAchievementListStore');
	   function getResult(res){
		
		 //总台量   CUR_MON_WAR_AMOUNT+ CUR_MON_MAI_AMOUNT
		   console.log(JSON.stringify(res));
		   var list=[];
		   var list1=[];
		   for(var i=0;i<res.item.length;i++){
			   var temp={};
			   temp.COMPANY_NAME=res.item[i].COMPANY_NAME;
			   temp.BUDGET_ALL_BUDGET=res.item[i].BUDGET_ALL_BUDGET;
			   temp.BUDGET_ALL_BUDGET_RATE=res.item[i].BUDGET_ALL_BUDGET_RATE;
			   temp.BUDGET_ALL_BUDGET_QN=res.item[i].BUDGET_ALL_BUDGET_QN;
			   temp.BUDGET_ALL_BUDGET_RATE_QN=res.item[i].BUDGET_ALL_BUDGET_RATE_QN;	
			   var tempNum=formatNumber(parseInt((res.item[i].CUR_MON_WAR_AMOUNT).replace(',',''))+parseInt((res.item[i].CUR_MON_MAI_AMOUNT).replace(',','')),',')+'';
			   temp.NUM=tempNum.replace('%','');
			   
			   temp.CUR_MON_WAR_AMOUNT=res.item[i].CUR_MON_WAR_AMOUNT;
			   temp.REPAIR_BUDGET=res.item[i].REPAIR_BUDGET;
			   temp.REPAIR_BUDGET_RATE=res.item[i].REPAIR_BUDGET_RATE;
			   temp.REPAIR_BUDGET_QN=res.item[i].REPAIR_BUDGET_QN;
			   temp.REPAIR_BUDGET_RATE_QN=res.item[i].REPAIR_BUDGET_RATE_QN;
			   temp.LST_MON_WAR_AMOUNT=res.item[i].LST_MON_WAR_AMOUNT;
			   temp.CUR_MON_WAR_STAT_AMOUNT=res.item[i].CUR_MON_WAR_STAT_AMOUNT;
			   temp.CUR_MON_WAR_ASS_AMOUNT=res.item[i].CUR_MON_WAR_ASS_AMOUNT;
			   temp.CUR_MON_WAR_END_AMOUNT=res.item[i].CUR_MON_WAR_END_AMOUNT;
			   temp.CUR_MON_WAR_OWN_AMOUNT=res.item[i].CUR_MON_WAR_OWN_AMOUNT;
			   temp.CUR_MON_WAR_OTH_AMOUNT=res.item[i].CUR_MON_WAR_OTH_AMOUNT;
			   temp.CUR_MON_WAR_LIFT_AMOUNT=res.item[i].CUR_MON_WAR_LIFT_AMOUNT;
			   temp.CUR_MON_WAR_ESCA_AMOUNT=res.item[i].CUR_MON_WAR_ESCA_AMOUNT;
			   temp.CUR_MON_MAI_AMOUNT=res.item[i].CUR_MON_MAI_AMOUNT;
			   temp.MAINTAINA_BUDGET=res.item[i].MAINTAINA_BUDGET;
			   temp.MAINTAINA_BUDGET_RATE=res.item[i].MAINTAINA_BUDGET_RATE;
			   temp.MAINTAINA_BUDGET_QN=res.item[i].MAINTAINA_BUDGET_QN;
			   temp.MAINTAINA_BUDGET_RATE_QN=res.item[i].MAINTAINA_BUDGET_RATE_QN;
			   temp.LST_MON_MAI_AMOUNT=res.item[i].LST_MON_MAI_AMOUNT;
			   temp.CUR_MON_MAI_PRICE=res.item[i].CUR_MON_MAI_PRICE;
			   temp.CUR_MON_MAI_SUM=res.item[i].CUR_MON_MAI_SUM;
			   temp.CUR_MON_MAI_NEW_AMOUNT=res.item[i].CUR_MON_MAI_NEW_AMOUNT;
			   temp.CUR_MON_MAI_NEW_PRICE=res.item[i].CUR_MON_MAI_NEW_PRICE;
			   temp.CUR_MON_MAI_NEW_SUM=res.item[i].CUR_MON_MAI_NEW_SUM;
			   temp.CUR_MON_MAI_REN_AMOUNT=res.item[i].CUR_MON_MAI_REN_AMOUNT;
			   temp.CUR_MON_MAI_REN_PRICE=res.item[i].CUR_MON_MAI_REN_PRICE;
			   temp.CUR_MON_MAI_REN_SUM=res.item[i].CUR_MON_MAI_REN_SUM;
			   temp.CUR_MON_MAI_RET_PRICE=res.item[i].CUR_MON_MAI_RET_PRICE;
			   temp.CUR_MON_MAI_RET_SUM=res.item[i].CUR_MON_MAI_RET_SUM;
			   temp.CUR_MON_MAI_RET_AMOUNT=res.item[i].CUR_MON_MAI_RET_AMOUNT;
			   temp.CUR_MON_MAI_CAN_AMOUNT=res.item[i].CUR_MON_MAI_CAN_AMOUNT;
			   temp.CUR_MON_MAI_CAN_PRICE=res.item[i].CUR_MON_MAI_CAN_PRICE;
			   temp.CUR_MON_MAI_CAN_SUM=res.item[i].CUR_MON_MAI_CAN_SUM;
			   temp.CUR_MON_MAI_OWN_AMOUNT=res.item[i].CUR_MON_MAI_OWN_AMOUNT;
			   temp.CUR_MON_MAI_OWNED_AMOUNT=res.item[i].CUR_MON_MAI_OWNED_AMOUNT;
			   temp.CUR_MON_MAI_OTH_AMOUNT=res.item[i].CUR_MON_MAI_OTH_AMOUNT;
			   temp.CUR_MON_WAR_AMOUNT=res.item[i].CUR_MON_WAR_AMOUNT;
			   temp.CUR_MON_MAI_OTHED_AMOUNT=res.item[i].CUR_MON_MAI_OTHED_AMOUNT;
			   temp.CUR_MON_MAI_LIFT_AMOUNT=res.item[i].CUR_MON_MAI_LIFT_AMOUNT;
			   temp.CUR_MON_MAI_ESCA_AMOUNT=res.item[i].CUR_MON_MAI_ESCA_AMOUNT;
			   if(res.item[i].COMPANY_NAME=='全国合计'){
				   list1[0]=temp;
				   res.item.splice(i,1);
		       }
			   list[i]=temp;
		   }
		   for(var i=0;i<list.length;i++){
			   if(list[i].COMPANY_NAME=='全国合计'){
				   list1[i+1]=list[i+1];
		       }else{
		    	   list1[i+1]=list[i];
		       }
		   }
		   store.setData(list1);
		   
	   }
	   var content={userid:userid,date:date1};
	   this.connectServer(getResult,'reportMaintainAhm.do?method=toSearch', JSON.stringify(content));
   },
   //改变当前选择触发的事情
   to_changeDate:function(obk, newValue, oldValue, eOpts){
	   var store=this.getStore('KeepAchievementListStore','HelcPDA.store.report.maintainbb.KeepAchievementListStore');
	   Ext.getCmp('showDate').setHtml("报表统计年月:"+newValue);
	   function getResult(res){
		 //总台量   CUR_MON_WAR_AMOUNT+ CUR_MON_MAI_AMOUNT
		   var list=[];
		   var list1=[];
			   for(var i=0;i<res.item.length;i++){
				   var temp={};
				   temp.COMPANY_NAME=res.item[i].COMPANY_NAME;
				   temp.BUDGET_ALL_BUDGET=res.item[i].BUDGET_ALL_BUDGET;
				   temp.BUDGET_ALL_BUDGET_RATE=res.item[i].BUDGET_ALL_BUDGET_RATE;
				   temp.BUDGET_ALL_BUDGET_QN=res.item[i].BUDGET_ALL_BUDGET_QN;
				   temp.BUDGET_ALL_BUDGET_RATE_QN=res.item[i].BUDGET_ALL_BUDGET_RATE_QN;	  
				   var tempNum=formatNumber(parseInt((res.item[i].CUR_MON_WAR_AMOUNT).replace(',',''))+parseInt((res.item[i].CUR_MON_MAI_AMOUNT).replace(',','')),',')+'';
				   temp.NUM=tempNum.replace('%','');
				   temp.CUR_MON_WAR_AMOUNT=res.item[i].CUR_MON_WAR_AMOUNT;
				   temp.REPAIR_BUDGET=res.item[i].REPAIR_BUDGET;
				   temp.REPAIR_BUDGET_RATE=res.item[i].REPAIR_BUDGET_RATE;
				   temp.REPAIR_BUDGET_QN=res.item[i].REPAIR_BUDGET_QN;
				   temp.REPAIR_BUDGET_RATE_QN=res.item[i].REPAIR_BUDGET_RATE_QN;
				   temp.LST_MON_WAR_AMOUNT=res.item[i].LST_MON_WAR_AMOUNT;
				   temp.CUR_MON_WAR_STAT_AMOUNT=res.item[i].CUR_MON_WAR_STAT_AMOUNT;
				   temp.CUR_MON_WAR_ASS_AMOUNT=res.item[i].CUR_MON_WAR_ASS_AMOUNT;
				   temp.CUR_MON_WAR_END_AMOUNT=res.item[i].CUR_MON_WAR_END_AMOUNT;
				   temp.CUR_MON_WAR_OWN_AMOUNT=res.item[i].CUR_MON_WAR_OWN_AMOUNT;
				   temp.CUR_MON_WAR_OTH_AMOUNT=res.item[i].CUR_MON_WAR_OTH_AMOUNT;
				   temp.CUR_MON_WAR_LIFT_AMOUNT=res.item[i].CUR_MON_WAR_LIFT_AMOUNT;
				   temp.CUR_MON_WAR_ESCA_AMOUNT=res.item[i].CUR_MON_WAR_ESCA_AMOUNT;
				   temp.CUR_MON_MAI_AMOUNT=res.item[i].CUR_MON_MAI_AMOUNT;
				   temp.MAINTAINA_BUDGET=res.item[i].MAINTAINA_BUDGET;
				   temp.MAINTAINA_BUDGET_RATE=res.item[i].MAINTAINA_BUDGET_RATE;
				   temp.MAINTAINA_BUDGET_QN=res.item[i].MAINTAINA_BUDGET_QN;
				   temp.MAINTAINA_BUDGET_RATE_QN=res.item[i].MAINTAINA_BUDGET_RATE_QN;
				   temp.LST_MON_MAI_AMOUNT=res.item[i].LST_MON_MAI_AMOUNT;
				   temp.CUR_MON_MAI_PRICE=res.item[i].CUR_MON_MAI_PRICE;
				   temp.CUR_MON_MAI_SUM=res.item[i].CUR_MON_MAI_SUM;
				   temp.CUR_MON_MAI_NEW_AMOUNT=res.item[i].CUR_MON_MAI_NEW_AMOUNT;
				   temp.CUR_MON_MAI_NEW_PRICE=res.item[i].CUR_MON_MAI_NEW_PRICE;
				   temp.CUR_MON_MAI_NEW_SUM=res.item[i].CUR_MON_MAI_NEW_SUM;
				   temp.CUR_MON_MAI_REN_AMOUNT=res.item[i].CUR_MON_MAI_REN_AMOUNT;
				   temp.CUR_MON_MAI_REN_PRICE=res.item[i].CUR_MON_MAI_REN_PRICE;
				   temp.CUR_MON_MAI_REN_SUM=res.item[i].CUR_MON_MAI_REN_SUM;
				   temp.CUR_MON_MAI_RET_PRICE=res.item[i].CUR_MON_MAI_RET_PRICE;
				   temp.CUR_MON_MAI_RET_SUM=res.item[i].CUR_MON_MAI_RET_SUM;
				   temp.CUR_MON_MAI_RET_AMOUNT=res.item[i].CUR_MON_MAI_RET_AMOUNT;
				   temp.CUR_MON_MAI_CAN_AMOUNT=res.item[i].CUR_MON_MAI_CAN_AMOUNT;
				   temp.CUR_MON_MAI_CAN_PRICE=res.item[i].CUR_MON_MAI_CAN_PRICE;
				   temp.CUR_MON_MAI_CAN_SUM=res.item[i].CUR_MON_MAI_CAN_SUM;
				   temp.CUR_MON_MAI_OWN_AMOUNT=res.item[i].CUR_MON_MAI_OWN_AMOUNT;
				   temp.CUR_MON_MAI_OWNED_AMOUNT=res.item[i].CUR_MON_MAI_OWNED_AMOUNT;
				   temp.CUR_MON_MAI_OTH_AMOUNT=res.item[i].CUR_MON_MAI_OTH_AMOUNT;
				   temp.CUR_MON_WAR_AMOUNT=res.item[i].CUR_MON_WAR_AMOUNT;
				   temp.CUR_MON_MAI_OTHED_AMOUNT=res.item[i].CUR_MON_MAI_OTHED_AMOUNT;
				   temp.CUR_MON_MAI_LIFT_AMOUNT=res.item[i].CUR_MON_MAI_LIFT_AMOUNT;
				   temp.CUR_MON_MAI_ESCA_AMOUNT=res.item[i].CUR_MON_MAI_ESCA_AMOUNT;
				   if(res.item[i].COMPANY_NAME=='全国合计'){
					   list1[0]=temp;
			       }
				   list[i]=temp;
			   }
			   if(typeof(list1[0])!='undefined'){
				   for(var i=0;i<list.length;i++){
					   if(list[i].COMPANY_NAME=='全国合计'){
						   list1[i+1]=list[i+1];
				       }else{
				    	   list1[i+1]=list[i];
				       }
				   }
				   store.setData(list1);  
			   }else{
				   store.setData(list);  
			   }
			
			 
	   }
	   var content={userid:userid,date:newValue};
	   this.connectServer(getResult,'reportMaintainAhm.do?method=toSearch', JSON.stringify(content));
   },
   //点击一条记录，进入详细界面
   to_listItem:function(obk,index,target,record,e,eOpts){
	   this.NextView('keepAchievement_Detail_View','HelcPDA.view.report.maintainbb.KeepAchievement_Detail_View');
	   var store=this.getStore('KeepAchievementListStore','HelcPDA.store.report.maintainbb.KeepAchievementListStore');
	   Ext.getCmp('CUR_MON_WAR_AMOUNT').setValue(store.getAt(index).get('CUR_MON_WAR_AMOUNT'));
       Ext.getCmp('REPAIR_BUDGET').setValue(store.getAt(index).get('REPAIR_BUDGET'));
       Ext.getCmp('REPAIR_BUDGET_RATE').setValue(store.getAt(index).get('REPAIR_BUDGET_RATE'));
       Ext.getCmp('REPAIR_BUDGET_QN').setValue(store.getAt(index).get('REPAIR_BUDGET_QN'));
       Ext.getCmp('REPAIR_BUDGET_RATE_QN').setValue(store.getAt(index).get('REPAIR_BUDGET_RATE_QN'));
       Ext.getCmp('LST_MON_WAR_AMOUNT').setValue(store.getAt(index).get('LST_MON_WAR_AMOUNT'));
       Ext.getCmp('CUR_MON_WAR_STAT_AMOUNT').setValue(store.getAt(index).get('CUR_MON_WAR_STAT_AMOUNT'));
       Ext.getCmp('CUR_MON_WAR_ASS_AMOUNT').setValue(store.getAt(index).get('CUR_MON_WAR_ASS_AMOUNT'));
       Ext.getCmp('CUR_MON_WAR_END_AMOUNT').setValue(store.getAt(index).get('CUR_MON_WAR_END_AMOUNT'));
       Ext.getCmp('CUR_MON_WAR_OWN_AMOUNT').setValue(store.getAt(index).get('CUR_MON_WAR_OWN_AMOUNT'));
       Ext.getCmp('CUR_MON_WAR_OTH_AMOUNT').setValue(store.getAt(index).get('CUR_MON_WAR_OTH_AMOUNT'));
       Ext.getCmp('CUR_MON_WAR_LIFT_AMOUNT').setValue(store.getAt(index).get('CUR_MON_WAR_LIFT_AMOUNT'));
       Ext.getCmp('CUR_MON_WAR_ESCA_AMOUNT').setValue(store.getAt(index).get('CUR_MON_WAR_ESCA_AMOUNT'));
       Ext.getCmp('CUR_MON_MAI_AMOUNT').setValue(store.getAt(index).get('CUR_MON_MAI_AMOUNT'));
       Ext.getCmp('MAINTAINA_BUDGET').setValue(store.getAt(index).get('MAINTAINA_BUDGET'));
       Ext.getCmp('MAINTAINA_BUDGET_RATE').setValue(store.getAt(index).get('MAINTAINA_BUDGET_RATE'));
       Ext.getCmp('MAINTAINA_BUDGET_QN').setValue(store.getAt(index).get('MAINTAINA_BUDGET_QN'));
       Ext.getCmp('MAINTAINA_BUDGET_RATE_QN').setValue(store.getAt(index).get('MAINTAINA_BUDGET_RATE_QN'));
       Ext.getCmp('LST_MON_MAI_AMOUNT').setValue(store.getAt(index).get('LST_MON_MAI_AMOUNT'));
       Ext.getCmp('CUR_MON_MAI_AMOUNT1').setValue(store.getAt(index).get('CUR_MON_MAI_AMOUNT'));
       Ext.getCmp('CUR_MON_MAI_PRICE').setValue(store.getAt(index).get('CUR_MON_MAI_PRICE'));
       Ext.getCmp('CUR_MON_MAI_SUM').setValue(store.getAt(index).get('CUR_MON_MAI_SUM'));
       Ext.getCmp('CUR_MON_MAI_NEW_AMOUNT').setValue(store.getAt(index).get('CUR_MON_MAI_NEW_AMOUNT'));
       Ext.getCmp('CUR_MON_MAI_NEW_PRICE').setValue(store.getAt(index).get('CUR_MON_MAI_NEW_PRICE'));
       Ext.getCmp('CUR_MON_MAI_NEW_SUM').setValue(store.getAt(index).get('CUR_MON_MAI_NEW_SUM'));
       Ext.getCmp('CUR_MON_MAI_REN_AMOUNT').setValue(store.getAt(index).get('CUR_MON_MAI_REN_AMOUNT'));
       Ext.getCmp('CUR_MON_MAI_REN_PRICE').setValue(store.getAt(index).get('CUR_MON_MAI_REN_PRICE'));
       Ext.getCmp('CUR_MON_MAI_REN_SUM').setValue(store.getAt(index).get('CUR_MON_MAI_REN_SUM'));
       Ext.getCmp('CUR_MON_MAI_RET_AMOUNT').setValue(store.getAt(index).get('CUR_MON_MAI_RET_AMOUNT'));
       Ext.getCmp('CUR_MON_MAI_RET_PRICE').setValue(store.getAt(index).get('CUR_MON_MAI_RET_PRICE'));
       Ext.getCmp('CUR_MON_MAI_RET_SUM').setValue(store.getAt(index).get('CUR_MON_MAI_RET_SUM'));
       Ext.getCmp('CUR_MON_MAI_CAN_AMOUNT').setValue(store.getAt(index).get('CUR_MON_MAI_CAN_AMOUNT'));
       Ext.getCmp('CUR_MON_MAI_CAN_PRICE').setValue(store.getAt(index).get('CUR_MON_MAI_CAN_PRICE'));
       Ext.getCmp('CUR_MON_MAI_CAN_SUM').setValue(store.getAt(index).get('CUR_MON_MAI_CAN_SUM'));
       Ext.getCmp('CUR_MON_MAI_OWN_AMOUNT').setValue(store.getAt(index).get('CUR_MON_MAI_OWN_AMOUNT'));
       Ext.getCmp('CUR_MON_MAI_OWNED_AMOUNT').setValue(store.getAt(index).get('CUR_MON_MAI_OWNED_AMOUNT'));
       Ext.getCmp('CUR_MON_MAI_OTH_AMOUNT').setValue(store.getAt(index).get('CUR_MON_MAI_OTH_AMOUNT'));
       Ext.getCmp('CUR_MON_MAI_OTHED_AMOUNT').setValue(store.getAt(index).get('CUR_MON_MAI_OTHED_AMOUNT'));
       Ext.getCmp('CUR_MON_MAI_LIFT_AMOUNT').setValue(store.getAt(index).get('CUR_MON_MAI_LIFT_AMOUNT'));
       Ext.getCmp('CUR_MON_MAI_ESCA_AMOUNT').setValue(store.getAt(index).get('CUR_MON_MAI_ESCA_AMOUNT'));
   },
   //说明show
   to_infoshow:function(){
	   Ext.Msg.alert("说明","报表统计周期为每月一次,当月10号后更新上月数据.");
//		var bbk=Ext.Msg.show({
//		title:'说明',
//		modal:true,
//        html:'报表统计周期为每月一次,当月10号后更新上月数据.'
//		});
//		bbk.show();
   }
});

function formatNumber(n, j) {
    var s = n + "";
    var l = s.length;
    var m = l % 3;
    if (m==l) {
    	return s;
    }
    else if(m==0){
    	return (s.substring(m).match(/\d{3}/g)).join(j);
    } 
    else
    {    
    	return [s.substr(0,m)].concat(s.substring(m).match(/\d{3}/g)).join(j);
    }
}

function iniMydate(need_text_id,title){
	var Panel=Ext.getCmp('myPicker1');
	if(Panel){
		Panel.destroy();
	}
	if(!Mydate_show){
		var Mydate_show=Ext.Viewport.add({
	         xtype: 'picker',
	         ui: 'dark',
	         id:'myPicker1',
	         doneButton: '确定',
	         cancelButton: '取消',
	         modal:true,
	         toolbar: {
	             ui: 'light',
	             title: title,
	         },
	         slots: [
	             {
	                 xtype: 'pickerslot',
	                 align:'center',
	                 name: 'year',
	                 title: 'MyPickerSlot0',
	                 id:'slots00',
	                 data: eval("("+Achiviment_tpl+")")
	             }
	             ],
	             listeners:{
	            	 change:function(obj, value, eOpts ){
	            	 Ext.getCmp(need_text_id).setValue(value.year);
	            	 },
	             }
		 });
		Mydate_show.show();
	}
	
}

