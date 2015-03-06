/*!
 * data object
 * - webRequest should include [website url, css selector, action to perform]
 * 
 */

var websiteName = 'mrbean';
var cssSelector = '#menu-item-16 a';

chrome.webRequest.onBeforeSendHeaders.addListener(function( details ) {

    chrome.tabs.get(details.tabId, function( tab ) {

        /*!
         * NOTES: Web request should include action and CSS selector
         */

        // send message only when request comes from localhost or ngrok xmlrequest
        if ( tab.url.indexOf( 'localhost' ) !== -1 || tab.url.indexOf( 'ngrok' ) !== -1 || tab.url.indexOf( 'simuapp.herokuapp.com' ) !== -1 ) {
            // send message to contentscript.js
            chrome.tabs.query({}, function( tabs ) {

                var url = tabs[0].url;
                for ( var i = 0; i < tabs.length; i++ ) {

                    var _tab = tabs[i];
                    if ( _tab.url.indexOf( websiteName ) !== -1 ) { // find tab url

                        // get css selector param from http header
                        chrome.tabs.sendMessage(_tab.id, {
                            from: 'background',
                            selector: cssSelector,
                            details: details
                        }, function() {});
                        return false;
                    }
                }
            });
        }

        // chrome.tabs.executeScript(null, {js_files: ["jquery/min.js", "woo.js"]});

    });

}, { urls: ['http://*/*', 'https://*/'], types: ['xmlhttprequest'] }); // <-- listen to web socket request