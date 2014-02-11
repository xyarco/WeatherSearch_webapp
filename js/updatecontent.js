function updateContent(text) {
    var xhr = new XMLHttpRequest();
    var feedContent = document.getElementById('feedContent').innerHTML;
    var token = feedContent.split('+');
    var place = token[0];
    place = place.replace(' ', '_');
    var state = token[1];
    var feed = token[2];

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var data = xhr.responseText;

          if (data == false) {
            clearCotent();
            generateError();
            return false;
          }
          clearCotent();

          document.getElementById('errorContent').innerHTML = '';
          document.getElementById('headContent').innerHTML = '';
          document.getElementById('todayContent').innerHTML = '';
          document.getElementById('forecastContent').innerHTML = '';
          document.getElementById('postContent').innerHTML = '';
          document.getElementById('newsContent').innerHTML = '';
          document.getElementById('feedContent').innerHTML = '';

          var jsonRoot = JSON.parse(data);
          generateHead(jsonRoot);
          generateToday(jsonRoot);
          generateForecast(jsonRoot);
          generatePost();
          generateNews(jsonRoot);
          generateFeed(jsonRoot);
        }
      }
    }
    
    var url = 'http://cs-server.usc.edu:33262/examples/servlet/WeatherSearch?type=name';
    url += '&name_city=' + place + '&state=' + state + '&unit=';
    if (feed[feed.length - 1] == 'f') {
      url += 'c';
    } else {
      url += 'f';
    }

    // comment it
    // xhr.open('GET', 'http://localhost/js/weather_c.json', true);
    // comment it

    xhr.open('GET', url, true);

    xhr.send(null);
    return true;
}
