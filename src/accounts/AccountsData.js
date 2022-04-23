import React,{useState,useEffect} from 'react' 
import AccountTemplate from './AccountTemplate'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import NavBarFour from '../components/navbar/NavBarFour'
import GenericFooter from '../components/footer/GenericFooter'


const AccountsData = (props)=>{
    let [dataList,setDataList] = useState(null)
    let navigate = useNavigate()
    
    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return 
        }
        if(props.login === false)
        {
            navigate('/')
            return 
        }
        if(props.userRole !== 'superuser')
        {
            navigate('/')
            return
        }
        //call api here  
        let superuser_id = localStorage.getItem('tg_id')
        axios.get(`https://team-generation-api.herokuapp.com/api/auth/superuser/${superuser_id}`)
        .then(response =>{
            if(response.status === 200)
            {
                let data = response.data.data 
                setDataList(data)
            }
        })
    },[])
    return (
        <React.Fragment>
            <NavBarFour  navigate={navigate}  />
            <div className='mini-container' style={{padding:0}}>
                {dataList && dataList.length > 0 ? 
                    <AccountTemplate data= {dataList} registeredNumber={props.phoneNumber} />
                : null}
            </div>
            <GenericFooter /> 
        </React.Fragment>
    );
}

export default AccountsData;