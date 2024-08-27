document.addEventListener("DOMContentLoaded", function() {
    const locationButton = document.getElementById("locationButton");
    const statusText = document.getElementById("status");

    // Target location
    const targetLatitude = 28.184099;
    const targetLongitude = 84.0491707;
    const locationAccuracy = 0.001; // Adjust this for required accuracy (in degrees)

    // Function to calculate the distance between two points using the Haversine formula
    function areCoordinatesClose(lat1, lon1, lat2, lon2, accuracy) {
        const distance = Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
        return distance < accuracy;
    }

    // Get the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const userLatitude = position.coords.latitude;
                const userLongitude = position.coords.longitude;

                if (areCoordinatesClose(userLatitude, userLongitude, targetLatitude, targetLongitude, locationAccuracy)) {
                    locationButton.disabled = false;
                    statusText.textContent = "You are in the correct location!";
                } else {
                    statusText.textContent = "You are not in the correct location.";
                }
            },
            function(error) {
                statusText.textContent = "Unable to retrieve your location.";
            }
        );
    } else {
        statusText.textContent = "Geolocation is not supported by your browser.";
    }
});
