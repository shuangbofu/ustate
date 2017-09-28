package cn.eric.ustate.search.action;

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

import cn.eric.ustate.search.entity.Search;
import cn.eric.ustate.search.service.SearchService;
import cn.eric.ustate.utils.util;

/**
 * 
 * 
 * 
 */
@Controller
@RequestMapping("/*")
public class SearchAction {
	
	@Resource
	private SearchService searchService;
	
	@RequestMapping(value="/search/posts/{fromId}", method=RequestMethod.GET)
	public @ResponseBody 
	List<Search> list(@PathVariable Integer fromId, HttpSession session) {
		Integer profId = util.getProfId(session);
		return searchService.list(profId, fromId);
	}
	
	@RequestMapping(value="/search/post", method=RequestMethod.POST)
	public @ResponseBody
	int insert(@RequestBody Search search, HttpSession session) {
		Integer profId = util.getProfId(session);
		search.setCreatetime(new Date());
		search.setProfId(profId);
		int i = searchService.insert(search);
		if (i > 0) {
			return search.getId();
		} else {
			return 0;
		}
	}
	
	@RequestMapping(value="/search/post/{id}", method=RequestMethod.DELETE)
	public @ResponseBody
	int delete(@PathVariable int id, HttpSession session) {
		Integer profId = util.getProfId(session);
		return searchService.delete(profId, id);
	}
	
}
