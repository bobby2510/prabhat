import React,{useState,useEffect,useRef} from 'react' 
import {useNavigate} from 'react-router-dom'
import {useParams} from 'react-router'
import GenericFooter from '../footer/GenericFooter';
import NavBarTwo from '../navbar/NavBarTwo';
import AttemptCard from './AttemptCard';
import axios from 'axios'

const PreviousMatchDetail = (props)=>{
    let sportName = ['cricket','football','basketball','kabaddi']
    let [leftName,setLeftName]= useState(null)
    let [leftImage,setLeftImage]= useState(null)
    let [rightName,setRightName]= useState(null)
    let [rightImage,setRightImage]= useState(null)
    let [result,setResult] = useState(null)
    let [matchStatus,setMatchStatus] = useState(0)
    let [seriesName,setSeriesName] = useState(null)
    let [playerPoints,setPlayerPoints] = useState(null)
    let [attemptData,setAttemptData] =useState(null)
    const {id} = useParams()
    const navigate = useNavigate()

    let getPoints = (player_fixed_id,player_data)=>{
        for(let i=0;i<player_data.length;i++)
        {
            if(player_data[i].player_fixed_id === player_fixed_id)
                return player_data[i].player_points;
        }
        return 0;
    }

    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return
        }

        let all_sports = JSON.parse(localStorage.getItem('tgk_data'))
        let req_sport = all_sports[props.sportIndex]
        let req_match = null 
        for(let i=0;i<req_sport.length;i++)
        {
            if(id.toString() === req_sport[i].id.toString())
            {
                req_match = req_sport[i]
            }
        }
        if(req_match===null){navigator('/');return}

        // api call have to be made 
        if(req_match.status !== 2){
            axios.get(`https://team-generation-api.herokuapp.com/api/fantasy/scorecard/${sportName[props.sportIndex]}/${req_match.id}`)
            .then((response)=>{
                let vp_status = response.data.data.match_status
                console.log(vp_status)
                if(vp_status !== 'active')
                {
                    // calling local storage
                    req_sport = req_sport.map((kvp)=>{
                        if(kvp.id.toString() === id.toString())
                        {
                            // do lot of stuff here 
                            kvp.player_list[0] = kvp.player_list[0].map((bobby)=>{
                                bobby.points = getPoints(bobby.player_fixed_id,response.data.data.player_data)
                                return bobby;
                            })
                            kvp.player_list[1] = kvp.player_list[1].map((bobby)=>{
                                bobby.points = getPoints(bobby.player_fixed_id,response.data.data.player_data)
                                return bobby;
                            })
                            console.log(vp_status)
                            if(vp_status==='inprogress')
                                kvp.status = 1;
                            else if(vp_status === 'inactive')
                                kvp.status = 2;
                            setMatchStatus(kvp.status)
                        }
                        
                        return kvp;
                    })
                    all_sports[props.sportIndex] = req_sport 
                    localStorage.setItem('tgk_data',JSON.stringify(all_sports))
                }

            })
        }
     
        setLeftName(req_match.left_name)
        setLeftImage(req_match.left_image)
        setRightName(req_match.right_name)
        setRightImage(req_match.right_image)
        setSeriesName(req_match.series_name)
        if(req_match.status === 2)
            setMatchStatus(2)
       
        setResult(req_match.result)

        let temp_list = req_match.attempts 
        temp_list.sort((x,y)=>{
            if(x.time<y.time)
            return 1 
            else 
            return -1
        })
        setAttemptData(temp_list)
    },[])

    let handleAddPoint = ()=>{
        navigate(`/addpoint/${id}`)
    }

    return (
        <React.Fragment>
            <NavBarTwo navigate={navigate} />
            <div className='mini-container' style={{padding:0}}>
                <div className='p-match-header pb-2 mb-2'>
                    <h5>{seriesName}</h5>
                    <div className="card-middle" style={{marginLeft:10,marginRight:10}}>
                    <div className="combine-image">
                     <img className="team-image" src={leftImage} alt="left" />
                     <span className="left-team-name">{leftName}</span>
                     </div>
                     <div className="timer"> VS </div>
                    <div className="combine-image" >
                    <span className="right-team-name">{rightName}</span>
                     <img className="team-image" src={rightImage} alt="right" />
                    </div>
                    </div>
                    {
                        matchStatus === 0?
                        <span>Match is not started Yet, see teams here</span>
                        :
                        null
                    }
                    {
                        matchStatus === 1?
                        <span>Match is in Progress, You can check points of your teams</span>
                        :
                        null
                    }
                    {
                        matchStatus === 2?
                        <React.Fragment>
                        <span>Match is Finished! Check results of  your teams !!!</span>
                        <span> if you want to change points <button onClick={()=> handleAddPoint() } className='btn btn-success btn-sm' style={{fontWeight:500}}>Change Points</button></span>
                        </React.Fragment>
                        :
                        null
                    }
                </div>
                <div className="d-flex flex-column" style={{paddingLeft:5,paddingRight:5}}>
                { attemptData &&  attemptData.map((attempt)=> <AttemptCard key={attempt.id}  attempt = {attempt}  status={matchStatus} matchId={id} /> ) }
                </div> 
            </div>
            <GenericFooter />
        </React.Fragment>
    );
}

export default PreviousMatchDetail;