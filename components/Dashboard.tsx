import React, { useState, useEffect } from 'react';
import { UserData } from '../types';
import { Button } from './Button';
import { NotificationToast } from './NotificationToast';

interface DashboardProps {
  userData: UserData;
  onActivate: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ userData, onActivate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [isForced, setIsForced] = useState(false);
  const isActivated = userData.isActivated || false;

  // Auto-trigger Activation Modal after 5 seconds if not activated
  useEffect(() => {
    if (!isActivated) {
      const timer = setTimeout(() => {
        setShowActivateModal(true);
        setIsForced(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isActivated]);

  const handleProtectedAction = () => {
    if (!isActivated) {
      setShowActivateModal(true);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans relative overflow-x-hidden">
      <NotificationToast type="ACTIVATE" />

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 transition-opacity"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-[280px] bg-[#FDFBF7] z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl overflow-y-auto`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-10">
            <svg className="w-8 h-8 text-[#11332E]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 8h16v2H4V8zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
            </svg>
            <span className="text-2xl font-bold text-[#11332E]">Stream</span>
          </div>

          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-4 px-4 py-3 bg-[#11332E] text-white rounded-lg">
              <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              <span className="font-medium">Dashboard</span>
            </a>
            {[
              { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />, label: 'Stream Box' },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />, label: 'Stream Partners' },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />, label: 'Tiktok Creators Network' },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />, label: 'Income Log' },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />, label: 'StreamPass' },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />, label: 'Withdrawal' },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />, label: 'WishHub' },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />, label: 'Marketplace' },
              { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />, label: 'Skills Centre' },
              { icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>, label: 'Settings' },
            ].map((item, idx) => (
              <a key={idx} href="#" onClick={handleProtectedAction} className="flex items-center gap-4 px-4 py-3 text-[#11332E]/70 hover:bg-[#11332E]/5 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Top Bar */}
      <header className="px-6 pt-12 pb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <svg className="w-8 h-8 text-[#11332E]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 8h16v2H4V8zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
          </svg>
          <span className="text-2xl font-bold text-[#11332E]">Stream</span>
        </div>
        <button onClick={toggleSidebar} className="p-2 text-[#11332E]">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      <main className="px-4 pb-24 space-y-6">
        {/* User Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex justify-between items-center">
          <div>
            <h2 className="text-[#11332E] font-bold text-lg">Dashboard</h2>
            <p className="text-gray-400 text-xs uppercase tracking-wider">Welcome {userData.username}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1">
                <div className="w-4 h-3 bg-green-600 rounded-sm overflow-hidden flex">
                  <div className="w-1/3 h-full bg-green-600"></div>
                  <div className="w-1/3 h-full bg-white"></div>
                  <div className="w-1/3 h-full bg-green-600"></div>
                </div>
              </div>
              <span className="text-[10px] text-gray-500 font-medium">PREMIUM</span>
              <div className="flex items-center gap-1 text-xs font-bold text-[#11332E]">
                USD <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Stacked Wallet Cards */}
        <div className="relative pt-8 pb-4">
          {/* Top Card (Back) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-24 bg-[#9B8B62] rounded-t-3xl rounded-b-xl px-6 py-4 shadow-sm opacity-90">
            <div className="flex justify-between items-center text-white/90">
              <span className="text-xs font-bold tracking-wider">COLLABORATION EARNINGS</span>
              <span className="font-bold">$0.00</span>
            </div>
          </div>

          {/* Middle Card (Middle) */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[92%] h-24 bg-[#A4B5C4] rounded-t-3xl rounded-b-xl px-6 py-4 shadow-sm z-10">
            <div className="flex justify-between items-center text-white/90">
              <span className="text-xs font-bold tracking-wider">PARTNER EARNINGS</span>
              <span className="font-bold">$0.00</span>
            </div>
          </div>

          {/* Bottom Card (Front) */}
          <div className="relative w-full bg-[#11332E] rounded-3xl p-6 shadow-xl z-20 mt-8 min-h-[180px] flex flex-col justify-between overflow-hidden">
            {/* Decorative waves */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,100 C150,200 250,0 400,100 L400,200 L0,200 Z" fill="#ffffff" />
                <path d="M0,150 C100,50 300,250 400,150 L400,200 L0,200 Z" fill="#ffffff" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <p className="text-white/80 text-sm font-bold tracking-wider mb-2">TOTAL STREAM INCOME</p>
              <h2 className="text-4xl font-bold text-white tracking-tight">$12.00</h2>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6 relative z-10">
              <button 
                onClick={onActivate} 
                className="bg-[#10b981] text-white py-3 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-transform"
              >
                Activate
              </button>
              <button 
                onClick={handleProtectedAction} 
                className="bg-white/10 text-white py-3 rounded-xl font-bold text-sm border border-white/20 hover:bg-white/20 active:scale-95 transition-transform"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Music Player Card */}
        <div className="bg-[#275236] rounded-3xl p-5 relative overflow-hidden shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-1 text-white/80 text-xs font-bold">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.434-5.305-1.76-8.786-.963-.335.077-.67-.133-.746-.47-.077-.334.132-.67.47-.745 3.808-.87 7.076-.496 9.712 1.115.293.18.386.563.207.856zm1.226-2.738c-.226.367-.706.482-1.072.257-2.687-1.652-6.785-2.13-9.965-1.166-.413.127-.848-.106-.973-.517-.125-.413.108-.848.52-.973 3.632-1.1 8.133-.563 11.234 1.34.366.224.48.705.256 1.06zm.105-2.862C14.692 8.9 9.375 8.675 5.46 9.863c-.495.15-1.015-.13-1.166-.624-.15-.495.13-1.014.624-1.165 4.523-1.37 10.42-.11 14.125 2.09.445.264.59.838.327 1.282-.265.443-.838.59-1.282.326z"/>
              </svg>
              Spotify
            </div>
            <span className="text-white/60 text-[10px] font-bold tracking-widest uppercase">TODAY STR...</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/20 shrink-0">
              <img src="https://picsum.photos/seed/snoop/100/100" alt="Album Art" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg leading-tight">Awake</h3>
              <p className="text-white/70 text-sm">Snoop Dogg</p>
              
              <div className="mt-3 flex items-center gap-2">
                <span className="text-white/60 text-[10px] font-mono">01:34</span>
                <div className="flex-1 h-1 bg-black/20 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-[#10b981] rounded-full"></div>
                </div>
                <span className="text-white/60 text-[10px] font-mono">03:04</span>
              </div>
            </div>
            <button onClick={handleProtectedAction} className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white shrink-0 active:scale-95 transition-transform">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
            </button>
          </div>
        </div>

        {/* Bottom Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div onClick={handleProtectedAction} className="h-40 rounded-3xl overflow-hidden relative group cursor-pointer">
            <img src="https://picsum.photos/seed/experience/200/300" alt="Experience" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-bold leading-tight">Experience<br/>The Feeling</h3>
              <p className="text-white/60 text-[10px] mt-1">Explore and earn</p>
            </div>
          </div>
          <div onClick={handleProtectedAction} className="h-40 rounded-3xl overflow-hidden relative group cursor-pointer">
            <img src="https://picsum.photos/seed/journey/200/300" alt="Journey" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#e11d48]/80 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white/90 text-[10px] font-medium leading-tight">An Adventurous Journey<br/>into the unknown</p>
            </div>
          </div>
        </div>
      </main>

      {/* Activation Modal */}
      {showActivateModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
           <div 
             className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500" 
             onClick={() => !isForced && setShowActivateModal(false)}
           ></div>
           
           <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl relative animate-in fade-in zoom-in duration-300">
              {!isForced && (
                <button onClick={() => setShowActivateModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              )}
              
              <div className="w-16 h-16 bg-[#10b981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
              <h3 className="text-xl font-bold text-[#11332E] text-center mb-2">Activate Account</h3>
              <p className="text-gray-500 text-center text-sm mb-6">
                You currently have a $12.00 balance. To withdraw funds and access all premium features, please complete your one-time activation.
              </p>
              <Button onClick={onActivate} fullWidth className="py-3 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl shadow-lg shadow-[#10b981]/20">
                Activate Now - $12.00
              </Button>
           </div>
        </div>
      )}
    </div>
  );
};
