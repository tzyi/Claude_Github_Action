import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SpotCard from '../components/SpotCard';
import type { WalkingSpot } from '../types';

const mockSpot: WalkingSpot = {
  id: 1,
  name: '大安森林公園',
  address: '台北市大安區新生南路二段1號',
  description: '台北市最大的都市公園，有寬敞的草坪與步道，非常適合帶狗散步。',
  rating: 4.8,
  tags: ['草地', '步道', '寵物友善'],
  image_url: 'https://picsum.photos/seed/taipei1/400/250',
};

describe('SpotCard Component', () => {
  it('should render spot name', () => {
    render(<SpotCard spot={mockSpot} />);
    expect(screen.getByText(mockSpot.name)).toBeInTheDocument();
  });

  it('should render spot address', () => {
    render(<SpotCard spot={mockSpot} />);
    expect(screen.getByText(new RegExp(mockSpot.address))).toBeInTheDocument();
  });

  it('should render spot description', () => {
    render(<SpotCard spot={mockSpot} />);
    expect(screen.getByText(mockSpot.description)).toBeInTheDocument();
  });

  it('should render all tags', () => {
    render(<SpotCard spot={mockSpot} />);
    mockSpot.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('should render spot image with correct alt text', () => {
    render(<SpotCard spot={mockSpot} />);
    const image = screen.getByAltText(mockSpot.name);
    expect(image).toHaveAttribute('src', mockSpot.image_url);
  });

  it('should render rating', () => {
    render(<SpotCard spot={mockSpot} />);
    expect(screen.getByText('4.8')).toBeInTheDocument();
  });

  it('should render correct number of star icons', () => {
    const { container } = render(<SpotCard spot={mockSpot} />);
    const stars = container.querySelectorAll('.star-rating span');
    expect(stars.length).toBe(6); // 5 stars + 1 rating number
  });

  it('should handle different ratings', () => {
    const spotWithLowRating: WalkingSpot = {
      ...mockSpot,
      rating: 3.2,
    };
    render(<SpotCard spot={spotWithLowRating} />);
    expect(screen.getByText('3.2')).toBeInTheDocument();
  });

  it('should render card with correct structure', () => {
    const { container } = render(<SpotCard spot={mockSpot} />);
    expect(container.querySelector('.spot-card')).toBeInTheDocument();
    expect(container.querySelector('.spot-image')).toBeInTheDocument();
    expect(container.querySelector('.spot-body')).toBeInTheDocument();
    expect(container.querySelector('.spot-name')).toBeInTheDocument();
  });
});
