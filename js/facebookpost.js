function facebookPost() {
    var tmpData = readCookie("tmp.cookie");
    var tmpRoot = JSON.parse(tmpData);
    eraseCookie("tmp.cookie");


    var node = tmpRoot.weather.forecast;
    var unit = tmpRoot.weather.units.temperature;

    var city = tmpRoot.weather.location.city + ', ' + tmpRoot.weather.location.region + ', ' + tmpRoot.weather.location.country;
    var feedlink = tmpRoot.weather.feed;
    var condition = '';
    var temperature = '';
    var pic;


    var postType = document.getElementById('fb_post').facebook[0];
    if(postType.checked) {
        condition = 'The current condition for ' + tmpRoot.weather.location.city + ' is ' + tmpRoot.weather.condition.text + '.';
        temperature = 'Temperature is ' + tmpRoot.weather.condition.temp + '&deg;' + unit + '.';
        pic = tmpRoot.weather.img;
    } else {
        condition = 'Weather forecast for' + tmpRoot.weather.location.city;
        temperature = '';
        for(i = 0; i < node.length; i++){
            temperature += node[i] .day + ': ' + node[i] .text + ', ' + node[i] .high + '/' + node[i] .low + '\u00B0' + unit + ';';
        }
        pic = 'http://www-scf.usc.edu/~csci571/2013Fall/hw8/weather.jpg';
    }

    var p = {
        "Look at details": {
            "text": "here",
            "href": tmpRoot.weather.link
        }
    };  
    FB.ui({
        method: 'feed',
        name: city,
        caption: condition,
        description: temperature,
        link: feedlink,
        picture: pic,
        properties: p
    }, function(response){});
} 
