import { useState, useEffect } from 'react';


const useFetch = <T,>(url: string, options?: object) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options || {}); 
      if (!response.ok) {
        throw new Error('Error cargando los datos');
      }
      const result = await response.json();
      setData(result); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    fetchData()
  }, [url])



  return { data, isLoading, error };
}

export default useFetch;