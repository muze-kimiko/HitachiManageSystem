Ext.define('HelcPAD.view.OpportunityManagement.Project_New.BeInChargeOf.ProjectLookForList',{
	extend: 'Ext.Container',
	 id:'projectLookForListContainer',
	 config:{
		 items:[
	            {
	            	id:'projectLookForListContainerToolbar',
	                xtype: 'toolbar',
	                docked: 'top',
	                title: '商机查看',
	                cls:'textf',
	               /* items: [
	                    {
	                    	id:'projectLookForListBack',
	                        xtype: 'button',
	                        ui: 'back',
	                        text: '返回'
	                    },
	                    {
	                        xtype: 'spacer'
	                    },
	                    
	                ]*/
	            },{
	            	xtype:'toolbar',
	                 docked: 'top',
	                 height: '6%',
	                 layout: 'hbox',
	                 style: 'background:#EDEBF1;',
	                 html:'<div style="width:100%;">'+
	                 		'<div class="ysBlue anOne" id="opptyLookForListBack" style="width:96%;" onclick="object.getController(\'OpportunityManagement.Project_New.BeInChargeOf.ProjectLookForCtrl\').projectLookForListBack();">'+SYB+'</div>'+
	                	  '</div>'
	            },
	            /*{
            		id:'lookForOpptyPanel',
            		xtype:'tabpanel',
            		height: '100%',
            		cls:'textf',
            		items:[*/
            		    {
            		    	id:'ZWContainer',
            		    	xtype:'container',
            		    	title:'职位列表',
            		    	height:'100%',
            		    	items:[
            		    	    {
                                	id:'projectdirectormain_new_id__ZW_list',
                                    xtype: 'list',
                                    height: '100%',
                                    store:'HQSalesRepStore',
                                    itemTpl: [
                                        '<div>{Name}_{LastName}{FirstName}</div>'
                                    ],
                                    onItemDisclosure: true
            		    	    }
            		    	]
            		    }/*,{
            		    	id:'RYContainer',
            		    	xtype:'container',
            		    	title:'人员列表',
            		    	items:[
								{
								    xtype: 'toolbar',
								    docked: 'top',
								    items: [
								        {
								        	id:'lookOpptyDirector',
								            xtype: 'searchfield',
								            width: '100%',
								            placeHolder: '请输入过滤条件'
								        }
								    ]
								},
            		    	    {
            		    	    	id:'projectdirectormain_new_id__SJCK_list',
                                    xtype: 'list',
                                    height: '100%',
                                    store:'HQSalesRepStore',
                                    itemTpl: [
                                        '<div>{Name}_{ActiveLastName}{ActiveFirstName}&nbsp;&nbsp;&nbsp;<tpl if="CalOptyNumb==\'x\'"></tpl><tpl if="CalOptyNumb==\'\'">(0)</tpl><tpl if="CalOptyNumb!=\'\'&&CalOptyNumb!=\'x\'">({CalOptyNumb})</tpl></div>'
                                    ],
                                    onItemDisclosure: true
            		    	    }
            		    	]
            		    }*/
            		/*],
            		listeners:{
          			  activeitemchange:function( tabPanel, value, oldValue, eOpts ){
          				  oldValue.setHidden(true);
          				  if(value)
          					  value.setHidden(false);
          			  }
          		 },
	            },*/
	            
	           
	        ]
	 }
});