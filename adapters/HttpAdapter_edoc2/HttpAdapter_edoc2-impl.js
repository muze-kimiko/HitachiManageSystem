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

/**
 * @param tag
 *            must be either MobileFirst_Platform or MobileFirst_Playground
 * @returns json list of items
 */
function getFeed(tag) {
	path = getPath(tag);

	var input = {
	    method : 'get',
	    returnedContentType : 'xml',
	    path : path
	};


	return WL.Server.invokeHttp(input);
}
/**
 *
 * @param tag
 *            must be either MobileFirst_Platform or MobileFirst_Playground
 * @returns json list of items
 */
function getFeedFiltered(tag) {
	path = getPath(tag);

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



function getPath(tag) {
	var path;
	if (tag === undefined || tag === '') {
		path = '/feed';
	}else {
		path = '/tag/' + tag + '/feed';
	}
	return 'mobilefirstplatform' + path;
}

function getEdoc(userid) {
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:tem="http://tempuri.org/">'+
	   '<soap:Header/>'+
	   '<soap:Body>'+
	      '<tem:GetZuixinFabuWenjian>'+
	         '<tem:account>' + userid + '</tem:account>'+
	      '</tem:GetZuixinFabuWenjian>'+
	   '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'SOAPAction':'"http://tempuri.org/GetZuixinFabuWenjian"'},
			path:'/gc/webservice/EDoc2RiliDocumentWebservice.asmx?wsdl',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}
