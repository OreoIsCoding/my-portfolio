import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { ref, onValue, onDisconnect, set, increment } from 'firebase/database';
import { FaEye } from 'react-icons/fa';

const VisitorCounter = () => {
  const [activeViewers, setActiveViewers] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const presenceRef = ref(db, 'presence');
    const viewersRef = ref(db, 'viewers');
    
    // Add viewer on connect
    const myConnectionRef = ref(db, `presence/${Date.now()}`);
    set(myConnectionRef, true);
    
    // Remove viewer on disconnect
    onDisconnect(myConnectionRef).remove();
    onDisconnect(viewersRef).set(increment(-1));
    
    // Update viewer count
    set(viewersRef, increment(1));

    // Listen for active viewers count
    const unsubscribe = onValue(presenceRef, (snapshot) => {
      const viewers = snapshot.size || 0;
      setActiveViewers(viewers);
    });

    return () => {
      unsubscribe();
      set(myConnectionRef, null);
      set(viewersRef, increment(-1));
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="group flex items-center gap-2 px-3 py-2 bg-black/80 backdrop-blur-sm rounded-full
        border border-white/10 text-white/80 hover:bg-black/90 transition-all duration-300 cursor-pointer">
        <FaEye className="text-emerald-400 text-xs" />
        <span className="text-xs font-medium">{activeViewers}</span>
        <span className="text-xs font-medium overflow-hidden transition-all duration-300 max-w-0 group-hover:max-w-[4rem] opacity-0 group-hover:opacity-100">
          Viewing
        </span>
      </div>
    </div>
  );
};

export default VisitorCounter;
