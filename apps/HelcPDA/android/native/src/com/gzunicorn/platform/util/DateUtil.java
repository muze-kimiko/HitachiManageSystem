package com.gzunicorn.platform.util;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import android.util.Log;

public class DateUtil {
	
	public static String DateFormat_YMD="yyyy-MM-dd";
	
	public static String DateTimeFormat_YMDHMS="yyyy-MM-dd HH:mm:ss";
	
	
	private static final DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

	private static final DateFormat dateTimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	private static final DateFormat dateTimeNoSecondFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

	private static final DateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");

	private static final DateFormat timeNoSecondFormat = new SimpleDateFormat("HH:mm");

	private static final DateFormat timestampFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
	
	
	/**
	 * 将string转化为日期
	 * 
	 * @param dateString
	 * @return
	 * @throws ParseException
	 */
	public static Date parseDate(String dateString) throws ParseException {
		return dateFormat.parse(dateString);
	}

	/**
	 * 根据日期字符串是否含有时间决定转换为日期还是日期时间还是时间
	 * 
	 * @param dateString
	 * @return
	 * @throws ParseException
	 */
	public static Date parseDateTime(String dateString) throws ParseException {
		if (dateString.trim().indexOf(" ") > 0 && dateString.trim().indexOf(".") > 0) {
			return new java.sql.Timestamp(timestampFormat.parse(dateString).getTime());
		} else if (dateString.trim().indexOf(" ") > 0) {
			// 如果有两个:，则有时分秒,一个冒号只有时分
			if (dateString.trim().indexOf(":") != dateString.trim().lastIndexOf(":")) {
				return new java.sql.Timestamp(dateTimeFormat.parse(dateString).getTime());
			} else {
				return new java.sql.Timestamp(dateTimeNoSecondFormat.parse(dateString).getTime());
			}
		} else if (dateString.indexOf(":") > 0) {
			// 如果有两个:，则有时分秒,一个冒号只有时分
			if (dateString.trim().indexOf(":") != dateString.trim().lastIndexOf(":")) {
				return new java.sql.Time(timeFormat.parse(dateString).getTime());
			} else {
				return new java.sql.Time(timeNoSecondFormat.parse(dateString).getTime());
			}
		}
		return new java.sql.Date(dateFormat.parse(dateString).getTime());
	}

	/**
	 * 按格式输出date到string
	 * 
	 * @param date
	 * @return
	 */
	public static String formatDate(Date date) {
		return dateFormat.format(date);
	}

	/**
	 * 按格式输出date到string,按照日期类型自动判断
	 * 
	 * @param date
	 * @return
	 */
	public static String formatDateTime(Date date) {
		if (date instanceof java.sql.Timestamp) {
			return timestampFormat.format(date);
		} else if (date instanceof java.sql.Time) {
			return timeFormat.format(date);
		} else if (date instanceof java.sql.Date) {
			return dateFormat.format(date);
		}
		return dateTimeFormat.format(date);
	}

	/**
	 * 按格式输出string到date
	 * 
	 * @param dateString
	 * @param style
	 *          格式化参数
	 * @return
	 * @throws ParseException
	 */
	public static Date parse(String dateString, String style) throws ParseException {
		DateFormat dateFormat = new SimpleDateFormat(style);
		return dateFormat.parse(dateString);
	}

	/**
	 * 格式化输出date到string
	 * 
	 * @param date
	 * @param style
	 *          转化参数
	 * @return
	 */
	public static String format(Date date, String style) {
		DateFormat dateFormat = new SimpleDateFormat(style);
		return dateFormat.format(date);
	}

	/**
	 * 获取时间间隔字符串
	 * 
	 * @param dateA
	 * @param dateB
	 * @param resolution 初始解析精度,比如resolution=1,表示只有间隔够一个月才会显示1月...，否则显示0月
	 * @return 时间间隔字符串
	 */
	public static final String dateDifference(long dateA, long dateB, long resolution) {
		StringBuffer sb = new StringBuffer();
		long difference = Math.abs(dateB - dateA);
		if (resolution > 0L) {
			resolution--;
			long months = difference / 0x9fa52400L;
			if (months > 0L) {
				difference %= 0x9fa52400L;
				sb.append(months + " 月, ");
			}
		}
		if (resolution <= 0L && sb.length() == 0)
			return "0 月";
		resolution--;
		long days = difference / 0x5265c00L;
		if (days > 0L) {
			difference %= 0x5265c00L;
			sb.append(days + " 天, ");
		}
		if (resolution <= 0L && sb.length() == 0)
			return "0 天";
		resolution--;
		long hours = difference / 0x36ee80L;
		if (hours > 0L) {
			difference %= 0x36ee80L;
			sb.append(hours + " 小时, ");
		}
		if (resolution <= 0L && sb.length() == 0)
			return "0 小时";
		resolution--;
		long minutes = difference / 60000L;
		if (minutes > 0L) {
			difference %= 60000L;
			sb.append(minutes + " 分钟, ");
		}
		if (resolution <= 0L && sb.length() == 0)
			return "0 分钟";
		resolution--;
		long seconds = difference / 1000L;
		if (seconds > 0L) {
			difference %= 1000L;
			sb.append(seconds + " 秒, ");
		}
		if (resolution <= 0L && sb.length() == 0)
			return "0 秒";
		if (sb.length() > 2)
			return sb.substring(0, sb.length() - 2);
		else
			return "";
	}

	public static void main(String[] args) {
		try {
			Date date = DateUtil.parseDateTime("8:12:34");
			System.out.println(date.toString() + date.getClass());
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	/**
	 * 当前系统日期
	 * @return
	 */
	public static Date getNowTime(){
		return new Date();
	}
	
	/**
	 * 取服务器的当前时间
	 * 
	 * @return hh:mm:ss 格式的时间
	 */
	public static String getNowTimes() {
		String time = new Timestamp(System.currentTimeMillis()).toString();
		return time.substring(11, 19);
	}
	
	/**
	 * 取参数日期的前或后Ｎ天的日期
	 * 
	 * @param date
	 * @param day
	 * @return
	 * @throws ParseException
	 */
	public static String getIntervalDate(String date, int day)throws ParseException {
		if (date != null && date.length() == 10) {
			int tempday = Integer.parseInt(date.substring(8, 10)) + day;
			date = date.substring(0, 8) + tempday;
			date = java.sql.Date.valueOf(date).toString();
			SimpleDateFormat df = new SimpleDateFormat("yyyy-mm-dd");
			date = df.format(df.parse(date));
		}
		return date;
	}
	/**
	 * 格式: yyyy-MM-dd hh:mm:ss.SSS
	 * @param sec
	 * @return
	 */
	public static String getIntervalNowTime(long sec){
		long systime=System.currentTimeMillis();
		return new Timestamp(systime+sec*1000).toString();
	}
	
	/**
	 * 取服务器的当前日期
	 * 
	 * @return hh:mm:ss 格式的时间
	 */
	public static String getToday() {
		String time = new Timestamp(System.currentTimeMillis()).toString();
		return time.substring(0, 10);
	}
	/**
	 * 取服务器的当前时间
	 * 
	 * @return hh:mm:ss 格式的时间
	 */
	public static String getTodayTime() {
		String time = new Timestamp(System.currentTimeMillis()).toString();
		return time.substring(11, 19);
	}
	
	public static String getTodayAndTime() {
		String time = new Timestamp(System.currentTimeMillis()).toString();
		return time.substring(0,19);
	}
	
	//某个时间的后一段时间
	public static Date toNextDateTime(String dateFlag, Date bdate, int nTime) {
		Calendar cld = Calendar.getInstance();
		try {
			cld.setTime(bdate);
			if ("d".equalsIgnoreCase(dateFlag)) {
				cld.add(Calendar.DATE, nTime);
			} else if ("h".equalsIgnoreCase(dateFlag)) {
				cld.add(Calendar.HOUR_OF_DAY, nTime);
			} else if ("m".equalsIgnoreCase(dateFlag)) {
				cld.add(Calendar.MINUTE, nTime);
			} else if (("month".equalsIgnoreCase(dateFlag))) {
				cld.add(Calendar.MONTH, nTime);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		Date d2 = cld.getTime();
		return d2;
	}
	
	//两个日期相差多少天
	public static long compareDate(String strD1, String strD2) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date d2;
		long cha = 0;
		try {
			Date d1 = sdf.parse(strD1);
			d2 = sdf.parse(strD2);
			cha = d1.getTime() - d2.getTime();
			cha = cha/1000/60/60/24;
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return cha;
	}
	
	//两个日期相差多少小时
		public static long compareDateHour(String strD1, String strD2) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			Date d2;
			long cha = 0;
			try {
				Date d1 = sdf.parse(strD1);
				d2 = sdf.parse(strD2);
				cha = d1.getTime() - d2.getTime();
				cha = cha/1000/60/60;
				Log.i("公共方法", "公共方法小时：" + cha);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			return cha;
		}
}
