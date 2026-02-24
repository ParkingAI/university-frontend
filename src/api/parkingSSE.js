import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const useParkingSSE = (cityId) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!cityId) return;

    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_URL}/parking-sse/${cityId}`
      
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        queryClient.setQueryData(["parkings", cityId], data);
      } catch (err) {
        console.error('SSE parse error:', err);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [cityId, queryClient]);
};

export default useParkingSSE;
