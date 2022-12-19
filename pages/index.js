import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

import { fetchHospitalList } from '../store/hospital-list-actions';

export default function Home() {
  const dispatch = useDispatch();
  const hospitalList = useSelector(state => state.hospitalList.hospitalList);
  
  useEffect(() => {
    dispatch(fetchHospitalList());
  }, [dispatch])

  return (
    <Fragment>
      {hospitalList && hospitalList.map((hospital) => (
        <div key={hospital.id} >
          <Link href={`/hospitals/${hospital.id}`}>{hospital.name}</Link>
        </div>
      ))}
    </Fragment>
    
    
  )
}