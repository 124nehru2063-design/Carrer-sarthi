import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    google: any;
  }
}

const indiaData: Record<string, Record<string, string[]>> = {
  Maharashtra: {
    "Mumbai Suburban": ["Mumbai", "Andheri", "Bandra"],
    Thane: ["Thane", "Navi Mumbai"],
  },
  Telangana: {
    Hyderabad: ["Hyderabad"],
  },
  "Tamil Nadu": {
    Chennai: ["Chennai"],
  },
};

const CollegePage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any>(null);

  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");

  const [places, setPlaces] = useState<any[]>([]);
  const markers = useRef<any[]>([]);

  /* =========================
     LOAD GOOGLE MAP
     ========================= */
  useEffect(() => {
    if (window.google) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBblzVBh4HAo3nmnEAN96c5Hba9h24taVk&libraries=places`;
    script.async = true;
    script.onload = initMap;
    document.body.appendChild(script);
  }, []);

  const initMap = () => {
    if (!mapRef.current) return;

    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: 22.5937, lng: 78.9629 },
      zoom: 5,
    });
  };

  /* =========================
     SEARCH COLLEGES
     ========================= */
  const searchColleges = (selectedCity: string) => {
    if (!selectedCity || !mapInstance.current) return;

    clearAll();

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { address: `${selectedCity}, India` },
      (res: any, status: string) => {
        if (status !== "OK") return;

        const location = res[0].geometry.location;
        mapInstance.current.setCenter(location);
        mapInstance.current.setZoom(13);

        const service = new window.google.maps.places.PlacesService(
          mapInstance.current
        );

        service.nearbySearch(
          {
            location,
            radius: 12000,
            type: "university",
          },
          (results: any[], status: string) => {
            if (
              status !==
              window.google.maps.places.PlacesServiceStatus.OK
            )
              return;

            setPlaces(results);
            renderMarkers(results);
          }
        );
      }
    );
  };

  /* =========================
     MARKERS
     ========================= */
  const renderMarkers = (list: any[]) => {
    list.forEach((p) => {
      const marker = new window.google.maps.Marker({
        map: mapInstance.current,
        position: p.geometry.location,
      });
      markers.current.push(marker);
    });
  };

  const clearAll = () => {
    markers.current.forEach((m) => m.setMap(null));
    markers.current = [];
    setPlaces([]);
  };

  /* =========================
     FILTERED RESULTS
     ========================= */
  const filteredPlaces = places.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "Arial", background: "#f4f6f8" }}>
      {/* CONTROLS */}
      <div
        style={{
          display: "flex",
          gap: 10,
          padding: 12,
          background: "#fff",
          flexWrap: "wrap",
          borderBottom: "1px solid #ddd",
        }}
      >
        <select
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            setDistrict("");
            setCity("");
            clearAll();
          }}
        >
          <option value="">Select State</option>
          {Object.keys(indiaData).map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value);
            setCity("");
            clearAll();
          }}
        >
          <option value="">Select District</option>
          {state &&
            Object.keys(indiaData[state]).map((d) => (
              <option key={d}>{d}</option>
            ))}
        </select>

        <select
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            searchColleges(e.target.value);
          }}
        >
          <option value="">Select City</option>
          {state &&
            district &&
            indiaData[state][district].map((c) => (
              <option key={c}>{c}</option>
            ))}
        </select>

        <input
          placeholder="Search college name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* MAP */}
      <div
        ref={mapRef}
        style={{ height: "55vh", minHeight: 400, width: "100%" }}
      />

      {/* RESULTS */}
      <div
        style={{
          padding: 12,
          maxHeight: "35vh",
          overflowY: "auto",
          background: "#fafafa",
        }}
      >
        {filteredPlaces.length === 0 && (
          <div className="card">❌ No colleges found</div>
        )}

        {filteredPlaces.map((p, i) => (
          <div
            key={i}
            className="card"
            style={{
              background: "#fff",
              padding: 12,
              marginBottom: 10,
              borderRadius: 10,
              boxShadow: "0 2px 6px rgba(0,0,0,.08)",
              cursor: "pointer",
            }}
            onClick={() => {
              mapInstance.current.panTo(p.geometry.location);
              mapInstance.current.setZoom(16);
            }}
          >
            <h3 style={{ margin: "0 0 6px", color: "#1a237e" }}>
              {p.name}
            </h3>
            <div style={{ fontSize: 13, color: "#555" }}>
              📍 {p.vicinity || "Address not available"}
            </div>
            <div style={{ fontSize: 13, color: "#f57c00" }}>
              ⭐ {p.rating || "N/A"} ({p.user_ratings_total || 0})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollegePage;
