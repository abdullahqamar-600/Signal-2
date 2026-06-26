/* Real Omaha map for v5-travel.html (progress version).
   Leaflet + CARTO Voyager tiles. Numbered pins with permanent labels.
   01 — Eppley Airfield (OMA), accented in Signal Orange
   02 — Courtyard by Marriott Omaha La Vista, navy
   03 — Signal Elevation Room, navy
   Connected by a dotted polyline in order.
*/

(function () {
  if (typeof window === 'undefined' || typeof window.L === 'undefined') return;
  var el = document.getElementById('v5-omaha-map');
  if (!el) return;

  var POINTS = [
    { step: '01', name: 'Eppley Airfield',                       tag: 'OMA · Airport',     coords: [41.3032, -95.8941], accent: true,  labelDir: 'left'  },
    { step: '02', name: 'Courtyard by Marriott Omaha La Vista',  tag: 'Recommended hotel', coords: [41.1839, -96.0888], accent: false, labelDir: 'right' },
    { step: '03', name: 'Signal Elevation Room',                 tag: 'Destination',       coords: [41.1916, -96.1442], accent: false, labelDir: 'left'  },
  ];

  var bounds = L.latLngBounds(POINTS.map(function (p) { return p.coords; }));

  var map = L.map(el, {
    zoomControl: false,
    scrollWheelZoom: false,
    attributionControl: true,
    zoomSnap: 0.25,
  });

  /* CARTO Voyager — designed editorial tile, more visible roads + labels
     than Positron but still light + brand-friendly. */
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19,
    crossOrigin: 'anonymous',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }).addTo(map);

  L.control.zoom({ position: 'bottomleft' }).addTo(map);

  function makePin(step, accent) {
    return L.divIcon({
      className: 'v5__leaflet-pin',
      html:
        '<div class="v5__leaflet-pin-inner' +
        (accent ? ' v5__leaflet-pin-inner--accent' : '') +
        '">' +
        step +
        '</div>',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  }

  POINTS.forEach(function (p) {
    var marker = L.marker(p.coords, { icon: makePin(p.step, p.accent), title: p.name }).addTo(map);
    marker.bindTooltip(
      '<span class="v5__leaflet-label-name">' + p.name + '</span>' +
      '<span class="v5__leaflet-label-sub">' + p.tag + '</span>',
      {
        permanent: true,
        direction: p.labelDir,
        offset: p.labelDir === 'right' ? [22, 0] : [-22, 0],
        className: 'v5__leaflet-label' + (p.accent ? ' v5__leaflet-label--accent' : ''),
        opacity: 1,
      }
    );
  });

  /* Dotted polyline traversing 01 → 02 → 03 in order. Uses v5 ink color. */
  L.polyline(
    POINTS.map(function (p) { return p.coords; }),
    {
      color: '#0a1a4c',
      weight: 2.2,
      opacity: 0.75,
      dashArray: '2 8',
      lineCap: 'round',
      lineJoin: 'round',
    }
  ).addTo(map);

  map.fitBounds(bounds, { padding: [80, 100] });
  map.setMinZoom(map.getZoom() - 1);

  function refit() {
    map.invalidateSize(false);
    map.fitBounds(bounds, { padding: [80, 100] });
  }
  requestAnimationFrame(refit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refit);
  window.addEventListener('load', refit);
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(refit).observe(el);
  }
})();
