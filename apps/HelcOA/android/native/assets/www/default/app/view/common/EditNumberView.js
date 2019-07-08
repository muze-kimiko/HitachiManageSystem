
/* JavaScript content from app/view/common/EditNumberView.js in folder common */
Ext.define('HelcOA.view.common.EditNumberView', {
    extend : 'Ext.field.Text',
    xtype  : 'textnumfield',

    config : {
        pattern : '[0-9]*'
    },

    updatePattern : function(pattern) {
        var component = this.getComponent();

        component.updateFieldAttribute('pattern', pattern);
    },

    initialize : function() {
        this.callParent();

        var component = this.getComponent();

        component.input.on({
            scope   : this,
            keydown : 'onKeyDown'
        });
    },

    onKeyDown : function(e) {
        var code = e.browserEvent.keyCode;

        if (!(code >= 48 && code <= 57) && !(code >= 97 && code <= 105) && code !== 46 && code !== 8) {
            e.stopEvent();
        }
    }
});