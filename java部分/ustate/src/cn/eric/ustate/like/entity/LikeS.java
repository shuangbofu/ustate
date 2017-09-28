package cn.eric.ustate.like.entity;

import java.io.Serializable;
import java.util.Date;

public class LikeS implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = -8249292586013613972L;

	private Integer id;

    private Integer profId;

    private Date createtime;

    private Integer defId;
    
    private String originContent;

	public String getOriginContent() {
		if (originContent == null) {
			originContent = "";
		}
		return originContent;
	}

	public void setOriginContent(String originContent) {
		this.originContent = originContent;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getProfId() {
		if (profId == null) {
			this.profId = 0;
		}
		return profId;
	}

	public void setProfId(Integer profId) {
		this.profId = profId;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public Integer getDefId() {
		if (this.defId == null) {
			this.defId = 0;
		}
		return defId;
	}

	public void setDefId(Integer defId) {
		this.defId = defId;
	}

	@Override
	public String toString() {
		return "LikeS [id=" + id + ", profId=" + profId + ", createtime="
				+ createtime + ", defId=" + defId + ", originContent="
				+ originContent + "]";
	}

	public LikeS(Date createtime, Integer defId) {
		super();
		this.createtime = createtime;
		this.defId = defId;
	}
	
	public LikeS() {
		
	}
}