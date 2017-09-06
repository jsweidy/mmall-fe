'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type       = _mm.getUrlParam('type') || 'default';
	var $element   = $('.'+ type + '-success');
	$element.show();

	if(type === 'payment'){
		var $orderNumber = $element.find('.order-number');
		$orderNumber.attr('href' , $orderNumber.attr('href')+_mm.getUrlParam('orderNumber'));
	}
})