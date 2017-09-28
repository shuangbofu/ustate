package cn.eric.ustate.profiledetail.entity;

import java.io.Serializable;
import java.util.Date;

public class Profiledetail implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = -1695802304112473160L;

	private String profdtlId;

    private Date profdtlBirthday;

    private String profdtlAddress;

    public String getProfdtlId() {
        return profdtlId;
    }

    public void setProfdtlId(String profdtlId) {
        this.profdtlId = profdtlId == null ? null : profdtlId.trim();
    }

    public Date getProfdtlBirthday() {
        return profdtlBirthday;
    }

    public void setProfdtlBirthday(Date profdtlBirthday) {
        this.profdtlBirthday = profdtlBirthday;
    }

    public String getProfdtlAddress() {
        return profdtlAddress;
    }

    public void setProfdtlAddress(String profdtlAddress) {
        this.profdtlAddress = profdtlAddress == null ? null : profdtlAddress.trim();
    }

	@Override
	public String toString() {
		return "Profiledetail [profdtlId=" + profdtlId + ", profdtlBirthday="
				+ profdtlBirthday + ", profdtlAddress=" + profdtlAddress + "]";
	}
    
    
}