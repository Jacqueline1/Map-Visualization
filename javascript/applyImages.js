//load all coins from unique locations
function showAllCoins(maxlat, minlat, maxlon, minlon) {

	$.getJSON("data/allCoins.json", function(data) {
		for (var i in data.items) {
			if (data.items[i].geo_bounds.max_lat == maxlat & data.items[i].geo_bounds.min_lat == minlat & data.items[i].geo_bounds.max_lon == maxlon & data.items[i].geo_bounds.min_lon == minlon) {
				var win = window.open("", "Title", "toolbar=yes, location=yes, directories=yes, status=yes, menubar=no, scrollbars=yes, resizable=yes, width=780, height=400");
				win.document.write(
					
					'<html>'+
					'<head><title>Coins</title><style type="text/css"> html, body, #map { font-family: "Arial";font-size: "10px"; }</style>'+
					'<img src="' + data.items[i].image_urls[0] + '"width="150" height="130">' + 
					'<img src="' + data.items[i].image_urls[1] + '"width="150" height="130"><br>' + 
					'<br><table><tr><td>Title:</td><td> '+data.items[i].title + '</td></tr>'+
					'<tr><td>Provider:</td><td>'+data.items[i].provider+'</td></tr>'+
					'<tr><td>Homepage:</td><td> <a href="' + data.items[i].homepage + '">' + data.items[i].homepage + '"</a>"<td></tr></table><br><br>' 
				);	'</html'
			}
		}

	});
}

//open URL in new popup window
function openWindow(url) {
	fenster = window.open(url, "fenster1", "width=600,height=600,status=yes,scrollbars=yes,resizable=yes");
	fenster.focus();
}


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
	url : 'data/filteredCoins.json',
	type : 'json',
	success : function(data) {
		var photos = [];
		for (var i in data.items) {
			photos.push({
				lat : (data.items[i].geo_bounds.min_lat + data.items[i].geo_bounds.max_lat) / 2,
				lng : (data.items[i].geo_bounds.min_lon + data.items[i].geo_bounds.max_lon) / 2,
				url : data.items[i].image_urls[0],
				caption : '<b>Title:</b> ' + data.items[i].title + '<b><br> Provider:</b> ' + data.items[i].provider + '<b><br> Homepage:</b> ' + '<a href="' + data.items[i].homepage + '"onclick="openWindow(this.href); return false">' + data.items[i].homepage + '</a>' + '<b><br><br><button onclick="showAllCoins(' + data.items[i].geo_bounds.max_lat + ',' + data.items[i].geo_bounds.min_lat + ',' + data.items[i].geo_bounds.max_lon + ',' + data.items[i].geo_bounds.min_lon + '); return false">' + "Alle Münzen dieses Standortes anzeigen" + '</button>',
				thumbnail : data.items[i].image_urls[0]
			})
		}
		photoLayer.add(photos).addTo(map);
		map.fitBounds(photoLayer.getBounds());
	}
}); 