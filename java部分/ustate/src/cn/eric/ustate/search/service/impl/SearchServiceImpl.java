package cn.eric.ustate.search.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.eric.ustate.search.dao.SearchMapper;
import cn.eric.ustate.search.entity.Search;
import cn.eric.ustate.search.service.SearchService;

/**
 * 
 * 
 * 
 */
@Service("searchService")
public class SearchServiceImpl implements SearchService {

	@Resource
	private SearchMapper searchMapper;
	
	public List<Search> list(Integer profId, Integer fromId) {
		return searchMapper.list(profId, fromId);
	}

	public int insert(Search search) {
		return searchMapper.insert(search);
	}

	public int delete(Integer profId, int id) {
		return searchMapper.delete(profId, id);
	}

}
