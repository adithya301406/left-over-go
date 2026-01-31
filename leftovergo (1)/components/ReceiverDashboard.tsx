
import React, { useState } from 'react';
import { FoodListing, User } from '../types';

interface ReceiverDashboardProps {
  user: User;
  availableListings: FoodListing[];
  myClaims: FoodListing[];
  onClaim: (id: string, orgName: string, location: string) => void;
}

export const ReceiverDashboard: React.FC<ReceiverDashboardProps> = ({ user, availableListings, myClaims, onClaim }) => {
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [orgName, setOrgName] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (claimingId && orgName && deliveryAddress) {
      onClaim(claimingId, orgName, deliveryAddress);
      setClaimingId(null);
      setOrgName('');
      setDeliveryAddress('');
    }
  };

  const activeClaim = availableListings.find(l => l.id === claimingId);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-top-4 duration-700">
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            Available for Pickup
            <span className="w-8 h-8 rounded-full bg-orange-100 text-[#FC8019] flex items-center justify-center text-sm font-black">{availableListings.length}</span>
          </h2>
          <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
             Live Updates
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </div>
        </div>
        
        {availableListings.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-16 text-center border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Nothing here yet</h3>
            <p className="text-slate-400">We'll alert you as soon as new surplus food is posted.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableListings.map(item => (
              <div key={item.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col">
                <div className="relative h-48 bg-slate-100 flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                   <svg className="w-16 h-16 text-slate-300 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9V9a2 2 0 00-2-2H8a2 2 0 00-2 2v3h12z" /></svg>
                   <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="bg-[#FC8019] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">Expires: {item.expiryTime}</span>
                   </div>
                </div>
                <div className="p-8 flex-grow">
                  <h4 className="text-2xl font-black text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">{item.description}</p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                      <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-[#FC8019]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" /></svg>
                      </div>
                      {item.donorName}
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                      <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-[#FC8019]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                      </div>
                      {item.pickupLocation}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setClaimingId(item.id)}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-slate-800 transition shadow-xl active:scale-95"
                  >
                    Claim Food
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Claim Details Modal */}
      {claimingId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden animate-in slide-in-from-bottom duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="text-2xl font-black text-slate-900">Claim Details</h3>
              <button onClick={() => setClaimingId(null)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleClaimSubmit} className="p-8 space-y-6">
              <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <p className="text-xs font-bold text-orange-800 uppercase mb-1">Claiming For</p>
                <p className="font-black text-slate-900">{activeClaim?.title}</p>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Hostel / Oldage Home Name</label>
                <input 
                  required 
                  value={orgName} 
                  onChange={e => setOrgName(e.target.value)} 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#FC8019] outline-none font-bold" 
                  placeholder="e.g. St. Mary's Orphanage" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Delivery Location Address</label>
                <textarea 
                  required 
                  value={deliveryAddress} 
                  onChange={e => setDeliveryAddress(e.target.value)} 
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#FC8019] outline-none font-medium h-24" 
                  placeholder="Street, Landmark, City..." 
                />
              </div>

              <button type="submit" className="w-full bg-[#FC8019] text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-orange-500/30 hover:bg-[#e67316] transition active:scale-95">
                Confirm Claim
              </button>
            </form>
          </div>
        </div>
      )}

      {myClaims.length > 0 && (
        <section className="pt-12 border-t border-slate-200">
          <h3 className="text-2xl font-black text-slate-900 mb-6">In Progress</h3>
          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Food Item</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pickup</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {myClaims.map(claim => (
                    <tr key={claim.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-8 py-6">
                        <p className="font-black text-slate-900">{claim.title}</p>
                        <p className="text-xs text-slate-400">From {claim.donorName}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                          claim.status === 'CLAIMED' ? 'bg-amber-100 text-amber-600' : 
                          claim.status === 'PICKED_UP' ? 'bg-blue-100 text-blue-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {claim.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-sm font-bold text-slate-500">{claim.pickupLocation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
