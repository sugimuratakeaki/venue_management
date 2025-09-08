import { useState, useEffect } from 'react';
import { Venue, VenuesData } from '../types/venue';
import venuesData from '../data/venues.json';

export const useVenues = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVenues = async () => {
      try {
        setLoading(true);
        // 実際のAPIコールをシミュレート
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const data = venuesData as VenuesData;
        setVenues(data.venues);
        setError(null);
      } catch (err) {
        setError('会場データの読み込みに失敗しました');
        console.error('Error loading venues:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVenues();
  }, []);

  const searchVenues = (query: string) => {
    if (!query) return venues;
    
    const lowerQuery = query.toLowerCase();
    return venues.filter(venue => 
      venue.venue_name.toLowerCase().includes(lowerQuery) ||
      venue.prefecture.toLowerCase().includes(lowerQuery) ||
      venue.city.toLowerCase().includes(lowerQuery) ||
      venue.address.toLowerCase().includes(lowerQuery) ||
      venue.stations?.some(station => 
        station.station_name.toLowerCase().includes(lowerQuery) ||
        station.line_name.toLowerCase().includes(lowerQuery)
      ) ||
      venue.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  };

  const filterVenues = (filters: {
    prefectures?: string[];
    capacityRanges?: string[];
    features?: string[];
  }) => {
    let filtered = [...venues];

    // 都道府県でフィルタ
    if (filters.prefectures && filters.prefectures.length > 0) {
      filtered = filtered.filter(venue => 
        filters.prefectures!.includes(venue.prefecture)
      );
    }

    // 収容人数でフィルタ
    if (filters.capacityRanges && filters.capacityRanges.length > 0) {
      filtered = filtered.filter(venue => {
        const maxCapacity = Math.max(
          ...(venue.rooms?.map(r => r.capacity_theater || 0) || [0])
        );
        
        return filters.capacityRanges!.some(range => {
          if (range === '0-50') return maxCapacity <= 50;
          if (range === '51-100') return maxCapacity > 50 && maxCapacity <= 100;
          if (range === '101-200') return maxCapacity > 100 && maxCapacity <= 200;
          if (range === '201-') return maxCapacity > 200;
          return false;
        });
      });
    }

    // 特徴でフィルタ
    if (filters.features && filters.features.length > 0) {
      filtered = filtered.filter(venue => {
        return filters.features!.some(feature => {
          if (feature === 'near-station') {
            return venue.stations?.some(s => s.walking_time && s.walking_time <= 5);
          }
          if (feature === 'parking') {
            return venue.facilities.parking_capacity && venue.facilities.parking_capacity > 0;
          }
          if (feature === 'barrier-free') {
            return venue.facilities.is_barrier_free;
          }
          if (feature === 'food-allowed') {
            return venue.facilities.can_eat_drink;
          }
          return false;
        });
      });
    }

    return filtered;
  };

  const getVenueById = (id: number) => {
    return venues.find(venue => venue.id === id);
  };

  return {
    venues,
    loading,
    error,
    searchVenues,
    filterVenues,
    getVenueById,
  };
};