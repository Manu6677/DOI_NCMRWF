import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-velocity';

const VelocityLayer = ({ formattedDate, customDate }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const center = map.getCenter();
    const lat = center.lat;
    const lng = center.lng;

    const url = `https://api.ncmrwf.gov.in/windVectors?date=${formattedDate}-00-00&odate=${customDate}&pressure=850&lat=${lat}&lon=${lng}&hour=12`;
    // const url =
    //   'https://api.ncmrwf.gov.in/windVectors?date=2025-04-10-hr-00-00-00&odate=2025-04-10&pressure=850&lat=22&lon=78&hour=12';

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch wind data');
        }
        return response.json();
      })
      .then((windData) => {
        // console.log('Wind data loaded', windData);

        const velocityLayer = L.velocityLayer({
          displayValues: true,
          displayOptions: {
            velocityType: 'Wind',
            position: 'bottomleft',
            emptyString: 'No wind data',
            showCardinal: true,
          },
          data: windData,
          minVelocity: 10,
          maxVelocity: 90,
          velocityScale: 0.02,
          colorScale: [
            '#00FF00',
            '#33ff00',
            '#66ff00',
            '#99ff00',
            '#ccff00',
            '#FFFF00',
            '#FFCC00',
            '#ff9900',
            '#ff6600',
            '#FF3300',
            '#ff0000',
          ],
          zIndex: 100,
        });

        velocityLayer.addTo(map);

        return () => {
          map.removeLayer(velocityLayer);
        };
      })
      .catch((error) => {
        console.error('Error loading wind data:', error);
      });
  }, [map]);

  return null;
};

export default VelocityLayer;
