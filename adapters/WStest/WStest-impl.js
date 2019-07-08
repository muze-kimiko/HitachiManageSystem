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

function WebServiceTest(interest) {
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<toDoList xmlns="http://OA_LCFW/ws_TodoList.tws">'+
	     // '<_vt>AAECAzUzQUI3QjU1NTNBQkE1ODVsZ3gwMjE2NbrAcHhIsVDtsH4Quca1Qiv3qo53</_vt>'+
	      '<_vt>'+interest+'</_vt>'+
	    '</toDoList>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			path:'/teamworks/webservices/OA_LCFW/ws_TodoList.tws?WSDL',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8'
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	 
	return result.Envelope.Body;
}


//待审批流程
function ForApprovalProcess(interest,piid,taskid) {
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<enterAuditing xmlns="http://OA_LCFW/ws_EnterAuditing.tws">'+
	      '<ivar>{"piid":"'+piid+'","taskid":"'+taskid+'"}</ivar>'+
	      '<_vt>'+interest+'</_vt>'+
	    '</enterAuditing>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			path:'/teamworks/webservices/OA_LCFW/ws_EnterAuditing.tws?WSDL',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8'
			}
	};

	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;

}



//提交审批流程param:[_vt , taskid , action,_flowto , data ,query , _notice ,_ext,procname]}
function ApprovalProcess(interest,taskid,action,_flowto,data,query,_notice,_ext,procname,ovar) {
	
	
var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	 ' <soap:Body>'+
	  '  <auditingSubmit xmlns="http://OA_LCFW/ws_AuditingSubmit.tws">'+
	  '<taskid>'+taskid+'</taskid>'+
	  '<action>'+action+'</action>'+
	  '<data>'+data+'</data>'+
	      '<_flowto>'+_flowto+'</_flowto>'+
	      '<query>'+query+'</query>';

	      if(_notice==""&&_notice==null){
	    	  request+= '<_notice/>';
	      }else{
	    	  request+= '<_notice>'+_notice+'</_notice>';
	      }
	      
	      if(_ext==""&&_ext==null){
	    	  request+= '<_ext/>';
	      }else{
	    	  request+= '<_ext>'+_notice+'</_ext>';
	      }

	      if(ovar==""&&ovar==null){
	    	  request+= '<ovar/>';
	      }else{
	    	  request+= '<ovar>'+_notice+'</ovar>';
	      }
	      
	      request+='<_vt>'+interest+'</_vt>'+
	      '<procname>'+procname+'</procname>'+
	    '</auditingSubmit>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	 
	var input = {
			method:'post',
			returnedContentType:'xml',
			path:'/teamworks/webservices/OA_LCFW/ws_AuditingSubmit.tws?WSDL',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	 
	return result.Envelope.Body;

}

//流程列表
function startTheProcess(interest,password) {
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<toProcessList xmlns="http://OA_LCFW/ws_ProcessList.tws">'+
	      '<_vt>'+interest+'</_vt>'+
	      '<_vp>'+password+'</_vp>'+
	    '</toProcessList>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			path:'/teamworks/webservices/OA_LCFW/ws_ProcessList.tws?WSDL',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8'
			}
	};

	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;

}