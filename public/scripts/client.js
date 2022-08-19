/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  $('#submit-tweet').submit(function(event) {
    const tweetValue = $('#tweet-text').val()
    event.preventDefault();
    if (tweetValue === null || tweetValue === "") {
      return alert("You can't submit an empty tweet!")
    } else if (tweetValue.length > 140) {
      return alert("Too many characters!")
    } else {
    $.ajax('/tweets', {method: 'POST', data: $('#tweet-text').serialize()}).then(function() {loadTweets()})
  }
});

  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'}).then((result) => renderTweets(result))
  }
  loadTweets();

 const renderTweets = function(tweets) {
  let section = $(".all-tweets");
  section.html(" ")
  for (const tweet of tweets) {
    section.prepend(createTweetElement(tweet))
  };
 };

 const createTweetElement = function(tweet) {
  const timeAgo = timeago.format(new Date());
  let $tweet = `<section class = "tweet-box">
  <header>
  <div class="user-info">
    <img src="${tweet.user.avatars}" class="avatar">
    <div class="user">${tweet.user.name}</div>
    <div class="user-handle">${tweet.user.handle}</div>
    </div>
  </header>
  <div class="tweet-content">I fucked up the brownies.</div>
  <footer class="tweet-footer">
    <div class="tweet-age">${timeAgo}</div>
    <div class="icons">
    <i class="fa-solid fa-skull-crossbones"></i>
    <i class="fa-solid fa-crow"></i>
    <i class="fa-solid fa-cloud-moon"></i>
    </div>
  </footer>
</section>`
return $tweet;
 }
});