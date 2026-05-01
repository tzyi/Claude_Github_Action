import axios from "axios";
import type { CitiesResponse, SpotsResponse } from "./types";

const BASE_URL = "http://localhost:5000/api";

export const fetchCities = async (): Promise<CitiesResponse> => {
  const res = await axios.get<CitiesResponse>(`${BASE_URL}/cities`);
  return res.data;
};

export const fetchSpotsByCity = async (city: string): Promise<SpotsResponse> => {
  const res = await axios.get<SpotsResponse>(
    `${BASE_URL}/spots/${encodeURIComponent(city)}`
  );
  return res.data;
};
