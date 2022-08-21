/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  $('#submit-tweet').submit(function(event) {
    const tweetValue = $('#tweet-text').val();
    event.preventDefault();
    if (tweetValue === null || tweetValue === "") {
      $(".error-empty").slideDown("slow");
      $(".error-exceeds").hide();
    } else if (tweetValue.length > 140) {
      $(".error-exceeds").slideDown("slow");
      $(".error-empty").hide();
    } else {
      $.ajax('/tweets', {method: 'POST', data: $('#tweet-text').serialize()}).then(function() {
        loadTweets();
      });
    }
  });

  const fetchInput = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'}).then((result) => renderTweets(result));
  };
  loadTweets();

  const renderTweets = function(tweets) {
    let section = $(".all-tweets");
    section.html(" ");
    for (const tweet of tweets) {
      section.prepend(createTweetElement(tweet));
    }
  };

  const createTweetElement = function(tweet) {
    const timeAgo = timeago.format(tweet.created_at);
    let $tweet = `<article class = "tweet-box">
  <header class="tweet-header">
    <img src="${tweet.user.avatars}" class="avatar">
    <p class="user">${tweet.user.name}</p>
    <p class="user-handle">${tweet.user.handle}</p>
    </header>
    <div class="tweet-content">${fetchInput(tweet.content.text)}</div>
  <footer class="tweet-footer">
    <div class="tweet-age">
    <time datetime="2022-08-11 18:00">${timeAgo}</time>
    </div>
    <div class="icons">
    <i class="fa-solid fa-skull-crossbones"></i>
    <i class="fa-solid fa-crow"></i>
    <i class="fa-solid fa-cloud-moon"></i>
    </div>
  </footer>
</article>`;
    return $tweet;
  };
});