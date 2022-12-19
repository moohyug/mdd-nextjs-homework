import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { fetchHospitalList } from '../store/hospital-list-actions';

export default function Home() {
  const dispatch = useDispatch();
  const hospitalList = useSelector(state => state.hospitalList.hospitalList);
  
  useEffect(() => {
    dispatch(fetchHospitalList());
  }, [dispatch])

  return (
    <Fragment>
      <div>Wow!</div>
      {hospitalList && hospitalList.map((hospital) => (
        <div>1</div>
      ))}
    </Fragment>
    
    
  )
}