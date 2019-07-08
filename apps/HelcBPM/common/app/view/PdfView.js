Ext.define('HelcBPM.view.PdfView', {
    extend: 'Ext.Panel',

    config: {
        id: 'PdfPanel',
        layout: 'fit',
        listeners: [
            {
                fn: 'onPdfPanelShow',
                event: 'show'
            }
        ]
    },

    onPdfPanelShow: function(component, eOpts) {
        var pdfPanel = Ext.create('Ext.ux.panel.PDF', {
            layout: 'fit',
            src: 'http://10.98.202.145:8081'+component.config.parm,
            hidePagingtoolbar: false,
        	toolbarButtonItemId: 'btn_PdfView_back',
            style: 'background-color: black'
        });
        component.setItems([pdfPanel]);
    }

});