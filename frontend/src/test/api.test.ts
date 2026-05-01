import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import { fetchCities, fetchSpotsByCity } from '../api';
import type { CitiesResponse, SpotsResponse } from '../types';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('fetchCities', () => {
    it('should fetch cities successfully', async () => {
      const mockResponse: CitiesResponse = {
        cities: ['台北市', '新北市', '台中市'],
      };

      mockedAxios.get.mockResolvedValueOnce({
        data: mockResponse,
      });

      const result = await fetchCities();

      expect(result).toEqual(mockResponse);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:5000/api/cities'
      );
    });

    it('should handle error when fetching cities', async () => {
      const error = new Error('Network error');
      mockedAxios.get.mockRejectedValueOnce(error);

      await expect(fetchCities()).rejects.toThrow('Network error');
    });
  });

  describe('fetchSpotsByCity', () => {
    it('should fetch spots by city successfully', async () => {
      const mockResponse: SpotsResponse = {
        city: '台北市',
        spots: [
          {
            id: 1,
            name: '大安森林公園',
            address: '台北市大安區',
            description: '台北市最大的都市公園',
            rating: 4.8,
            tags: ['草地', '步道'],
            image_url: 'https://example.com/image.jpg',
          },
        ],
      };

      mockedAxios.get.mockResolvedValueOnce({
        data: mockResponse,
      });

      const result = await fetchSpotsByCity('台北市');

      expect(result).toEqual(mockResponse);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:5000/api/spots/%E5%8F%B0%E5%8C%97%E5%B8%82'
      );
    });

    it('should handle error when fetching spots', async () => {
      const error = new Error('Not found');
      mockedAxios.get.mockRejectedValueOnce(error);

      await expect(fetchSpotsByCity('不存在的城市')).rejects.toThrow(
        'Not found'
      );
    });

    it('should encode special characters in city name', async () => {
      const mockResponse: SpotsResponse = {
        city: '台中市',
        spots: [],
      };

      mockedAxios.get.mockResolvedValueOnce({
        data: mockResponse,
      });

      await fetchSpotsByCity('台中市');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'http://localhost:5000/api/spots/%E5%8F%B0%E4%B8%AD%E5%B8%82'
      );
    });
  });
});
