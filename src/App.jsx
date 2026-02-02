import React, { useEffect, useState } from 'react';

const API_URL = "https://voter-app-yxz4.onrender.com/health";
const FIVE_MINUTES = 5 * 60 * 1000; // 300,000 milliseconds

function HealthMonitor() {
  const [status, setStatus] = useState("Initializing...");

  const hitHealthApi = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        console.log(`Health check successful at ${new Date().toLocaleTimeString()}`);
        setStatus("Backend is Active");
      } else {
        setStatus("Backend returned error");
      }
    } catch (error) {
      console.error("Health check failed:", error);
      setStatus("Backend Unreachable");
    }
  };

  useEffect(() => {
    // 1. Hit the API immediately on component mount
    hitHealthApi();

    // 2. Set up the interval to hit every 5 minutes
    const intervalId = setInterval(hitHealthApi, FIVE_MINUTES);

    // 3. Cleanup: Clear interval if the component unmounts 
    // to prevent memory leaks or multiple timers
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>System Monitor</h3>
      <p>Target: <code>{API_URL}</code></p>
      <p>Current Status: <strong>{status}</strong></p>
      <small>Last checked: {new Date().toLocaleTimeString()}</small>
    </div>
  );
}

export default HealthMonitor;