var jsonData = 'json';
var content;
var IL = {};

IL.post = function (url, data, cb) {
    $.post(url, data, function (returnJson) {
        if (returnJson.length > 0) {
            cb(returnJson);
        }
    }, jsonData);
}


$(document).ready(function () {
     li = $('li:contains("Events")');
      eventsPage(li);
});


function eventsPage(obj) {
    $('input[id=hdnTab]').val("events");
    $(".selected").removeClass();
    $(obj).addClass('selected');
    $('#content').empty();
    $('#content').addClass("tile-manage");
    $('#content').append(createDiv("event-form", ""));
    $('#content').append(createDiv("event-grid", ""));
    $('#content').append(createDiv("event-details", ""));
    $('#content').append(createDiv("pageContainer", ""));
    appendCSS("css/eventsTiles.css");
    appendScript("js/events.js");
    $('#pageContainer').addClass("center-align");}

function tilesPage(obj) {
    $('input[id=hdnTab]').val("tiles");
    $(".selected").removeClass();
    $(obj).addClass('selected');
    $('#content').empty();
    $('#content').addClass("tile-manage");
    $('#content').append(createDiv("tile-form", ""));
    $('#content').append(createDiv("tile-grid", ""));
    $('#content').append(createDiv("tile-details", ""));
    $('#content').append(createDiv("pageContainer", ""));
    appendCSS("css/eventsTiles.css");
    appendCSS("css/orgunits.css");
    appendScript("js/tiles.js");
    $('#pageContainer').addClass("center-align");
}

function orgunitsPage(obj) {
	$('input[id=hdnTab]').val("orgunits");
    $(".selected").removeClass();
    $(obj).addClass('selected');
    $('#content').empty();
    $('#content').addClass("user-manage");
    $('#content').append(createDiv("orgs", "organizations"));
    $('#content').append(createDiv("roles", "orgs-roles"));
    $('#content').append(createDiv("access", "orgs-access"));
    appendCSS("css/orgunits.css");
    appendScript("js/orgunits.js");
}

function usermanagePage(obj) {
	$('input[id=hdnTab]').val("users");
    $(".selected").removeClass();
    $(obj).addClass('selected');
    $('#content').empty();
    $('#content').addClass("user-manage");
    $('#content').append(createDiv("user-management", "users"));
    $('#content').append(createDiv("orgunits", "orgs-users"));
    appendCSS("css/orgunits.css");
    appendScript("js/users.js");
}

function ChangePwdPage(obj) {
    $(".selected").removeClass();
    $(obj).addClass('selected');
    $('#content').empty();
    $('#content').append(createDiv("change-pwd", "password"));
    $('#change-pwd').addClass("center-align");
    appendCSS("css/orgunits.css");
    appendScript("js/change-password.js");
}

function appendScript(src) {
    $("head").append("<script type='text/javascript' src='" + src + "'></script>");
}

function appendCSS(href) {
    $('head').append("<link rel='stylesheet' href='" + href + "' type='text/css' />");
}

function createDiv(id, style) {
    return "<div id=" + id + " class=" + style + "></div>";
}




