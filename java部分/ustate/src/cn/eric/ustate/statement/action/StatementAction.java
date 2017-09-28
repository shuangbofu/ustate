package cn.eric.ustate.statement.action;

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

import cn.eric.ustate.profile.entity.Profile;
import cn.eric.ustate.statement.entity.Statement;
import cn.eric.ustate.statement.service.StatementService;
import cn.eric.ustate.utils.util;

/**
 * 
 * 
 * 
 */
@Controller
@RequestMapping("/*")
public class StatementAction {
	
	
	@Resource
	private StatementService statementService;
	
	@RequestMapping(value="posts/{fromId}", method=RequestMethod.GET)
	public @ResponseBody
	List<Statement> list (@PathVariable Integer fromId, HttpSession session) {
		Integer profId = util.getProfId(session);
		return statementService.list(profId, fromId);
	}
	@RequestMapping(value="post/{id}")
	public @ResponseBody
	Statement getDetail(@PathVariable Integer id, HttpSession session) {
		Integer profId = util.getProfId(session);
		return statementService.getDetail(profId, id);
	}
	
	@RequestMapping(value="hot/{fromId}", method=RequestMethod.GET)
	public @ResponseBody
	List<Statement> hotList(@PathVariable Integer fromId, HttpSession session) {
		Integer profId = util.getProfId(session);
		return statementService.hotList(profId, fromId);
	}
	
	@RequestMapping(value="posts/self/{fromId}", method=RequestMethod.GET)
	public @ResponseBody
	List<Statement> getPostedList (@PathVariable Integer fromId,  HttpSession session) {
		int profId = (Integer) session.getAttribute("id");
		return statementService.getPostedList(profId, fromId);
	}
	
	@RequestMapping(value="post", method=RequestMethod.POST)
	public @ResponseBody
	int insert(@RequestBody Statement statement, HttpSession session) {
		int profId = (Integer) session.getAttribute("id");
		statement.setCreatetime(new Date());
		statement.setProfile(new Profile(profId));
		int i = statementService.insert(statement);
		if (i > 0) {
			return statement.getId();
		} else {
			return i;
		}
	}
	
	@RequestMapping(value="post/{id}", method=RequestMethod.DELETE)
	public @ResponseBody
	int delete(@PathVariable Integer id,HttpSession session) {
		int profId = (Integer) session.getAttribute("id");
		int i = statementService.delete(profId, id);
		return i;
	}
	
}
