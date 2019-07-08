/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADPbuildNewOppty Schedule Contract with IBM Corp.
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


//客户资料查询  暂时  2015-8-7
function toCustomSeacher(SearchSpec,viewmodel,userID){

	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
    '<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
    '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+    
	'<soap:Body>'+
	    '<QueryAccount_Input xmlns="http://siebel.com/Sales/AccQuery">'+
	    '<SearchSpec>'+SearchSpec+'</SearchSpec>'+
		'<ViewMode>'+viewmodel+'</ViewMode>'+
	    '</QueryAccount_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	    
	WL.Logger.error("客户资料"+request.toString());
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/AccQuery:QueryAccount"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}


//客户详细资料    2015-8-11
function toCustomInfo(rowid,viewmodel,userID){
	var request='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:acc="http://siebel.com/Sales/AccDetail" xmlns:hel="http://www.siebel.com/xml/HEL%20EAI%20APP%20Account%20Detail">'+
	   '<soapenv:Header>'+
	      '<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
	      '<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
	   '</soapenv:Header>'+
	   '<soapenv:Body>'+
	      '<acc:AccDetailQueryById_Input>'+
	         '<acc:PrimaryRowId>'+rowid+'</acc:PrimaryRowId>'+
	         '<hel:ListOfHelEaiAppAccountDetail>'+
	            '<hel:Account Operation="" Searchspec="">'+
	              
	            '</hel:Account>'+
	         '</hel:ListOfHelEaiAppAccountDetail>'+
	      '</acc:AccDetailQueryById_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';
		
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/AccDetail:AccDetailQueryById"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//客户资料    同步EBS
function toCustomInfo_TBEBS(rowId,userID){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
        '<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
        '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
		'<soap:Body>'+
	    '<TransferToEBS_Input xmlns="http://siebel.com/Sales/AccQuery">'+
	      '<RecordId>'+rowId+'</RecordId>'+
	    '</TransferToEBS_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/AccQuery:TransferToEBS"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//申请使用 
function toCustomSQSY(
		/*ApplyType1,AccountNumber1,EBSCustomerName1,CertifiAddress1,Extraordinary1,
		OrgCodeNumber1,OrgCodeDate1,AccountClass1,AccountSort1,TaxRegist1,
		Associate1,Region1,SmallScaleTaxpayer1,HQEBSCustomerId1,HQEBSCustomerSiteId1,
		AccountGroup1,HeadStatus,AddressStatus,
		//Country,Province,City,StreetAddress,PostalCode,
		Account,
		Contact1,MainPhoneNumber,
		MainFaxNumber,AccountAttribute,AccountProperty,AccountMPType,Name,
		Type,*/
		Trim,
		userID){
	
	                
	 var request='<?xml version="1.0" encoding="utf-8"?>'+
	                '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	                '<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
	    	        '<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
	    	        '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+    
	                '<soap:Body>'+
	                    '<ApplyUse_Input xmlns="http://siebel.com/Sales/AccApply">'+
	                      '<ListOfEaiApplyAccountTest xmlns="http://www.siebel.com/xml/EAI%20Apply%20Account%20Test">'+
	                        '<EaiApplyAccount Operation="">'+     
	          '<AccountAttribute>'+Trim.AccountAttribute+'</AccountAttribute>'+
	          '<AccountClass1>'+Trim.AccountClass1+'</AccountClass1>'+
	          '<AccountGroup1>'+Trim.AccountGroup1+'</AccountGroup1>'+
	          '<AccountMPType>'+Trim.AccountMPType+'</AccountMPType>'+
	          '<AccountNumber1>'+Trim.AccountNumber1+'</AccountNumber1>'+
	          '<AccountProperty>'+Trim.AccountProperty+'</AccountProperty>'+
	          '<AccountSort1>'+Trim.AccountSort1+'</AccountSort1>'+
	          '<AddressStatus>'+Trim.AddressStatus+'</AddressStatus>'+
	          '<ApplyType1>'+Trim.ApplyType1+'</ApplyType1>'+
	          '<Associate1>'+Trim.Associate1+'</Associate1>'+
	          '<CertifiAddress1>'+Trim.CertifiAddress1+'</CertifiAddress1>'+
	          '<Contact1>'+Trim.Contact1+'</Contact1>'+
	          '<EBSCustomerName1>'+Trim.EBSCustomerName1+'</EBSCustomerName1>'+
	          '<Extraordinary1>'+Trim.Extraordinary1+'</Extraordinary1>'+
	          '<HQEBSCustomerId1>'+Trim.HQEBSCustomerId1+'</HQEBSCustomerId1>'+
	          '<HQEBSCustomerSiteId1>'+Trim.HQEBSCustomerSiteId1+'</HQEBSCustomerSiteId1>'+
	          '<HeadStatus>'+Trim.HeadStatus+'</HeadStatus>'+
	          '<MainFaxNumber>'+Trim.MainFaxNumber+'</MainFaxNumber>'+
	          '<MainPhoneNumber>'+Trim.MainPhoneNumber+'</MainPhoneNumber>'+
	          '<Name>'+Trim.EBSCustomerName1+'</Name>'+
	          '<OrgCodeDate1>'+Trim.OrgCodeDate1+'</OrgCodeDate1>'+
	          '<OrgCodeNumber1>'+Trim.OrgCodeNumber1+'</OrgCodeNumber1>'+
	          //'<PrimaryOrganization />'+
	          '<PrimaryOrganizationId></PrimaryOrganizationId>'+   //必要的试试
	          '<Region1>'+Trim.Region1+'</Region1>'+
	          //'<RowId />'+
	          '<SmallScaleTaxpayer1>'+Trim.SmallScaleTaxpayer1+'</SmallScaleTaxpayer1>'+
	          '<TaxRegist1>'+Trim.TaxRegist1+'</TaxRegist1>'+
	          '<Type>'+Trim.Type+'</Type>';
	          
			  for(var i=0;i<Trim.Account.length;i++){
				  request+='<ListOfEAIApplyAccount_BusinessAddress>'+
		            '<EAIApplyAccount_BusinessAddress Operation="">'+
		              '<Searchspec />'+
		              '<AddressId>'+Trim.Account[i].AddressId+'</AddressId>'+//这个还要。
		              '<City>'+Trim.Account[i].City+'</City>'+
		              '<Country>'+Trim.Account[i].Country+'</Country>'+
		              '<County>'+Trim.Account[i].County+'</County>'+
		              '<PostalCode>'+Trim.Account[i].PostalCode+'</PostalCode>'+
		              '<Province>'+Trim.Account[i].Province+'</Province>'+
		              '<StreetAddress>'+Trim.Account[i].StreetAddress+'</StreetAddress>'+
		            '</EAIApplyAccount_BusinessAddress>'+
		          '</ListOfEAIApplyAccount_BusinessAddress>';
			  }
			  
			 /* request+='<ListOfEAIApplyAccount_Organization>'+
	            '<EAIApplyAccount_Organization IsPrimaryMVG="" Operation="">'+
	              '<Searchspec />'+
	              '<Organization />'+
	              '<OrganizationId />'+
	              '<OrganizationIntegrationId />'+
	              '<Location />'+
	            '</EAIApplyAccount_Organization>'+
	          '</ListOfEAIApplyAccount_Organization>'+*/
			  
	          request+='</EaiApplyAccount>'+
	          '</ListOfEaiApplyAccountTest>'+
	        '</ApplyUse_Input>'+
	      '</soap:Body>'+
	    '</soap:Envelope>';
			  
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/AccApply:ApplyUse"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//客户资料    提交申请 之   保存  第一个地址字段 IsPrimaryMVG 要给Y值
//对照完毕 不必复查    2015-9-7
/*function toCustomInfo_BC(ApplyType1,CSN,CertifiAddress1,
Extraordinary1,OrgCodeNumber1,OrgCodeDate1,AccountClass1,AccountSort1,
TaxRegist1,Contact1,MainPhoneNumber,MainFaxNumber,AccountAttribute,
AccountProperty,AccountMPType,Name,Type,
//和申请使用 不同 的
Organization,AccountStatus,ApproveStatus,AccountSubType,BigCustomer,
AccountKANumber,BankName1,BankNumber1,
//是数组的地址集合
Account,
//组织ID
OrganizationId,
//客户Userkey 修改的时候会用到
PrimaryOrganizationId,
//父客户  有点特殊 要考虑下
ParentAccountName,ParentAccountId,id,userID){}*/
/*function toCustomInfo_BC(ApplyType1,CSN,CertifiAddress1,
		Extraordinary1,OrgCodeNumber1,OrgCodeDate1,AccountClass1,AccountSort1,
		TaxRegist1,Contact1,MainPhoneNumber,MainFaxNumber,AccountAttribute,
		AccountProperty,AccountMPType,Name,Type,
		//和申请使用 不同 的
		Organization,AccountStatus,ApproveStatus,AccountSubType,BigCustomer,
		AccountKANumber,BankName1,BankNumber1,
		//是数组的地址集合
		Account,
		//组织ID
		OrganizationId,
		//客户Userkey 修改的时候会用到
		PrimaryOrganizationId,
		//父客户  有点特殊 要考虑下
		ParentAccountName,ParentAccountId,id,userID){
			WL.Logger.error("FFAAR:"+OrgCodeDate1);
			WL.Logger.error("FFAA:"+Account[0].AddressId);
			WL.Logger.error("FFAA:"+Account[0].PostalCode);
			var request='<?xml version="1.0" encoding="utf-8"?>'+
			'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
			'<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
		    '<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
		    '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
			'<soap:Body>'+
			    '<AccDetailSynchronize_Input xmlns="http://siebel.com/Sales/AccDetail">'+
			      '<ListOfHelEaiAppAccountDetail xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Account%20Detail">'+
			        '<Account Operation="" Searchspec="">';
			
					if(id!=''||id!=null){
						request+='<Id>'+id+'</Id>';
					};
			          //'<Created />'+
			          //'<CreatedBy />'+
			          //'<Updated />'+
			          //'<UpdatedBy />'+
			          //'<ConflictId />'+
			          //'<ModId />'+
			          //'<ADLStatus />'+
					request+='<AccountAttribute>'+AccountAttribute+'</AccountAttribute>'+
			          '<AccountClass1>'+AccountClass1+'</AccountClass1>'+
			          //'<AccountClass2 />'+
			          //'<AccountFlag />'+
			          //'<AccountGroup1 />'+
			          //'<AccountGroup2 />'+
			          '<AccountKANumber>'+AccountKANumber+'</AccountKANumber>'+
			          '<AccountMPType>'+AccountMPType+'</AccountMPType>'+
			          //'<AccountNumber1 />'+
			          '<AccountProperty>'+AccountProperty+'</AccountProperty>'+
			          '<AccountSort1>'+AccountSort1+'</AccountSort1>'+
			          //'<AccountSort2 />'+
			          //'<AccountStatus>'+AccountStatus+'</AccountStatus>'+
			          '<AccountSubType>'+AccountSubType+'</AccountSubType>'+
			          //'<AddressStatus />'+
			          '<ApplyType1>'+ApplyType1+'</ApplyType1>'+
			          //'<ApplyType2 />'+
			          //'<ApproveStatus>'+ApproveStatus+'</ApproveStatus>'+
			          //'<ApproveSuggestion />'+
			          //'<Associate1 />'+
			          //'<Associate2 />'+
			          '<BankName1>'+BankName1+'</BankName1>'+
			          //'<BankName2 />'+
			          '<BankNumber1>'+BankNumber1+'</BankNumber1>'+
			          //'<BankNumber2 />'+
			          '<BigCustomer>'+BigCustomer+'</BigCustomer>'+
			          //'<BranchRegionalTranspFc1 />'+
			          //'<BranchRegionalTranspFc2 />'+
			          //'<CSN>'+CSN+'</CSN>'+
			          '<CertifiAddress1>'+CertifiAddress1+'</CertifiAddress1>'+
			          //'<CertifiAddress2 />'+
			          //'<City2 />'+
			          '<Contact1>'+Contact1+'</Contact1>'+
			          //'<Contact2 />'+
			          //'<Country2 />'+
			          //'<CurrencyCode />'+
			          //'<CustomerSiteId />'+
			          //'<EBSCustomerId />'+
			          //'<EBSCustomerName />'+
			          //'<EBSCustomerName1 />'+
			          //'<EBSCustomerNumber />'+
			          //'<EBSCustomerSite />'+
			          '<Extraordinary1>'+Extraordinary1+'</Extraordinary1>'+
			          //'<Extraordinary2 />'+
			          //'<HQEBSCustomerId />'+
			          //'<HQEBSCustomerId1 />'+
			          //'<HQEBSCustomerSiteId />'+
			          //'<HQEBSCustomerSiteId1 />'+
			          //'<HeadStatus />'+
			          //'<InProcessFlag />'+
			          //'<Location />'+
			          '<MainFaxNumber>'+MainFaxNumber+'</MainFaxNumber>'+
			          //'<MainFaxNumber2 />'+
			          '<MainPhoneNumber>'+MainPhoneNumber+'</MainPhoneNumber>'+
			          //'<MainPhoneNumber2 />'+
			          '<Name>'+Name+'</Name>'+
			          '<OrgCodeDate1>'+OrgCodeDate1+'</OrgCodeDate1>'+
			          //'<OrgCodeDate2 />'+
			          '<OrgCodeNumber1>'+OrgCodeNumber1+'</OrgCodeNumber1>';
			          //'<OrgCodeNumber2 />'+
			          //父客户
			          if(ParentAccountName!=''){
			        	  request+='<ParentAccountName>'+ParentAccountName+'</ParentAccountName>';  
			          };
			          //父客户ID
			          if(ParentAccountId!=''){
			        	  request+='<ParentAccountId>'+ParentAccountId+'</ParentAccountId>';
			          };
			          //'<PartnerFlag />'+
			          //'<PostalCode2 />'+
			          //'<PrimaryOrganization />'+
			          if(id==''||id==null){
			        	  request+='<PrimaryOrganizationId></PrimaryOrganizationId>';
			          };
			          
			          //'<Province2 />'+
			          //'<Region1 />'+
			          //'<Region2 />'+
			          //'<Remark1 />'+
			          //'<Remark2 />'+
			          //'<RowId />'+
			          //'<SmallScaleTaxpayer1 />'+
			          //'<SmallScaleTaxpayer2 />'+
			          request+='<TaxRegist1>'+TaxRegist1+'</TaxRegist1>'+
			          //'<TaxRegist2 />'+
			          '<Type>'+Type+'</Type>';
			          for(var i=0;i<Account.length;i++){
			        	  request+='<ListOfAccount_BusinessAddress>'+
			        	  '<Account_BusinessAddress IsPrimaryMVG="'+Account[i].IsPrimaryMVG+'" Operation="" Searchspec="">'+
			              '<AddressId>'+Account[i].AddressId+'</AddressId>'+
			              '<City>'+Account[i].City+'</City>'+
			              '<Country>'+Account[i].Country+'</Country>'+
			              '<County>'+Account[i].County+'</County>'+
			              '<PostalCode>'+Account[i].PostalCode+'</PostalCode>'+
			              '<Province>'+Account[i].Province+'</Province>'+
			              '<StreetAddress>'+Account[i].StreetAddress+'</StreetAddress>'+
			            '</Account_BusinessAddress>'+
			        	'</ListOfAccount_BusinessAddress>';
			          };
			          
			          //'<ListOfAccount_Organization>'+
			            //'<Account_Organization IsPrimaryMVG="" Operation="" Searchspec="">'+
			              //'<Organization />'+     组织后台自动加载
			              //'<OrganizationId />'+   组织ID
			              //'<Location />'+
			            //'</Account_Organization>'+
			          //'</ListOfAccount_Organization>'+
			         
			          request+='</Account>'+
			          '</ListOfHelEaiAppAccountDetail>'+
			          '<StarusObject />'+
			        '</AccDetailSynchronize_Input>'+
			      '</soap:Body>'+
			    '</soap:Envelope>';
			    
			    var input = {
						method:'post',
						returnedContentType:'xml',                              
						headers: {'SOAPAction':'"document/http://siebel.com/Sales/AccDetail:AccDetailSynchronize"'},
						path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
						returnedContentEncoding : 'utf-8', 
						body:{
							content:request.toString(),
							contentType:'text/xml;charset=utf-8',
						}
				};
			
			var result = WL.Server.invokeHttp(input);
			
			return result.Envelope.Body;
}*/

//客户资料    提交申请 之   保存   2.0版   2016.3.16
function toCustomInfo_BC(Trim,userID){
			WL.Logger.error("FFAAR:"+Trim.OrgCodeDate1);
			WL.Logger.error("FFAA:"+Trim.Account[0].AddressId);
			WL.Logger.error("FFAA:"+Trim.Account[0].PostalCode);
			//return;
			var request='<?xml version="1.0" encoding="utf-8"?>'+
			'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
			'<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
		    '<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
		    '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
			'<soap:Body>'+
			    '<AccDetailSynchronize_Input xmlns="http://siebel.com/Sales/AccDetail">'+
			      '<ListOfHelEaiAppAccountDetail xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Account%20Detail">'+
			        '<Account Operation="" Searchspec="">';
					if(Trim.id!=''||Trim.id!=null){
						request+='<Id>'+Trim.Id+'</Id>';
					};
					request+='<AccountAttribute>'+Trim.AccountAttribute+'</AccountAttribute>'+
			        '<AccountClass1>'+Trim.AccountClass1+'</AccountClass1>'+
			        '<AccountKANumber>'+Trim.AccountKANumber+'</AccountKANumber>'+
			        '<AccountMPType>'+Trim.AccountMPType+'</AccountMPType>'+
			        '<AccountProperty>'+Trim.AccountProperty+'</AccountProperty>'+
			        '<AccountSort1>'+Trim.AccountSort1+'</AccountSort1>'+
			        '<AccountSubType>'+Trim.AccountSubType+'</AccountSubType>'+
			        '<ApplyType1>'+Trim.ApplyType1+'</ApplyType1>'+
			        '<BankName1>'+Trim.BankName1+'</BankName1>'+
			        '<BankNumber1>'+Trim.BankNumber1+'</BankNumber1>'+
			        '<BigCustomer>'+Trim.BigCustomer+'</BigCustomer>'+
			        '<CertifiAddress1>'+Trim.CertifiAddress1+'</CertifiAddress1>'+
			        '<Contact1>'+Trim.Contact1+'</Contact1>'+
			        '<Extraordinary1>'+Trim.Extraordinary1+'</Extraordinary1>'+
			        '<MainFaxNumber>'+Trim.MainFaxNumber+'</MainFaxNumber>'+
			        '<MainPhoneNumber>'+Trim.MainPhoneNumber+'</MainPhoneNumber>'+
			        '<Name>'+Trim.Name+'</Name>';
			        if(Trim.OrgCodeDate1!=undefined&&Trim.OrgCodeDate1!=''&&Trim.OrgCodeDate1!=null){
			        	request+='<OrgCodeDate1>'+Trim.OrgCodeDate1+'</OrgCodeDate1>';
			        };
			        request+='<OrgCodeNumber1>'+Trim.OrgCodeNumber1+'</OrgCodeNumber1>';
			        //父客户
			        if(Trim.ParentAccountName!=''){
			        	request+='<ParentAccountName>'+Trim.ParentAccountName+'</ParentAccountName>';  
			        };
			        //父客户ID
			        if(Trim.ParentAccountId!=''){
			        	request+='<ParentAccountId>'+Trim.ParentAccountId+'</ParentAccountId>';
			        };
			        if(Trim.Id==''||Trim.Id==null){
			        	request+='<PrimaryOrganizationId>'+Trim.PrimaryOrganizationId+'</PrimaryOrganizationId>';
			        };
			        request+='<TaxRegist1>'+Trim.TaxRegist1+'</TaxRegist1>'+
			        '<Type>'+Trim.Type+'</Type>';
			        for(var i=0;i<Trim.Account.length;i++){
			        	  request+='<ListOfAccount_BusinessAddress>'+
			        	  '<Account_BusinessAddress IsPrimaryMVG="'+Trim.Account[i].IsPrimaryMVG+'" Operation="" Searchspec="">'+
			              '<AddressId>'+Trim.Account[i].AddressId+'</AddressId>'+
			              '<City>'+Trim.Account[i].City+'</City>'+
			              '<Country>'+Trim.Account[i].Country+'</Country>'+
			              '<County>'+Trim.Account[i].County+'</County>'+
			              '<PostalCode>'+Trim.Account[i].PostalCode+'</PostalCode>'+
			              '<Province>'+Trim.Account[i].Province+'</Province>'+
			              '<StreetAddress>'+Trim.Account[i].StreetAddress+'</StreetAddress>'+
			            '</Account_BusinessAddress>'+
			        	'</ListOfAccount_BusinessAddress>';
			        };
			        
			        request+='</Account>'+
			          '</ListOfHelEaiAppAccountDetail>'+
			          '<StarusObject />'+
			        '</AccDetailSynchronize_Input>'+
			      '</soap:Body>'+
			    '</soap:Envelope>';
			    
			    var input = {
						method:'post',
						returnedContentType:'xml',                              
						headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/AccDetail:AccDetailSynchronize"'},
						path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
						returnedContentEncoding : 'utf-8', 
						body:{
							content:request.toString(),
							contentType:'text/xml;charset=utf-8',
						}
				};
			
			var result = WL.Server.invokeHttp(input);
			//WL.Logger.error("提交申请："+request.toString());
			return result.Envelope.Body;
}

//附件  上传
function toCustonInfo_SC(AccntFileExt,AccntFileName,AccountId,AccntFileBuffer,userID){
	
	/*  <AccntFileExt />  后缀名  *
    <AccntFileName /> 文件名  *
    <AccountId />  客户ID    *
    <Comment /> 注释
    <AccntFileBuffer>base64Binary</AccntFileBuffer>  **/
	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
    '<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
    '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+    
	'<soap:Body>'+
	    '<AccAttUpsert_Input xmlns="http://siebel.com/Sales/AccAtt">'+
	      '<ListOfHelEaiAppAccountAttachment xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Account%20Attachment">'+
	        '<ListOfAccountAttachment>'+
	          '<AccountAttachment Operation="" Searchspec="">'+
	            /*'<Id />'+
	            '<Created />'+
	            '<CreatedBy />'+
	            '<Updated />'+
	            '<UpdatedBy />'+*/
	            '<AccntFileExt>'+AccntFileExt+'</AccntFileExt>'+    //'<AccntFileExt>txt</AccntFileExt>'+
	            '<AccntFileName>'+AccntFileName+'</AccntFileName>'+         //'<AccntFileName>91887878</AccntFileName>'+
	            //'<AccntFileSize />'+
	            '<AccountId>'+AccountId+'</AccountId>'+            //'<AccountId>1-QWJ149</AccountId>'+
	            //'<Comment/>'+
	            //'<AccntFileBuffer EndOfData="true" Extension="txt" AttachmentIsTextData="false"  TimedOut="false">uL28/rLiytQ=</AccntFileBuffer>'+
	            '<AccntFileBuffer>'+AccntFileBuffer+'</AccntFileBuffer>'+  //'<AccntFileBuffer>uL28/rLiytQ=</AccntFileBuffer>'+
	        /*  '<hel:AccntFileName>918</hel:AccntFileName>'+
	          '<hel:AccntFileExt>txt</hel:AccntFileExt>'+
	          '<hel:AccountId>1-QWHUER</hel:AccountId>'+
	          '<hel:AccntFileBuffer>uL28/rLiytQ=</hel:AccntFileBuffer>'+*/
	          '</AccountAttachment>'+
	        '</ListOfAccountAttachment>'+
	      '</ListOfHelEaiAppAccountAttachment>'+
	    '</AccAttUpsert_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	WL.Logger.error(request);
	  var input = {
				method:'post',
				returnedContentType:'xml',                              
				headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/AccAtt:AccAttUpsert"'},
				path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
				returnedContentEncoding : 'utf-8', 
				body:{
					content:request.toString(),
					contentType:'text/xml;charset=utf-8',
				}
		};
	
	var result = WL.Server.invokeHttp(input);
	//WL.Logger.error("FFAA8"+request.toString());
	//WL.Logger.error("FFAA9"+result);
	
	return result.Envelope.Body;
}

//附件 查询
function toCustonInfo_CX(AccntFileExt,AccountId,userID){
	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
    '<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
    '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+    
	'<soap:Body>'+
	    '<AccAttQuery_Input xmlns="http://siebel.com/Sales/AccAtt">'+
	      '<ListOfHelEaiAppAccountAttachment xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Account%20Attachment">'+
	        '<ListOfAccountAttachment>'+
	          '<AccountAttachment Operation="" Searchspec="">';
	            //'<Id />'+
	            //'<Created />'+
	            //'<CreatedBy />'+
	            //'<Updated />'+
	            //'<UpdatedBy />'+
	            if(AccntFileExt!=''){
	            	request+='<AccntFileExt>'+AccntFileExt+'</AccntFileExt>';
	            };
	          	
	            //'<AccntFileName />'+
	            //'<AccntFileSize />'+
	            request+='<AccountId>'+AccountId+'</AccountId>'+
	            //'<Comment />'+
	            //'<AccntFileBuffer>base64Binary</AccntFileBuffer>'+
	          '</AccountAttachment>'+
	        '</ListOfAccountAttachment>'+
	      '</ListOfHelEaiAppAccountAttachment>'+
	    '</AccAttQuery_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/AccAtt:AccAttQuery"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	//WL.Logger.error("FFAA10"+request.toString());
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//客户资料    之申请使用
function toCustomInfo_TJSQ(RecordId,userID){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
	    '<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
	    '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
		'<soap:Body>'+
	    '<Submit_Input xmlns="http://siebel.com/Sales/AccQuery">'+
	      '<RecordId>'+RecordId+'</RecordId>'+
	    '</Submit_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/AccQuery:Submit"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//客户资料 之  业务联系地址   查询  
function toCustornAddressList(Country,Province,City,County,StreetAddress,userID){
	
	
	 var request='<?xml version="1.0" encoding="utf-8"?>'+
		 '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		 '<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
		 '<soap:Body>'+
	     	'<AccAddrQuery_Input xmlns="http://siebel.com/Sales/AccAddress">'+
	        	'<ListOfHelEaiAppAccountAddress xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Account%20Address">'+
	        		'<CutAddress Operation="" Searchspec="">'+
	        	          '<City>'+City+'</City>'+
	        	          '<Country>'+Country+'</Country>'+
	        	          '<County>'+County+'</County>'+
	        	          '<Province>'+Province+'</Province>';
	        	          if(StreetAddress!=''){
	        	        	  request+='<StreetAddress>'+StreetAddress+'</StreetAddress>';
	        	          };
	        	      request+='</CutAddress>'+
	        	'</ListOfHelEaiAppAccountAddress>'+
	      	'</AccAddrQuery_Input>'+
		 '</soap:Body>'+
	  '</soap:Envelope>';
	        	      WL.Logger.error("xxxx:"+request.toString());    	     	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/AccAddress:AccAddrQuery"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//客户资料 之  业务联系地址   之添加 
function toCustornAddressAdd(Country,Province,City,County,StreetAddress,StartDate,EndDate,PostalCode,userID){
	
	        	
	 var request='<?xml version="1.0" encoding="utf-8"?>'+
		 '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		 '<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
		 '<soap:Body>'+
	    '<AccAddrSynchronize_Input xmlns="http://siebel.com/Sales/AccAddress">'+
	      '<ListOfHelEaiAppAccountAddress xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Account%20Address">'+
	        '<CutAddress Operation="" Searchspec="">'+
	          '<City>'+City+'</City>'+
	          '<Country>'+Country+'</Country>'+
	          '<County>'+County+'</County>'+
	          '<StreetAddress>'+StreetAddress+'</StreetAddress>'+
	          '<Province>'+Province+'</Province>'+
	          '<StartDate>'+StartDate+'</StartDate>';
	          if(EndDate!=''){
	        	  request+='<EndDate>'+EndDate+'</EndDate>';  
	          }
	          if(PostalCode!=''){
	        	  request+='<PostalCode>'+PostalCode+'</PostalCode>';  
	          }
	          
	 request+='</CutAddress>'+
	      '</ListOfHelEaiAppAccountAddress>'+
	    '</AccAddrSynchronize_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
		
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/AccAddress:AccAddrSynchronize"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}



//商机检测
function checkOpportunity(SearchSpec,viewmodel,userID){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
			'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
			 '<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
		     '<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
		     '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
			'<soap:Body>'+
			'<QueryOppty_Input xmlns="http://siebel.com/Sales/OpptyQuery">'+
			'<SearchSpec >'+SearchSpec+'</SearchSpec>'+
			'<ViewMode >'+viewmodel+'</ViewMode>'+
			'</QueryOppty_Input>'+
			'</soap:Body>'+
			'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyQuery:QueryOppty"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	//return {result:request};
	var result = WL.Server.invokeHttp(input);
	WL.Logger.error("queyOppty"+request);
	return result.Envelope.Body;
}
//商机列表查询 （无分页的商机查询）
function queryOpportunityList(SearchSpec){
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+SearchSpec.userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+SearchSpec.userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
	     '<soap:Body>'+
	    '<QueryOppty_Input xmlns="http://siebel.com/Sales/OpptyQuery">'+
	   '   <SearchSpec>'+SearchSpec.SearchSpec+'</SearchSpec>'+
	    '  <ViewMode>'+SearchSpec.ViewMode+'</ViewMode>'+
	   ' </QueryOppty_Input>'+
	 ' </soap:Body>'+
	'</soap:Envelope>';
	
	WL.Logger.error("商机查询无分页条件："+request);
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyQuery:QueryOppty"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
	
}
//商机查询
function queryOpportunity(id){
	var request= '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+id.userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+id.userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
	     ' <soap:Body>'+
	  '  <OpptyDetailQuery_Input xmlns="http://siebel.com/Sales/OpptyDetail">'+
	   '   <PrimaryRowId>'+id.id+'</PrimaryRowId> '+
	    '  <ListOfHelEaiAppOpportunityDetail xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Detail">'+
	     '   <Opportunity Operation="" Searchspec="">'+
	       
	      '  </Opportunity>'+
	     ' </ListOfHelEaiAppOpportunityDetail>'+
	    '</OpptyDetailQuery_Input>'+
	 ' </soap:Body>'+
	'</soap:Envelope>';
	
	WL.Logger.error("商机查询："+request);
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyDetail:OpptyDetailQuery"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}
//商机流失
function opptyLose(recordId){
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+recordId.userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+recordId.userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
		'<soap:Body>'+
	   ' <OpportunityLose_Input xmlns="http://siebel.com/Sales/OppSubOrLos">'+
	     ' <RecordId >'+recordId.recordId+'</RecordId>'+
	   ' </OpportunityLose_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OppSubOrLos:OpportunityLose"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}
//商机审核
function opptyExamine(recordId){
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+recordId.userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+recordId.userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
	  '<soap:Body>'+
	  '  <SubmitOpt_Input xmlns="http://siebel.com/Sales/OppSubOrLos">'+
	  ' <RecordId >'+recordId.recordId+'</RecordId>'+
	   ' </SubmitOpt_Input>'+
	 ' </soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OppSubOrLos:SubmitOpt"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//同意商机流失
function CustomTYLS(recordId){
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
			'<UsernameToken xmlns="http://siebel.com/webservices">'+recordId.userID+'</UsernameToken>'+
			'<PasswordText xmlns="http://siebel.com/webservices">'+recordId.userID+'</PasswordText>'+
			'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
		'<soap:Body>'+
	    '<ApproveLose_Input xmlns="http://siebel.com/Sales/OppSubOrLos">'+
	      '<RecordId>'+recordId.ID+'</RecordId>'+
	    '</ApproveLose_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OppSubOrLos:ApproveLose"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//拒绝商机流失
function CustomJJLS(recordId){
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
			'<UsernameToken xmlns="http://siebel.com/webservices">'+recordId.userID+'</UsernameToken>'+
			'<PasswordText xmlns="http://siebel.com/webservices">'+recordId.userID+'</PasswordText>'+
			'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
		'<soap:Body>'+
	    '<DeclineLose_Input xmlns="http://siebel.com/Sales/OppSubOrLos">'+
	      '<RecordId>'+recordId.ID+'</RecordId>'+
	    '</DeclineLose_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OppSubOrLos:DeclineLose"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
	};
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}




//商机客户查询
function queryOpptyAccount(SearchSpec){
			var request='<?xml version="1.0" encoding="utf-8"?>'+
				'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
				'<UsernameToken xmlns="http://siebel.com/webservices">'+SearchSpec.userID+'</UsernameToken>'+
			     '<PasswordText xmlns="http://siebel.com/webservices">'+SearchSpec.userID+'</PasswordText>'+
			     '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
				' <soap:Body>'+
			   ' <QueryOpptyAcc_Input xmlns="http://siebel.com/Sales/OpptyQuery">'+
			   '   <SearchSpec >'+SearchSpec.SearchSpec+'</SearchSpec>'+
			    '  <ViewMode>Organization</ViewMode>'+
			   ' </QueryOpptyAcc_Input>'+
			  '</soap:Body>'+
			'</soap:Envelope>';
			WL.Logger.error("客户查询"+request.toString());
		var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyQuery:QueryOpptyAcc"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}
//跟单组织与安装地所在公司查询
function queryCompany(SearchSpec){
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+SearchSpec.userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+SearchSpec.userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
	     '<soap:Body>'+
	    '<QueryOpptyOrg_Input xmlns="http://siebel.com/Sales/OpptyQuery">'+
	    '  <SearchSpec >'+SearchSpec.SearchSpec+'</SearchSpec>'+
	   '   <ViewMode>All</ViewMode>'+
	    '</QueryOpptyOrg_Input>'+
	 ' </soap:Body>'+
	'</soap:Envelope>';
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyQuery:QueryOpptyOrg"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
	
}
//查询商机流失原因
function queryLoseReason(opptyId){
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
	 '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+opptyId.userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+opptyId.userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	 '<soap:Body>'+
	 '  <OpptyLosReaQuery_Input xmlns="http://siebel.com/Sales/OpptyLosRea">'+
	 '    <ListOfHelEaiAppOpportunityLoseReason xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Lose%20Reason">'+
	 '      <ListOfHelOpportunityLoseReason>'+
	 '        <HelOpportunityLoseReason Operation="" Searchspec="">'+
	 '          <OpptyId>'+opptyId.opptyId+'</OpptyId>'+
	 '        </HelOpportunityLoseReason>'+
	 '      </ListOfHelOpportunityLoseReason>'+
	 '    </ListOfHelEaiAppOpportunityLoseReason>'+
	 '  </OpptyLosReaQuery_Input>'+
	 '</soap:Body>'+
	 '</soap:Envelope>';
	
	/*var request = '<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+opptyId.userID+'</UsernameToken>'+
    '<PasswordText xmlns="http://siebel.com/webservices">'+opptyId.userID+'</PasswordText>'+
    '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+  
	'<soap:Body>'+
	    '<OpptyLosReaQuery_Input xmlns="http://siebel.com/Sales/OpptyLosRea">'+
	      '<ListOfHelEaiAppOpportunityLoseReason xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Lose%20Reason">'+
	        '<ListOfHelOpportunityLoseReason>'+
	          '<HelOpportunityLoseReason Operation="" Searchspec="">'+
	            '<Id />'+
	            '<Created />'+
	            '<CreatedBy />'+
	            '<Updated />'+
	            '<UpdatedBy />'+
	            '<ConflictId />'+
	            '<ModId />'+
	            '<CheckFlag />'+
	            '<OpptyId>'+opptyId.opptyId+'</OpptyId>'+
	            '<OpptyLoseComments />'+
	            '<OpptyLoseReason />'+
	            '<OpptyLoseReasonType />'+
	            '<OpptyType />'+
	          '</HelOpportunityLoseReason>'+
	        '</ListOfHelOpportunityLoseReason>'+
	      '</ListOfHelEaiAppOpportunityLoseReason>'+
	    '</OpptyLosReaQuery_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';*/
	
	WL.Logger.error("商机流失原因分析"+request);
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyLosRea:OpptyLosReaQuery"'},
			//path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAPclueListQuery=1',
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}
//新建商机
function buildNewOppty(oppty){
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+oppty.userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+oppty.userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
	  '<soap:Body>'+
	   ' <OpptyDetailSynchronize_Input xmlns="http://siebel.com/Sales/OpptyDetail">'+
	    '  <ListOfHelEaiAppOpportunityDetail xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Detail">'+
	    '    <Opportunity Operation="" Searchspec="">';
	if(oppty.Id)
		request +='<Id>'+oppty.Id+'</Id>';
	else
		request +='<Id></Id>';
		if(oppty.OpptyDeclineReason)
			request+='<OpptyDeclineReason>'+oppty.OpptyDeclineReason+'</OpptyDeclineReason>';
        if(oppty.AccountId){
			request +='<Account>'+oppty.Account+'</Account>'+
		    '<AccountId>'+oppty.AccountId+'</AccountId>';
        }
        if(oppty.BuildingHeight)
        	request+='<BuildingHeight>'+oppty.BuildingHeight+'</BuildingHeight>';
        if(oppty.BuildingLayer)
        	request+='<BuildingLayer>'+oppty.BuildingLayer+'</BuildingLayer>';
	    if(oppty.AccountAttribute)
	    	request+='      <AccountAttribute>'+oppty.AccountAttribute+'</AccountAttribute>';
	    if(oppty.AccountKANumber)
	    	request +='<AccountKANumber>'+oppty.AccountKANumber+'</AccountKANumber>';
	    if(oppty.AccountProperty)
	    	request +='<AccountProperty>'+oppty.AccountProperty+'</AccountProperty>';
	    if(oppty.AccountSubType)
	    	request +='<AccountSubType>'+oppty.AccountSubType+'</AccountSubType>';
	    if(oppty.AccountType)
	    	request +='<AccountType>'+oppty.AccountType+'</AccountType>';
	    if(oppty.Biding)
	    	request +='      <Biding>'+oppty.Biding+'</Biding>';
	    if(oppty.BusinessType)
	    	request +='<BusinessType>'+oppty.BusinessType+'</BusinessType>';
	    if(oppty.EquipmentOpptyAttribute)
	    	request +='<EquipmentOpptyAttribute>'+oppty.EquipmentOpptyAttribute+'</EquipmentOpptyAttribute>';
	    if(oppty.EvaluateElevatorQuantity)
	    	request +='<EvaluateElevatorQuantity>'+oppty.EvaluateElevatorQuantity+'</EvaluateElevatorQuantity>';
	    if(oppty.EvaluateElevatorQuantity)
	    	request +='<EvaluateEscalatorQuantity>'+oppty.EvaluateEscalatorQuantity+'</EvaluateEscalatorQuantity>';
	    if(oppty.FrameProtocolNum)
	    	request +='<FrameProtocolNum>'+oppty.FrameProtocolNum+'</FrameProtocolNum>';
	    if(oppty.HQSalesRepId){
	    		request +='<HQSalesRepPositionId>'+oppty.HQSalesRepId+'</HQSalesRepPositionId>';
	    	//'<HQSalesRepFullName>'+oppty.HQSalesRepFullName+'</HQSalesRepFullName>';
	    }	
	    if(oppty.InstallSiteCompanyId){
	    	request +='<InstallSiteCompanyId>'+oppty.InstallSiteCompanyId+'</InstallSiteCompanyId>';
	    	//'<InstallSiteCompany>'+oppty.InstallSiteCompany+'</InstallSiteCompany>'+
	    }	
	    if(oppty.KeyContactId)
	    	request +='<KeyContactId>'+oppty.KeyContactId+'</KeyContactId>';
	    if(oppty.LargeCompositeProject)
	    	request +='<LargeCompositeProject>'+oppty.LargeCompositeProject+'</LargeCompositeProject>';
	    if(oppty.LuxuriousResidence)
	    	request +='<LuxuriousResidence>'+oppty.LuxuriousResidence+'</LuxuriousResidence>';
	    if(oppty.FDKContractFlag)
	    	request+='<FDKContractFlag>Y</FDKContractFlag>';
	    if(oppty.ImportMainEngine)
	    	request+='<ImportMainEngine>Y</ImportMainEngine>';
	    if(oppty.ImportControllingMachine)
	    	request+='<ImportControllingMachine>Y</ImportControllingMachine>';
	    if(oppty.ImportDoorMachine)
	    	request+='<ImportDoorMachine>Y</ImportDoorMachine>';
	    if(oppty.Name)
		    request +='<Name>'+oppty.Name+'</Name>';
		if(oppty.EquipmentOpptyAttribute)    
		    request+='      <OpptyAttribute>'+oppty.EquipmentOpptyAttribute+'</OpptyAttribute>';
		if(oppty.OpptyBuildingPhase)
		    request+='      <OpptyBuildingPhase>'+oppty.OpptyBuildingPhase+'</OpptyBuildingPhase>';
		if(oppty.OpptyBusinessPreapproveStatus)
		    request+='      <OpptyBusinessPreapproveStatus>'+oppty.OpptyBusinessPreapproveStatus+'</OpptyBusinessPreapproveStatus>';
		if(oppty.OpptyCategory)
		    request+='      <OpptyCategory>'+oppty.OpptyCategory+'</OpptyCategory>';
	    
	    if(oppty.OpptyCloseDate)
	    	request	+='<OpptyCloseDate>'+oppty.OpptyCloseDate+'</OpptyCloseDate>';
	    if(oppty.OpptyContractType)
		    request+='<OpptyContractType>'+oppty.OpptyContractType+'</OpptyContractType>';
		if(oppty.OpptyFinalUser)    
		    request+='      <OpptyFinalUser>'+oppty.OpptyFinalUser+'</OpptyFinalUser>';
		if(oppty.OpptyInfoChannel)
		    request+='      <OpptyInfoChannel>'+oppty.OpptyInfoChannel+'</OpptyInfoChannel>';
	    
	    if(oppty.OpptyInstallSiteId){
	    	request +='<OpptyInstallSite>'+oppty.OpptyInstallSite+'</OpptyInstallSite>'+
	    	'<OpptyInstallSiteId>'+oppty.OpptyInstallSiteId+'</OpptyInstallSiteId>';
	    }	
	    if(oppty.OpptyMajorProject)
	    	request +='<OpptyMajorProject>'+oppty.OpptyMajorProject+'</OpptyMajorProject>';
	    if(oppty.OpptyPhase)
	    	request +='<OpptyPhase>'+oppty.OpptyPhase+'</OpptyPhase>';
	    if(oppty.OpptyProjectArea)
	    	request+='      <OpptyProjectArea>'+oppty.OpptyProjectArea+'</OpptyProjectArea>';
	    if(oppty.OpptySource)
	    	request+='      <OpptySource>'+oppty.OpptySource+'</OpptySource>';
	    if(oppty.OpptyStatus)
	    	request +='<OpptyStatus>'+oppty.OpptyStatus+' </OpptyStatus>';
	    if(oppty.OpptySubCategory)
	    	request +='<OpptySubCategory>'+oppty.OpptySubCategory+'</OpptySubCategory>';
	    if(oppty.OpptyType)
	    	request +='<OpptyType>'+oppty.OpptyType+'</OpptyType>';
	    if(oppty.Month){
		    request +='<PredictSignMonth>'+oppty.Month+'</PredictSignMonth>'+
		    '      <PredictSignYear>'+oppty.Year+'</PredictSignYear>';
	    }
	    if(oppty.OpptyInternationalHotel)
	    	request+='<OpptyInternationalHotel>'+oppty.OpptyInternationalHotel+'</OpptyInternationalHotel>';
	    if(oppty.OpptyMajorProject)
	    	request +='<OpptyMajorProject>'+oppty.OpptyMajorProject+'</OpptyMajorProject>';
	    if(oppty.OpptyProjectArea)
	    	request+='      <OpptyProjectArea>'+oppty.OpptyProjectArea+'</OpptyProjectArea>';
	    if(oppty.OpptySubCategory)
	    	request +='<OpptySubCategory>'+oppty.OpptySubCategory+'</OpptySubCategory>';
	    if(oppty.PrimaryRevenueAmount)
	    	request +='<PrimaryRevenueAmount>'+oppty.PrimaryRevenueAmount+'</PrimaryRevenueAmount>';
	    if(oppty.SiteCity)
	    	request +='<SiteCity>'+oppty.SiteCity+'</SiteCity>';
	    if(oppty.SiteCounty)
	    	request +='<SiteCounty>'+oppty.SiteCounty+'</SiteCounty>';
	    if(oppty.SiteState)	
	    	request +='<SiteState>'+oppty.SiteState+'</SiteState>';
	    //request +='<SupplierOpportunity/>'+
	    if(oppty.SymbolicBuilding)
	    	request +='<SymbolicBuilding>'+oppty.SymbolicBuilding+'</SymbolicBuilding>';
	    if(oppty.TopBDC)	
	    	request +='<TopBDC>'+oppty.TopBDC+'</TopBDC>';
	    if(oppty.XHeight)	
	    	request +='<XHeight>'+oppty.XHeight+'</XHeight>';
	    if(oppty.YCoordinate)
	    	request +='<YCoordinate>'+oppty.YCoordinate+'</YCoordinate>';
	    if(!oppty.Id)
	    	request+='<PrimaryOrganizationId></PrimaryOrganizationId>';
	    if(oppty.Description)
	    	request+='<Description>'+oppty.Description+'</Description>';
	    if(oppty.KeyContactId){
	    	request +='<ListOfOpportunity_FINContact>'+
	    	'<Opportunity_FINContact xsi:nil="true" >'+
	    	'<FINContactId>'+oppty.KeyContactId+'</FINContactId>'+
	    	'</Opportunity_FINContact>'+
	    	'</ListOfOpportunity_FINContact>';
	    }
	    if(oppty.Position){
	    	request +='<ListOfOpportunity_Position>';
	        for(var i=0;i<oppty.Position.length;i++){
	        	if(oppty.Position[i].IsPrimaryMVG=="Y")
	        		request+='<Opportunity_Position IsPrimaryMVG="Y" Operation="" Searchspec="" >';
	        	else
	        		request+='<Opportunity_Position IsPrimaryMVG="" Operation="" Searchspec="" >';
	            request+='<PositionId>'+oppty.Position[i].PositionId+'</PositionId>';
	            request+='</Opportunity_Position>';
	        } 
	    	
	        request+='</ListOfOpportunity_Position>';
	    }
	    request +='</Opportunity>'+
	    '  </ListOfHelEaiAppOpportunityDetail>';
	    if(oppty.ViewMode)
	    	request+='  <ViewMode>'+oppty.ViewMode+'</ViewMode>';
	    else
	    	request+='<ViewMode>Organization</ViewMode>';
	    
	    request +='</OpptyDetailSynchronize_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	/*oppty.request = request;  
	return oppty;*/
	 WL.Logger.error("保存商机："+request.toString());
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyDetail:OpptyDetailSynchronize"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		//WL.Logger.error("保存商机："+request.toString());
		return result.Envelope.Body;
}
//总部跟踪人员与跟踪人员查询
function salesRepQuery(param){
	
	
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	  '  <QuerySalesRep_Input xmlns="http://siebel.com/Sales/QueryPosition">'+
	   '   <SearchSpec>'+param.SearchSpec+'</SearchSpec>'+
	   '   <ViewMode>'+param.ViewMode+'</ViewMode>'+
	  '  </QuerySalesRep_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/QueryPosition:QuerySalesRep"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		WL.Logger.error("总部跟踪人员："+request.toString());
		return result.Envelope.Body;
}


//获取经销商信息  (HelcAgent)
function salesRepQueryTwo(param){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
    '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
    '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
	'<soap:Body>'+
	    '<QuerySalesRep_Input xmlns="http://siebel.com/Sales/QueryPosition">'+
	      '<SearchSpec>'+param.SearchSpec+'</SearchSpec>'+
	      '<ViewMode>'+param.ViewMode+'</ViewMode>'+
	    '</QuerySalesRep_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	WL.Logger.error("获取经销商信息："+request.toString());
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/QueryPosition:QuerySalesRep"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		//WL.Logger.error("代理商信息："+request.toString());
		return result.Envelope.Body;
}

//联系人查询
function keyContactQuery(param){
	
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	   ' <QueryOpptyCont_Input xmlns="http://siebel.com/Sales/OpptyQuery">'+
	   '   <SearchSpec>'+param.SearchSpec+'</SearchSpec>'+
	   '   <ViewMode>'+param.ViewMode+'</ViewMode>'+
	   ' </QueryOpptyCont_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyQuery:QueryOpptyCont"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}
//联系人新增
function keyContactBuild(param){
	
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	  '  <OpptyContactSynchronize_Input xmlns="http://siebel.com/Sales/OpptyContact">'+
	  '    <ListOfHelEaiAppOpportunityContact xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Contact">'+
	  '      <Contact Operation="" Searchspec="">'+
	  '        <Id></Id>'+
	  '        <FirstName>'+param.firstName+'</FirstName>'+
	  '        <JobTitle>'+param.jobTitle+'</JobTitle>'+
	  '        <LastName>'+param.lastName+'</LastName>'+
	  '        <MM>'+param.sex+'</MM>'+
	  '        <RowId/>'+
	  '        <WorkPhone>'+param.workPhone+'</WorkPhone>'+
	  '        <AccountRowId/>'+
	  '        <Account />'+
	  '        <ListOfContact_Account>';
	  if(param.contactAccount!=null){
		  if(param.contactAccount.IsPrimaryMVG)
			  request+='<Contact_Account IsPrimaryMVG="Y" Operation="" Searchspec="">';
		  else
			  request+='<Contact_Account IsPrimaryMVG="" Operation="" Searchspec="">';
		  
		  request += '<AccountRowId>'+param.contactAccount.RowId+'</AccountRowId>';
		  request += '</Contact_Account>';
		  
	  }else
		  request+='<Contact_Account xsi:nil="true"/>';
		  
	 request += '</ListOfContact_Account>'+
	  '      </Contact>'+
	  '    </ListOfHelEaiAppOpportunityContact>'+
	  '  </OpptyContactSynchronize_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyContact:OpptyContactSynchronize"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}
//商机流失与审核的附件上传
function uploadAnnex(param){
	
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	   ' <OpptyAttSynchronize_Input xmlns="http://siebel.com/Sales/OpptyAtt">'+
	   '   <ListOfHelEaiAppOpportunityAttachment xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Attachment">'+
	   '     <ListOfHelOpportunityAttachment>'+
	   '       <HelOpportunityAttachment Operation="" Searchspec="">'+
	   '         <Id></Id>'+
	   '         <AttachmentType>'+param.AttachmentType+'</AttachmentType>'+
	   '         <OpptyId>'+param.OpptyId+'</OpptyId>'+
	   '         <OpptyFileExt>'+param.OpptyFileExt+'</OpptyFileExt>'+
	   '         <OpptyFileName>'+param.OpptyFileName+'</OpptyFileName>'+
	   '         <OpptyFileBuffer>'+param.OpptyFileBuffer+'</OpptyFileBuffer>'+
	   '       </HelOpportunityAttachment>'+
	   '     </ListOfHelOpportunityAttachment>'+
	   '   </ListOfHelEaiAppOpportunityAttachment>'+
	   ' </OpptyAttSynchronize_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyAtt:OpptyAttSynchronize"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}
//商机附件下载
function downloadAnnex(param){
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	  '  <OpptyAttQuery_Input xmlns="http://siebel.com/Sales/OpptyAtt">'+
	  '    <ListOfHelEaiAppOpportunityAttachment xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Attachment">'+
	  '      <ListOfHelOpportunityAttachment>'+
	  '        <HelOpportunityAttachment Operation="" Searchspec="">'+
	  '          <OpptyId>'+param.opptyId+'</OpptyId>'+
	  '        </HelOpportunityAttachment>'+
	  '      </ListOfHelOpportunityAttachment>'+
	  '    </ListOfHelEaiAppOpportunityAttachment>'+
	  '  </OpptyAttQuery_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyAtt:OpptyAttQuery"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
	
}

//商机流失原因新建或修改
function buildOpptyLoseReason(param){
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
	  '<soap:Body>'+
	  '  <OpptyLosReaSynchronize_Input xmlns="http://siebel.com/Sales/OpptyLosRea">'+
	  '    <ListOfHelEaiAppOpportunityLoseReason xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Lose%20Reason">'+
	  '      <ListOfHelOpportunityLoseReason>'+
	  '        <HelOpportunityLoseReason Operation="" Searchspec="">';
	  if(param.id)
		  request += '<Id>'+param.id+'</Id>';
	  else
		  request += '<Id></Id>';
	  request+='<CheckFlag>'+(param.checkFlag?param.checkFlag:'')+'</CheckFlag>'+
	  '          <OpptyId>'+param.opptyId+'</OpptyId>'+
	  '          <OpptyLoseComments>'+(param.opptyLoseComments?param.opptyLoseComments:'')+'</OpptyLoseComments>'+
	  '          <OpptyLoseReason>'+(param.opptyLoseReason?param.opptyLoseReason:'')+'</OpptyLoseReason>'+
	  '          <OpptyLoseReasonType>'+(param.opptyLoseReasonType?param.opptyLoseReasonType:'')+'</OpptyLoseReasonType>'+
	  '          <OpptyType>'+(param.opptyType?param.opptyType:'')+'</OpptyType>'+
	  '        </HelOpportunityLoseReason>'+
	  '      </ListOfHelOpportunityLoseReason>'+
	  '    </ListOfHelEaiAppOpportunityLoseReason>'+
	  '  </OpptyLosReaSynchronize_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	 /* param.loseReason = request;
	  return param;*/
	  var input = {
				method:'post',
				returnedContentType:'xml',                              
				headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyLosRea:OpptyLosReaSynchronize"'},
				path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
				returnedContentEncoding : 'utf-8', 
				body:{
					content:request.toString(),
					contentType:'text/xml;charset=utf-8',
				}
			};
			
			var result = WL.Server.invokeHttp(input);
			
			return result.Envelope.Body;
	  
}

//安装地点查询
function queryOpptyInstallSite(param){
	
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	  '  <OpptyInsSitQuery_Input xmlns="http://siebel.com/Sales/OpptyInsSit">'+
	  '    <ListOfHelEaiAppOpportunityInstallSite xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Install%20Site">'+
	  '      <HelInstallSite Operation="" Searchspec="">';
	  if(param.id)
		  request+='<Id>'+param.id+'</Id>';
	  if(param.address)
		  request+='<HELAddress>'+param.address+'</HELAddress>';
	  if(param.city)
		  request+='<HELCity>'+param.city+'</HELCity>';
	  if(param.country)
		  request+='<HELCountry>'+param.country+'</HELCountry>';
	  if(param.county)
		  request+='<HELCounty>'+param.county+'</HELCounty>';
	  if(param.project_Area)
		  request+='<HELProject_Area>'+param.project_Area+'</HELProject_Area>';
	  if(param.province)
		  request+='<HELProvince>'+param.province+'</HELProvince>';
	  request +='</HelInstallSite>'+
	  '    </ListOfHelEaiAppOpportunityInstallSite>'+
	  '  </OpptyInsSitQuery_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyInsSit:OpptyInsSitQuery"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}
//安装地点新建
function bulidOpptyInstallSite(param){

	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	  '  <OpptyInsSitSynchronize_Input xmlns="http://siebel.com/Sales/OpptyInsSit">'+
	  '    <ListOfHelEaiAppOpportunityInstallSite xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Install%20Site">'+
	  '      <HelInstallSite Operation="" Searchspec="">'+
	  '		   <Id></Id>'+
	  '        <HELAddress>'+param.address+'</HELAddress>'+
	  '        <HELCity>'+param.city+'</HELCity>'+
	  '        <HELCountry>'+param.country+'</HELCountry>'+
	  '        <HELCounty>'+param.county+'</HELCounty>'+
	  '        <HELProject_Area>'+param.project_Area+'</HELProject_Area>'+
	  '        <HELProvince>'+param.province+'</HELProvince>'+
	  '      </HelInstallSite>'+
	  '    </ListOfHelEaiAppOpportunityInstallSite>'+
	  '  </OpptyInsSitSynchronize_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyInsSit:OpptyInsSitSynchronize"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}
//客户需求查询
function queryCustomerDemand(param){
	
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	     '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	     '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	  '  <OpptyDemAnalyQuery_Input xmlns="http://siebel.com/Sales/OpptyDemAnaly">'+
	  '    <ListOfHelEaiAppOpportunityDemandAnalysis xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Demand%20Analysis">'+
	  '      <Opportunity>'+
	  '        <Id>'+param.opptyId+'</Id>'+
	  '        <OpptyType>'+param.opptyType+'</OpptyType>'+
	  '        <ListOfHelOpptyDemandAnalysis>'+
	  '          <HelOpptyDemandAnalysis xsi:nil="true" />'+
	  '        </ListOfHelOpptyDemandAnalysis>'+
	  '      </Opportunity>'+
	  '    </ListOfHelEaiAppOpportunityDemandAnalysis>'+
	  '  </OpptyDemAnalyQuery_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	/*param.request = request;    
	return param;*/
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'""document/http://siebel.com/Sales/OpptyDemAnaly:OpptyDemAnalyQuery"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}
//客户需求新建
function buildCustomerDemand(param){
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
     '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
     '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
  ' <soap:Body>'+
  '   <OpptyDemAnalySynchronize_Input xmlns="http://siebel.com/Sales/OpptyDemAnaly">'+
	  '<ListOfHelEaiAppOpportunityDemandAnalysis xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Demand%20Analysis">'+
	  '<Opportunity>'+
	  '<Id>'+param.opptyId+'</Id>'+
	  '<OpptyType>'+param.opptyType+'</OpptyType>';
	 for(var i=0;i<param.store.length;i++){
		 if(param.store[i].demandItem=='display:none;')
			 continue;
		  request +='<ListOfHelOpptyDemandAnalysis>'+
		  '         <HelOpptyDemandAnalysis>';
		  /*if(param.store[i].demandId)
			  request +=  '<Id>'+param.store[i].demandId+'</Id>';*/
		  
			  request += '	<DemandType>'+param.store[i].demandType+'</DemandType>'+
			  '				<DemandItem>'+param.store[i].demandItem+'</DemandItem>'+
			  '				<OpptyId2>'+param.opptyId+'</OpptyId2>';
		  
			  request+='			</HelOpptyDemandAnalysis>'+	
			  '       </ListOfHelOpptyDemandAnalysis>';
		   
	 }
	 request +='</Opportunity>'+
	  '</ListOfHelEaiAppOpportunityDemandAnalysis>'+
  '</OpptyDemAnalySynchronize_Input>'+
 '</soap:Body>'+
'</soap:Envelope>';

	/*param.request = request;    
	return param;*/
var input = {
		method:'post',
		returnedContentType:'xml',                              
		headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyDemAnaly:OpptyDemAnalySynchronize"'},
		path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
		returnedContentEncoding : 'utf-8', 
		body:{
			content:request.toString(),
			contentType:'text/xml;charset=utf-8',
		}
	};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}
//竞争对手查询
function queryCompetitor(param){
	
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	  '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	  '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	  '  <OpptyCompQuery_Input xmlns="http://siebel.com/Sales/OpptyComp">'+
	  '    <ListOfHelEaiAppOpportunityCompetitor xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Competitor">'+
	  '      <ListOfHelCompetitor>'+
	  '        <HelCompetitor Operation="" Searchspec="">'+
	  '          <ParRowId>'+param.parRowId+'</ParRowId>'+
	  '        </HelCompetitor>'+
	  '      </ListOfHelCompetitor>'+
	  '    </ListOfHelEaiAppOpportunityCompetitor>'+
	  '  </OpptyCompQuery_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyComp:OpptyCompQuery"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}
//新建竞争对手
function buildCompetitor(param){
	
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		  '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		  '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	  '  <OpptyCompSynchronize_Input xmlns="http://siebel.com/Sales/OpptyComp">'+
	  '    <ListOfHelEaiAppOpportunityCompetitor xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Competitor">'+
	  '      <ListOfHelCompetitor>'+
	  '        <HelCompetitor Operation="" Searchspec="">';
	  if(param.id)
		  request += '<Id>'+param.Id+'</Id>';
	  else
		  request += '<Id></Id>';
	  request += '<Comments2>'+param.comments2+'</Comments2>'+
	  '          <ComtName>'+param.comtName+'</ComtName>'+
	  '          <ComtProduct>'+param.comtProduct+'</ComtProduct>'+
	  '          <DeliveryDate>'+param.deliveryDate+'</DeliveryDate>'+
	  '          <OpptyStatus>'+param.opptyStatus+'</OpptyStatus>'+
	  '          <ParRowId>'+param.parRowId+'</ParRowId>'+
	  '          <PayAmount>'+param.payAmount+'</PayAmount>'+
	  '          <Quantity>'+param.quantity+'</Quantity>'+
	  '        </HelCompetitor>'+
	  '      </ListOfHelCompetitor>'+
	  '    </ListOfHelEaiAppOpportunityCompetitor>'+
	  '  </OpptyCompSynchronize_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyComp:OpptyCompSynchronize"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}
//商机流失原因删除
function deleteLoseReason(param){
	
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		  '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		  '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	    '<OpptyLosReaDelete_Input xmlns="http://siebel.com/Sales/OpptyLosRea">'+
	      '<ListOfHelEaiAppOpportunityLoseReason xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Lose%20Reason">'+
	        '<ListOfHelOpportunityLoseReason>'+
	         ' <HelOpportunityLoseReason Operation="" Searchspec="">'+
	         '   <Id>'+param.Id+'</Id>'+
	         '   <OpptyId>'+param.opptyId+'</OpptyId>'+
	         ' </HelOpportunityLoseReason>'+
	        '</ListOfHelOpportunityLoseReason>'+
	      '</ListOfHelEaiAppOpportunityLoseReason>'+
	   ' </OpptyLosReaDelete_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>'; 
	
	
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyLosRea:OpptyLosReaDelete"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}
//删除竞争对手分析
function deleteCompetitor(param){
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		  '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		  '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	  '  <OpptyCompDelete_Input xmlns="http://siebel.com/Sales/OpptyComp">'+
	  '    <ListOfHelEaiAppOpportunityCompetitor xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Competitor">'+
	  '      <ListOfHelCompetitor>'+
	  '        <HelCompetitor Operation="" Searchspec="">'+
	  '          <Id>'+param.Id+'</Id>'+
	  '          <ParRowId>'+param.opptyId+'</ParRowId>'+
	  '        </HelCompetitor>'+
	  '      </ListOfHelCompetitor>'+
	  '    </ListOfHelEaiAppOpportunityCompetitor>'+
	  '  </OpptyCompDelete_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyComp:OpptyCompDelete"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}

//代理商业绩查询
function queryAgentAchieve(param){
	
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		  '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		  '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	    '<OpptyAgentQuery_Input xmlns="http://siebel.com/Sales/OpptyAgent">'+
	     ' <ListOfHelEaiAppOpportunityHelAgent xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20HEL%20Agent">'+
	     '   <Opportunity>'+
	     '     <Id>'+param.id+'</Id>'+
	     '     <ListOfHelAgent>'+
	     '       <HelAgent xsi:nil="true">'+
	     '		 	<OpptyId2>'+param.id+'</OpptyId2>'+
	     '		 </HelAgent>'+
	     '     </ListOfHelAgent>'+
	     '   </Opportunity>'+
	     ' </ListOfHelEaiAppOpportunityHelAgent>'+
	    '</OpptyAgentQuery_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyAgent:OpptyAgentQuery"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}
//查询代理商名称
function queryAgentName(param){
	
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		  '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		  '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	  '  <QueryOpptyAcc_Input xmlns="http://siebel.com/Sales/OpptyQuery">'+
	  '    <SearchSpec>'+param.SearchSpec+'</SearchSpec>'+
	  '    <ViewMode>'+param.ViewMode+'</ViewMode>'+
	  '  </QueryOpptyAcc_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyQuery:QueryOpptyAcc"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}
//新增代理商业绩
function agentAchieveSynchronize(param){
	
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		  '<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		  '<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	  '  <OpptyAgentSynchronize_Input xmlns="http://siebel.com/Sales/OpptyAgent">'+
	  '    <ListOfHelEaiAppOpportunityHelAgent xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20HEL%20Agent">'+
	  '      <Opportunity>'+
	  '        <Id>'+param.Id+'</Id>'+
	  '        <ListOfHelAgent>';
	  for(var i=0;i<param.array.length;i++){
		  request+='<HelAgent  Operation="" Searchspec="">';
		  if(param.array[i].agentAchieveId)
			  request+='<Id>'+param.array[i].agentAchieveId+'</Id>';
		  if(param.array[i].primaryField)
			  request+='<PrimaryField>'+param.array[i].primaryField+'</PrimaryField>';
		  if(param.array[i].comments)
			  request+='<Comments>'+param.array[i].comments+'</Comments>';
		  if(param.array[i].performanceShared)
			  request+='<PerformanceShared>'+param.array[i].performanceShared+'</PerformanceShared>';
		  
		  request+='<Agent>'+param.array[i].agent+'</Agent>'+
		  '<HELId>'+param.array[i].helId+'</HELId>'+
		  '<OpptyId2>'+param.Id+'</OpptyId2>'+
		  '</HelAgent>';
	  }
	  request +='</ListOfHelAgent>'+
	  '      </Opportunity>'+
	  '    </ListOfHelEaiAppOpportunityHelAgent>'+
	  '    <ViewMode>'+param.ViewMode+'</ViewMode>'+
	  '  </OpptyAgentSynchronize_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	 /*param.request = request;
	  
	return param;*/
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyAgent:OpptyAgentSynchronize"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}


//2015-10-26 主管代理商
function directorDQRYJzg(SearchSpec,userID){
	WL.Logger.error("FFDLS"+userID);
	
	var request ='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
    '<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
    '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
	'<soap:Body>'+
	    '<QueryOppty_Input xmlns="http://siebel.com/Sales/OpptyQuery">'+
	      '<SearchSpec>'+SearchSpec+'</SearchSpec>'+
	      /*'<ViewMode>Organization</ViewMode>'+*/
	      '<ViewMode>Organization</ViewMode>'+
	     /* '<opp:ViewMode>Manager</opp:ViewMode>'+
	      '<opp:ViewMode>Manager</opp:ViewMode>'+*/
	    '</QueryOppty_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyQuery:QueryOppty"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
		var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}

//查询商机下的代理商
function directorSJXDDL(id,userID){
	WL.Logger.error("FFpp:"+userID);
	var request ='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
    '<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
    '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+    
	'<soap:Body>'+
	    '<OpptyAgentQuery_Input xmlns="http://siebel.com/Sales/OpptyAgent">'+
	      '<ListOfHelEaiAppOpportunityHelAgent xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20HEL%20Agent">'+
	        '<Opportunity>'+
	          '<Id>'+id+'</Id>'+
	          '<ListOfHelAgent>'+
	            '<HelAgent Operation="" Searchspec="">'+
	              '<OpptyId2>'+id+'</OpptyId2>'+
	            '</HelAgent>'+
	          '</ListOfHelAgent>'+
	        '</Opportunity>'+
	      '</ListOfHelEaiAppOpportunityHelAgent>'+
	    '</OpptyAgentQuery_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyAgent:OpptyAgentQuery"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
	var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}

//同意代理商业绩
function perfimranceTYDLSYJ(id,userID){
	
	var request ='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
	    '<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
	    '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+    
		'<soap:Body>'+
	    '<ApproveAgentPer_Input xmlns="http://siebel.com/Sales/OppSubOrLos">'+
	      '<OpptyId>'+id+'</OpptyId>'+
	    '</ApproveAgentPer_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OppSubOrLos:ApproveAgentPer"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
	var result = WL.Server.invokeHttp(input);
		
		return result.Envelope.Body;
}


//驳回代理商业绩
function perfimranceBHDLSYJ(id,userID){
	
	var request ='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+userID+'</UsernameToken>'+
	    '<PasswordText xmlns="http://siebel.com/webservices">'+userID+'</PasswordText>'+
	    '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
		'<soap:Body>'+
	    '<DeclineAgentPer_Input xmlns="http://siebel.com/Sales/OppSubOrLos">'+
	      '<OpptyId>'+id+'</OpptyId>'+
	    '</DeclineAgentPer_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OppSubOrLos:DeclineAgentPer"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
	var result = WL.Server.invokeHttp(input);
		
	return result.Envelope.Body;
}
//提交代理商业绩
function submitAgentAchieve(param){
	
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		'<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	  '  <SubmitAgentPer_Input xmlns="http://siebel.com/Sales/OppSubOrLos">'+
	  '    <OpptyId>'+param.opptyId+'</OpptyId>'+
	  '  </SubmitAgentPer_Input>'+
	 ' </soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OppSubOrLos:SubmitAgentPer"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
	var result = WL.Server.invokeHttp(input);
		
	return result.Envelope.Body;
	
}

//报备列表查询 （HelcAgent）
function clueListQuery(param){
	
	var request ='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
	'<soap:Body>'+
	    '<QueryLeadPage_Input xmlns="http://siebel.com/Sales/Lead">'+
	    '    <NewQuery>'+param.NewQuery+'</NewQuery>'+
		  '    <SearchSpec>'+param.SearchSpec+'</SearchSpec>'+
		  '    <PageSize>'+param.PageSize+'</PageSize>'+
		  '    <SortSpec>'+param.SortSpec+'</SortSpec>'+
		  '    <ViewMode>'+param.ViewMode+'</ViewMode>'+
		  '    <StartRowNum>'+param.StartRowNum+'</StartRowNum>'+
	    '</QueryLeadPage_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	WL.Logger.error("报备查询条件："+request);	
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/Lead:QueryLeadPage"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
	
}

//线索详细信息查询
function clueDetail(param){
	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	'<soap:Body>'+
	    '<LeadQueryById_Input xmlns="http://siebel.com/Sales/LeadDetail">'+
	      '<ListOfHelEaiAppLeadDetail xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Lead%20Detail">'+
	        '<HelLead Operation="" Searchspec="">'+
	        '        <Id>'+param.id+'</Id>'+
	          '</HelLead>'+
	      '</ListOfHelEaiAppLeadDetail>'+
	    '</LeadQueryById_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	WL.Logger.error("详细："+request);	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/LeadDetail:LeadQueryById"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
	
}

//新建报备or修改报备
function clueSynchronize(param){
	//WL.Logger.error("条件51："+result);
	//return param;
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
	  '<soap:Body>'+
	  '  <LeadSynchronize_Input xmlns="http://siebel.com/Sales/LeadDetail">'+
	  '    <ListOfHelEaiAppLeadDetail xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Lead%20Detail">'+
	  '      <HelLead Operation="" Searchspec="">';
	  var clueModel = param.clueModel;
	  var keys = param.fields;//.keys;
	  
	  for(var i=0;i<keys.length;i++){
		  var value = clueModel[""+keys[i]+""];
		  if(keys[i]=='id')
			  continue;
		  if(keys[i]=='HandleDate'||keys[i]=='RegistrationPerson')
			  continue;
		  if(value!=''&&value)
			  request+='<'+keys[i]+'>'+value+'</'+keys[i]+'>';
	  }
	  
	  //跟踪人
	  if(param.position){
		  for(var i=0;i<param.position.length;i++){
			  request+='<ListOfHELLead_AgentPosition>';
			  if(param.position[i].isPrimaryMVG=='Y')
				  request+='<HELLead_AgentPosition IsPrimaryMVG="Y">';
			  else
				  request+='<HELLead_AgentPosition IsPrimaryMVG="N">';
			  request+='	<AgentPositionId>'+param.position[i].PositionId+'</AgentPositionId>'+
			  '		</HELLead_AgentPosition>'+
			  '</ListOfHELLead_AgentPosition>';
		  }
	  }
	  
	  //组织
	  if(param.organization){
		  for(var i=0;i<param.organization.length;i++){
			  request+='<ListOfHELLead_Organization>';
			  
			  if(param.organization[i].isPrimaryMVG=='Y')
				  request+='<HELLead_Organization IsPrimaryMVG="Y">';
			  else
				  request+='<HELLead_Organization IsPrimaryMVG="N">';
			  request+='<OrganizationId>'+param.organization[i].OrganizationId+'</OrganizationId>'+
			  '</HELLead_Organization>'+
			  '</ListOfHELLead_Organization>';
		  }
	  }else{
		  if(clueModel.status!='修改'){
			  request+='<PrimaryOrganizationId></PrimaryOrganizationId>';
		  };
	  }
	  
	  //团队成员
	  if(param.HLPosition){
		  for(var i=0;i<param.HLPosition.length;i++){
			  request+='<ListOfHELLead_Position>';
			  if(param.HLPosition[i].IsPrimaryMVGs=='Y'){
				  request+='<HELLead_Position IsPrimaryMVG="Y">';
			  }else{
				  request+='<HELLead_Position IsPrimaryMVG="N">';
			  }
			  request+='<Position>'+param.HLPosition[i].Name+'</Position>'+
	              '<PositionId>'+param.HLPosition[i].Id+'</PositionId>'+
	              '<SalesLoginName>'+param.HLPosition[i].ActiveLoginName+'</SalesLoginName>'+
	              '<SalesRepId>'+param.HLPosition[i].PrimaryEmployeeId+'</SalesRepId>'+
	              '</HELLead_Position>'+
	              '</ListOfHELLead_Position>';
		  }
	  }
	  
	  request+='      </HelLead>'+
	  '    </ListOfHelEaiAppLeadDetail>'+
	  '    <ViewMode>'+param.ViewMode+'</ViewMode>'+
	  '  </LeadSynchronize_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	  
	//return {result:request,param:param};
	  WL.Logger.error("修改报备："+request);	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/LeadDetail:LeadSynchronize"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
	var result = WL.Server.invokeHttp(input);
		
	return result.Envelope.Body;
	
}

//主管修改完线索状态后，还要提供线索ID,只有状态为审批中才行
function clueSynchronizeTwo(param){
	var request ='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
	'<soap:Body>'+
	    '<Approve_Input xmlns="http://siebel.com/Sales/LeadButton">'+
	      '<LeadId>'+param.LeadId+'</LeadId>'+
	    '</Approve_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/LeadButton:Approve"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
	var result = WL.Server.invokeHttp(input);
		
	return result.Envelope.Body;
}

// 2016-5-23 xcx   主管和营业员线索查询   （没用）
function clueSelectPublic(param){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	  '<soap:Body>'+
	   ' <QueryLeadPage_Input xmlns="http://siebel.com/Sales/Lead">'+
	    '  <NewQuery />'+
	     ' <SearchSpec />'+
	      '<PageSize />'+
	      '<SortSpec />'+
	      '<ViewMode />'+
	      '<StartRowNum />'+
	    '</QueryLeadPage_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/Lead:QueryLeadPage"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
	
	WL.Logger.error("主管or营业员查询:"+request.toString());
	var result = WL.Server.invokeHttp(input);
		
	return result.Envelope.Body;
	
}

//线索关联商机查询  （有分页的商机查询）
function clueHandleDirector_GLSJ(param){
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+  
	'<soap:Body>'+
	    '<QueryOpptyPage_Input xmlns="http://siebel.com/Sales/Lead">'+
	      '<NewQuery>'+param.NewQuery+'</NewQuery>'+
	      '<PageSize>'+param.PageSize+'</PageSize>'+
	      '<SearchSpec>'+param.SearchSpec+'</SearchSpec>'+
	      '<SortSpec>'+param.SortSpec+'</SortSpec>'+
	      '<ViewMode>'+param.ViewMode+'</ViewMode>'+
	      '<StartRowNum>'+param.StartRowNum+'</StartRowNum>'+
	    '</QueryOpptyPage_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	WL.Logger.error("线索关联商机分页查询:"+request.toString());
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/Lead:QueryOpptyPage"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
	var result = WL.Server.invokeHttp(input);
		
	return result.Envelope.Body;
}
//主管相似商机查询
function SameOpptyQueryByXY(param){
	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		'<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	  '  <QueryXYOpty_Input xmlns="http://siebel.com/Sales/OpptyQuery">'+
	  '    <DitH>'+param.DitH+'</DitH>'+
	  '    <LatY>'+param.LatY+'</LatY>'+
	  '    <LonX>'+param.LonX+'</LonX>'+
	  '    <ViewMode>'+param.ViewMode+'</ViewMode>'+
	  '  </QueryXYOpty_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyQuery:QueryXYOpty"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
	var result = WL.Server.invokeHttp(input);
		
	return result.Envelope.Body;
	
}
//待审批商机查询  （没用了）
function approveOppty(param){
	
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		'<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	  '  <ToApproveOppty_Input xmlns="http://siebel.com/Sales/OpptyQuery">'+
	  '   <SearchSpec>'+param.SearchSpec+'</SearchSpec>'+
	    '  <ViewMode>'+param.ViewMode+'</ViewMode>'+
	  '  </ToApproveOppty_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyQuery:ToApproveOppty"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
		
	var result = WL.Server.invokeHttp(input);
		
	return result.Envelope.Body;
}
//主管操作商机(审核，流失，提交大项目部)
function managerOperationOppty(param){
	
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'SOAPAction':param.SoapAction},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:param.xmlStruts,
				contentType:'text/xml;charset=utf-8',
			}
		};
		
	var result = WL.Server.invokeHttp(input);
		
	return result.Envelope.Body;
}
//提交报备
function submitClue(param){
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		'<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	  '  <SubmitRegiste_Input xmlns="http://siebel.com/Sales/LeadButton">'+
	  '    <LeadId>'+param.clueId+'</LeadId>'+
	  '  </SubmitRegiste_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/LeadButton:SubmitRegiste"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//取消报备
function cancelClue(param){
	
	var request ='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		'<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	  '  <CancelRegiste_Input xmlns="http://siebel.com/Sales/LeadButton">'+
	  '    <LeadId>'+param.clueId+'</LeadId>'+
	  '  </CancelRegiste_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/LeadButton:CancelRegiste"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
	
};
//删除报备
function deleteClue(param){
	var request = '<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		'<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+
	  '<soap:Body>'+
	   ' <DeleteRegiste_Input xmlns="http://siebel.com/Sales/LeadDetail">'+
	   '   <ListOfHelEaiAppLeadDetail xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Lead%20Detail">'+
	   '     <HelLead Operation="" Searchspec="">'+
	   '       <Id>'+param.clueId+'</Id>'+
	   '     </HelLead>'+
	   '   </ListOfHelEaiAppLeadDetail>'+
	   ' </DeleteRegiste_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/LeadDetail:DeleteRegiste"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
	WL.Logger.error("代理商删除报备:"+request.toString());
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
}

//主管修改代理商业绩
function ZGxgdlsyj(param){
	WL.Logger.error("FFAA:"+param.userID);
	var request ='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+  
	'<soap:Body>'+
	    '<OpptyAgentSynchronize_Input xmlns="http://siebel.com/Sales/OpptyAgent">'+
	      '<ListOfHelEaiAppOpportunityHelAgent xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20HEL%20Agent">'+
	        '<Opportunity>'+
	          '<Id>'+param.OptyId+'</Id>'+
	          '<ListOfHelAgent>'+
	            '<HelAgent Operation="" Searchspec="">'+
	              '<Id>'+param.Id+'</Id>'+
	              '<Comments>'+param.Comments+'</Comments>'+
	            '</HelAgent>'+
	          '</ListOfHelAgent>'+
	        '</Opportunity>'+
	      '</ListOfHelEaiAppOpportunityHelAgent>'+
	     '<ViewMode>'+param.Organization+'</ViewMode>'+
	    '</OpptyAgentSynchronize_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	//WL.Logger.error("FFAA:"+request.toString());
	//return;
	var input = {
			method:'post',
			returnedContentType:'xml',                              
			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyAgent:OpptyAgentSynchronize"'},
			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
			returnedContentEncoding : 'utf-8', 
			body:{
				content:request.toString(),
				contentType:'text/xml;charset=utf-8',
			}
		};
	
	var result = WL.Server.invokeHttp(input);
	
	return result.Envelope.Body;
	
};


/*
 * 经销商所使用的接口   xcx 2016-5-17
 */

//经销商 新建报备
function clueSynchronizeNew(param){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
	'<soap:Body>'+
	    '<LeadSynchronize_Input xmlns="http://siebel.com/Sales/LeadDetail">'+
	      '<ListOfHelEaiAppLeadDetail xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Lead%20Detail">'+
	        '<HelLead Operation="" Searchspec="">';
	        var clueModel = param.clueModel;
	  var keys = param.fields;//.keys;
	  
	  for(var i=0;i<keys.length;i++){
		  var value = clueModel[""+keys[i]+""];
		/*  if(keys[i]=='id')
			  continue;
		  if(keys[i]=='HandleDate'||keys[i]=='RegistrationPerson')
			  continue;*/
		  if(value!=''&&value)
			  request+='<'+keys[i]+'>'+value+'</'+keys[i]+'>';
	  }
	  request+='<LeadNumber></LeadNumber>'+
		  '</HelLead>'+
	      '</ListOfHelEaiAppLeadDetail>'+
	      '<ViewMode>'+param.ViewMode+'</ViewMode>'+
	    '</LeadSynchronize_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	        
	var input = {
		method:'post',
	    returnedContentType:'xml',                              
	    			headers: {'Accept-Encoding': 'identity','SOAPAction':'"document/http://siebel.com/Sales/LeadDetail:LeadSynchronize"'},
	    			path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
	    			returnedContentEncoding : 'utf-8', 
	    			body:{
	    				content:request.toString(),
	    				contentType:'text/xml;charset=utf-8',
	    			}
	  };
	    		
	  var result = WL.Server.invokeHttp(input);
	  WL.Logger.error("代理商新建报备："+request);   
	  return result.Envelope.Body;
}

/**
 * BP下项目 职位接口   2016-6-2
 */ 
//查询职位
function zwSelect(param){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		'<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+  
		'<soap:Body>'+
	    '<QueryPosition_Input xmlns="http://siebel.com/Sales/ChangePostn">'+
	      '<ListOfHelEaiAppEmployeeDetailsInformation xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Employee%20Details%20Information">'+
	        '<Employee Operation="">'+
	          '<LoginName>'+param.userID+'</LoginName>'+
	        '</Employee>'+
	      '</ListOfHelEaiAppEmployeeDetailsInformation>'+
	    '</QueryPosition_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	WL.Logger.error("查询职位："+request);
	var input = {
			method:'post',
		    returnedContentType:'xml',                              
		    headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/ChangePostn:QueryPosition"'},
		    path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
		    returnedContentEncoding : 'utf-8', 
		    body:{
		    	content:request.toString(),
		    	contentType:'text/xml;charset=utf-8',
		    }
	};
		    		
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

//修改职位
function xgPosition(param){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		'<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+  
		'<soap:Body>'+
	    '<ChangePosition_Input xmlns="http://siebel.com/Sales/ChangePostn">'+
	      '<PositionId>'+param.positionDataId+'</PositionId>'+
	      '<LoginId>'+param.PositionID+'</LoginId>'+
	    '</ChangePosition_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	WL.Logger.error("修改职位："+request);
	var input = {
			method:'post',
		    returnedContentType:'xml',                              
		    headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/ChangePostn:ChangePosition"'},
		    path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
		    returnedContentEncoding : 'utf-8', 
		    body:{
		    	content:request.toString(),
		    	contentType:'text/xml;charset=utf-8',
		    }
	};
		    		
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

//新建修改 关注人
function getnewGZR(param){
	/*var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+ 
		'<soap:Body>'+
	    '<OpptyDetailSynchronize_Input xmlns="http://siebel.com/Sales/OpptyDetail">'+
	      '<ListOfHelEaiAppOpportunityDetail xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Detail">'+
	        '<Opportunity Operation="" Searchspec="">'+
	        '<Id>'+param.Id+'</Id>'+
	          
	          '<ListOfOpportunity_Position-Attention>'+
	            '<Opportunity_Position-Attention IsPrimaryMVG="" Operation="">'+
	              '<Position-Attention>'+param.Position+'</Position-Attention>'+
	              '<PositionId-Attention>'+param.PositionId+'</PositionId-Attention>'+
	              '<SalesRep-Attention>'+param.SalesRep+'</SalesRep-Attention>'+
	              '<SalesRepId-Attention>'+param.SalesRepId+'</SalesRepId-Attention>'+
	            '</Opportunity_Position-Attention>'+
	          '</ListOfOpportunity_Position-Attention>'+
	          
	          
	        '</Opportunity>'+
	      '</ListOfHelEaiAppOpportunityDetail>'+
	      '<ViewMode>'+param.ViewMode+'</ViewMode>'+
	    '</OpptyDetailSynchronize_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';*/
	
	var request='<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:opp="http://siebel.com/Sales/OpptyDetail" xmlns:hel="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Detail">'+
	   '<soapenv:Header>'+
	      '<UsernameToken xmlns="http://siebel.com/webservices">PDA</UsernameToken>'+
	      '<PasswordText xmlns="http://siebel.com/webservices">PDA</PasswordText>'+
	      '<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+
	   '</soapenv:Header>'+
	   '<soapenv:Body>'+
	      '<opp:OpptyDetailSynchronize_Input>'+
	         '<hel:ListOfHelEaiAppOpportunityDetail>'+
	            '<hel:Opportunity Operation="" Searchspec="">'+
	               '<hel:Id>'+param.Id+'</hel:Id>'+
	               '<hel:ListOfOpportunity_Position-Attention>'+
	                  '<hel:Opportunity_Position-Attention>'+
	                     '<hel:PositionId-Attention>'+param.SalesRepId+'</hel:PositionId-Attention>'+
	                  '</hel:Opportunity_Position-Attention>'+
	               '</hel:ListOfOpportunity_Position-Attention>'+
	            '</hel:Opportunity>'+
	         '</hel:ListOfHelEaiAppOpportunityDetail>'+
	         '<opp:ViewMode>All</opp:ViewMode>'+
	      '</opp:OpptyDetailSynchronize_Input>'+
	   '</soapenv:Body>'+
	'</soapenv:Envelope>';

	
	WL.Logger.error("新建修改关注人："+request);
	var input = {
			method:'post',
		    returnedContentType:'xml',                              
		    headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyDetail:OpptyDetailSynchronize"'},
		    path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
		    returnedContentEncoding : 'utf-8', 
		    body:{
		    	content:request.toString(),
		    	contentType:'text/xml;charset=utf-8',
		    }
	};
		    		
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

//查看关注人详细信息
function getDetailedGZR(param){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
		'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
		'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
		'<SessionType xmlns="http://siebel.com/webservices">Stateless </SessionType>'+  
		'<soap:Body>'+
	    '<OpptyDetailQuery_Input xmlns="http://siebel.com/Sales/OpptyDetail">'+
	      '<PrimaryRowId>'+param.id+'</PrimaryRowId> '+
	      '<ListOfHelEaiAppOpportunityDetail xmlns="http://www.siebel.com/xml/HEL%20EAI%20APP%20Opportunity%20Detail">'+
	        '<Opportunity Operation="" Searchspec="">'+
	        '</Opportunity>'+
	      '</ListOfHelEaiAppOpportunityDetail>'+
	    '</OpptyDetailQuery_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
		
	WL.Logger.error("关注人详细信息："+request);
	var input = {
			method:'post',
		    returnedContentType:'xml',                              
		    headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/OpptyDetail:OpptyDetailQuery"'},
		    path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
		    returnedContentEncoding : 'utf-8', 
		    body:{
		    	content:request.toString(),
		    	contentType:'text/xml;charset=utf-8',
		    }
	};
		    		
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

//自动报价(状态要为跟进 )
function getZDBJ(param){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+  
	'<soap:Body>'+
	    '<OpptyAutoQuote_Input xmlns="http://siebel.com/Sales/Contr">'+
	      '<OpptyId>'+param.Id+'</OpptyId>'+
	    '</OpptyAutoQuote_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
		
	WL.Logger.error("自动报价："+request);
	var input = {
			method:'post',
		    returnedContentType:'xml',                              
		    headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/Contr:OpptyAutoQuote"'},
		    path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
		    returnedContentEncoding : 'utf-8', 
		    body:{
		    	content:request.toString(),
		    	contentType:'text/xml;charset=utf-8',
		    }
	};
		    		
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}

//客户管理模块     子客户查询
function getSubcustomersSelect(param){
	var request='<?xml version="1.0" encoding="utf-8"?>'+
	'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
	'<UsernameToken xmlns="http://siebel.com/webservices">'+param.userID+'</UsernameToken>'+
	'<PasswordText xmlns="http://siebel.com/webservices">'+param.userID+'</PasswordText>'+
	'<SessionType xmlns="http://siebel.com/webservices">Stateless</SessionType>'+    
	'<soap:Body>'+
	    '<QueryAccountPage_Input xmlns="http://siebel.com/Sales/AccQuery">'+
	      '<NewQuery>'+param.NewQuery+'</NewQuery>'+
	      '<PageSize>'+param.PageSize+'</PageSize>'+
	      '<SearchSpec>'+param.SearchSpec+'</SearchSpec>'+
	      '<ViewMode>'+param.ViewMode+'</ViewMode>'+
	      '<StartRowNum>'+param.StartRowNum+'</StartRowNum>'+
	    '</QueryAccountPage_Input>'+
	  '</soap:Body>'+
	'</soap:Envelope>';
	
	WL.Logger.error("子客户查询："+request);
	var input = {
			method:'post',
		    returnedContentType:'xml',                              
		    headers: {'Accept-Encoding':'identity','SOAPAction':'"document/http://siebel.com/Sales/AccQuery:QueryAccountPage"'},
		    path:'eai_chs/start.swe?SWEExtSource=WebService&SWEExtCmd=Execute&WSSOAP=1',
		    returnedContentEncoding : 'utf-8', 
		    body:{
		    	content:request.toString(),
		    	contentType:'text/xml;charset=utf-8',
		    }
	};
		    		
	var result = WL.Server.invokeHttp(input);
	return result.Envelope.Body;
}


