package cn.eric.ustate.like.entity;

import java.io.Serializable;
import java.util.Date;

public class LikeC implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 8887410110531386910L;

	private Integer id;

    private Integer profId;

    private Integer defId;

    private Date createtime;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	@Override
	public String toString() {
		return "LikeC [id=" + id + ", profId=" + profId + ", defId=" + defId
				+ ", createtime=" + createtime + "]";
	}

	public LikeC(Integer profId, Date createtime) {
		super();
		this.profId = profId;
		this.createtime = createtime;
	}

	public LikeC() {
		super();
	}
}