import React from 'react';
import '../css/loading.css';

const Loading = props => {
    return(<>
        {
            props.start === true &&
            <div id="overlay">
                <div className="shapeshifter play" style={ { backgroundImage: `url(${'/image/loading.gif'})` } } ></div>
            </div>
        }
    </>)
}

export default Loading
