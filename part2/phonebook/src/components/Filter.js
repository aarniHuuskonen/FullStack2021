import React from 'react'

const Filter = ({filter, handleFiltering}) => {
    return(
        <div>
            filter shown with<input 
            value={filter} 
            onChange={handleFiltering}/>
        </div>
    )
}

export default Filter