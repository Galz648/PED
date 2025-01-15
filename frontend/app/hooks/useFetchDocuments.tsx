import { useEffect, useState } from 'react';

export const useFetchDocuments = (userId: string) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = window.location.origin; // Using window.location.origin to get the base URL
        const response = await fetch(`${apiUrl}/documents?userId=${userId}`);
        const data = await response.json();
        setDocuments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { documents, loading, error };
};

export default useFetchDocuments;
