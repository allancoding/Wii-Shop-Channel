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

function gotoIndex()
{
	// –ÚŽŸ‚É‚à‚Ç‚é
	window.open("../index.html","_self");
}

function jumpPage(pageName)
{
	window.open("../" + pageName + "/" + pageName + ".html", "_self" );
}

function kpress(last)
{
	var nowpage_url = window.location.pathname;
	var nowpage_idx = nowpage_url.lastIndexOf("_");
	var nowpage = parseInt( nowpage_url.substr( nowpage_idx+1, 2 ) );
	prevpage = nowpage-1;
	nextpage = nowpage+1;
	prev = "page_" + Math.floor( prevpage / 10 ) + prevpage % 10 ;
	next = "page_" + Math.floor( nextpage / 10 ) + nextpage % 10 ;

	// 174 : Core + button
	// 177 : Core Right button
	// 178 : Core Left button

	switch( event.keyCode )
	{
	case 174:
		gotoIndex();
		wiiCancelSound();
		break;
	case 178:
		if ( prevpage > 0 )
		{
			jumpPage(prev);
			wiiSelectSound();
		}
		else
		{
			gotoIndex();
			wiiCancelSound();
		}
		break;
	case 177:
		if ( !last )
		{
			jumpPage(next);
			wiiSelectSound();
		}
		else
		{
			gotoIndex();
			wiiCancelSound();
		}
		break;
	}
}
