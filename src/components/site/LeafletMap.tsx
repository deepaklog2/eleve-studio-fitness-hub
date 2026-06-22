import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

const icon = new L.DivIcon({
  className: "",
  html: `
    <div style="position:relative;width:44px;height:44px;">
      <div style="position:absolute;inset:0;border-radius:9999px;background:radial-gradient(circle,oklch(0.86 0.17 85 / .55),transparent 70%);animation:pulse 2s infinite;"></div>
      <div style="position:absolute;inset:8px;border-radius:9999px;background:linear-gradient(135deg,oklch(0.86 0.17 85),oklch(0.68 0.21 45));box-shadow:0 0 20px oklch(0.68 0.21 45 / .8);display:grid;place-items:center;color:#181208;font-weight:800;font-family:Bebas Neue,sans-serif;font-size:14px;">E</div>
    </div>
  `,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => {
      map.flyTo([lat, lng], 17, { duration: 1.4 });
    }, 400);
    return () => clearTimeout(t);
  }, [lat, lng, map]);
  return null;
}

export function LeafletMap({ lat, lng }: { lat: number; lng: number }) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={[lat, lng]}
        radius={120}
        pathOptions={{ color: "#f5b042", fillColor: "#f5b042", fillOpacity: 0.15, weight: 1 }}
      />
      <Marker position={[lat, lng]} icon={icon}>
        <Popup>
          <div style={{ minWidth: 180 }}>
            <strong style={{ color: "#f5b042" }}>ELEVE STUDIO</strong>
            <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>
              Vepery, Chennai · Open 5 AM
            </div>
          </div>
        </Popup>
      </Marker>
      <FlyTo lat={lat} lng={lng} />
    </MapContainer>
  );
}
