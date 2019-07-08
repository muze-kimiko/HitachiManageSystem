/*
 * File: app/view/Agents/ClueCreateAgent.js
 *
 * This file was generated by Sencha Architect
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.3.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.3.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('HelcAgent.view.OpportunityManagement.Agents.ClueCreateAgent', {
    extend: 'Ext.form.Panel',
    id:'clueCreateAgent',
    requires: [
        'Ext.Toolbar',
        'Ext.Button',
        'Ext.Spacer',
        'Ext.form.FieldSet',
        'Ext.field.Number',
        'Ext.field.Toggle',
        'Ext.field.Select'
    ],

    config: {
        items: [
            {
            	id:'clueCreateAgentToolbar',
                xtype: 'toolbar',
                docked: 'top',
                title: '新建线索',
                cls:'textf',
                items: [
                    /*{
                    	id:'clueCreateBack',
                        xtype: 'button',
                        text:'返回',
                        ui: 'back',
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                    	id:'execOperation',
                        xtype: 'button',
                        text: '提交',
                    },*/{
                    	id:'clueSelf',
                    	xtype:'hiddenfield',
                    },{
                    	id:'clueMapX',
                    	name:'XHeight',
                    	xtype:'hiddenfield',
                    },{
                    	id:'clueMapY',
                    	name:'YCoordinate',
                    	xtype:'hiddenfield'
                    }
                ]
            },{
            	id:'clueCrateAgentDefineToolbar',
           	 	xtype:'toolbar',
                docked: 'top',
                height: '6%',
                layout: 'hbox',
                style: 'background:#EDEBF1;',
                html:'<div style="width:100%;">'+
			         	  '<div class="anOneDiv">'+
			    			'<div class="ysZhOne anOne" style="width:46%;" onclick="object.getController(\'OpportunityManagement.Agents.ClueCreateAgentCtrl\').clueCreateBack();">返回主界面</div>'+
			    			'<div class="ysZhTwo anOne" style="width:46%;" onclick="object.getController(\'OpportunityManagement.Agents.ClueCreateAgentCtrl\').execOperation();">保存并提交</div>'+
			    		  '</div>'+
		    	      '</div>',
           
            },
            {
                xtype: 'fieldset',
                cls:'textf',
                items: [
                    {
                    	id:'clueNumber',
                    	name:'Id',
                        xtype: 'textfield',
                        label: '线索编号',
                        readOnly: true,
                        width:'100%',
                        labelWidth:160,
                        placeHolder:'自动生成',
                        hidden:true
                    },
                    {
                    	id:'clueSource',
                    	name:'LeadSource',
                        xtype: 'textfield',
                        label: '线索来源',
                        readOnly: true,
                        width:'100%',
                        labelWidth:160,
                        hidden:true
                    },
                    {
                    	id:'submitTime',
                    	name:'SubmitDate',
                        xtype: 'textfield',
                        label: '提交时间',
                        width:'100%',
                        labelWidth:160,
                        placeHolder:'提交后自动生成',
                        readOnly:true,
                        hidden:true
                    },
                    {
                    	id:'projectName',
                    	name:'ProjectName',
                        xtype: 'textfield',
                        label: '项目名称',
                        width:'100%',
                        labelWidth:160,
                        placeHolder:'请输入项目名称',
                        required:true
                    },
                    {
                    	id:'clueCustomer',
                    	name:'Account',
                        xtype: 'textfield',
                        label: '客户全称',
                        labelWidth:160,
                    	width:'80%',
                    	style:'float:left;',
                    	placeHolder:'请选择客户',
                    	readOnly:true,
                    },
                    {
						id:'clueCustomer_CX',
						xtype: 'button',
						text:'查询',
						margin: '9 0 0 0',
						style:'float:left',
						width:'20%',
					},
                    {
                    	id:'leadAccount',
                    	name:'LeadAccount',
                        xtype: 'textfield',
                        label: '线索客户',
                        labelWidth:160,
                    	width:'100%',
                    	style:'float:left;',
                    	placeHolder:'请输入线索客户',
                    	required:true
                    },
                    {
                    	id:'clueFinalUser',
                    	name:'LeadFinalUser',
                        xtype: 'textfield',
                        label: '使用单位',
                        width:'100%',
                        labelWidth:160,
                        style:'float:left;',
                        placeHolder:'与客户项关联',
                        listeners:{
                        	focus:function(field, e, eOpts){
                        		if(!field.getValue()){
                        			var clueCustomer = Ext.getCmp('leadAccount').getValue();
                        			cc.log('值:'+clueCustomer);
                        			field.setValue(clueCustomer);
                        		}
                        	}
                        },
                        required:true
                    },
                    {
                    	id:'clueArea',
                    	name:'ProjectArea',
                        xtype: 'textfield',
                        label: '区域',
                        width:'100%',
                        labelWidth:160,
                        style:'float:left;',
                        placeHolder:'根据省份自动生成',
                        hidden:true,
                        options:[
                                {text:'请选择',value:''},
                                {text:'华南',value:'华南'},
                                {text:'华中',value:'华中'},
                                {text:'华北',value:'华北'},
                                {text:'华东',value:'华东'},
                                {text:'西南',value:'西南'},
                                {text:'西北',value:'西北'},
                                {text:'东北',value:'东北'},
                        ],
                    },
                    {
                    	id:'clueProvince',
                    	name:'Province',
                        xtype: 'textfield',
                        label: '省/直辖市',
                        width:'100%',
                        labelWidth:160,
                        style:'float:left;',
                        readOnly:true,
                        placeHolder:'请选择省',
                        hidden:true
                    },{
                    	id:'toStreetAddress',
                    	xtype:'button',
                    	width:'18%',
                    	style:'float:left;',
                    	margin:'9 0 0 0',
                    	text:'选择',
                    	hidden:true,
                    },
                    {
                    	id:'clueCity',
                    	name:'City',
                        xtype: 'textfield',
                        label: '市',
                        width:'100%',
                        labelWidth:160,
                        style:'float:left;',
                        readOnly:true,
                        placeHolder:'请选择市',
                        hidden:true,
                    },
                    {
                    	id:'clueDistrict',
                    	name:'County',
                        xtype: 'textfield',
                        label: '区/县',
                        width:'100%',
                        labelWidth:160,
                        style:'float:left;',
                        readOnly:true,
                        placeHolder:'请选择区',
                        hidden:true,
                    },
                    {
                    	id:'projectAddress',
                    	name:'StreetAddress',
                        xtype: 'textfield',
                        label: '项目地址',
                        width:'100%',
                        labelWidth:160,
                        style:'float:left;',
                        readOnly:true,
                        placeHolder:'定位后自动确定',
                        hidden:true,
                    },
                    {
                    	id:'Cluefd',
                    	xtype:'fieldset',
                    	cls:'textf',
                    	items:[],
                    	html:'<div class="ysTwo anOne" id="toCluePosition" onclick="object.getController(\'OpportunityManagement.Agents.ClueCreateAgentCtrl\').toCluePosition();" style="background:none repeat scroll 0 0 #42D7BC;width:96%;">定位</div>',
                    },
                    {
                    	id:'bCIImportAddress',
                    	name:'BCIImportAddress',
                        xtype: 'textfield',
                        label: '线索地址',
                        width:'100%',
                        labelWidth:160,
                        style:'float:left;',
                        readOnly:true,
                        placeHolder:'定位后自动写入',
                        required:true
                    },
                    {
                    	id:'cluePosition',
                    	name:'cluePosition',
                        xtype: 'textfield',
                        label: '定位坐标',
                        width:'100%',
                        labelWidth:160,
                        style:'float:left;',
                        placeHolder:'请选择线索坐标',
                        readOnly:true,
                        /*listeners:{
                        	change:function( textfield, newValue, oldValue, eOpts ){
                        		var tempValue = [newValue,newValue,newValue] ;
                        		if(newValue.indexOf(',')!=-1){
                        			var installAddress = tempValue[0].split(',');
                        			var together = tempValue[0].replace(/,/g,'');
                        			var installFields = ['clueProvince','clueCity','clueDistrict','projectAddress'];
                        			if(installAddress.length==5){
                        				for(var i=0;i<installFields.length;i++){
                        					if(i==installFields.length-1){
                        						Ext.getCmp(installFields[i]).setValue(installAddress[i]+installAddress[i+1]);
                        						break;
                        					}
                        					Ext.getCmp(installFields[i]).setValue(installAddress[i]);
                        				}
                        			}else{
                        				for(var i=0;i<installFields.length;i++){
                        					if(i==0)
                        						Ext.getCmp(installFields[i]).setValue(installAddress[i].split('市')[0]);
                        					else if(i==installFields.length-1)
                        						Ext.getCmp(installFields[i]).setValue(installAddress[i-1]+installAddress[i]);
                        					else
                        						Ext.getCmp(installFields[i]).setValue(installAddress[i-1]);
                        				}
                        			}
                        			textfield.setValue(together);
                        		}
                        	}
                        },*/
                        required:true
                    },
                    {
                    	id:'xHeight',
                    	name:'XHeight',
                        xtype: 'textfield',
                        label: '定位坐标X',
                        width:'100%',
                        labelWidth:160,
                        style:'float:left;',
                        readOnly:true,
                        required:true,
                        hidden:true
                    },
                    {
                    	id:'yCoordinate',
                    	name:'YCoordinate',
                        xtype: 'textfield',
                        label: '定位坐标Y',
                        width:'100%',
                        labelWidth:160,
                        style:'float:left;',
                        readOnly:true,
                        required:true,
                        hidden:true
                    },
                    /*,{
                    	id:'toCluePosition',
                    	xtype:'button',
                    	text:'定位',
                    	style:{
                    		'float':'left',
                    	},
                    	width:'100%',
                    	margin: '10 0 0 0',
                    },*/
                ]
            },
            {
            	xtype:'fieldset',
            	cls:'textf',
            	items:[{//*
                	id:'opptyCategory',
                	name:'LeadCategory',
                	xtype:'selectfield',
                	label:'线索类型',
                	width:'100%',
                	labelWidth:160,
                	style:'float:left;',
                	required:true
                	
                },{//*
                	id:'opptySubCategory',
                	name:'LeadSubCategory',
                	xtype:'selectfield',
                	label:'线索子类型',
                	width:'100%',
                	labelWidth:160,
                	style:'float:left;',
                	required:true
                },
                {
                	id:'builderHeight',
                	name:'BuildingHeight',
                    xtype: 'textfield',
                    label: '建筑高度(m)',
                    width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    placeHolder:'请输入建筑高度',
                    required:true,
                    //value:25
                },
                {
                	id:'builderFloor',
                	name:'BuildingLayer',
                    xtype: 'textfield',
                    label: '建筑层数',
                    width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    placeHolder:'请输入建筑层数',
                    required:true,
                    listeners:{
                    	keyup:function(field,e,eOpts){
                    		if((field.getValue()!='0'&&isNaN(field.getValue()))||field.getValue()<0){
                    			Ext.Msg.alert('提示','请输入数字！');
                    			field.setValue('0');
                    		}
                    	}
                    }
                    //value:15
                },
                {
                	id:'planVelevatorNum',
                	name:'EvaluateElevatorQuantity',
                    xtype: 'textfield',
                    label: '预估直梯台数',
                    width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    placeHolder:'请输入预估直梯台数',
                    listeners:{
                    	keyup:function(field,e,eOpts){
                    		if((field.getValue()!='0'&&isNaN(field.getValue()))||field.getValue()<0){
                    			Ext.Msg.alert('提示','请输入数字！');
                    			field.setValue('0');
                    		}
                    	}
                    },
                    //value:8
                    required:true
                },
                {
                	id:'planHelevatorNum',
                	name:'EvaluateEscalatorQuantity',
                    xtype: 'textfield',
                    label: '预估扶梯台数',
                    width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    placeHolder:'请输入预估扶梯台数',
                    listeners:{
                    	keyup:function(field,e,eOpts){
                    		if((field.getValue()!='0'&&isNaN(field.getValue()))||field.getValue()<0){
                    			Ext.Msg.alert('提示','请输入数字！');
                    			field.setValue('0');
                    		}
                    	}
                    },
                    //value:3
                    required:true
                },{
                	id:'cluePredictSignYear',
                	name:'PredictSignYear',
                	xtype:'selectfield',
                	label:'预计签约年',
                	width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    required:true,
                    listeners:{
                    	initialize:function(selectField, eOpts ){
                    		cc.log(eOpts);
                    		var years = [];
                    		years[0] = {text:'请选择',value:''};
                    		var data=new Date();
                    		var year=data.getFullYear();
                    		var num=1;
                    		for(var i=5;i>0;i--){
                    			var yr = {text:year-i+'年',value:year-i};
                    			years[num] = yr;
                    			num++;
                    		};
                    		var numTwo=years.length;
                    		var yr = {text:year+'年',value:year};
                    		years[numTwo]=yr;
                    		var num=years.length;
                    		for(var j=1;j<6;j++){
                    			var yr = {text:year+j+'年',value:year+j};
                    			years[num] = yr;
                    			num++;
                    		};
                    		selectField.setOptions(years);
                    	},
                    },
                    placeHolder:'请选择预计签约年份',
                },{
                	id:'cluePredictSignMonth',
                	name:'PredictSignMonth',
                	xtype:'selectfield',
                	label:'预计签约月',
                	width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    required:true,
                    placeHolder:'请选择预计签约月份',
                    listeners:{
                    	initialize:function(selectField, eOpts ){
                    		var months = [];
                    		months[0] = {text:'请选择',value:''};
                    		for(var i=1;i<13;i++){
                    			var month = {text:i+'月',value:i};
                    			months[i] = month;
                    		}
                    		selectField.setOptions(months);
                    	}
                    }
                },
                {
                	id:'clueAccountKAName',
                	name:'BigCustomer',
                    xtype: 'selectfield',
                    style: 'float: left',
                    label: '大客户名称',
                    width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    hidden:true,
                },
                {
                	id:'clueAccountKANumber',
                	name:'AccountKaNumber',
                    xtype: 'textfield',
                    style: 'float: left',
                    label: '大客户编号',
                    width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    readOnly: true,
                    placeHolder:'选择客户后自动生成',
                    hidden:true,
                },
                {
                	id:'clueBigProject',
                	name:'LeadMajorProjet',
                    xtype: 'togglefield',
                    label: '大项目关注',
                    width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    //value:1
                },
                {
                	id:'clueImportDemand',
                	name:'LeadImportDemand',
                    xtype: 'togglefield',
                    label: '进口件需求',
                    width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    //value:1
                },
                {
                	id:'clueCustomerDemand',
                	name:'Description',
                    xtype: 'textfield',
                    label: '其他需求',
                    width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    placeHolder:'请输入其他需求',
                    //value:'客户对电梯的安全维护要求严谨'
                },
                {//*
                	id:'directorOppose',
                	name:'ManagerRejectComments',
                    xtype: 'textfield',
                    label: '处理意见',
                    width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    //value:''
                },
                
                {//*
                	id:'correlationOppty',
                	name:'OpptyNumber',
                    xtype: 'textfield',
                    label: '关联商机',
                    width:'80%',
                    //labelWidth:'54%',
                    labelWidth:160,
                    style:'float:left;',
                    placeHolder:'请关联商机',
                },
                {//*
                	id:'toCorrelationOppty',
                    xtype: 'button',
                    margin: '10 0 0 0',
                    width: '20%',
                    text: '详情',
                    style:'float:left;'
                },
                {//*
                	id:'correlationOpptyStatus',
                	name:'OpptyStatus',
                    xtype: 'textfield',
                    label: '商机状态',
                    width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    placeHolder:'关联商机后自动生成',
                },
                
                /*{
                	id:'clueOrder',
                	name:'RegistrationSequence',
                    xtype: 'textfield',
                    label: '报备顺序',
                    width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    readOnly:true,
                    placeHolder:'系统分配，无需填写',
                },*/
                {
                	id:'supplierStatus',
                	name:'AgentPerformanceStatus',
                    xtype: 'selectfield',
                    label: '经销商状态',
                    width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    readOnly:true,
                    placeHolder:'关联商机后生成',
                },
                {
                	id:'taskAchieve',
                	name:'PerformanceShared',
                    xtype: 'textfield',
                    label: '任务业绩',
                    width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    placeHolder:'请填写任务业绩',
                    hidden:true
                    //value:0.5
                },
                {
                	id:'achieveNum',
                	name:'PerformanceCountCal',
                    xtype: 'textfield',
                    label: '业绩台量',
                    width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    placeHolder:'请填写业绩台量',
                    hidden:true
                   // value:10
                },{
                	id:'supplierName',
                	name:'AgentName',
                    xtype: 'selectfield',
                    label: '经销商名称',
                    width:'100%',
                    labelWidth:160,
                    readOnly:true,
                    inputCls:'ROCls',
                    //value:'广州飞跃电梯销售有限公司',
                    placeHolder:'当前用户所在单位',
                    required:true,
                },{
                	id:'agentId',
                	xtype:'hiddenfield',
                	name:'AgentId',
                },{
                	id:'reportPerson',
                	name:'RegistrationPerson',
                    xtype: 'textfield',
                    label: '线索人',
                    readOnly: true,
                    width:'100%',
                    labelWidth:160,
                    value:usernames,
                    plachHolder:'当前用户',
                    inputCls:'ROCls',
                },
                {//*
                	id:'clueFollower',
                	name:'ListOfHELLead_AgentPosition',
                    xtype: 'textfield',
                    label: '线索跟踪人员',
                    width:'80%',
                    //labelWidth:'54%',
                    labelWidth:160,
                    readOnly:true,
                    style:'float:left;',
                },
                {
                	id:'clueStatus',
                	name:'LeadStatus',
                    xtype: 'selectfield',
                    label: '线索状态',
                    width:'100%',
                    inputCls:'ROCls',
                    labelWidth:160,
                    style:'float:left;',
                    readOnly:true,
                    required:true,
                    /*options:[
                             {text:'请选择',value:''},
                             {
                             	text:'新建',
                             	value:'新建',
                             },
                             {
                             	text:'审批中',
                             	value:'审批中',
                             },
                             {
                             	text:'已取消',
                             	value:'已取消',
                             },
                             {
                             	text:'报备成功',
                             	value:'报备成功',
                             },
                             {
                             	text:'已终止',
                             	value:'已终止',
                             },
                             {
                             	text:'报备失败',
                             	value:'报备失败',
                             },
                    ]*/
                },
                {
                	id:'clueDealWithTime',
                	name:'HandleDate',
                    xtype: 'textfield',
                    label: '线索处理时间',
                    width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    readOnly:true,
                    hidden:true
                },
                {//*
                	id:'toClueFollwoer',
                	xtype:'button',
                	text:'详情',
                	width:'20%',
                	margin:'9 0 0 0',
                	style:'float:left;'
                },
                {
                	id:'clueOperation',
                    xtype: 'selectfield',
                    label: '操作',
                    width:'100%',
                    labelWidth:160,
                    style:'float:left;',
                    inputCls:'ROCls',
                    readOnly:true,
                    hidden:true,
                    options: [
                        {text:'保存线索',value:'保存报备'},
                        {text:'取消线索',value:'取消报备'},
                    ]
                }
                ]
            }
        ]
    }

});