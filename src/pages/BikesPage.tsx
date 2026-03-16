import { useState } from 'react';
import { BikeCard } from '@/components/BikeCard';
import { bikes, categoryLabels } from '@/data/bikes';
import { Button } from '@/components/ui/button';
import type { Bike } from '@/types';

export function BikesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredBikes = selectedCategory === 'all' 
    ? bikes 
    : bikes.filter((bike: Bike) => bike.category === selectedCategory);

  const categories = ['all', ...new Set(bikes.map((bike: Bike) => bike.category))];

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Our Bikes</h1>
          <p className="text-gray-500">
            Choose from our wide selection of premium bikes for rent
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Bikes' : categoryLabels[category] || category}
            </Button>
          ))}
        </div>

        {/* Bikes Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>

        {filteredBikes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No bikes found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
