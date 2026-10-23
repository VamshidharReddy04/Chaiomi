// Locations Page
import { MapPin, Clock } from "lucide-react";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { locations } from "../data/locations";
import "../StylePages/locations.css";

const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function FitAllLocations() {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 1) {
      map.fitBounds(
        locations.map((location) => [location.lat, location.lng]),
        { padding: [40, 40] },
      );
    } else if (locations.length === 1) {
      map.setView([locations[0].lat, locations[0].lng], 14);
    }
  }, [map]);

  return null;
}

function Locations() {
  return (
    <>
      <Navbar />
      <main className="locations-page">
        <div className="locations-container">
          {/* Page header */}
          <div className="locations-header">
            <p className="locations-eyebrow">Welcome to our locations</p>
            <h1 className="locations-title">Find a Chaiomi near you</h1>
            <p className="locations-intro">
              Find our headquarters and connect with Chaiomi
            </p>
          </div>

          {/* All configured locations are shown together; clicking a pin opens Google Maps. */}
          <div className="locations-map">
            <MapContainer
              center={[17.4430573, 78.3721051]}
              zoom={14}
              scrollWheelZoom={false}
              className="locations-map-canvas"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
              <FitAllLocations />
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={[location.lat, location.lng]}
                  icon={markerIcon}
                  eventHandlers={{
                    click: () =>
                      window.open(
                        location.directionsUrl,
                        "_blank",
                        "noopener,noreferrer",
                      ),
                  }}
                />
              ))}
            </MapContainer>
          </div>

          {/* Every location gets its own div */}
          <div className="locations-grid">
            {locations.map((location) => (
              <div key={location.id} className="locations-card">
                <div className="locations-card-top">
                  <MapPin size={25} className="locations-card-icon" />
                  <div>
                    <h3 className="locations-card-name">{location.name}</h3>
                    <p className="locations-card-city">
                      {location.city}, {location.state}
                    </p>
                    <p className="locations-card-address">{location.address}</p>
                  </div>
                </div>
                <div className="locations-card-hours">
                  <Clock size={18} aria-hidden="true" />
                  <span>{location.hours}</span>
                </div>
                <a
                  href={location.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="locations-card-button"
                >
                  Get direction
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Locations;
