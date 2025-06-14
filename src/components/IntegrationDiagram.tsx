
import React from 'react';

const IntegrationDiagram = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <svg viewBox="0 0 600 400" className="w-full h-auto">
        {/* Background connections */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                  refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
          </marker>
        </defs>
        
        {/* Left side tools */}
        {/* Google Drive */}
        <g transform="translate(50, 60)">
          <rect x="0" y="0" width="50" height="50" rx="8" fill="#4285F4" />
          <polygon points="15,15 35,15 35,20 40,25 40,35 15,35" fill="white" />
          <polygon points="15,20 30,20 35,25 20,25" fill="#34A853" />
          <polygon points="20,25 35,25 35,30 20,30" fill="#EA4335" />
        </g>
        
        {/* Notion */}
        <g transform="translate(50, 130)">
          <rect x="0" y="0" width="50" height="50" rx="8" fill="#000000" />
          <text x="25" y="32" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">N</text>
        </g>
        
        {/* Pager */}
        <g transform="translate(50, 200)">
          <rect x="0" y="0" width="50" height="50" rx="8" fill="#06D6A0" />
          <polygon points="15,15 35,15 35,35 15,35" fill="white" />
          <polygon points="20,20 30,20 30,30 20,30" fill="#06D6A0" />
        </g>
        
        {/* GitHub */}
        <g transform="translate(50, 270)">
          <rect x="0" y="0" width="50" height="50" rx="8" fill="#333333" />
          <circle cx="25" cy="25" r="12" fill="white" />
          <path d="M25,15 C19,15 14,20 14,26 C14,30.5 16.5,34.3 20.3,35.7 C20.8,35.8 21,35.5 21,35.2 L21,33.5 C18.5,34.1 17.9,32.2 17.9,32.2 C17.5,31.1 16.8,30.8 16.8,30.8 C15.8,30.2 16.9,30.2 16.9,30.2 C18,30.3 18.5,31.3 18.5,31.3 C19.5,32.9 21.2,32.4 21.1,32 C21.2,31.4 21.4,31 21.7,30.8 C19.4,30.5 17,29.6 17,25.8 C17,24.8 17.3,24 17.9,23.4 C17.8,23.1 17.4,22 18,20.6 C18,20.6 18.9,20.3 21,21.7 C21.9,21.5 22.9,21.4 24,21.4 C25.1,21.4 26.1,21.5 27,21.7 C29.1,20.2 30,20.6 30,20.6 C30.6,22 30.2,23.1 30.1,23.4 C30.7,24 31,24.8 31,25.8 C31,29.6 28.6,30.5 26.3,30.8 C26.7,31.1 27,31.7 27,32.6 L27,35.2 C27,35.5 27.2,35.8 27.7,35.7 C31.5,34.3 34,30.5 34,26 C34,20 29,15 25,15 Z" fill="#333333" />
        </g>
        
        {/* Slack */}
        <g transform="translate(50, 340)">
          <rect x="0" y="0" width="50" height="50" rx="8" fill="#4A154B" />
          <g transform="translate(12, 12)">
            <rect x="6" y="0" width="4" height="12" rx="2" fill="#36C5F0" />
            <rect x="6" y="14" width="4" height="12" rx="2" fill="#2EB67D" />
            <rect x="0" y="6" width="12" height="4" rx="2" fill="#ECB22E" />
            <rect x="14" y="6" width="12" height="4" rx="2" fill="#E01E5A" />
          </g>
        </g>
        
        {/* Central Hub */}
        <g transform="translate(275, 175)">
          <rect x="0" y="0" width="80" height="80" rx="16" fill="#3B82F6" />
          <text x="40" y="48" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">RHIA</text>
        </g>
        
        {/* Right side integrations */}
        {/* @engHelp */}
        <g transform="translate(480, 60)">
          <rect x="0" y="0" width="80" height="35" rx="17" fill="#E5E7EB" />
          <circle cx="20" cy="17" r="12" fill="#F59E0B" />
          <text x="35" y="22" fontSize="12" fill="#374151">@engHelp</text>
        </g>
        
        {/* @incidentsCopilot */}
        <g transform="translate(480, 130)">
          <rect x="0" y="0" width="100" height="35" rx="17" fill="#E5E7EB" />
          <circle cx="20" cy="17" r="12" fill="#DC2626" />
          <text x="35" y="22" fontSize="12" fill="#374151">@incidentsCopilot</text>
        </g>
        
        {/* @codeReview */}
        <g transform="translate(480, 200)">
          <rect x="0" y="0" width="95" height="35" rx="17" fill="#E5E7EB" />
          <circle cx="20" cy="17" r="12" fill="#3B82F6" />
          <text x="35" y="22" fontSize="12" fill="#374151">@codeReview</text>
        </g>
        
        {/* @code2Doc */}
        <g transform="translate(480, 270)">
          <rect x="0" y="0" width="90" height="35" rx="17" fill="#E5E7EB" />
          <circle cx="20" cy="17" r="12" fill="#F59E0B" />
          <text x="35" y="22" fontSize="12" fill="#374151">@code2Doc</text>
        </g>
        
        {/* Connection lines */}
        {/* Left to center */}
        <line x1="110" y1="85" x2="260" y2="200" stroke="#D1D5DB" strokeWidth="2" />
        <line x1="110" y1="155" x2="260" y2="210" stroke="#D1D5DB" strokeWidth="2" />
        <line x1="110" y1="225" x2="260" y2="220" stroke="#D1D5DB" strokeWidth="2" />
        <line x1="110" y1="295" x2="260" y2="230" stroke="#D1D5DB" strokeWidth="2" />
        <line x1="110" y1="365" x2="260" y2="240" stroke="#D1D5DB" strokeWidth="2" />
        
        {/* Center to right */}
        <line x1="365" y1="200" x2="470" y2="77" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="365" y1="210" x2="470" y2="147" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="365" y1="220" x2="470" y2="217" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="365" y1="230" x2="470" y2="287" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrowhead)" />
      </svg>
    </div>
  );
};

export default IntegrationDiagram;
