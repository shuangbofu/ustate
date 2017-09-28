package cn.eric.ustate.comment.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import cn.eric.ustate.comment.entity.Comment;


public interface CommentMapper {
	public List<Comment> list(@Param("profId") Integer profId, @Param("id") int id);
	public int insert(Comment comment);
	public List<Comment> getCommentedList(@Param("fromId") int fromId, @Param("profId") Integer profId);
	public int delete(Integer profId, int id);
	public Map<String, Object> getLikecInfo(int id);
}