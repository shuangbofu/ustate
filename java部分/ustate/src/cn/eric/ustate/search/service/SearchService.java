package cn.eric.ustate.search.service;

import java.util.List;

import cn.eric.ustate.search.entity.Search;

/**
 * 
 * 
 * 
 */
public interface SearchService {
	public List<Search> list (Integer profId, Integer fromId);
	public int insert(Search search);
	public int delete(Integer profId, int id);
}
