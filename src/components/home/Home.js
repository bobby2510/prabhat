import React ,{useEffect,useState} from 'react'
import NavBarOne from '../navbar/NavBarOne';
import Footer from '../footer/Footer';
import NavBarThree from '../navbar/NavBarThree';
import MatchCard from '../matchcards/MatchCard';
import { MdOutlineHistory} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';

import axios from 'axios'
const Home = (props)=>{
    let [loader,setLoader] = useState(false)
    let navigate = useNavigate()
    const [dataList,setDataList] = useState([])
    useEffect(()=>{
        

        props.setBottomIndex(0)
        if(props.sportIndex===2)
        {
            props.setPlayerList([[],[],[],[],[]])
            props.setSelectedPlayers([[],[],[],[],[]])
            props.setFixedPlayers([[],[],[],[],[]])
            props.setCaptainPlayers([[],[],[],[],[]])
            props.setVicecaptainPlayers([[],[],[],[],[]])
            props.setRight(0)
            props.setLeft(0)
            props.setRole([0,0,0,0,0])
        }
        else if(props.sportIndex===3)
        {
            props.setPlayerList([[],[],[]])
            props.setSelectedPlayers([[],[],[]])
            props.setFixedPlayers([[],[],[]])
            props.setCaptainPlayers([[],[],[]])
            props.setVicecaptainPlayers([[],[],[]])
            props.setRight(0)
            props.setLeft(0)
            props.setRole([0,0,0])
        }
        else{
            props.setPlayerList([[],[],[],[]])
            props.setSelectedPlayers([[],[],[],[]])
            props.setFixedPlayers([[],[],[],[]])
            props.setCaptainPlayers([[],[],[],[]])
            props.setVicecaptainPlayers([[],[],[],[]])
            props.setRight(0)
            props.setLeft(0)
            props.setRole([0,0,0,0])
        }

      
    },[props.sportIndex])

    useEffect(()=>{
        let stuff = localStorage.getItem('tg_stuff')
        if( stuff != null && stuff !== 'kvp' && stuff.toString().length=== 10)
        {
            props.setAdminPhoneNumber(stuff)
        }
        else 
        {
            localStorage.setItem('tg_stuff','9848579715') 
            props.setAdminPhoneNumber('9848579715')
        }

           axios.get('https://team-generation-api.herokuapp.com/api/fantasy/matches')
            .then((response)=>{
                setDataList(response.data.data)
                setLoader(true)
                console.log(response.data.data)
            })
            axios.get('https://team-generation-api.herokuapp.com/api/expert/teamlist')
            .then((response)=>{
                props.setExpertMatchList(response.data.data)
            })


            props.setReload('done')
    },[])

    return (
        <React.Fragment>
        <div className="content"> 
                <NavBarOne userRole={props.userRole}/>
                <NavBarThree 
                sportIndex = {props.sportIndex}
                setSportIndex = {props.setSportIndex}
                />

                {/* Done with the upper part */}
                <div className="sub-content">
                <div className='d-flex align-items-center justify-content-between p-1'>
                <h4 className="sub-heading">Upcoming Matches</h4>
                <span className='btn btn-sm btn-success' onClick={()=>{navigate('/savedmatches'); return;}} style={{fontWeight:400,fontSize:12}}><MdOutlineHistory size={14} /> Saved Matches</span>
                </div>
                <div className="d-flex flex-column">
                { loader ? 
                    null
                     : 
                     <div style={{display:'flex',justifyContent:'center',marginTop:100}}>
                         <div class="spinner-border" role="status">
                             <span class="sr-only"></span>
                         </div>
                     </div>
                 }
                { dataList[0] &&  dataList[props.sportIndex].map((match)=> <MatchCard key={match.id} expertMatchList ={props.expertMatchList} sportIndex={props.sportIndex} setSeriesName={props.setSeriesName} setMatchTime={props.setMatchTime} match = {match} /> ) }
                </div>  
                </div>
               
            </div>
            <Footer
                bottomIndex = {props.bottomIndex}
                setBottomIndex = {props.setBottomIndex}
            />
        </React.Fragment>
    );
}

export default Home;