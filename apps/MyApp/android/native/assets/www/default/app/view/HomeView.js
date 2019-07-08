
/* JavaScript content from app/view/HomeView.js in folder common */
Ext.define('MyApp.view.HomeView', {
    extend: 'Ext.Container',
    id: 'HomeView',
    requires: [
        'Ext.Toolbar',
        'Ext.Button'
    ],

    config: {
        id: 'MyAppHome',
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'AppHome'
            },
        ]
    }
});