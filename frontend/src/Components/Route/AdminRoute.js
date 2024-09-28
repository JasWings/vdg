import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/auth';
import axios from 'axios';
import { Outlet, Navigate } from 'react-router-dom'; // Added Navigate for redirection
import Spinner from '../../Utils/Spinner';

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const { auth } = useAuth();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`${backendUrl}/auth/admindashboard`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`, // Added 'Bearer' prefix
          },
        });

        // Assuming your backend returns an 'ok' property
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setOk(false);
      }
    };


    if (auth?.token) {
      authCheck();
    } else {
      setOk(false);
    }
  }, [auth?.token, backendUrl]);

  
  if (!ok) {
    return <Spinner path='' />;
  }

  return <Outlet />;
}
