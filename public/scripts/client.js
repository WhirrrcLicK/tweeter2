/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  $('.submit-tweet').submit(function(event) {
    const tweetValue = $('#tweet-text').val();
    event.preventDefault();
    if (tweetValue === null || tweetValue === ' ' || tweetValue === '') {
      checkSectionErrors((".error-empty"), `<i class="fa-solid fa-book-skull"></i>Got nothing to say?<i class="fa-solid fa-book-skull"></i>`, 4000, "slow");
    } else if (tweetValue.length > 140) {
      checkSectionErrors($(".error-exceeds"), `<i class="fa-solid fa-book-skull"></i>That's a lot of words for one little tweet.<i class="fa-solid fa-book-skull"></i>`, 4000, "slow");
    } else {
      $.ajax('/tweets', {method: 'POST', data: $('#tweet-text').serialize()}).then((res) => {
        $('#tweet-text').val(' ')
        $('.counter').val(140)
        loadTweets();
        })
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
    let section = $(".all-tweets").empty();
    for (const tweet of tweets) {
      section.prepend(createTweetElement(tweet));
    }
  };

  const checkSectionErrors = (section, errMsgHtml, delay, slideSpeed) => {
    $(section).empty();
    const output = $(section).append(errMsgHtml).slideDown(slideSpeed).delay(delay).slideUp(slideSpeed);
    return output;
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