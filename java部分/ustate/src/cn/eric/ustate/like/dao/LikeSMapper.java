package cn.eric.ustate.like.dao;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import cn.eric.ustate.like.entity.LikeS;


public interface LikeSMapper {
	public int insert(int profId, Date createtime, int id);
	public int delete(int profId, int id);
	public List<LikeS> getLikedList(@Param("fromId") int fromId, @Param("profId") int profId);
}