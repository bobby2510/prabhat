import React,{useEffect,useState} from 'react' 
import './filter.css'
import {MdClose} from 'react-icons/md'

const SortChipCard = (props)=>{
        let [first,setFirst]=useState('')
        let [second,setSecond] = useState('')
    useEffect(()=>{
       // console.log(props.filter)
       console.log(props.sortStuff)
        if(props.sortStuff.p_type === 0)
            setFirst('point')
        else 
            setFirst('leverage')
        if(props.sortStuff.s_type === 0)
            setSecond('increasing')
        else 
            setSecond('decreasing')
    },[props.sortStuff])
    let handleClose = ()=>{
        props.setSortStuff(null)
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

export default SortChipCard;