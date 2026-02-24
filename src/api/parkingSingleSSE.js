import { useState, useEffect } from 'react';

const useParkingSingleSSE = (parkingId) => {
  const [parkingData, setParkingData] = useState(null);

  useEffect(() => {
    if (!parkingId) return;

    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_URL}/parking-sse/parking/${parkingId}`
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const parking = data.find((p) => p.id === parkingId);
        if (parking) setParkingData(parking);
      } catch (err) {
        console.error('SSE parse error:', err);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
      setParkingData(null);
    };
  }, [parkingId]);

  return { parkingData };
};

export default useParkingSingleSSE;
