
import React, { useState } from 'react';
import { User, UserRole } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('DONOR');
  const [step, setStep] = useState<'DETAILS' | 'OTP'>('DETAILS');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const validatePhone = (p: string) => /^[789]\d{9}$/.test(p);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    if (!validatePhone(phone)) {
      setError('Please enter a valid 10-digit number starting with 7, 8, or 9');
      return;
    }

    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setError('');
    setStep('OTP');
    setTimeout(() => setShowPopup(true), 400);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      onLogin({
        id: Math.random().toString(36).substr(2, 9),
        phone,
        name,
        role
      });
    } else {
      setError('Incorrect OTP. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FC8019] p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/10 rounded-full blur-3xl"></div>

      {showPopup && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-white rounded-2xl shadow-2xl p-5 border-l-8 border-[#FC8019] flex items-center gap-5 min-w-[320px]">
            <div className="bg-orange-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-[#FC8019]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Incoming Message</p>
              <p className="text-slate-800 font-medium">Verification Code: <span className="text-xl font-black text-[#FC8019] tracking-tighter">{generatedOtp}</span></p>
            </div>
            <button onClick={() => setShowPopup(false)} className="ml-auto text-slate-300 hover:text-slate-500">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden relative z-10 transition-all duration-500 hover:shadow-orange-900/20">
        <div className="p-10">
          <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-[#FC8019] rounded-2xl mx-auto flex items-center justify-center text-white text-3xl font-black mb-4 shadow-lg shadow-orange-500/30">L</div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">LeftOverGo</h1>
            <p className="text-slate-500 text-sm mt-1">Order kindness, deliver smiles.</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-semibold mb-6 animate-shake border border-red-100 text-center">
              {error}
            </div>
          )}

          {step === 'DETAILS' ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#FC8019] focus:ring-0 transition-all outline-none"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">Phone Number</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-14 pr-5 py-4 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-[#FC8019] focus:ring-0 transition-all outline-none"
                    placeholder="7XXX XXX XXX"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider ml-1">I am joining as</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 'DONOR', label: 'Donor' },
                    { val: 'RECEIVER', label: 'Receiver' },
                    { val: 'DELIVERY', label: 'Partner' }
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setRole(item.val as UserRole)}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border-2 ${
                        role === item.val 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                          : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FC8019] text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-orange-500/40 hover:bg-[#e67316] transition-transform active:scale-95 uppercase tracking-widest mt-4"
              >
                Get Started
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-8">
              <div className="text-center">
                <p className="text-slate-500 mb-6">Enter the 4-digit code sent to<br/><span className="text-slate-900 font-bold">+91 {phone}</span></p>
                <input
                  type="text"
                  required
                  autoFocus
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center text-4xl tracking-[0.5em] font-black py-4 rounded-2xl bg-slate-50 border-transparent focus:border-[#FC8019] outline-none"
                  placeholder="0000"
                />
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  className="w-full bg-[#FC8019] text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-orange-500/40 hover:bg-[#e67316] transition"
                >
                  Verify OTP
                </button>
                <button
                  type="button"
                  onClick={() => setStep('DETAILS')}
                  className="w-full text-sm text-slate-400 hover:text-[#FC8019] font-bold transition"
                >
                  Change details
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};