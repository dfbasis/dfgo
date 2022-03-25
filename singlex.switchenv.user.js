// ==UserScript==
// @name        [DFGO] Switch sppCap Environment
// @namespace    https://github.com/dfbasis/dfgo
// @updateURL    https://raw.githubusercontent.com/dfbasis/dfgo/main/singlex.switchenv.user.js
// @downloadURL    https://raw.githubusercontent.com/dfbasis/dfgo/main/singlex.switchenv.user.js
// @include     https://stackoverflow.com/*
// @include     https://procurement-*.singlex.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js
// @resource    jqUI_CSS  http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css
// @resource    IconSet1  http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/images/ui-icons_222222_256x240.png
// @resource    IconSet2  http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/images/ui-icons_454545_256x240.png
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_getResourceURL
// ==/UserScript==

//Ref//https://stackoverflow.com/questions/10638947/add-dynamic-div-layers-overlay-with-a-greasemonkey-script
$("body").append (
    '<select name="types" id="permit" style="display: block;position: absolute;top: 55px;right: 17px;z-index:83666;"> \
        <option selected="selected" value="">-- select type --</option> \
        <option value="dev"    data-type="domain" data-open="procurement-dev.singlex.com">dev</option>       \
        <option value="test"   data-type="domain" data-open="procurement-test.singlex.com">qa</option>       \
        <option value="qa-les" data-type="domain" data-open="procurement-qa-les.singlex.com">qa-les</option>     \
        <option value="qa-lgc" data-type="domain" data-open="procurement-qa-lgc.singlex.com">qa-lgc</option>       \
        <option value="les"    data-type="domain" data-open="procurement-les.singlex.com">les</option>        \
        <option value="lgc"    data-type="domain" data-open="procurement-lgc.singlex.com">lgc</option>         \
        <option value="ws-44"  data-type="domain" data-open="port8080-workspaces-ws-44545.ap12.applicationstudio.cloud.sap">ws-44</option>         \
        <option value="ws-42"  data-type="domain" data-open="port8080-workspaces-ws-q2vs2.ap12.applicationstudio.cloud.sap">ws-42</option>         \
     </select>                                                          \
    '
);

$(document).ready(function () {
    function openInNewTab(href) {
        Object.assign(document.createElement('a'), {
            target: '_blank',
            href: href,
        }).click();
    }
    $('#permit').change(function(){
        var option = $('option:selected', this).data('open');
        var type = $('option:selected', this).data('type');
        var value = $('option:selected', this)[0].value;
        console.log(option,type,value,$('option:selected', this)[0],window.location);
        var newURL  = window.location.protocol + "//"
        //+ window.location.host
        + option
        + window.location.pathname
        + window.location.search
        + window.location.hash
        ;
        //location.href //Current
        //var window.open(newURL, "_blank").focus(); //New Tab
        var redirectWindow = window.open(newURL, '_blank');
        redirectWindow.location;
        //openInNewTab(newURL);
    });
});

/**********************************************************************************
    EVERYTHING BELOW HERE IS JUST WINDOW DRESSING (pun intended).
**********************************************************************************/

/*--- Process the jQuery-UI, base CSS, to work with Greasemonkey (we are not on a server)
    and then load the CSS.

    *** Kill the useless BG images:
        url(images/ui-bg_flat_0_aaaaaa_40x100.png)
        url(images/ui-bg_flat_75_ffffff_40x100.png)
        url(images/ui-bg_glass_55_fbf9ee_1x400.png)
        url(images/ui-bg_glass_65_ffffff_1x400.png)
        url(images/ui-bg_glass_75_dadada_1x400.png)
        url(images/ui-bg_glass_75_e6e6e6_1x400.png)
        url(images/ui-bg_glass_95_fef1ec_1x400.png)
        url(images/ui-bg_highlight-soft_75_cccccc_1x100.png)

    *** Rewrite the icon images, that we use, to our local resources:
        url(images/ui-icons_222222_256x240.png)
        becomes
        url("' + GM_getResourceURL ("IconSet1") + '")
        etc.
*/
/*
*/
var iconSet1    = GM_getResourceURL ("IconSet1");
var iconSet2    = GM_getResourceURL ("IconSet2");
var jqUI_CssSrc = GM_getResourceText ("jqUI_CSS");
jqUI_CssSrc     = jqUI_CssSrc.replace (/url\(images\/ui\-bg_.*00\.png\)/g, "");
jqUI_CssSrc     = jqUI_CssSrc.replace (/images\/ui-icons_222222_256x240\.png/g, iconSet1);
jqUI_CssSrc     = jqUI_CssSrc.replace (/images\/ui-icons_454545_256x240\.png/g, iconSet2);

GM_addStyle (jqUI_CssSrc);

//--- Add some custom style tweaks.
GM_addStyle ( '                 \
    div.ui-widget-overlay {     \
        background: red;        \
        opacity:    0.6;        \
    }                           \
' );
GM_addStyle ( '                 \
    div.ui-widget-overlay {     \
        background: red;        \
        opacity:    0.6;        \
    }                           \
' );