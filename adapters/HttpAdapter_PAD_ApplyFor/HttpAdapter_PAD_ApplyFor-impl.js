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


function getRecieveByEmpNum(id){
	/*待审批单据列表*/
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<RecieveByEmpNum xmlns="http://impl.service.erp.com/">'+
	      '<arg0 xmlns="">'+id+'</arg0>'+
	    '</RecieveByEmpNum>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	WL.Logger.error("待审批单据列表"+request.toString());
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			path:'PDARecieverImpl',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

function getRecieveByheadId_spiltbill(id){
	/*审批分批申请接口*/
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<RecieveByheadId_spiltbill xmlns="http://impl.service.erp.com/">'+
	      '<arg0 xmlns="">'+id+'</arg0>'+
	    '</RecieveByheadId_spiltbill>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	WL.Logger.error("分批单据列表信息"+request.toString());
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			path:'PDARecieverImpl',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

function getRecieveByheadId_specialbill(id){
	/*审批特殊排产发货申请接口[A+B]*/
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
			'<soap:Body>'+
		    '<RecieveByheadId_specialbill xmlns="http://impl.service.erp.com/">'+
		      '<arg0 xmlns="">'+id+'</arg0>'+
		    '</RecieveByheadId_specialbill>'+
			'</soap:Body>'+
		'</soap:Envelope>';
	WL.Logger.error("特殊排产列表信息"+request.toString());
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			path:'PDARecieverImpl',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

function getRecieve_SPECIALBILL_LINESELEVATOR(id){
	/*审批特殊排产发货申请接口[B+C]*/
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
			'<soap:Body>'+
		    '<Recieve_SPECIALBILL_LINESELEVATOR xmlns="http://impl.service.erp.com/">'+
		      '<arg0 xmlns="">'+id+'</arg0>'+
		    '</Recieve_SPECIALBILL_LINESELEVATOR>'+
			'</soap:Body>'+
		'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			path:'PDARecieverImpl',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

function getReceive(data){
	/*审批过程*/
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		  '<soap:Body>'+
		    '<Recieve xmlns="http://impl.service.erp.com/">'+
		      '<arg0 xmlns="">'+data.p_bill_num+'</arg0>'+
		      '<arg1 xmlns="">'+data.p_action+'</arg1>'+
		      '<arg2 xmlns="">'+data.opinion+'</arg2>'+
		    '</Recieve>'+
		  '</soap:Body>'+
		'</soap:Envelope>';
	WL.Logger.error("审批过程"+request.toString());
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			path:'PDARecieverImpl',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

