import React,{useState,useEffect} from 'react' 
import ChipCard from './ChipCard'
import {MdRemoveCircleOutline , MdAddCircleOutline , MdClose } from 'react-icons/md'
import './filter.css'
import FilterOptions from './FilterOptions'
import SortChipCard from './SortChipCard'

const FilterData = (props)=>{
    let [filterActive,setFilterActive] = useState([0,0])
    let [sortActive,setSortActive] = useState([0,0])
    let handleClick = (index)=>{
        if(filterActive[index]===1)
        {
            setFilterActive([0,0])
            return;
        }
        let temp = [0,0]
        temp[index]=1;
        setFilterActive(temp)
    }
    let handleSortClick = (index)=>{
        if(sortActive[index]===1)
        {
            setSortActive([0,0])
            return;
        }
        let temp = [0,0]
        temp[index]=1;
        setSortActive(temp)
    }

    let handleSortActive = (sort_type)=>{
        let temp = sortActive.indexOf(1)
        if(temp!== -1)
        {
            props.setSortStuff({p_type: temp, s_type: sort_type})
            setSortActive([0,0])
            return;
        }
    }
    return (
        <React.Fragment>
            <div className='filter-panel'>
                <div className="filter-container">
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <h5>Filter</h5>
                        <h6 style={{color:'green'}}>Teams: {props.filterData.length}</h6>
                        <MdClose style={{color:'red'}} onClick={()=> props.setFilter(false)} size={20}/>
                    </div>
                    <hr></hr>
                    <div className='filter-handle'>
                    {props.filterArray.length >0? 
                        props.filterArray.map((f,index)=> <ChipCard key={index+1011} filter={f} setFilterArray={props.setFilterArray} index={index} filterArray={props.filterArray} /> )
                        :
                        <span style={{fontSize:12,color:'grey'}}>No Filters Added</span>
                    }
                    </div>
                    <div className='filter-option mt-2'>
                        <div className="analytic-item">
                            <div onClick={()=> handleClick(0)} className={ filterActive.indexOf(1) ===0 ?  'analytic-sub-item player-orange' : 'analytic-sub-item'}>Pre Points &nbsp;{ filterActive.indexOf(1) ===0 ? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                            <div onClick={()=> handleClick(1)}  className={ filterActive.indexOf(1) === 1 ? 'analytic-sub-item player-orange' : 'analytic-sub-item'}>Leverage &nbsp;{ filterActive.indexOf(1) === 1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                        </div>
                    </div>
                    {/* more stuff like filter options and all */}
                    {filterActive.indexOf(1) ===0 ? 
                        <FilterOptions setFilterArray={props.setFilterArray} type={0} filterArray={props.filterArray} />
                    : null}
                    {filterActive.indexOf(1) ===1 ? 
                        <FilterOptions setFilterArray={props.setFilterArray} type={1} filterArray={props.filterArray} />
                    : null}
                </div>
                {/* sort container start */}
                <div>
                    <div className="filter-container">
                        <h5>Sorting</h5>
                        <hr></hr>
                        <div className='filter-handle'>
                            {props.sortStuff !== null? 
                              <SortChipCard  sortStuff={props.sortStuff} setSortStuff={props.setSortStuff} />
                                :
                                <span style={{fontSize:12,color:'grey'}}>Sorting Not Added</span>
                            }
                        </div>
                        <div className='filter-option mt-2'>
                            <div className="analytic-item">
                                <div onClick={()=> handleSortClick(0)} className={ sortActive.indexOf(1) ===0 ?  'analytic-sub-item player-orange' : 'analytic-sub-item'}>Pre Points &nbsp;{ sortActive.indexOf(1) ===0 ? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                                <div onClick={()=> handleSortClick(1)}  className={ sortActive.indexOf(1) === 1 ? 'analytic-sub-item player-orange' : 'analytic-sub-item'}>Leverage &nbsp;{ sortActive.indexOf(1) === 1? <MdRemoveCircleOutline size={20} style={{color:'orange'}}/> : <MdAddCircleOutline size={20} style={{color:'green'}} />} </div>
                            </div>
                        </div>
                        <div className='filter-options'>
                            {sortActive.indexOf(1)!== -1 ? 
                                <React.Fragment>
                                    <button onClick={()=> handleSortActive(0)} className='btn btn-sm btn-primary filter-button' style={{fontWeight:500}}>Increasing</button>
                                    <button onClick={()=> handleSortActive(1)} className='btn btn-sm btn-success filter-button' style={{fontWeight:500}}>Decreasing</button>
                                </React.Fragment>
                                : null }
                        </div>
                    </div>
                </div>
                <br></br>
            </div>
        </React.Fragment>
    );
}

export default FilterData;