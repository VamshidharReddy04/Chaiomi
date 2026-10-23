// Location component
// Shows the Chaiomi Office on a map and links to the full locations page.

import { MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { locations } from "../data/locations";
import "../Styles/location.css";

const headquarters = locations.find((location) => location.id === 1);
const headquartersMapUrl = headquarters
  ? `https://www.google.com/maps?q=${headquarters.lat},${headquarters.lng}&z=16&output=embed`
  : "https://www.google.com/maps";

function LocationSection() {
  return (
    <section className="bg-mist py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-4xl text-navy font-light text-center">
            Find a Chaiomi
          </h2>
          <p className="mt-4 text-lg text-gray-600 text-center">
            Visit the Chaiomi Office.
          </p>
        </div>

        <div className="location-layout">
          {/* The home page intentionally shows only the Chaiomi Office pin. */}
          <div className="location-map-wrap">
            <iframe
              className="location-map-canvas"
              src={headquartersMapUrl}
              title="Google Map showing the Chaiomi Office"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* Headquarters card only shows the headquarters location */}
          {headquarters && (
            <div className="location-info">
              <article className="location-info-card rounded-2xl border border-navy/10 bg-white p-6 shadow-(--shadow-1) transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-(--shadow-2)">
              <div className="flex items-start gap-3">
                <MapPin size={25} className="mt-1 shrink-0 text-terracotta" />
                <div>
                  <h3 className="text-2xl font-bold text-navy">
                    {headquarters.name}
                  </h3>
                  <p className="mt-1 text-gray-600">
                    {headquarters.city}, {headquarters.state}
                  </p>
                  <p className="mt-3 text-gray-600">{headquarters.address}</p>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 text-gray-600">
                <Clock size={18} aria-hidden="true" />
                <span>{headquarters.hours}</span>
              </div>
              <a
                href={headquarters.directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-navy mt-6"
              >
                Get directions
              </a>
              </article>
            </div>
          )}
        </div>

        {/* "View all locations" moves to locations page */}
        <div className="mt-8 text-center">
          <Link to="/locations" className="btn btn-navy">
            View all locations
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LocationSection;
