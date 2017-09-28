package cn.eric.ustate.feedback.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.eric.ustate.feedback.dao.FeedbackMapper;
import cn.eric.ustate.feedback.entity.Feedback;
import cn.eric.ustate.feedback.service.feedbackService;

/**
 * 
 * 
 * 
 */
@Service("feedbackService")
public class FeedbackServiceImpl implements feedbackService{

	@Resource
	private FeedbackMapper feedbackMapper;
	
	public int insert(Feedback feedback) {
		return feedbackMapper.insert(feedback);
	}

}
