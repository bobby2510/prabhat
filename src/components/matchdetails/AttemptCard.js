import React,{useState} from 'react' 
import { useNavigate } from 'react-router';


const AttemptCard = (props)=>{
    
    const match_time = new Date(props.attempt.time).getTime();
    const navigate = useNavigate()
    
    let now = new Date().getTime();
    let distance = now-match_time;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let timeString = ''
    if(days>0)
        timeString += days+"d "
    if(hours>0)
        timeString += hours+"h "
    if(minutes>0)
        timeString += minutes+"m "
        if(seconds>0)
        timeString += seconds+"s "
 
    let get_generation = (type)=>{
        if(type === 0)
            return 'Smart Section'
        else if(type === 1)
            return 'Grand league Section'
        else if(type === 2)
            return 'Advanced Section'
        else 
            return 'Auto Create'
    }

    let handleTeam = (type)=>{
        if(type==='normal')
        {
            navigate(`/display/${props.matchId}/${props.attempt.id}`)
            return 
        }
        else 
        { 
            navigate(`/displayauto/${props.matchId}/${props.attempt.id}`)
        return 
        }
    }
    let handleResult = (type)=>{
        if(type==='normal')
        {
            navigate(`/result/${props.matchId}/${props.attempt.id}`)
            return 
        }
        else 
        { 
            navigate(`/resultauto/${props.matchId}/${props.attempt.id}`)
        return 
        }
    }

    return (
        <React.Fragment>
            <div className="match-card pb-2">
                <div className="d-flex justify-content-between border-bottom" style={{marginLeft:10,marginRight:10}}>
                    <span className="series-name">{get_generation(props.attempt.generation_type)}</span>
                    <span class="lineups">{timeString} ago</span>
                </div> 
                <div className="text-center" style={{marginLeft:10,marginRight:10}}>
                    <h4>Number of Teams : {props.attempt.number_of_teams}</h4>
                   <div className='d-flex justify-content-around align-items-center'>
                        <button onClick={()=> handleTeam(props.attempt.type)} className='btn btn-primary btn-sm'>See Teams</button>
                        {
                            props.status !== 0? 
                            <button onClick={()=> handleResult(props.attempt.type)} className='btn btn-success btn-sm'>See Results</button>
                            :
                            null 
                        }
                   </div>
                   
                </div>
               
            </div>
        </React.Fragment>
    );
}

export default AttemptCard;