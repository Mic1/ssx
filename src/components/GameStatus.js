import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';


const GameStatus = ({ gmStatus1, gmStatus2 }) => {

  return (
    <div className="card">
      <div className="card-action">
        <h4>
          Game Status11 <Badge>{gmStatus1}</Badge>
        </h4>
        <h4>
          Game Status2 <Badge>{gmStatus2}</Badge>
        </h4>
      </div>
    </div>
  );
};

GameStatus.propTypes = {
  gmStatus1: PropTypes.string.isRequired,
  gmStatus2: PropTypes.string.isRequired
};

export default GameStatus;
