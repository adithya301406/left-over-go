
import React, { useState } from 'react';
import { Auth } from './components/Auth';
import { DonorDashboard } from './components/DonorDashboard';
import { ReceiverDashboard } from './components/ReceiverDashboard';
import { DeliveryDashboard } from './components/DeliveryDashboard';
import { Header } from './components/Header';
import { User, AuthState, FoodListing, FoodStatus } from './types';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: false
  });

  const [listings, setListings] = useState<FoodListing[]>([
    {
      id: '1',
      title: 'Buffet Feast Surplus',
      donorId: 'donor-1',
      donorName: 'Grand Hyatt Events',
      donorPhone: '9876543210',
      description: 'Vegetarian feast leftovers: Basmati Rice, Paneer Tikka, and Mixed Veg Curry.',
      quantity: 'Approx. 40 plates',
      expiryTime: 'Within 3 hours',
      pickupLocation: 'Banjara Hills, Block A',
      status: FoodStatus.AVAILABLE,
      createdAt: Date.now() - 1800000
    }
  ]);

  const handleLogin = (user: User) => {
    setAuth({ isAuthenticated: true, user, loading: false });
  };

  const handleLogout = () => {
    setAuth({ isAuthenticated: false, user: null, loading: false });
  };

  const addListing = (listing: Omit<FoodListing, 'id' | 'createdAt' | 'status'>) => {
    const newListing: FoodListing = {
      ...listing,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      status: FoodStatus.AVAILABLE
    };
    setListings([newListing, ...listings]);
  };

  const updateListingStatus = (id: string, status: FoodStatus, extraData: Partial<FoodListing> = {}) => {
    setListings(prev => prev.map(item => 
      item.id === id ? { ...item, status, ...extraData } : item
    ));
  };

  if (!auth.isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#F1F3F6] flex flex-col font-sans">
      <Header user={auth.user!} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {auth.user?.role === 'DONOR' && (
          <DonorDashboard 
            user={auth.user} 
            listings={listings.filter(l => l.donorId === auth.user?.id)}
            onAddListing={addListing}
          />
        )}
        
        {auth.user?.role === 'RECEIVER' && (
          <ReceiverDashboard 
            user={auth.user} 
            availableListings={listings.filter(l => l.status === FoodStatus.AVAILABLE)}
            myClaims={listings.filter(l => l.receiverId === auth.user?.id)}
            onClaim={(id, orgName, location) => updateListingStatus(id, FoodStatus.CLAIMED, { 
              receiverId: auth.user!.id,
              receiverName: orgName,
              receiverLocation: location
            })}
          />
        )}
        
        {auth.user?.role === 'DELIVERY' && (
          <DeliveryDashboard 
            user={auth.user} 
            claimedListings={listings.filter(l => l.status === FoodStatus.CLAIMED)}
            myDeliveries={listings.filter(l => l.deliveryPartnerId === auth.user?.id)}
            onAccept={(id) => updateListingStatus(id, FoodStatus.PICKED_UP, { deliveryPartnerId: auth.user!.id })}
            onComplete={(id) => updateListingStatus(id, FoodStatus.DELIVERED)}
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 opacity-50 grayscale">
             <div className="w-6 h-6 bg-[#FC8019] rounded-md"></div>
             <span className="font-bold text-slate-900">LeftOverGo</span>
          </div>
          <p className="text-slate-400 text-xs">© 2024 LeftOverGo. Part of the Global Food Security Initiative.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;