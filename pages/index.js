import { useEffect } from "react";

const ACCESS_TOKEN = 'WOttAMeBZi2yR3XImaEzIOCqrDBD9k'

export default function Home() {

  const fetchHospitalList = async () => {
    const fetchHospitalListData = async () => {
      const response = await fetch('https://recruit.modoodoc.com/hospitals/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${ACCESS_TOKEN}`
        }
      });

      if (!response.ok) {

      }

      const data = await response.json();

      return data;
    }

    try {
      const hospitalListData = await fetchHospitalListData();
      console.log("hospitalListData!")
      console.log(hospitalListData);
    } catch (error) {

    }

  }

  useEffect(() => {
    fetchHospitalList();
  }, [fetchHospitalList])

  return (
    <div>Wow!</div>
  )
}