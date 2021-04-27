import React from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.css';
import Aux from '../../../hoc/_Aux';
import Backdrop from '../Backdrop/Backdrop';
// import {GamePage} from "../../../containers/GamePage";

const modal = ( props ) => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
            className={classes.Modal}
            style={{
                zIndex: props.zval,
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0',
            }}>
            {props.children}
        </div>
    </Aux>
);

modal.propTypes = {
  modalClosed: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  zval: PropTypes.number.isRequired,
};

export default modal;
