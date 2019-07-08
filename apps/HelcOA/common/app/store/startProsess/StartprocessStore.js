Ext.define("HelcOA.store.startProsess.StartprocessStore",{
	extend:'Ext.data.Store',
	id:'StartprocessStore_id',
	requires:["HelcOA.model.startProsess.StartprocessModel"],
	config:{
		model:'HelcOA.model.startProsess.StartprocessModel',
		
		data: [
               {
                   title: '日常办公',
                   color: '#854107',
                   icon: 'O',
                   class: 'i_Button_List_Icon_2'
               },
               {
                   title: '信息技术',
                   color: '#009ddc',
                   icon: 'i',
                   class: 'i_Button_List_Icon_2'
               },
               {
                   title: '营业/工程业务',
                   color: '#fbb726',
                   icon: 'b',
                   class: 'i_Button_List_Icon_2'
               },
               {
                   title: '待办事项',
                   color: '#f6821f',
                   icon: 't',
                   class: 'i_Button_List_Icon_2'
               },
               {
                   title: '质量控制',
                   color: '#e03a3e',
                   icon: '!',
                   class: 'i_Button_List_Icon_2'
               },
               {
                   title: '财务管理',
                   color: '#fbb726',
                   icon: '￥',
                   class: ''
               },
               {
                   title: '技术管理',
                   color: '#963d97',
                   icon: 'z',
                   class: 'i_Button_List_Icon_2'
               },
               {
                   title: '提案管理',
                   color: '#009ddc',
                   icon: 'W',
                   class: 'i_Button_List_Icon_2'
               },
               {
                   title: '制造管理',
                   color: '#656161',
                   icon: 'y',
                   class: 'i_Button_List_Icon_2'
               },
               {
                   title: '天津工厂',
                   color: '#fcb827',
                   icon: '|',
                   class: 'i_Button_List_Icon_2'
               },
               {
                   title: '上海工厂',
                   color: '#f6821f',
                   icon: '|',
                   class: 'i_Button_List_Icon_2'
               },
               {
                   title: '成都工厂',
                   color: '#e03a3e',
                   icon: '|',
                   class: 'i_Button_List_Icon_2'
               },
               {
                   title: '扶梯公司',
                   color: '#963d97',
                   icon: '|',
                   class: 'i_Button_List_Icon_2'
               },
               {
                   title: '上海安防公司',
                   color: '#009ddc',
                   icon: '|',
                   class: 'i_Button_List_Icon_2'
               }
           ],
	}
});