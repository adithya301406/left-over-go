
import React, { useState } from 'react';
import { User, FoodListing, FoodStatus } from '../types';

interface DonorDashboardProps {
  user: User;
  listings: FoodListing[];
  onAddListing: (listing: Omit<FoodListing, 'id' | 'createdAt' | 'status'>) => void;
}

export const DonorDashboard: React.FC<DonorDashboardProps> = ({ user, listings, onAddListing }) => {
  const [isPosting, setIsPosting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: '',
    expiryTime: '',
    pickupLocation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddListing({
      ...formData,
      donorId: user.id,
      donorName: user.name,
      donorPhone: user.phone
    });
    setFormData({ title: '', description: '', quantity: '', expiryTime: '', pickupLocation: '' });
    setIsPosting(false);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="bg-white rounded-[2rem] p-8 md:p-12 mb-10 relative overflow-hidden shadow-xl shadow-slate-200/50">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Zero Hunger, One Meal at a Time.</h2>
            <p className="text-slate-500 text-lg leading-relaxed">Have leftovers from an event or restaurant? Don't let it go to waste. Post it here and we'll handle the rest.</p>
          </div>
          <button 
            onClick={() => setIsPosting(true)}
            className="whitespace-nowpx-10 py-5 bg-[#FC8019] text-white rounded-2xl font-black text-xl shadow-2xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            Post Surplus Food
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FC8019]/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.length === 0 ? (
          <div className="col-span-full py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
             </div>
             <p className="font-bold text-lg">No active listings</p>
             <p className="text-sm">Start your first donation today!</p>
          </div>
        ) : (
          listings.map(item => (
            <div key={item.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 flex flex-col">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                    item.status === FoodStatus.AVAILABLE ? 'bg-green-100 text-green-600' :
                    item.status === FoodStatus.CLAIMED ? 'bg-orange-100 text-orange-600' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {item.status.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">#{item.id}</span>
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-2 group-hover:text-[#FC8019] transition-colors">{item.title}</h4>
                <p className="text-slate-500 text-sm mb-6 line-clamp-3">{item.description}</p>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] font-black text-slate-300 uppercase">Quantity</p>
                    <p className="text-sm font-bold text-slate-700">{item.quantity}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-300 uppercase">Expires</p>
                    <p className="text-sm font-bold text-slate-700">{item.expiryTime}</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-6 mt-auto">
                 <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                    <svg className="w-4 h-4 text-[#FC8019]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                    {item.pickupLocation}
                 </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isPosting && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-2xl font-black text-slate-900">Add Surplus Food</h3>
              <button onClick={() => setIsPosting(false)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#FC8019] outline-none font-bold" placeholder="Title (e.g. Wedding Leftovers)" />
              <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#FC8019] outline-none font-medium h-32" placeholder="Describe the items (Rice, Pizza, Veggie trays...)" />
              <div className="grid grid-cols-2 gap-4">
                <input required value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#FC8019] outline-none font-bold" placeholder="Quantity (e.g. 20 plates)" />
                <input required value={formData.expiryTime} onChange={e => setFormData({...formData, expiryTime: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#FC8019] outline-none font-bold" placeholder="Eat by (e.g. 9 PM)" />
              </div>
              <input required value={formData.pickupLocation} onChange={e => setFormData({...formData, pickupLocation: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#FC8019] outline-none font-bold" placeholder="Pickup Address" />
              <button type="submit" className="w-full bg-[#FC8019] text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-orange-500/30 hover:bg-[#e67316] transition">Post Donation</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
