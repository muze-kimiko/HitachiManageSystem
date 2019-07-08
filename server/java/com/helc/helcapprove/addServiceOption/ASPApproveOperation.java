/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.helc.helcapprove.addServiceOption;

import com.helc.helcapprove.addServiceOption.SystemSetting;
import com.helc.helcapprove.tbjoption.ApproveOperationImpl;
import com.siebel.data.SiebelBusComp;
import com.siebel.data.SiebelBusObject;
import com.siebel.data.SiebelDataBean;
import com.siebel.data.SiebelException;
import com.siebel.data.SiebelPropertySet;
import com.siebel.data.SiebelService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author ipadadmin
 */
public class ASPApproveOperation {
    
    private final String BC_NAME = "Quote";
    private SiebelDataBean dataBean;
    private static final Logger logger = Logger.getLogger(ASPApproveOperation.class.getName());
    private String connectString = null;
    private String Lang = null;
    /**
     * 登录siebel
     *
     * @param UserName siebel用户名
     * @param Password siebel密码
     * @return
     */
    private boolean login(String UserName, String Password) {
        boolean result = false;
        int tryTimes = 0;
//            connectString = SystemSetting.getSettingValue("Siebel.ConnectString");
//            Lang = SystemSetting.getSettingValue("Siebel.Language");
//        	connectString = this.getConnectString();
//        	Lang = this.getLang();
	        //String connectString = "siebel://10.96.128.70:2321/Siebel/SSEObjMgr_chs";// 测试：10.98.199.17  正式：10.96.128.96
        	String connectString = "siebel://10.98.199.17:2321/Siebel/SSEObjMgr_chs";// 测试：10.98.199.17  正式：10.96.128.96
			String Lang = "chs";
            System.setProperty("file.encoding", "UTF-8");
            logger.log(Level.CONFIG, System.getProperty("file.encoding"));
            dataBean = new SiebelDataBean();
            //若登陆失败则尝试5次重连
            while(!result && tryTimes < 5) {
                try {
                	logger.warning("connectString="+connectString +";UserName="+UserName +";Password="+Password+"    Lang"+Lang);
                    result = dataBean.login(connectString, UserName, Password, Lang);
                } catch (SiebelException ex) {
                    logger.log(Level.SEVERE, "Siebel Login Error", ex);
                }
                tryTimes ++;
                logger.log(Level.INFO, "第{0}次尝试,登陆结果{1}",new Object[]{tryTimes,result});
            }
            logger.warning("ffffff");
        
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
            Logger.getLogger(ApproveOperationImpl.class.getName()).log(Level.SEVERE, "Siebel logOff Error", ex);
            throw ex;
        }
    }
     /**
     * 登录后，执行审批操作前进行数据保存
     */
    private void saveData(SiebelBusComp busCompService, List<Map<String, String>> serviceFeeAcceptSum) throws SiebelException {
    	/**/
    	SiebelBusObject busObject = null;
        SiebelBusComp approveSuggestionS = null;
        busObject = dataBean.getBusObject("Quote");//bo
        approveSuggestionS = busObject.getBusComp("Quote");
        try{
            Map<String, String> record = null;
            busCompService.activateField("Id");
            busCompService.activateField("Approve Add Point");
            for(int i=0; i<serviceFeeAcceptSum.size(); i++) {
                record = serviceFeeAcceptSum.get(i);
                busCompService.clearToQuery();
                busCompService.setViewMode(3);
                busCompService.setSearchExpr("[Id]='" + record.get("recordId") + "'");
                busCompService.executeQuery(true);
                logger.log(Level.SEVERE, "record id is:{0}, Approve Add Point:{1}",new Object[]{record.get("recordId"),record.get("currentAccept")});
                if(busCompService.firstRecord()) {
                    busCompService.setFieldValue("Approve Add Point", record.get("currentAccept"));
                    busCompService.writeRecord();
                }
            }  
            /**/
            logger.warning("refuseCommentt: " + serviceFeeAcceptSum.get(0).get("refuseComment"));
            logger.warning("mainId: " + serviceFeeAcceptSum.get(0).get("mainId"));
            if (serviceFeeAcceptSum.size() > 0) {
            	approveSuggestionS.clearToQuery();
            	approveSuggestionS.setViewMode(3);
            	approveSuggestionS.activateField("Id");
            	approveSuggestionS.activateField("Add Service Approved Suggestion");
            	approveSuggestionS.setSearchExpr("[Id]='" + serviceFeeAcceptSum.get(0).get("mainId") + "'");
            	approveSuggestionS.executeQuery(true);
            	if (approveSuggestionS.firstRecord()) {
	            	approveSuggestionS.setFieldValue("Add Service Approved Suggestion",serviceFeeAcceptSum.get(0).get("refuseComment"));
	            	approveSuggestionS.writeRecord();
            	}
            }
        }catch (SiebelException ex) {
            busCompService.undoRecord();
            /**/approveSuggestionS.undoRecord();
            logger.warning("error: " + ex.getErrorMessage());
            throw ex;
        } finally {
            if(busCompService != null) {
            	busCompService.release();
            	busCompService = null;
            }
            /**/
            if(approveSuggestionS != null) {
            	approveSuggestionS.release();
            	approveSuggestionS = null;
            }
            if(busObject != null) {
                busObject.release();
                busObject = null;
            }
        }
    }
    public String pass(String username, String password, String recordId, String StrserviceFeeAcceptSum) throws JSONException {
        String ReturnMsg = null;
        boolean loginSuccess = false;
        SiebelBusObject busObject = null;
        SiebelBusComp busCompOppAgent = null;
        //登录Siebel
        loginSuccess = login(username, password);
        List<Map<String, String>> serviceFeeAcceptSum = new ArrayList<Map<String, String>>();
        //保存审批信息
        try {
        	
        	JSONArray jaServiceFee = new JSONArray(StrserviceFeeAcceptSum);
			int length = jaServiceFee.length();
			JSONObject jo = null;
			HashMap<String, String> map = null;
			for (int i = 0; i < length; i++) {
				jo = jaServiceFee.optJSONObject(i);
				map = parserToMap(jo);
				serviceFeeAcceptSum.add(map);
			}
			
            if(loginSuccess) {
                 busObject = dataBean.getBusObject("Quote");//bo
                 busCompOppAgent = busObject.getBusComp("HEL Opportunity Agent - Copy");//服务费用
                 saveData(busCompOppAgent,serviceFeeAcceptSum);

                ReturnMsg = doOperation("PassAddServiceApproved",recordId,serviceFeeAcceptSum);
            } else {
                ReturnMsg = "网络故障，请稍候再试!";
            }
        } catch(SiebelException se) {
            try {
                busCompOppAgent.undoRecord();
            } catch (SiebelException ex) {
                Logger.getLogger(ASPApproveOperation.class.getName()).log(Level.SEVERE, null, ex);
            }
            ReturnMsg = se.getErrorMessage();
            logger.log(Level.SEVERE, ReturnMsg, se);
        } finally {
            try {
                if(busCompOppAgent != null) {
                    busCompOppAgent.release();
                    busCompOppAgent = null;
                }
                if(busObject != null) {
                    busObject.release();
                    busObject = null;
                }
                //登出Siebel
//                if(loginSuccess) {
                    logOff();
//                }       
            } catch (SiebelException ex) {
                logger.log(Level.SEVERE, null, ex);
            }
        }
        return ReturnMsg;
    }

    public String reserve(String username, String password, String recordId, String StrserviceFeeAcceptSum) throws JSONException {
    	logger.warning("保留意见");
        String ReturnMsg = null;
        boolean loginSuccess = false;
        SiebelBusObject busObject = null;
        SiebelBusComp busCompOppAgent = null;
        //登录Siebel
        loginSuccess = login(username, password);
        List<Map<String, String>> serviceFeeAcceptSum = new ArrayList<Map<String, String>>();
        //保存审批信息
        try {
        	JSONArray jaServiceFee = new JSONArray(StrserviceFeeAcceptSum);
			int length = jaServiceFee.length();
			JSONObject jo = null;
			HashMap<String, String> map = null;
			for (int i = 0; i < length; i++) {
				jo = jaServiceFee.optJSONObject(i);
				map = parserToMap(jo);
				serviceFeeAcceptSum.add(map);
			}
			
            if(loginSuccess) {
                busObject = dataBean.getBusObject("Quote");//bo
                busCompOppAgent = busObject.getBusComp("HEL Opportunity Agent - Copy");//服务费用
                logger.warning("开始保存数据");
                saveData(busCompOppAgent,serviceFeeAcceptSum);
                logger.warning("开始执行保留意见");
                ReturnMsg = doOperation("ReserveSuggestion",recordId,serviceFeeAcceptSum);
                logger.warning("保留意见成功：" + ReturnMsg);
            } else {
                ReturnMsg = "网络故障，请稍候再试!";
            }
        } catch(SiebelException se) {
            try {
                busCompOppAgent.undoRecord();
            } catch (SiebelException ex) {
                Logger.getLogger(ASPApproveOperation.class.getName()).log(Level.SEVERE, null, ex);
            }
            ReturnMsg = se.getErrorMessage();
            logger.log(Level.SEVERE, ReturnMsg, se);
        } finally {
            try {
                if(busCompOppAgent != null) {
                    busCompOppAgent.release();
                    busCompOppAgent = null;
                }
                if(busObject != null) {
                    busObject.release();
                    busObject = null;
                }
                //登出Siebel
//                if(loginSuccess) {
                    logOff();
//                }       
            } catch (SiebelException ex) {
                logger.log(Level.SEVERE, null, ex);
            }
        }
        logger.warning("保留意见返回：" + ReturnMsg);
        return ReturnMsg;
    }

    public String refuse(String username, String password, String recordId, String StrserviceFeeAcceptSum) throws JSONException {
        String ReturnMsg = null;
        boolean loginSuccess = false;
        SiebelBusObject busObject = null;
        SiebelBusComp busCompOppAgent = null;
        //登录Siebel
        loginSuccess = login(username, password);
        List<Map<String, String>> serviceFeeAcceptSum = new ArrayList<Map<String, String>>();
        //保存审批信息
        try {
        	JSONArray jaServiceFee = new JSONArray(StrserviceFeeAcceptSum);
			int length = jaServiceFee.length();
			JSONObject jo = null;
			HashMap<String, String> map = null;
			for (int i = 0; i < length; i++) {
				jo = jaServiceFee.optJSONObject(i);
				map = parserToMap(jo);
				serviceFeeAcceptSum.add(map);
			}
            if(loginSuccess) {
                busObject = dataBean.getBusObject("Quote");//bo
                busCompOppAgent = busObject.getBusComp("HEL Opportunity Agent - Copy");//服务费用
                saveData(busCompOppAgent,serviceFeeAcceptSum);
                ReturnMsg = doOperation("RefuseAddServiceApproved",recordId,serviceFeeAcceptSum); //提交记录
            } else {
                ReturnMsg = "网络故障，请稍候再试!";
            }
        } catch(SiebelException se) {
        	logger.warning("拒绝出错！");
            try {
                busCompOppAgent.undoRecord();
                logger.warning("开始回滚");
            } catch (SiebelException ex) {
            	logger.warning("回滚包错");
                Logger.getLogger(ASPApproveOperation.class.getName()).log(Level.SEVERE, null, ex);
            }
            ReturnMsg = se.getErrorMessage();
            logger.warning("拒绝错误信息：" + ReturnMsg);
            logger.log(Level.SEVERE, ReturnMsg, se);
        } finally {
            try {
                if(busCompOppAgent != null) {
                    busCompOppAgent.release();
                    busCompOppAgent = null;
                }
                if(busObject != null) {
                    busObject.release();
                    busObject = null;
                }
                //登出Siebel
//                if(loginSuccess) {
                    logOff();
//                }       
            } catch (SiebelException ex) {
                logger.log(Level.SEVERE, null, ex);
            }
        }
        logger.warning("返回的字符串:" + ReturnMsg);
        return ReturnMsg;
    }
    private String doOperation(String serviceMethod,String recordId, List<Map<String, String>> serviceFeeAcceptSum) {
        logger.log(Level.INFO, "operate with record id:{0}",new Object[]{recordId});
        String ReturnMsg = null;
        String ErrorMessage = null;
        SiebelService businessService = null;
        SiebelPropertySet input = null;
        SiebelPropertySet output = null;
        //保存审批信息
        try {
                businessService = dataBean.getService("HEL Quote Add Service Fee Service");
                input = new SiebelPropertySet();
                output = new SiebelPropertySet();
                input.setProperty("sQuoteId", recordId);//报价Id
                businessService.invokeMethod(serviceMethod, input, output);
                ErrorMessage = output.getProperty("ErrorMessage");
                ReturnMsg = ErrorMessage;
        } catch(SiebelException se) {
            ReturnMsg = se.getErrorMessage();
            logger.log(Level.SEVERE, ReturnMsg+" sbsbsb", se);
        } finally {
           if(businessService != null) {
               businessService.release();
               businessService = null;
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
    

    public String getConnectString() {
		return connectString;
	}



	public void setConnectString(String connectString) {
		this.connectString = connectString;
	}



	public String getLang() {
		return Lang;
	}



	public void setLang(String lang) {
		Lang = lang;
	}



	public static Logger getLogger() {
		return logger;
	}



	public ASPApproveOperation(SiebelDataBean dataBean) {
		super();
		this.dataBean = dataBean;
	}


	public ASPApproveOperation() {
		super();
	}



}
