import { useEffect, useState } from "react";
import { fetchCities, fetchSpotsByCity } from "./api";
import type { WalkingSpot } from "./types";
import SpotCard from "./components/SpotCard";
import "./App.css";

export default function App() {
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [spots, setSpots] = useState<WalkingSpot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCities()
      .then((data) => setCities(data.cities))
      .catch(() => setError("無法載入縣市資料，請確認後端服務是否啟動。"));
  }, []);

  useEffect(() => {
    if (!selectedCity) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);
    fetchSpotsByCity(selectedCity)
      .then((data) => setSpots(data.spots))
      .catch(() => setError("無法載入散步地點資料。"))
      .finally(() => setLoading(false));
  }, [selectedCity]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <span className="header-icon">🐾</span>
          <h1>狗狗散步地圖</h1>
          <p className="header-sub">找一個適合毛孩的好去處！</p>
        </div>
      </header>

      <main className="main">
        <section className="city-selector">
          <label htmlFor="city-select" className="selector-label">
            選擇縣市
          </label>
          <select
            id="city-select"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="selector"
          >
            <option value="">-- 請選擇縣市 --</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </section>

        {error && <div className="error-msg">⚠️ {error}</div>}

        {!selectedCity && !error && (
          <div className="empty-state">
            <span className="empty-icon">🐕</span>
            <p>請先選擇縣市，探索當地適合散步的好地方！</p>
          </div>
        )}

        {loading && (
          <div className="loading">
            <span className="loading-icon">🐾</span>
            <p>正在尋找散步地點...</p>
          </div>
        )}

        {!loading && selectedCity && spots.length > 0 && (
          <>
            <h2 className="spots-title">
              {selectedCity} 推薦散步地點（{spots.length} 個）
            </h2>
            <div className="spots-grid">
              {spots.map((spot) => (
                <SpotCard key={spot.id} spot={spot} />
              ))}
            </div>
          </>
        )}
      </main>

      <footer className="footer">
        <p>🐾 帶著你的毛孩，出發探索吧！</p>
      </footer>
    </div>
  );
}
