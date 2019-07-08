
/* JavaScript content from app/controller/PartsController.js in folder common */
/*
 * File: app/controller/PartsController.js
 *
 * This file was generated by Sencha Architect
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.4.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.4.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('HelcRemote.controller.PartsController', {
    extend: 'Ext.app.Controller',

    config: {
        control: {
            "button#Parts_Warehouse_BtnReturn": {
                tap: 'onParts_Warehouse_BtnReturnTap'
            },
            "button#Parts_chinaMap_BtnHd": {
                tap: 'onParts_chinaMap_BtnHdTap'
            },
            "button#Parts_chinaMap_BtnHn": {
                tap: 'onParts_chinaMap_BtnHnTap'
            },
            "button#Parts_chinaMap_BtnHx": {
                tap: 'onParts_chinaMap_BtnHxTap'
            },
            "button#Parts_chinaMap_BtnHb": {
                tap: 'onParts_chinaMap_BtnHbTap'
            },
            "button#Parts_chinaMap_BtnReturn": {
                tap: 'onParts_chinaMap_BtnReturnTap'
            },
            "dataview#Parts_Warehouse_List": {
                itemtap: 'onParts_Warehouse_ListItemtap'
            }
        }
    },

    /* 仓库 返回 配件 */
    onParts_Warehouse_BtnReturnTap: function(button, e, eOpts) {
        viewPath.pop();
        viewUtil.goLast();
    },

    /* 配件 -> 华东 单击 */
    onParts_chinaMap_BtnHdTap: function(button, e, eOpts) {
        this.do_openWarehousePage('huadong','华东');
    },

    /* 配件 -> 华南 单击 */
    onParts_chinaMap_BtnHnTap: function(button, e, eOpts) {
        this.do_openWarehousePage('huanan','华南');
    },

    /* 配件 -> 华西 单击 */
    onParts_chinaMap_BtnHxTap: function(button, e, eOpts) {
        this.do_openWarehousePage('huaxi','华西');
    },

    /* 配件 -> 华北 单击 */
    onParts_chinaMap_BtnHbTap: function(button, e, eOpts) {
        this.do_openWarehousePage('huabei','华北');
    },

    /* 配件->售后 */
    onParts_chinaMap_BtnReturnTap: function(button, e, eOpts) {
        viewPath.pop();
        viewUtil.goLast();
    },

    /* 选中/不选中省级仓库 - 显示配送城市/回到区域页 */
    onParts_Warehouse_ListItemtap: function(dataview, index, target, record, e, eOpts) {
        var area = this.area;
        var city = record.get('subRepoCode');

        var task = Ext.create('Ext.util.DelayedTask', function() {
            if(dataview.getSelectionCount()>0) {
                Ext.getCmp('Parts_City_List').getStore().loadDat(
                    function() {},
                    function() {},
                    {
                        area: area,
                        city: city
                    }
                );
                remote.send('Parts_City', undefined, area + '|' + city);
            } else {
                remote.send('Parts_Warehouse', undefined, area);
            }
            task.cancel();
        });
        task.delay(500);
    },

    /* 进入区域仓库页 */
    do_openWarehousePage: function(area, areaName) {
        this.area = area;

        viewUtil.goNext('Parts.Warehouse', {
            onInitial: function() {
                viewPath.push(areaName);
            },
            onShow: function() {
                Ext.getCmp('Parts_Warehouse_title').setHtml(viewPath.print());
                Ext.getCmp('Parts_City_List').getStore().setData([]);
                Ext.getCmp('Parts_Warehouse_List').getStore().loadDat(
                    function() {},
                    function() {},
                    {
                        area: area,
                        city: ''
                    }
                );
                remote.send('Parts_Warehouse', undefined, area);
            }
        });
    }

});