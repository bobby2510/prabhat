import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './main.css'
import axios from 'axios'

import Home from './components/home/Home';
import MyMatches from './components/mymatches/MyMatches'
import Profile from './components/profile/Profile';
import Match from './components/matchdetails/Match';
import Section from './components/sectiondetails/Section'
import FixedPlayer from './components/advanced/FixedPlayer';
import CaptainPlayer from './components/advanced/CaptainPlayer';
import VicecaptainPlayer from './components/advanced/VicecaptainPlayer';
import Partision from './components/advanced/Partision';
import CreditRange from './components/advanced/CreditRange';
import TeamCombination from './components/advanced/TeamCombination';
import AdvancedGeneration from './components/final/AdvancedGeneration';
import DisplayNormal from './components/display/DisplayNormal';
import ResultNormal from './components/display/ResultNormal';
import GrandLeague from './components/final/GrandLeague';
import SmartGeneration from './components/final/SmartGeneration';
import AutoGeneration from './components/final/AutoGeneration';
import DisplayAuto from './components/display/DisplayAuto';
import ResultAuto from './components/display/ResultAuto'
import PreviousMatch from './components/home/PreviousMatch';
import PreviousMatchDetail from './components/matchdetails/PreviousMatchDetail';
import AddPoint from './components/adding/AddPoint';
import ChangeData from './components/adding/ChangeData';
import Login from './api/Login';
import ChangePassword from './api/ChangePassword';
import CollabComponenet from './components/home/CollabComponent';
import PlanData from './api/PlanData';
import AboutUs from './components/siders/AboutUs';
import ContactUs from './components/siders/ContactUs';
import Register from './api/Register';
import ManageUser from './api/ManageUser';
import HowToGenerate from './components/siders/HowToGenerate';
import RefundPolicy from './components/siders/RefundPolicy';
import BestTips from './components/siders/BestTips';
import Selection from './components/advanced/Selection';
import ShortcutPrintAuto from './components/menu/ShortcutPrintAuto';
import Analytics from './components/menu/Analytics';
import ShortcutPrintNormal from './components/menu/ShortcutPrintNormal';
import Notify from './api/Notify';
import SavedMatches from './components/home/SavedMatches';
import AccountsData from './accounts/AccountsData';
import AdminAccountsData from './accounts/AdminAccountsData';
import Decision from './components/Expert/Decision';
import ExpertPanel from './components/Expert/ExpertPanel'
import ShareSoftware from './components/Expert/ShareSoftware';
import ShareHuman from './components/Expert/ShareHuman';
import StoreExpertTeams from './components/Expert/StoreExpertTeams'
import ShowExpertTeams from './components/Expert/ShowExpertTeams';
import SuperDecision from './components/Expert/SuperDecision'
import AddExtraData from './components/adding/AddExtraData';

// our color : #563d7c

const App = ()=>{
    const [reload, setReload] = useState(null)
    const [sportIndex,setSportIndex] = useState(0) // change 
    const [bottomIndex,setBottomIndex] = useState(0)
    let [playerList,setPlayerList] = useState(null) // change
    // data of selected palyers from the match 
    const [selectedPlayers, setSelectedPlayers] = useState(null)
    // fixed player data 
    const [fixedPlayers, setFixedPlayers] = useState(null)
    const [captainPlayers, setCaptainPlayers] = useState(null)
    const [vicecaptainPlayers, setVicecaptainPlayers] = useState(null)
    {/* couting variables data start */}
    let [left,setLeft] = useState(0)
    let [right,setRight] = useState(0)
    let [role,setRole] = useState([]) // change
    { /* counting variable end  */}
    {/* team image and name data start */}
    let [leftName,setLeftName] = useState('')
    let [rightName,setRightName] = useState('')
    let [leftImage,setLeftImage] = useState('')
    let [rightImage,setRightImage] = useState('')
    let [matchId,setMatchId] = useState('')
    let [seriesName,setSeriesName] = useState('')
    let [matchTime,setMatchTime] = useState('')
    {/* team image and name data end  */}
    let [partisionStrategy,setPartisionStrategy] = useState([])
    let [selectionStrategy,setSelectionStrategy] = useState([])
    let [leftRange,setLeftRange] = useState(97)
    let [rightRange,setRightRange] = useState(100)
    let[combination,setCombination] = useState([])
    {/* user authentication details */}
    let [login,setLogin] = useState(false)
    let [plan,setPlan] = useState(false)
    let [currentPlan,setCurrentPlan] = useState(null)
    let [previousPlan,setPreviousPlan] = useState(null)
    let [userName,setUserName] = useState('')
    let [userEmail,setUserEmail] = useState('')
    let [userRole,setUserRole] = useState('')
    let [phoneNumber,setPhoneNumber] = useState('')
    {/* flag for checking player percentage selection is there or not */}
    let [selectionFlag,setSelectionFlag] = useState(false)
    let [adminPhoneNumber,setAdminPhoneNumber] = useState('9848579715')

    {/* expert stuff here */}
    let [softwareTeams,setSoftwareTeams] = useState([])
    let [humanTeams,setHumanTeams] = useState([])
    let [expertMatchList,setExpertMatchList] = useState([])
    let [fetchedExpertCards,setFetchedExpertCards] = useState([])
    let [expertUserList,setExpertUserList] = useState([]) 
    
    useEffect(()=>{
        // making api call 
        let tg_id = localStorage.getItem('tg_id')
        if(tg_id !== null && tg_id !== undefined && tg_id !== '')
        {
            axios.get(`https://team-generation-api.herokuapp.com/api/plan/status/${tg_id}`)
            .then(response =>{
                let data = response.data.data 
                if(response.status===200)
                {
                    if(data.login=== true)
                    {
                        setLogin(data.login)
                        setPlan(data.plan)
                        setUserName(data.name)
                        setUserRole(data.user_role)
                        setUserEmail (data.email)
                        setCurrentPlan(data.current_plan)
                        setPreviousPlan(data.previous_plans)
                        setPhoneNumber(data.phoneNumber)
                    }
                }
            })
        }
        let stuff = localStorage.getItem('tg_stuff')
        if(stuff === null || stuff === undefined)
            localStorage.setItem('tg_stuff','kvp')
        let data = localStorage.getItem('tgk_data')
        if(data===null || data === undefined)
            localStorage.setItem('tgk_data',JSON.stringify([[],[],[],[]]))


        //team_data 
        let team_data = localStorage.getItem('team_data')
        if(team_data === null || team_data === undefined)
            localStorage.setItem('team_data',JSON.stringify([]))
        //probably if any removal of any out dated match data should be displayed here. 
       team_data = JSON.parse(team_data)
        if(team_data!==null)
        {
            team_data= team_data.filter(team_obj =>{
                let match_time = new Date(team_obj.data.match_time).getTime();
                let now = new Date().getTime()
                if(match_time>now)
                    return true;
                let distance = now-match_time 
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                if(days<7)
                    return true 
                else 
                    return false
            })
            localStorage.setItem('team_data',JSON.stringify(team_data))
        }

        //saved matches data 
        let saved_match_data = localStorage.getItem('saved_match_data')
        if(saved_match_data === null || saved_match_data === undefined)
        //based on the sports available inside the software
            localStorage.setItem('saved_match_data',JSON.stringify([[],[],[],[]]))
        //probably if any removal of any out dated match data should be displayed here. 
        saved_match_data = JSON.parse(saved_match_data)
        if(saved_match_data!==null)
        {
            for(let i=0;i<4;i++)
            {
                saved_match_data[i]= saved_match_data[i].filter(team_obj =>{
                    let match_time = new Date(team_obj.match_time).getTime();
                    let now = new Date().getTime()
                    let distance = now-match_time 
                    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    if(days<7)
                        return true 
                    else 
                        return false  
                })
            }
           
            localStorage.setItem('saved_match_data',JSON.stringify(saved_match_data))
        }

        // //expert stuff here
        // axios.get(`https://team-generation-api.herokuapp.com/api/expert/teamlist`)
        // .then((response)=>{
        //     if(response.status === 200)
        //     {
        //         setExpertMatchList(response.data.data)
        //     }
        // })


    },[])

    return (
    <React.Fragment>
            <ToastContainer  />
            <Router>
            <div className="container " style={{maxWidth:600,padding:0}}>
            <Routes>
                <Route exact path="/"  element={<Home 
                    setReload = {setReload}
                    setAdminPhoneNumber = {setAdminPhoneNumber}
                    userRole = {userRole}
                    expertMatchList = {expertMatchList}
                    setExpertMatchList={setExpertMatchList}
                    setSeriesName = {setSeriesName}
                    setMatchTime = {setMatchTime}
                    sportIndex = {sportIndex}
                    setSportIndex = {setSportIndex}
                    bottomIndex = {bottomIndex}
                    setBottomIndex = {setBottomIndex}
                    setPlayerList = {setPlayerList}
                    setSelectedPlayers = {setSelectedPlayers}
                    setCaptainPlayers = {setCaptainPlayers}
                    setVicecaptainPlayers= {setVicecaptainPlayers}
                    setFixedPlayers = {setFixedPlayers}
                    setRight = {setRight}
                    setLeft = {setLeft}
                    setRole = {setRole}
                    />} />
                <Route path="/mymatches" element = {<PreviousMatch
                    reload = {reload}
                    login = {login}
                    userRole = {userRole}
                    plan = {plan}
                    sportIndex = {sportIndex}
                    setSportIndex = {setSportIndex}
                    bottomIndex = {bottomIndex}
                    setBottomIndex = {setBottomIndex}
                    />} />
                <Route path="/login" element={<Login
                    reload = {reload}
                    setLogin ={setLogin}
                    adminPhoneNumber = {adminPhoneNumber}
                    setUserRole= {setUserRole}
                    setUserName = {setUserName}
                    setUserEmail = {setUserEmail}
                    setPhoneNumber = {setPhoneNumber}
                    setPlan = {setPlan}
                    setCurrentPlan ={setCurrentPlan}
                    setPreviousPlan = {setPreviousPlan}
                    /> } />
                <Route path="/changepassword" element={ <ChangePassword
                    reload = {reload}
                    login = {login}
                    setLogin ={setLogin}
                    setPlan = {setPlan}
                    setCurrentPlan ={setCurrentPlan}
                    setPreviousPlan = {setPreviousPlan}
                    setUserRole = {setUserRole}
                    setPhoneNumber = {setPhoneNumber}
                    setUserName = {setUserName}
                    setUserEmail = {setUserEmail}
                    />} />
                <Route path="/profile" element={<Profile
                    reload = {reload}
                    login = {login}
                    userRole = {userRole}
                    plan = {plan}
                    currentPlan = {currentPlan}
                    previousPlan = {previousPlan}
                    userName = {userName}
                    phoneNumber = {phoneNumber}
                    userEmail = {userEmail}
                    bottomIndex = {bottomIndex}
                    setBottomIndex = {setBottomIndex}
                    setLogin ={setLogin}
                    setPlan = {setPlan}
                    setCurrentPlan ={setCurrentPlan}
                    setPreviousPlan = {setPreviousPlan}
                    setUserRole = {setUserRole}
                    setPhoneNumber = {setPhoneNumber}
                    setUserName = {setUserName}
                    setUserEmail = {setUserEmail}
                    />} />
                <Route path="/plandata" element={<PlanData
                    adminPhoneNumber = {adminPhoneNumber}
                    
                    /> } />
                <Route path="/match/:id" element={<Match 
                    reload = {reload}
                    login = {login}
                    plan = {plan}
                    matchTime = {matchTime}
                    sportIndex = {sportIndex}
                    setSportIndex = {setSportIndex}
                    selectedPlayers = {selectedPlayers}
                    setSelectedPlayers = {setSelectedPlayers}
                    playerList = {playerList}
                    setPlayerList = {setPlayerList}
                    right = {right}
                    left = {left}
                    role = {role}
                    setRight = {setRight}
                    setLeft = {setLeft}
                    setRole = {setRole}
                    setLeftName = {setLeftName}
                    setRightName = {setRightName}
                    setLeftImage = {setLeftImage}
                    setRightImage = {setRightImage}
                    leftName = {leftName}
                    leftImage = {leftImage}
                    rightName = {rightName}
                    rightImage = {rightImage}   
                    setMatchId = {setMatchId}
                    userRole = {userRole}
                    expertMatchList = {expertMatchList}
                    
                    />} />
                
                <Route path="/savedmatches" element={<SavedMatches
                    reload = {reload}
                    login = {login}
                    plan = {plan}
                    sportIndex = {sportIndex}
                    setSeriesName = {setSeriesName}
                    setMatchTime = {setMatchTime}
                    
                    setPlayerList = {setPlayerList}
                    setSelectedPlayers = {setSelectedPlayers}
                    setCaptainPlayers = {setCaptainPlayers}
                    setVicecaptainPlayers= {setVicecaptainPlayers}
                    setFixedPlayers = {setFixedPlayers}
                    setRight = {setRight}
                    setLeft = {setLeft}
                    setRole = {setRole}
                    />} />
                <Route path="/accountsdata" element={<AccountsData 
                    reload = {reload}
                    login={login}
                    userRole = {userRole}
                    phoneNumber = {phoneNumber}
                    />} />
                <Route path="/adminaccountsdata" element={<AdminAccountsData
                    reload = {reload}
                    login={login}
                    userRole = {userRole}
                    />} />
                <Route path="/change" element={<ChangeData 
                    reload = {reload}
                    matchId = {matchId}
                    sportIndex = {sportIndex}
                    playerList = {playerList}
                    setPlayerList = {setPlayerList}
                    leftName = {leftName}
                    rightName = {rightName}
                    />} />
                <Route path="/extradata" element={<AddExtraData 
                    reload = {reload}
                    matchId = {matchId}
                    sportIndex = {sportIndex}
                    playerList = {playerList}
                    setPlayerList = {setPlayerList}
                    leftName = {leftName}
                    rightName = {rightName}
                    />} />
                <Route path="/previousmatch/:id" element={<PreviousMatchDetail 
                    reload = {reload}
                    sportIndex ={sportIndex}
                    />} />

                
                <Route path="/section" element={<Section 
                    reload = {reload}
                    sportIndex = {sportIndex}
                    selectedPlayers={selectedPlayers}
                    setCaptainPlayers = {setCaptainPlayers}
                    setVicecaptainPlayers= {setVicecaptainPlayers}
                    setFixedPlayers = {setFixedPlayers}
                />} />
                <Route path="/fixed" element={<FixedPlayer
                    reload = {reload}
                    sportIndex = {sportIndex}
                    selectedPlayers = {selectedPlayers}
                    setSelectedPlayers = {setSelectedPlayers}
                    fixedPlayers = {fixedPlayers}
                    setFixedPlayers = {setFixedPlayers}
                    />} />
                 <Route path="/captain" element={<CaptainPlayer
                    reload = {reload}
                    sportIndex = {sportIndex}
                    selectedPlayers = {selectedPlayers}
                    setSelectedPlayers = {setSelectedPlayers}
                    captainPlayers = {captainPlayers}
                    setCaptainPlayers = {setCaptainPlayers}
                    />} />
                 <Route path="/vicecaptain" element={<VicecaptainPlayer
                    reload = {reload}
                    sportIndex = {sportIndex}
                    selectedPlayers = {selectedPlayers}
                    setSelectedPlayers = {setSelectedPlayers}
                    vicecaptainPlayers = {vicecaptainPlayers}
                    setVicecaptainPlayers = {setVicecaptainPlayers}
                    />} />
                <Route path="/partision" element ={ <Partision
                    reload = {reload}
                    sportIndex = {sportIndex}
                    selectedPlayers = {selectedPlayers}
                    fixedPlayers = {fixedPlayers}
                    setPartisionStrategy = {setPartisionStrategy}
                    leftName = {leftName}
                    leftImage = {leftImage}
                    rightName = {rightName}
                    rightImage = {rightImage}
                    /> } /> 
                <Route path="/selection" element ={ <Selection
                    reload = {reload}
                    selectedPlayers = {selectedPlayers}
                    selectionFlag = {selectionFlag}
                    setSelectionFlag = {setSelectionFlag}
                    sportIndex = {sportIndex}
                    setSelectionStrategy = {setSelectionStrategy}
                    /> } /> 
                <Route path="/credit" element ={ <CreditRange
                    reload = {reload}
                    leftRange = {leftRange}
                    rightRange = {rightRange}
                    setLeftRange = {setLeftRange}
                    setRightRange = {setRightRange}
                    /> } /> 
                <Route path="/combination" element={<TeamCombination 
                    reload = {reload}
                    sportIndex = {sportIndex}
                    selectedPlayers = {selectedPlayers}
                    fixedPlayers = {fixedPlayers}
                    setCombination = {setCombination}
                    />} /> 
                
                <Route path="/addpoint/:id" element={<AddPoint
                    reload = {reload}
                    sportIndex = {sportIndex}
                    />} />

                <Route path="/advanced" element={<AdvancedGeneration
                    reload = {reload}
                    selectionFlag = {selectionFlag}
                    sportIndex = {sportIndex}
                    playerList = {playerList}
                    selectedPlayers = {selectedPlayers}
                    fixedPlayers = {fixedPlayers}
                    captainPlayers = {captainPlayers}
                    vicecaptainPlayers = {vicecaptainPlayers}
                    partisionStrategy = {partisionStrategy}
                    selectionStrategy = {selectionStrategy}
                    leftRange ={leftRange}
                    seriesName = {seriesName}
                    matchTime = {matchTime}
                    rightRange = {rightRange}
                    matchId = {matchId}
                    combination = {combination}
                    leftName = {leftName}
                    leftImage = {leftImage}
                    rightName = {rightName}
                    rightImage = {rightImage}
                    /> } />
                <Route path="/grand" element={<GrandLeague
                    reload = {reload}
                    selectionFlag = {selectionFlag}
                    sportIndex = {sportIndex}
                    playerList = {playerList}
                    selectedPlayers = {selectedPlayers}
                    seriesName = {seriesName}
                    matchTIme = {matchTime}
                    matchId = {matchId}
                    leftName = {leftName}
                    leftImage = {leftImage}
                    rightName = {rightName}
                    rightImage = {rightImage}
                    />} />
                <Route path="/smart" element={<SmartGeneration
                    reload = {reload}
                    sportIndex = {sportIndex}
                    selectionFlag = {selectionFlag}
                    playerList = {playerList}
                    selectedPlayers = {selectedPlayers}
                    seriesName = {seriesName}
                    matchTime = {matchTime}
                    matchId = {matchId}
                    leftName = {leftName}
                    leftImage = {leftImage}
                    rightName = {rightName}
                    rightImage = {rightImage}
                        />} />
                <Route path="/auto" element={<AutoGeneration
                    reload = {reload}
                    sportIndex = {sportIndex}
                    selectionFlag = {selectionFlag}
                    playerList = {playerList}
                    selectedPlayers = {selectedPlayers}
                    seriesName = {seriesName}
                    matchTime = {matchTime}
                    matchId = {matchId}
                    leftName = {leftName}
                    leftImage = {leftImage}
                    rightName = {rightName}
                    rightImage = {rightImage}
                        />} />

                {/* Expert Related Stuff will come here */}
                <Route path="/decision/:id" element={<Decision 
                    reload = {reload}
                    login = {login}
                    plan = {plan}
                    setLeftImage = {setLeftImage}
                    setRightImage = {setRightImage}
                    setLeftName = {setLeftName}
                    setRightName = {setRightName}
                    sportIndex = {sportIndex}
                    playerList = {playerList}
                    setPlayerList = {setPlayerList}
                    setMatchId = {setMatchId}
                    />} />
                <Route path="/superdecision/:id" element={<SuperDecision 
                    reload = {reload}
                    login = {login}
                    plan = {plan}
                    />} />
                <Route path="/expertpanel/:match" element={<ExpertPanel 
                    reload = {reload}
                    login = {login}
                    plan = {plan}
                    sportIndex={sportIndex}
                    fetchedExpertCards={fetchedExpertCards}
                    setFetchedExpertCards = {setFetchedExpertCards}
                    expertUserList = {expertUserList}
                    setExpertUserList = {setExpertUserList}
                    />} />

                <Route path="/sharesoftware/:match/:attempt" element={ <ShareSoftware
                    sportIndex = {sportIndex}
                    reload = {reload}
                    softwareTeams = {softwareTeams}
                    setSoftwareTeams = {setSoftwareTeams}
                    /> } />
                <Route path="/sharehuman/:match" element={ <ShareHuman 
                    sportIndex = {sportIndex}
                    reload = {reload}
                    playerList = {playerList}
                    humanTeams  = {humanTeams}
                    setHumanTeams = {setHumanTeams}

                    /> } />
                <Route path="/storeexpertteams/:match/:type" element={<StoreExpertTeams 
                    sportIndex = {sportIndex}
                    reload = {reload}
                    softwareTeams = {softwareTeams}
                    humanTeams = {humanTeams}
                    setSoftwareTeams = {setSoftwareTeams}
                    setHumanTeams = {setHumanTeams}
                    phoneNumber = {phoneNumber}
                  
                    />} />


                <Route path="/register463980" element={<Register
                    reload = {reload}
                     userRole = {userRole}
                     phoneNumber = {phoneNumber}
                    />} />
                <Route path="/manageuser" element={<ManageUser
                    reload = {reload}
                    userRole = {userRole}
                    />} /> 
                <Route path="/notify" element={<Notify
                    reload = {reload}
                    userRole = {userRole}
                    />} /> 
                
                <Route path="/AvinashSaini" element={<CollabComponenet
                        mobileNumber = {"7740980052"}
                        setAdminPhoneNumber = {setAdminPhoneNumber}
                    />} />
                <Route path="/MukeshNegi" element={<CollabComponenet
                        mobileNumber = {"8544709127"}
                        setAdminPhoneNumber = {setAdminPhoneNumber}
                    />} />
                <Route path="/GLKINGANEEL" element={<CollabComponenet
                        mobileNumber = {"9908110788"}
                        setAdminPhoneNumber = {setAdminPhoneNumber}
                    />} />
                <Route path="/aboutus" element={<AboutUs /> } />
                <Route path="/contactus" element={<ContactUs
                    adminPhoneNumber = {adminPhoneNumber}
                    /> } />
                <Route path="/howtogenerate" element={<HowToGenerate /> } />
                <Route path="/refundpolicy" element={<RefundPolicy /> } />
                <Route path="/besttips" element={<BestTips /> } />
                <Route path='/analytics/:match/:attempt' element={<Analytics />} />
              </Routes> 
             </div> 
             <div  style={{padding:0}}>
                <Routes>
                    <Route  path="/display/:match/:attempt" element={<DisplayNormal 
                        sportIndex = {sportIndex}
                        userRole = {userRole}
                        reload = {reload}
                        /> } />
                    <Route  path="/result/:match/:attempt" element={<ResultNormal 
                        sportIndex = {sportIndex}
                        reload = {reload}
                        /> } />
                    <Route  path="/displayauto/:match/:attempt" element={<DisplayAuto 
                        sportIndex = {sportIndex}
                        reload = {reload}
                        setSelectedPlayers = {setSelectedPlayers}
                        /> } />
                    <Route  path="/resultauto/:match/:attempt" element={<ResultAuto
                        sportIndex = {sportIndex}
                        reload = {reload}
                        /> } />
                    <Route path='/shortcutprintnormal/:match/:attempt' element = {<ShortcutPrintNormal  
                        />} />
                    <Route path='/shortcutprintauto/:match/:attempt' element = {<ShortcutPrintAuto  
                        />} />
                    <Route path='/showexpertteams/:id' element={<ShowExpertTeams
                        sportIndex = {sportIndex}
                        reload = {reload}
                        expertUserList = {expertUserList}
                        setExpertUserList = {setExpertUserList}
                        fetchedExpertCards = {fetchedExpertCards}
                        setFetchedExpertCards = {setFetchedExpertCards}
                        leftImage = {leftImage}
                        rightImage = {rightImage}
                        leftName = {leftName}
                        rightName = {rightName}
                        seriesName = {seriesName}
                        playerList = {playerList}
                        />} />
                    
                </Routes>
            </div>
            </Router>
        
    </React.Fragment>
    );
}

export default App;