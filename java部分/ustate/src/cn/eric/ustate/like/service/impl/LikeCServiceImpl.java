package cn.eric.ustate.like.service.impl;

import java.util.Date;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.eric.ustate.like.dao.LikeCMapper;
import cn.eric.ustate.like.service.LikeCService;

/**
 * 
 * 
 * 
 */
@Service("likeCService")
public class LikeCServiceImpl implements LikeCService {

	@Resource
	private LikeCMapper likeCMapper;
	
	public int insert(int profId, Date createtime, int id) {
		return likeCMapper.insert(profId, createtime, id);
	}

	public int delete(int profId, int id) {
		return likeCMapper.delete(profId, id);
	}

}
