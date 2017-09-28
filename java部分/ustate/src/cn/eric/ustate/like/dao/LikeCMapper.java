package cn.eric.ustate.like.dao;

import java.util.Date;

public interface LikeCMapper {
	public int insert(int profId, Date createtime, int id);
	public int delete(int profId, int id);
}