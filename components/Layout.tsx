
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
  isMobile: boolean;
  hideNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onLogout, isMobile, hideNav }) => {
  if (hideNav) return <>{children}</>;

  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#122C34] text-white pb-20">
        {children}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    );
  }

  // Desktop/TV Layout
  return (
    <div className="min-h-screen bg-[#122C34] text-white flex overflow-hidden">
      {/* Sidebar Fixed to Left */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      
      {/* Main Content - pl-[100px] to match collapsed sidebar width */}
      <main className="flex-1 md:pl-[100px] transition-all duration-300 w-full relative z-0 overflow-y-auto h-screen hide-scrollbar">
        {children}
      </main>
    </div>
  );
};

export default Layout;
