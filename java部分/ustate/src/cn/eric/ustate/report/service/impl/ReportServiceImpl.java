package cn.eric.ustate.report.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.eric.ustate.report.dao.ReportMapper;
import cn.eric.ustate.report.entity.Report;
import cn.eric.ustate.report.service.ReportService;

/**
 * 
 * 
 * 
 */
@Service("reportService")
public class ReportServiceImpl implements ReportService{

	@Resource
	private ReportMapper reportMapper;
	
	public int insert(Report report) {
		return reportMapper.insert(report);
	}

}
