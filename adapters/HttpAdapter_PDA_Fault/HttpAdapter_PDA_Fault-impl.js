/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var str_conect_name_pwd = "UserName=PDA&Password=PDA"; // 接口验证的用户名密码  测试
//var str_conect_name_pwd = "UserName=PDA&Password=PDAPDA"; // 接口验证的用户名密码 正式

/**
 *  WL.Server.invokeHttp(parameters) accepts the following json object as an argument:
 *  
 *  {
 *  	// Mandatory 
 *  	method : 'get' , 'post', 'delete' , 'put' or 'head' 
 *  	path: value,
 *  	
 *  	// Optional 
 *  	returnedContentType: any known mime-type or one of "json", "css", "csv", "javascript", "plain", "xml", "html"  
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

/**
 * @param interest
 *            must be one of the following: world, africa, sport, technology, ...
 *            (The list can be found in http://edition.cnn.com/services/rss/)
 * @returns json list of items
 */
function getStories(interest) {
	path = getPath(interest);
	
	var input = {
	    method : 'get',
	    returnedContentType : 'xml',
	    path : path
	};
	
	
	return WL.Server.invokeHttp(input);
}
/**
 * 
 * @param interest
 *            must be one of the following: world, africa, sport, technology, ...
 *            (The list can be found in http://edition.cnn.com/services/rss/)
 * @returns json list of items
 */
function getStoriesFiltered(interest) {
	path = getPath(interest);
	
	var input = {
	    method : 'get',
	    returnedContentType : 'xml',
	    path : path,
	    transformation : {
		    type : 'xslFile',
		    xslFile : 'filtered.xsl'
	    }
	};
	
	return WL.Server.invokeHttp(input);
}



function getPath(interest) {
	if (interest == undefined || interest == '') {
		interest = '';
	}else {
		interest = '_' + interest;
	}
	return 'rss/edition' + interest + '.rss';
}

//故障报告书退回
function GZBGSTJTH(Data){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	  '<soap:Body>'+
	    '<FaultReportRollback_Input xmlns="http://siebel.com/CustomUI">'+
	      '<ActivityId>'+Data+'</ActivityId>'+
	    '</FaultReportRollback_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:FaultReportRollback"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			},
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

//没用了
function GZYYZJGZLC(ACTIVITY_ID,FAULT_CAUSE,FAULT_RESOURCE,FAULT_REASON,REASON_ANALYSE,SOLUTION,Fault_Floor_Number){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<FaultReportInsertOrUpdate_Input xmlns="http://siebel.com/CustomUI">'+
	      '<ListOfHelPdaFaultReportIo xmlns="http://www.siebel.com/xml/HELPDAFaultReportIO">'+
	        '<HelPdaActionTmp Operation="">'+
	          /*'<Id />'+
	          '<Created />'+
	          '<CreatedBy />'+
	          '<Updated />'+
	          '<UpdatedBy />'+
	          '<ConflictId />'+
	          '<ModId />'+
	          '<Searchspec />'+
	          '<AccountEstimate />'+
	          '<AccountId />'+
	          '<ActionAssetAddress />'+
	          '<ActionAssetDomain />'+
	          '<ActionAssetEdifice />'+
	          '<ActionAssetFloor />'+
	          '<ActionAssetStationId />'+
	          '<ActionAssetStop />'+
	          '<ActionElevatorMark />'+
	          '<ActivityId />'+*/
	          '<ActivityId>'+ACTIVITY_ID+'</ActivityId>'+
	          /*'<AssetAgreeBusinessType />'+
	          '<AssetAgreeStatusCal />'+
	          '<AssetCompanyId />'+
	          '<AssetId />'+
	          '<AuditingStatus />'+
	          '<AvoidResource />'+
	          '<BoxUpNumber />'+
	          '<BoxUpTime />'+
	          '<CompleteStatus />'+
	          '<FaultAuditComment />'+
	          '<FaultPartDescription />'+
	          '<FaultPoint />'+
	          '<FieldFaultStatus />'+
	          '<FieldLiftFault />'+
	          '<FieldRescueStyle />'+
	          '<FrArrivedTime />'+
	          '<FrCompletedTime />'+
	          '<FrSubmissionPersonId />'+
	          '<FrSubmissionTime />'+
	          '<HappenTime />'+
	          '<ModificationNum />'+
	          '<NoAssetComment />'+
	          '<NotRunComments />'+
	          '<RecoverrunTime />'+
	          '<ReplyTimeComments />'+
	          '<SecondFaultSequence />'+
	          '<SetOutTime />'+
	          '<SrBoxUp />'+
	          '<SureElevator />'+
	          '<XAttrib01 />'+
	          '<XAttrib02 />'+
	          '<XAttrib03 />'+
	          '<XAttrib04 />'+
	          '<XAttrib05 />'+
	          '<XAttrib06 />'+
	          '<XAttrib07 />'+
	          '<XAttrib08 />'+
	          '<XAttrib09 />'+
	          '<XAttrib10 />'+
	          '<UsedStatus />'+*/
	          '<ListOfHelPdaFaultReportTmp>'+
	            '<HelPdaFaultReportTmp Operation="">'+
	              /*'<Id />'+
	              '<Created />'+
	              '<CreatedBy />'+
	              '<Updated />'+
	              '<UpdatedBy />'+
	              '<ConflictId />'+
	              '<ModId />'+
	              '<Searchspec />'+*/
	              '<FaultFloorNumber>'+Fault_Floor_Number+'</FaultFloorNumber>'+
	              '<ActivityId>'+ACTIVITY_ID+'</ActivityId>'+
	              '<FaultCause>'+FAULT_CAUSE+'</FaultCause>'+
	              '<FaultReason>'+FAULT_REASON+'</FaultReason>'+
	              '<FaultResource>'+FAULT_RESOURCE+'</FaultResource>'+
	              '<ReasonAnalyse>'+REASON_ANALYSE+'</ReasonAnalyse>'+
	              '<Solution>'+SOLUTION+'</Solution>'+
	              /*'<XAttrib01 />'+
	              '<XAttrib02 />'+
	              '<XAttrib03 />'+*/
	            '</HelPdaFaultReportTmp>'+
	          '</ListOfHelPdaFaultReportTmp>'+
	          '<ListOfHelPdaOperationEmployeeTmp>'+
	            '<HelPdaOperationEmployeeTmp Operation="">'+
	              /*'<Id />'+
	              '<Created />'+
	              '<CreatedBy />'+
	              '<Updated />'+
	              '<UpdatedBy />'+
	              '<ConflictId />'+
	              '<ModId />'+
	              '<Searchspec />'+
	              '<ActivityId />'+
	              '<Comments />'+
	              '<EmpoloyeeId />'+
	              '<RowId />'+
	              '<XAttrib01 />'+
	              '<XAttrib02 />'+*/
	            '</HelPdaOperationEmployeeTmp>'+
	          '</ListOfHelPdaOperationEmployeeTmp>'+
	          '<ListOfHelPdaTcdTmp>'+
	            '<HelPdaTcdTmp Operation="">'+
	              /*'<Id />'+
	              '<Created />'+
	              '<CreatedBy />'+
	              '<Updated />'+
	              '<UpdatedBy />'+
	              '<ConflictId />'+
	              '<ModId />'+
	              '<Searchspec />'+
	              '<ActivityId />'+
	              '<FaultNumber />'+
	              '<TcdNumber />'+
	              '<TcdType />'+
	              '<XAttrib01 />'+
	              '<XAttrib02 />'+*/
	            '</HelPdaTcdTmp>'+
	          '</ListOfHelPdaTcdTmp>'+
	          '<ListOfHelPdaUsedPartsTmp>'+
	            '<HelPdaUsedPartsTmp Operation="">'+
	              /*'<Id />'+
	              '<Created />'+
	              '<CreatedBy />'+
	              '<Updated />'+
	              '<UpdatedBy />'+
	              '<ConflictId />'+
	              '<ModId />'+
	              '<Searchspec />'+
	              '<ActivityId />'+
	              '<Comments />'+
	              '<PartsId />'+
	              '<PartsUsedQuantity />'+
	              '<ProductBatch />'+
	              '<ProductDate />'+
	              '<Quotation />'+
	              '<QuoteStatue />'+
	              '<QuoteTime />'+
	              '<XAttrib01 />'+
	              '<XAttrib02 />'+
	              '<XAttrib03 />'+*/
	            '</HelPdaUsedPartsTmp>'+
	          '</ListOfHelPdaUsedPartsTmp>'+
	        '</HelPdaActionTmp>'+
	      '</ListOfHelPdaFaultReportIo>'+
	      '<StatusObject />'+
	    '</FaultReportInsertOrUpdate_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:FaultReportInsertOrUpdate"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			},
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

//反馈信息时间退回
function PDATHGZCLGCJD(Data){
	WL.Logger.error("Data:"+Data);
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<soap:Body>'+
	    '<HELPDAInboundWebServiceRollback_Input xmlns="http://siebel.com/CustomUI">'+
	      '<ActivityId>'+Data+'</ActivityId>'+
	    '</HELPDAInboundWebServiceRollback_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELPDAInboundWebServiceRollback"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			},
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}
