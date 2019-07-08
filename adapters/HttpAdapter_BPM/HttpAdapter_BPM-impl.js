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
function TodoList(interest) {
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<toDoList xmlns="http://OA_LCFW/ws_TodoList.tws">'+
	      '<_vt>AAECAzUzQUE4MjE0NTNBQUFDNDRsZ3gwMjE2NaEOg8Co3v+HAk7gzsYCbRUmOSyP</_vt>'+
	    '</toDoList>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/teamworks/TodoList/OA_LCFW/ws_TodoList.tws?WSDL',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8'
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	 
	return result.Envelope.Body;
}

////代办列表
//function WebServiceTest(interest,start,limit,cookies) {
//	var input = {
//		    method : 'post',
//		    returnedContentType : 'json', 
//		    path : '/ext/taskAction.do?_dc=1416213025198',
//		    parameters : {'page' : '1', 'limit':limit,'start':start},
//	    	headers: {'cookie': 'LtpaToken2='+cookies},
//		};
//	return WL.Server.invokeHttp(input);
//}


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
			returnedContentEncoding : 'utf-8',
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
			returnedContentEncoding : 'utf-8',
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
			returnedContentEncoding : 'utf-8',
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
			returnedContentEncoding : 'utf-8',
			path:'/teamworks/webservices/OA_LCFW/ws_ProcessList.tws?WSDL',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8'
			}
	};

	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;

}


//启动流程
function startTheProcessName(interest,ibpd,iarg) {
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<startProcess xmlns="http://OA_LCFW/ws_StartProcess.tws">'+
	      '<_vt>'+ interest +'</_vt>'+
	      '<ibpd>'+ ibpd +'</ibpd>'+
	      '<iarg>'+ iarg +'</iarg>'+
	    '</startProcess>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
//	alert(request);
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/teamworks/webservices/OA_LCFW/ws_StartProcess.tws?WSDL',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8'
			}
	};

	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;

}
 
//获取 起草流程 数据
function draftingProcess(interest,ivar) {
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<enterAuditing xmlns="http://OA_LCFW/ws_EnterAuditing.tws">'+
	      '<ivar>'+ivar+'</ivar>'+
	      '<_vt>'+interest+'</_vt>'+
	    '</enterAuditing>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/teamworks/webservices/OA_LCFW/ws_EnterAuditing.tws?WSDL',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8'
			}
	};

	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;

}

//提交起草流程
function DrafterSubmit(interest,taskid,action,_flowto,data,query,_notice,_ext,procname,ovar) {
	
	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		 ' <soap:Body>'+
		  '  <drafterSubmit xmlns="http://OA_LCFW/ws_AuditingSubmit.tws">'+
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
		    '</drafterSubmit>'+
		  '</soap:Body>'+
		'</soap:Envelope>';

		var input = {
				method:'post',
				returnedContentType:'xml',
				returnedContentEncoding : 'utf-8',
				path:'/teamworks/webservices/OA_LCFW/ws_DrafterSubmit.tws?WSDL',
				body:{
					content:request.toString(),
					contentType:'text/xml;charset=utf-8',
				}
		};
		
		var result = WL.Server.invokeHttp(input);
		 
		return result.Envelope.Body;

	}



function toMyTodoListRecord(interest,cookies,OA_ygbh) {
	var input = {
		    method : 'post',
		    returnedContentType : 'json', 
		    returnedContentEncoding : 'utf-8',
		    path : '/ext/taskAction.do?method=toMyTodoListRecord',
		    parameters : {'page' : '1', 'limit':'1000','start':'0','df_man':OA_ygbh},
	    	headers: {'cookie': 'LtpaToken2='+cookies},
		};
	return WL.Server.invokeHttp(input);
}

function toOvrTodoListRecord(interest,cookies) {
	var input = {
		    method : 'post',
		    returnedContentType : 'json', 
		    returnedContentEncoding : 'utf-8',
		    path : '/ext/taskAction.do?method=toOvrTodoListRecord',
		    parameters : {'page' : '1', 'limit':'1000','start':'0'},
	    	headers: {'cookie': 'LtpaToken2='+cookies},
		};
	return WL.Server.invokeHttp(input);
}

//获取 查看  数据
function examine(interest,piid) {
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<getPiData xmlns="http://OA_LCFW/ws_GetPIData.tws">'+
	      '<piid>'+ piid +'</piid>'+
	      '<_vt>'+ interest +'</_vt>'+
	    '</getPiData>'+
	  '</soap:Body>'+
	'</soap:Envelope>'
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/teamworks/webservices/OA_LCFW/ws_GetPIData.tws?WSDL',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8'
			}
	};

	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;

}

//获取PO单审核订单行数据
function POFormExamine(po_header_id,start,limit,cookies){
	
	var input = {
			method : 'post',
			returnedContentType : 'json',
			returnedContentEncoding : 'utf-8',
			path : '/ext/processCfgAction.do?method=toGetDataERPRecord',
			parameters : {'po_header_id' : po_header_id, 'start':start,'limit':limit},
			headers: {'cookie': 'LtpaToken2='+cookies},
	};
	
	return WL.Server.invokeHttp(input);
}

//查询BPR流程
function GetERPProcess_Info(fenlei,proc_name,cd_flag,subject,billno,df_man,page,start,limit,cookies){
	var input = {
			method : 'post',
			returnedContentType : 'json',
			returnedContentEncoding : 'utf-8',
			path : '/ext/taskAction.do?method=toSelectTodoListRecord&_dc=',
			parameters : {'fenlei' : fenlei, 'proc_name' : proc_name, 'cd_flag':cd_flag,'subject' : subject , 'billno' : billno , 'df_man' : df_man , 'page' : page, 'start':start,'limit':limit},
			headers: {'cookie': 'LtpaToken2='+cookies},
	};
	
	return WL.Server.invokeHttp(input);
	
}

