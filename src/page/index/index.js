﻿/*
* @Author: jsw
* @Date:   2017-08-14 17:33:01
* @Last Modified by:   jsw
* @Last Modified time: 2017-08-28 15:40:18
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide         = require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');
var _mm             = require('util/mm.js');

$(function() {
	var bannerHtml  = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);

    var $slider     = $('.banner').unslider({
        dots: true
    });

    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});