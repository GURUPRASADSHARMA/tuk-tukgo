'use client';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useSelector, UseSelector } from 'react-redux';
import { RootState } from '@/store/store';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

export default function LiveMapPage() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const routeLayerRef = useRef<L.GeoJSON | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const watchIdRef = useRef<number | null>(null);

  const [startlat,setStartLat]=useState(null);
  const [startlong,setStartLong]=useState(null);
  const [endlat,setEndLat]=useState(null);
  const [endlong,setEndLong]=useState(null);



  const data={
    start:useSelector((state:RootState)=>state.user.start),
    end:useSelector((state:RootState)=>state.user.end),
  }
  // acessing store
 
 useEffect(() => {
  const fetchData = async () => {
    const res = await axios.post("/api/locationdata", data);
    console.log(res.data)
    setStartLat(res.data[0].latitude);
    setStartLong(res.data[0].longitude);
    setEndLat(res.data[1].latitude);
    setEndLong(res.data[1].longitude);
  };

  fetchData();
}, [data.start, data.end]);


  const [mapReady, setMapReady] = useState(false);

  const ORS_API_KEY = '5b3ce3597851110001cf62486147dc13afe549d18154242b651df839'; // 🔁 Replace this with your ORS key

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView([26.531655, 83.410757], 14);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    setMapReady(true);
  }, []);

  const drawRoute = async () => {
    const start = [startlong,startlat ]; // [lng, lat]
    const end = [endlong, endlat];
    console.log(start)
    console.log(end)
    const response = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
      method: 'POST',
      headers: {
        'Authorization': ORS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coordinates: [start, end],
      }),
    });

    const geojson = await response.json();

    if (routeLayerRef.current) {
      routeLayerRef.current.remove();
    }

    routeLayerRef.current = L.geoJSON(geojson, {
      style: {
        color: 'blue',
        weight: 5,
      },
    }).addTo(mapRef.current!);

    mapRef.current!.fitBounds(routeLayerRef.current.getBounds());
  };

  const startLiveTracking = () => {
    if (!mapRef.current || !navigator.geolocation) {
      alert('Geolocation not supported.');
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const latlng: [number, number] = [latitude, longitude];

        if (!markerRef.current) {
          markerRef.current = L.marker(latlng).addTo(mapRef.current!);
        } else {
          markerRef.current.setLatLng(latlng);
        }

        mapRef.current!.setView(latlng, 15);
      },
      (err) => {
        console.error(err);
        alert('Error fetching location.');
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  const stopLiveTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapContainerRef}
        className="w-full h-[400px] rounded-xl overflow-hidden border border-gray-300"
      />
      {mapReady && (
        <div className="absolute top-4 left-4 z-[1000] space-y-2">
          <button
            onClick={drawRoute}
            className="block bg-white p-1 rounded shadow hover:bg-gray-100 w-44 mt-65"
          >
            🛣️ Draw Route
          </button>
          <button
            onClick={startLiveTracking}
            className="block bg-green-100 text-green-800 p-1 rounded shadow hover:bg-green-200 w-44"
          >
            📍 Start Live Tracking
          </button>
          <button
            onClick={stopLiveTracking}
            className="block bg-red-100 text-red-800 p-1 rounded shadow hover:bg-red-200 w-44"
          >
            ✋ Stop Tracking
          </button>
        </div>
      )}
    </div>
  );
}
