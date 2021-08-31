import React from 'react';

import '../../style/overlay.scss';

// export interface IOverlayProps {
//     pointGeometry: ol.Feature;
// }

const Overlay: React.FC = () => {
  return (
    <div key={'k-ol-popup'} id={'popup'} className={'ol-popup'}>
      <div key={'k-ol-popup-content'} id={'popup-content'}></div>
    </div>
  );
};

export default Overlay;