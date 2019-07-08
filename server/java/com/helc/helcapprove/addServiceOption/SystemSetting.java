/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.helc.helcapprove.addServiceOption;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * 系统设置
 * 在第一次加载类时加载本应用系统的设置，设置文件固定写在 /META-INF/SystemSetting.properties 上
 * @author xu_j
 */

public class SystemSetting {
       private static Map<String,String> setting = null;
       static final Logger logger = Logger.getLogger(SystemSetting.class.getName());
       
       
       static public void initSetting(){
               InputStream is = null;
               try {
                   setting  = new ConcurrentHashMap<String,String>();
                   logger.log(Level.INFO, SystemSetting.class.getResource("/").getPath());
                   is = SystemSetting.class.getResourceAsStream("/META-INF/SystemSetting.properties");
                   Properties pro = new Properties();
                   if(is == null) {
                       
                       throw new IOException("File /META-INF/SystemSetting.properties  not found ");
                   }
                   pro.load(is);
                   Iterator iter = pro.keySet().iterator();
                    while(iter.hasNext()){
                     String key = (String)iter.next();
                     String value = (String) pro.getProperty(key);
                     logger.log(Level.CONFIG, key + " = " + value);
                     setting.put(key, value);
                 }
                   
               } catch (IOException ex) {
                   logger.log(Level.SEVERE, null, ex);
               }finally{
                   if(is != null) try {
                       is.close();
                   } catch (IOException ex) {
                       logger.log(Level.SEVERE, null, ex);
                   }
               }
               
       }
       
       public static String getSettingValue(String key){ 
           if(setting == null) initSetting();
            if(!setting.containsKey(key)) {
                logger.log(Level.WARNING, "System Setting for "+ key + " is no found");
                return null;
            }
            else return setting.get(key);
       }
       public static String getPropertyFromDisk(String key) {
            InputStream is = null;
            String value = null;
            try {
                is = SystemSetting.class.getResourceAsStream("/META-INF/SystemSetting.properties");
                Properties pro = new Properties();
                if(is == null) {

                    throw new IOException("File /META-INF/SystemSetting.properties  not found ");
                }
//                pro.load(is);
                pro.load(new InputStreamReader(is,"UTF-8"));
                value = pro.getProperty(key);
             } catch (IOException ex) {
                   logger.log(Level.SEVERE, null, ex);
            }finally{
                if(is != null) {
                    try {
                        is.close();
                    } catch (IOException ex) {
                        logger.log(Level.SEVERE, null, ex);
                    }
                }
            }
            return value;
       }

}
