package cn.eric.ustate.profile.service;

import java.util.List;

import cn.eric.ustate.profile.entity.Profile;


/**
 * 
 * 
 * 
 */
public interface ProfileService {
	public Profile selectById(int profId);
	public List<Profile> list();
}
