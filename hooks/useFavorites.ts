'use client';

import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load favorites from localStorage or API
  useEffect(() => {
    const loadFavorites = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        // Not logged in - use localStorage
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }

      // Logged in - fetch from API
      try {
        const response = await fetch('/api/user/favorites', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          const favoriteIds = data.data.map((p: any) => p._id || p.toString());
          setFavorites(favoriteIds);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  // Toggle favorite
  const toggleFavorite = async (propertyId: string) => {
    const token = localStorage.getItem('token');
    
    // Optimistic update
    const isFavorited = favorites.includes(propertyId);
    const newFavorites = isFavorited
      ? favorites.filter(id => id !== propertyId)
      : [...favorites, propertyId];
    
    setFavorites(newFavorites);

    if (!token) {
      // Not logged in - save to localStorage
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      
      // Show message to login to save permanently
      if (!isFavorited) {
        alert('Sign in to save favorites permanently!');
      }
      return;
    }

    // Logged in - call API
    try {
      const response = await fetch('/api/user/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          propertyId,
          action: isFavorited ? 'remove' : 'add'
        })
      });

      const data = await response.json();
      
      if (!data.success) {
        // Revert on error
        setFavorites(favorites);
        console.error('Error toggling favorite:', data.error);
      }
    } catch (error) {
      // Revert on error
      setFavorites(favorites);
      console.error('Error toggling favorite:', error);
    }
  };

  // Check if property is favorited
  const isFavorited = (propertyId: string) => {
    return favorites.includes(propertyId);
  };

  return {
    favorites,
    loading,
    isAuthenticated,
    toggleFavorite,
    isFavorited
  };
}