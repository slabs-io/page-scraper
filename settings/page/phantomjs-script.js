/**
 * THIS IS NOT A NODEJS FILE
 * it's a phantomjs file and there is a huge difference
 * 
 * This file runs phantomjs to normalize the markup across browsers
 * and to move the content onto the slabs domain
 * 
 */
 
var page = require('webpage').create();
var system = require('system');
var args = system.args;
var url = args[1];
var staticsPath = args[2];


// todo - move into configs
var slabscrapePath = staticsPath + 'index.html';
var slabscrapeJS = staticsPath + 'slabscrape.js';
var slabscrapeCSS = staticsPath + 'slabscrape.css';

page.open(url, function(status){
   page.evaluate(function(url, slabscrapePath, slabscrapeJS, slabscrapeCSS){
      var base = document.createElement('base');
      base.href = url;
      document.head.insertBefore(base, document.head.firstChild);
      
      var l = document.createElement('link');
      l.href = slabscrapeCSS;
      l.type = 'text/css';
      l.rel = 'stylesheet';
    
      document.head.appendChild(l);
      
      var tempNode = document.createElement('div');
      tempNode.className = 'slabscrape-dummy contracted slabscrape-header';
      tempNode.setAttribute('data-slabs-ignore', 'ignore');
      document.body.insertBefore(tempNode, document.body.firstChild);
      
      
      var frame = document.createElement('iframe');
      frame.src = slabscrapePath;
      frame.className = 'slabscrape-popup slabscrape-ignore contracted slabscrape-header';
      frame.setAttribute('data-slabs-ignore', 'ignore');
      frame.frameborder = '0';
      frame.scrolling = 'none';
      frame.frameBorder = 0;
		frame.scrolling = "no";
		frame.setAttribute('margin', '0');
		frame.setAttribute('allowTransparency', 'true');
      document.body.appendChild(frame);
      
      var slabscrape = document.createElement('script');
      slabscrape.src = slabscrapeJS;
      document.body.appendChild(slabscrape);
      
   }, url, slabscrapePath, slabscrapeJS, slabscrapeCSS);
   console.log(page.frameContent);
   page.close();
   phantom.exit();
});