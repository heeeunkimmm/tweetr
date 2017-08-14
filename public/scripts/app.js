/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from tweets.json
$(function () {

  function renderTweets(tweets) {
    $(".tweets").empty();                     //emptying "tweets" class
    tweets.forEach(function (tweet) {         //going through each tweets submitted
      var aTweet = createTweetElement(tweet); //creating aTweet via createTweetElement function
      $(".tweets").prepend(aTweet);           //posting aTweet (new Tweet) under "tweets" html class
    });
  }

  //preventing xss with an escape function
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }



  //creating new tweet according to html format below
  function createTweetElement(tweet) {
      return `
          <article class="tweet module">
            <header class="module-header">
              <img class="tweet-avatar" src=${tweet.user.avatars.small}>
              <span class="tweet-name module-title">${tweet.user.name}</span>
              <span class="tweet-handle">${tweet.user.handle}</span>
            </header>
            <main class="module-body">
              <div class="tweet-text">${escape(tweet.content.text)}</div>
            </main>
            <footer class="module-footer tweet-meta">
              <span class="tweet-timestamp">1 hour ago</span>
              <span class="tweet-actions">
                <a href="#" class="tweet-action">Like</a>
                <a href="#" class="tweet-action">Report</a>
                <a href="#" class="tweet-action">Retweet</a>
              </span>
            </footer>
          </article>
      `;
  };

  // fetching tweets from /tweets page
  function loadTweets() {
    $.getJSON('/tweets', renderTweets)          //handling JSON response from '/tweets' and rendering it to the page
  }

  $("form").submit(function (event) {
      event.preventDefault();                   //stopping defalut submit button that refreshes the page

      let input = $(this).find('textarea').val().length;     //finding 'this' form's textarea's length

      if (input === 0) {
        alert("uh oh, you didn't tweet anything! Please try again");
        return
      };

      if (input > 140) {
        alert("uh oh, your tweet is too long!");
        return
      }

      const form = this;    const counter = $(this).closest('form').find('.counter');


      $.ajax({                                  //using ajax to post new tweet from the data it gets from /tweets
        url: '/tweets',
        method: 'post',
        data: $(form).serialize()               //turning data into query string that gets included to POST request body
      }).done(function () {
        form.reset();                           //after its done, the form resets.
        $(".counter").text(140);                //after submit, counter goes back to 140
        loadTweets();                           //after submit button is pressed, it loads the tweets to the page.
      });

    });

    loadTweets();   //after submit button is pressed, it loads the tweets to the page.

  $(".compose").click(function() {
    $(".new-tweet").slideToggle("slow", function() {
      $("textarea").focus();
    });
  });
});






