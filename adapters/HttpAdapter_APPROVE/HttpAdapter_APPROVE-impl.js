/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
//var str_conect_name_pwd = "UserName=SADMIN&Password=SADMIN"; // 接口验证的用户名密码  测试
var str_conect_name_pwd = "UserName=GUESTCST&Password=2aystbz"; // 接口验证的用户名密码 正式
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
	    returnedContentEncoding : 'utf-8',
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
	    returnedContentEncoding : 'utf-8',
	    path : path,
	    transformation : {
		    type : 'xslFile',
		    xslFile : 'filtered.xsl'
	    }
	};
	
	return WL.Server.invokeHttp(input);
}

function LdapLogin(v_username,v_password) {
	return {
		result:com.helc.helcapprove.LdapAction.LdapLogin(v_username,v_password)
	};
}

function getStsyemInfo(param) {
	
	return {
		result:"areaPoint:''#saleMinister:'2094,0983,1017,0997,1386,0999,1001,0208,1003,0988,1481,0993,1032,1000,1312,0785,3858,2902,0177,3039,3415,1009,1535,1295,5376,2078,1302,1020,1091,7180,5083,1508,1503,1619,1410,3265,7089,6308,1018,3274,1601,6841,1555,1050'#saleConductor:'1357,15632'#financeConductor:'1744'#vicePresident:'0840'#supermo:'0022'"
	};
}

function LdapUpdatePwd(v_username,v_old_password,v_new_password) {
	return {
		result:com.helc.helcapprove.LdapAction.LdapUpdatePwd(v_username,v_old_password,v_new_password)
	};
}


function getPath(interest) {
	if (interest == undefined || interest == '') {
		interest = '';
	}else {
		interest = '_' + interest;
	}
	return 'rss/edition' + interest + '.rss';
}

/*
 * TBJ待审批数量
 */
function toQueryTJBAprovelPendingCount(userid,loginRole) {
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<HELHHTBJApprovePendingCountwsQueryByExample_Input xmlns="http://siebel.com/CustomUI">'+
	      '<ListOfHelHhTbjApprovePendingCountIo xmlns="http://www.siebel.com/xml/HEL%20HH%20TBJ%20Approve%20Pending%20Count%20IO">'+
	        '<HelHhTbjApprovePendingCountEbc Operation="" Searchspec="">'+
	          '<LoginId>'+ userid +'</LoginId>';
	          if (loginRole != null && loginRole != '' && loginRole != undefined) {
	        	  request += '<LoginRole>'+ loginRole +'</LoginRole>';
	          }
	          request += '</HelHhTbjApprovePendingCountEbc>'+
	      '</ListOfHelHhTbjApprovePendingCountIo>'+
	    '</HELHHTBJApprovePendingCountwsQueryByExample_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHTBJApprovePendingCountwsQueryByExample"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

/*
 * TBJ待审批列表
 */
function toQueryTJBAprovelPendingList(userid,attr_03) {
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<HELHHTBJApprovePendingwsQueryByExample_Input xmlns="http://siebel.com/CustomUI">'+
	      '<ListOfHelHhTbjApprovePendingIo xmlns="http://www.siebel.com/xml/HELHHTBJApprovePendingIO">'+
	        '<HelHhTbjApprovePendingEbc Operation="" Searchspec="">';
		       if (attr_03 != null && attr_03 != '' && attr_03 != undefined) {
		    	   request += '<ATTR_03>'+ attr_03 +'</ATTR_03>';
		       }
		       request += '<LOGIN_ID>'+ userid +'</LOGIN_ID>'+
	        '</HelHhTbjApprovePendingEbc>'+
	      '</ListOfHelHhTbjApprovePendingIo>'+
	    '</HELHHTBJApprovePendingwsQueryByExample_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHTBJApprovePendingwsQueryByExample"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}
/*
 * TBJ待审批详细
 */
function toQueryTJBAprovelPendingDetail(attr10, version, QUOTE_NUMBER1) {
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<HELHHTBJApproveMainwsQueryByExample_Input xmlns="http://siebel.com/CustomUI">'+
	      '<ListOfHelHhTbjApproveMainIo xmlns="http://www.siebel.com/xml/HELHHTBJApproveMainIO">'+
			'<HelHhTbjApproveMainEbc Operation="" Searchspec="">';
		      if (version != null && version != '' && version != undefined) {
		    	  request += '<ATTR_01>'+ version +'</ATTR_01>';
		      }
		      if(QUOTE_NUMBER1 !=null&&QUOTE_NUMBER1 !=''&&QUOTE_NUMBER1 !=undefined){
		    	  request += '<QUOTE_NUMBER1>'+QUOTE_NUMBER1+'</QUOTE_NUMBER1>'; 
		      }
		      request += '<ATTR_10>'+ attr10 +'</ATTR_10>'+
	        '</HelHhTbjApproveMainEbc>'+
	      '</ListOfHelHhTbjApproveMainIo>'+
	    '</HELHHTBJApproveMainwsQueryByExample_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	        WL.Logger.error("hehe1:"+request);
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHTBJApproveMainwsQueryByExample"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

/* 服务费审批信息   */
function toQueryServiceFee(attr10) {
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<HELHHTBJServiceFeewsQueryByExample_Input xmlns="http://siebel.com/CustomUI">'+
	      '<ListOfHelHhTbjServiceFeeIo xmlns="http://www.siebel.com/xml/HELHHTBJServiceFeeIO">'+
	        '<HelHhTbjServiceFeeEbc Operation="" Searchspec="">'+
	          '<QUOTE_ID>' + attr10 + '</QUOTE_ID>'+
	        '</HelHhTbjServiceFeeEbc>'+
	      '</ListOfHelHhTbjServiceFeeIo>'+
	    '</HELHHTBJServiceFeewsQueryByExample_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';

	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHTBJServiceFeewsQueryByExample"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

/* 梯总浮率   */
function toQueryElevatorC(attr10) {
	var request= '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<HELHHTBJProdRatewsQueryByExample_Input xmlns="http://siebel.com/CustomUI">'+
	      '<ListOfHelHhTbjProdRateIo xmlns="http://www.siebel.com/xml/HELHHTBJProdRateIO">'+
	        '<HelHhTbjProdRateEbc Operation="" Searchspec="">'+
	          '<QUOTE_ID>'+ attr10 +'</QUOTE_ID>'+
	        '</HelHhTbjProdRateEbc>'+
	      '</ListOfHelHhTbjProdRateIo>'+
	    '</HELHHTBJProdRatewsQueryByExample_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';

	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHTBJProdRatewsQueryByExample"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}
/* 付款比例    */
function toQueryProportion(attr10) {
	var request= '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	  '<soap:Body>'+
	    '<HELHHTBJApprovePaywsQueryByExample_Input xmlns="http://siebel.com/CustomUI">'+
	      '<ListOfHelHhTbjApprovePayIo xmlns="http://www.siebel.com/xml/HELHHTBJApprovePayIO">'+
	        '<HelHhTbjApprovePayEbc Operation="" Searchspec="">'+
	          '<QUOTE_ID>'+ attr10 +'</QUOTE_ID>'+
	        '</HelHhTbjApprovePayEbc>'+
	      '</ListOfHelHhTbjApprovePayIo>'+
	    '</HELHHTBJApprovePaywsQueryByExample_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHTBJApprovePaywsQueryByExample"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

/* 版本对比提示 */
function toQueryCompare(attr10, QUOTE_NUMBER1) {
	var request= '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<GetCompareData_Input xmlns="http://siebel.com/CustomUI">'+
	      '<sQuoteNumber>'+ QUOTE_NUMBER1 +'</sQuoteNumber>'+
	      '<sQuoteId>'+ attr10 +'</sQuoteId>'+
	    '</GetCompareData_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:GetCompareData"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

/* 历史列表 */
function toQueryHistory(attr10,attr1) {
	var request= '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<HELHHTBJApproveHistorywsQueryByExample_Input xmlns="http://siebel.com/CustomUI">'+
	     '<ListOfHelHhTbjApproveHistoryIo xmlns="http://www.siebel.com/xml/HELHHTBJApproveHistoryIO">'+
	        '<HelHhTbjApproveHistoryEbc Operation="" Searchspec="">'+
	          '<QUOTE_ID>'+ attr10 +'</QUOTE_ID>'+
	          '<ATTR_01>'+ attr1 +'</ATTR_01>'+
	        '</HelHhTbjApproveHistoryEbc>'+
	      '</ListOfHelHhTbjApproveHistoryIo>'+
	    '</HELHHTBJApproveHistorywsQueryByExample_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHTBJApproveHistorywsQueryByExample"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

/* 价格明细   */
function toQueryPriceDetail(attr10) {
	var request= '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<HELHHTBJPriceListwsQueryByExample_Input xmlns="http://siebel.com/CustomUI">'+
	      '<ListOfHelHhTbjPriceListIo xmlns="http://www.siebel.com/xml/HELHHTBJPriceListIO">'+
	        '<HelHhTbjPriceListEbc Operation="" Searchspec="">'+
	          '<QUOTE_ID>'+ attr10 +'</QUOTE_ID>'+
	        '</HelHhTbjPriceListEbc>'+
	      '</ListOfHelHhTbjPriceListIo>'+
	    '</HELHHTBJPriceListwsQueryByExample_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHTBJPriceListwsQueryByExample"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

/* 审批历史   */
function toQueryTBJHistory(attr10) {
	var request= '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<HELHHTBJApproveHistorywsQueryByExample_Input xmlns="http://siebel.com/CustomUI">'+
	      '<ListOfHelHhTbjApproveHistoryIo xmlns="http://www.siebel.com/xml/HELHHTBJApproveHistoryIO">'+
	        '<HelHhTbjApproveHistoryEbc Operation="" Searchspec="">'+
	          '<QUOTE_ID>'+ attr10 +'</QUOTE_ID>'+
	        '</HelHhTbjApproveHistoryEbc>'+
	      '</ListOfHelHhTbjApproveHistoryIo>'+
	    '</HELHHTBJApproveHistorywsQueryByExample_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHTBJApproveHistorywsQueryByExample"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

/*
 *  zhj 新增tbj审批历史
 * 
 */
function toQueryTBJHistory_zf(bjh,bbh){
	var request= '<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
    '<soap:Body>'+
    '<HELHHADDServiceHISQueryByExample xmlns="http://siebel.com/CustomUI">'+
      '<SiebelMessage xmlns="">'+
        '<listOfHelHhAddServiceApprovedHistoryIo xmlns="http://www.siebel.com/xml/HELHHAddServiceApprovedHistoryIO">'+
         '<helHhAddServiceApprovedHistoryEbc>'+
          '<id/>'+
          '<created/>'+
          '<createdBy/>'+
          '<updated />'+
          '<updatedBy />'+
          '<conflictId />'+
          '<modId />'+
          '<searchspec />'+
          '<approveAllServiceFeeAmount />'+
          '<approveOperation />'+
          '<approvedFirstName />'+
          ' <approvedLastName />'+
          ' <approvedOperation />'+
          '<approvedSuggestion />'+
          '<equDiscountOfSvcFee />'+
          '<equipmentApproveDiscount />'+
          '<suggestServicePoint />'+
         '<opportunityNumber>'+bjh+'</opportunityNumber>'+
        '<quoteRevision>'+ bbh +'</quoteRevision>'+
        '<suggestServicePoint />'+
      '</helHhAddServiceApprovedHistoryEbc>'+
    '</listOfHelHhAddServiceApprovedHistoryIo>'+
  '</SiebelMessage>'+
'</HELHHADDServiceHISQueryByExample>'+
'</soap:Body>'+
'</soap:Envelope>';

var input = {
		method:'post',
		returnedContentType:'xml',
		returnedContentEncoding : 'utf-8',
		headers: {'Accept-Encoding': 'identity','SOAPAction':'"rpc/http://siebel.com/CustomUI:HELHHADDServiceHISQueryByExample"'},
		path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
		body:{
			content:request.toString(),
			contentType:'text/xml;charset=utf-8',
		}
};

var result = WL.Server.invokeHttp(input);
return result.Envelope.Body;
	
}

/*
 * TBJ已审批列表 （分页）
 */
function toQueryTJBAprovedListPage(PageSize, userid, searchText, roleString, viewMode, StartRowNum) {
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<HELHHTBJApprovedwsqpQueryPage_Input xmlns="http://siebel.com/CustomUI">'+
	      '<PageSize>'+ PageSize +'</PageSize>'+
	      '<ListOfHelHhTbjApprovedIo xmlns="http://www.siebel.com/xml/HELHHTBJApprovedIO">'+
	        '<HelHhTbjApprovedEbc Operation="" Searchspec="">'+
	          '<LOGIN_ID>'+ userid +'</LOGIN_ID>';
	          if (searchText != null && searchText != '') {
	        	  request += '<ATTR_02>*'+ searchText +'*</ATTR_02>';
	          }
	          if (roleString != null && roleString != '') {
	        	  request += '<ATTR_03>'+ roleString +'</ATTR_03>';
	          }
	          request += '</HelHhTbjApprovedEbc>'+
	      '</ListOfHelHhTbjApprovedIo>'+
	      '<ViewMode>'+ viewMode +'</ViewMode>'+
	      '<StartRowNum>'+ StartRowNum +'</StartRowNum>'+
	    '</HELHHTBJApprovedwsqpQueryPage_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHTBJApprovedwsqpQueryPage"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

/*
 * TBJ已完成列表 （分页）
 */
function toQueryTJBAproveFinishListPage(PageSize, userid, searchText, roleString, viewMode, StartRowNum) {
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<HELHHTBJApproveFinishedwsqpQueryPage_Input xmlns="http://siebel.com/CustomUI">'+
	      '<PageSize>'+ PageSize +'</PageSize>'+
	      '<ListOfHelHhTbjApproveFinishedIo xmlns="http://www.siebel.com/xml/HELHHTBJApproveFinishedIO">'+
	        '<HelHhTbjApproveFinishedEbc Operation="" Searchspec="">'+
	          '<ATTR_02>*'+ searchText +'*</ATTR_02>'+
	          '<ATTR_03>'+ roleString +'</ATTR_03>';
	          if (userid != null && userid != '') {
	        	  request +='<LOGIN_ID>'+ userid +'</LOGIN_ID>';
	          }
	          request += '</HelHhTbjApproveFinishedEbc>'+
	      '</ListOfHelHhTbjApproveFinishedIo>'+
	      '<ViewMode>'+ viewMode +'</ViewMode>'+
	      '<StartRowNum>'+ StartRowNum +'</StartRowNum>'+
	    '</HELHHTBJApproveFinishedwsqpQueryPage_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHTBJApproveFinishedwsqpQueryPage"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}


function addServiceToPass(UserName, Password, recordId, serviceFeeAcceptSum) {
//	var connectString = getStsyemInfo("ConnectString");
//	var Lang = getStsyemInfo("Language");
	var aoi = new com.helc.helcapprove.addServiceOption.ASPApproveOperation();
//	aoi.setConnectString(connectString);
//	aoi.setLang(Lang);
	return {
		result: aoi.pass(UserName, Password, recordId, serviceFeeAcceptSum)
	};
}


function addServiceToProcessReserve(UserName, Password, recordId, serviceFeeAcceptSum) {
//	var connectString = getStsyemInfo("ConnectString");
//	var Lang = getStsyemInfo("Language");
	var aoi = new com.helc.helcapprove.addServiceOption.ASPApproveOperation();
//	aoi.setConnectString(connectString);
//	aoi.setLang(Lang);
	return {
		result: aoi.reserve(UserName, Password, recordId, serviceFeeAcceptSum)
	};
}

function addServiceToRefuse(UserName, Password, recordId, serviceFeeAcceptSum) {
//	var connectString = getStsyemInfo("ConnectString");
//	var Lang = getStsyemInfo("Language");
	var aoi = new com.helc.helcapprove.addServiceOption.ASPApproveOperation();
//	aoi.setConnectString(connectString);
//	aoi.setLang(Lang);
	return {
		result: aoi.refuse(UserName, Password, recordId, serviceFeeAcceptSum)
	};
}

/**
 * 
 * @param selectedTBJId
 * @param serviceFee
 * @param proportion
 * @param tbjApproveMain
 * @returns {___anonymous16593_16693}
 */
function approveToPass(UserName, Password, selectedTBJId, serviceFee, proportion, tbjApproveMain) {
	var aoi = new com.helc.helcapprove.tbjoption.ApproveOperationImpl();
	return {
		//result:com.helc.helcapprove.tbjoption.ApproveOperationImpl
		result: aoi.pass(UserName, Password, selectedTBJId, serviceFee, proportion, tbjApproveMain)
	};
}
/**
 * 
 * @param UserName
 * @param Password
 * @param selectedTBJId
 * @param serviceFee
 * @param proportion
 * @param tbjApproveMain
 * @returns {___anonymous17170_17330}
 */
function approveToReserve(UserName, Password, selectedTBJId, serviceFee, proportion, tbjApproveMain) {
	var aoi = new com.helc.helcapprove.tbjoption.ApproveOperationImpl();
	return {
		//result:com.helc.helcapprove.tbjoption.ApproveOperationImpl
		result: aoi.reserve(UserName, Password, selectedTBJId, serviceFee, proportion, tbjApproveMain)
	};
}
/**
 * 
 * @param UserName
 * @param Password
 * @param selectedTBJId
 * @param serviceFee
 * @param proportion
 * @param tbjApproveMain
 * @returns {___anonymous17170_17330}
 */
function approveToRefuse(UserName, Password, selectedTBJId, serviceFee, proportion, tbjApproveMain) {
	var aoi = new com.helc.helcapprove.tbjoption.ApproveOperationImpl();
	return {
		//result:com.helc.helcapprove.tbjoption.ApproveOperationImpl
		result: aoi.refuse(UserName, Password, selectedTBJId, serviceFee, proportion, tbjApproveMain)
	};
}

function AddServiceApproved(userid) {
	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		  '<soap:Body>'+
		    '<HELHHAddSvcAppedQueryByExample_Input xmlns="http://siebel.com/CustomUI">'+
		      '<listOfHelHhAddServiceApprovedIo xmlns="http://www.siebel.com/xml/HEL%20HH%20Add%20Service%20Approved%20IO">'+
		        '<helHhAddServiceApprovedEbc operation="">'+
		          '<aTTR_01 />'+
		          '<aTTR_02 />'+
		          '<aTTR_03 />'+
		          '<aTTR_04 />'+
		          '<aTTR_05 />'+
		          '<aTTR_06 />'+
		          '<aTTR_07 />'+
		          '<aTTR_08 />'+
		          '<aTTR_09 />'+
		          '<aTTR_10 />'+
		          '<bUSINESS_TYPE />'+
		          '<cONTRACT_ID />'+
		          '<dELIVERY_CYCLE />'+
		          '<lOGIN_ID>'+userid+'</lOGIN_ID>'+
		          '<oPPORTUNITY />'+
		          '<oPPORTUNITY_ACCOUNT />'+
		          '<oPPORTUNITY_ACCOUNT_TYPE />'+
		          '<oRGANIZATION_OPPTY />'+
		          '<qUOTE_FINAL_USER />'+
		          '<qUOTE_NUMBER1 />'+
		          '<rEVISION />'+
		          '<tBJ_APPROVED_DATE />'+
		          '<tECH_APPROVER_NAME />'+
		          '<tO_BE_APP_POSTN_ID />'+
		        '</helHhAddServiceApprovedEbc>'+
		      '</listOfHelHhAddServiceApprovedIo>'+
		    '</HELHHAddSvcAppedQueryByExample_Input>'+
		  '</soap:Body>'+
		'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHAddSvcAppedQueryByExample"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;

}

function AddServiceApprovePending(userid,roleString) {
	var request='<?xml version="1.0" encoding="utf-8"?>'+
				'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
				 '<soap:Body>'+
				 '  <HELHHADDSVCQueryByExample_Input xmlns="http://siebel.com/CustomUI">'+
				 '     <listOfHelHhAddServiceApprovePendingIo xmlns="http://www.siebel.com/xml/HEL%20HH%20Add%20Service%20Approve%20Pending%20IO">'+
				 '      <helHhAddServiceApprovePendingEbc operation="">'+
				 '         <id />'+
				 '        <created />'+
				 '         <createdBy />'+
				 '         <updated />'+
				 '         <updatedBy />'+
				 '         <conflictId />'+
				 '         <modId />'+
				 '         <searchspec />'+
				 '         <aDD_SVC_APPROVE_STATUS />'+
				 '         <aPPROVEDBY_NAME />'+
				 '         <aTTR_01 />'+
				 '         <aTTR_02 />'+
				 '         <aTTR_03 >'+roleString+'</aTTR_03>'+
				 '         <aTTR_04 />'+
				 '         <aTTR_05 />'+
				 '         <aTTR_06 />'+
				 '         <aTTR_07 />'+
				 '         <aTTR_08 />'+
				 '         <aTTR_09 />'+
				 '         <aTTR_10 />'+
				 '         <bUSINESS_TYPE />'+
				 '         <cONTRACT_ID />'+
				 '         <dELIVERY_CYCLE />'+
				 '         <lOGIN_ID>'+userid+'</lOGIN_ID>'+
				 '         <oPPORTUNITY />'+
				 '         <oPPORTUNITY_ACCOUNT />'+
				 '         <oPPORTUNITY_ACCOUNT_TYPE />'+
				 '         <oRGANIZATION_OPPTY />'+
				 '         <qUOTE_FINAL_USER />'+
				 '         <qUOTE_NUMBER1 />'+
				 '         <rEVISION />'+
				 '         <tBJ_APPROVED_DATE />'+
				 '         <tECH_APPROVER_NAME />'+
				 '         <tO_BE_APP_POSTN_ID />'+
				 '       </helHhAddServiceApprovePendingEbc>'+
				 '     </listOfHelHhAddServiceApprovePendingIo>'+
				 '   </HELHHADDSVCQueryByExample_Input>'+
				 ' </soap:Body>'+
				 '</soap:Envelope>';

		var input = {
				method:'post',
				returnedContentType:'xml',
				returnedContentEncoding : 'utf-8',
				path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
				headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHADDSVCQueryByExample"'},
				body:{
					content:request.toString(),
					contentType:'text/xml;charset=utf-8',
				}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;

}

function TBJApproveHistory(QUOTE_ID) {
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		  '<soap:Body>'+
		    '<HELHHTBJApproveHistorywsQueryByExample_Input xmlns="http://siebel.com/CustomUI">'+
		      '<ListOfHelHhTbjApproveHistoryIo xmlns="http://www.siebel.com/xml/HELHHTBJApproveHistoryIO">'+
		        '<HelHhTbjApproveHistoryEbc Operation="" Searchspec="">'+
		          '<Id />'+
		          '<Created />'+
		          '<CreatedBy />'+
		          '<Updated />'+
		          '<UpdatedBy />'+
		          '<ConflictId />'+
		          '<ModId />'+
		          '<APPROVED_BY_NAME />'+
		          '<APPROVED_DATE />'+
		          '<APPROVED_OPERATION />'+
		          '<APPROVED_SUGGESTION />'+
		          '<ATTR_01 />'+
		          '<ATTR_02 />'+
		          '<ATTR_03 />'+
		          '<ATTR_04 />'+
		          '<ATTR_05 />'+
		          '<ATTR_06 />'+
		          '<ATTR_07 />'+
		          '<ATTR_08 />'+
		          '<ATTR_09 />'+
		          '<ATTR_10 />'+
		          '<QUOTE_ID>'+QUOTE_ID+'</QUOTE_ID>'+
		          '<SERVICE_POINT />'+
		          '<SUGGEST_SERVICE_POINT />'+
		        '</HelHhTbjApproveHistoryEbc>'+
		      '</ListOfHelHhTbjApproveHistoryIo>'+
		    '</HELHHTBJApproveHistorywsQueryByExample_Input>'+
		  '</soap:Body>'+
		'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHTBJApproveHistorywsQueryByExample"'},
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
	
}

function TBJApproveMain(ATTR_10) {
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		  '<soap:Body>'+
		    '<HELHHTBJApproveMainwsQueryByExample_Input xmlns="http://siebel.com/CustomUI">'+
		      '<ListOfHelHhTbjApproveMainIo xmlns="http://www.siebel.com/xml/HELHHTBJApproveMainIO">'+
		        '<HelHhTbjApproveMainEbc Operation="" Searchspec="">'+
		          '<Id />'+
		          '<Created />'+
		          '<CreatedBy />'+
		          '<Updated />'+
		          '<UpdatedBy />'+
		          '<ConflictId />'+
		          '<ModId />'+
		          '<ATTR_01 />'+
		          '<ATTR_02 />'+
		          '<ATTR_03 />'+
		          '<ATTR_04 />'+
		          '<ATTR_05 />'+
		          '<ATTR_06 />'+
		          '<ATTR_07 />'+
		          '<ATTR_08 />'+
		          '<ATTR_09 />'+
		          '<ATTR_10>'+ATTR_10+'</ATTR_10>'+
		          '<BUSINESS_TYPE />'+
		          '<CONTRACT_ID />'+
		          '<DEDUCT_SUGS_POT_EQU_DISCOUNT />'+
		          '<DELIVERY_CYCLE />'+
		          '<ELEVATOR_SUM_QUANTITY />'+
		          '<ENGINEER_APPROVE_DISCOUNT />'+
		          '<ENGINEER_FORWARD_PRICE />'+
		          '<ENGINEER_PRICE />'+
		          '<EQUIPMENT_APPROVE_DISCOUNT />'+
		          '<EQUIPMENT_APPROVE_DISCOUNT2 />'+
		          '<EQUIPMENT_FORWARD_PRICE />'+
		          '<EQUIPMENT_FORWARD_PRICE2 />'+
		          '<EQUIPMENT_PRICE />'+
		          '<ESCALATOR_SUM_QUANTITY />'+
		          '<GUARANTEE_QUALITY_MONTHS />'+
		          '<HEAD_PRICE />'+
		          '<HEL_AGENCY_DISCOUNT />'+
		          '<HEL_AGENCY_INSTALL_PRICE />'+
		          '<HEL_AGENCY_INSTAL_PRICE_DIS />'+
		          '<HEL_AGENCY_PRICE />'+
		          '<HEL_TOTAL_ATTACH_PRICE />'+
		          '<ITM_SUM_PRICE />'+
		          '<OPPORTUNITY_ACCOUNT />'+
		          '<OPPORTUNITY_ACCOUNT_TYPE />'+
		          '<OPPTY_CONTRACT_TYPE />'+
		          '<ORGANIZATION_OPPTY />'+
		          '<QUOTE_FINAL_USER />'+
		          '<QUOTE_NUMBER1 />'+
		          '<RATE_NOAPP_SERVICES />'+
		          '<RATE_NO_SERVICES />'+
		          '<SALES_TEAM />'+
		          '<SERVICE_POINT_TOTAL />'+
		          '<SHIPPING_APPROVE_DISCOUNT />'+
		          '<SHIPPING_FORWARD_PRICE />'+
		          '<SHIPPING_PRICE />'+
		          '<TBJ_APPROVED_SUGGESTION />'+
		          '<TECH_APPROVER_NAME />'+
		          '<THREE_AGREEMENT_PRICE />'+
		          '<THREE_AGREEMENT_PRICE2 />'+
		          '<THREE_AGREEMENT_PRICE_DISCOUNT />'+
		          '<THREE_AGR_PRICE_DIS2 />'+
		          '<TOTAL_APPROVE_SERVICE_POINT />'+
		          '<ATTR_11 />'+
		          '<ATTR_12 />'+
		          '<ATTR_13 />'+
		          '<ATTR_14 />'+
		          '<ATTR_15 />'+
		          '<ATTR_16 />'+
		          '<ATTR_17 />'+
		          '<ATTR_18 />'+
		          '<ATTR_19 />'+
		          '<ATTR_20 />'+
		        '</HelHhTbjApproveMainEbc>'+
		      '</ListOfHelHhTbjApproveMainIo>'+
		    '</HELHHTBJApproveMainwsQueryByExample_Input>'+
		  '</soap:Body>'+
		'</soap:Envelope>';

		var input = {
				method:'post',
				returnedContentType:'xml',
				returnedContentEncoding : 'utf-8',
				path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
				headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHTBJApproveMainwsQueryByExample"'},
				body:{
					content:request.toString(),
					contentType:'text/xml;charset=utf-8',
				}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;

}

function TBJServiceFee(QUOTE_ID) {
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		  '<soap:Body>'+
		    '<HELHHTBJServiceFeewsQueryByExample_Input xmlns="http://siebel.com/CustomUI">'+
		      '<ListOfHelHhTbjServiceFeeIo xmlns="http://www.siebel.com/xml/HELHHTBJServiceFeeIO">'+
		        '<HelHhTbjServiceFeeEbc Operation="" Searchspec="">'+
		          '<Id />'+
		          '<Created />'+
		          '<CreatedBy />'+
		          '<Updated />'+
		          '<UpdatedBy />'+
		          '<ConflictId />'+
		          '<ModId />'+
		          '<AGENT_NAME />'+
		          '<APPROVE_COMMENT />'+
		          '<APPROVE_SERVICE_POINT />'+
		          '<ATTR_01 />'+
		          '<ATTR_02 />'+
		          '<ATTR_03 />'+
		          '<ATTR_04 />'+
		          '<ATTR_05 />'+
		          '<ATTR_06 />'+
		          '<ATTR_07 />'+
		          '<ATTR_08 />'+
		          '<ATTR_09 />'+
		          '<ATTR_10 />'+
		          '<DESCRIPTION />'+
		          '<QUOTE_ID>'+QUOTE_ID+'</QUOTE_ID>'+
		          '<SERVICE_POINT />'+
		          '<APPRV_OP1_OLD />'+
		          '<APPRV_OP2_OLD />'+
		          '<APPRV_OP3_OLD />'+
		          '<APPRV_OP4_OLD />'+
		          '<APPRV_OP5_OLD />'+
		          '<APPROVE_ADD_PT1_OLD />'+
		          '<APPROVE_ADD_PT2_OLD />'+
		          '<APPROVE_ADD_PT3_OLD />'+
		          '<APPROVE_ADD_PT4_OLD />'+
		          '<APPROVE_ADD_PT5_OLD />'+
		        '</HelHhTbjServiceFeeEbc>'+
		      '</ListOfHelHhTbjServiceFeeIo>'+
		    '</HELHHTBJServiceFeewsQueryByExample_Input>'+
		  '</soap:Body>'+
		'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHTBJServiceFeewsQueryByExample"'},
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
	
}

function TBJProdRate(QUOTE_ID) {
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		  '<soap:Body>'+
		    '<HELHHTBJProdRatewsQueryByExample_Input xmlns="http://siebel.com/CustomUI">'+
		      '<ListOfHelHhTbjProdRateIo xmlns="http://www.siebel.com/xml/HELHHTBJProdRateIO">'+
		        '<HelHhTbjProdRateEbc Operation="" Searchspec="">'+
		          '<Id />'+
		          '<Created />'+
		          '<CreatedBy />'+
		          '<Updated />'+
		          '<UpdatedBy />'+
		          '<ConflictId />'+
		          '<ModId />'+
		          '<ATTR_01 />'+
		          '<ATTR_02 />'+
		          '<ATTR_03 />'+
		          '<ATTR_04 />'+
		          '<ATTR_05 />'+
		          '<ATTR_06 />'+
		          '<ATTR_07 />'+
		          '<ATTR_08 />'+
		          '<ATTR_09 />'+
		          '<ATTR_10 />'+
		          '<AVG_RATE_ADDJ />'+
		          '<AVG_RATE_APP />'+
		          '<EQU_AVERAGE_SCALE />'+
		          '<EXPECTATION_PRICE />'+
		          '<PRODUCT />'+
		          '<QTY />'+
		          '<QUOTE_ID>'+QUOTE_ID+'</QUOTE_ID>'+
		          '<SPL_PRICE />'+
		        '</HelHhTbjProdRateEbc>'+
		      '</ListOfHelHhTbjProdRateIo>'+
		    '</HELHHTBJProdRatewsQueryByExample_Input>'+
		  '</soap:Body>'+
		'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHTBJProdRatewsQueryByExample"'},
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
	
}
	
	function TBJApprovePay(QUOTE_ID) {
		var request='<?xml version="1.0" encoding="utf-8"?>'+
			'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
			  '<soap:Body>'+
			    '<HELHHTBJApprovePaywsQueryByExample_Input xmlns="http://siebel.com/CustomUI">'+
			      '<ListOfHelHhTbjApprovePayIo xmlns="http://www.siebel.com/xml/HELHHTBJApprovePayIO">'+
			        '<HelHhTbjApprovePayEbc Operation="" Searchspec="">'+
			          '<Id />'+
			          '<Created />'+
			          '<CreatedBy />'+
			          '<Updated />'+
			          '<UpdatedBy />'+
			          '<ConflictId />'+
			          '<ModId />'+
			          '<ATTR_01 />'+
			          '<ATTR_02 />'+
			          '<ATTR_03 />'+
			          '<ATTR_04 />'+
			          '<ATTR_05 />'+
			          '<ATTR_06 />'+
			          '<ATTR_07 />'+
			          '<ATTR_08 />'+
			          '<ATTR_09 />'+
			          '<ATTR_10 />'+
			          '<CONTRACT_TYPE />'+
			          '<DESCRIPTION />'+
			          '<FUND_NAME />'+
			          '<ORDER_BY />'+
			          '<PROMPT />'+
			          '<QUOTE_ID>'+QUOTE_ID+'</QUOTE_ID>'+
			          '<RATIO />'+
			        '</HelHhTbjApprovePayEbc>'+
			      '</ListOfHelHhTbjApprovePayIo>'+
			    '</HELHHTBJApprovePaywsQueryByExample_Input>'+
			  '</soap:Body>'+
			'</soap:Envelope>';
		
		var input = {
				method:'post',
				returnedContentType:'xml',
				returnedContentEncoding : 'utf-8',
				path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
				headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHTBJApprovePaywsQueryByExample"'},
				body:{
					content:request.toString(),
					contentType:'text/xml;charset=utf-8',
				}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
		
	}
	
	function AddServiceApprove(loginuser,roleString,searchSpec,pageSize,startRowNum,viewMode) {
		var request='<?xml version="1.0" encoding="utf-8"?>'+
			'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
			  '<soap:Body>'+
			    '<HELHHAddSvcAppedQueryPage_Input xmlns="http://siebel.com/CustomUI">'+
			      '<PageSize>'+pageSize+'</PageSize>'+
			      '<listOfHelHhAddServiceApprovedIo xmlns="http://www.siebel.com/xml/HEL%20HH%20Add%20Service%20Approved%20IO">'+
			        '<helHhAddServiceApprovedEbc operation="">';
			        if (roleString != undefined && roleString != '') {
			        	request += '<aTTR_03>'+roleString+'</aTTR_03>';
			        };
			        if (searchSpec != undefined && searchSpec != '') {
			        	request += '<aTTR_02>'+searchSpec+'</aTTR_02>';
			        };
			          
			        request += '<lOGIN_ID>'+loginuser+'</lOGIN_ID>'+
			        '</helHhAddServiceApprovedEbc>'+
			      '</listOfHelHhAddServiceApprovedIo>'+
			      '<ViewMode>'+viewMode+'</ViewMode>'+
			      '<StartRowNum>'+startRowNum+'</StartRowNum>'+
			    '</HELHHAddSvcAppedQueryPage_Input>'+
			  '</soap:Body>'+
			'</soap:Envelope>';
		
		var input = {
				method:'post',
				returnedContentType:'xml',
				returnedContentEncoding : 'utf-8',
				path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&'+str_conect_name_pwd,
				headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/CustomUI:HELHHAddSvcAppedQueryPage"'},
				body:{
					content:request.toString(),
					contentType:'text/xml;charset=utf-8',
				}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
		
	}
	
	/* 价格明细   */
	function toQueryPriceDetailnew(userID,attr10,type) {
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
    '<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
    '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+ 
	 '<soap:Body>'+
	    '<QuoteUnfoQuery_Input xmlns="http://siebel.com/Sales/QuoteUnfo">'+
	      '<SearchSpec>[Quote.Id] ="'+attr10+'"</SearchSpec>'+
	     // '<SearchSpec>[Quote.Id] ="1-32YDYF"</SearchSpec>'+
	      '<ViewMode>'+type+'</ViewMode>'+
	    '</QuoteUnfoQuery_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
		
		var input = {
				method:'post',
				returnedContentType:'xml',
				returnedContentEncoding : 'utf-8',
				headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/QuoteUnfo:QuoteUnfoQuery"'},
				path:'/eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
				body:{
					content:request.toString(),
					contentType:'text/xml;charset=utf-8',
				}
		};
		
		var result = WL.Server.invokeHttp(input);
		return result.Envelope.Body;
	}

