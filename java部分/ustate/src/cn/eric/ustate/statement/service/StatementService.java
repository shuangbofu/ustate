package cn.eric.ustate.statement.service;

import java.util.List;

import cn.eric.ustate.statement.entity.Statement;


/**
 * 
 * 
 * 
 */
public interface StatementService {

	public List<Statement> list(Integer profId, int fromId);
	public List<Statement> hotList(Integer profId, int fromId);
	public Statement getDetail(Integer profId, int id);
	public List<Statement> getPostedList(Integer profId, int fromId);
//	public List<Statement> getCommentedList(int profId);
//	public List<Statement> getLikedList(int profId);
//	public Integer getProfId(int id);
	public int insert(Statement statement);
	public int delete(Integer profId, int id);
}
