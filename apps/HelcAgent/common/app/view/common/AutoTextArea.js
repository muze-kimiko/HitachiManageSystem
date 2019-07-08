Ext.define('HelcAgent.view.common.AutoTextArea',{
	extend: 'Ext.field.TextArea',
	xtype: ['autoTextArea','widget.autoTextArea'],
	config:{
		clearIcon: false,
		maxRows : 12,
		lineHeight: 50
	},
	initialize : function(){
		var me = this;
		me.callParent(arguments);
		me.adjustHeight = Ext.Function.createBuffered(function(){
			var textAreaEl = me.getComponent().input;
			if(textAreaEl){
				var scrollHeight = textAreaEl.dom.scrollHeight,
				height;
				//根据条件调整高度
				if(!me.maxHeight || (me.maxHeight > scrollHeight)){
					height = scrollHeight;
				}else{
					height = me.maxHeight;
				}
				textAreaEl.dom.style.height = 'auto';
				textAreaEl.dom.style.height = height + "px";
			}
		},200,me);
		
		me.on({
			scope: me,
			keyup: 'adjustHeight',
			change: 'adjustHeight',
			painted: 'initHeight'
		});
	},
	//初始化高度
	initHeight: function(){
		var me = this,
		lingHeight = me.getLineHeight(),
		maxRows = me.getMaxRows();
		//如果有设置lineHeight和maxRows会产生一个最高高度
		
		if(lingHeight && maxRows){
			me.maxHeight = lingHeight * maxRows;
		}
	},
	//重新初始化
	reset : function(){
		var me = this,
		textAreaEl = me.getComponent().input;
		if(textAreaEl && me.getValue().length ==0){
			textAreaEl.dom.style.height = 'auto';
			textAreaEl.dom.style.height = me.getLineHeight() + "29px";
		}
	}
});