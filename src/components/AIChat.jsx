import { useState } from 'react';
import { MessageCircle, Send, Mic } from 'lucide-react';

export function AIChat({ waitTimes }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! Ask about wait times or directions", avatar: '🤖' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = { role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = "Food: " + waitTimes.food + "min | Restrooms: " + waitTimes.restroom + "min";
      
      if (lowerInput.includes('food')) response = `🍔 Gate 7: ${waitTimes.food}min (180m)`;
      if (lowerInput.includes('bathroom') || lowerInput.includes('restroom')) response = `🚻 Gate 3: ${waitTimes.restroom}min (90m)`;
      if (lowerInput.includes('beer') || lowerInput.includes('drink')) response = `🍺 Section 12: ${waitTimes.concessions}min`;
      
      setMessages(prev => [...prev, { role: 'ai', text: response, avatar: '🤖' }]);
      setIsTyping(false);
      
      // Keep only last 4 messages
      if (messages.length > 6) {
        setMessages(prev => prev.slice(-4));
      }
    }, 800);
  };

  const handleKeyPress = (e) => e.key === 'Enter' && sendMessage();

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '340px',
      maxWidth: '85vw',
      zIndex: 100,
      height: '420px'  // ← FIXED HEIGHT
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(25px)',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
        border: '1px solid rgba(255,255,255,0.3)',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Compact Header */}
        <div style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.95rem'
        }}>
          <MessageCircle style={{width: '20px', height: '20px', color: 'white'}} />
          <span style={{color: 'white', fontWeight: '700'}}>AI Assistant</span>
        </div>

        {/* Compact Messages - Fixed Height */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          background: '#f8fafc',
          minHeight: '240px'
        }}>
          {messages.slice(-4).map((msg, i) => (  // Show only last 4
            <div 
              key={i}
              style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '12px',
                justifyContent: msg.role === 'ai' ? 'flex-start' : 'flex-end',
                fontSize: '0.9rem'
              }}
            >
              {msg.role === 'ai' && (
                <div style={{
                  width: '28px', height: '28px',
                  borderRadius: '50%', 
                  background: '#6366f1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', color: 'white', flexShrink: 0
                }}>
                  🤖
                </div>
              )}
              <div style={{
                maxWidth: '220px',
                padding: '10px 14px',
                borderRadius: '16px',
                background: msg.role === 'ai' ? '#e2e8f0' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: msg.role === 'ai' ? '#374151' : 'white',
                lineHeight: '1.4',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                {msg.text}
              </div>
              {msg.role === 'user' && (
                <div style={{
                  width: '28px', height: '28px',
                  borderRadius: '50%', 
                  background: '#3b82f6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0
                }}>
                  👤
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div style={{display: 'flex', gap: '8px', justifyContent: 'flex-start', padding: '8px 0'}}>
              <div style={{
                width: '28px', height: '28px',
                borderRadius: '50%', background: '#6366f1',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                🤖
              </div>
              <div style={{
                padding: '8px 12px', borderRadius: '16px',
                background: '#e2e8f0', color: '#6b7280', fontSize: '0.9rem'
              }}>
                Typing...
              </div>
            </div>
          )}
        </div>

        {/* Compact Input */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid #e5e7eb',
          background: 'white'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#f9fafb',
            borderRadius: '20px',
            padding: '10px 16px',
            border: '2px solid #e5e7eb'
          }}>
            <Mic style={{width: '18px', height: '18px', color: '#9ca3af'}} />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type message..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '0.9rem',
                background: 'transparent',
                color: '#374151',
                padding: '4px 0'
              }}
              maxLength={100}
            />
            <Send 
              style={{width: '20px', height: '20px', color: input ? '#6366f1' : '#d1d5db'}}
              onClick={sendMessage}
              cursor={input ? 'pointer' : 'default'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
