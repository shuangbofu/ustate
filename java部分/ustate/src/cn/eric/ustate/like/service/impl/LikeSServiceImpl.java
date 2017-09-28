package cn.eric.ustate.like.service.impl;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.eric.ustate.like.dao.LikeSMapper;
import cn.eric.ustate.like.entity.LikeS;
import cn.eric.ustate.like.service.LikeSService;

/**
 * 
 * 
 * 
 */
@Service("likeSService")
public class LikeSServiceImpl implements LikeSService{

	@Resource
	private LikeSMapper likeSMapper;
	
	public int insert(int profId, Date createtime, int id) {
		return likeSMapper.insert(profId, createtime, id);
	}

	public int delete(int profId, int id) {
		return likeSMapper.delete(profId, id);
	}

	public List<LikeS> getLikedList(int fromId, int profId) {
		return likeSMapper.getLikedList(fromId, profId);
	}
}
