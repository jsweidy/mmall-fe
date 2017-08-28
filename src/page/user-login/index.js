﻿/*
* @Author: jsw
* @Date:   2017-08-14 17:33:01
* @Last Modified by:   jsw
* @Last Modified time: 2017-08-14 17:33:01
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user   = require('service/user-service.js');
var _mm     = require('util/mm.js');

// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var page = {
	init: function(){
		this.bindEvent();
	},
	bindEvent: function(){
		var _this = this;
		$('#submit').click(function(){
			_this.submit();
		});
		$('.user-content').keyup(function(e){
			if(e.keyCode === 13){
				_this.submit();
			}
		})
	},
	submit: function(){
		var formData = {
			    username: $.trim($('#username').val()),
			    password: $.trim($('#password').val())
		    },
			//表单验证结果
			validateResult = this.formValidate(formData);
		//验证成功
		if(validateResult.status){
			//提交
			_user.login(formData,function(res){
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
			},function(errMsg){
				formError.show(errMsg);
			});
		} 
		//验证失败
		else {
			//提示
			formError.show(validateResult.msg);
		}
	},
	formValidate: function(formData){
		var result = {
			status: false,
			msg: ''
		};
		if(!_mm.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		if(!_mm.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result;
		}
		result.status = true;
		result.msg = '验证通过';
		return result;
	}
};

$(function(){
	page.init();
})