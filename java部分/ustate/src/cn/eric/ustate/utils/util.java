package cn.eric.ustate.utils;

import javax.servlet.http.HttpSession;

/**
 * 
 * 
 * 
 */
public class util {
	public static Integer getProfId(HttpSession session) {
		Object object = session.getAttribute("id");
		if (object !=null) {
			return (Integer)object;
		} else{
			return 0;
		}
	}
}
