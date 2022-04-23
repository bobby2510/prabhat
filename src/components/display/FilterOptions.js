import React,{useState,useEffect} from 'react'
import './filter.css'
import {MdRemoveCircleOutline , MdAddCircleOutline } from 'react-icons/md'
import { toast } from 'react-toastify'


const FilterOptions= (props)=>{
    let [lessthan,setLessthan] = useState(null)
    let [greaterthan,setGreaterthan] = useState(null)
    let [left,setLeft] = useState(null)
    let [right,setRight] = useState(null)
    let [active,setActive] = useState([0,0,0])


    let handleLessthan = (e)=>{
        setLessthan(e.target.value)
    }
    let handleGreaterthan = (e)=>{
        setGreaterthan(e.target.value)
    }
    let handleLeft = (e)=>{
        setLeft(e.target.value)
    }
    let handleRight = (e)=>{
        setRight(e.target.value)
    }

    let handleActive = (index)=>{
        let new_list = [0,0,0]
        new_list[index]=1; 
        setActive(new_list)
    }
    let handleClick = (parameter_type,filter_type)=>{
        console.log(props.filterArray)
        console.log(parameter_type,filter_type)
        if(filter_type === 0)
        {
            if(lessthan !== null && lessthan !== '')
            {
                let new_temp = [...props.filterArray] 
                new_temp.push({
                    p_type: parameter_type,
                    f_type: filter_type, 
                    value: Number(lessthan)
                })
                props.setFilterArray(new_temp)
                setLessthan('')
               
            }
            else 
            {
                toast.error('Field cannot be empty!',{position:'top-center'})
                return
            }
        }
        else if(filter_type === 1)
        {
            if(left !== null && right!== null && left !=='' && right!== '')
            {
                let new_temp = [...props.filterArray] 
                new_temp.push({
                    p_type: parameter_type,
                    f_type: filter_type, 
                    left_value: Number(left),
                    right_value: Number(right)
                })
                props.setFilterArray(new_temp)
                setLeft('')
                setRight('')
               
            }
            else 
            {
                toast.error('Field cannot be empty!',{position:'top-center'})
                return
            }
        }
        else 
        {
            if(greaterthan !== null && greaterthan !== '')
            {
                let new_temp = [...props.filterArray] 
                new_temp.push({
                    p_type: parameter_type,
                    f_type: filter_type, 
                    value: Number(greaterthan)
                })
                props.setFilterArray(new_temp)
                setGreaterthan('')
                
            }
            else 
            {
                toast.error('Field cannot be empty!',{position:'top-center'})
                return
            }
        }
        setActive([0,0,0])
        return;
    }

    return (
        <React.Fragment>
            <div className="filter-options">
                <button onClick={()=> handleActive(0)} className='btn btn-sm btn-primary filter-button' style={{fontWeight:500}}>Less Than</button>
                <button onClick={()=> handleActive(1)} className='btn btn-sm btn-success filter-button' style={{fontWeight:500}}>In Between</button>
                <button onClick={()=> handleActive(2)} className='btn btn-sm filter-button' style={{color:'white',backgroundColor:'purple',fontWeight:500}}>Greater Than</button>
            </div>
            {/* Less Than */}
            {active.indexOf(1) === 0 ? 
            <div className='filter-type'>
                <h6>Less Than ? </h6>
                <input type="number" onChange={handleLessthan} className='filter-input' name="lessthan" value={lessthan} placeholder="Less than"></input>
                <button className='btn btn-sm btn-primary' onClick={()=> handleClick(props.type,0)} style={{fontWeight:500}}><MdAddCircleOutline size={18}/>&nbsp;add</button>
            </div>
            : null}
             {/* In Between */}
             {active.indexOf(1) === 1 ? 
             <div className='filter-type'>
                <h6>In Between ? </h6>
                <input type="number" onChange={handleLeft} className='filter-input-between' name="left" value={left} placeholder="from"></input>
                <input type="number" onChange={handleRight} className='filter-input-between' name="right" value={right} placeholder="to"></input>
                <button className='btn btn-sm btn-primary' onClick={()=> handleClick(props.type,1)} style={{fontWeight:500}}><MdAddCircleOutline size={18}/>&nbsp;add</button>
            </div>
            : null}
             {/* Greater Than */}
             {active.indexOf(1) === 2 ? 
             <div className='filter-type'>
                <h6>Greater Than ? </h6>
                <input type="number" onChange={handleGreaterthan} className='filter-input' name="greaterthan" value={greaterthan} placeholder="Greater than"></input>
                <button className='btn btn-sm btn-primary' onClick={()=> handleClick(props.type,2)} style={{fontWeight:500}}><MdAddCircleOutline size={18}/>&nbsp;add</button>
            </div>
            : null}
        </React.Fragment>
    );
}

export default FilterOptions;