var tweetWrapper = '#twitter-feed .social-wrapper .padder';

function animate(element) {
  new AnimOnScroll( document.getElementById(element), {
      minDuration : 0.4,
      maxDuration : 0.7,
      viewportFactor : 0.2
    } );
}

// ***************
// Instagram work
// ***************
var instBox = {
  share: function() {
    $('#instafeed a').each(function(i,e){
      var imgUrl = $(this).attr('href');
      $(this).parent('.padder').append(facebookShare1 + imgUrl + facebookShare2);
      $(this).parent('.padder').append(twitterShare1 + imgUrl + twitterShare2);
    })
  }
}

function runInstGrid() {
  // removes any extra instagrams over 3
  $('#instafeed .social-wrapper:gt(2)').remove()
  // builds share buttons
  instBox.share();
  // animates on scroll
  animate('instafeed');
}

// INSTAFEED for Instagram feed
var feed = new Instafeed({
  get: 'user',
  userId: 285374024,
  accessToken: "285374024.467ede5.eaa3be388bcc4336adbbefb3383145fd",
  filter: function(image) {
    return image.tags.indexOf('matingritual') >= 0;
  },
  clientId: 'e9d09c9963984fc09b96630679d00282',
  template: '<li class="social-wrapper"><div class="padder"><a class="insta-link" href="{{link}}" onclick="window.open(this.href);return false;"><img src="{{image}}" /></a></div></li>',
  limit: 20,
  resolution: 'standard_resolution',
  after: runInstGrid
});

// runs call for instagram feed
feed.run();

// ***************
// Twitter work
// ***************
var twitBox = {
  empties: function() {
    var keepThese = [];
    $('.padder .tweet a').each(function(h,j) {
      if ($(j).data('scribe') === "element:hashtag") {
        if ($(j).html() === "#matingritual" || $(j).html() === "#MatingRitual") {
          // if the tweet has a hashtag of matingritual it gets a keep class
          $(j).addClass('keep')
        }

        if ($(j).hasClass('keep')) {
          // if a social-wrapper has a child with the keep class, it gets a keeper class
          $(j).closest('.social-wrapper').addClass('keeper')
        }
      }
    })

    // remove all social-wrappers without a keeper class, and therefore all tweets without a #matingritual hashtag
    $('#twitter-feed .social-wrapper').each(function(i,e){
      if ($(e).hasClass('keeper') != true) {
        $(e).remove();
      } else {
        if ($($(e).find('.padder')).children().length > 2) {
          $(e).find('.user, .tweet').remove();
        } else {
          $(e).remove();
        }
      }

    })

    $('#twitter-feed .social-wrapper:gt(2)').remove();
        // force twitter images to be same height as width only above mobile
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) === false) {
          var twitterHeight = $($('.social-wrapper')[0]).find('.padder').width();
          if (twitterHeight > 100) {
            // in order to make mobile respect the js height it needs to be applied to multiple nested elements..
            $('#twitter-feed .social-wrapper, #twitter-feed .padder, #twitter-feed .media, #twitter-feed .media a img').height(twitterHeight);
          }
        }
  },
  placeholder: function(){
    if ($(tweetWrapper).length < 3) {
      // first get rid of any empty wrappers
      $('.social-wrapper').each(function(i,e) {
        if ($(e).children().length < 1) {
          $(e).remove();
        }
      })
      // then add in a placeholder box for each missing one
      $(".media-wrapper").append("<li class='social-wrapper'><div class='padder'><div class='media'><a class='retweeter' href='https://twitter.com/home?status=http://placehold.it/300x300%20%23matingritual%20%40lemonaiduk'></a><a href='http://placehold.it/300x300'><img src='http://placehold.it/300x300'></a></div></div></li>")
      if ($(tweetWrapper).length < 3) {
        $(".media-wrapper").append("<li class='social-wrapper'><div class='padder'><div class='media'><a class='retweeter' href='https://twitter.com/home?status=http://placehold.it/300x300%20%23matingritual%20%40lemonaiduk'></a><a href='http://placehold.it/300x300'><img src='http://placehold.it/300x300'></a></div></div></li>")
         if ($(tweetWrapper).length < 3) {
          $(".media-wrapper").append("<li class='social-wrapper'><div class='padder'><div class='media'><a class='retweeter' href='https://twitter.com/home?status=http://placehold.it/300x300%20%23matingritual%20%40lemonaiduk'></a><a href='http://placehold.it/300x300'><img src='http://placehold.it/300x300'></a></div></div></li>")
        }
      }
    }
  },
  share: function() {
    $('.media').each(function(i,e){
      var imgUrl = $(this).find('img').attr('src');
      var retweetUrl = $(this).find('.retweeter').attr('href');
      $(this).parent('.padder').append(facebookShare1 + imgUrl + facebookShare2);
      $(this).parent('.padder').append("<div class='social-icons'><a class='twitter' href='" + retweetUrl + "' onclick='window.open(this.href);return false;'></a></div>");
    })
    $('.retweeter').remove();
  }
}

// Initiates all Tweet calls
function handleTweets(tweets) {
    var x = tweets.length;
    var n = 0;
    var element = document.getElementById('twitter-feed')
    var html = '<div class="media-wrapper grid effect-2 cf" id="grid4">';
    while(n < x) {
      html += '<li class="social-wrapper">' + '<div class="padder">' + tweets[n] + '</div>' + '</li>';
      n++;
    }
    html += '</div>';   
    element.innerHTML = html;
    // removes any tweets without images
    twitBox.empties();
    // fill with placeholders if there are no more images from tweets
    twitBox.placeholder();
    // create the sharing icons after tweets have been constructed
    twitBox.share();
    // calls animateonScroll for new html elements loaded using js
    animate("grid4");
}

// Calling widget for #matingritual on twitter
var matingritual = {
  "id": '629612694224683008',
  "maxTweets": 20,
  "enableLinks": true,
  "showImages": true,
  "showUser": true,
  "showTime": false,
  "showTweet": false,
  "customCallback": handleTweets,
  "showInteraction": true,
  "showRetweet": true
};

// notbeast_ = 629612694224683008
// lemonaiduk = 629631602516230145

// Constructing wrappers and links for social icons sharing
var facebookShare1 = "<div class='social-icons'><a  class='facebook' href='https://www.facebook.com/sharer/sharer.php?u="
var facebookShare2 = "' onclick='window.open(this.href);return false;''></a></div>"
var twitterShare1 ="<div class='social-icons'><a class='twitter' href='https://twitter.com/share?url="
var twitterShare2 = "&via=lemonaiduk&hashtags=matingritual' onclick='window.open(this.href);return false;'></a></div>"

// runs call for twitter widget
twitterFetcher.fetch(matingritual);

// DELETE BEFORE DEPLOYING!

// andrea's tokens
// userId: 285374024
// accessToken: "285374024.467ede5.eaa3be388bcc4336adbbefb3383145fd"

// lemonaid tokens
// userId: 2134950278,
//   accessToken: "2134950278.467ede5.af38ae4dacda43faa74652c63bdc6ec6",





$(document).ready(function(){
   

  // loading screen
  $(window).on("load",function() {
    $(document).scrollTop(0);
    $("#loading").fadeOut(500);
    // only show share on hover
    $('.social-wrapper').hover(function(){
      $(this).find('.social-icons').slideDown();
      }, function(){
      $(this).find('.social-icons').slideUp();
    });

  })

  // To bring page to top on refresh even on safari
  if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
    $(window).on('beforeunload', function(){
      $(window).scrollTop(0);
    });
  }

  // get rid of widows in text paragraphs
  $('p').each(function(){
      var string = $(this).html();
      string = string.replace(/ ([^ ]*)$/,'&nbsp;$1');
      $(this).html(string);
  });

 
})  

