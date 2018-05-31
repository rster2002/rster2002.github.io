function initMap() {
    var location1 = {lat: 52.644846, lng: 4.813793};
    var map = new google.maps.Map(
        document.getElementById("map"),
        {zoom: 4, center: location1}
    );
    var marker = new google.maps.Marker({
        position: location1,
        map: map
    });
}
