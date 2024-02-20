import React from 'react';
import DetailItem from './DetailItem';

import {useLocation} from 'react-router-dom';

const DetailList = () => {
  const location = useLocation();
  const detailList = location?.state?.debateItem;
  const subjectId = detailList?.id;
  const imageUrl = detailList?.poster

  return (
    <div className="DetailList">
      <div>
        <DetailItem subjectId={subjectId} imageUrl = {imageUrl} {...detailList} />
      </div>
    </div>
  );
};

DetailList.defaultProps = {
  detailList: []  
};

export default DetailList;