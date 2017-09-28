package cn.eric.ustate.search.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import cn.eric.ustate.search.entity.Search;


public interface SearchMapper {
    public List<Search> list (@Param("profId") Integer profId, @Param("fromId")int fromId);
    public int insert(Search search);
    public int delete(Integer profId, int id);
}