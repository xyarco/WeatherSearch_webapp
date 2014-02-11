function generatePost() {
    var html = '';

    html += '<br /><br /><br /><br /><br />';
    html += '<form class="white-word" id="fb_post">'
      html += '<input type="radio" name="facebook" value="current" checked/>Post Current Weather<br />';
      html += '<input type="radio" name="facebook" value="forecast" />Post Weather Forecast<br />';
      html += '<input type="image" src="http://localhost/images/facebook.png" onclick="facebookPost(); return false;" /><br />';
    html += '</form>';

    document.getElementById('postContent').innerHTML = html;
} 

