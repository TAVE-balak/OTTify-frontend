import { useState, useEffect } from "react";

// 입력값(value)을 지연(delay)만큼 디바운스하여 반환하는 커스텀 훅
export const useDebounce = (value, delay) => {
  // 디바운스된 값을 저장할 상태
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // 입력값을 디바운스 지연시간 후에 업데이트
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    // 이전 setTimeout 핸들러를 클리어하고 새로운 값으로 설정
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // value나 delay가 변경될 때마다 실행

  return debounceValue; // 디바운스된 값을 반환
};
