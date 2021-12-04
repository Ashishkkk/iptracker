mapboxgl.accessToken = 'pk.eyJ1IjoiYXNoaXNoYXNoaXNoIiwiYSI6ImNrd3E2M3F6azAzcTEydW85MnphZWpqMzIifQ.BeR_-b-Z9olXBKR3Z0OVvA';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [73.00836, 19.1034],
    zoom: 3
});


let ipbutton = document.getElementById('ipbutton')
ipbutton.addEventListener('click', (e) => {
    e.preventDefault()
    let ipValue = document.getElementById('ipValue').value;
    let ipAdd = document.getElementById('ipAdd');
    let location = document.getElementById('location');
    let timezone = document.getElementById('timezone');
    let isp = document.getElementById('isp');


    let url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_2nNRNdZWDDZZu5RCisEcNkI7vcZdO&ipAddress=${ipValue}`;

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            let latitude = data.location.lat
            let longitude = data.location.lng
            let IP = data.ip
            let ISP = data.isp
            let locationCity = data.location.city
            let locationCountry = data.location.country
            let locationGeonameId = data.location.geonameId
            let locationGeonameTimeZone = data.location.timezone

            ipAdd.innerText = IP
            location.innerText = `${locationCity}, ${locationCountry} ${locationGeonameId}`
            timezone.innerText = `UTC ${locationGeonameTimeZone}`
            isp.innerText = `${ISP}`

            const geojson = {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [`${longitude}`, `${latitude}`]
                        }
                    }]
            };

            // Add markers to the map.
            for (const marker of geojson.features) {
                // Create a DOM element for each marker.
                const el = document.createElement('div');
                el.className = 'marker';
                el.style.backgroundImage = `url(../images/icon-location.png)`;
                el.style.width = `50px`;
                el.style.height = `60px`;
                el.style.backgroundSize = '100%';

                // Add markers to the map.
                new mapboxgl.Marker(el)
                    .setLngLat(marker.geometry.coordinates)
                    .addTo(map);
            }

        })
})








