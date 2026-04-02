import React from 'react';
import { MapContainer, TileLayer, WMSTileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_CONFIG } from '../../utils/constants';
import './MapView.css';


const LEGEND_CLASSES = [
  { color: '#2ECC71', label: 'Très faible' },
  { color: '#F1C40F', label: 'Faible' },
  { color: '#E67E22', label: 'Moyen' },
  { color: '#E74C3C', label: 'Élevé' },
  { color: '#8B0000', label: 'Très élevé' },
];

const MapView = () => {
  return (
    <div className="map-container">

      {/* 🔹 Légende */}
      <div className="map-legend">
        <h4>Légende</h4>
        <div className="legend-items">
          {LEGEND_CLASSES.map((item, i) => (
            <div key={i} className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: item.color }}
              ></span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Carte */}
      <MapContainer
        center={MAP_CONFIG.center}
        zoom={MAP_CONFIG.zoom}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        className="leaflet-map"

      >
        {/* Fond OpenStreetMap */}
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 🔥 RASTER VIA GEOSERVER (IMPORTANT) */}
        <WMSTileLayer
          url="http://localhost:8080/geoserver/vulcli/wms"
          layers="vulcli:vulcli_raster"   // ✅ EXACT
          format="image/png"
          transparent={true}
          version="1.1.1"
        />
      </MapContainer>
    </div>
  );
};

export default MapView;