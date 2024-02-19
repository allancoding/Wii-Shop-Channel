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

//
//  shopping channel
//

var shop = new wiiShop() ;
var ec = new ECommerceInterface ();  // only create one per page

//  shop.title          : Localized strings of "Wii Shop Channel"
//  shop.menuBtn        : Localized strings of "Wii Menu"
//  shop.retryBtn       : Localized strings of "Try Again"
//  shop.returnToMenu() : Return to Wii Menu
//  shop.getLogUrl      : The variable is set to the log-get-URL. The default is "http://oss.shop.wii.com/oss/getLog"
//  shop.beginWaiting() : begin to display the waiting icon.
//  shop.endWaiting()   : end to display the waiting icon.

//  shop.setWallpaper( wallpaper )  : change the wallpaper on given arg.
var cWP_Dots  = 0 ; // default
var cWP_Black = 1 ;
var cWP_White = 2 ;
var cWP_VLine = 3 ;

//  shop.enableHRP()
//  shop.disableHRP()   : Enable/disable HBM,reset,power-off

//  shop.connecting     : The connecting message strings.
//
//  shop.error( errorcode, errortype ) : jump to local error html.
//
var cET_Internet = 0 ;
var cET_Server   = 1 ;
var cET_Online   = 2 ;

function wiiStartWaiting()
{
    if (shop != null && "beginWaiting" in shop) {
        shop.beginWaiting();
    }
}

function wiiStopWaiting()
{
    if (shop != null && "endWaiting" in shop) {
        shop.endWaiting();
    }
}

function wiiEnableHRP()
{
    if (shop != null && "enableHRP" in shop) {
        shop.enableHRP();
    }
}

function wiiDisableHRP()
{
    if (shop != null && "disableHRP" in shop) {
        shop.disableHRP();
    }
}

function wiiShowError(errCode, errType)
{
    if (shop != null && "error" in shop) {
        shop.error(errCode, errType);
    }
}

function wiiCloseManual()
{
	if ( shop != null && "closeManual" in shop ) {
		shop.closeManual()
	}
	showBack('0');
}

function showBack(index)
{
    var lastUrl = null;
    if (ecSupportsSession()) {
    	var lastPage;
    	if (index != null) {
    	    lastPage = ec.getSessionValue("history." + index);
    	} else {
    	    lastPage = ec.getSessionValue("history.-1");
    	}
    	if (lastPage != null) {
    	    lastUrl = ec.getSessionValue(lastPage);
    	} else {
    	    lastUrl = "javascript:shop.returnToMenu()"; /* for manual page jumping */
    	}
    } 
    if (lastUrl != null) {
        trace("showBack: last url was " + lastUrl);
    	top.location=lastUrl;
    } else {
     	history.back();
    }
}

function doPost(url, params)
{
    //trace("doPost(" + url + ", " + params + ")");
    if (url != null && params != null) {
	    var form;
        form = document.getElementById("PostForm");
        if (form == null) {
            form = document.createElement("form");
            form.action = url;
            form.method = "post";
            form.id="PostForm";
            document.body.appendChild(form);
        }
    
        var formHTML = "";
        var paramArray = params.split("&");
        var i;
        for (i in paramArray) {
            var param = paramArray[i];
            var index = param.indexOf("=");
            if (index >= 0) {
            	var name = param.substr(0, index);
            	var value = param.substr(index+1);
            	if (name == "token") {
            	    value = ec.getWeakToken ();
                }
                formHTML += '<input type="hidden" name="' + name + '" value="' + value + '"/>';
        }
    }
	formHTML += '<div id="post.commonFields"></div>';
        form.innerHTML = formHTML;
        initCommonFields("post.commonFields");     
        form.submit();
    }
}

function initCommonFields(commonFieldsId, includeWeakToken)
{
    // Common hidden fields for a form
    var commonFields = document.getElementById(commonFieldsId);
    if (commonFields == null) {
        return;
    }

    var r = ec.getDeviceInfo ();
    if (typeof(r) == "object") {    
        var str = '';
        if (r.accountId != null) {
            str = str + '<input type="hidden" name="accountId" value="' + r.accountId + '"/>';
        }
        if (r.deviceId != null) {
            str = str + '<input type="hidden" name="deviceId" value="' + r.deviceId + '"/>';
        }
        if (r.serial != null) {
            str = str + '<input type="hidden" name="serialNo" value="' + r.serial + '"/>';
        }
        if (r.country != null) {
            str = str + '<input type="hidden" name="country" value="' + r.country + '"/>';
        }
        if (r.region != null) {
            str = str + '<input type="hidden" name="region" value="' + r.region + '"/>';
        }
        if (r.userAge != null && r.isParentalControlEnabled) {
            str = str + '<input type="hidden" name="age" value="' + r.userAge + '"/>';
        }
        if (r.language != null) {
            str = str + '<input type="hidden" name="language" value="' + r.language + '"/>';
        }
        
        if (includeWeakToken) {
	        var weakToken = ec.getWeakToken ();
    	    if (weakToken != null) {
        	    str += '<input type="hidden" name="token" value="' + weakToken + '"/>';
	        }
	    }
        commonFields.innerHTML = str;
    } else {
        commonFields.innerHTML = 'error getting device info<BR>';
    }
}
function ecSupportsSession()
{
// remove "setSessionValue" in ec because it will return false for untrusted pages, for example, manual, free intro
    return ("getSessionValue" in ec);
    
}


// Error Check
shopCheck = true;

