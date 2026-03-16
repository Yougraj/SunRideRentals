import { MapPin, Phone, Clock, Shield, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { bikes } from '@/data/bikes';
import { BikeCard } from '@/components/BikeCard';

export function LandingPage() {
  const featuredBikes = bikes.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 lg:py-40 bg-gradient-to-b from-orange-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Ride Your Dreams with
                <span className="text-orange-500"> SunRide</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Premium bike rentals for every journey. From scooters to superbikes,
                find your perfect ride and explore the open road.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/bikes">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  Browse Bikes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Sign In to Book
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="p-3 rounded-full bg-orange-100">
                <Shield className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="font-semibold">Fully Insured</h3>
              <p className="text-sm text-gray-500">All bikes come with comprehensive insurance coverage</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="p-3 rounded-full bg-orange-100">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-sm text-gray-500">Round the clock assistance for your peace of mind</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="p-3 rounded-full bg-orange-100">
                <MapPin className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="font-semibold">Multiple Locations</h3>
              <p className="text-sm text-gray-500">Pick up and drop off at convenient locations</p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="p-3 rounded-full bg-orange-100">
                <Star className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="font-semibold">Best Rates</h3>
              <p className="text-sm text-gray-500">Competitive pricing with no hidden charges</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bikes Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Featured Bikes
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500">
              Handpicked selection of our most popular rides
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredBikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/bikes">
              <Button variant="outline" size="lg">
                View All Bikes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-orange-500">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center text-white">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Ready to Hit the Road?
            </h2>
            <p className="mx-auto max-w-[600px] text-orange-100">
              Sign up now and get 10% off on your first booking. Experience the freedom of two wheels.
            </p>
            <Link to="/login">
              <Button size="lg" variant="secondary" className="bg-white text-orange-500 hover:bg-gray-100">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-semibold mb-2">SunRide Rentals</h3>
              <p className="text-sm text-gray-500">
                Your trusted partner for premium bike rentals. Ride safe, ride free.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Contact</h3>
              <div className="space-y-1 text-sm text-gray-500">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +91 98765 43210
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  123 Bike Street, City
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Hours</h3>
              <p className="text-sm text-gray-500">
                Open 7 days a week<br />
                8:00 AM - 8:00 PM
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
            © 2026 SunRide Rentals. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
