"use strict";

const path = require('path');

module.exports = Franz => {
    const getMessages = function getMessages() {
        var count = 0;
        var nodes = document.querySelectorAll('#feed_list .folder_title span.unread_count_full:not(.unread_count_starred)');
        nodes.forEach(function(e) {
            count = count + parseInt(e.textContent.trim(), 10);
        });
        Franz.setBadge(0, count);
    };
    Franz.loop(getMessages);

    // open story links in browser, not franz
    window.setInterval(function() {
        document.querySelectorAll('.NB-story-titles .NB-selected a').forEach(function(el) {
            if (el.host !== window.location.host && !el.getAttribute('loc')) {
                el.setAttribute('loc', el.href);
                el.addEventListener('click', function(e) {
                    window.open(this.getAttribute('loc'));
                    e.stopPropagation();
                    e.preventDefault();
                });
            }
        });
    }, 250);
};
