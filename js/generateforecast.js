function generateForecast(jsonRoot) {
    var html = '';

    var node = jsonRoot.weather.forecast;
    var unit = jsonRoot.weather.units.temperature;


    YUI({
        filter: 'raw'
    }).use(
        'datatable', 'datatable-scroll',
        //'datatable-sort', 'datatable-mutable', 'datatable-message',
        //'datasource-io', 'datatable-datasource', 'datasource-jsonschema', 
        function (Y) {
            var data = [
    {Day: node[0].day, Weather: node[0].text, High: node[0].high + "\u00B0" + unit, Low: node[0].low + "\u00B0" + unit},
    {Day: node[1].day, Weather: node[1].text, High: node[1].high + "\u00B0" + unit, Low: node[1].low + "\u00B0" + unit},
    {Day: node[2].day, Weather: node[2].text, High: node[2].high + "\u00B0" + unit, Low: node[2].low + "\u00B0" + unit},
    {Day: node[3].day, Weather: node[3].text, High: node[3].high + "\u00B0" + unit, Low: node[3].low + "\u00B0" + unit},
    {Day: node[4].day, Weather: node[4].text, High: node[4].high + "\u00B0" + unit, Low: node[4].low + "\u00B0" + unit}
        ];

    var table = new Y.DataTable({
        data: data,
        caption: "Forecast",
        columns: ['Day', 'Weather', 'High','Low'],
    });
    table.render('#forecastContent');
        });

    //document.getElementById("forecastContent").innerHTML = html;
}
