/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

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

//11.16年检接口list
function QueryPageAnn(pram){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+pram.userid+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+pram.userid+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
	'<soap:Body>'+
	    '<QueryPageAnn_Input xmlns="http://siebel.com/Sales/AnnInspection">'+
	      '<NewQuery>true</NewQuery>'+
	      '<PageSize>10</PageSize>'+
	     '<SearchSpec>'+pram.SearchSpec+'</SearchSpec>'+
	      //'<SearchSpec></SearchSpec>'+
	      '<SortSpec>Asset Number</SortSpec>'+
	      '<ViewMode>Organization</ViewMode>'+
	      ' <StartRowNum>'+pram.StartRowNum+'</StartRowNum>'+
	      //' <StartRowNum>0</StartRowNum>'+
	    '</QueryPageAnn_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	WL.Logger.error("SS:"+request);
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/AnnInspection:QueryPageAnn"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			//parameters: {UserName:'PDA',Password:'PDA'}, 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}



//删除年检
function DeleteAnn(pram){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+pram.userid+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+pram.userid+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
	'<soap:Body>'+
	    '<DeleteAnn_Input xmlns="http://siebel.com/Sales/AnnInspection">'+
	      '<PrimaryRowId>'+pram.PrimaryRowId+'</PrimaryRowId>'+
	      '</DeleteAnn_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	WL.Logger.error("SS:"+request);
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/AnnInspection:DeleteAnn"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			//parameters: {UserName:'PDA',Password:'PDA'}, 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//新增整改清单
function SynchronizeRec(pram){	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+pram.userid+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+pram.userid+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
	'<soap:Body>'+
	    ' <SynchronizeRec_Input xmlns="http://siebel.com/Sales/Rectification">'+
	    '<ListOfHELEAIAPPRectification xmlns="http://www.siebel.com/xml/HEL%20Rectification%20Bo">'+
	    '<ListOfHelRectification>'+
	     '<HelRectification>'+
	     '<Id>'+pram.Id +'</Id>'+
	     '<UpdatedBy></UpdatedBy>'+
	     '<AnnualInspectionId>'+pram.AnnualInspectionId+'</AnnualInspectionId>'+
	     '<Comments>'+pram.Comments+'</Comments>'+
	     '<MachineId></MachineId>'+
	     '<RecfiticationFinishDate>'+pram.RecfiticationFinishDate+'</RecfiticationFinishDate>'+
	     '<RectificationConent>'+pram.RectificationConent+'</RectificationConent>'+
	    '<RectificationParts>'+pram.RectificationParts+'</RectificationParts>'+
	     '<ResponsibiltyCategory>'+pram.ResponsibiltyCategory+'</ResponsibiltyCategory>'+
	     '<SystemUpdate>'+pram.SystemUpdate+'</SystemUpdate>'+
	     '<UpdateFullName>'+pram.UpdateFullName+'</UpdateFullName>'+
	     '</HelRectification>'+
	     '</ListOfHelRectification>'+
	     '</ListOfHELEAIAPPRectification>'+
	     '</SynchronizeRec_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	WL.Logger.error("SS:"+request);
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/Rectification:SynchronizeRec"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			//parameters: {UserName:'PDA',Password:'PDA'}, 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//整改清单分页
function QueryPageRec(pram){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+pram.userid+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+pram.userid+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
	'<soap:Body>'+
	    '<QueryPageRec_Input xmlns="http://siebel.com/Sales/Rectification">'+
	    '<NewQuery>true</NewQuery>'+
	    ' <PageSize>10</PageSize>'+
	     '<SearchSpec>[HEL Rectification.Annual Inspection Id] =\''+pram.InspectionId+'\'</SearchSpec>'+
	   // '<SearchSpec>[HEL Rectification.Annual Inspection Id] =\'1-Y54P4\'</SearchSpec>'+
	    '<SortSpec>Recfitication Finish Date</SortSpec>'+
	     '<ViewMode>Organization</ViewMode>'+
	     '<StartRowNum>'+pram.StartRowNum +'</StartRowNum>'+
	    // '<StartRowNum>0</StartRowNum>'+
	     '</QueryPageRec_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	WL.Logger.error("SS:"+request);
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/Rectification:QueryPageRec"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			//parameters: {UserName:'PDA',Password:'PDA'}, 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//删除整改清单
function DeleteRec(pram){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+pram.userid+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+pram.userid+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
	'<soap:Body>'+
	    '<DeleteRec_Input xmlns="http://siebel.com/Sales/Rectification">'+
	    '<PrimaryRowId>'+pram.PrimaryRowId+'</PrimaryRowId>'+
	     '</DeleteRec_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	WL.Logger.error("SS:"+request);
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/Rectification:DeleteRec"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			//parameters: {UserName:'PDA',Password:'PDA'}, 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}


//上传附件
function UpsertAttT(pram){
//	var request='<?xml version="1.0" encoding="utf-8"?>'+
//	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
//	'<UsernameToken xmlns="http://siebel.com/webservices">'+pram.userid+'</UsernameToken>'+
//	'<PasswordText xmlns="http://siebel.com/webservices">'+pram.userid+'</PasswordText>'+
//	'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
//	'<soap:Body>'+
//	    '<UpsertRecAtt_Input xmlns="http://siebel.com/Sales/Attachment">'+
//	    '<ListOfHELEAIAPPRectificationAttachment xmlns="http://www.siebel.com/xml/HEL%20Rectification%20Details%20Attachment%20">'+
//	     '<ListOfHelRectificationAttachment>'+
//	     '<HelRectificationAttachment Operation="1">'+
//	     '<Id></Id>'+
//	     '<Created></Created>'+
//	     '<CreatedBy></CreatedBy>'+
//	     '<Searchspec></Searchspec>'+
//	     '<Comment>'+pram.Comment+'</Comment>'+
//	     '<DocumentType>'+pram.DocumentType+'</DocumentType>'+
//	     '<RecFileExt>'+pram.RecFileExt+'</RecFileExt>'+
//	     '<RecFileName>'+pram.RecFileName+'</RecFileName>'+
//	     '<RecFileSize>'+pram.Comment+'</RecFileSize>'+
//	     '<RectificationId>'+pram.RectificationId+'</RectificationId>'+
//	     '<RecFileBuffer>'+pram.RecFileBuffer+'</RecFileBuffer>'+
////	     '<Comment>测试</Comment>'+
////	     '<DocumentType>现场图片</DocumentType>'+
////	     '<RecFileExt>txt</RecFileExt>'+
////	     '<RecFileName>测试</RecFileName>'+
////	     '<RecFileSize></RecFileSize>'+
////	     '<RectificationId>1-SVEQFR</RectificationId>'+
////	     '<RecFileBuffer>MaGisLTFpcu1w\/ejurfisdXPtc2zo6y958Pm1ru2wQ0KMqGiwrzI67\/Y1sajusTHuPbX1rbOysdLRVkNCjOhori0vOyjusqyw7TKx8TqvOy1x7zHICAgICBIRUwgRUFJIE9wcG9ydHVuaXR5IERlbWFuZCBUZXN0IG9yIEhFTCBFQUkgQVBQIE9wcG9ydHVuaXR5IERlbWFuZCBBbmFseXNpcw0KDQoNCltIRUwgTGVhZC5Qcm9qZWN0IE5hbWVdIGxpa2UgJzIwMTUqJyBhbmQgW0hFTCBMZWFkLkFnZW50IE5hbWVdIGxpa2UgJyoqJyBhbmQgW0hFTCBMZWFkLkxlYWQgU3RhdHVzXSBsaWtlICAnKicNCg0KW09wcG9ydHVuaXR5Lk9wcHR5IFN0YXR1c10gbGlrZSAn0MK9qCcNCg0KW0hFTCBMZWFkLkxlYWQgU3RhdHVzXSA9ICcnDQoNCkhFTCBFQUkgT3BwIEFuYSBTZXJ2aWNlIFRlc3Qgb3IgSEVMIEVBSSBBUFAgTGVhZCBTZXJ2aWNlDQoNCkFnZW50IE5hbWUgb3IgSWQgb3IgTGVhZCBTdGF0dXMgb3IgT3BwdHkgTnVtYmVyIG9yIFByb2plY3QgTmFtZSBvciBSZWdpc3RyYXRpb24gUGVyc29uIG9yIFN0cmVldCBBZGRyZXNzIG9yIFN1Ym1pdCBEYXRlIG9yIG9wZXJhdGlvbiBvciBzZWFyY2hzcGVjDQoNCkVycm9yTXNnIExhc3RQYWdlIE5ld1F1ZXJ5IE51bU91dHB1dE9iamVjdHMgUGFnZVNpemUgU2VhcmNoU3BlYyBTaWViZWxNZXNzYWdlIFNvcnRTcGVjIFN0YXJ0Um93TnVtIFZpZXdNb2RlDQoNCg0KSEVMIEVBSSBBUFAgT3Bwb3J0dW5pdHkgRGVtYW5kIEFuYWx5c2lzIFNlcnZpY2Ugb3IgSEVMIEVBSSBBUFAgT3BwdHkgRGVtYW5kIFRlc3QNCg0KDQpIRUwgRUFJIEFQUCBDb250YWN0IFRlc3Qgb3IgSEVMIEVBSSBBUFAgT3Bwb3J0dW5pdHkgQ29udGFjdA0KDQpBY2NvdW50IG9yIEFjY291bnQgUm93IElkIG9yIEZpcnN0IE5hbWUgb3IgSWQgb3IgSm9iIFRpdGxlIG9yIExhc3QgTmFtZSBvciBNL00gb3IgUm93IElkIG9yIFdvcmsgUGhvbmUgIyBvciBvcGVyYXRpb24gb3Igc2VhcmNoc3BlYw0KDQpBY2NvdW50IEFjY291bnQgUm93IElkIElzUHJpbWFyeU1WRyBvcGVyYXRpb24gc2VhcmNoc3BlYw0KDQpPcHBvcnR1bml0eSBOdW1iZXIgb3IgTmFtZSBvciBPcHB0eSBDYXRlZ29yeSBvciBPcHB0eSBTdWIgQ2F0ZWdvcnkgb3IgT3BwdHkgU3RhdHVzIG9yIE9wcHR5IFBoYXNlIG9yIEVxdWlwbWVudCBPcHB0eSBBdHRyaWJ1dGUgb3IgQnVzaW5lc3MgVHlwZQ0KT3BwdHkgQ29udHJhY3QgVHlwZSBvciBPcHB0eSBCdWlsZGluZyBQaGFzZSBvciBPcHB0eSBJbmZvIENoYW5uZWwgb3IgT3JnYW5pemF0aW9uIG9yIFByZWRpY3QgU2lnbiBZZWFyIG9yIFByZWRpY3QgU2lnbiBNb250aA0KT3BwdHkgQnVzaW5lc3MgUHJlYXBwcm92ZSBTdGF0dXMgb3IgU2FsZXMgUmVwIG9yIEhRIFNhbGVzIFJlcCBGdWxsIE5hbWUgb3IgUHJpbWFyeSBSZXZlbnVlIEFtb3VudCBvciBGcmFtZSBQcm90b2NvbCBOdW0gb3IgQmlkaW5nDQoNCg0KS2V5IENvbnRhY3QgTGFzdCBOYW1lIG9yIEtleSBDb250YWN0IEZpcnN0IE5hbWVvciBLZXkgQ29udGFjdCBEZXBhcnRtZW50IG9yIEtleSBDb250YWN0IFBvc2l0aW9uIG9yIEtleSBDb250YWN0IFdvcmsgUGhvbmUgIyBvciBLZXkgQ2VsbHVsYXIgUGhvbmUgIyANCg0KT3BwdHkgSW5zdGFsbCBTaXRlIG9yIEluc3RhbGwgU2l0ZSBDb21wYW55IG9yIFNpdGUgU3RhdGUgb3IgU2l0ZSBDaXR5IG9yIFNpdGUgQ291bnR5DQoNCg0KT3BwdHkgTWFqb3IgUHJvamVjdCBvciBMYXJnZSBDb21wb3NpdGUgUHJvamVjdCBvciBPcHB0eSBJbnRlcm5hdGlvbmFsIEhvdGVsIG9yIFRvcCBCREMgb3IgU3ltYm9saWMgQnVpbGRpbmcgb3IgTHV4dXJpb3VzIFJlc2lkZW5jZSBvciBPcHB0eSBJbXBvcnQgRGVtYW5kDQoNCkFjY291bnQgb3IgT3BwdHkgRmluYWwgVXNlciBvciBBY2NvdW50IEtBIE51bWJlciBvciBBY2NvdW50IFR5cGUgb3IgQWNjb3VudCBTdWIgVHlwZSBvciBBY2NvdW50IFByb3BlcnR5IG9yIEFjY291bnQgQXR0cmlidXRlIG9yIE9wcHR5IERlY2xpbmUgUmVhc29uIG9yIFN1cHBsaWVyIE9wcG9ydHVuaXR5IG9yIFggSGVpZ2h0IG9yIFkgQ29vcmRpbmF0ZSBvciBFdmFsdWF0ZSBFbGV2YXRvciBRdWFudGl0eSBvciBFdmFsdWF0ZSBFc2NhbGF0b3IgUXVhbnRpdHkNCg0KSEVMIEVBSSBBUFAgT3Bwb3J0dW5pdHkgRGV0YWlsIG9yIEhFTCBFQUkgQVBQIE9wcG9ydHVuaXR5IE5ld0NyZWF0ZSBUZXN0DQoNCkQ6XFNpZWJlbFw4LjFcQ2xpZW50XzFcQklOXHNpZWJlbC5leGUgL2MgRDpcU2llYmVsXDguMVxDbGllbnRfMVxiaW5cY2hzXHNpZWJlbC5jZmcgL2IgIkM6XFByb2dyYW0gRmlsZXNcSW50ZXJuZXQgRXhwbG9yZXJcaWV4cGxvcmUuZXhlIiAvdSBTQURNSU4gL3AgU0FETUlOIC9kIFNJRUJFTF9VQVQgL3MgZDpcc3Bvb2wudHh0DQoNCg0KQXR0YWNobWVudFR5cGUgb3IgQ29tbWVudHMgb3IgSWQgb3IgT3BwdHkgQXR0YWNobWVudCBJZCBvciBPcHB0eSBJZCBvciBPcHB0eUZpbGVEYXRlIG9yIE9wcHR5RmlsZUV4dCBvciBPcHB0eUZpbGVOYW1lIG9yIE9wcHR5RmlsZVNpemUgb3IgT3BwdHlGaWxlU3JjUGF0aCBvciBPcHB0eUZpbGVTcmNUeXBlIG9yIG9wZXJhdGlvbiBvciBzZWFyY2hzcGVj</RecFileBuffer>'+     
//	     '</HelRectificationAttachment>'+
//	     '</ListOfHELEAIAPPRectificationAttachment>'+
//	     '</UpsertRecAtt_Input>'+
//	  '</soap:Body>'+
//	'</soap:Envelope>';
	
	
	var request='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:att="http://siebel.com/Sales/Attachment" xmlns:hel="http://www.siebel.com/xml/HEL%20Rectification%20Details%20Attachment%20">'+
	   '<soapenv:Header>'+
	      '<UsernameToken xmlns="http://siebel.com/webservices">'+pram.userid+'</UsernameToken>'+
	      '<PasswordText xmlns="http://siebel.com/webservices">'+pram.userid+'</PasswordText>'+
	      '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
	   '</soapenv:Header>'+
	   '<soapenv:Body>'+
	      '<att:UpsertRecAtt_Input>'+
	         '<hel:ListOfHELEAIAPPRectificationAttachment>'+
	            '<hel:ListOfHelRectificationAttachment>'+
	               '<hel:HelRectificationAttachment Operation="?">'+
	                  '<hel:Id></hel:Id>'+
	                  '<hel:Created></hel:Created>'+
	                  '<hel:CreatedBy></hel:CreatedBy>'+
	                  '<hel:Searchspec></hel:Searchspec>'+
	                  '<hel:Comment>'+pram.Comment+'</hel:Comment>'+
	                  '<hel:DocumentType>'+pram.DocumentType+'</hel:DocumentType>'+
	                  '<hel:RecFileExt>'+pram.RecFileExt+'</hel:RecFileExt>'+
	                  '<hel:RecFileName>'+pram.RecFileName+'</hel:RecFileName>'+
	                  '<hel:RecFileSize></hel:RecFileSize>'+
	                  '<hel:RectificationId>'+pram.RectificationId+'</hel:RectificationId>'+
	                  '<hel:RecFileBuffer>'+pram.RecFileBuffer+'</hel:RecFileBuffer>'+
	               '</hel:HelRectificationAttachment>'+
	            '</hel:ListOfHelRectificationAttachment>'+
	         '</hel:ListOfHELEAIAPPRectificationAttachment>'+
	      '</att:UpsertRecAtt_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	WL.Logger.error("SS:"+request);
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/Attachment:UpsertRecAtt"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			//parameters: {UserName:'PDA',Password:'PDA'}, 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//分页查询附件信息
function QueryPageAttT(pram){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+pram.userid+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+pram.userid+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
	'<soap:Body>'+
	    '<QueryPageRecAtt_Input xmlns="http://siebel.com/Sales/Attachment">'+
	    '<NewQuery>true</NewQuery>'+
	     //'<SearchSpec>[HEL Rectification Attachment.Rectification Id] = \'1-R02SYP\' </SearchSpec>'+
	    '<SearchSpec>[HEL Rectification Attachment.Rectification Id] = \''+pram.Id+'\' </SearchSpec>'+
	     '<PageSize>10</PageSize>'+
	     '<SortSpec>RecFileName</SortSpec>'+
	     '<ViewMode>Organization</ViewMode>'+
	     '<StartRowNum>'+pram.StartRowNum+'</StartRowNum>'+
	     '</QueryPageRecAtt_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	WL.Logger.error("SS:"+request);
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/Attachment:QueryPageRecAtt"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			//parameters: {UserName:'PDA',Password:'PDA'}, 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//删除附件信息
function DeleteAttT(pram){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+pram.userid+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+pram.userid+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
	'<soap:Body>'+
	    ' <DeleteRecAtt_Input xmlns="http://siebel.com/Sales/Attachment">'+
	    ' <PrimaryRowId>'+pram.PrimaryRowId+'</PrimaryRowId>'+
	     '</DeleteRecAtt_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	WL.Logger.error("SS:"+request);
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/Attachment:DeleteRecAtt"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			//parameters: {UserName:'PDA',Password:'PDA'}, 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//分页查询工号
function QueryPageAssetInf(pram){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+pram.userid+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+pram.userid+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
	'<soap:Body>'+
	    ' <QueryPageAssetInf_Input xmlns="http://siebel.com/Sales/AssetInfor">'+
	    '<NewQuery>true</NewQuery>'+
	     '<PageSize>10</PageSize>'+
	     '<SearchSpec>'+pram.SearchSpec+'</SearchSpec>'+
	     '<SortSpec>Asset Number</SortSpec>'+
	     '<ViewMode>Organization</ViewMode>'+
	     '<StartRowNum>'+pram.StartRowNum+'</StartRowNum>'+
	     '</QueryPageAssetInf_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	WL.Logger.error("SS:"+request);
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/AssetInfor:QueryPageAssetInf"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			//parameters: {UserName:'PDA',Password:'PDA'}, 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}



//分页查询代处理人信息
function QueryPageEmp(pram){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+pram.userid+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+pram.userid+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
	'<soap:Body>'+
	    '<QueryPageEmp_Input xmlns="http://siebel.com/Sales/EmployeeInfor">'+
	    ' <NewQuery>true</NewQuery>'+
	     '<PageSize>10</PageSize>'+
	     '<SearchSpec>'+pram.SearchSpec+'</SearchSpec>'+
	     '<SortSpec>Id</SortSpec>'+
	     '<ViewMode>Organization</ViewMode>'+
	     '<StartRowNum>'+pram.StartRowNum+'</StartRowNum>'+
	     '</QueryPageEmp_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	WL.Logger.error("SS:"+request);
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/EmployeeInfor:QueryPageEmp"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			//parameters: {UserName:'PDA',Password:'PDA'}, 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}




//新建年检
function SynchronizeAnn(pram){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+pram.userid+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+pram.userid+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
	'<soap:Body>'+
	    '<SynchronizeAnn_Input xmlns="http://siebel.com/Sales/AnnInspection">'+
	    '<ListOfHelEaiAppAnnualInspection xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Annual%20Inspection">'+
        '<HelAssetAnnualInspectionInformation Operation="">'+
	      '<Id>'+ pram.Id +'</Id>'+
	      '<AgentProcessId></AgentProcessId>'+
	      '<AgentProcesser>'+pram.AgentProcesser+'</AgentProcesser>'+
	      '<AgentReadOnlyFlag>'+pram.AgentReadOnlyFlag+'</AgentReadOnlyFlag>'+
	      '<AnnualInspectionDay>'+pram.AnnualInspectionDay+'</AnnualInspectionDay>'+
	      '<AnnualInspectionMonth>'+pram.AnnualInspectionMonth+'</AnnualInspectionMonth>'+
	      '<AnnualInspectionYear>'+pram.AnnualInspectionYear+'</AnnualInspectionYear>'+
	      '<AnnualSurveySituation>'+pram.AnnualSurveySituation+'</AnnualSurveySituation>'+
	      '<AssetDomainName>'+pram.AssetDomainName+'</AssetDomainName>'+
          '<AssetId>'+pram.AssetId+'</AssetId>'+
	      '<AssetNumber>'+pram.AssetNumber+'</AssetNumber>'+
	      '<CreatetdFullName>'+pram.CreatetdFullName+'</CreatetdFullName>'+
	      '<LoginId></LoginId>'+
	      '<WriteBackFlag>'+pram.WriteBackFlag +'</WriteBackFlag>'+
	      '</HelAssetAnnualInspectionInformation>'+
	      '</ListOfHelEaiAppAnnualInspection>'+
	      '</SynchronizeAnn_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/AnnInspection:SynchronizeAnn"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			//parameters: {UserName:'PDA',Password:'PDA'}, 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
		
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//判断是否为待处理人



function QueryEmp(pram){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+pram.userid+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+pram.userid+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
	'<soap:Body>'+
	 '<QueryEmpType_Input xmlns="http://siebel.com/Sales/EmpolyeeType">'+
	 '<SearchSpec>[Employee.Login Name] ="'+pram.Id+'" and [Employee.Employee Category] = "代处理"</SearchSpec>'+
	 '<ViewMode>Organization</ViewMode>'+
	 '</QueryEmpType_Input>'+
	 '</soap:Body>'+
	'</soap:Envelope>';
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/EmpolyeeType:QueryEmpType"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			//parameters: {UserName:'PDA',Password:'PDA'}, 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}


//整改部件
function PartQueryPage(pram){
	var request='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:part="http://siebel.com/Service/Part">'+
	   '<soapenv:Header>'+
	      '<UsernameToken xmlns="http://siebel.com/webservices">'+pram.userid+'</UsernameToken>'+
	      '<PasswordText xmlns="http://siebel.com/webservices">'+pram.userid+'</PasswordText>'+
	      '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
	   '</soapenv:Header>'+
	   '<soapenv:Body>'+
	      '<part:PartQueryPage>'+
	         '<NewQuery>true</NewQuery>'+
	         '<PageSize>10</PageSize>'+
	         '<SearchSpec>'+pram.SearchSpec+'</SearchSpec>'+
	         '<SortSpec>Id</SortSpec>'+
	         '<ViewMode>All</ViewMode>'+
	         '<StartRowNum>'+pram.StartRowNum+'</StartRowNum>'+
	      '</part:PartQueryPage>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"rpc/http://siebel.com/Service/Part:PartQueryPage"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			//parameters: {UserName:'PDA',Password:'PDA'}, 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}


