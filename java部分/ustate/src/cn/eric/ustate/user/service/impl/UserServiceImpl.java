package cn.eric.ustate.user.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import cn.eric.ustate.user.dao.UserMapper;
import cn.eric.ustate.user.service.UserService;

/**
 * 
 * 
 * 
 */
@Service("userService")
public class UserServiceImpl implements UserService{

	@Resource
	private UserMapper userMapper;

	public Integer login(String loginname, String password) {
		return userMapper.login(loginname, password);
	}
}
