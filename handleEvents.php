<?php
function getXmlDataByUrl($url) {
    $responseXmlData = file_get_contents($url);
    if ($responseXmlData === FALSE) {
        return FALSE;
    }

    $xmlData = simplexml_load_string($responseXmlData);
    if ($xmlData === FALSE) {
        return FALSE;
    }

    return $xmlData;
}

function getWoeidByNO($no_city) {
    $urlPrefix = "http://where.yahooapis.com/v1/";
    $urlAppID = ".3ulDM7V34G484oLjMN1KMN67JOstf47t3GK9_n9zCovJLlzkl7X5MSvFwFnRqHFKQ--";
    $url = $urlPrefix;

    $url .= "concordance/usps/{$no_city}?appid=";

    $url .= $urlAppID;

    $xmlData = getXmlDataByUrl($url);

    if ($xmlData === FALSE) {
        return FALSE;
    }


    $woeid = $xmlData->woeid;

    return $woeid;
}

function getWoeidByName($name_city, $state) {
    $state = str_replace('+', ' ', $state);

    $urlPrefix = "http://where.yahooapis.com/v1/";
    $urlAppID = ".3ulDM7V34G484oLjMN1KMN67JOstf47t3GK9_n9zCovJLlzkl7X5MSvFwFnRqHFKQ--";
    $url = $urlPrefix;

    $url .= "places\$and(.q('{$name_city}'),.type(7));start=0;count=10?appid=";

    $url .= $urlAppID;

    $xmlData = getXmlDataByUrl($url);

    if ($xmlData === FALSE) {
        return FALSE;
    }

    $woeid = FALSE;

    foreach ($xmlData->place as $entry) {
        $code = $entry->admin1->attributes()->code;
        if (stristr($code, $state) != NULL) {
            $woeid = $entry->woeid;
            break;
        }

        $code = (string)$entry->country;
        if (stristr($code, $state) != NULL) {
            $woeid = $entry->woeid;
            break;
        }

    }

    return $woeid;
}

function handleEvent() {
    $type = $_GET['type'];
    $woeid = FALSE;

    if ($type == 'zipcode') {
        $no_city = $_GET['no_city'];
        $woeid = getWoeidByNO($no_city);
    } else {
        $name_city = $_GET['name_city'];
        $name_city = str_replace('_', '+', $name_city);
        $state = $_GET['state'];
        $state = str_replace('_', '+', $state);
        $woeid = getWoeidByName($name_city, $state);
    }

    if ($woeid == FALSE) {
        print_r('');
        return;
    }

    $unit = $_GET['unit'];


    $url = "http://weather.yahooapis.com/forecastrss?w=" . $woeid . "&u=" . $unit;

    $xmlData = getXmlDataByUrl($url);

    if ($xmlData == FALSE) {
        print_r('');
        return;
    }

    print_r($url);
}

handleEvent();

?>
