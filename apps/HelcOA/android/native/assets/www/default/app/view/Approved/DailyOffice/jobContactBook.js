
/* JavaScript content from app/view/Approved/DailyOffice/jobContactBook.js in folder common */
/**
 * 已审批-工作联络书
 */
Ext.define('HelcOA.view.Approved.DailyOffice.jobContactBook', {
    extend: 'Ext.Panel',
    id: 'ysp_jobContactBook_ID',
    requires: [
               'Ext.Toolbar',
               'Ext.Button',
               'Ext.Spacer',
               'Ext.form.Panel',
               'Ext.form.FieldSet',
               'Ext.field.DatePicker',
               'Ext.picker.Date',
               'Ext.field.TextArea'
           ],

    config: {
        layout: 'vbox',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'ysp_surface_ID',
                title: '工作联络书',
                items: [
                        {
                            xtype: 'button',
                            id: 'ysp_returnApproved',
                            text: '返回',
                            ui: 'back'
                        }
                    ]
            },
            {
                xtype: 'formpanel',
                flex: 1,
                id: 'fp',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '编号',
                                labelWidth: '40%',
								name: 'fileno',
								id: 'fileno',
                            	readOnly:true,
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '联络人',
                                labelWidth: '40%',
								name: 'agentman',
								id: 'agentman',
                            	readOnly:true,
                            },
                            {
                                xtype: 'textfield',
                                label: '联络部门',
                                labelWidth: '40%',
								name: 'dept',
								id: 'dept',
                            	readOnly:true,
                            },
                            {
                                xtype: 'textfield',
                                label: '联系电话',
                                labelWidth: '40%',
								name: 'phone',
								id: 'phone',
                            	readOnly:true,
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '时间',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '开始',
                                labelWidth: '40%',
								name: 'createdate',
								id: 'createdate',
                            	readOnly:true,
                            },
                            {
                                xtype: 'textfield',
                                label: '期望完成',
                                labelWidth: '40%',
								name: 'e_date',
								id: 'e_date',
                            	readOnly:true,
                            },
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        items: [
                            {
                                xtype: 'textfield',
                                label: '标题',
                                labelWidth: '40%',
                                required: true,
								name: 'subject',
								id: 'subject',
                            	readOnly:true,
                            },
                            {
                                xtype: 'textareafield',
                                label: '联络内容',
                                labelWidth: '40%',
                                required: true,
								name: 'neirong_textarea',
								id: 'neirong_textarea',
                            	readOnly:true,
                            }
                        ]
                    },
                    {
                    	xtype:'fieldset',
                    	title:'附件',
                    	items:[
//                               {
//                                   xtype: 'panel',
//                                   style: 'border-bottom:#ccc 1px dotted',
//                                   layout: {
//                                       type: 'hbox',
//                                       align: 'start',
//                                       pack: 'center'
//                                   },
//                                   items: [
//                                       {
//                                           xtype: 'button',
//                                           margin: 10,
//                                           width: 120,
//                                           text: '拍照',
//                                           id:'take_picture',
//                                       },
//                                       {
//                                           xtype: 'button',
//                                           margin: 10,
//                                           width: 120,
//                                           text: '浏览',
//                                           id:'see_picture'
//                                       },
////                                       {
////                                           xtype: 'button',
////                                           margin: 10,
////                                           width: 120,
////                                           text: '上传',
////                                           id:'uploadPiece'
////                                       },
//                                       
//                                   ]
//                               },
                           {
                    		xtype:'list',
                            id: 'picture_listV_ck',
                            width:"100%",
                            //height:200,
                            scrollable: false,
                            store :'jobContactBook_ck_Store',
                            //data:[{filename:'1.jpg'},{filename:'2.jpg'}],
                            itemTpl : ['<div style="width:100%; margin:0; padding:0;">',
                                       '{filename}',
                                       '</div>'],
                            onItemDisclosure: true
                    },
                    	       
                    	       ],
                    
                    },
                ]
            },
            {
                xtype: 'fieldset',
                hidden: true,
                items: [
                    {
                        xtype: 'textfield',
                        id: 'conds',
                        name: 'conds'
                    },
                    {
                        xtype: 'textfield',
                        id: 'userid',
                        name: 'userid'
                    },
                    {
                        xtype: 'textfield',
                        id: 'type',
                        name: 'type'
                    },
                    {
                        xtype: 'textfield',
                        id: 'username',
                        name: 'username'
                    },
                    {
                        xtype: 'textfield',
                        id: 'node',
                        name: 'node'
                    },
                    {
                        xtype: 'textfield',
                        id: 'ctime',
                        name: 'ctime'
                    },
                    {
                        xtype: 'textfield',
                        id: 'piid',
                        name: 'piid'
                    },
                    {
                        xtype: 'textfield',
                        id: 'processname',
                        name: 'processname'
                    },
                    {
                        xtype: 'textfield',
                        id: 'curauthor',
                        name: 'curauthor'
                    },
                    {
                        xtype: 'textfield',
                        id: 'dealmen',
                        name: 'dealmen'
                    },
                    {
                        xtype: 'textfield',
                        id: 'ygbh',
                        name: 'ygbh'
                    },
                    {
                        xtype: 'textfield',
                        id: 'form',
                        name: 'form'
                    },
                    {
                        xtype: 'textfield',
                        id: 'arcpath',
                        name: 'arcpath'
                    },
                    {
                        xtype: 'textfield',
                        id: 'arcdate',
                        name: 'arcdate'
                    },
                    {
                        xtype: 'textfield',
                        id: 'idea',
                        name: 'idea'
                    },
                    {
                        xtype: 'textfield',
                        id: 'endprocessdate',
                        name: 'endprocessdate'
                    },
                    {
                        xtype: 'textfield',
                        id: 'audit_list',
                        name: 'audit_list'
                    },
                    {
                        xtype: 'textfield',
                        id: 'taskid',
                        name: 'taskid'
                    },
                    {
                        xtype: 'textfield',
                        id: 'mast',
                        name: 'mast'
                    },
                ]
            }
        ]
    }

});