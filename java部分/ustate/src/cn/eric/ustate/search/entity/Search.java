package cn.eric.ustate.search.entity;

import java.io.Serializable;
import java.util.Date;

public class Search implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 4959336834926253027L;

	private Integer id;

    private Date createtime;

    private Integer profId;

    private String number;

    private String name;

    private String phone;

    private String qq;

    private int type;
    
    private int status;
    
    private String remark;
    
    public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	private int author;
    
    private String profNickname;

	public String getProfNickname() {
		return profNickname;
	}

	public void setProfNickname(String profNickname) {
		this.profNickname = profNickname;
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

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getAuthor() {
		return author;
	}

	public void setAuthor(int author) {
		this.author = author;
	}

	@Override
	public String toString() {
		return "Search [id=" + id + ", createtime=" + createtime + ", profId="
				+ profId + ", number=" + number + ", name=" + name + ", phone="
				+ phone + ", qq=" + qq + ", type=" + type + ", status="
				+ status + ", remark=" + remark + ", author=" + author
				+ ", profNickname=" + profNickname + "]";
	}
}