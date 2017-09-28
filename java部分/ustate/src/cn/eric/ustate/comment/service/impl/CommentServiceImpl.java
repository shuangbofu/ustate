package cn.eric.ustate.comment.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.eric.ustate.comment.dao.CommentMapper;
import cn.eric.ustate.comment.entity.Comment;
import cn.eric.ustate.comment.service.CommentService;
import cn.eric.ustate.like.dao.LikeCMapper;

/**
 * 
 * 
 * 
 */
@Service("commentService")
public class CommentServiceImpl implements CommentService{

	@Resource
	private CommentMapper commentMapper;
	
	@Resource
	private LikeCMapper likeCMapper;

	public List<Comment> list(Integer profId, int id) {
		return commentMapper.list(profId, id);
	}

	public int insert(Comment comment) {
		return commentMapper.insert(comment);
	}

	public List<Comment> getCommentedList(int fromId, Integer profId) {
		return commentMapper.getCommentedList(fromId, profId);
	}

	public int delete(Integer profId, int id) {
		int i = commentMapper.delete(profId, id);
		likeCMapper.delete(profId, id);
		return i;
	}
}
