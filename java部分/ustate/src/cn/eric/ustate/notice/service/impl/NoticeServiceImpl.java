package cn.eric.ustate.notice.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.eric.ustate.comment.dao.CommentMapper;
import cn.eric.ustate.notice.dao.NoticeMapper;
import cn.eric.ustate.notice.entity.Notice;
import cn.eric.ustate.notice.service.NoticeService;
import cn.eric.ustate.statement.dao.StatementMapper;

/**
 * 
 * 
 * 
 */
@Service("noticeService")
public class NoticeServiceImpl implements NoticeService{

	@Resource
	private NoticeMapper noticeMapper;
	
	@Resource
	private CommentMapper commentMapper;
	
	@Resource
	private StatementMapper statementMapper;
	
	public int getCount(Integer profId) {
		return noticeMapper.getCount(profId);
	}
	
	public int insertCommentNotice(Integer profId, int id, int stmtId, Date createtime) {
		Integer defProfId = statementMapper.getProfId(stmtId);
		return noticeMapper.insertCommentNotice(profId, defProfId, id, stmtId, createtime);
	}


	public List<Notice> list(int fromId, Integer defProfId) {
		return noticeMapper.list(fromId, defProfId);
	}

	public int resetStatus(Integer defProfId) {
		return noticeMapper.resetStatus(defProfId);
	}

	public int insertLikeCNotice(Integer profId, int id, Date createtime) {
		Map<String, Object> map = commentMapper.getLikecInfo(id);
		Integer defProfId = (Integer) map.get("defProfId");
		int stmtId = (Integer) map.get("stmtId");
		return noticeMapper.insertLikeCNotice(profId, defProfId,id,stmtId, createtime);
	}

	public int insertLikeSNotice(Integer profId, int id, Date createtime) {
		Integer defProfId = statementMapper.getProfId(id);
		return noticeMapper.insertLikeSNotice(profId, defProfId, id, createtime);
	}







	
}
