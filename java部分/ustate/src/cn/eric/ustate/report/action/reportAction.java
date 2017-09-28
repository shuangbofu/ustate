package cn.eric.ustate.report.action;

import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.eric.ustate.report.entity.Report;
import cn.eric.ustate.report.service.ReportService;

/**
 * 
 * 
 * 
 */
@Controller
@RequestMapping("/*")
public class reportAction {
	
	@Resource
	private ReportService reportService;
	
	@RequestMapping(value="report", method = RequestMethod.POST)
	public 	@ResponseBody
	int insert(@RequestBody Report report, HttpSession  session) {
		int profId = (Integer) session.getAttribute("id");
		report.setCreatetime(new Date());
		report.setProfId(profId);
		System.out.println(report);
		return reportService.insert(report);
	}

}
