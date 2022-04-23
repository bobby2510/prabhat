import React,{useState} from 'react'  


const PlayerExtraChange = (props)=>{
    //console.log(props.player)
    let [captain,setCaptain] = useState(props.player.captain_selection)
    let [vicecaptain,setVicecaptain] = useState(props.player.vicecaptain_selection)
    let [prePoints,setPrePoints] = useState(props.player.pre_points)

    let type_name = [
        ['WK','BAT','AL','BOWL'],
        ['GK','DEF','MID','ST'],
        ['PG','SG','SF','PF','C'],
        ['DEF','ALL','RAI']
    ]
    let shortcutName = (n)=>{
        let arr = n.split(' ')
        let name =''
        if(arr.length>=3)
            name = arr[0][0]+' '+arr[1][0]+' '+arr[2]
        else if(arr.length===2)
            name = arr[0][0]+' '+arr[1]
        else 
            name = arr[0]
        name = name + '          '
        name = name.substring(0,10)
        let temp = 0
        for(let i=name.length-1;i>=0;i--)
        {
            if(name[i]===' ')
            temp++
            else 
                break; 
        }
        if (temp === 6)
        return (<span>{name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>);
        else if(temp === 5)
        return (<span>{name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>);
        else if(temp === 4)
        return (<span>{name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>);
        else if(temp === 3)
        return (<span>{name}&nbsp;&nbsp;&nbsp;&nbsp;</span>);
        else if(temp === 2)
        return (<span>{name}&nbsp;&nbsp;&nbsp;</span>);
        else if(temp === 1)
        return (<span>{name}&nbsp;</span>);
        else 
        return (<span>{name}</span>);
    }
    // color:#eca048;
    let handleCaptain = (e)=>{
        props.handlePlayer(props.player.player_index,props.index,e.target.value,vicecaptain,prePoints)
        setCaptain(e.target.value)
    }
    let handleVicecaptain = (e)=>{
        props.handlePlayer(props.player.player_index,props.index,captain,e.target.value,prePoints)
        setVicecaptain(e.target.value)
    }
    let handlePrePoints = (e)=>{
        props.handlePlayer(props.player.player_index,props.index,captain,vicecaptain,e.target.value)
        setPrePoints(e.target.value)
    }
    return (
        <React.Fragment>
        <div className="player-container">
            <div className="player-item-one d-flex justify-content-start align-items-center">
                <div  style={{position:'relative'}}>
                <img className="player-image" src={props.player.image} alt="player" />   
                </div>
                <div className="d-flex flex-column align-items-start justify-content-center">
                    <span className="bobby-name">{shortcutName(props.player.name)}</span>
                    <span className="bobby-percentage" style={{color:"green"}}>{props.player.playing === 1? '• Playing' : ''}</span>
                </div>
            </div>
            <div  style={{fontWeight:500,flexGrow:1}}>
            <input onChange={ handlePrePoints } type="number" style={{width:60}} name="prepoints" value={prePoints} placeholder='points' />
            </div>
            <div  style={{fontWeight:500,flexGrow:1}}>
            <input onChange={ handleCaptain } type="number" style={{width:50}} name="captain" value={captain} placeholder='captain' />
            </div>
            <div  style={{fontWeight:500,flexGrow:1}}>
            <input onChange={ handleVicecaptain } type="number" style={{width:50}} name="vicecaptain" value={vicecaptain} placeholder='vc' />
            </div>
        </div>
        </React.Fragment>
    );
}

export default PlayerExtraChange;