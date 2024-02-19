/*
 *  Copyright 2005-2014 Acer Cloud Technology, Inc.
 *  All Rights Reserved.
 *
 *  This software contains confidential information and
 *  trade secrets of Acer Cloud Technology, Inc.
 *  Use, disclosure or reproduction is prohibited without
 *  the prior express written permission of Acer Cloud
 *  Technology, Inc.
 */

function jumpPage(page)
{
	pageName = "page_" + Math.floor( page / 10 ) + page % 10 ;
	window.open( pageName + "/" + pageName + ".html", "_self" );
}

var scroll_step = 30;
var page_scroll_step = 120;
function kdown( lastpage )
{
    var _code = event.keyCode;
	var _obj = document.getElementById('content');

	switch(_code)
	{
	case 175:    //up
		_obj.scrollTop -= scroll_step;
		break;
	case 176:    //down
		_obj.scrollTop += scroll_step;
		break;
	case 178:    //left
		jumpPage( lastpage );
		wiiSelectSound();
		break;
	case 177:    //right
		jumpPage(1);
		wiiSelectSound();
		break;
	}
}

function chimg(layerName){
	document.getElementById(layerName).style.backgroundImage="url(index_data/source_pict_index/index_button_ro.png)";
}
function bkimg(layerName){
	document.getElementById(layerName).style.backgroundImage="url(index_data/source_pict_index/index_button.png)";
}
function jump(url){
	parent.location.href = url;
}