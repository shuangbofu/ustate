package cn.eric.ustate.feedback.entity;

import java.io.Serializable;
import java.util.Date;

public class Feedback implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1586410213133374163L;

	private Integer id;

    private Date createtime;

    private Integer profId;

    private String content;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public Integer getProfId() {
		return profId;
	}

	public void setProfId(Integer profId) {
		this.profId = profId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public String toString() {
		return "Feedback [id=" + id + ", createtime=" + createtime
				+ ", profId=" + profId + ", content=" + content + "]";
	}
}