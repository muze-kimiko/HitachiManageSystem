/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var LoginStr = 'UserName=PDA&Password=PDA';//测试
//var LoginStr = 'UserName=PDA&Password=PDAPDA';//正式
/**
 *  WL.Server.invokeHttp(parameters) accepts the following json object as an argument:
 *  
 *  {
 *  	// Mandatory 
 *  	method : 'get' , 'post', 'delete' , 'put' or 'head' 
 *  	path: value,
 *
 *  	// Optional
 *  	returnedContentType: any known mime-type or one of "json", "css", "csv", "plain", "xml", "html"
 *  	returnedContentEncoding : 'encoding',
 *  	parameters: {name1: value1, ... },
 *  	headers: {name1: value1, ... },
 *  	cookies: {name1: value1, ... },
 *  	body: {
 *  		contentType: 'text/xml; charset=utf-8' or similar value,
 *  		content: stringValue
 *  	},
 *  	transformation: {
 *  		type: 'default', or 'xslFile',
 *  		xslFile: fileName
 *  	}
 *  }
 */

function getServerDT(){
	return {'ServerDT':new Date()};
}

//保养计划列表查询
function PlanListQuery(parameters){
//	WL.Logger.info(parameters);
	var content = JSON.parse(parameters.contentStr);
//	content.person_id = '1-JZUROE';
//	parameters.startD = '1/1/1975';
//	parameters.endD = '1/1/1975';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:plan="http://siebel.com/PDAMainPlan/PlanList">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<plan:PlanListQuery_Input>'+
	         '<plan:SearchSpec>';
			 if(parameters.isToDoCount){//待办，状态为“已计划”或“已驳回”
				 request += '([HEL Maintain Plan.Plan Status] = \'已计划\' or [HEL Maintain Plan.Plan Status] = \'已驳回\') and ';
			 }else{//非待办，状态不为“未计划”和“已取消”
				 request += '([HEL Maintain Plan.Plan Status] &lt;> \'未计划\' and [HEL Maintain Plan.Plan Status] &lt;> \'已取消\') and ';
			 }
	         request += ''+
	         '([HEL Maintain Plan.Plan Start Date] >= \''+parameters.startD+'\' and [HEL Maintain Plan.Plan Start Date] &lt; \''+parameters.endD+'\') and '+  
//	         '([HEL Maintain Plan.Plan Start Date] >= \'12/1/2016\' and [HEL Maintain Plan.Plan Start Date] &lt;= \'12/2/2016\') and '+ 
	         '([HEL Maintain Plan.Employee Id 1]=\''+content.person_id+'\' or '+
	         '[HEL Maintain Plan.Employee Id 2]=\''+content.person_id+'\' or '+
	         '[HEL Maintain Plan.Employee Id 3]=\''+content.person_id+'\')'+
	        '</plan:SearchSpec>'+
	      '</plan:PlanListQuery_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/PlanList:PlanListQuery"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
//	WL.Logger.info(result);
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//保养作业人员查询
function MPlanPersonQuery(parameters){
//	WL.Logger.info(parameters);
//	parameters.Company_Id = '';
//	parameters.Station_Id = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mpl="http://siebel.com/PDAMainPlan/MPlanPersonPickList">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<mpl:MPlanPersonQuery_Input>'+
	      		 '<mpl:SearchSpec>'+
		         '[Person.User Type]=\'保养人员\' and '+
		         '([Person.Quit Date] is null or [Person.Quit Date] > TimeStamp())';
				request += parameters.Company_Id!=''?' and [Person.Company Id]=\''+parameters.Company_Id+'\'':'';
				request += parameters.Station_Id!=''?' and [Person.Station Id]=\''+parameters.Station_Id+'\'':'';
				request += '</mpl:SearchSpec>'+
	      '</mpl:MPlanPersonQuery_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/MPlanPersonPickList:MPlanPersonQuery"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//保养作业组/测量表列表
function ActionTaskQuery(parameters){
//	WL.Logger.info(parameters);
//	parameters.Activity_Id = '1-S1Q053';//有抱闸测量表
//	parameters.Activity_Id = '1-S9XD99';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:act="http://siebel.com/PDAMainPlan/ActionTask">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<act:ActionTaskQuery_Input>'+
	         '<act:SearchSpec>[HEL Maintaining Plan Action Task.Activity Id]=\''+parameters.Activity_Id+'\'</act:SearchSpec>'+
	      '</act:ActionTaskQuery_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/ActionTask:ActionTaskQuery"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//保养作业组/测量表列表
function ItemListQuery(parameters){
//	WL.Logger.info(parameters);
//	parameters.MeasureItem_Id = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:meas="http://siebel.com/PDAMainPlan/MeasureItem">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<meas:ItemListQuery_Input>'+
	         '<meas:SearchSpec>[HEL Measure Item List.MeasureItem Id]=\''+parameters.MeasureItem_Id+'\'</meas:SearchSpec>'+
	      '</meas:ItemListQuery_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/MeasureItem:ItemListQuery"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//保养计划作业指示书	查询
function MPlanTemplateQuery(parameters){
//	WL.Logger.info(parameters);
//	parameters.Mp_Template_Id = '1-RHYL5C';
//	parameters.Activity_Times = '1';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mpl="http://siebel.com/PDAMainPlan/MPlanTemplate">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<mpl:MPlanTemplateQuery_Input>'+
	         '<mpl:SearchSpec>'+
	         	'[HEL Maintaining Plan Template Activity.Mp Template Id]=\''+parameters.Mp_Template_Id+'\' and '+ 
	         	'[HEL Maintaining Plan Template Activity.Activity Times]=\''+parameters.Activity_Times+'\''+
	         '</mpl:SearchSpec>'+
	      '</mpl:MPlanTemplateQuery_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/MPlanTemplate:MPlanTemplateQuery"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//录值项目	查询
function RecordQuery(parameters){
//	WL.Logger.info(parameters);
//	parameters.Parent_Item_Id = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:meas="http://siebel.com/PDAMainPlan/MeasureItemRecord">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<meas:RecordQuery_Input>'+
	         '<meas:SearchSpec>[HEL Measure Record List.Parent Item Id]=\''+parameters.Parent_Item_Id+'\'</meas:SearchSpec>'+
	      '</meas:RecordQuery_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/MeasureItemRecord:RecordQuery"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//附件	查询
function AttachmentQuery(parameters){
//	WL.Logger.info(parameters);
//	parameters.MeasureItemParId = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:meas="http://siebel.com/PDAMainPlan/MeasureItemAttachment" xmlns:hel="http://www.siebel.com/xml/HEL%20PDA%20Maintaining%20Plan%20Measure%20Item%20Attachment%20IO">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<meas:AttachmentQuery_Input>'+
	         '<hel:ListOfHelPdaMaintainingPlanMeasureItemAttachmentIo>'+
	            '<hel:HelMeasureItemAttachment Operation="?">'+
	               '<hel:MeasureItemParId>'+parameters.MeasureItemParId+'</hel:MeasureItemParId>'+
	            '</hel:HelMeasureItemAttachment>'+
	         '</hel:ListOfHelPdaMaintainingPlanMeasureItemAttachmentIo>'+
	      '</meas:AttachmentQuery_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/MeasureItemAttachment:AttachmentQuery"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//遗留问题	查询
function LegacyQuery(parameters){
//	WL.Logger.info(parameters);
//	parameters.Measure_Legacy_ParId = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:meas="http://siebel.com/PDAMainPlan/MeasureLegacy">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<meas:LegacyQuery_Input>'+
	         '<meas:SearchSpec>[HEL Measure Legacy.Measure Legacy ParId]=\''+parameters.Measure_Legacy_ParId+'\'</meas:SearchSpec>'+
	      '</meas:LegacyQuery_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/MeasureLegacy:LegacyQuery"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//保养测量表作业项目-作业前/判断选项	查询
function PreWorkQuery(parameters){
//	WL.Logger.info(parameters);
//	parameters.Parent_Content_Id = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sel="http://siebel.com/PDAMainPlan/SelectPreWork">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<sel:PreWorkQuery_Input>'+
	         '<sel:SearchSpec>[HEL Maintain Plan Select Project.Parent Content Id]=\''+parameters.Parent_Content_Id+'\'</sel:SearchSpec>'+
	      '</sel:PreWorkQuery_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/SelectPreWork:PreWorkQuery"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//保养测量表作业项目-作业后选项	查询
function PostWorkQuery(parameters){
//	WL.Logger.info(parameters);
//	parameters.Parent_Content_Id = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:sel="http://siebel.com/PDAMainPlan/SelectPostWork">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<sel:PostWorkQuery_Input>'+
	         '<sel:SearchSpec>[HEL Maintain Plan Select Project.Parent Content Id]=\''+parameters.Parent_Content_Id+'\'</sel:SearchSpec>'+
	      '</sel:PostWorkQuery_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/SelectPostWork:PostWorkQuery"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//保养作业内容项目号查询	查询
function ProjectNoQuery(parameters){
//	WL.Logger.info(parameters);
//	parameters.Content_Project_Task_No = '';
//	parameters.Content_Name = '';
//	parameters.Content_Value = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:proj="http://siebel.com/PDAMainPlan/ProjectNoPickList">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<proj:ProjectNoQuery_Input>'+
	         '<proj:SearchSpec>'+
				'[HEL Maintain Plan Contents.Content Project Task No] like \'*'+parameters.Content_Value+'*\''+
				' or '+
				'[HEL Maintain Plan Contents.Content Name] like \'*'+parameters.Content_Value+'*\''+
	         '</proj:SearchSpec>'+
	      '</proj:ProjectNoQuery_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/ProjectNoPickList:ProjectNoQuery"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//录值项目	录入
function RecordSynchronize(parameters){
//	WL.Logger.info(parameters);
//	parameters.Id = '';
//	parameters.MeasureRecordValue = '';
//	parameters.ParentItemId = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:meas="http://siebel.com/PDAMainPlan/MeasureItemRecord" xmlns:hel="http://www.siebel.com/xml/HEL%20PDA%20Maintaining%20Plan%20Action%20Task%20Item%20Record%20IO">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<meas:RecordSynchronize_Input>'+
	         '<hel:ListOfHelPdaMaintainingPlanMeasureItemRecordListIo>'+
	            '<hel:HelMeasureRecordList Operation="?">'+
	               '<hel:Id>'+parameters.Id+'</hel:Id>'+
//	               '<hel:Searchspec>?</hel:Searchspec>'+
//	               '<hel:MeasureRecordContent>?</hel:MeasureRecordContent>'+
//	               '<hel:MeasureRecordDescription>?</hel:MeasureRecordDescription>'+
//	               '<hel:MeasureRecordId>?</hel:MeasureRecordId>'+
//	               '<hel:MeasureRecordItemContent>?</hel:MeasureRecordItemContent>'+
	               '<hel:MeasureRecordValue>'+parameters.MeasureRecordValue+'</hel:MeasureRecordValue>'+
	               '<hel:ParentItemId>'+parameters.ParentItemId+'</hel:ParentItemId>'+
//	               '<hel:RecordItemId>?</hel:RecordItemId>'+
	            '</hel:HelMeasureRecordList>'+
	         '</hel:ListOfHelPdaMaintainingPlanMeasureItemRecordListIo>'+
	      '</meas:RecordSynchronize_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/MeasureItemRecord:RecordSynchronize"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//保养作业项目	录入
function ItemListSynchronize(parameters){
//	WL.Logger.info(parameters);
//	parameters.Id = '';
//	parameters.MeasureItemPostWorkId = '';
//	parameters.MeasureItemPreWorkId = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:meas="http://siebel.com/PDAMainPlan/MeasureItem" xmlns:hel="http://www.siebel.com/xml/HEL%20PDA%20Maintaining%20Plan%20Action%20Task%20Item%20List%20IO">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<meas:ItemListSynchronize_Input>'+
	         '<hel:ListOfHelPdaMaintainingPlanMeasureItemListIo>'+
	            '<hel:HelMeasureItemList Operation="?">'+
	               '<hel:Id>'+parameters.Id+'</hel:Id>'+
//	               '<hel:Searchspec>?</hel:Searchspec>'+
//	               '<hel:MeasureItemContent>?</hel:MeasureItemContent>'+
//	               '<hel:MeasureItemCover>?</hel:MeasureItemCover>'+
//	               '<hel:MeasureItemGroupName>?</hel:MeasureItemGroupName>'+
//	               '<hel:MeasureItemIFPhoto>?</hel:MeasureItemIFPhoto>'+
//	               '<hel:MeasureItemIFRequired>?</hel:MeasureItemIFRequired>'+
//	               '<hel:MeasureItemId>?</hel:MeasureItemId>'+
//	               '<hel:MeasureItemIfMeasure>?</hel:MeasureItemIfMeasure>'+
//	               '<hel:MeasureItemLocaleFlag>?</hel:MeasureItemLocaleFlag>'+
//	               '<hel:MeasureItemLocation>?</hel:MeasureItemLocation>'+
//	               '<hel:MeasureItemMaxValue>?</hel:MeasureItemMaxValue>'+
//	               '<hel:MeasureItemMinValue>?</hel:MeasureItemMinValue>'+
//	               '<hel:MeasureItemName>?</hel:MeasureItemName>'+
//	               '<hel:MeasureItemNo>?</hel:MeasureItemNo>'+
//	               '<hel:MeasureItemPostWork>?</hel:MeasureItemPostWork>'+
	               '<hel:MeasureItemPostWorkId>'+parameters.MeasureItemPostWorkId+'</hel:MeasureItemPostWorkId>'+
//	               '<hel:MeasureItemPreWork>?</hel:MeasureItemPreWork>'+
	               '<hel:MeasureItemPreWorkId>'+parameters.MeasureItemPreWorkId+'</hel:MeasureItemPreWorkId>'+
//	               '<hel:MeasureItemStandard>?</hel:MeasureItemStandard>'+
//	               '<hel:MeasureItemType>?</hel:MeasureItemType>'+
//	               '<hel:MeasureItemYearFlag>?</hel:MeasureItemYearFlag>'+
//	               '<hel:MeasureProjectId>?</hel:MeasureProjectId>'+
//	               '<hel:MeasureRecordIFExistsFlag>?</hel:MeasureRecordIFExistsFlag>'+
	            '</hel:HelMeasureItemList>'+
	         '</hel:ListOfHelPdaMaintainingPlanMeasureItemListIo>'+
	      '</meas:ItemListSynchronize_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/MeasureItem:ItemListSynchronize"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//保养计划列表	录入
function PlanListSynchronize(parameters){
//	WL.Logger.info(parameters);
//	parameters.Id = '1-S9XD99';
//	parameters.ActualEmployeeId1 = '';
//	parameters.ActualEmployeeId2 = '';
//	parameters.ActualEmployeeId3 = '';
//	parameters.ActualEmployeeId2 = '';
//	parameters.ActualEmployeeId2 = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:plan="http://siebel.com/PDAMainPlan/PlanList" xmlns:hel="http://www.siebel.com/xml/HEL%20PDA%20Maintaining%20Plan%20Action%20List%20IO">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<plan:PlanListSynchronize_Input>'+
	         '<hel:ListOfHelPdaMaintainingPlanListIo>'+
	            '<hel:HelMaintainPlan Operation="?">'+
	               '<hel:Id>'+parameters.Id+'</hel:Id>';
//	               '<hel:Searchspec>?</hel:Searchspec>'+
//	               '<hel:AcountRequest>?</hel:AcountRequest>'+
//	               '<hel:ActionOrganization>?</hel:ActionOrganization>'+
//	               '<hel:ActivityId>?</hel:ActivityId>'+
//	               '<hel:ActualEmployee1>?</hel:ActualEmployee1>'+
//	               '<hel:ActualEmployee2>?</hel:ActualEmployee2>'+
//	               '<hel:ActualEmployee3>?</hel:ActualEmployee3>'+
	               if(parameters.ActualEmployeeId1 != ''){
	            	   request += '<hel:ActualEmployeeId1>'+parameters.ActualEmployeeId1+'</hel:ActualEmployeeId1>';
	               }
	               if(parameters.ActualEmployeeId2 != ''){
	            	   request += '<hel:ActualEmployeeId2>'+parameters.ActualEmployeeId2+'</hel:ActualEmployeeId2>';
	               }
	               if(parameters.ActualEmployeeId3 != ''){
	            	   request += '<hel:ActualEmployeeId3>'+parameters.ActualEmployeeId3+'</hel:ActualEmployeeId3>';
	               }
//	               '<hel:ActualTime>?</hel:ActualTime>'+
//	               '<hel:AgreementNumber>?</hel:AgreementNumber>'+
//	               '<hel:AreaId>?</hel:AreaId>'+
//	               '<hel:AreaName>?</hel:AreaName>'+
//	               '<hel:AssetNumber>?</hel:AssetNumber>'+
//	               '<hel:DomainName>?</hel:DomainName>'+
//	               '<hel:EdificeName>?</hel:EdificeName>'+
//	               '<hel:Employee1>?</hel:Employee1>'+
//	               '<hel:Employee2>?</hel:Employee2>'+
//	               '<hel:Employee3>?</hel:Employee3>'+
//	               '<hel:EmployeeId1>?</hel:EmployeeId1>'+
//	               '<hel:EmployeeId2>?</hel:EmployeeId2>'+
//	               '<hel:EmployeeId3>?</hel:EmployeeId3>'+
//	               '<hel:GroupId>?</hel:GroupId>'+
//	               '<hel:GroupName1>?</hel:GroupName1>'+
//	               '<hel:HELPlanContent>?</hel:HELPlanContent>'+
//	               '<hel:HELPlanTimes>?</hel:HELPlanTimes>'+
//	               '<hel:HoldDivisionId>?</hel:HoldDivisionId>'+
//	               '<hel:HoldDivisionName>?</hel:HoldDivisionName>'+
//	               '<hel:HoldStationId>?</hel:HoldStationId>'+
//	               '<hel:HoldStationName>?</hel:HoldStationName>'+
//	               '<hel:Latitude>?</hel:Latitude>'+
//	               '<hel:Longitude>?</hel:Longitude>'+
	               if(parameters.MaintainEndDate != ''){
	            	   request += '<hel:MaintainEndDate>'+parameters.MaintainEndDate+'</hel:MaintainEndDate>';
	               }
	               if(parameters.MaintainStartDate != ''){
	            	   request += '<hel:MaintainStartDate>'+parameters.MaintainStartDate+'</hel:MaintainStartDate>';
	               }
	               request += ''+
//	               '<hel:OtherComments>?</hel:OtherComments>'+
//	               '<hel:PDAUpdateDate>?</hel:PDAUpdateDate>'+
//	               '<hel:PlanEndDate>?</hel:PlanEndDate>'+
//	               '<hel:PlanMonth>?</hel:PlanMonth>'+
//	               '<hel:PlanStartDate>?</hel:PlanStartDate>'+
//	               '<hel:PlanStatus>?</hel:PlanStatus>'+
//	               '<hel:PlanTimes>?</hel:PlanTimes>'+
//	               '<hel:PlanTools>?</hel:PlanTools>'+
//	               '<hel:PlanWeek>?</hel:PlanWeek>'+
//	               '<hel:PlanYear>?</hel:PlanYear>'+
//	               '<hel:PreparedTime>?</hel:PreparedTime>'+
//	               '<hel:RefActivityTimes>?</hel:RefActivityTimes>'+
//	               '<hel:RefTemplateId>?</hel:RefTemplateId>'+
//	               '<hel:Remark>?</hel:Remark>'+
//	               '<hel:StaffLevel1>?</hel:StaffLevel1>'+
//	               '<hel:StaffLevel2>?</hel:StaffLevel2>'+
//	               '<hel:StaffLevel3>?</hel:StaffLevel3>'+
//	               '<hel:StandardTimeCalc>?</hel:StandardTimeCalc>'+
//	               '<hel:TrafficTime>?</hel:TrafficTime>'+
//	               '<hel:Type>?</hel:Type>'+
	            '</hel:HelMaintainPlan>'+
	         '</hel:ListOfHelPdaMaintainingPlanListIo>'+
	      '</plan:PlanListSynchronize_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/PlanList:PlanListSynchronize"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//遗留问题 录入&新建
function LegacyUpsert(parameters){
//	WL.Logger.info(parameters);
//	parameters.Id = '1-S9XD99';
//	parameters.MeasureLegacyParId = '';
//	parameters.MeasureLegacyProjectItemId = '';
//	parameters.MeasureLegacySpotSituation = '';
//	parameters.MeasureLegacyOverproofReason = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:meas="http://siebel.com/PDAMainPlan/MeasureLegacy" xmlns:hel="http://www.siebel.com/xml/HEL%20PDA%20Maintaining%20Plan%20Action%20Task%20Legacy%20List%20IO%20Par">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<meas:LegacyUpsert_Input>'+
	         '<hel:ListOfHelPdaMaintainingPlanMeasureLegacyListIOWithParent>'+
	            '<hel:HelMaintainingPlanActionTask Operation="?">'+
	               '<hel:Id>'+parameters.Id+'</hel:Id>'+
//	               '<hel:Searchspec>?</hel:Searchspec>'+
	               '<hel:ListOfHelMeasureLegacy>'+
	                  '<hel:HelMeasureLegacy Operation="?">'+
//	                     '<hel:Id>?</hel:Id>'+
//	                     '<hel:ModId>?</hel:ModId>'+
//	                     '<hel:Searchspec>?</hel:Searchspec>'+
	                     '<hel:MeasureLegacyOverproofReason>'+parameters.MeasureLegacyOverproofReason+'</hel:MeasureLegacyOverproofReason>'+
	                     '<hel:MeasureLegacyParId>'+parameters.MeasureLegacyParId+'</hel:MeasureLegacyParId>'+
	                     '<hel:MeasureLegacyProjectItemId>'+parameters.MeasureLegacyProjectItemId+'</hel:MeasureLegacyProjectItemId>'+
//	                     '<hel:MeasureLegacyProjectNo>?</hel:MeasureLegacyProjectNo>'+
//	                     '<hel:MeasureLegacySeq>?</hel:MeasureLegacySeq>'+
	                     '<hel:MeasureLegacySpotSituation>'+parameters.MeasureLegacySpotSituation+'</hel:MeasureLegacySpotSituation>'+
	                  '</hel:HelMeasureLegacy>'+
	               '</hel:ListOfHelMeasureLegacy>'+
	            '</hel:HelMaintainingPlanActionTask>'+
	         '</hel:ListOfHelPdaMaintainingPlanMeasureLegacyListIOWithParent>'+
	      '</meas:LegacyUpsert_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/MeasureLegacy:LegacyUpsert"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//附件  录入
function AttachmentSynchronize(parameters){
//	WL.Logger.info(parameters);
//	parameters.MeasureItemParId = '1-S9XD99';
//	parameters.MeasureItemAttachComments = '';
//	parameters.MeasureItemAttachFileExt = '';
//	parameters.MeasureItemAttachFileName = '';
//	parameters.MeasureItemAttachFileBuffer = '';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:meas="http://siebel.com/PDAMainPlan/MeasureItemAttachment" xmlns:hel="http://www.siebel.com/xml/HEL%20PDA%20Maintaining%20Plan%20Measure%20Item%20Attachment%20IO">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<meas:AttachmentSynchronize_Input>'+
	         '<hel:ListOfHelPdaMaintainingPlanMeasureItemAttachmentIo>'+
	            '<hel:HelMeasureItemAttachment Operation="?">'+
//	               '<hel:Id>?</hel:Id>'+
//	               '<hel:Searchspec>?</hel:Searchspec>'+
	               '<hel:MeasureItemParId>'+parameters.MeasureItemParId+'</hel:MeasureItemParId>'+
	               '<hel:MeasureItemAttachComments>'+parameters.MeasureItemAttachComments+'</hel:MeasureItemAttachComments>'+
//	               '<hel:MeasureItemAttachDockStatus>?</hel:MeasureItemAttachDockStatus>'+
//	               '<hel:MeasureItemAttachFileDate>?</hel:MeasureItemAttachFileDate>'+
	               '<hel:MeasureItemAttachFileExt>'+parameters.MeasureItemAttachFileExt+'</hel:MeasureItemAttachFileExt>'+
	               '<hel:MeasureItemAttachFileName>'+parameters.MeasureItemAttachFileName+'</hel:MeasureItemAttachFileName>'+
//	               '<hel:MeasureItemAttachFileRev>?</hel:MeasureItemAttachFileRev>'+
//	               '<hel:MeasureItemAttachFileSize>?</hel:MeasureItemAttachFileSize>'+
//	               '<hel:MeasureItemAttachFileSrcPath>?</hel:MeasureItemAttachFileSrcPath>'+
//	               '<hel:MeasureItemAttachFileSrcType>?</hel:MeasureItemAttachFileSrcType>'+
	               '<hel:MeasureItemAttachFileBuffer>'+parameters.MeasureItemAttachFileBuffer+'</hel:MeasureItemAttachFileBuffer>'+
	            '</hel:HelMeasureItemAttachment>'+
	         '</hel:ListOfHelPdaMaintainingPlanMeasureItemAttachmentIo>'+
	      '</meas:AttachmentSynchronize_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/MeasureItemAttachment:AttachmentSynchronize"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//保养计划  回收
function PlanListRegain(parameters){
//	WL.Logger.info(parameters);
//	parameters.MPlanId = '1-S9XD99';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:plan="http://siebel.com/PDAMainPlan/PlanList">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<plan:PlanListRegain_Input>'+
	         '<plan:MPlanId>'+parameters.MPlanId+'</plan:MPlanId>'+
	      '</plan:PlanListRegain_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/PlanList:PlanListRegain"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//保养计划  提交
function PlanListSubmit(parameters){
//	WL.Logger.info(parameters);
//	parameters.MPlanId = '1-S9XD99';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:plan="http://siebel.com/PDAMainPlan/PlanList">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<plan:PlanListSubmit_Input>'+
	         '<plan:MPlanId>'+parameters.MPlanId+'</plan:MPlanId>'+
	      '</plan:PlanListSubmit_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/PlanList:PlanListSubmit"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
//	WL.Logger.info(result);
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//附件  删除
function AttachmentDelete(parameters){
//	WL.Logger.info(parameters);
//	parameters.PrimaryRowId = '1-S9XD99';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:meas="http://siebel.com/PDAMainPlan/MeasureItemAttachment">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<meas:AttachmentDelete_Input>'+
	         '<meas:PrimaryRowId>' + parameters.PrimaryRowId + '</meas:PrimaryRowId>'+
	      '</meas:AttachmentDelete_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/MeasureItemAttachment:AttachmentDelete"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//遗留问题  删除
function LegacyDelete(parameters){
//	WL.Logger.info(parameters);
//	parameters.PrimaryRowId = '1-S9XD99';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:meas="http://siebel.com/PDAMainPlan/MeasureLegacy">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<meas:LegacyDelete_Input>'+
	         '<meas:PrimaryRowId>' + parameters.PrimaryRowId + '</meas:PrimaryRowId>'+
	      '</meas:LegacyDelete_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/MeasureLegacy:LegacyDelete"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//抱闸解体测量表  查询
function BrakeQuery(parameters){
//	WL.Logger.info(parameters);
//	parameters.MeasureProject_Id = '1-S9XD99';
//	parameters.MeasureItem_ReCheckPerson_Id = '1-S9XD99';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bzm="http://siebel.com/PDAMainPlan/BZMeasure">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<bzm:BrakeQuery_Input>'+
	         '<bzm:SearchSpec>'+
	         	'[HEL Maintaining Plan Action Task BZ.MeasureProject Id]=\''+parameters.MeasureProject_Id+'\' AND '+
	         	'[HEL Maintaining Plan Action Task BZ.MeasureItem ReCheckPerson Id]=\''+parameters.MeasureItem_ReCheckPerson_Id+'\''+
	         '</bzm:SearchSpec>'+
	      '</bzm:BrakeQuery_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/BZMeasure:BrakeQuery"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//抱闸解体测量表  确定
function BrakekPick(parameters){
//	WL.Logger.info(parameters);
//	parameters.NewBrakeId = '1-S9XD99';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:bzm="http://siebel.com/PDAMainPlan/BZMeasure">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<bzm:BrakekPick_Input>'+
	         '<bzm:NewBrakeId>'+parameters.NewBrakeId+'</bzm:NewBrakeId>'+
	      '</bzm:BrakekPick_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/BZMeasure:BrakekPick"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//巡视专项 - 专项子项查询
function MeasureProjectQuery(parameters){
//	WL.Logger.info(parameters);
//	parameters.Parent_Measure_Id = '1-S4MSFL';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:meas="http://siebel.com/PDAMainPlan/MeasureProject">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<meas:MeasureProjectQuery_Input>'+
	         '<meas:SearchSpec>[HEL Measure Project.Parent Measure Id] = \'' + parameters.Parent_Measure_Id + '\'</meas:SearchSpec>'+
	      '</meas:MeasureProjectQuery_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/MeasureProject:MeasureProjectQuery"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//保养作业项目 提交
function ItemListSubmit(parameters){
//	WL.Logger.info(parameters);
//	parameters.sMeasureId = '1-S98OVF';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:meas="http://siebel.com/PDAMainPlan/MeasureItem">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<meas:ItemListSubmit_Input>'+
	         '<meas:sMeasureId>' + parameters.sMeasureId + '</meas:sMeasureId>'+
	      '</meas:ItemListSubmit_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/MeasureItem:ItemListSubmit"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
//	WL.Logger.info(result);
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}

//项目作业标准附件查看
function ContentAttQuery(parameters){
//	WL.Logger.info(parameters);
//	parameters.MPContent_Id = '1-S64RB3';
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:con="http://siebel.com/PDAMainPlan/ContentAttachment">'+
	   '<soapenv:Header/>'+
	   '<soapenv:Body>'+
	      '<con:ContentAttQuery_Input>'+
	         '<con:SearchSpec>[HEL Maintain Plan Content Attachment.MPContent Id]=\'' + parameters.MPContent_Id + '\'</con:SearchSpec>'+
	      '</con:ContentAttQuery_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
//	WL.Logger.info(request);
	var input = {
			method:'post',
			returnedContentType:'xml',   
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAMainPlan/ContentAttachment:ContentAttQuery"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&' + LoginStr,
			returnedContentEncoding : 'utf-8',    
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
  	};
	
	var result = WL.Server.invokeHttp(input);
	
	if(result.isSuccessful){
		return result.Envelope.Body;
	}else{
		return result;
	}
}