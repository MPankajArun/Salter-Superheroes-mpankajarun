import React from 'react';
import Spinner from '../../common/Spinner/Spinner';
import './SuperheroList.css';

const superheroList = (props) => {
    const superheroItems = props.superheroData.map(superhero =>{ 
        if(superhero === null){
            return <Spinner />
        }
        
        return (        
        <div className= "SuperheroList" key={superhero.id}>
            <img src={superhero.image.url} onClick = {(e) => props.cardClick(e)} id={superhero.id} alt={`superheroImage-${superhero.id}`}  onError={(e) => {
     e.target.src = 'data:image/png;base64,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' // some replacement image
      // inline styles in html format
            }}></img>
            <h2>{superhero.name}</h2>
            {
                superhero?.biography && (<>
                    <div className="quality">
                        {Object.entries(superhero.biography).map((entry,i) => {
                            if(entry[1] === 'null' || entry[1] === '-' || entry[1] === '') return <p key={i}><span className='Span'>{entry[0]+' : '}</span>{'[Data unavailable]'}</p>
                            return <p key={i}><span className='Span'>{entry[0]+' : '}</span>{entry[1].toString().length > 40 ? `${entry[1].toString().substr(0,30)}...` : entry[1]}</p>               
                        })}
                    </div></>)
            }
        </div>
    )});


    return (
        <React.Fragment>
            {superheroItems}
        </React.Fragment>
)}

export default superheroList;