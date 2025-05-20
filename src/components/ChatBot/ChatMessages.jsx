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
    // Scroll to bottom on new messages
    scrollToBottom();
  }, [messages]);

  const renderContent = (content) => {
    if (typeof content !== 'string') return content;

    const paragraphs = content.split('\n').map((paragraph, index) => {
      // Handle main bullet points
      if (paragraph.trim().startsWith('• ')) {
        const [title, ...details] = paragraph.substring(2).split('\n');
        return (
          <div key={index} className="mb-4">
            <div className="flex items-start">
              <span className="text-emerald-400 mr-2">•</span>
              <span className="font-medium">{renderLinks(title)}</span>
            </div>
            <div className="ml-6 space-y-1">
              {details.map((detail, i) => {
                // Handle sub-bullet points
                if (detail.trim().startsWith('- ')) {
                  const [label, value] = detail.substring(2).split(': ');
                  return (
                    <div key={i} className="flex">
                      <span className="text-gray-400 min-w-[100px]">{label}:</span>
                      <span className="text-gray-200 ml-2">{renderLinks(value || '')}</span>
                    </div>
                  );
                }
                return (
                  <div key={i} className="text-gray-300">
                    {renderLinks(detail.trim())}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
      return paragraph.trim() && (
        <p key={index} className="mb-2">
          {renderLinks(paragraph)}
        </p>
      );
    });

    // Group bullet points into lists
    const formattedContent = [];
    let currentList = [];

    paragraphs.forEach((item, index) => {
      if (item?.type === 'li') {
        currentList.push(item);
      } else {
        if (currentList.length > 0) {
          formattedContent.push(
            <ul key={`list-${index}`} className="list-disc mb-2 space-y-1">
              {currentList}
            </ul>
          );
          currentList = [];
        }
        if (item) formattedContent.push(item);
      }
    });

    // Add remaining list items if any
    if (currentList.length > 0) {
      formattedContent.push(
        <ul key="list-final" className="list-disc mb-2 space-y-1">
          {currentList}
        </ul>
      );
    }

    return formattedContent;
  };

  const renderLinks = (text) => {
    if (typeof text !== 'string') return text;

    // Handle markdown-style links
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;

    text.replace(markdownLinkRegex, (match, linkText, url, offset) => {
      // Add text before the link
      if (offset > lastIndex) {
        parts.push(text.substring(lastIndex, offset));
      }

      // Add the formatted link
      parts.push(
        <a
          key={offset}
          href={url}
          onClick={(e) => {
            e.preventDefault();
            if (onLinkClick) onLinkClick(url);
          }}
          className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 
            transition-colors font-medium hover:underline cursor-pointer"
        >
          {linkText}
        </a>
      );

      lastIndex = offset + match.length;
      return match;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="h-[calc(100%-8.5rem)] overflow-y-auto p-4 space-y-6 bg-gray-950 relative"
    >
      {messages.map((message, i) => (
        <div
          key={i}
          className={`flex items-end gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center
            ${message.role === 'user' 
              ? 'bg-emerald-500' 
              : 'bg-gray-800'}`}
          >
            {message.role === 'user' 
              ? <FaUser className="text-white text-sm" />
              : <FaRobot className="text-white text-sm" />
            }
          </div>
          <div className={`max-w-[75%] rounded-2xl px-4 py-3
            ${message.role === 'user' 
              ? 'bg-emerald-500 text-white rounded-br-none' 
              : 'bg-gray-900 text-white/90 rounded-bl-none border border-gray-800'}
            font-sans text-[0.95rem] leading-relaxed shadow-lg`}
          >
            <div className="whitespace-pre-wrap break-words">
              {renderContent(message.content)}
            </div>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex items-end gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
            <FaRobot className="text-white text-sm" />
          </div>
          <div className="bg-gray-900 rounded-2xl rounded-bl-none border border-gray-800 p-4">
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
