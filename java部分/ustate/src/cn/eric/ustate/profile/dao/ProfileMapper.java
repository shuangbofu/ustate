package cn.eric.ustate.profile.dao;

import java.util.List;

import cn.eric.ustate.profile.entity.Profile;


public interface ProfileMapper {
	public Profile selectById(int profId);
	public List<Profile> list();
}