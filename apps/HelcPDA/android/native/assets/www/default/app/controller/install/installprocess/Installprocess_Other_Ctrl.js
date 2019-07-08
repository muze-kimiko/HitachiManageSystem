
/* JavaScript content from app/controller/install/installprocess/Installprocess_Other_Ctrl.js in folder common */
Ext.define('HelcPDA.controller.install.installprocess.Installprocess_Other_Ctrl',{
	extend:'HelcPDA.controller.ApplicationController',
	config:{
		refs:{
		},
		control:{
			// 单台
			"togglefield#ZT_TMAZ":{
				change:'ZT_TMAZ_CHANGE'
			},
			
			"togglefield#ZT_JXDZ":{
				change:'ZT_JXDZ_CHANGE'
			},
			
			"togglefield#ZT_DGAZ":{
				change:'ZT_DGAZ_CHANGE'
			},
			
			// 批量
			"togglefield#ZT_TMAZ_P":{
				change:'ZT_TMAZ_CHANGE_P'
			},
			
			"togglefield#ZT_JXDZ_P":{
				change:'ZT_JXDZ_CHANGE_P'
			},
			
			"togglefield#ZT_DGAZ_P":{
				change:'ZT_DGAZ_CHANGE_P'
			}
		}
	},
	
	// 单台
	ZT_TMAZ_CHANGE: function(field, newValue, oldValue) {
		var dpf_tmaz = Ext.getCmp('dpf_tmaz');
		if (!isCome) {
			if (newValue == 1) {
				dpf_tmaz.setValue(new Date());
				dpf_tmaz.setDisabled(false);
			} else {
				dpf_tmaz.setValue(null);
				dpf_tmaz.setDisabled(true);
			}
		}
    },
	
    ZT_JXDZ_CHANGE: function(field, newValue, oldValue) {
    	var dpf_jxdzaz = Ext.getCmp('dpf_jxdzaz');
    	if (!isCome) {
    		if (newValue == 1) {
    			dpf_jxdzaz.setValue(new Date());
    			dpf_jxdzaz.setDisabled(false);
    		} else {
    			dpf_jxdzaz.setValue(null);
    			dpf_jxdzaz.setDisabled(true);
    		}
    	}
	},
    
    ZT_DGAZ_CHANGE: function(field, newValue, oldValue) {
    	var dpf_dgaz = Ext.getCmp('dpf_dgaz');
    	if(!isCome) {
    		if (newValue == 1) {
    			dpf_dgaz.setValue(new Date());
    			dpf_dgaz.setDisabled(false);
    		} else {
    			dpf_dgaz.setValue(null);
    			dpf_dgaz.setDisabled(true);
    		}
    	}
    },
    
    // 批量
    ZT_TMAZ_CHANGE_P: function(field, newValue, oldValue) {
    	var dpf_tmaz = Ext.getCmp('dpf_tmaz_p');
    	if (newValue == 1) {
    		dpf_tmaz.setValue(new Date());
    		dpf_tmaz.setDisabled(false);
    	} else {
    		dpf_tmaz.setValue(null);
    		dpf_tmaz.setDisabled(true);
    	}
    },
    
    ZT_JXDZ_CHANGE_P: function(field, newValue, oldValue) {
    	var dpf_jxdzaz = Ext.getCmp('dpf_jxdzaz_p');
    	if (newValue == 1) {
    		dpf_jxdzaz.setValue(new Date());
    		dpf_jxdzaz.setDisabled(false);
    	} else {
    		dpf_jxdzaz.setValue(null);
    		dpf_jxdzaz.setDisabled(true);
    	}
    },
    
    ZT_DGAZ_CHANGE_P: function(field, newValue, oldValue) {
    	var dpf_dgaz = Ext.getCmp('dpf_dgaz_p');
    	if (newValue == 1) {
    		dpf_dgaz.setValue(new Date());
    		dpf_dgaz.setDisabled(false);
    	} else {
    		dpf_dgaz.setValue(null);
    		dpf_dgaz.setDisabled(true);
    	}
    },
    
	
});
