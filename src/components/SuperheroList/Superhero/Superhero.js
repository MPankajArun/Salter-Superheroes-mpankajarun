import React from 'react';
import './Superhero.css';

const superHero = (props) => {
    const gradArray = ['p-1','p-2','p-3','p-4','p-5','p-6']
    return(
    <div className="Superhero">
        <h1>{props.details.name}</h1>
         <img src={props.details.image.url} alt={props.details.name} /> 
        <div className="powerstat-container">
            <h2>Powerstats</h2>
            {Object.entries(props.details.powerstats).map((entry,i) => {
                if(entry[1] === 'null' || entry[1] === '-' || entry[1] === '') return <p>{entry[0]+' : [Data unavailable]'}</p>

                return <div key={i}>
                    <h3>{entry[0]}</h3>
                    <div className='stats-holder'>
                        <div className={`Powerstats ${gradArray[i]}`}  style={{width: `${entry[1]}%`}}>{entry[1]+' %'}</div>
                    </div>
                </div>
            })}
        </div>
        <br />
    </div>
)
}
export default superHero;