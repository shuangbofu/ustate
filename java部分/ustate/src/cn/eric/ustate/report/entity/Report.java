package cn.eric.ustate.report.entity;

import java.io.Serializable;
import java.util.Date;

public class Report implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 3061344055781809292L;

	private Integer id;

    private Date createtime;

    private Integer profId;

    private Integer defId;

    private int typeId;
    
    private int contentId;

	public int getContentId() {
		return contentId;
	}

	public void setContentId(int contentId) {
		this.contentId = contentId;
	}

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

	public Integer getDefId() {
		return defId;
	}

	public void setDefId(Integer defId) {
		this.defId = defId;
	}

	public int getTypeId() {
		return typeId;
	}

	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}

	@Override
	public String toString() {
		return "Report [id=" + id + ", createtime=" + createtime + ", profId="
				+ profId + ", defId=" + defId + ", typeId=" + typeId
				+ ", contentId=" + contentId + "]";
	}

}