import React from 'react';

import classes from './Button1.css';

const button1 = (props) => (
    <button
        className={[classes.Button1, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default button1;