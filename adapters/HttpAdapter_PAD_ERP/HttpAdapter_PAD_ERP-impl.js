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
//查询ERP
function toERPcontractSeacher(p_elevaotr_id){
	//方法是：ELEVATOR_INFO
	var request='<?xml version="1.0" encoding="utf-8"?>'
	+'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'
	+'<soap:Body>'
	+'<ELEVATOR_INFO xmlns="http://service.spring.demo/">'
	+'<arg0 xmlns="">'+p_elevaotr_id+'</arg0>'
	+'</ELEVATOR_INFO>'
	+'</soap:Body>'
	+'</soap:Envelope>';
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/erpws_contract/services/erp_ws',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			},
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
	}
   
//获得箱头状态详细信息
function toERP_BoxInfo(p_elvbox_id){
	var request='<?xml version="1.0" encoding="utf-8"?>'
	+'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'
	+'<soap:Body>'
	+'<ELVBOX_INFO xmlns="http://service.spring.demo/">'
	+'<arg0 xmlns="">'+p_elvbox_id+'</arg0>'
	+'</ELVBOX_INFO>'
	+'</soap:Body>'
	+'</soap:Envelope>';
	var input = {
			method:'post',
			returnedContentType:'xml',
			returnedContentEncoding : 'utf-8',
			path:'/erpws_contract/services/erp_ws',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			},
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
	}


//合同资料Erp查询
function toErpcontractSeacher(ContractNumber,ContractType,CustomerName,AssetNumber,FinalUser,BigCustomer,erpuserID){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	   ' <CONTRACT_HEADERS_LIST xmlns="http://service.spring.demo/">'+
	      '<arg0 xmlns="">'+ContractNumber+'</arg0>'+
	      '<arg1 xmlns="">'+ContractType+'</arg1>'+
	      '<arg2 xmlns="">'+CustomerName+'</arg2>'+
	      '<arg3 xmlns="">'+AssetNumber+'</arg3>'+
	      '<arg4 xmlns="" />'+
	      '<arg5 xmlns="" />'+
	      '<arg6 xmlns="">'+FinalUser+'</arg6>'+
	      '<arg7 xmlns="">'+BigCustomer+'</arg7>'+
	      '<arg8 xmlns=""/>'+
	      '<arg9 xmlns="">'+erpuserID+'</arg9>'+
	    '</CONTRACT_HEADERS_LIST>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			returnedContentEncoding : 'utf-8',
			//headers: {'SOAPAction':'"document/http://siebel.com/PDAContractsInfo:ContractListQueryByExample"'},
			//headers: {'SOAPAction':'"document/http://siebel.com/PDAContractsInfo:ContractDetailQueryByExample"'},
			//path:'/eai_chs/start.swe?SWEExtSource=WebService&amp;SWEExtCmd=Execute&amp;UserName=SADMIN&amp;Password=SADMIN',
			path:'erpws_contract/services/erp_ws/CONTRACT_HEADERS_LIST',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}


//合同资料Erp工号列表
function toErpcontractNoList(contract_header_id){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	  '<soap:Body>'+
	    '<CONTRACT_HEADERS_INFO xmlns="http://service.spring.demo/">'+
	      '<arg0 xmlns="">'+contract_header_id+'</arg0>'+
	    '</CONTRACT_HEADERS_INFO>'+
	  '</soap:Body>'+
	'</soap:Envelope>';

	var input = {
			method:'post',
			returnedContentType:'xml',         
			returnedContentEncoding : 'utf-8',
			path:'erpws_contract/services/erp_ws?wsdl',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//合同资料Erp详细信息
function toErpcontractList(ContractNumber){
	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
				'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
				'<soap:Body>'+
	    		'<ContractDetailQueryByExample_Input xmlns="http://siebel.com/PDAContractsInfo">'+
	      		'<ListOfHelPdaContractsDetailIo xmlns="http://www.siebel.com/xml/HEL%20PDA%20Contracts%20Detail%20IO">'+
	        	'<HelPdaQuoteHeaders Operation="">'+
	          		'<Id />'+
	          		'<Created />'+
	          		'<CreatedBy />'+
	          		'<Updated />'+
	          		'<UpdatedBy />'+
	          		'<ConflictId />'+
	          		'<ModId />'+
	          		'<Searchspec />'+
	          		'<AccountKaNumber />'+
	          		'<ActiveFlg />'+
	          		'<AllotName />'+
	          		'<AlterNum />'+
	          		'<ApplicantName />'+
	          		'<ApproveFinishDate />'+
	          		'<Attrib1 />'+
	          		'<Attrib10 />'+
	          		'<Attrib11 />'+
	          		'<Attrib12 />'+
	          		'<Attrib13 />'+
	          		'<Attrib14 />'+
	          		'<Attrib15 />'+
	          		'<Attrib16 />'+
	          		'<Attrib2 />'+
	          		'<Attrib3 />'+
	          		'<Attrib4 />'+
	          		'<Attrib5 />'+
	          		'<Attrib6 />'+
	          		'<Attrib7 />'+
	          		'<Attrib8 />'+
	          		'<Attrib9 />'+
	          		'<BpReceivedDt />'+
	          		'<BpRefuseDt />'+
	          		'<BpStampingDt />'+
	          		'<BranchFinishDate />'+
	          		'<BranchTechChecker />'+
	          		'<ContractEmployee />'+
	          		'<ContractImportFlag />'+
	          		'<ContractNumber>'+ContractNumber+'</ContractNumber>'+
	          		'<ContractReceiveDate />'+
	          		'<ContractType />'+
	          		'<CreditClientNum />'+
	          		'<CreditLevel />'+
	          		'<Description />'+
	          		'<DistributionDate />'+
	          		'<ElevatorSumQuantity />'+
	          		'<EscalatorSumQuantity />'+
	          		'<FdkFlag />'+
	          		'<HeadFinishDate />'+
	          		'<HqRepName />'+
	          		'<InquireNum />'+
	          		'<InstallUnit />'+
	          		'<ItmSumQuantity />'+
	          		'<Judgement />'+
	          		'<LargeProject />'+
	          		'<OpportunityAccount />'+
	          		'<OpptyAccountType />'+
	          		'<OptyName />'+
	          		'<OrgName />'+
	          		'<PreProduct />'+
	          		'<PreaprCreated />'+
	          		'<PreaprFinishDt />'+
	          		'<PreaprSts />'+
	          		'<PreaprSubmitDt />'+
	          		'<PromiseReplyDt />'+
	          		'<QuoteCreated />'+
	          		'<QuoteFinalUser />'+
	          		'<QuoteId />'+
	          		'<QuoteImportFlag />'+
	          		'<QuoteImportTimes />'+
	          		'<QuoteNum />'+
	          		'<RevNum />'+
	          		'<RiskyLevel />'+
	          		'<SaleResp />'+
	          		'<ServicePointStatus />'+
	          		'<TbjApproveStatus />'+
	          		'<TbjApprovedParentPosition />'+
	          		'<TbjCommitDate />'+
	          		'<TbjCompleteDate />'+
	          		'<TechApproceName />'+
	          		'<TechSubmitDate />'+
	          		'<TechSubmitter />'+
	          		'<TechnicalApprovePerson />'+
	          		'<TechnicalApproveStatus />'+
	          		'<WgtTotalQuantity />'+
	          		'<ListOfHelPdaQuoteLines>'+
	          		'<HelPdaQuoteLines Operation="">'+
	          			'<Id />'+
	          			'<Created />'+
	          			'<CreatedBy />'+
	          			'<Updated />'+
	          			'<UpdatedBy />'+
	          			'<ConflictId />'+
	          			'<ModId />'+
	          			'<Searchspec />'+
	          			'<AssetNumber />'+
	          			'<Attrib1 />'+
	          			'<Attrib2 />'+
	          			'<Attrib3 />'+
	          			'<Attrib4 />'+
	          			'<Attrib5 />'+
	          			'<Attrib6 />'+
	          			'<Attrib7 />'+
	          			'<Attrib8 />'+
	          			'<Attrib9 />'+
	          			'<CZM />'+
	          			'<EquipCategory />'+
	          			'<EquipMark />'+
	          			'<Fttsgd />'+
	          			'<Jd />'+
	          			'<ProdCategory />'+
	          			'<ProductName />'+
	          			'<QuoteId />'+
	          			'<Sdthkhjhts />'+
	          			'<Sdyfkhjhts />'+
	          			'<SpNumber />'+
	          		'</HelPdaQuoteLines>'+
	          '</ListOfHelPdaQuoteLines>'+
	        '</HelPdaQuoteHeaders>'+
	      '</ListOfHelPdaContractsDetailIo>'+
	    '</ContractDetailQueryByExample_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',    
			returnedContentEncoding : 'utf-8',
			headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/PDAContractsInfo:ContractDetailQueryByExample"'},
			path:'/eai_chs/start.swe?SWEExtSource=WebService&amp;SWEExtCmd=Execute&amp;UserName=SADMIN&amp;Password=SADMIN',
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//排产历史记录
function toErppcjl(schedule_header_id){
	var request='<?xml version="1.0" encoding="utf-8"?>'
		+'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'
	    +'<soap:Body>'
	    +'<ALREADY_SCHEDULE xmlns="http://service.spring.demo/">'
	    +'<arg0 xmlns="">'+ schedule_header_id+'</arg0>'
	    +'</ALREADY_SCHEDULE>'
	    +'</soap:Body>'
	    +'</soap:Envelope>';

var input = {
		method:'post',
		returnedContentType:'xml',       
		returnedContentEncoding : 'utf-8',
		path:'erpws_contract/services/erp_ws?wsdl',
		body:{
			content:request.toString(),
			contentType:'text/xml;charset=utf-8',
		}
};

var result = WL.Server.invokeHttp(input);

return result.Envelope.Body;
}




