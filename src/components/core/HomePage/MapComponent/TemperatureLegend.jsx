import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const TemperatureLegend = () => {
  const map = useMap();

  useEffect(() => {
    const colorBar = [
      '#4b0082',
      '#580594',
      '#660ba7',
      '#7417bf',
      '#8325d7',
      '#6e45e9',
      '#406ff5',
      '#1996ff',
      '#0bacff',
      '#02bff3',
      '#17c59c',
      '#2bcb4b',
      '#81d026',
      '#e1d509',
      '#ffbf00',
      '#ff9c00',
      '#ff7d00',
      '#ff5d00',
      '#f13c00',
      '#bc1d00',
      '#8b0000',
    ];

    const range = [-20, 1, 41]; // Min, Mid, Max Temperature
    const units = '°C';

    // Remove any existing legend
    map.eachLayer((layer) => {
      if (
        layer._control &&
        layer._control.getContainer?.().classList.contains('leaflet-legend')
      ) {
        map.removeControl(layer._control);
      }
    });

    if (colorBar && range) {
      const numColors = colorBar.length;
      const minTemp = range[0];
      const maxTemp = range[2];
      const step = (maxTemp - minTemp) / (numColors - 1);
      const values = Array.from({ length: 5 }, (_, i) =>
        Math.round(minTemp + i * step)
      );

      // Generate gradient background
      const gradient = `linear-gradient(to right, ${colorBar.join(', ')})`;

      // Create legend control
      const legend = L.control({ position: 'bottomright' });

      legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'leaflet-legend');
        div.innerHTML = `
    <div class="legend-container">
      <div class="legend-labels">
        ${values
          .map(
            (value, i) => `
            <span style="position: absolute; top: ${(i / (values.length - 1)) * 100}%; transform: translateY(-50%);">
              ${value}${units}
            </span>
          `
          )
          .join('')}
      </div>
      <div class="legend-bar"></div>
    </div>
  `;
        return div;
      };

      legend.addTo(map);

      return () => {
        map.removeControl(legend);
      };
    }
  }, [map]);

  return null;
};

export default TemperatureLegend;
