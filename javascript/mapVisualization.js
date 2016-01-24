//------ world map visualization-----
//with instructions from http://leafletjs.com/examples/quick-start.html:

var map = L.map('map').setView([51.505, -0.09], 4);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution : 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom : 18,
	minZoom : 3,
	id : 'jacqueline1.ob7pf3l1',
	accessToken : 'pk.eyJ1IjoiamFjcXVlbGluZTEiLCJhIjoiY2lncXNteG53MDA0M3Zna3UwYWdydWJwMSJ9.ehJkRlEJCdNXJSEMgcxDWg'
}).addTo(map);
