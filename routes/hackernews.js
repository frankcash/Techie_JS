var request = require('request');
var cheerio = require('cheerio');

exports.htop = function(req,res){
  request('https://news.ycombinator.com', function(error, response, html){
      if(!error && response.statusCode === 200){
        var metadataArray = [ ];
        var $ = cheerio.load(html);
        $('span.comhead').each(function(i, element){
        var a=$(this).prev(); //selects previous data
        var rank=a.parent().parent().text(); //gets ranks by parsing text two elements higher
        var title=a.text(); // parses link title
        var url=a.attr('href'); // parses href attribute from "a" element
        var subtext = a.parent().parent().next().children('.subtext').children(); // gets the subtext from the children
        var points = $(subtext).eq(0).text();
        var username = $(subtext).eq(1).text();
        var YCOMB_COMMENT_URL = "https://news.ycombinator.com/"
        var comments = $(subtext).eq(2).text();
        var comments_link = YCOMB_COMMENT_URL + $(subtext).eq(2).attr('href');
        
        var metadata = { // creates a new object
          rank: parseInt(rank),
          site: "HN",
          title:title,
          url:url,
          points: parseInt(points),
          username: username,
          comments: parseInt(comments),
          comments_link:comments_link,
          icon: 'assets/hn_icon_32.png'
        };
        metadataArray.push(metadata); // pushes the object
        });
        res.send(metadataArray);
      }
  });

}

exports.hnew = function(req,res){
  request('https://news.ycombinator.com/newest', function(error, response, html){
      if(!error && response.statusCode === 200){
        var metadataArray = [ ];
        var $ = cheerio.load(html);
        $('span.comhead').each(function(i, element){
        var a=$(this).prev(); //selects previous data
        var rank=a.parent().parent().text(); //gets ranks by parsing text two elements higher
        var title=a.text(); // parses link title
        var url=a.attr('href'); // parses href attribute from "a" element
        var subtext = a.parent().parent().next().children('.subtext').children(); // gets the subtext from the children
        var points = $(subtext).eq(0).text();
        var username = $(subtext).eq(1).text();

        var YCOMB_COMMENT_URL = "https://news.ycombinator.com/"
        var comments = $(subtext).eq(2).text();
        var comments_link = YCOMB_COMMENT_URL + $(subtext).eq(2).attr('href');

        var metadata = { // creates a new object
          rank: parseInt(rank),
          site: "HN",
          title:title,
          url:url,
          points: parseInt(points),
          username: username,
          comments: parseInt(comments),
          comments_link:comments_link,
          icon: 'assets/hn_icon_32.png'
        };
        metadataArray.push(metadata); // pushes the object
        });
        res.send(metadataArray);
      }
  });

}
