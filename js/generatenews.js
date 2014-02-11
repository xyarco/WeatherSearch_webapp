function generateNews(jsonRoot) {
    var html = '';

    html += '<div><a href="' + jsonRoot.weather.link + '"><img src="http://http://cs-server.usc.edu:33262/www/images/news-wea.gif"></a></div>';

    document.getElementById('newsContent').innerHTML = html;
}
