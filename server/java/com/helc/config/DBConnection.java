package com.helc.config;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
	public static Connection getConnection(){
		Connection con = null;
		try{
			
			Class.forName("net.sourceforge.jtds.jdbc.Driver").newInstance();
			con = DriverManager.getConnection("jdbc:jtds:sqlserver://172.16.255.41:1433/hitachimiss2",
					"hitachimiss2",
					"hitachimiss2");
		}catch (Exception e){
			System.out.println(e);
		}
		return con;
	}
}
