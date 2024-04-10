/*

This code is example for standalone solutions, it just 'display none' all warning blocks for media section and posts feed + disable blur css effect. Originaly coded and integrated to KellyC project

https://github.com/NC22/KellyC-Image-Downloader/blob/master/extension/lib/recorder/filters/twitter.js

*/  
  
var getParentByTag = function(el, tagName) {
    var parent = el;
    if (!tagName) return false;
    
    tagName = tagName.toLowerCase();
    
    while (parent && parent.tagName.toLowerCase() != tagName) {
        parent = parent.parentElement;
    }  
    
    return parent;
}

var findSignMainBlock = function(el) {
    var parent = el;
  
    while (parent) {
        parent = parent.parentElement;
        if (parent.children.length == 1) {
            var testBlock = parent.children[0].querySelector('div[role="button"]') ; 
            if (testBlock) return parent;
        }
    }  
    
    return false;
}


if (window.location.href.indexOf('/media') != -1) {
    
    var posts = document.querySelectorAll('li[role="listitem"]');

    for(var i=0; i < posts.length; i++) {

        var post = posts[i]; 
        var containers = post.getElementsByTagName('DIV');

        for (var b = 0; b < containers.length; b++) {
            
            if (containers[b].children.length == 2 && containers[b].children[0].tagName == 'DIV' && containers[b].children[1].tagName == 'DIV') {
                var style = window.getComputedStyle(containers[b].children[0]);
                if (style.filter && style.filter.indexOf('blur') != -1 && style.filter.indexOf('blur(0px)') == -1) {
                    containers[b].children[0].style.filter = 'blur(0px)';
                    containers[b].children[1].style.display = 'none';
                    break;
                }
            }
        }
    }
    
} else {
    
    var posts = document.getElementsByTagName('ARTICLE');
    for(var i=0; i < posts.length; i++) {

        var post = posts[i]; 
        var containers = post.getElementsByTagName('DIV');
        var warningEl = false;

        for (var b = 0; b < containers.length; b++) {
            
            if (!warningEl) {
                var sign = containers[b].getElementsByTagName('SPAN');
                    
                if (sign.length > 0 && sign[0].innerHTML.indexOf('sensitive') != -1) {

                    warningEl = findSignMainBlock(sign[0]);
                    warningEl.style.display = 'none';
                }
            }
            
            var style = window.getComputedStyle(containers[b]);
            if (style.filter && style.filter.indexOf('blur') != -1) {
                containers[b].style.filter = 'blur(0px)';
            }
        }            
    }
    
}