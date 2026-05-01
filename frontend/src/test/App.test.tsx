import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import * as api from '../api';

vi.mock('../api');
const mockedApi = vi.mocked(api);

const mockCities = {
  cities: ['台北市', '新北市', '台中市'],
};

const mockTaipeiSpots = {
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
    {
      id: 2,
      name: '象山自然步道',
      address: '台北市信義區',
      description: '緊鄰信義區的山林步道',
      rating: 4.5,
      tags: ['山林', '步道'],
      image_url: 'https://example.com/image2.jpg',
    },
  ],
};

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render header with title', async () => {
    mockedApi.fetchCities.mockResolvedValueOnce(mockCities);

    render(<App />);
    expect(screen.getByText('狗狗散步地圖')).toBeInTheDocument();
    expect(screen.getByText('找一個適合毛孩的好去處！')).toBeInTheDocument();
  });

  it('should fetch and display cities on mount', async () => {
    mockedApi.fetchCities.mockResolvedValueOnce(mockCities);

    render(<App />);

    await waitFor(() => {
      expect(mockedApi.fetchCities).toHaveBeenCalled();
    });

    await waitFor(() => {
      mockCities.cities.forEach((city) => {
        expect(screen.getByText(city)).toBeInTheDocument();
      });
    });
  });

  it('should show empty state when no city is selected', async () => {
    mockedApi.fetchCities.mockResolvedValueOnce(mockCities);

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText('請先選擇縣市，探索當地適合散步的好地方！')
      ).toBeInTheDocument();
    });
  });

  it('should fetch and display spots when city is selected', async () => {
    mockedApi.fetchCities.mockResolvedValueOnce(mockCities);
    mockedApi.fetchSpotsByCity.mockResolvedValueOnce(mockTaipeiSpots);

    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(mockedApi.fetchCities).toHaveBeenCalled();
    });

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, '台北市');

    await waitFor(() => {
      expect(mockedApi.fetchSpotsByCity).toHaveBeenCalledWith('台北市');
    });

    await waitFor(() => {
      expect(screen.getByText('大安森林公園')).toBeInTheDocument();
      expect(screen.getByText('象山自然步道')).toBeInTheDocument();
    });
  });

  it('should display loading state while fetching spots', async () => {
    mockedApi.fetchCities.mockResolvedValueOnce(mockCities);
    mockedApi.fetchSpotsByCity.mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(() => resolve(mockTaipeiSpots), 100))
    );

    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(mockedApi.fetchCities).toHaveBeenCalled();
    });

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, '台北市');

    expect(screen.getByText('正在尋找散步地點...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('正在尋找散步地點...')).not.toBeInTheDocument();
    });
  });

  it('should display error message when cities fetch fails', async () => {
    mockedApi.fetchCities.mockRejectedValueOnce(new Error('Network error'));

    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText('無法載入縣市資料，請確認後端服務是否啟動。')
      ).toBeInTheDocument();
    });
  });

  it('should display error message when spots fetch fails', async () => {
    mockedApi.fetchCities.mockResolvedValueOnce(mockCities);
    mockedApi.fetchSpotsByCity.mockRejectedValueOnce(new Error('Not found'));

    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(mockedApi.fetchCities).toHaveBeenCalled();
    });

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, '台北市');

    await waitFor(() => {
      expect(screen.getByText('無法載入散步地點資料。')).toBeInTheDocument();
    });
  });

  it('should display correct spot count in title', async () => {
    mockedApi.fetchCities.mockResolvedValueOnce(mockCities);
    mockedApi.fetchSpotsByCity.mockResolvedValueOnce(mockTaipeiSpots);

    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => {
      expect(mockedApi.fetchCities).toHaveBeenCalled();
    });

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, '台北市');

    await waitFor(() => {
      expect(screen.getByText(/台北市 推薦散步地點.*2 個/)).toBeInTheDocument();
    });
  });

  it('should render footer', () => {
    mockedApi.fetchCities.mockResolvedValueOnce(mockCities);

    render(<App />);
    expect(screen.getByText('帶著你的毛孩，出發探索吧！')).toBeInTheDocument();
  });
});
