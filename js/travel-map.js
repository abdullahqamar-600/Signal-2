/* Real Omaha map for travel.html.
   Leaflet + CARTO Positron tiles (no API key). Three pins:
   A — Eppley Airfield (OMA)
   B — Embassy Suites La Vista
   C — Signal Home Office
   Connected by a dotted polyline; fitted to bounds with padding.
*/

(function () {
  if (typeof window === 'undefined' || typeof window.L === 'undefined') return;
  var el = document.getElementById('v1-omaha-map');
  if (!el) return;

  var POINTS = {
    eppley:   { code: 'A', name: 'Eppley Airfield · OMA',      coords: [41.3032, -95.8941] },
    embassy:  { code: 'B', name: 'Embassy Suites La Vista',     coords: [41.1816, -96.0902] },
    office:   { code: 'C', name: 'Signal Home Office',          coords: [41.1916, -96.1442] },
  };

  var bounds = L.latLngBounds([POINTS.eppley.coords, POINTS.embassy.coords, POINTS.office.coords]);

  var map = L.map(el, {
    zoomControl: false,
    scrollWheelZoom: false,
    attributionControl: true,
    zoomSnap: 0.25,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    crossOrigin: 'anonymous',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }).addTo(map);

  L.control.zoom({ position: 'bottomleft' }).addTo(map);

  function makePin(code, accent) {
    return L.divIcon({
      className: 'v1-leaflet-pin',
      html: '<div class="v1-leaflet-pin__inner' + (accent ? ' v1-leaflet-pin__inner--accent' : '') + '">' + code + '</div>',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });
  }

  Object.keys(POINTS).forEach(function (key) {
    var p = POINTS[key];
    var accent = key === 'eppley';
    L.marker(p.coords, { icon: makePin(p.code, accent), title: p.name })
      .addTo(map)
      .bindTooltip(p.name, {
        className: 'v1-leaflet-tooltip',
        direction: 'top',
        offset: [0, -16],
        opacity: 1,
      });
  });

  // Dotted connecting polyline along the route order A → B → C
  L.polyline(
    [POINTS.eppley.coords, POINTS.embassy.coords, POINTS.office.coords],
    {
      color: '#001F66',
      weight: 2,
      opacity: 0.7,
      dashArray: '2 8',
      lineCap: 'round',
      lineJoin: 'round',
    }
  ).addTo(map);

  map.fitBounds(bounds, { padding: [56, 56] });

  // Hold the map at a sensible min zoom so it doesn't auto-zoom out on resize
  map.setMinZoom(map.getZoom() - 1);

  // If the map initialized before the surrounding layout settled (CSS still
  // loading, fonts resolving, etc.), Leaflet reads the container as 0 height.
  // Re-measure on the next frame and after fonts load.
  function refit() {
    map.invalidateSize(false);
    map.fitBounds(bounds, { padding: [56, 56] });
  }
  requestAnimationFrame(refit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refit);
  window.addEventListener('load', refit);
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(refit).observe(el);
  }
})();
