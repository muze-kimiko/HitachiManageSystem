Ext.define('HelcPDA.model.map.MapAroundPeopleModel',{
	extend:'Ext.data.Model',
	config:{
		
		fields : ['MLON','USERID','MLAT','USERNAME'
		,'PHONENO','CONTENT','DISTANCE','TITLE','TIME'
		//下属使用
		,'PERSON_NAME','PERSON_ID','NUM'    
		
		]
	}
});