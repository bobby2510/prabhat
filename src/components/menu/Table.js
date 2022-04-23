import React from 'react'  



const Table = (props)=>{
    return (
        <React.Fragment>
        <div className='analytic-section'>
                <div style={{textAlign:'center',padding:5}}>
                    <h4>{props.header}</h4>
                </div>
                <table class="table" style={{textAlign:'center'}}>
                    <thead class="thead-light">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">{props.name}</th>
                        <th scope="col">No.Teams</th>
                        <th scope="col">% </th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           props.data[0].map((name,index)=>{
                                return <tr>
                                <th scope="row">{index+1}</th>
                                <td>{name}</td>
                                <td>{props.data[1][index]}</td>
                                <td>{props.data[2][index]}</td>
                            </tr>
                           })
                       }
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
}

export default Table;