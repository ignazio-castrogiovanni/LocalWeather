var geocoder;
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    
    function successFunction(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
    
        var newParag = document.createElement("p");
        var textNode = document.createTextNode("Lat: " + lat + " - Long: " + lng);
        newParag.appendChild(textNode);
        var divElem = document.getElementById("coords");
        divElem.appendChild(newParag);
    }

    function errorFunction() {
        alert("Geocoder failed.");
    }
}