package com.worklight.customcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.helc.config.DBConnection;

public class Calculator1 {
	public static int addTwoIntegers(int first,int second){
		return first + second;
	}
	
	public int subtractTwoIntegers(int first,int second){
		return first - second;
	}
	
	public String contest(){
		String aa = "";
		Connection con = null;
		try{
			
			con = DBConnection.getConnection();
//			Class.forName("net.sourceforge.jtds.jdbc.Driver").newInstance();
//			con = DriverManager.getConnection("jdbc:jtds:sqlserver://172.16.255.41:1433/hitachimiss2", "hitachimiss2", "hitachimiss2");
			PreparedStatement pst=null;
			ResultSet rs=null;
			String sql = "select * from LoginUser";
			pst = con.prepareStatement(sql);
			rs = pst.executeQuery();
			while(rs.next()){
				aa = aa + rs.getString("RoleID");
			}
			aa+="||";
		}catch (Exception e){
			e.printStackTrace();
		}finally{
			try{
				if(con!=null)con.close();
			}catch (Exception e) {
				e.printStackTrace();
			}
			
		}
		
		
		return aa;
	}
}
