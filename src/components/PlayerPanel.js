import React from 'react';
import PropTypes from 'prop-types';
//import {Button} from 'react-bootstrap';


const PlayerPanel = ({ mode }) => {
  return (
    <div className="card">
      <div>
        <button type={"button"} className={"btn btn-success"}>
          {mode}
        </button>
      </div>
    </div>
  );
};

PlayerPanel.propTypes = {
  mode: PropTypes.string.isRequired
};

export default PlayerPanel;
