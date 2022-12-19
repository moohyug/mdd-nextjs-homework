import { hospitalListActions } from './hospital-list-slice';

const ACCESS_TOKEN = 'WOttAMeBZi2yR3XImaEzIOCqrDBD9k';

export const fetchHospitalList = () => {
    return async dispatch => {
        const fetchHospitalListData = async () => {
            const response = await fetch('https://recruit.modoodoc.com/hospitals/', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${ACCESS_TOKEN}`
              }
            });
      
            if (!response.ok) {
              console.log('NOT OK!');
            }
      
            const data = await response.json();
      
            return data;
        }
      
        try {
            const hospitalListData = await fetchHospitalListData();
            dispatch(hospitalListActions.replaceHospitalList(hospitalListData));
    
            console.log("hospitalListData!")
            console.log(hospitalListData);
        } catch (error) {
            console.log('ERROR!');
            console.log(error);
        }
    }
}