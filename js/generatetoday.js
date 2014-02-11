function generateToday(jsonRoot) {
    var unit = jsonRoot.weather.units.temperature;

    var html = '';

    html += '<table width="10%" border="0" cellspacing="0" cellpadding="0">';
      html += '<tr>';
        html += '<td><img src="' + jsonRoot.weather.img + '"/></td>';
        html += '<td style="color:white">' + jsonRoot.weather.condition.text +  '</td>';
      html += '</tr>';
    html += '</table>';

    html += '<p class="white-word">&#8593;' + jsonRoot.weather.forecast[0].high + '&deg;' + unit + ' &#8595;' + jsonRoot.weather.forecast[0].low + '&deg;'+unit+'</p>';
    html += '<p class="white-word"><big>' + jsonRoot.weather.condition.temp + '&deg;<a href="" onclick="updateContent(); return false;" class="white-word">' + unit + '</a></big></p>';

    document.getElementById("todayContent").innerHTML = html;
}
