package cn.eric.ustate.feedback.action;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.eric.ustate.feedback.entity.Feedback;
import cn.eric.ustate.feedback.service.feedbackService;

/**
 * 
 * 
 * 
 */
@Controller
@RequestMapping("/*")
public class FeedbackAction {

	@Resource
	private feedbackService feedbackService;
	
	@RequestMapping(value="feedback", method=RequestMethod.POST)
	public @ResponseBody 
	int insert(@RequestBody Feedback feedback, HttpSession session) {
		int profId = (Integer) session.getAttribute("id");
		feedback.setCreatetime(new Date());
		feedback.setProfId(profId);
		return feedbackService.insert(feedback);
	}
}
