import {
  MapContainer,
  TileLayer,
  WMSTileLayer,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import VelocityLayer from './VelocityLayer';
import TemperatureLegend from './TemperatureLegend';
const MapClickHandler = () => {
  useMapEvents({
    click: (e) => {
      window.open('https://nwp.ncmrwf.gov.in/dashboard/', '_blank');
    },
  });

  return null;
};

const getCurrentFormattedDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = Math.floor(now.getHours() / 3) * 3;
  const formattedHour = String(hours).padStart(2, '0');
  // const hours = String(now.getHours()).padStart(2, '0');
  // const minutes = String(now.getMinutes()).padStart(2, '0');
  // const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}-hr-${formattedHour}`;
};

const getCurrentDateOnly = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const MapComponent = () => {
  const formattedDate = getCurrentFormattedDate();
  const customDate = getCurrentDateOnly();

  return (
    <MapContainer
      center={[22.0, 78.0]}
      zoom={4}
      style={{ height: '35rem', borderRadius: '1rem' }}
      attributionControl={false}
      zoomControl={false}
      doubleClickZoom={false}
      maxZoom={4}
      minZoom={4}
    >
      {/* Handle Clicks */}
      <MapClickHandler />

      <VelocityLayer formattedDate={formattedDate} customDate={customDate} />

      {/* Base Tile Layer */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        layers="OSM-WMS"
        format="image/png"
      />

      {/* WMS Layer */}
      {/* {console.log('formattedDate ', formattedDate)} */}
      <WMSTileLayer
        url="https://api.ncmrwf.gov.in/rainfall"
        format="image/png"
        transparent={true}
        zIndex={10}
        opacity={0.5}
        params={{
          layers: 'temperature',
          date: `${formattedDate}-00-00`,
          hour: 0,
          pressure: 925,
        }}
      />

      <TemperatureLegend />
    </MapContainer>
  );
};

export default MapComponent;
