package cn.eric.ustate.statement.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import cn.eric.ustate.statement.entity.Statement;


public interface StatementMapper {
    public List<Statement> list(@Param("profId") Integer profId, @Param("fromId")int fromId);
    public List<Statement> hotList(@Param("profId") Integer profId, @Param("fromId")int fromId);
    public Statement getDetail(@Param("profId") Integer profId, @Param("id") int id);
    public List<Statement> getPostedList(@Param("profId") Integer profId, @Param("fromId")int fromId);
    public Integer getProfId(int id);
    public int insert(Statement statement);
    public int delete(Integer profId, int id);
} 