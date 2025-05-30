import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaRedo } from 'react-icons/fa';
import { getResponse } from './responseHandler';
import ChatMessages from './ChatMessages';
import DraggableButton from './DraggableButton';

const WELCOME_GUIDE = `Hi! I'm Paul's chatbot assistant.

I can help you with:
• Projects & Portfolio
• Skills & Tech
• Experience & Education
• Contact Info

Just type your question!
What's your name?`;

const socialLinks = [
  { name: 'GitHub', href: "https://github.com/oreoiscoding", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
  { name: 'Facebook Profile', href: "https://facebook.com/dionisio001", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { name: 'Facebook Page', href: "https://facebook.com/oreocoding", icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  { name: 'Email', href: "mailto:pauldionisio137@gmail.com", icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm-16 12V8.99l7.99 7.99c.39.39 1.02.39 1.41 0L20 8.99V18H4z" },
  { name: 'Phone', href: "tel:+63961440896", icon: "M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" }
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    // Load saved messages from localStorage
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState(() => {
    // Load saved username from localStorage
    return localStorage.getItem('chatUserName') || '';
  });
  const [isGreeted, setIsGreeted] = useState(() => {
    // Check if user was already greeted
    return !!localStorage.getItem('chatUserName');
  });
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  

  // Save messages and user info when they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (userName) {
      localStorage.setItem('chatUserName', userName);
    }
  }, [userName]);

  // Update initial message to include guide
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: WELCOME_GUIDE
      }]);
    }
  }, [isOpen]);

  // Add effect to handle navigation menu button visibility
  useEffect(() => {
    const menuButton = document.querySelector('[data-nav-menu-button]');
    if (menuButton && isOpen) {
      menuButton.style.visibility = 'hidden';
      menuButton.style.opacity = '0';
    } else if (menuButton) {
      menuButton.style.visibility = 'visible';
      menuButton.style.opacity = '1';
    }
  }, [isOpen]);

  // Dispatch chat state changes
  useEffect(() => {
    const event = new CustomEvent("chatStateChange", { 
      detail: { isOpen } 
    });
    window.dispatchEvent(event);
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    const userMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!isGreeted) {
        // name extraction
        const namePatterns = {
          english: /^(?:i(?:'m| am)|call me|my name is)\s+(.+)/i,
          tagalog: /^(?:ako si|pangalan ko ay|pangalan ko si|tawag sakin)\s+(.+)/i
        };

        let name = userInput;
        for (const pattern of Object.values(namePatterns)) {
          const match = userInput.match(pattern);
          if (match) {
            // Extract just the name part, removing any prefix like "I'm"
            name = match[1].trim();
            break;
          }
        }

        // Remove common prefixes if still present
        name = name.replace(/^(?:i(?:'m| am)|call me|my name is|ako si|pangalan ko(?: ay| si)?|tawag sakin)\s+/i, '');
        
        setUserName(name);
        setIsGreeted(true);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Nice to meet you, ${name}! How can I help you today?`
        }]);
        setIsLoading(false);
        return;
      }

      const botResponse = await getResponse(userInput, userName);
      setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Sorry ${userName || 'there'}, I'm having trouble understanding right now.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([{
      role: 'assistant',
      content: WELCOME_GUIDE
    }]);
    setUserName('');
    setIsGreeted(false);
    localStorage.removeItem('chatUserName');
    localStorage.removeItem('chatMessages');
    setShowResetConfirm(false);
  };

  const handleLinkClick = (url) => {
    if (url.startsWith('#')) {
      // Internal navigation
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    } else {
      // External links
      window.open(url, '_blank');
    }
  };

  return (
    <>
      {/* Draggable button for both mobile and desktop */}
      <DraggableButton onClick={() => setIsOpen(true)} isVisible={!isOpen} />
      
      {/* Chat overlay for both mobile and desktop */}
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <div ref={chatWindowRef} 
            className="absolute inset-2 sm:inset-auto sm:right-4 sm:top-1/2 sm:-translate-y-1/2
              sm:w-[420px] sm:h-[600px] md:w-[450px] md:h-[650px] lg:w-[480px] lg:h-[700px]
              bg-gray-950 rounded-2xl shadow-2xl 
              border border-gray-800 overflow-hidden">
            {/* Header - Add close button for mobile */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900">
              <div className="flex items-center gap-2">
                <FaRobot className="text-emerald-400 text-lg" />
                <h3 className="text-white font-medium">Paul's Chat Assistant</h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="text-gray-400 hover:text-white transition-colors p-1.5"
                  title="Reset Chat"
                >
                  <FaRedo className="text-sm" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1.5"
                  title="Close Chat"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Messages Section - Existing ChatMessages component */}
            <ChatMessages 
              messages={messages} 
              isLoading={isLoading} 
              onLinkClick={handleLinkClick}
            />

            {/* Input Section - Update padding and sizing */}
            <div className="p-3 sm:p-4 border-t border-gray-800 bg-gray-900/95 backdrop-blur-sm">
              <div className="flex gap-2 sm:gap-3 items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-800/90 text-white text-sm sm:text-base
                    rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5
                    placeholder:text-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-emerald-500/40 border border-gray-700/50
                    shadow-inner transition-all duration-200
                    hover:border-gray-600/50 focus:border-emerald-500/50"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="p-3 sm:p-3.5 bg-emerald-500 text-white 
                    rounded-xl sm:rounded-2xl
                    hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200 shadow-lg hover:shadow-emerald-500/20
                    active:scale-95 disabled:scale-100 hover:-translate-y-0.5
                    disabled:hover:translate-y-0 flex-shrink-0"
                >
                  <FaPaperPlane className="text-sm sm:text-base" />
                </button>
              </div>
            </div>

            {/* Reset Confirmation Modal */}
            {showResetConfirm && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 shadow-xl max-w-[80%]">
                  <h4 className="text-white font-medium mb-3">Reset Chat?</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    This will clear all messages and start a new conversation.
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg
                        hover:bg-red-600 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reset confirmation modal */}
      {showResetConfirm && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 shadow-xl max-w-[80%]">
            <h4 className="text-white font-medium mb-3">Reset Chat?</h4>
            <p className="text-gray-300 text-sm mb-4">
              This will clear all messages and start a new conversation.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg
                  hover:bg-red-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
