import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Users, MessageCircle, Navigation2, X } from 'lucide-react';
import { Loader } from './components/Loader';
import { Heatmap } from './components/Heatmap';
import { AIChat } from './components/AIChat';

function App() {
  const [location, setLocation] = useState(null);
  const [waitTimes, setWaitTimes] = useState({
    food: 4, concessions: 8, restroom: 2, entry: 6
  });
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    setLocation({ lat: 40.7505, lng: -73.9934, section: "Section 112" });
    
    const interval = setInterval(() => {
      setWaitTimes({
        food: Math.floor(Math.random() * 8) + 2,
        concessions: Math.floor(Math.random() * 10) + 3,
        restroom: Math.floor(Math.random() * 5) + 1,
        entry: Math.floor(Math.random() * 7) + 2
      });
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const getSmartRecommendation = () => {
    const options = [
      { place: 'Hot Dogs - Gate 7', wait: waitTimes.food, distance: '180m' },
      { place: 'Beer - Section 12', wait: waitTimes.concessions, distance: '220m' },
      { place: 'Restroom - Gate 3', wait: waitTimes.restroom, distance: '90m' }
    ];
    return options.sort((a, b) => a.wait - b.wait)[0];
  };

  const rec = getSmartRecommendation();

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1>VenueFlow AI</h1>
        <p>Smart Stadium Navigation Assistant</p>
      </div>

      {/* Main Content */}
      {location && (
        <div className="card">
          {/* Location */}
          <div className="location">
            <MapPin style={{width: '50px', height: '50px', opacity: 0.8}} />
            <div>
              <div style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '5px'}}>
                {location.section}
              </div>
              <div style={{color: '#93c5fd', fontSize: '1.1rem'}}>
                Real-time location active
              </div>
            </div>
          </div>

          {/* Wait Times Grid */}
          <div className="grid">
            <div className="wait-card">
              <Users className="wait-icon" />
              <div className="wait-time">{waitTimes.food}min</div>
              <div className="wait-label">Food</div>
            </div>
            <div className="wait-card">
              <Clock className="wait-icon" />
              <div className="wait-time">{waitTimes.concessions}min</div>
              <div className="wait-label">Concessions</div>
            </div>
            <div className="wait-card">
              <Users className="wait-icon" />
              <div className="wait-time">{waitTimes.restroom}min</div>
              <div className="wait-label">Restrooms</div>
            </div>
            <div className="wait-card">
              <MapPin className="wait-icon" />
              <div className="wait-time">{waitTimes.entry}min</div>
              <div className="wait-label">Entry Gates</div>
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="recommendation">
            <h3>
              AI Recommendation
              <span style={{
                background: 'rgba(34,197,94,0.3)',
                padding: '10px 20px',
                borderRadius: '25px',
                border: '1px solid rgba(34,197,94,0.5)',
                marginLeft: '20px',
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}>
                {rec.wait} min wait
              </span>
            </h3>
            <div style={{display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '30px', alignItems: 'center', marginTop: '30px'}}>
              <div style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#10b981'}}>
                {rec.place}
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2.5rem', fontWeight: '900', color: '#059669'}}>
                  {rec.distance}
                </div>
                <div style={{opacity: 0.9}}>Distance</div>
              </div>
              <div style={{color: '#6ee7b7', fontSize: '1.2rem'}}>
                Optimal route to Gate 3
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="btn-grid">
        <div className="btn" onClick={() => setShowMap(true)} style={{cursor: 'pointer'}}>
          <div className="btn-icon">
            <Navigation2 style={{width: '45px', height: '45px'}} />
          </div>
          <h4>Navigate</h4>
          <div style={{fontSize: '0.95rem', opacity: 0.8}}>Crowd avoidance</div>
        </div>
        <div className="btn" style={{cursor: 'pointer', opacity: 0.7}}>
          <div className="btn-icon">
            <MessageCircle style={{width: '45px', height: '45px'}} />
          </div>
          <h4>AI Assistant</h4>
          <div style={{fontSize: '0.95rem', opacity: 0.8}}>Voice commands</div>
        </div>
        <div className="btn" style={{opacity: 0.5, cursor: 'not-allowed'}}>
          <div className="btn-icon">
            <Users style={{width: '45px', height: '45px'}} />
          </div>
          <h4>Find Friends</h4>
          <div style={{fontSize: '0.95rem', opacity: 0.8}}>Group sync</div>
        </div>
        <div className="btn" style={{opacity: 0.5, cursor: 'not-allowed'}}>
          <div className="btn-icon">
            <Clock style={{width: '45px', height: '45px'}} />
          </div>
          <h4>Schedule</h4>
          <div style={{fontSize: '0.95rem', opacity: 0.8}}>Event timing</div>
        </div>
      </div>

      {/* Map Modal */}
      {showMap && (
        <div className="modal" onClick={() => setShowMap(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{fontSize: '2rem', fontWeight: '900'}}>Live Navigation</h2>
              <div onClick={() => setShowMap(false)} style={{
                padding: '15px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '15px',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)'
              }}>
                <X style={{width: '24px', height: '24px'}} />
              </div>
            </div>
            <Heatmap location={location} />
          </div>
        </div>
      )}

      <AIChat waitTimes={waitTimes} />
      {!location && <Loader />}
      
      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '60px',
        opacity: 0.6,
        fontSize: '0.9rem'
      }}>
        VenueFlow AI - Stadium Experience Platform
      </div>
    </div>
  );
}

export default App;
