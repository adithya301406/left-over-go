
import React from 'react';
import { FoodListing, FoodStatus, User } from '../types';

interface DeliveryDashboardProps {
  user: User;
  claimedListings: FoodListing[];
  myDeliveries: FoodListing[];
  onAccept: (id: string) => void;
  onComplete: (id: string) => void;
}

export const DeliveryDashboard: React.FC<DeliveryDashboardProps> = ({ user, claimedListings, myDeliveries, onAccept, onComplete }) => {
  const activeTrips = myDeliveries.filter(d => d.status === FoodStatus.PICKED_UP);
  const completedTrips = myDeliveries.filter(d => d.status === FoodStatus.DELIVERED);

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
      <div className="grid lg:grid-cols-3 gap-10">
        
        {/* Available Gigs */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Available Pickups</h2>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-100 shadow-sm">
               <span className="w-2 h-2 bg-[#FC8019] rounded-full animate-pulse"></span>
               <span className="text-[10px] font-black text-slate-500 uppercase">Live Map</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {claimedListings.length === 0 ? (
              <div className="col-span-full py-16 bg-white rounded-[2rem] text-center border border-slate-100 shadow-sm">
                <p className="font-bold text-slate-400">Waiting for new food claims...</p>
              </div>
            ) : (
              claimedListings.map(item => (
                <div key={item.id} className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-50 hover:shadow-2xl transition duration-300 group">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="font-black text-xl text-slate-900 group-hover:text-[#FC8019] transition-colors">{item.title}</h4>
                    <span className="bg-orange-50 text-[#FC8019] text-[10px] font-black px-2 py-1 rounded-md">{item.quantity}</span>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-[#FC8019] bg-white"></div>
                        <div className="w-[2px] h-10 bg-slate-100"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-300"></div>
                      </div>
                      <div className="flex flex-col justify-between h-full min-h-[70px]">
                        <div>
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Pickup From</p>
                          <p className="text-sm font-black text-slate-700 leading-tight">{item.donorName}</p>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{item.pickupLocation}</p>
                        </div>
                        <div className="mt-4">
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Drop At</p>
                          <p className="text-sm font-black text-slate-700 leading-tight">{item.receiverName || 'Receiver Center'}</p>
                          <p className="text-[10px] text-slate-400 line-clamp-1">{item.receiverLocation || 'Pending address'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => onAccept(item.id)}
                    className="w-full bg-[#FC8019] text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-orange-500/30 hover:bg-[#e67316] transition active:scale-95"
                  >
                    Accept Gig
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* My Active & Status */}
        <div className="space-y-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">On Duty</h2>
          
          {activeTrips.length === 0 ? (
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
               <div className="relative z-10 text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  </div>
                  <h3 className="text-xl font-black mb-2">Ready for delivery?</h3>
                  <p className="text-slate-400 text-sm">Accept a pickup from the list to start contributing.</p>
               </div>
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#FC8019] opacity-10 rounded-full -mb-16 -mr-16 blur-2xl"></div>
            </div>
          ) : (
            activeTrips.map(item => (
              <div key={item.id} className="bg-slate-900 text-white rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden border border-white/5">
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-8">
                    <span className="bg-[#FC8019] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg animate-pulse">In Transit</span>
                    <span className="text-white/20 text-xs font-mono">Job #{item.id}</span>
                  </div>
                  
                  <h3 className="text-3xl font-black mb-1">{item.title}</h3>
                  <div className="flex items-start gap-2 text-slate-400 text-sm mb-8">
                    <svg className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                    <p className="leading-tight">To: <span className="text-white font-bold">{item.receiverName}</span><br/><span className="text-xs opacity-60">{item.receiverLocation}</span></p>
                  </div>

                  <div className="flex items-center gap-4 mb-10 bg-white/5 p-4 rounded-2xl border border-white/5">
                     <div className="w-12 h-12 rounded-xl bg-[#FC8019] flex items-center justify-center text-white shadow-lg">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Contact Donor</p>
                        <p className="text-lg font-black">{item.donorPhone}</p>
                     </div>
                  </div>

                  <button 
                    onClick={() => onComplete(item.id)}
                    className="w-full bg-green-500 text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-green-500/30 hover:bg-green-600 transition active:scale-95"
                  >
                    Delivered Successfully
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              </div>
            ))
          )}

          {completedTrips.length > 0 && (
            <div className="pt-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Completed Today</h3>
              <div className="space-y-3">
                {completedTrips.slice(0, 3).map(trip => (
                  <div key={trip.id} className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 line-clamp-1">{trip.title}</p>
                        <p className="text-[9px] font-bold text-slate-400 tracking-tighter uppercase">{trip.receiverName}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-[#FC8019]">+50 XP</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
