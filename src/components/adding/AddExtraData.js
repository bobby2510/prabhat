import React,{useEffect,useState} from 'react'  
import {useNavigate} from 'react-router-dom' 
import NavBarTwo from '../navbar/NavBarTwo'
import ContinueFooter from '../footer/ContinueFooter'
import { toast } from 'react-toastify';
import PlayerExtraChange from './PlayerExtraChange';


const AddExtraData = (props)=>{
    let navigate = useNavigate()
    let [leftTeam,setLeftTeam] = useState(null)
    let [rightTeam,setRightTeam] = useState(null)
    useEffect(()=>{
        if(props.reload === null)
        {
            navigate('/')
            return
        }
        let team_left = []
        let team_right = []
     //   console.log(props.playerList)
        for(let i=0;i<props.playerList.length;i++)
        {
            for(let j=0;j<props.playerList[i].length;j++)
            {
                let p = props.playerList[i][j]
                if(p.team_index===0)
                    team_left.push({...p})
                else 
                    team_right.push({...p})
            }
        }
        setLeftTeam(team_left)
        setRightTeam(team_right)

    },[])

    let get_empty_list = ()=>{
        if(props.sportIndex===2)
            return [[],[],[],[],[]]
        else if(props.sportIndex===3)
            return [[],[],[]]
        else 
            return [[],[],[],[]]
    }

    let handlePlayer = (pi,ti,captain,vicecaptain,pre_points) =>{
        if(ti===0)
        {
            let temp = [...leftTeam]
            temp = temp.map(player => {
                if(player.player_index===pi)
                {
                    player.captain_selection= parseFloat(captain)
                    player.vicecaptain_selection = parseFloat(vicecaptain)
                    player.pre_points = parseFloat(pre_points)
                }
                return player 
            })
            setLeftTeam(temp)
        }
        else 
        {
            let temp = [...rightTeam]
             temp =   temp.map(player => {
                if(player.player_index===pi)
                {
                    player.captain_selection= parseFloat(captain)
                    player.vicecaptain_selection = parseFloat(vicecaptain)
                    player.pre_points = parseFloat(pre_points)
                }
                
                return player 
            })
            setRightTeam(temp)
        }
    }

    let handleContinue = ()=>{
        let player_captain = []
        let player_vicecaptain = []
        let player_pre_points = []
        for(let i=0;i<70;i++)
        {
            player_captain.push(0)
            player_vicecaptain.push(0)
            player_pre_points.push(0)
        }
        for(let i=0;i<leftTeam.length;i++)
        {
            let p = leftTeam[i] 
            if(p.captain_selection === null || p.captain_selection === '')
                player_captain[p.player_index] = 0
            else 
                player_captain[p.player_index] = parseFloat(p.captain_selection)
            if(p.vicecaptain_selection === null || p.vicecaptain_selection === '')
                player_vicecaptain[p.player_index] = 0
            else 
                player_vicecaptain[p.player_index] = parseFloat(p.vicecaptain_selection) 
            if(p.pre_points === null || p.pre_points === '')
                player_pre_points[p.player_index] = 0
            else 
            player_pre_points[p.player_index] = parseFloat(p.pre_points) 
        }
        for(let i=0;i<rightTeam.length;i++)
        {
            let p = rightTeam[i] 
            if(p.captain_selection === null || p.captain_selection === '')
                player_captain[p.player_index] = 0
            else 
                player_captain[p.player_index] = parseFloat(p.captain_selection)
            if(p.vicecaptain_selection === null || p.vicecaptain_selection === '')
                player_vicecaptain[p.player_index] = 0
            else 
                player_vicecaptain[p.player_index] = parseFloat(p.vicecaptain_selection) 
            if(p.pre_points === null || p.pre_points === '')
                player_pre_points[p.player_index] = 0
            else 
            player_pre_points[p.player_index] = parseFloat(p.pre_points) 
        }
        // now the drama 
        let new_list = [...props.playerList]
        let final_list = get_empty_list()
        for(let i=0;i<new_list.length;i++)
        {
            for(let j=0;j<new_list[i].length;j++)
            {
                let p = new_list[i][j]
                p.captain_selection = player_captain[p.player_index]
                p.vicecaptain_selection = player_vicecaptain[p.player_index]
                p.pre_points = player_pre_points[p.player_index]
                final_list[p.role].push(p)
            }
        }
        props.setPlayerList(final_list)
        //changing in the localStorage as well  
        let temp = JSON.parse(localStorage.getItem('team_data'))
        let m_data = null 
        let m_index = -1
        for(let i=0;i<temp.length;i++)
        {
            if(temp[i].id === props.matchId)
            {
                m_data = temp[i];
                m_index = i;
                break; 
            }
        }
      //  console.log(m_data)
        if(m_data!==null)
        {
            for(let i=0;i<final_list.length;i++)
            {
                for(let j=0;j<final_list[i].length;j++)
                {
                    let p = final_list[i][j]
                    if(p.team_index===0)
                    {
                        for(let k=0;k<m_data.data.left_team_players.length;k++)
                        {
                            if(m_data.data.left_team_players[k].player_index === p.player_index)
                            {
                                m_data.data.left_team_players[k].captain_selection = p.captain_selection 
                                m_data.data.left_team_players[k].vicecaptain_selection = p.vicecaptain_selection 
                                m_data.data.left_team_players[k].pre_points = p.pre_points
                                
                            }
                        }
                    }
                    else 
                    {
                        for(let k=0;k<m_data.data.right_team_players.length;k++)
                        {
                            if(m_data.data.right_team_players[k].player_index === p.player_index)
                            {
                                m_data.data.right_team_players[k].captain_selection = p.captain_selection 
                                m_data.data.right_team_players[k].vicecaptain_selection = p.vicecaptain_selection 
                                m_data.data.right_team_players[k].pre_points = p.pre_points
                            }
                        }
                    }
                }
            }
            temp[m_index] = m_data 
            //console.log(m_data)
            localStorage.setItem('team_data',JSON.stringify(temp))
        }
        
        toast.success('Players Data Updated Successfully!',{position:'top-center'})
        navigate(-1)
        return 
    }

    return (
        <div> 
      <NavBarTwo navigate={navigate} /> 
      <div className='continue-container'>
      <div className="section-info">
          <span className='section-primary'>Change Player Data</span>
          <span className='section-secondary'>If Any Miss match in the data change here</span>
      </div>
      <div className='section-info'>
        <div style={
            {
                display:"flex",
                justifyContent:"space-between",
                width:"100%"
            }
        }>
        <span>&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
        <span>points</span>
        <span>captain</span>
        <span>vicecaptain</span>
       
        </div>
      </div>
      <div className='section-info'>
          <span className='section-primary'>Team - {props.leftName}</span>
      </div>
      {leftTeam && leftTeam.map((player)=> <PlayerExtraChange player={player} handlePlayer={handlePlayer} index={0} sportIndex={props.sportIndex}   /> )}
      <div className='section-info'>
          <span className='section-primary'>Team - {props.rightName}</span>
      </div>
      {rightTeam && rightTeam.map((player)=> <PlayerExtraChange player={player} handlePlayer={handlePlayer} index={1} sportIndex={props.sportIndex} /> )}
      </div>
      <ContinueFooter handleContinue ={()=>handleContinue()}  />
      </div>
    );
}

export default AddExtraData;