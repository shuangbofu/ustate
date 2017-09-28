package cn.eric.ustate.statement.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.eric.ustate.like.service.LikeSService;
import cn.eric.ustate.statement.dao.StatementMapper;
import cn.eric.ustate.statement.entity.Statement;
import cn.eric.ustate.statement.service.StatementService;

/**
 * 
 * 
 * 
 */
@Service("statementService")
public class StatementServiceImpl implements StatementService{

	@Resource
	private StatementMapper statementMapper;
	
	@Resource
	private LikeSService likeSService;
	
	public List<Statement> list(Integer profId, int fromId) {
		return statementMapper.list(profId, fromId);
	}

	public Statement getDetail(Integer profId, int id) {
		return statementMapper.getDetail(profId, id);
	}

	public List<Statement> hotList(Integer profId, int fromId) {
		return statementMapper.hotList(profId, fromId);
	}

	public List<Statement> getPostedList(Integer profId, int fromId) {
		return statementMapper.getPostedList(profId, fromId);
	}

	public int insert(Statement statement) {
		return statementMapper.insert(statement);
	}

	public int delete(Integer profId, int id) {
		int i = statementMapper.delete(profId, id);
		likeSService.delete(profId, id);
		return i;
	}

}
