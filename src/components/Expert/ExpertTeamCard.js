import React,{useState,useEffect} from 'react' 
import { useNavigate } from 'react-router-dom'

const ExpertTeamCard = (props)=>{
    let [timeString,setTimeString] = useState('')
    let [avatar,setAvatar] = useState('0')
    let [name,setName] = useState('expert')
    let navigate = useNavigate()
    //#DE4839
    useEffect(()=>{
        const match_time = new Date(props.data.createdAt).getTime();
        let now = new Date().getTime();
        let distance = now-match_time;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let tempString = ''
        if(days>0)
            tempString += days+"d "
        if(hours>0)
            tempString += hours+"h "
        if(minutes>0)
            tempString += minutes+"m "
        if(seconds>0)
            tempString += seconds+"s "
        setTimeString(tempString)
        console.log(props.expertUsers)
       
    },[])
    useEffect(()=>{
        for(let i=0;i<props.expertUsers.length;i++)
        {
            if(props.expertUsers[i].phoneNumber.toString() === props.data.expertNumber.toString())
            {
                setName(props.expertUsers[i].name)
                setAvatar(props.expertUsers[i].avatar)
                break;
            }
        }
    },[props.expertUsers])
    return (
        <React.Fragment>
        <div className="match-card" style={{marginBottom:15}} >
                <div onClick={() => { navigate(`/showexpertteams/${props.index}`)}}>
                    <div className="card-start-part" style={{display:"flex",alignItems:"center",justifyContent:"flex-end",fontWeight:500}}>
                        <span className='lineups' style={{paddingTop:5,paddingBottom:5}}>Teams Posted : {timeString} ago</span>
                    </div>
                    <div className="card-middle" style={{marginLeft:10,marginRight:10}}>
                         <table className='table' >
                         <tbody>
                            <tr>
                                <td className='font-green-500'>Teams</td>
                                {
                                   props.data.typeOfTeams === 'software' ? 
                                <td className='text-center'><div className='badge badge-outline-success' style={{fontSize:14}}>Created With Software</div></td>
                                   :
                                   <td className='text-center'><div className='badge badge-outline-warning' style={{fontSize:14}}>Created By Human</div></td>
                                }
                            </tr>
                            <tr>
                                <td className='font-green-500'>Expert&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>
                                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        <img src={`/${avatar}.jpg`} className='team-image' />
                                        <span className='font-500'>&nbsp;&nbsp;{name}</span>
                                    </div>
                                </td>
                            </tr>
                         </tbody>
                         </table>
                        </div>

                        <div className='d-flex justify-content-around align-items-start'>
                            <div className='d-flex flex-column align-items-center justify-content-center'>
                                    <span style={{fontSize:12}}>Number of Teams</span>
                                    <h1 style={{fontSize:40}}>{props.data.numberOfTeams}</h1>
                            </div>
                            <div style={{borderLeft:'2px solid grey',height:60}}>
                            </div>
                            <div className='d-flex flex-column align-items-center justify-content-center'>
                                <span style={{fontSize:12}}>Player Data Taken from</span>
                                <img src={`/${props.data.fantasyApp}.jpg`} className='team-image mt-2' />
                            </div>
                         </div>

                         <div className="card-middle" style={{marginLeft:10,marginRight:10}}>
                         <table className='table' style={{marginBottom:-13}}>
                         <tbody>
                            <tr>
                                <td className='font-green-500'>Teams Lineups</td>
                                {props.data.tossData === 'Predicted11'?
                                <td><div className='badge badge-outline-warning' style={{fontSize:12}}>Predicted11</div></td>
                                :
                                <td><div className='badge badge-outline-success vp-blink' style={{fontSize:12}}>Playing11 (lineups)</div></td>
                            }
                            </tr>
                            <tr>
                                <td className='font-green-500'>Teams Suitable for</td>
                                <td>
                                <td ><div className='badge badge-outline-success' style={{fontSize:12}}>{props.data.teamUse}</div></td>
                                </td>
                            </tr>
                         </tbody>
                         </table>
                        </div>

                    
                </div>
                <div className="card-start-part-bottom" style={{display:"flex",alignItems:"center",justifyContent:"space-between",backgroundImage:'linear-gradient(to right,#56ab2f ,   #a8e063)'}}>
                    <br/>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ExpertTeamCard;