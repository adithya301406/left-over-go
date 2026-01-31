
import React from 'react';
import { FoodListing, FoodStatus, User } from '../types';

interface DriverDashboardProps {
  user: User;
  claimedListings: FoodListing[];
  myDeliveries: FoodListing[];
  onAccept: (id: string) => void;
  onComplete: (id: string) => void;
}

export const DriverDashboard: React.FC<DriverDashboardProps> = ({ user, claimedListings, myDeliveries, onAccept, onComplete }) => {
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
            Tasks Available
          </h2>
          
          <div className="space-y-4">
            {claimedListings.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-100 text-slate-400">
                No delivery requests pending right now.
              </div>
            ) : (
              claimedListings.map(item => (
                <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-slate-800 text-lg mb-2">{item.title}</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">From (Donor)</p>
                      <p className="text-xs font-semibold text-slate-700">{item.donorName}</p>
                      <p className="text-[10px] text-slate-500 truncate">{item.pickupLocation}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Recipient</p>
                      <p className="text-xs font-semibold text-slate-700">Orphanage/NGO Center</p>
                      <p className="text-[10px] text-slate-500">Wait for assignment</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onAccept(item.id)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition"
                  >
                    Accept Delivery
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
            My Active Trips
          </h2>
          
          <div className="space-y-4">
            {myDeliveries.filter(d => d.status === FoodStatus.PICKED_UP).length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-slate-100 text-slate-400">
                You don't have any active deliveries.
              </div>
            ) : (
              myDeliveries.filter(d => d.status === FoodStatus.PICKED_UP).map(item => (
                <div key={item.id} className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-xl">{item.title}</h4>
                      <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded">IN TRANSIT</span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                       <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                       </div>
                       <div>
                         <p className="text-xs text-slate-400">Contact Donor</p>
                         <p className="font-bold">{item.donorPhone}</p>
                       </div>
                    </div>

                    <button 
                      onClick={() => onComplete(item.id)}
                      className="w-full bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition"
                    >
                      Mark as Delivered
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {myDeliveries.filter(d => d.status === FoodStatus.DELIVERED).length > 0 && (
            <div className="mt-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Recently Completed</h3>
              <div className="bg-white rounded-xl border border-slate-100 overflow-hidden divide-y divide-slate-100">
                {myDeliveries.filter(d => d.status === FoodStatus.DELIVERED).map(item => (
                  <div key={item.id} className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                      <p className="text-[10px] text-slate-400">Delivered successfully</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    </div>
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
