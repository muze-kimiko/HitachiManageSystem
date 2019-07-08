/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.helc.helcapprove.tbjoption;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.json.JSONArray;
import org.json.JSONObject;

import com.siebel.data.SiebelBusComp;
import com.siebel.data.SiebelBusObject;
import com.siebel.data.SiebelDataBean;
import com.siebel.data.SiebelException;
import com.siebel.data.SiebelPropertySet;
import com.siebel.data.SiebelService;

/**
 *
 */
public class ApproveOperationImpl {

	static final Logger logger = Logger.getLogger(ApproveOperationImpl.class
			.getName());
	private SiebelDataBean dataBean;

	public ApproveOperationImpl() {
	}
	
	public ApproveOperationImpl(SiebelDataBean dataBean) {
		super();
		this.dataBean = dataBean;
	}

	/**
	 * 登录siebel
	 * 
	 * @param UserName
	 *            siebel用户名
	 * @param Password
	 *            siebel密码
	 * @return
	 */
	private boolean login(String UserName, String Password) {
		boolean result = false;
		int tryTimes = 0;

		//String connectString = "siebel://10.96.128.70:2321/Siebel/SSEObjMgr_chs"; // 测试：10.98.199.17  正式：10.96.128.96
		String connectString = "siebel://10.98.199.17:2321/Siebel/SSEObjMgr_chs"; // 测试：10.98.199.17  正式：10.96.128.96
		String Lang = "chs";
		System.setProperty("file.encoding", "UTF-8");
		logger.log(Level.CONFIG, System.getProperty("file.encoding"));
		dataBean = new SiebelDataBean();
		// 若登陆失败则尝试5次重连
		while (!result && tryTimes < 5) {
			try {
				result = dataBean
						.login(connectString, UserName, Password, Lang);
			} catch (SiebelException ex) {
				logger.log(Level.SEVERE, "Siebel Login Error", ex);
			}
			tryTimes++;
			logger.log(Level.INFO, "第{0}次尝试,登陆结果{1}", new Object[] { tryTimes,
					result });
		}

		return result;
	}

	/**
	 * 登出siebel
	 */
	private void logOff() throws SiebelException {
		try {
			if (dataBean != null) {
				dataBean.logoff();
				dataBean = null;
			}
		} catch (SiebelException ex) {
			Logger.getLogger(ApproveOperationImpl.class.getName()).log(
					Level.SEVERE, "Siebel logOff Error", ex);
			throw ex;
		}
	}

	/**
	 * 登录后，执行审批操作前进行数据保存
	 */
	private void saveData(String recordId,
			List<Map<String, String>> serviceFee,
			List<Map<String, String>> payRatio, Map<String, String> quote)
			throws SiebelException {
		SiebelBusObject busObject = null;
		SiebelBusComp busComp = null;
		SiebelBusComp busCompService = null;
		SiebelBusComp busCompPayRatio = null;
		try {
			// 登陆成功， 接下来需要设置行上的服务费用点数和点评
			busObject = dataBean.getBusObject("Quote");// bo
			busComp = busObject.getBusComp("Quote");// 服务费用
			busCompService = busObject
					.getBusComp("HEL Opportunity Agent - Copy");// 服务费用
			busCompPayRatio = busObject
					.getBusComp("HEL Payment Pattern Item - Quote");// 付款比例

			busComp.setViewMode(3);
			busComp.clearToQuery();
			busComp.activateField("Equipment Forward Price2");// 建议营业设备期望价
			busComp.activateField("Three Agreement Price2");// 建议营销司设备合同价
			busComp.activateField("HEL Shipping Forward Price");// 建议运输期望价
			busComp.activateField("HEL Shipping App Discount");// 建议运输浮率
			busComp.activateField("TBJ Approved Suggestion");// TBJ审批意见
			busComp.activateField("Equipment Approve Discount2");// 建议设备价浮率
			busComp.activateField("Three Agreement Price Discount2");// 建议营销司三方合同浮率

			busComp.activateField("Quote Read Only Flag");//
			busComp.activateField("Technology Approve Status");//
			busComp.activateField("TBJ Approve Status");//
			busComp.activateField("Quote Lock Flag");//

			busComp.activateField("Id");
			busComp.setSearchExpr("[Id]='" + recordId + "'");
			busComp.executeQuery(true);

			logger.warning("222222222222222：" + busComp.firstRecord());
			if (busComp.firstRecord()) {
				// 查询服务费用的情况并且更新

				logger.log(
						Level.INFO,
						"Equipment Forward Price2 = " + quote.get("adprice")
								+ " TBJ Approved Suggestion = "
								+ quote.get("tbjnote")
								+ "Equipment Approve Discount2 = "
								+ quote.get("arate")
								+ "HEL Shipping Forward Price = "
								+ quote.get("atprice")
								+ "HEL Shipping App Discount ="
								+ quote.get("atrate"));
				busComp.setFieldValue("Equipment Forward Price2",
						quote.get("adprice"));// 建议营业设备期望价
				busComp.setFieldValue("Equipment Approve Discount2",
						quote.get("arate"));// 建议设备价浮率
				busComp.setFieldValue("HEL Shipping Forward Price",
						quote.get("atprice"));// 建议运输期望价
				busComp.setFieldValue("HEL Shipping App Discount",
						quote.get("atrate"));// 建议运输浮率
				busComp.setFieldValue("TBJ Approved Suggestion",
						quote.get("tbjnote"));// TBJ审批意见
				// busComp.setFieldValue("Three Agreement Price2",
				// "ttt");//建议营销司设备合同价
				// busComp.setFieldValue("Three Agreement Price Discount2",
				// "ttt");//建议营销司三方合同浮率
				
				busComp.writeRecord();

				// ----------服务费用
				busCompService.setViewMode(3);
				busCompService.clearToQuery();
				busCompService.activateField("Approve Service Point");// 建议点数
				// busCompService.activateField("Approve Add Point");//服务费批复总点数
				busCompService.activateField("Approve Comment");// 批复说明

				if (serviceFee != null || !serviceFee.isEmpty()) {
					Iterator<Map<String, String>> iter = serviceFee.iterator();
					while (iter.hasNext()) {
						Map<String, String> elem = iter.next();
						// String approveServicePoint = elem.get("gpoint");
						String addServicePoint = elem.get("acceptedFee"); // 服务费批复总点数
						String approveComment = elem.get("gdetail");
						String serviceFeeId = elem.get("recordId");

						busCompService.activateField("Id");
						busCompService.setSearchExpr("[Id]='" + serviceFeeId
								+ "'");
						busCompService.executeQuery(true);
						if (busCompService.firstRecord()) {

							try {
								// System.out.println("Approve Service Point = "
								// + addServicePoint + " Approve Comment = "+
								// approveComment);
								busCompService.setFieldValue(
										"Approve Service Point",
										addServicePoint);// 服务费批复总点数
								// busCompService.setFieldValue("Approve Add Point",
								// addServicePoint); //服务费批复总点数
								busCompService.setFieldValue("Approve Comment",
										approveComment);// 批复说明

								busCompService.writeRecord();
							} catch (SiebelException ex1) {
								busCompService.undoRecord();
								throw ex1;
							}

						} else {
							logger.log(Level.WARNING, "未找到服务费用信息");
						}
					}
				}

				// ----------建议支付比例（建议支付方式）
				busCompPayRatio.setViewMode(3);
				busCompPayRatio.clearToQuery();
				busCompPayRatio.activateField("HEL Approval Ratio");// 建议比例

				if (payRatio != null || !payRatio.isEmpty()) {
					Iterator<Map<String, String>> iter = payRatio.iterator();
					while (iter.hasNext()) {
						Map<String, String> elem = iter.next();
						String suggestProportion = elem.get("sugproportion");
						String payRateId = elem.get("recordId");

						busCompPayRatio.activateField("Id");
						busCompPayRatio.setSearchExpr("[Id]='" + payRateId
								+ "'");
						busCompPayRatio.executeQuery(true);
						if (busCompPayRatio.firstRecord()) {

							try {
								logger.log(Level.INFO, "HEL Approval Ratio = "
										+ suggestProportion);
								busCompPayRatio
										.setFieldValue("HEL Approval Ratio",
												suggestProportion);// 建议支付比例

								busCompPayRatio.writeRecord();
							} catch (SiebelException ex1) {
								busCompPayRatio.undoRecord();
								throw ex1;
							}

						} else {
							logger.log(Level.WARNING, "未找到付款比例信息");
						}
					}
				}
				// 然后更新审批备注信息等。

			} else {
				logger.log(Level.WARNING, "未找到审批信息");
			}

		} catch (SiebelException ex) {
			busComp.undoRecord();
			throw ex;
		} finally {
			if (busCompService != null) {
				busCompService.release();
			}
			if (busComp != null) {
				busComp.release();
			}
			if (busObject != null) {
				busObject.release();
			}
		}
	}

	// 检查当前用户是否能点击保留意见按钮
	public Boolean checkReserve(String userName, SiebelDataBean siebelDataBean) {
		SiebelBusObject boPosition = null;
		SiebelBusComp bcPosition = null;
		try {
			boPosition = siebelDataBean.getBusObject("Position");
			bcPosition = boPosition.getBusComp("Position");

			bcPosition.activateField("Division");
			bcPosition.activateField("ReserveSuggestion Inactive");
			bcPosition.clearToQuery();
			bcPosition.setViewMode(3);
			bcPosition.setSearchExpr("EXISTS([Login Name] = '" + userName
					+ "')");
			bcPosition.executeQuery(true);

			if (bcPosition.firstRecord()) {
				String sDivision = bcPosition.getFieldValue("Division");
				String bReserve = bcPosition
						.getFieldValue("ReserveSuggestion Inactive");

				if (sDivision.equalsIgnoreCase("营业工程总部")
						&& !bReserve.equalsIgnoreCase("Y")) {
					return true;
				}
			}

		} catch (Exception ex) {
			try {
				bcPosition.undoRecord();
			} catch (SiebelException ex1) {
				Logger.getLogger(ApproveOperationImpl.class.getName()).log(
						Level.SEVERE, null, ex1);
			}
			logger.log(Level.SEVERE, "保留意见出错。", ex);

		} finally {
			if (bcPosition != null) {
				bcPosition.release();
			}
			if (boPosition != null) {
				boPosition.release();
			}
		}

		return false;
	}

	public void test() {
		logger.log(Level.SEVERE, "555555555");  
	}
	
	public String pass(String UserName, String Password, String recordId,
			String strServiceFee,
			String strPayRatio, String strQuote) {
		String ReturnMsg = null;
		String ErrorMessage = null;
		boolean loginSuccess = false;
		SiebelService businessService = null;
		
		List<Map<String, String>> serviceFee = new ArrayList<Map<String, String>>();
		List<Map<String, String>> payRatio = new ArrayList<Map<String,String>>();
		Map<String, String> quote = new HashMap<String, String>();
		try {
			// 服务
			JSONArray jaServiceFee = new JSONArray(strServiceFee);
			int length = jaServiceFee.length();
			JSONObject jo = null;
			HashMap<String, String> map = null;
			for (int i = 0; i < length; i++) {
				jo = jaServiceFee.optJSONObject(i);
				map = parserToMap(jo);
				serviceFee.add(map);
			}
			
			// 付费比例
			JSONArray jaPayRatio = new JSONArray(strPayRatio);
			length = jaPayRatio.length();
			for (int i = 0; i < length; i++) {
				jo = jaPayRatio.optJSONObject(i);
				map = parserToMap(jo);
				payRatio.add(map);
			}
			
			// TBJMAIN
			JSONObject joQuote = new JSONObject(strQuote);
			quote = parserToMap(joQuote);
			
			// 登录Siebel
			loginSuccess = login(UserName, Password);
			// 保存审批信息
			if (loginSuccess) {
				saveData(recordId, serviceFee, payRatio, quote);
				SiebelPropertySet input = new SiebelPropertySet();
				SiebelPropertySet output = new SiebelPropertySet();
				businessService = dataBean
						.getService("HEL Quote TBJ Approval Service");
				input.setProperty("quoteId", recordId);// 报价Id
				input.setProperty("sSuggestProdPri", quote.get("adprice").trim());// 建议营业两方设备价
				input.setProperty("sSuggestProdPriDis", quote.get("arate").trim());// 建议营业两方设备价浮率
				input.setProperty("sSuggestShipPri", quote.get("atprice").trim());// 建议运输费期望价
				input.setProperty("sSuggestShipPriDis", quote.get("atrate").trim());// 建议运输费期望价浮率

				businessService.invokeMethod("PassEquTBJApproved", input,
						output);
				ErrorMessage = output.getProperty("ErrorMessage");

				if (ErrorMessage != null && !ErrorMessage.equals("")) {
					ReturnMsg = "没有维护产品：" + ErrorMessage + "审批权限,请联系管理员！";
				} else {
					ReturnMsg = "success";
				}
			} else {
				ReturnMsg = "网络故障，请稍候再试!";
			}

		} catch (SiebelException ex) {
			if (ErrorMessage != null && !ErrorMessage.equals("")) {
				ReturnMsg = "没有维护产品：" + ErrorMessage + "审批权限,请联系管理员！";
			} else {
				ReturnMsg = ex.getErrorMessage();
			}
			logger.log(Level.SEVERE, ReturnMsg, ex);
		} catch (Exception e) {
			logger.warning(e.toString());
			ReturnMsg = "程序出错，请联系维护员！";
			logger.log(Level.SEVERE, "出错！");
		} finally {
			try {
				if (businessService != null) {
					businessService.release();
					businessService = null;
				}
				// 登出Siebel
				// if(loginSuccess) {
				logOff();
				// }

			} catch (SiebelException ex) {
				logger.log(Level.SEVERE, null, ex);
			}
		}
		return ReturnMsg;
	}
	/*
	public String pass2(String UserName, String Password, String recordId,
			String serviceFee,
			String payRatio, String quote) {
		logger.warning("serviceFee: " + serviceFee);
		try {
			org.json.JSONArray ja = new org.json.JSONArray(serviceFee);
			logger.warning("ja: " + ja.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}*/

	public String reserve(String UserName, String Password, String recordId,
			String strServiceFee,
			String strPayRatio, String strQuote) {
		String ReturnMsg = null;
		String ErrorMessage = null;
		Boolean bReserve = false;
		boolean loginSuccess = false;
		SiebelService businessService = null;
		
		List<Map<String, String>> serviceFee = new ArrayList<Map<String, String>>();
		List<Map<String, String>> payRatio = new ArrayList<Map<String,String>>();
		Map<String, String> quote = new HashMap<String, String>();
		try {
			// 服务
			JSONArray jaServiceFee = new JSONArray(strServiceFee);
			int length = jaServiceFee.length();
			JSONObject jo = null;
			HashMap<String, String> map = null;
			for (int i = 0; i < length; i++) {
				jo = jaServiceFee.optJSONObject(i);
				map = parserToMap(jo);
				serviceFee.add(map);
			}
			
			// 付费比例
			JSONArray jaPayRatio = new JSONArray(strPayRatio);
			length = jaPayRatio.length();
			for (int i = 0; i < length; i++) {
				jo = jaPayRatio.optJSONObject(i);
				map = parserToMap(jo);
				payRatio.add(map);
			}
			
			// TBJMAIN
			JSONObject joQuote = new JSONObject(strQuote);
			quote = parserToMap(joQuote);
			
			// 登录Siebel
			loginSuccess = login(UserName, Password);
			// 保存审批信息
			if (loginSuccess) {
				saveData(recordId, serviceFee, payRatio, quote);
				bReserve = checkReserve(UserName, dataBean);

				if (bReserve) {
					SiebelPropertySet input = new SiebelPropertySet();
					SiebelPropertySet output = new SiebelPropertySet();
					businessService = dataBean
							.getService("HEL Quote TBJ Approval Service");

					input.setProperty("quoteId", recordId);
					businessService.invokeMethod("EquReserveSuggestion", input,
							output);
					ErrorMessage = output.getProperty("ErrorMessage");

					if (ErrorMessage != null && !ErrorMessage.equals("")) {
						ReturnMsg = "没有维护产品：" + ErrorMessage + "审批权限,请联系管理员！";
					} else {
						ReturnMsg = "success";
					}

				} else {
					ReturnMsg = "您的当前审批权限已是最高，不能点击保留意见按钮。";
				}
			} else {
				ReturnMsg = "网络故障，请稍候再试!";
			}
		} catch (SiebelException ex) {
			if (ErrorMessage != null && !ErrorMessage.equals("")) {
				ReturnMsg = "没有维护产品：" + ErrorMessage + "审批权限,请联系管理员！";
			} else {
				ReturnMsg = ex.getErrorMessage();
			}
			logger.log(Level.SEVERE, ReturnMsg, ex);
		} catch(Exception e) {
			ReturnMsg = "程序出错，请联系维护员！";
			e.printStackTrace();
		} finally {
			try {
				if (businessService != null) {
					businessService.release();
					businessService = null;
				}
				// 登出Siebel
				// if(loginSuccess) {
				logOff();
				// }

			} catch (SiebelException ex) {
				logger.log(Level.SEVERE, null, ex);
			}
		}
		return ReturnMsg;
	}

	public String refuse(String UserName, String Password, String recordId,
			String strServiceFee,
			String strPayRatio, String strQuote) {
		String ReturnMsg = null;
		String ErrorMessage = null;
		boolean loginSuccess = false;
		SiebelService businessService = null;
		
		List<Map<String, String>> serviceFee = new ArrayList<Map<String, String>>();
		List<Map<String, String>> payRatio = new ArrayList<Map<String,String>>();
		Map<String, String> quote = new HashMap<String, String>();
		try {
			// 服务
			JSONArray jaServiceFee = new JSONArray(strServiceFee);
			int length = jaServiceFee.length();
			JSONObject jo = null;
			HashMap<String, String> map = null;
			for (int i = 0; i < length; i++) {
				jo = jaServiceFee.optJSONObject(i);
				map = parserToMap(jo);
				serviceFee.add(map);
			}
			
			// 付费比例
			JSONArray jaPayRatio = new JSONArray(strPayRatio);
			length = jaPayRatio.length();
			for (int i = 0; i < length; i++) {
				jo = jaPayRatio.optJSONObject(i);
				map = parserToMap(jo);
				payRatio.add(map);
			}
			
			// TBJMAIN
			JSONObject joQuote = new JSONObject(strQuote);
			quote = parserToMap(joQuote);
			
			// 登录Siebel
			loginSuccess = login(UserName, Password);
			// 保存审批信息
			if (loginSuccess) {
				saveData(recordId, serviceFee, payRatio, quote);

				SiebelPropertySet input = new SiebelPropertySet();
				SiebelPropertySet output = new SiebelPropertySet();
				businessService = dataBean
						.getService("HEL Quote TBJ Approval Service");
				input.setProperty("quoteId", recordId);
				input.setProperty("sSuggestProdPri", quote.get("adprice"));// 建议营业两方设备价
				input.setProperty("sSuggestProdPriDis", quote.get("arate"));// 建议营业两方设备价浮率
				input.setProperty("sSuggestShipPri", quote.get("atprice"));// 建议运输费期望价
				input.setProperty("sSuggestShipPriDis", quote.get("atrate"));// 建议运输费期望价浮率
				input.setProperty("vAppvSugg", quote.get("tbjnote"));// TBJ审批意见
				input.setProperty("sShippingForwardPrice", quote.get("tprice"));// 运输期望价
				input.setProperty("sEquipmentForwardPrice", quote.get("dprice"));// 设备期望价
				input.setProperty("sEquipmentApproveDiscount",
						quote.get("drate"));// 设备浮率
				input.setProperty("sShippingApproveDiscount",
						quote.get("trate"));// 运输浮率

				businessService
						.invokeMethod("RefuseTBJApproved", input, output);
				ErrorMessage = output.getProperty("ErrorMessage");

				if (ErrorMessage != null && !ErrorMessage.equals("")) {
					ReturnMsg = "没有维护产品：" + ErrorMessage + "审批权限,请联系管理员！";
				} else {
					ReturnMsg = "success";
				}
			} else {
				ReturnMsg = "网络故障，请稍候再试!";
			}

		} catch (SiebelException ex) {
			if (ErrorMessage != null && !ErrorMessage.equals("")) {
				ReturnMsg = "没有维护产品：" + ErrorMessage + "审批权限,请联系管理员！";
			} else {
				ReturnMsg = ex.getErrorMessage();
			}
			logger.log(Level.SEVERE, ReturnMsg, ex);
		} catch (Exception e) {
			ReturnMsg = "程序出错，请联系维护员！";
			e.printStackTrace();
		} finally {
			try {
				if (businessService != null) {
					businessService.release();
					businessService = null;
				}
				// 登出Siebel
				// if(loginSuccess) {
				logOff();
				// }
			} catch (SiebelException ex) {
				logger.log(Level.SEVERE, null, ex);
			}
		}
		return ReturnMsg;
	}
	
	 public static HashMap parserToMap(JSONObject json){
		 	HashMap map=new HashMap();
			Iterator keys=json.keys();
			try {
				while(keys.hasNext()){
					String key=(String) keys.next();
					String value=json.get(key).toString();
					if(value.startsWith("{")&&value.endsWith("}")){
						map.put(key, parserToMap(json));
					}else{
						map.put(key, value);
					}
					
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return map;
		}
}

