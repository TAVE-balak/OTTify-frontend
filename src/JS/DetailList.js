import React from 'react';
import DetailItem from './DetailItem';

const DetailList = ({ detailList }) => {

  return (
    <div className="DetailList">
      <div>
        {detailList.map((it) => (
          <DetailItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
};

DetailList.defaultProps = {
  detailList: []  
};

export default DetailList;
