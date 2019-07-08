Ext.define('HelcPDA.view.maintainSpecial.MmintainSpecialDetail_V', {
    extend: 'Ext.Panel',
    id:'MmintainSpecialDetail_V_id',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.Label',
        'Ext.field.DatePicker',
        'Ext.picker.Date',
        'Ext.field.Search'
    ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '专项保障录入',
                items: [
                    {
                        xtype: 'button',
                        id:'back_to_MSList',
                        ui: 'back',
                        text: '返回'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        id:'menu_button',
                        handler: function(button, e) {
                            var menu = Ext.create('Ext.Menu', {
                            	items: [
								{
								    text: '删除',
								    iconCls: 'delete',
								    id: 'msd_delete',
								    handler: function() {
                                        Ext.Viewport.removeMenu('right');
                                    }
								}
                                ]
                            });
                            
                            Ext.Viewport.setMenu(menu, {
                                side: 'right',
                                reveal: false
                            });

                            Ext.Viewport.showMenu('right');
                        },
                        iconCls: 'more',
                        text: ''
                    }
                ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                height: 600,
                items: [
                    {
                        xtype: 'fieldset',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '工号',
                                id:'msd_ASSET_NUM',
                                labelWidth: '50%',
                                readOnly: true
                            },
                            {
                            	xtype: 'textfield',
                            	label: '合同号',
                            	id:'msd_AGREE_NUM',
                            	labelWidth: '50%',
                            	readOnly: true
                            },
                            {
           	        	       xtype: 'selectfield',
          	        	       id:'msd_FAULT_TYPE',
          	        	       label: '保障类型',
          	        	       placeHolder:'请选择保障类型',
          	        	       labelWidth: '50%',
          	        	       options: [ 
          	        	                  {
            	                	        text:'请选择',
          	                	            value:''
          	                             },
          	        	                 {
          	        	                	 text:'整改',
          	        	                	 value:'整改'
          	        	                  },
          	        	                  {
           	        	                	 text:'抽查',
           	        	                	 value:'抽查'
           	        	                  }
      							        ],
          	                             },
                          ]
                    },
                    { 
                    	xtype: 'fieldset',
                    	title: '作业情况',
                        items: [
									{
									    xtype:'togglefield',
									    id:'msd_jmjx',
									    label: '轿门轿厢',
									    labelWidth: '70%',
									},
									{
										xtype: 'textfield',
                                        itemId:"phoneNumber",
                                        component:{xtype:"input",type:"tel"},
		                            	label: '轿门轿厢评分',
		                            	id:'msd_jmjx_SCORE',
		                            	labelWidth: '50%',
		                            	maxLength: 4,
		                            	placeHolder: '请对轿门轿厢评分',
		                            	listeners:{
                                         	 change:function(obk,newValue,oldValue,eOpts){
                                         		if(oldValue==''&&newValue!=''){
                                         			isOk()==true?obk.setValue(''):true;
                                         		}else if(oldValue!=''&&newValue!=''){
                                         			isOk()==true?obk.setValue(oldValue):true;
                                         		}else if(oldValue!=''&&newValue==''){
                                         		}else{
                                         			
                                         		}
                                         		function isOk(){
                                         			 if(!(/^\d+(\.\d{1})?$/g.test(newValue))){
                                         				WL.Toast.show('轿门轿厢评分输入数字不合法,分值应在0-100,请重新输入');
                                         				 return true;
                                              		 }else{
                                              			 if(newValue>100){
                                              				WL.Toast.show('轿门轿厢评分输入数字不合法,分值应在0-100,请重新输入');
                                         					 return true;
                                         				 }else{
                                         					return false;
                                         				 }
                                              		 }
                                         		}
                                         		
                                         	 }
                                          }
									},
									{
										xtype:'togglefield',
										id:'msd_tm',
										label: '厅门',
										labelWidth: '70%',
									},
									{
										xtype: 'textfield',
                                        itemId:"phoneNumber",
                                        component:{xtype:"input",type:"tel"},
		                            	label: '厅门评分',
		                            	id:'msd_tm_FS',
		                            	maxLength: 4,
		                            	labelWidth: '50%',
		                            	placeHolder: '请对厅门评分',
		                            	listeners:{
                                         	 change:function(obk,newValue,oldValue,eOpts){
                                         		if(oldValue==''&&newValue!=''){
                                         			isOk()==true?obk.setValue(''):true;
                                         		}else if(oldValue!=''&&newValue!=''){
                                         			isOk()==true?obk.setValue(oldValue):true;
                                         		}else if(oldValue!=''&&newValue==''){
                                         		}else{
                                         			
                                         		}
                                         		function isOk(){
                                         			 if(!(/^\d+(\.\d{1})?$/g.test(newValue))){
                                         				WL.Toast.show('厅门评分输入数字不合法,分值应在0-100,请重新输入');
                                         				 return true;
                                              		 }else{
                                              			 if(newValue>100){
                                              				WL.Toast.show('厅门评分输入数字不合法,分值应在0-100,请重新输入');
                                         					 return true;
                                         				 }else{
                                         					return false;
                                         				 }
                                              		 }
                                         		}
                                         		
                                         	 }
                                          }
									},
									{
										xtype:'togglefield',
										id:'msd_aqhl',
										label: '安全回路',
										labelWidth: '70%',
									},
									{
										xtype: 'textfield',
                                        itemId:"phoneNumber",
                                        component:{xtype:"input",type:"tel"},
		                            	label: '安全回路评分',
		                            	id:'msd_aqhl_FS',
		                            	maxLength: 4,
		                            	labelWidth: '50%',
		                            	placeHolder: '请对安全回路评分',
		                            	listeners:{
                                         	 change:function(obk,newValue,oldValue,eOpts){
                                         		if(oldValue==''&&newValue!=''){
                                         			isOk()==true?obk.setValue(''):true;
                                         		}else if(oldValue!=''&&newValue!=''){
                                         			isOk()==true?obk.setValue(oldValue):true;
                                         		}else if(oldValue!=''&&newValue==''){
                                         		}else{
                                         			
                                         		}
                                         		function isOk(){
                                         			 if(!(/^\d+(\.\d{1})?$/g.test(newValue))){
                                         				WL.Toast.show('安全回路评分输入数字不合法,分值应在0-100,请重新输入');
                                         				 return true;
                                              		 }else{
                                              			 if(newValue>100){
                                              				WL.Toast.show('安全回路评分输入数字不合法,分值应在0-100,请重新输入');
                                         					 return true;
                                         				 }else{
                                         					return false;
                                         				 }
                                              		 }
                                         		}
                                         		
                                         	 }
                                          }
									},
									{
										xtype:'togglefield',
										id:'msd_kzg',
										label:'机房',
										labelWidth: '70%',
									},
									{
										xtype: 'textfield',
                                        itemId:"phoneNumber",
                                        component:{xtype:"input",type:"tel"},
		                            	label:'机房评分',
		                            	id:'msd_kzg_FS',
		                            	maxLength: 4,
		                            	labelWidth: '50%',
		                            	placeHolder: '请对控制柜评分',
		                            	listeners:{
                                         	 change:function(obk,newValue,oldValue,eOpts){
                                         		if(oldValue==''&&newValue!=''){
                                         			isOk()==true?obk.setValue(''):true;
                                         		}else if(oldValue!=''&&newValue!=''){
                                         			isOk()==true?obk.setValue(oldValue):true;
                                         		}else if(oldValue!=''&&newValue==''){
                                         		}else{
                                         			
                                         		}
                                         		function isOk(){
                                         			 if(!(/^\d+(\.\d{1})?$/g.test(newValue))){
                                         				WL.Toast.show('机房评分输入数字不合法,分值应在0-100,请重新输入');
                                         				 return true;
                                              		 }else{
                                              			 if(newValue>100){
                                              				WL.Toast.show('机房评分输入数字不合法,分值应在0-100,请重新输入');
                                         					 return true;
                                         				 }else{
                                         					return false;
                                         				 }
                                              		 }
                                         		}
                                         		
                                         	 }
                                          }
									},
									{
									    xtype:'datepickerfield',
									    id: 'msd_FINISH_DATE',
									    dateFormat: 'Y-m-d',
									    label: '完成时间',
									    labelWidth: '50%',
									    placeHolder: '点击设置时间',
									    picker: {
									    	value: new Date(),
									    	id: 'msd_FINISH_DATE_picker',
									        slotOrder: [
									            'year',
									            'month',
									            'day'
									        ],
									        doneButton: '完成',
									        cancelButton: '取消',
									        toolbar:{
                                            	title:'作业完成时间',
                                            	items:[
                                            	       {
                                            	    	   xtype:'button',
                                            	    	   text:'清除',
                                            	    	   listeners:{
                                            	    		   tap:function(){
                                            	    			   Ext.getCmp('msd_FINISH_DATE').setValue();
                                            	    			   Ext.getCmp('msd_FINISH_DATE_picker').setHidden(true);
                                            	    		   }
                                            	    	   }
                                            	       }
                                            	]
                                            }
									    }
									
									}
                                ]
                    },
                    { 
                    	xtype: 'fieldset',
                    	id: 'select_person',
                    	title: '人员选择',
                        items: [
                                	{	
									    xtype: 'selectfield',
									    id: 'msd_STATION_ID',
									    label: '所属站',
									    labelWidth: '50%',
									    placeHolder: '请选择',
									    options: [
									    ],
									    usePicker: 'auto'
									},
									{
										xtype: 'selectfield',
									    id: 'msd_WORKER1',
									    label: '作业人员1',
									    labelWidth: '50%',
									    placeHolder: '请选择',
									    options: [
									    ],
									    usePicker: 'auto'
									},
									{
									    xtype:'hiddenfield',
									    id:'msd_WORKER1_flg',
									},
									{
										xtype:'hiddenfield',
										id:'msd_WORKER1_id_hidden',
									},
									{
										xtype:'hiddenfield',
										id:'msd_ROW_ID',
										value:''
									},
									{	
										xtype: 'selectfield',
										id: 'msd_STATION_ID2',
										label: '所属站',
										labelWidth: '50%',
										placeHolder: '请选择',
										options: [
										          ],
										          usePicker: 'auto'
									},
									{
										xtype: 'selectfield',
										id: 'msd_WORKER2',
										label: '作业人员2',
										labelWidth: '50%',
										placeHolder: '请选择',
										options: [
										          ],
										          usePicker: 'auto'
									},
									{
									    xtype:'hiddenfield',
									    id:'msd_WORKER2_flg',
									},
									{
										xtype:'hiddenfield',
										id:'msd_WORKER2_id_hidden',
									}
                                ]
                    },
                    { 
                    	xtype: 'fieldset',
                    	title: '',
                    	items: [
                    	        {
                    	        	xtype: 'togglefield',
                    	        	id:'msd_FINISH',
                    	        	label: '是否完成',
                    	        	labelWidth: '70%',
                    	        	readOnly: true
                    	        },
                    	        {
                                    xtype: 'button',
                                    id:'ms_commit',
                                    margin: 15,
                                    width: '90%',
                                    iconCls: 'arrow_up',
                                    text: '提交到服务器'
                                },
                    	        ]
                    },
                    
                ]
            }
        ]
    },
    

});