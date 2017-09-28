package cn.eric.ustate.comment.service;

import java.util.List;

import cn.eric.ustate.comment.entity.Comment;


/**
 * 
 * 
 * 
 */
public interface CommentService {
	public List<Comment> list(Integer profId, int id);
	public int insert(Comment comment);
	public List<Comment> getCommentedList(int fromId, Integer profId);
	public int delete(Integer profId, int id);
//	public int getProfId(int id);
}
