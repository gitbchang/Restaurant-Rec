
//var resId = localStorage.resId;
// var str = window.location.pathname;
// localStorage.setItem("login", str[1]);
var login = localStorage.login;

// create the admin navigation
var ul = $("<ul class='nav nav-pills nav-justified'>");

var li = $("<li role='presentation'>");
var a = $("<a>");
a.text("HOME");
a.attr("href", "/" + login + "/select");
li.append(a);
ul.append(li);

var li = $("<li role='presentation'>");
var a = $("<a>");
a.text("CREATE");
a.attr("href", "/" + login + "/create");
li.append(a);
ul.append(li);

var li = $("<li role='presentation'>");
var a = $("<a>");
a.text("UPDATE");
a.attr("href", "/" + login + "/update");
li.append(a);
ul.append(li);

$("#select-nav").html(ul);