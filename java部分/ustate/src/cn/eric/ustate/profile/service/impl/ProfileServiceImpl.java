package cn.eric.ustate.profile.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.eric.ustate.profile.dao.ProfileMapper;
import cn.eric.ustate.profile.entity.Profile;
import cn.eric.ustate.profile.service.ProfileService;

/**
 * 
 * 
 * 
 */
@Service("profileService")
public class ProfileServiceImpl implements ProfileService{

	@Resource
	private ProfileMapper profileMapper;
	
	public Profile selectById(int profId) {
		return profileMapper.selectById(profId);
	}

	public List<Profile> list() {
		return profileMapper.list();
	}
}
