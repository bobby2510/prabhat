import React,{useState} from 'react' 
import { useNavigate } from 'react-router-dom' 
import NavBarTwo from '../navbar/NavBarTwo'
import GenericFooter from '../footer/GenericFooter';
import {MdSouth} from 'react-icons/md'
import { toast } from 'react-toastify';




const CreditRange = (props)=>{
    let [minimum,setMinimum] = useState(props.leftRange)
    let [maximum,setMaximum] = useState(props.rightRange)

    let handleInput = (e)=>{
        if(e.target.name === 'minimum')
            setMinimum(e.target.value)
        else if(e.target.name === 'maximum')
            setMaximum(e.target.value)
    }
    let handleCredit = ()=>{
        if(minimum>maximum || minimum > 100 || maximum >100)
        {
            toast.error('Enter Valid Credit Range',{
                position:"top-center"
            });
            return
        }
        props.setLeftRange(minimum)
        props.setRightRange(maximum)
        navigate('/combination')
        
    }
    let navigate = useNavigate()
    return (
        <React.Fragment>
        <NavBarTwo navigate={navigate} /> 
        <div className='mini-big-container'>
        <div className="section-info">
            <span className='section-primary'>Credit Range</span>
            <span className='section-secondary'>Give credit range to creat teams within that range of credits</span>
            <span className='section-secondary'>Ideal Range will be <span style={{color:'black',fontWeight:500}}>97 - 100 credtis</span></span>
        </div>
        <div className='credit-container'>
            <input className='credit-item' type="number" onChange={handleInput} name="minimum" placeholder='minimum team credits' value={minimum} />
                <MdSouth size={24} />
            <input className='credit-item' type="number" onChange={handleInput} name="maximum" placeholder='maximum team credits' value={maximum} />
            <button onClick={()=> handleCredit() } className='btn btn-primary credit-item'>Continue</button>
        </div>
        </div>
        <GenericFooter />
        </React.Fragment>
    );
}

export default CreditRange;


