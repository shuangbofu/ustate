package cn.eric.ustate.notice.service;

import java.util.Date;
import java.util.List;

import cn.eric.ustate.notice.entity.Notice;

/**
 * 
 * 
 * 
 */
public interface NoticeService {
	public int getCount(Integer defProfId);
	public int insertCommentNotice(Integer profId, int id, int stmtId, Date createtime);
	public List<Notice> list(int fromId, Integer defProfId); 
	public int insertLikeSNotice(Integer profId, int id, Date createtime);
	public int insertLikeCNotice(Integer profId, int id, Date createtime);
	public int resetStatus(Integer defProfId);
}
