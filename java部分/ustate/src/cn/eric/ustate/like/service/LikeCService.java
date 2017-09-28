package cn.eric.ustate.like.service;

import java.util.Date;

/**
 * 
 * 
 * 
 */
public interface LikeCService {
	
	public int insert(int profId, Date createtime, int id);
	public int delete(int profId, int id);
}
