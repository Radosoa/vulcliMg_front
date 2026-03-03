import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MAP_CONFIG, VULNERABILITY_CLASSES } from '../../utils/constants';
import './MapView.css';

// Fix pour les icônes Leaflet avec React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

/**
 * Composant MapView - Carte interactive avec Leaflet
 * @param {Object} props - Props du composant
 * @param {Array} props.zones - Données des zones à afficher (GeoJSON)
 */
const MapView = ({ zones }) => {
  const mapRef = useRef(null);

  // Style des zones en fonction de la classe de vulnérabilité
  const getFeatureStyle = (feature) => {
    const vulnClass = feature.properties.vulnerability_class;
    let color = '#999';

    if (vulnClass === 'low') {
      color = VULNERABILITY_CLASSES.LOW.color;
    } else if (vulnClass === 'medium') {
      color = VULNERABILITY_CLASSES.MEDIUM.color;
    } else if (vulnClass === 'high') {
      color = VULNERABILITY_CLASSES.HIGH.color;
    }

    return {
      fillColor: color,
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  };

  // Interaction avec chaque zone
  const onEachFeature = (feature, layer) => {
    const props = feature.properties;
    const vulnClass = VULNERABILITY_CLASSES[props.vulnerability_class?.toUpperCase()] || {};

    layer.bindPopup(`
      <div class="map-popup">
        <h4>${props.name || 'Zone'}</h4>
        <p><strong>Indice de vulnérabilité:</strong> ${props.vulnerability_index?.toFixed(2) || 'N/A'}</p>
        <p><strong>Classe:</strong> <span style="color: ${vulnClass.color}">${vulnClass.label || 'N/A'}</span></p>
        ${props.region ? `<p><strong>Région:</strong> ${props.region}</p>` : ''}
      </div>
    `);

    // Effet de survol
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 3,
          fillOpacity: 0.9
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          fillOpacity: 0.7
        });
      }
    });
  };

  useEffect(() => {
    // Ajuster la vue de la carte lorsque les zones changent
    if (mapRef.current && zones && zones.features?.length > 0) {
      const map = mapRef.current;
      const geoJsonLayer = L.geoJSON(zones);
      map.fitBounds(geoJsonLayer.getBounds());
    }
  }, [zones]);

  return (
    <div className="map-container">
      <div className="map-legend">
        <h4>Légende</h4>
        <div className="legend-items">
          {Object.values(VULNERABILITY_CLASSES).map((vClass) => (
            <div key={vClass.value} className="legend-item">
              <span 
                className="legend-color" 
                style={{ backgroundColor: vClass.color }}
              ></span>
              <span>{vClass.label}</span>
            </div>
          ))}
        </div>
      </div>

      <MapContainer
        center={MAP_CONFIG.center}
        zoom={MAP_CONFIG.zoom}
        minZoom={MAP_CONFIG.minZoom}
        maxZoom={MAP_CONFIG.maxZoom}
        className="leaflet-map"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {zones && zones.features && (
          <GeoJSON
            data={zones}
            style={getFeatureStyle}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>

      {!zones && (
        <div className="map-loading">
          <p>Chargement de la carte...</p>
        </div>
      )}
    </div>
  );
};

export default MapView;
