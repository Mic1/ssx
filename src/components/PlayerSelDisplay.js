import React from 'react';
import PropTypes from 'prop-types';

const PlayerSelDisplay = ({ plyr_typ, plyr_typ_val, plyr_typ_icn, plyr_typ_plyr }) => {

  return (
    <div className="card">
      <div className="card-image">
        <img className="img-responsive" src="/img/trans.png" width={400} />
        <span className="card-title">{plyr_typ_plyr}</span>
      </div>
      <div className="card-content">
        <div className="product-display">
          <p className="product-description">{plyr_typ}</p>
          <p className="product-description">{plyr_typ_val}</p>
          <h4 className="product-price">{plyr_typ_icn}</h4>
        </div>
      </div>
      <div className="card-action">
        <button>PlayerSel</button>
      </div>
    </div>
  );
};

PlayerSelDisplay.propTypes = {
  plyr_typ: PropTypes.string.isRequired,
  plyr_typ_val: PropTypes.string.isRequired,
  plyr_typ_icn: PropTypes.string.isRequired,
  plyr_typ_plyr: PropTypes.string.isRequired
};

export default PlayerSelDisplay;
