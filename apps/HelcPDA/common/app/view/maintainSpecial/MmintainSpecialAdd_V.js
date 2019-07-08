Ext.define('HelcPDA.view.maintainSpecial.MmintainSpecialAdd_V', {
    extend: 'Ext.Panel',
    id:'MmintainSpecialAdd_V_id',
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
                title: '添加专项保障',
                items: [
                    {
                        xtype: 'button',
                        id:'back_to_MSList',
                        ui: 'back',
                        text: '返回'
                    },
                ]
            },
//            {
//                xtype: 'toolbar',
//                docked: 'top',
//                items: [
//                    {
//                        xtype: 'spacer'
//                    },
//                    {
//                        xtype: 'searchfield',
//                        id:'msa_search_ASSET_NUM',
//                        width: '76%',
//                        placeHolder: '输入工号...'
//                    },
//                    {
//                        xtype: 'button',
//                        id:'btn_msa_search',
//                        width: '20',
//                        iconCls: 'search',
//                        text: '查询'
//                    },
//                    {
//                        xtype: 'spacer'
//                    }
//                ]
//            },
            {
                xtype: 'formpanel',
                flex: 1,
                height: 600,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '   查询条件(可填)',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '工号',
                                id:'msa_ASSET_NUM',
                                labelWidth: '50%',
                                placeHolder: '请输入工号'
                            },
                            {
                                xtype:'hiddenfield',
                                id:'msa_org_station',
                            },
                            {
                            	xtype:'hiddenfield',
                            	id:'msa_person_id',
                            },
                            {
                            	xtype: 'textfield',
                            	label: '合同号',
                            	id:'msa_AGREE_NUM',
                            	labelWidth: '50%',
                            	placeHolder: '请输入合同号'
                            },
                            {
                                xtype: 'textfield',
                                label: '客户名称',
                                id:'msa_ACCNT',
                                labelWidth: '50%',
                                placeHolder: '请输入客户名称'
                            },
                            {
                                xtype: 'textfield',
                                label: '地盘',
                                id:'msa_DOMAIN',
                                labelWidth: '50%',
                                placeHolder: '请输入地盘'
                            },
                            {
                            	xtype: 'textfield',
                            	label: '保养站',
                            	id:'msa_STATION',
                            	labelWidth: '50%',
                            	placeHolder: '请输入保养站'
                            },
                            {
                            	xtype: 'textfield',
                            	label: '保养类型',
                            	id:'msa_MP_TYPE',
                            	labelWidth: '50%',
                            	placeHolder: '请输入保养类型'
                            },
                            {
          	        	       xtype: 'selectfield',
         	        	       id:'msa_FAULT_TYPE',
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
                            {
                                xtype: 'button',
                                id:'msa_search_info',
                                margin: '15 auto',
                                width: '90%',
                                text: '查询'
                            },
                          ]
                    },
                    { 
                    	xtype: 'fieldset',
                    	title: '作业情况',
                        items: [   
									{
									    xtype: 'togglefield',
									    label: '轿门轿厢',
									    labelWidth: '70%',
									    id:'msa_JMJX'
									},
									{
										xtype: 'textfield',
                                        itemId:"phoneNumber",
                                        component:{xtype:"input",type:"tel"},
		                            	label: '轿门轿厢评分',
		                            	id:'msa_JMJX_SCORE',
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
										xtype: 'togglefield',
										label: '厅门',
										labelWidth: '70%',
										id:'msa_TM'
									},
									{
										xtype: 'textfield',
                                        itemId:"phoneNumber",
                                        component:{xtype:"input",type:"tel"},
		                            	label: '厅门评分',
		                            	id:'msa_TM_FS',
		                            	labelWidth: '50%',
		                            	maxLength: 4,
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
										xtype: 'togglefield',
										label: '安全回路',
										labelWidth: '70%',
										id:'msa_AQHL',
									},
									{
										xtype: 'textfield',
                                        itemId:"phoneNumber",
                                        component:{xtype:"input",type:"tel"},
		                            	label: '安全回路评分',
		                            	id:'msa_AQHL_FS',
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
										xtype: 'togglefield',
										label: '机房',
										labelWidth: '70%',
										id:'msa_KZG',
									},
									{
										xtype: 'textfield',
                                        itemId:"phoneNumber",
                                        component:{xtype:"input",type:"tel"},
		                            	label: '机房评分',
		                            	maxLength: 4,
		                            	id:'msa_KZG_FS',
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
                                          				WL.Toast.show('控制柜评分输入数字不合法,分值应在0-100,请重新输入');
                                         					 return true;
                                              		 }else{
                                              			 if(newValue>100){
                                              				WL.Toast.show('控制柜评分输入数字不合法,分值应在0-100,请重新输入');
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
									    xtype: 'datepickerfield',
									    id: 'msa_FINISH_DATE',
									    dateFormat: 'Y-m-d',
									    label: '完成时间',
									    labelWidth: '50%',
									    placeHolder: '点击设置时间',
									    picker: {
									    	value: new Date(),
									    	id: 'msa_FINISH_DATE_picker',
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
                                            	    			   Ext.getCmp('msa_FINISH_DATE').setValue();
                                            	    			   Ext.getCmp('msa_FINISH_DATE_picker').setHidden(true);
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
                    	title: '人员选择',
                        items: [
                                	{	
									    xtype: 'selectfield',
									    id: 'msa_STATION_ID',
									    label: '所属站',
									    labelWidth: '50%',
									    placeHolder: '请选择',
//									    valueField:'STATION_CODE',
//									    displayField:'STATION_NAME',
									    options: [
									    ],
									    usePicker: 'auto'
									},
									{
										xtype: 'selectfield',
									    id: 'msa_WORKER1',
									    label: '作业人员1',
									    labelWidth: '50%',
									    placeHolder: '请选择',
									    options: [
									    ],
									    usePicker: 'auto'
									},
									{
		                                xtype:'hiddenfield',
		                                id:'msa_worker_flg',
		                            },
									{	
										xtype: 'selectfield',
										id: 'msa_STATION_ID2',
										label: '所属站',
										//valueField:'STATION_CODE',
										//displayField:'STATION_NAME',
										labelWidth: '50%',
										placeHolder: '请选择',
										options: [
										          ],
										          usePicker: 'auto'
									},
									{
										xtype: 'selectfield',
										id: 'msa_WORKER2',
										label: '作业人员2',
										labelWidth: '50%',
										placeHolder: '请选择',
										options: [
										          ],
										          usePicker: 'auto'
									},
                                ]
                    },
                    { 
                    	xtype: 'fieldset',
                    	title: '',
                    	items: [
                    	        {
                    	        	xtype: 'togglefield',
                    	        	id:'msa_FINISH',
                    	        	label: '是否完成',
                    	        	labelWidth: '70%',
                    	        	readOnly: true
                    	        },
                    	        {
	                                xtype:'hiddenfield',
	                                id:'msa_worker_flg',
	                            },
	                            {
	                                xtype:'hiddenfield',
	                                id:'msa_ROW_ID',
	                            },
                    	        {
                                    xtype: 'button',
                                    id:'msa_toAdd',
                                    margin: '15 auto',
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