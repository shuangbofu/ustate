package cn.eric.ustate.notice.dao;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import cn.eric.ustate.notice.entity.Notice;


public interface NoticeMapper {
    public int getCount(Integer defProfId);
    public int insertCommentNotice(@Param("profId") Integer profId, @Param("defProfId") Integer defProfId, @Param("cmtId") int cmtId, @Param("stmtId") int stmtId, @Param("createtime") Date createtime);
    public int insertLikeSNotice(@Param("profId") Integer profId, @Param("defProfId") Integer defProfId, @Param("stmtId") int stmtId, @Param("createtime") Date createtime);
    public int insertLikeCNotice(@Param("profId") Integer profId, @Param("defProfId") Integer defProfId, @Param("cmtId") int cmtId, @Param("stmtId") int stmtId, @Param("createtime") Date createtime);
    public List<Notice> list(@Param("fromId") int fromId, @Param("defProfId") Integer defProfId); 
    public int resetStatus(Integer defProfId);

}