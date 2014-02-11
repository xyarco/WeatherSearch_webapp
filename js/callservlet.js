function callServlet(form) {
    var city = form.city.value;
    city = city.trim();

    if (city == city.match(/\d*/i)) {
        if (city.length != 5) {
            alert("invalid zipcode: must be five digits\n" +
                  "example: 90089");
            return false;
        }
    } else {
        token = city.split(",");
        if (token.length != 2 && token.length != 3) {
            alert("Invalid location: must include state or country seperated" +
                "by comma\nExample: Los Angeles, CA");
            return false;
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var data = xhr.responseText;

                if (data == false) {
                    clearCotent();
                    generateError();
                    return false;
                }

                createCookie('tmp.cookie', data, 1);
 
                var jsonRoot = JSON.parse(data);
                generateHead(jsonRoot);
                generateToday(jsonRoot);
                generateForecast(jsonRoot);
                generatePost();
                generateNews(jsonRoot);
                generateFeed(jsonRoot);

                //updateBackground(jsonRoot);
            }
        }
    }

    var url = 'http://cs-server.usc.edu:33262/examples/servlet/WeatherSearch?';

    if (city == city.match(/\d*/i)) {
        url += 'type=zipcode' + '&no_city=' + city + '&unit=f';
    } else {
        token = city.split(",");
        var name = token[0];
        var state = token[1];
        name = name.trim();
        name = name.split(/\s+/).join('_');
        state = state.trim();
        state = state.split(/\s+/).join('_');
        url += 'type=name' + '&name_city=' + name + '&state=' + state + '&unit=f';
    }

    // comment it
    // xhr.open('GET', 'http://localhost/js/weather.json', true);
    // comment it

    xhr.open('GET', url, true);
    xhr.send(null);

    return true;
}
