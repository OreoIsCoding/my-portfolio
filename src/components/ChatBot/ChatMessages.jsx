import React, { useEffect, useRef, useState } from 'react';
import TypingIndicator from './TypingIndicator';
import { FaRobot, FaUser, FaChevronDown } from 'react-icons/fa';

const ChatMessages = ({ messages, isLoading, onLinkClick }) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollButton(!isNearBottom);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //  message formatting
  const renderContent = (content) => {
    if (typeof content !== 'string') return content;

    const lines = content.split('\n');
    const formatted = [];
    let listBuffer = [];
    let sectionBuffer = [];

    const flushSection = () => {
      if (sectionBuffer.length > 0) {
        formatted.push(
          <div key={`section-${formatted.length}`} className="px-1 py-1.5 space-y-2">
            {sectionBuffer}
          </div>
        );
        sectionBuffer = [];
      }
    };

    const flushList = () => {
      if (listBuffer.length > 0) {
        sectionBuffer.push(
          <ul key={`list-${sectionBuffer.length}`} className="space-y-2 pl-1">
            {listBuffer.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-emerald-400 mt-1 flex-shrink-0">•</span>
                <span className="text-gray-200">{renderLinks(item)}</span>
              </li>
            ))}
          </ul>
        );
        listBuffer = [];
      }
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      
      // Handle empty lines as section breaks
      if (!trimmed) {
        flushList();
        flushSection();
        return;
      }

      // Handle headings (lines ending with ':' without a value)
      if (trimmed.match(/^[A-Za-z0-9 ]+:$/)) {
        flushList();
        sectionBuffer.push(
          <h3 key={`heading-${idx}`} className="text-emerald-400 font-medium text-[1.05rem] mt-3 mb-2">
            {trimmed.slice(0, -1)}
          </h3>
        );
        return;
      }

      // Handle label-value pairs
      const labelMatch = trimmed.match(/^([A-Za-z0-9 .,'\-\/()]+):\s*(.+)$/);
      if (labelMatch) {
        flushList();
        const [, label, value] = labelMatch;
        sectionBuffer.push(
          <div key={`detail-${idx}`} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/30">
            <div className="text-emerald-400/90 font-medium mb-1.5">{label}</div>
            <div className="text-gray-200 leading-relaxed">{renderLinks(value)}</div>
          </div>
        );
        return;
      }

      // Handle list items
      if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
        listBuffer.push(trimmed.replace(/^[-•]\s*/, ''));
        return;
      }

      // Handle regular paragraphs
      flushList();
      sectionBuffer.push(
        <p key={`text-${idx}`} className="text-gray-200 leading-relaxed">
          {renderLinks(trimmed)}
        </p>
      );
    });

    flushList();
    flushSection();
    return formatted;
  };

  // Update the renderLinks function
  const renderLinks = (text) => {
    if (typeof text !== 'string') return text;
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;

    text.replace(markdownLinkRegex, (match, linkText, url, offset) => {
      if (offset > lastIndex) {
        parts.push(text.substring(lastIndex, offset));
      }
      parts.push(
        <a
          key={offset}
          href={url}
          onClick={(e) => {
            e.preventDefault();
            if (onLinkClick) onLinkClick(url);
          }}
          className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 
            transition-colors font-medium hover:underline cursor-pointer bg-emerald-500/10 
            px-2 py-0.5 rounded"
          title={url}
        >
          {linkText}
        </a>
      );
      lastIndex = offset + match.length;
      return match;
    });

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    return parts.length > 0 ? parts : text;
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-[calc(100%-8.5rem)] overflow-y-auto p-2 sm:p-4 space-y-2 bg-gray-950 relative flex flex-col"
      style={{ scrollbarWidth: 'thin', scrollbarColor: '#222 #18181b' }}
    >
      {messages.map((message, i) => (
        <div
          key={i}
          className={`
            flex items-end
            ${message.role === 'user' ? 'justify-end' : 'justify-start'}
            w-full
          `}
        >
          {/* Avatar only for assistant, like Messenger */}
          {message.role !== 'user' && (
            <div className="flex-shrink-0 mr-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-800 flex items-center justify-center">
                <FaRobot className="text-white text-xs sm:text-sm" />
              </div>
            </div>
          )}
          <div className={`
            max-w-[85vw] sm:max-w-[65vw] md:max-w-[45vw] lg:max-w-[35vw] xl:max-w-[28vw]
            rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3
            ${message.role === 'user'
              ? 'bg-emerald-500 text-white rounded-br-none rounded-tr-2xl rounded-tl-2xl ml-auto'
              : 'bg-gray-800/80 text-white/95 rounded-bl-2xl rounded-tr-2xl rounded-tl-2xl border border-gray-700/50'}
            font-sans text-[0.9rem] sm:text-[0.95rem] leading-relaxed
            break-words w-fit
            backdrop-blur-sm
            shadow-lg
            transition-all
          `}
            style={{
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            <div className="w-full break-words">
              {message.role === 'assistant' ? (
                <div className="space-y-2">
                  {renderContent(message.content)}
                </div>
              ) : (
                <div className="text-white/95">
                  {message.content}
                </div>
              )}
            </div>
          </div>
          {/* Avatar for user*/}
          {message.role === 'user' && (
            <div className="flex-shrink-0 ml-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                <FaUser className="text-white text-xs sm:text-sm" />
              </div>
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex items-end justify-start">
          <div className="flex-shrink-0 mr-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-800 flex items-center justify-center">
              <FaRobot className="text-white text-xs sm:text-sm" />
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl rounded-bl-2xl rounded-tr-2xl rounded-tl-2xl border border-gray-800 p-3 max-w-[85vw] sm:max-w-[65vw] md:max-w-[45vw] lg:max-w-[35vw] xl:max-w-[28vw]">
            <TypingIndicator />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 p-2
            bg-black/10 hover:bg-black/20 backdrop-blur
            rounded-full shadow-lg transition-all duration-200
            flex items-center gap-1.5 z-50 cursor-pointer
            border border-white/10 hover:border-white/20
            animate-bounce"
          title="New messages"
        >
          <FaChevronDown className="text-white text-xs" />
        </button>
      )}
    </div>
  );
};

export default ChatMessages;
