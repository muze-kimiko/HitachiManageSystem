
/* JavaScript content from app/view/SynchronizationTable/SafeguardFourRecordContent_FJ_Img.js in folder common */

Ext.define('HelcPDA.view.SynchronizationTable.SafeguardFourRecordContent_FJ_Img', {
	extend: 'Ext.Panel',
	id: 'SafeguardFourRecordContent_FJ_Img_id',
    requires: [
         'Ext.Toolbar',
         'Ext.Button',
         'Ext.Spacer',
         'Ext.field.TextArea',
         'Ext.Img',
         'Ext.form.Panel',
         'Ext.field.Hidden'
     ],

    config: {
         layout: 'vbox',
         items: [
             {
                 xtype: 'toolbar',
                 docked: 'top',
                 items: [
                     {
                         xtype: 'button',
                         id: 'SafeguardFourRecordContent_FJ_Img_id_FH',
                         ui: 'back',
                         text: '返回'
                     },
                     {
                         xtype: 'spacer'
                     },
                     {
                         xtype: 'button',
                         id: 'SafeguardFourRecordContent_FJ_Img_id_QD',
                         text: '确定',
                         hidden:true,
                     },
                 ]
             },
             {
                 xtype: 'container',
                 flex: 1,
                 layout: 'vbox',
                 items: [
                     {
                         xtype: 'image',
                         docked: 'top',
                         height: 280,
                         id: 'SafeguardFourRecordContent_FJ_Img_id_Src',
                         margin: '10 10 0 10',
                         maxHeight: 350,
                         maxWidth: 350
                     },
                     {
                         xtype: 'formpanel',
                         cls: [
                             'liftnet-form-info',
                             'liftnet-font-size14'
                         ],
                         height:30,
                         margin: '10 10 10 10',
                         scrollable: false,
                         items: [
							{
								 id:'MeasureItemAttachFileName',
							    xtype: 'textfield',
							    label: '名称',
							    labelWidth:'40%',
							    required:true,
							    readOnly:true,
							},
                         ]
                     },
                     {//存放图片的位置
							id:'SafeguardFourRecordContent_FJ_Img_id_Index',
						    xtype: 'hiddenfield',
					 },
                     {
					      xtype: 'panel',
					      layout: {
					          type: 'hbox',
					          align: 'center'
					      },
					      items: [
					          {
					              xtype: 'spacer'
					          },
					          {
					              xtype: 'button',
					              id:'SafeguardFourRecordContent_FJ_Img_id_SC',
					              margin: '15 0',
					              width: '90%',
					              text: '删除',
					              hidden:true,
					          },
					          {
					              xtype: 'spacer'
					          }
					      ]
					  },
                 ]
             }
         ]
     }

});

	 








