function generateHead(jsonRoot) {
    var unit = jsonRoot.weather.units.temperature;

    var html = '';
    html += '<div class="city"><p>' + jsonRoot.weather.location.city + '</p></div>';
    html += '<div class="region"><p>' + jsonRoot.weather.location.region + ', ' + jsonRoot.weather.location.country + '</p></div>';

    document.getElementById("headContent").innerHTML = html;
}
