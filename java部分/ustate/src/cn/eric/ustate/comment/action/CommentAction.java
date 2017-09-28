package cn.eric.ustate.comment.action;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.eric.ustate.comment.entity.Comment;
import cn.eric.ustate.comment.service.CommentService;
import cn.eric.ustate.notice.service.NoticeService;
import cn.eric.ustate.profile.entity.Profile;
import cn.eric.ustate.utils.util;

/**
 * 
 * 
 * 
 */
@Controller
@RequestMapping("/*")
public class CommentAction {
	
	@Resource
	private CommentService commentService;
	
	@Resource
	private NoticeService noticeService;
	
	@RequestMapping(value="comment/{stmtId}", method=RequestMethod.GET)
	public @ResponseBody
	List<Comment> list(@PathVariable Integer stmtId, HttpSession session) {
		Integer profId = util.getProfId(session);
		return commentService.list(profId, stmtId);
	}
	
	@RequestMapping(value="comment/{stmtId}", method=RequestMethod.POST)
	public @ResponseBody
	int insert(@RequestBody Comment comment, @PathVariable Integer stmtId, HttpSession session) {
		Integer profId = util.getProfId(session);
		comment.setCreatetime(new Date());
		comment.setStmtId(stmtId);
		comment.setProfile(new Profile(profId));
		int i = commentService.insert(comment);
		if (i>0) {
			int j = noticeService.insertCommentNotice(profId, comment.getId(), stmtId, comment.getCreatetime());
			if (j >0) {
				return comment.getId();
			} else {
				return j;
			}
		} else {
			return i;
		}
	}
	
	@RequestMapping(value="comment/self/{fromId}", method=RequestMethod.GET)
	public @ResponseBody
	List<Comment> getCommentedList(@PathVariable Integer fromId, HttpSession session) {
		Integer profId = util.getProfId(session);
		return commentService.getCommentedList(fromId, profId);
	}
	
	@RequestMapping(value="comment/{id}", method=RequestMethod.DELETE)
	public @ResponseBody
	int deleteComment(@PathVariable Integer id, HttpSession session) {
		Integer profId = util.getProfId(session);
		return commentService.delete(profId,id);
	}
	 
	 
}
