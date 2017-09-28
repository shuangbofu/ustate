package cn.eric.ustate.notice.entity;

import java.io.Serializable;
import java.util.Date;

public class Notice implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 4949557011801366732L;

	private Integer id;

	private Integer defProfId;
	

	private Integer profId;

    private Integer stmtId;
    
    private Integer cmtId;

    private int status;

    private int type;

    private Date createtime;
    
    private String originContent;
    
    private String content;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public Integer getDefProfId() {
		return defProfId;
	}

	public void setDefProfId(Integer defProfId) {
		this.defProfId = defProfId;
	}
	
	public Integer getProfId() {
		return profId;
	}

	public void setProfId(Integer profId) {
		this.profId = profId;
	}

	public Integer getStmtId() {
		if (stmtId == null){
			this.stmtId = 0;
		}
		return stmtId;
	}

	public void setStmtId(Integer stmtId) {
		this.stmtId = stmtId;
	}

	public Integer getCmtId() {
		if (cmtId == null) {
			this.cmtId = 0;
		}
		return cmtId;
	}

	public void setCmtId(Integer cmtId) {
		this.cmtId = cmtId;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public String getOriginContent() {
		if (originContent == null) {
			this.originContent = "";
		}
		return originContent;
	}

	public void setOriginContent(String originContent) {
		this.originContent = originContent;
	}

	public String getContent() {
		if (content == null) {
			this.content = "";
		}
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public String toString() {
		return "Notice [id=" + id + ", defProfId=" + defProfId + ", profId="
				+ profId + ", stmtId=" + stmtId + ", cmtId=" + cmtId
				+ ", status=" + status + ", type=" + type + ", createtime="
				+ createtime + ", originContent=" + originContent
				+ ", content=" + content + "]";
	}
}