import React from 'react';
import DetailItem from './DetailItem';

import {useLocation} from 'react-router-dom';

const DetailList = () => {
  const location = useLocation();
  const detailList = location?.state?.debateItem;

  return (
    <div className="DetailList">
      <div>
        <DetailItem {...detailList} />
      </div>
    </div>
  );
};

DetailList.defaultProps = {
  detailList: []  
};

export default DetailList;