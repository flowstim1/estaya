'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Exchange rates (you can update these from an API later)
const exchangeRates = {
  MAD: 1,      // Base currency
  EUR: 0.092,  // 1 MAD = 0.092 EUR
  USD: 0.10,   // 1 MAD = 0.10 USD
};

const currencySymbols = {
  MAD: 'DH',
  EUR: '€',
  USD: '$',
};

type Currency = 'MAD' | 'EUR' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceInMAD: number) => string;
  symbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('MAD');

  // Load saved currency from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('preferredCurrency') as Currency;
    if (saved && ['MAD', 'EUR', 'USD'].includes(saved)) {
      setCurrency(saved);
    }
  }, []);

  // Save currency to localStorage when changed
  const handleSetCurrency = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    localStorage.setItem('preferredCurrency', newCurrency);
  };

  const convertPrice = (priceInMAD: number): string => {
    const converted = priceInMAD * exchangeRates[currency];
    
    // Format based on currency
    switch(currency) {
      case 'MAD':
        return `${Math.round(converted).toLocaleString()} ${currencySymbols[currency]}`;
      case 'EUR':
        return `${converted.toFixed(0)} ${currencySymbols[currency]}`;
      case 'USD':
        return `${converted.toFixed(0)} ${currencySymbols[currency]}`;
      default:
        return `${priceInMAD.toLocaleString()} DH`;
    }
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      setCurrency: handleSetCurrency,
      convertPrice,
      symbol: currencySymbols[currency],
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}