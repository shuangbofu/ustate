package cn.eric.ustate.user.action;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.eric.ustate.user.entity.User;
import cn.eric.ustate.user.service.UserService;
import cn.eric.ustate.utils.util;

/**
 * 
 * 
 * 
 */
@Controller
@RequestMapping("/*")
public class UserAction {
	
	@Resource
	private UserService userService;
	
	@RequestMapping(value="/user/login", method=RequestMethod.POST)
	public @ResponseBody int login(HttpSession session, @RequestBody User user) {
		System.out.println(user+"--------------------------");
		Integer profId = userService.login(user.getLoginname(), user.getPassword());
		session.setAttribute("id", profId);
		if (util.getProfId(session)!= null) {
			return 1;
		} else {
			return 0;
		}
	}
	
	@RequestMapping(value="user/logout", method=RequestMethod.POST)
	public @ResponseBody
	int logout(HttpSession session) { 
		session.removeAttribute("id");
		if (session.getAttribute("id") == null) {
			return 1;
		} else {
			return 0;
		}
	}
}
