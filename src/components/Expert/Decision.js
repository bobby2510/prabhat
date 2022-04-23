import React,{useEffect} from 'react'
import NavBarTwo from '../navbar/NavBarTwo';
import GenericFooter from '../footer/GenericFooter';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'


const Decision = (props)=>{
    let {id} = useParams()
    let navigate = useNavigate()

    let get_player_list = ()=>{
        if(props.sportIndex===2)
            return [[],[],[],[],[]]
        else if(props.sportIndex===3)
            return [[],[],[]]
        else 
            return [[],[],[],[]]
    }

    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return
        }
        if(props.login === false)
        {
            navigate('/login')
            return 
        }
        if(props.plan === false)
        {
            navigate('/plandata')
        }
        axios.get(`https://team-generation-api.herokuapp.com/api/fantasy/match/${id}`)
        .then((response)=>{
            let m_data = response.data.data 
            let player_list = get_player_list()
            props.setLeftName(m_data.left_team_name)
            props.setRightName(m_data.right_team_name)
            props.setLeftImage(m_data.left_team_image)
            props.setRightImage(m_data.right_team_image)
            props.setMatchId(id)  
            m_data.left_team_players.forEach((player)=>{
                player.selected = 0
                player_list[player.role].push(player)
            })
            m_data.right_team_players.forEach((player)=>{
                player.selected = 0
                player_list[player.role].push(player)
            })
            // setPlayerList 
            props.setPlayerList(player_list)
        })
    },[])

    return (
        <React.Fragment>
            <NavBarTwo navigate ={navigate} />
            <div className="mini-container">
            <h4 className="sub-heading mb-4">Choose Here</h4>
            
                <div className='section-card'>
                    <div className="card-start-part" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <br/>
                    </div>
                    <img className="section-image" src="/generator.jpg" alt="generator" />
                    <button onClick={()=>{ navigate(`/match/${id}`)}} className='btn btn-success section-btn'>Continue</button>

                </div>
                <div className='section-card'>
                    <div className="card-start-part" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <br/>
                    </div>
                    <img className="section-image" src="/expert.jpg" alt="expert" />
                    <button onClick={()=>{ navigate(`/expertpanel/${id}`) }} className='btn btn-primary section-btn'>Continue</button>

                </div>
            </div>
            <GenericFooter />
        </React.Fragment>
    );
}

export default Decision;