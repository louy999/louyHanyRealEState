"use client";
import { getCookie } from "cookies-next/client";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const idToken = getCookie("token");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (idToken !== undefined) {
      const fetchAccessUser = async () => {
        setLoading(true);
        try {
          const res = await axios.get(`${process.env.local}/users/${idToken}`);
          console.log(res.data.data.access);

          if (res.data.data.access === false) {
            window.location.pathname = "/";
          } else {
            window.location.pathname = "/dash/offer";
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchAccessUser();
    } else {
      window.location.pathname = "login";
    }
  }, [idToken]);
  return <div>{loading === true ? <div>loading</div> : <div>dash</div>}</div>;
};

export default Dashboard;
