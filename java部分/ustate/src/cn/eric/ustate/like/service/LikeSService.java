package cn.eric.ustate.like.service;

import java.util.Date;
import java.util.List;

import cn.eric.ustate.like.entity.LikeS;

/**
 * 
 * 
 * 
 */
public interface LikeSService {
	public int insert(int profId, Date createtime, int id);
	public int delete(int profId, int id);
	public List<LikeS> getLikedList(int fromId, int profId);
}
