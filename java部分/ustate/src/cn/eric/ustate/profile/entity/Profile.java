package cn.eric.ustate.profile.entity;

import java.io.Serializable;

public class Profile implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 3056059656031038953L;

	//个人编号
	private Integer profId;
	//个人昵称
    private String nickname;
    //个人头像
    private String avatar;
    //个人性别
    private int gender;
    //个人点赞数
    private int likePostsCount;
    //个人发表数
    private int postsCount;
    //个人评论数
    private int commentPostsCount;
    //个人通知总数
    private int noticeTotalCount;
    
	public int getNoticeTotalCount() {
		return noticeTotalCount;
	}
	public void setNoticeTotalCount(int noticeTotalCount) {
		this.noticeTotalCount = noticeTotalCount;
	}
	public int getCommentPostsCount() {
		return commentPostsCount;
	}
	public void setCommentPostsCount(int commentPostsCount) {
		this.commentPostsCount = commentPostsCount;
	}
	public int getLikePostsCount() {
		return likePostsCount;
	}
	public void setLikePostsCount(int likePostsCount) {
		this.likePostsCount = likePostsCount;
	}
	public int getPostsCount() {
		return postsCount;
	}
	public void setPostsCount(int postsCount) {
		this.postsCount = postsCount;
	}
	public Profile(Integer profId) {
		super();
		this.profId = profId;
	}
	public Profile() {
		
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

	public String getNickname() {
		if (nickname == null) {
			this.nickname = "某同学";
		}
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getAvatar() {
		if (avatar == null) {
			if (this.gender == 1) {
				this.avatar = "http://118.89.182.253/img/avatar_male.jpg";
			} else {
				this.avatar = "http://118.89.182.253/img/avatar_female.jpg";
			}
		}
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public int getGender() {
		return gender;
	}

	public void setGender(int gender) {
		this.gender = gender;
	}
	@Override
	public String toString() {
		return "Profile [profId=" + profId + ", nickname=" + nickname
				+ ", avatar=" + avatar + ", gender=" + gender
				+ ", likePostsCount=" + likePostsCount + ", postsCount="
				+ postsCount + ", commentPostsCount=" + commentPostsCount
				+ ", noticeTotalCount=" + noticeTotalCount + "]";
	}
	
}