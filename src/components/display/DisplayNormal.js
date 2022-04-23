import React,{useState,useEffect,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import { useParams } from "react-router";
import NavBarTwo from '../navbar/NavBarTwo';
import Team from './Team'
import {MdFilterAlt } from 'react-icons/md'
import FilterData from './FilterData'
import { toast } from 'react-toastify';


let DisplayNormal = (props)=>{
    let navigate = useNavigate()
    let sportIndex = useRef(null)
    let [filterData,setFilterData] = useState([])
    let [filter,setFilter] = useState(false)
    const {match,attempt} = useParams()
    let [finalTeamData,setFinalTeamData] = useState([])
    let [filterArray,setFilterArray] = useState([])
    let [sortStuff,setSortStuff] = useState(null)
    let get_player_list = ()=>{
        if(sportIndex.current===2)
            return [[],[],[],[],[]]
        else if(sportIndex.current===3)
            return [[],[],[]]
        else 
            return [[],[],[],[]]
    }

    useEffect(()=>{
        if(finalTeamData.length>0)
        {
            let temp = [...finalTeamData]
            for(let i=0;i<filterArray.length;i++)
            {
    
                let f = filterArray[i] 
                temp = temp.filter((t)=>{
                    if(f.p_type === 0)
                    {
                        if(f.f_type === 0)
                        {
                            if(t.pre_points<f.value) 
                                return true;
                            else 
                                return false;
                        }
                        else if(f.f_type === 1)
                        {
                            if(t.pre_points>=f.left_value && t.pre_points<= f.right_value)
                                return true; 
                            else 
                                return false;
                        }
                        else 
                        {
                            if(t.pre_points>f.value)
                                return true;
                            else 
                                return false;
                        }
                    }
                    else 
                    {
                        if(f.f_type === 0)
                        {
                            if(t.leverage<f.value) 
                                return true;
                            else 
                                return false;
                        }
                        else if(f.f_type === 1)
                        {
                            if(t.leverage>=f.left_value && t.leverage<= f.right_value)
                                return true; 
                            else 
                                return false;
                        }
                        else 
                        {
                            if(t.leverage>f.value)
                                return true;
                            else 
                                return false;
                        }
                    }
                })
            }
            if(sortStuff !== null)
            {
                temp.sort((x,y)=>{
                    if(sortStuff.p_type === 0)
                    {
                        if(sortStuff.s_type === 0)
                        {
                            if(x.pre_points<y.pre_points)
                                return -1;
                            else 
                                return 1;
                        }
                        else 
                        {
                            if(x.pre_points<y.pre_points)
                                return 1;
                            else 
                                return -1;
                        }

                    }
                    else 
                    {
                        if(sortStuff.s_type === 0)
                        {
                            if(x.leverage<y.leverage)
                                return -1;
                            else 
                                return 1;
                        }
                        else 
                        {
                            if(x.leverage<y.leverage)
                                return 1;
                            else 
                                return -1;
                        }
                    }
                })
            }
            setFilterData(temp)
        }
       
    },[finalTeamData , filterArray , sortStuff])

    useEffect(()=>{
      
        if(props.reload === null)
        {
            navigate('/')
            return
        }


        let data = JSON.parse(localStorage.getItem('tgk_data'))
        for(let i=0;i<data.length;i++)
        {
            for(let j=0;j<data[i].length;j++)
            {
                if(data[i][j].id.toString() === match.toString())
                {
                    sportIndex.current = i;
                    break;
                }
            }
        }
        let match_list = data[sportIndex.current] 
        let req_match = null 
        for(let i=0;i<match_list.length;i++)
        {
            if(match_list[i].id.toString() === match.toString())
            {
                req_match = match_list[i]
                break;
            }
        }
        console.log(sportIndex.current)
        console.log(req_match)
        if(req_match===null)
        {
            navigate('/')
            return 
        }
        let req_attempt = null 
        for(let i=0;i<req_match.attempts.length;i++)
        {
            if(attempt.toString() === req_match.attempts[i].id.toString())
            {
                req_attempt = req_match.attempts[i]
            }
        }
        if(req_attempt===null)
        {
            navigate('/')
            return 
        }
        let temp_list = []
        for(let i=0;i<70;i++)
            temp_list.push({})
        for(let i=0;i<req_attempt.player_list.length;i++)
        {
            for(let j=0;j<req_attempt.player_list[i].length;j++)
            {
                let p = req_attempt.player_list[i][j]
                temp_list[p.player_index] = p;
            }
        }
        
        let final_team_list = []
        for(let i=0;i<req_attempt.team_list.length;i++)
        {
            let temp_team = req_attempt.team_list[i]
            let final_team = get_player_list()
            for(let j=0;j<temp_team.team.length;j++)
            {
                for(let k=0;k<temp_team.team[j].length;k++)
                {
                    final_team[j].push(temp_list[temp_team.team[j][k]])
                }
            }
            final_team_list.push({
                team_number: temp_team.team_number,
                captain: temp_team.captain,
                final_team:final_team,
                vicecaptain : temp_team.vicecaptain,
                credits: temp_team.credits,
                pre_points : temp_team.pre_points,
                leverage : temp_team.leverage 
                  
            })
        }
        setFinalTeamData(final_team_list)
        setFilterData(final_team_list)
    },[])

    let handleFilterClick = ()=>{
        setFilter(!filter)
    }

    return (
        <React.Fragment>
            {filter === true? <FilterData setFilter={setFilter} filterData={filterData} setFilterData={setFilterData} filterArray={filterArray} setFilterArray={setFilterArray} sortStuff={sortStuff} setSortStuff={setSortStuff} /> : null}
            <NavBarTwo navigate = {navigate} />
            <div style={{backgroundColor:'white'}}>
            <nav class=" container d-flex justify-content-around top-nav  p-2 top-fix-two" style={{maxWidth:1200,padding:0}}>
                <button onClick={()=> navigate(`/shortcutprintnormal/${match}/${attempt}`) } className='btn btn-sm btn-success' style={{fontWeight:500}}>Shortcut Print</button>
                <button onClick={()=> navigate(`/analytics/${match}/${attempt}`) } className='btn btn-sm btn-danger' style={{fontWeight:500}}>Analytics</button>
                <button onClick={()=> window.print()} className='btn btn-sm btn-primary' style={{fontWeight:500}}> Print</button>
                {props.userRole ==='customer'? null: 
                <button onClick={()=> {navigate(`/sharesoftware/${match}/${attempt}`);return;}} className='btn btn-sm btn-success' style={{fontWeight:500}}>Share Teams</button>
            }
            </nav>
            <div className='container' style={{maxWidth:1200,padding:8}}>

                <div className="card mt-2 text-center">
                    <div className='card-header d-flex justify-content-between'>
                        <h4>Generated Teams</h4>
                        <MdFilterAlt onClick={()=> handleFilterClick()} size={24} />
                    </div>
                    <div className="display-team">
                        { filterData.map((team)=> <Team teamData = {team} sportIndex={sportIndex.current} type={0} />)}
                    </div>
                </div>
            </div>
            </div>
        </React.Fragment>
    );
}

export default DisplayNormal;