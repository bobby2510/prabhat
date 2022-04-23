import React,{useState,useEffect} from 'react'  
import { toast } from 'react-toastify';  
import Loader from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import { generateTeams,get_attempt,store_data } from '../Generator/TeamGenerator';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const AutoGeneration = (props)=>{
    let navigate = useNavigate()
    let [loader,setLoader] = useState(true)
    let combinations = [
        [
                [1,3,2,5],[1,3,3,4],[1,4,3,3],[1,4,2,4],[1,4,1,5],[1,5,2,3],[1,5,1,4],[1,6,1,3],[1,3,1,6],[1,3,4,3],
            [2,3,3,3],[2,3,2,4],[2,3,1,5],[2,4,2,3],[2,4,1,4],[2,5,1,3],
            [3,3,2,3],[3,4,1,3],[3,3,1,4],
            [4,3,1,3]
        ],
        [ 
            [1,4,5,1],[1,5,4,1],[1,5,3,2],[1,4,4,2],[1,3,4,3],[1,4,3,3],[1,3,5,2]
        ],
        [
            [1,1,1,1,4],[1,1,1,2,3],[1,1,1,3,2],[1,1,1,4,1],[1,1,2,1,3],[1,1,2,2,2],[1,1,2,3,1],[1,1,3,2,1],[1,1,4,1,1],[1,2,1,1,3],[1,2,1,2,2],[1,2,2,1,2],[1,2,2,2,1],[1,2,3,1,1],[1,3,1,1,2],[1,3,1,2,1],[1,3,2,1,1],[1,4,1,1,1],
            [2,1,1,1,2],[2,1,1,1,3],[2,1,1,2,2],[2,1,1,3,1],[2,1,2,1,2],[2,1,2,2,1],[2,1,3,1,1],[2,2,1,1,2],[2,2,1,2,1],[2,2,2,1,1],[2,3,1,1,1],
            [3,1,1,1,2],[3,1,1,2,1],[3,1,2,1,1],[3,2,1,1,1],
            [4,1,1,1,1]
         ],
         [
            [2,2,3],[3,2,2],[3,1,3],[4,1,2],[4,2,1]
        ]
    ]
    let strategies = [
        [
        [4,7],
        [5,6],
        [6,5],
        [7,4]
    ],
    [
        [4,7],
        [5,6],
        [6,5],
        [7,4]
    ],
    [
        [3,5],
        [4,4],
        [5,3]
    ],
    [
        [2,5],
        [3,4],
        [4,3],
        [5,2]
    ]
    ]
    let credit_left_range = [
        [96.5,97.5,98.5],
        [96.5,97.5,98.5],
        [94.5,96.5,97],
        [94.5,96.5,97]
    ]

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

        let cnt =0;
        for(let i=0;i<props.selectedPlayers.length;i++)
        {
            for(let j=0;j<props.selectedPlayers[i].length;j++)
            {
                cnt = cnt + 1 
            }
        }
        if(cnt === 0)
        {
            navigate('/')
            return 
        }

        // Grand league teams 
        let tempFixed = get_player_list()
        let gl_captain = get_player_list()
        let gl_vicecaptain =get_player_list()
        let sl_captain = get_player_list()
        let sl_vicecaptain =get_player_list()
        let h2h_captain = get_player_list()
        let h2h_vicecaptain = get_player_list()
        for(let i=0;i<props.selectedPlayers.length;i++)
        {
            for(let j=0;j<props.selectedPlayers[i].length;j++)
            {
                let p = props.selectedPlayers[i][j]
                gl_captain[i].push(p.player_index)
                gl_vicecaptain[i].push(p.player_index)
                if(p.credits>=9){
                    sl_captain[i].push(p.player_index)
                    h2h_captain[i].push(p.player_index)
                    h2h_vicecaptain[i].push(p.player_index)
                }
                if(p.credits>=8.5)
                    sl_vicecaptain[i].push(p.player_index)
            }
        }
       let teams_list_one =  generateTeams(props.selectedPlayers,tempFixed,gl_captain,gl_vicecaptain,strategies[props.sportIndex],credit_left_range[props.sportIndex][0],100,combinations[props.sportIndex],11,null)
       let teams_list_two =  generateTeams(props.selectedPlayers,tempFixed,sl_captain,sl_vicecaptain,strategies[props.sportIndex],credit_left_range[props.sportIndex][1],100,combinations[props.sportIndex],3,null)
       let teams_list_three =  generateTeams(props.selectedPlayers,tempFixed,h2h_captain,h2h_vicecaptain,strategies[props.sportIndex],credit_left_range[props.sportIndex][2],100,combinations[props.sportIndex],1,null)
       let final_teams_list = []
       if(teams_list_one === null && teams_list_two===null && teams_list_three === null)
       {
           toast.error('Something Went Wrong!',{position:'top-center'})
           navigate('/')
           return 
       }
       final_teams_list.push(teams_list_one===null? [] : teams_list_one)
       final_teams_list.push(teams_list_two===null? [] : teams_list_two)
       final_teams_list.push(teams_list_three===null? [] : teams_list_three)
       let attempt = get_attempt(props.matchId,props.selectedPlayers,'toss',15,3,final_teams_list,props.sportIndex,null,98,100)
       if(attempt!=null)
       {
           let result_obj = store_data(props.matchId,props.seriesName,props.leftName,props.leftImage,props.rightName,props.rightImage,props.playerList,attempt,props.sportIndex,props.matchTime)
           if(result_obj!=null){
               toast.success('teams stored successfully!',{
                   position:'top-center'
               })
               navigate(`/displayauto/${result_obj.matchId}/${result_obj.attempt_id}`)
               return 
           }
       }
    },[])
    

    
    return (
        <React.Fragment>
            <div className='auto-container p-6'>
            <Loader
                type="Grid"
                color="rgb(86, 61, 124)"
                height={100}
                width={100}
                visible={loader}
            /> 
            </div>
        </React.Fragment>
    );
}

export default AutoGeneration;