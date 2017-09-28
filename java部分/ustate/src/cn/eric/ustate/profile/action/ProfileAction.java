package cn.eric.ustate.profile.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.eric.ustate.profile.entity.Profile;
import cn.eric.ustate.profile.service.ProfileService;

/**
 * 
 * 
 * 
 */
@Controller
@RequestMapping("/*")
public class ProfileAction {
	
	@Resource
	private ProfileService profileService;
	
	@RequestMapping(value="profile", method=RequestMethod.GET)
	public @ResponseBody 
	Profile selectById(HttpSession session) {
		Object obj = session.getAttribute("id");
		if (obj == null) {
			return new Profile();
		} else {
			return profileService.selectById((Integer)obj);
		}
	}
	
	@RequestMapping(value="profile/lists", method=RequestMethod.GET)
	public @ResponseBody
	List<Profile> list() {
		return profileService.list();
	}
	
	@RequestMapping(value="profile/login/{id}", method=RequestMethod.POST)
	public @ResponseBody
	int simulateLogin(HttpSession session, @PathVariable Integer id) {
		session.setAttribute("id", id);
		if (session.getAttribute("id") != null) {
			return 1;
		} else {
			return 0;
		}
	}
	
//	@RequestMapping(value="logout", method=RequestMethod.POST)
//	public @ResponseBody
//	int simulateLogout(HttpSession session) { 
//		session.removeAttribute("id");
//		if (session.getAttribute("id") == null) {
//			return 1;
//		} else {
//			return 0;
//		}
//	}
}
