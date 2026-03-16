import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Edit2, Camera, LogOut, Bike, Calendar, IndianRupee, Ban } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import type { Booking } from '@/types';

export function ProfilePage() {
  const { user, isAuthenticated, logout, getAvatarUrl } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (user) {
      const allBookings = JSON.parse(localStorage.getItem('sunride_bookings') || '[]');
      const userBookings = allBookings.filter((b: Booking) => b.userId === user.id);
      setBookings(userBookings);
      
      // Load saved profile data
      const savedProfile = localStorage.getItem(`sunride_profile_${user.id}`);
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setPhone(profile.phone || '');
        setAddress(profile.address || '');
      }
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="container py-12 text-center">
        <p className="text-gray-500 mb-4">Please sign in to view your profile</p>
        <Button onClick={() => navigate('/login')}>Sign In</Button>
      </div>
    );
  }

  const handleSaveProfile = () => {
    if (user) {
      localStorage.setItem(`sunride_profile_${user.id}`, JSON.stringify({
        phone,
        address,
      }));
      setIsEditing(false);
    }
  };

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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const totalSpent = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const activeBookings = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={getAvatarUrl()}
                  alt={user?.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-orange-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&size=128&background=f97316&color=fff`;
                  }}
                />
                <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary/90">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-gray-500">
                  <Mail className="w-4 h-4" />
                  <span>{user?.email}</span>
                </div>
                <div className="flex gap-2 mt-4 justify-center md:justify-start">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
              <div className="text-2xl font-bold">{activeBookings}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalSpent}</div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="flex-1 p-2 border rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <div className="flex items-start gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-gray-400 mt-2" />
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your address"
                      rows={3}
                      className="flex-1 p-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{phone || 'Not added'}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{address || 'Not added'}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No bookings yet</p>
            ) : (
              <div className="space-y-3">
                {bookings.slice(0, 3).map((booking) => {
                  const canCancel = booking.status === 'confirmed' || booking.status === 'pending';
                  return (
                    <div key={booking.id} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                      <img
                        src={booking.bike.image}
                        alt={booking.bike.name}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{booking.bike.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                        <p className="font-semibold">₹{booking.totalPrice}</p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </span>
                        {canCancel && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 h-6 px-2 text-xs"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            <Ban className="h-3 w-3 mr-1" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
