
import React from 'react';
import { FoodListing, User } from '../types';

interface RecipientDashboardProps {
  user: User;
  availableListings: FoodListing[];
  myClaims: FoodListing[];
  onClaim: (id: string) => void;
}

export const RecipientDashboard: React.FC<RecipientDashboardProps> = ({ user, availableListings, myClaims, onClaim }) => {
  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-green-500 rounded-full"></span>
          Available Food Near You
        </h2>
        
        {availableListings.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-500 shadow-sm border border-slate-100">
            <svg className="w-16 h-16 mx-auto mb-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
            <p className="text-lg">No active food listings at the moment.</p>
            <p className="text-sm">We'll notify you when someone posts a new donation.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableListings.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-32 bg-slate-100 flex items-center justify-center">
                   <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                </div>
                <div className="p-5 flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded">EXPIRES: {item.expiryTime}</span>
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">{item.quantity}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-lg mb-1">{item.title}</h4>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-3">{item.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" /></svg>
                      {item.donorName}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {item.pickupLocation}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => onClaim(item.id)}
                    className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-bold hover:bg-slate-800 transition shadow-sm"
                  >
                    Claim Donation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {myClaims.length > 0 && (
        <div className="pt-8 border-t border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Your Ongoing Claims</h3>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="px-6 py-4">Food Item</th>
                  <th className="px-6 py-4">Donor</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Pickup Point</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {myClaims.map(claim => (
                  <tr key={claim.id}>
                    <td className="px-6 py-4 font-semibold text-slate-800">{claim.title}</td>
                    <td className="px-6 py-4">{claim.donorName}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        claim.status === 'CLAIMED' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {claim.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500">{claim.pickupLocation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
