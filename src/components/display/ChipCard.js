import React,{useEffect,useState} from 'react' 
import './filter.css'
import {MdClose} from 'react-icons/md'

const ChipCard = (props)=>{
        let [first,setFirst]=useState('')
        let [second,setSecond] = useState('')
    useEffect(()=>{
       // console.log(props.filter)
        if(props.filter.p_type === 0)
            setFirst('point')
        else 
            setFirst('leverage')
        if(props.filter.f_type === 0)
            setSecond('less')
        else if(props.filter.f_type === 1)
            setSecond('between')
        else 
            setSecond('greater')
    },[props.filterArray])
    let handleClose = ()=>{
        let temp = [...props.filterArray]
        temp.splice(props.index,1)
        console.log(temp)
        props.setFilterArray(temp)
    }
    return (
        <React.Fragment>
            <div className='chip-card'>
               {`${first} | ${second}`} &nbsp; &nbsp;
                <MdClose onClick={()=> handleClose()} style={{color:'red'}} size={20} />
            </div>
        </React.Fragment>
    );
}

export default ChipCard;