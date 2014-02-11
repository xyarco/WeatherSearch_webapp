function generateFeed(jsonRoot) {
    var html = '';
    html += jsonRoot.weather.location.city;
    html += '+' + jsonRoot.weather.location.region;
    html += '+' + jsonRoot.weather.feed;

    document.getElementById("feedContent").innerHTML = html;
}
