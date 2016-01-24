//------Add Pictures to world map, reference: https://github.com/turban/Leaflet.Photo------


//create Photo Layer with picture popup
var photoLayer = L.photo.cluster({
	spiderfyDistanceMultiplier : 1.2
}).on('click', function(evt) {
	evt.layer.bindPopup(L.Util.template('<img src="{url}"/></a><p>{caption}</p>', evt.layer.photo), {
		className : 'leaflet-popup-photo',
		minWidth : 400
	}).openPopup();
});


//load data from json, add photos to map
reqwest({
	url : 'data/filter.json',
	type : 'json',
	success : function(data) {
		var photos = [];
		for (var i in data.items) {
			photos.push({
				lat : (data.items[i].geo_bounds.min_lat + data.items[i].geo_bounds.max_lat) / 2,
				lng : (data.items[i].geo_bounds.min_lon + data.items[i].geo_bounds.max_lon) / 2,
				url : data.items[i].image_urls[0],
				caption : '<b>Title:</b> ' + data.items[i].title + '<b><br> Provider:</b> ' + data.items[i].provider + '<b><br> Homepage:</b> ' + '<a href="' + data.items[i].homepage + '">' + data.items[i].homepage + '</a>',
				thumbnail : data.items[i].image_urls[0]
			})
		}
		photoLayer.add(photos).addTo(map);
		map.fitBounds(photoLayer.getBounds());
	}
}); 