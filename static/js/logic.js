//Mapping HW Diana Kennen

//Link to major earthquakes 4.5+ from the last 30 days
var usgs_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"

//GET request to the url
d3.json(usgs_url).then(function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {
    function onEachFeature (feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time)+ "</p>");
    }

    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
});

createMap(earthquakes);
}

function createMap(earthquakes) {
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
      });
    
    var baseMaps = {
        "Light Map": light
    };
    
    var overlayMaps = {
        Earthquakes: earthquakes
    };

    var myMap = L.map("map", {
        center: [
          39.8283, -98.5795
        ],
        zoom: 2,
        layers: [light, earthquakes]
      });
    
      L.control.layers(baseMaps, overlayMaps, {collapsed: true}).addTo(myMap);
};