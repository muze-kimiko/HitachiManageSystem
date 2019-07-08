package com.helc.helcapprove;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Hashtable;
import java.util.logging.Logger;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.BasicAttribute;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.ModificationItem;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;

import org.json.JSONException;
import org.json.JSONObject;


//import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import com.helc.helcapprove.Base64;
import com.helc.helcapprove.tbjoption.ApproveOperationImpl;

public class LdapAction {
	
	private static DirContext ctx;
	
	public static DirContext getCtx(){
		String account = "APPUSER";
		String password = "APPUSER998";// 测试：APPUSER， 正式：APPUSER998
		String root = "o=hitachi";
		Hashtable env = new Hashtable();
		env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
		env.put(Context.PROVIDER_URL, "ldap://10.96.129.220:389/" + root);
		//测试：10.96.143.98，正式：10.96.143.97,新正式10.96.129.220
		env.put(Context.SECURITY_AUTHENTICATION, "simple");
		env.put(Context.SECURITY_PRINCIPAL, "uid=" + account + ",ou=people," + root);
		env.put(Context.SECURITY_CREDENTIALS, password);
		try {
			ctx = new InitialDirContext(env);
		} catch (javax.naming.AuthenticationException ae) {
			System.out.println("ldap认证失败！");
			ae.printStackTrace();
			// TODO: handle exception
		}catch (Exception e) {
			System.out.println("ldap认证出错！");
			e.printStackTrace();
			// TODO: handle exception
		}
		return ctx;
	}
	
	public static JSONObject LdapLogin(String username,String password){
		JSONObject result = new JSONObject();
		DirContext ctx_temp = getCtx();
		try {
			SearchControls constraints = new SearchControls();
			constraints.setSearchScope(SearchControls.SUBTREE_SCOPE);
			NamingEnumeration en = ctx_temp.search("","uid="+username,constraints);
			Logger logger = Logger.getLogger("AA");
			if (en !=null && en.hasMoreElements()) {
				Object obj = en.nextElement();
				if(obj instanceof SearchResult){
					SearchResult si = (SearchResult)obj;
//					System.out.println("name:"+si.getName());
					Attributes attrs = si.getAttributes();
					if(attrs == null){
						result.put("isLogin", false);
						result.put("Msg", "LdapLogin no attributes!");
						System.out.println("LdapLogin no attributes!");
					}else{
						String ldap_pwd = new String((byte[])attrs.get("userPassword").get());
						if(verifySHA(ldap_pwd, password)){
							result.put("isLogin", true);
							result.put("UId", attrs.get("uid").get().toString());
							if(attrs.get("IPADATTR01") != null){
								result.put("iPadAttr01", attrs.get("IPADATTR01").get().toString());
							}
							if(attrs.get("IPADATTR02") != null){
								result.put("iPadAttr02", attrs.get("IPADATTR02").get().toString());
							}
							if(attrs.get("IPADATTR03") != null){
								result.put("iPadAttr03", attrs.get("IPADATTR03").get().toString());
							}
							if(attrs.get("IPADATTR04") != null){
								result.put("iPadAttr04", attrs.get("IPADATTR04").get().toString());
								
								// 增加模块权限控制标志
								/*
								String TBJ_MENU_PERMISSION_STR = "000000000000FFFF";//TBJ审批菜单权限
								String ASP_MENU_PERMISSION_STR = "0000FFFF00000000"; //增费及超点审批
								if () {
									result.put("MenuPermission", "");
								}
								*/
							}
							result.put("Msg", "Login OK!");
							System.out.println("Login OK!");
						}else {
							result.put("isLogin", false);
							result.put("Msg", "密码错误，请重新登录!");
						}
					}
				}else {
					result.put("isLogin", false);
					result.put("Msg", "no obj instanceof SearchResult");
					System.out.println(obj);
				}
			}else {
				result.put("isLogin", false);
				result.put("Msg", "用户名错误，请重新登录！");
			}
		} catch (Exception e) {
			try {
				result.put("isLogin", false);
				result.put("Msg", e.getMessage());
			} catch (JSONException je) {
				System.out.println(je);
				// TODO: handle exception
			}
			// TODO: handle exception
		}finally{
			try {
				ctx_temp.close();
			} catch (NamingException ne) {
				System.out.println(ne);
				// TODO: handle exception
			}
		}
		return result;
	}
	
	public static JSONObject LdapUpdatePwd(String username,String old_pwd,String new_pwd){
		JSONObject result = new JSONObject();
		DirContext ctx_temp = getCtx();
		
		try {
			if(LdapLogin(username, old_pwd).optBoolean("isLogin")){
				ModificationItem[] mItem = new ModificationItem[1];
				mItem[0] = new ModificationItem(DirContext.REPLACE_ATTRIBUTE,new BasicAttribute("userPassword",CreatePwdSHA(new_pwd)));
				ctx_temp.modifyAttributes("uid=" + username + ",ou=people", mItem);
				result.put("isUpdate", true);
				result.put("Msg", "修改密码成功，请重新登录！");
			}else {
				result.put("isUpdate", false);
				result.put("Msg", "旧密码错误，请重新输入！");
			}
		} catch (Exception e) {
			try {
				System.out.println(e);
				result.put("isUpdate", false);
				result.put("Msg", e.getMessage());
			} catch (JSONException je) {
				System.out.println(je);
				// TODO: handle exception
			}
			// TODO: handle exception
		}finally{
			try {
				ctx_temp.close();
			} catch (NamingException ne) {
				System.out.println(ne);
				// TODO: handle exception
			}
		}
		return result;
	}
	
	public static boolean verifySHA(String ldappw,String inputpw)
		throws NoSuchAlgorithmException {
		MessageDigest md = MessageDigest.getInstance("SHA-1");
		if(ldappw.startsWith("{SSHA}") || ldappw.startsWith("{SHA}")){
			if(ldappw.startsWith("{SSHA}")){
				ldappw = ldappw.substring(6);
			}else if(ldappw.startsWith("{SHA}")){
				ldappw = ldappw.substring(5);
			}
			
			byte[] ldappwbyte = Base64.decode(ldappw);
			byte[] shacode;
			byte[] salt;
			
			if(ldappwbyte.length <= 20){
				shacode = ldappwbyte;
				salt = new byte[0];
			}else {
				shacode = new byte[20];
				salt = new byte[ldappwbyte.length - 20];
				System.arraycopy(ldappwbyte, 0, shacode, 0, 20);
				System.arraycopy(ldappwbyte, 20, salt, 0, salt.length);
			}
			
			md.update(inputpw.getBytes());
			
			md.update(salt);
			
			byte[] inputpwbyte = md.digest();
			
			return MessageDigest.isEqual(shacode, inputpwbyte);
		}else {
			return ldappw.equals(inputpw);
		}
		
	}
	
	public static String CreatePwdSHA(String pwd){
		String pwdsha = "";
		try {
			MessageDigest mdsha;   	
			mdsha = MessageDigest.getInstance("SHA-1");	        	
			mdsha.update(pwd.getBytes());	
	        byte[] hash = mdsha.digest();
	        pwdsha = "{SHA}" + new String(Base64.encode(hash));
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
		return pwdsha;
	}

	/**
	 * @param args
	 */
	
	public static void main(String[] args) {
		System.out.println(LdapLogin("08401", "111111"));
//		System.out.println(LdapUpdatePwd("0840", "111111","111111"));
		// TODO Auto-generated method stub

	}
	
}
