import { useState } from 'react';
import { Calendar, Fuel, Gauge } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Bike } from '@/types';
import { BookingDialog } from '@/components/BookingDialog';

interface BikeCardProps {
  bike: Bike;
}

export function BikeCard({ bike }: BikeCardProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden">
        <div className="aspect-video relative overflow-hidden">
          <img
            src={bike.image}
            alt={bike.name}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-sm font-semibold">
            ₹{bike.pricePerDay}/day
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-lg">{bike.name}</CardTitle>
          <CardDescription className="line-clamp-2">
            {bike.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex flex-col items-center p-2 bg-muted rounded">
              <Gauge className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Engine</span>
              <span className="font-medium">{bike.specs.engine}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded">
              <Fuel className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Mileage</span>
              <span className="font-medium">{bike.specs.mileage}</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded">
              <Calendar className="h-4 w-4 mb-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Daily</span>
              <span className="font-medium">₹{bike.pricePerDay}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={() => setIsBookingOpen(true)}
            disabled={!bike.available}
          >
            {bike.available ? 'Book Now' : 'Unavailable'}
          </Button>
        </CardFooter>
      </Card>

      <BookingDialog 
        bike={bike} 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </>
  );
}
