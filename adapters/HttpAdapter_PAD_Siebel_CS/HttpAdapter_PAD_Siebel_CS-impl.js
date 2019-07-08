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

//合同资料Siebel查询
function toSiebelcontractSeacherCS(ContractNumber,ContractType,CustomerName,AssetNumber,FinalUser,BigCustomer,userID){
	
	/**
	 * 2015-8-28   测试机接口   有权限判断
	 */
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<ContractListQueryByExample_Input xmlns="http://siebel.com/PDAContractsInfo">'+
	      '<ListOfHelPdaContractsListIo xmlns="http://www.siebel.com/xml/HEL%20PDA%20Contracts%20List%20IO">'+
	        '<HelPdaContracts Operation="">'+
	          '<Id />'+
	          '<Created />'+
	          '<CreatedBy />'+
	          '<Updated />'+
	          '<UpdatedBy />'+
	          '<ConflictId />'+
	          '<ModId />'+
	          '<Searchspec />'+
	          '<AssetNumber>'+AssetNumber+'</AssetNumber>'+
	          '<Attrib1>'+userID+'</Attrib1>'+
	          '<Attrib2 />'+
	          '<Attrib3 />'+
	          '<Attrib4 />'+
	          '<Attrib5 />'+
	          '<Attrib6 />'+
	          '<Attrib7 />'+
	          '<Attrib8 />'+
	          '<Attrib9 />'+
	          '<BigCustomer>'+BigCustomer+'</BigCustomer>'+
	          '<ContractNumber>'+ContractNumber+'</ContractNumber>'+
	          '<ContractType>'+ContractType+'</ContractType>'+
	          '<CustomerName>'+CustomerName+'</CustomerName>'+
	          '<FinalUser>'+FinalUser+'</FinalUser>'+
	        '</HelPdaContracts>'+
	      '</ListOfHelPdaContractsListIo>'+
	    '</ContractListQueryByExample_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	/*var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<ContractListQueryByExample_Input xmlns="http://siebel.com/PDAContractsInfo">'+
	      '<ListOfHelPdaContractsListIo xmlns="http://www.siebel.com/xml/HEL%20PDA%20Contracts%20List%20IO">'+
	        '<HelPdaContracts Operation="">'+
	          '<Id />'+
	          '<Created />'+
	          '<CreatedBy />'+
	          '<Updated />'+
	          '<UpdatedBy />'+
	          '<ConflictId />'+
	          '<ModId />'+
	          '<Searchspec />'+
	          '<AssetNumber>'+AssetNumber+'</AssetNumber>'+
	          '<Attrib1>'+userID+'</Attrib1>'+
	          '<Attrib2 />'+
	          '<Attrib3 />'+
	          '<Attrib4 />'+
	          '<Attrib5 />'+
	          '<Attrib6 />'+
	          '<Attrib7 />'+
	          '<Attrib8 />'+
	          '<Attrib9 />'+
	          '<BigCustomer>'+BigCustomer+'</BigCustomer>'+
	          '<ContractNumber>'+ContractNumber+'</ContractNumber>'+
	          '<ContractType>'+ContractType+'</ContractType>'+
	          '<CustomerName>'+CustomerName+'</CustomerName>'+
	          '<FinalUser>'+FinalUser+'</FinalUser>'+
	        '</HelPdaContracts>'+
	      '</ListOfHelPdaContractsListIo>'+
	    '</ContractListQueryByExample_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';*/
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'SOAPAction':'"document/http://siebel.com/PDAContractsInfo:ContractListQueryByExample"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&UserName=SADMIN&Password=SADMIN',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	/*var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'SOAPAction':'"document/http://siebel.com/PDAContractsInfo:ContractListQueryByExample"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&UserName=SADMIN&Password=SADMIN',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};*/
	
	
	//WL.Logger.error("FFAA2:"+request.toString());
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}
