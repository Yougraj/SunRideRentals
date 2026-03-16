import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar, Bike, IndianRupee, Clock, CheckCircle, XCircle, AlertCircle, Ban } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Booking } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const statusConfig = {
  confirmed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  completed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle },
};

export function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (user) {
      const allBookings = JSON.parse(localStorage.getItem('sunride_bookings') || '[]');
      const userBookings = allBookings.filter((b: Booking) => b.userId === user.id);
      setBookings(userBookings);
    }
  }, [user]);

  const handleCancelBooking = (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    
    const allBookings = JSON.parse(localStorage.getItem('sunride_bookings') || '[]');
    const updatedBookings = allBookings.map((b: Booking) => {
      if (b.id === bookingId) {
        return { ...b, status: 'cancelled' as const };
      }
      return b;
    });
    
    localStorage.setItem('sunride_bookings', JSON.stringify(updatedBookings));
    
    // Update local state
    const userBookings = updatedBookings.filter((b: Booking) => b.userId === user?.id);
    setBookings(userBookings);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
            <p className="text-gray-500">
              Manage your bike rentals and view your booking history
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Bike className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Rentals</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {bookings.filter(b => b.status === 'confirmed').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{bookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.totalPrice, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>
          
          {bookings.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">No bookings found</p>
                <a href="/bikes">
                  <Button>Browse Bikes</Button>
                </a>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {bookings.map((booking) => {
                const status = statusConfig[booking.status];
                const StatusIcon = status.icon;
                const canCancel = booking.status === 'confirmed' || booking.status === 'pending';
                
                return (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <img
                          src={booking.bike.image}
                          alt={booking.bike.name}
                          className="w-full md:w-32 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{booking.bike.name}</h3>
                            <Badge className={status.color}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">
                            Booking ID: #{booking.id.toUpperCase()}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              {format(new Date(booking.startDate), 'PP')} - {format(new Date(booking.endDate), 'PP')}
                            </span>
                            <span className="flex items-center gap-1">
                              <IndianRupee className="h-4 w-4 text-gray-400" />
                              ₹{booking.totalPrice}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {canCancel && (
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              <Ban className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          )}
                          {booking.status === 'cancelled' && (
                            <span className="text-sm text-red-600 font-medium">Cancelled</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
