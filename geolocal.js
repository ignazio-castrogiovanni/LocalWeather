var geocoder;
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}

function successFunction(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  codeLatLng(lat, lng);
  getWeather(lat, lng);
}

function errorFunction() {
  alert("Geocoder failed.");
}

function initialize() {
  geocoder = new google.maps.Geocoder();
}

function codeLatLng(lat, lng) {
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({
    'latLng': latlng
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      console.log(results);
      if (results[1]) {
        addParag(results[0].formatted_address, "city");

        for (var i = 0; i < results[0].address_components.length; i++) {
          for (var b = 0; b < results[0].address_components[i].types.length; b++) {
            if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
              //this is the object you are looking for
              city = results[0].address_components[i];
              break;
            }
          }
        }
        alert(city.short_name);
        addParag(city.short_name, "city");

      } else {
        alert("No results found");
      }
    } else {
      alert("Geocoder failed due to: " + status);
    }
  });

}

function getWeather(lat, lng) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var myArr = JSON.parse(xhr.responseText);
      parseJSONWeather(myArr);
    }
  }
  var URL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng;

  xhr.open("GET", URL, false);
  xhr.send();

  var responseArr = JSON.parse(xhr.responseText);
}

function parseJSONWeather(result) {
  var wheaterCond = result.weather[0].main;
  addParag(wheaterCond, "Weather");
  var weatherDescr = result.weather[0].description;
  addParag(weatherDescr, "WeatherDesc");
  var temp = result.weather[0].main.temp;
  addParag(temp, "Temperature");
  var picLink = getWeatherPicLink(wheaterCond);
//
  var bodyEl = document.getElementsByTagName("body")[0];
  bodyEl.style.backgroundImage = 'url(' + picLink + ')';
}

function getWeatherPicLink(weathCond) {
  
  switch(weathCond) {
    case "Clouds":
      return "http://media.idownloadblog.com/wp-content/uploads/2013/12/Clouds-mac.jpg";
      break;
    case "Clear":
      return "http://www.memrise.com/s3_proxy/?f=uploads/mems/3121328000130421111452.png";
      break;
    case "Rain":
      return "https://kimberlymringer.files.wordpress.com/2014/01/soak-wet-rain-umbrella.jpg";
      break;
    default:
  }
}

function addParag(text, id) {
  var newParag = document.createElement("p");
  var textNode = document.createTextNode(text);
  newParag.appendChild(textNode);
  var divElem = document.getElementById(id);
  divElem.appendChild(newParag);
}

function addPic(picLink, id) {
  var newImg = document.createElement("img");
  var imgSrc = document.createAttribute("src");
  imgSrc.value = picLink;
  newImg.setAttributeNode(imgSrc);
  var divElem = document.getElementById(id);
  divElem.appendChild(newImg);
}