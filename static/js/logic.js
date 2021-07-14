//Mapping HW Diana Kennen
//Leaflet Challenge Level 1

//Link to major earthquakes 4.5+ from the last 30 days
var usgs_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"

//GET request to the url
d3.json(usgs_url).then(function(data) {
    createFeatures(data.features);
});

//Function to create map and circle markers
function createFeatures(earthquakeData) {
    function onEachFeature (feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time)+ "</p>"
        + "<hr><p>" + "Magnitude:" + feature.properties.mag + " and " + "Depth: " + feature.geometry.coordinates[2] + "</p>" )
    };

    var earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function(feature) {
            var latlng = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]
            return new L.CircleMarker(latlng, {
              restyle});
        },
        style: restyle,
        onEachFeature: onEachFeature});
    
    createMap(earthquakes);
    
    //Styling the size and color of the circle markers
    function restyle(feature) {
        var size1 = feature.properties.mag**2;
        if (feature.geometry.coordinates[2] < 15)
            {return {color: "Beige", radius: [size1]};
        }else if (feature.geometry.coordinates[2] < 40)
            {return {color: "Bisque", radius: [size1]};
        }else if (feature.geometry.coordinates[2] < 60)
            {return {color: "BurlyWood", radius: [size1]};
        }else if (feature.geometry.coordinates[2] < 80)
            {return {color: "Peru", radius: [size1]};
        }else {
            return {color: "SaddleBrown", radius: [size1]};
            };
        };

    };

//Creating the map
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
          0, 0
        ],
        zoom: 2,
        layers: [light, earthquakes]
      });
    
    L.control.layers(baseMaps, overlayMaps, {collapsed: true}).addTo(myMap);

    //Creating the color based legend
    var legend = L.control({position: 'bottomright'})
    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "info legend");
        var colors = ["Beige", "Bisque", "BurlyWood", "Peru", "SaddleBrown"]
        var labels = []
        var values = ["-10 to 14", "15 to 39", "40 to 59", "60 to 79", "80+"];
    
        // Add legend title
        var legendInfo = "<h2>Earthquake Focus Depth</h2>"
        div.innerHTML = legendInfo;
    
        for (var i=0; i < 5; i++) {         
            labels.push(`<p> 
            <p style="background-color:${colors[i]}; height: 10px; width: 10px; display: inline; padding: 5px 10px"></p>
            &nbsp; <span>${values[i]}</span> 
            </p> 
            `)
        };

        div.innerHTML += "<div>" + labels.join("") + "</div>";
        return div;
      };
    
    // Adding legend to the map
    legend.addTo(myMap);
    
};