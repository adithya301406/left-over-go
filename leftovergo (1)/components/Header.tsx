
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const getRoleLabel = (role: string) => {
    switch(role) {
      case 'RECEIVER': return 'Receiver';
      case 'DELIVERY': return 'Delivery Partner';
      default: return 'Food Donor';
    }
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-slate-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-6xl">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FC8019] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-orange-500/20">L</div>
            <span className="text-2xl font-black text-slate-900 tracking-tighter">LeftOverGo</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-slate-500">
            <a href="#" className="text-[#FC8019]">Dashboard</a>
            <a href="#" className="hover:text-slate-900 transition">History</a>
            <a href="#" className="hover:text-slate-900 transition">Analytics</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-black text-slate-900">{user.name}</p>
            <p className="text-[10px] font-black text-[#FC8019] uppercase tracking-widest">{getRoleLabel(user.role)}</p>
          </div>
          <div className="h-10 w-[1px] bg-slate-100 mx-2"></div>
          <button 
            onClick={onLogout}
            className="group relative p-2 text-slate-400 hover:text-[#FC8019] transition-colors"
          >
            <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};