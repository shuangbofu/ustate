package cn.eric.ustate.notice.action;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.eric.ustate.notice.entity.Notice;
import cn.eric.ustate.notice.service.NoticeService;

/**
 * 
 * 
 * 
 */
@Controller
@RequestMapping("/*")
public class NoticeAction {
	
	@Resource
	private NoticeService noticeService;
	
	@RequestMapping(value="count", method=RequestMethod.GET)
	public @ResponseBody 
	int getCount(HttpSession session) {
		Integer profId = getProfId(session);
		return noticeService.getCount(profId);
	}
	
	@RequestMapping(value="notices/{fromId}", method=RequestMethod.GET)
	public @ResponseBody 
	List<Notice> list(@PathVariable Integer fromId, HttpSession session) {
		int profId = (Integer) session.getAttribute("id");
		noticeService.resetStatus(profId);
		return noticeService.list(fromId, profId);
	}
	
	public Integer getProfId(HttpSession session) {
		Object object = session.getAttribute("id");
		if (object !=null) {
			return (Integer)object;
		} else{
			return -1;
		}
	}
}
