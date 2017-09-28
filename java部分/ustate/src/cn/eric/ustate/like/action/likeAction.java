package cn.eric.ustate.like.action;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.eric.ustate.like.entity.LikeS;
import cn.eric.ustate.like.service.LikeCService;
import cn.eric.ustate.like.service.LikeSService;
import cn.eric.ustate.notice.service.NoticeService;
import cn.eric.ustate.utils.util;

/**
 * 
 * 
 * 
 */
@Controller
@RequestMapping("/*")
public class likeAction {
	
	@Resource
	private LikeSService likeSService;
	@Resource
	private LikeCService likeCService;
	
	@Resource
	private NoticeService noticeService;

	
	@RequestMapping(value="like/{id}", method=RequestMethod.POST)
	public @ResponseBody
	int insertS(@PathVariable Integer id, HttpSession session) { 
		Integer profId = util.getProfId(session);
		Date date = new Date(); 
		int i = likeSService.insert(profId, date, id);
		if (i >0) {
			noticeService.insertLikeSNotice(profId, id, date);
		}
		return i;
	}
	
	@RequestMapping(value="like/{id}", method=RequestMethod.DELETE)
	public @ResponseBody
	int deleteS(@PathVariable Integer id, HttpSession session) {
		Integer profId = util.getProfId(session);
		return likeSService.delete(profId, id);
	}
	
	@RequestMapping(value="like/self/{fromId}", method=RequestMethod.GET)
	public @ResponseBody
	List<LikeS> getLikedList(@PathVariable Integer fromId, HttpSession session) {
		Integer profId = util.getProfId(session);
		return likeSService.getLikedList(fromId, profId);
	}
	
	@RequestMapping(value="like/comment/{id}", method=RequestMethod.POST)
	public @ResponseBody
	int insertC(@PathVariable Integer id, HttpSession session) {
		Integer profId = util.getProfId(session);
		Date date = new Date();
		int i = likeCService.insert(profId, new Date(), id);
		if (i > 0) {
			noticeService.insertLikeCNotice(profId, id, date);
		}
		return i;
	}
	
	@RequestMapping(value="like/comment/{id}", method=RequestMethod.DELETE)
	public @ResponseBody
	int deleteC(@PathVariable Integer id, HttpSession session) {
		Integer profId = util.getProfId(session);
		return likeCService.delete(profId, id);
	}
	
}
