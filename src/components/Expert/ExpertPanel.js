import React,{useState,useEffect} from 'react' 
import { useNavigate } from 'react-router-dom'
import NavBarTwo from '../navbar/NavBarTwo'
import GenericFooter from '../footer/GenericFooter'
import {MdListAlt,MdQueryStats} from 'react-icons/md'
import ExpertTeamCard from './ExpertTeamCard'
import ExpertPredictionCard from './ExpertPredictionCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const ExpertPanel = (props)=>{
    let navigate = useNavigate()
    let {match} = useParams()
    const [expertActive,setExpertActive] = useState([1,0])
    let [teamsCard,setTeamsCard] = useState([])
    let [expertUsers,setExpertUsers] = useState([])
    useEffect(()=>{
        axios.get(`https://team-generation-api.herokuapp.com/api/expert/getteams/${match}`)
        .then((response)=>{
            if(response.status === 200)
            {
                props.setFetchedExpertCards(response.data.data)
                props.setExpertUserList(response.data.expertData)
            }
        })
    },[])    
    let handleExpertActive = (index)=>{
        let temp = [...expertActive]
        temp[0]=0;
        temp[1]=0;
        temp[index]=1;
        setExpertActive(temp)
    }           
    return (
        <React.Fragment>
            <NavBarTwo navigate ={navigate} />
            <div  style={{padding:0}}>
                    <nav class="d-flex justify-content-around top-nav  pt-1 top-fix-two" style={{backgroundColor:'#fff'}}>
                        <div onClick={()=>handleExpertActive(0)} className={expertActive.indexOf(1) === 0  ? 'sport-icon sport-icon-active':'sport-icon'}>
                            <MdListAlt size={20} />
                            <span>&nbsp;&nbsp;Expert Teams&nbsp;&nbsp;</span>
                        </div>
                        <div onClick={()=>handleExpertActive(1)} className={expertActive.indexOf(1) === 1 ? 'sport-icon sport-icon-active':'sport-icon'}>
                            <MdQueryStats size={20} /> 
                            <span>Expert Prediction</span>
                        </div>
                    </nav>
                {expertActive.indexOf(1)=== 0? 
                    
                <React.Fragment>
                    {/*expert teams*/}
                    <div className="section-info" style={{borderBottom:"4px solid green"}}>
                        <span className='section-primary'>Expert Generation</span>
                        <span className='section-secondary'>See teams of experts </span>
                        <span className='section-secondary'>Both software and Human made teams</span>
                    </div>
                    <div className="expert-vp-container" style={{paddingLeft:8,paddingRight:8}}>
                    {props.fetchedExpertCards && props.fetchedExpertCards.map((card,index)=>{
                        return <React.Fragment>
                            <ExpertTeamCard data = {card} expertUsers = {props.expertUserList} index={index} />
                        </React.Fragment>
                    })}
                        
                    </div>
                </React.Fragment>
                : 
                <React.Fragment>
                    {/*expert Prediction*/}
                    <div className="section-info" style={{borderBottom:"4px solid #f53803"}}>
                        <span className='section-primary'>Expert Prediction</span>
                        <span className='section-secondary'>See Prediction and match data </span>
                        <span className='section-secondary'>Accurate tips and data given by experts</span>
                    </div>
                    <div className="expert-vp-container" style={{paddingLeft:10,paddingRight:10}}>
                        <br></br>
                        <br></br>
                       <img src='/coming.jpg' style={{width:'100%'}} />
                    </div>
                    
                </React.Fragment>
                }
            </div>
            <GenericFooter />
        </React.Fragment>
    );
}

export default ExpertPanel;