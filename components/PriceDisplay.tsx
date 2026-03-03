'use client';

import { useCurrency } from '@/contexts/CurrencyContext';

interface PriceDisplayProps {
  price: number; // Price in MAD
  className?: string;
  period?: string; // For rentals: /month, /night, etc.
}

export default function PriceDisplay({ price, className = '', period = '' }: PriceDisplayProps) {
  const { convertPrice } = useCurrency();
  
  return (
    <span className={className}>
      {convertPrice(price)}
      {period && <span className="text-sm font-normal text-dark-charcoal/60">{period}</span>}
    </span>
  );
}