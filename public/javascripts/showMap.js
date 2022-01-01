mapboxgl.accessToken = 'pk.eyJ1IjoidmFuc2hoYW5zIiwiYSI6ImNreGVmcXBsbDFyamkzMmt0NzZoaWpjd2sifQ.eZbA8Qikr0RUoglie1KnTQ';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [campground[0], campground[1]], // starting position [lng, lat]
    zoom: 8 // starting zoom
});
const nav = new mapboxgl.NavigationControl({
    visualizePitch: true
});
map.addControl(nav);
new mapboxgl.Marker()
    .setLngLat([campground[0], campground[1]])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                // `<p>${window.place.location}</p>`
            )
    )
    .addTo(map)