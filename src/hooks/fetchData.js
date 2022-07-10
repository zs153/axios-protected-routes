import { useAuth } from "../../context/Auth";
import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = () => {
  const { user } = useAuth()
  const [fraudes, setFraudes] = useState([])
  const [loading, setLoading] = useState(true);

  const axiosJWT = axios.create(
    { baseURL: 'http://localhost:8100/api' },
  )

  useEffect(() => {
    const fraude = {
      userid: user.userId,
      stafra: 1,
    }
    const getFraudes = async () => {
      try {
        const result = await axiosJWT.post('/fraudes', {
          headers: { Authorization: 'Bearer ' + user.accessToken },
          fraude,
        })
        setFraudes(result.data)
      } catch (error) {
        console.log('Error', error)
      }
      setLoading(false);
    }

    getFraudes()
  }, []);

  return {
    fraudes,
    loading,
  };
};

export default useFetchData;