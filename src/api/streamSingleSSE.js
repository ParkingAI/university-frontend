import { useState, useEffect } from 'react';

const useStreamSingleSSE = (streamId) => {
  const [streamData, setStreamData] = useState(null);

  useEffect(() => {
    if (!streamId) return;

    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_URL}/stream-sse/${streamId}`
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setStreamData(data);
      } catch (err) {
        console.error('SSE parse error:', err);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
      setStreamData(null);
    };
  }, [streamId]);

  return { streamData };
};

export default useStreamSingleSSE;
