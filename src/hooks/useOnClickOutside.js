import { useEffect } from 'react';

// ref 밖을 클릭하거나 터치했을 때 실행할 함수를 등록하는 커스텀 훅
export default function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            // ref가 존재하고 클릭된 요소가 ref 안에 있는 경우 핸들러 실행
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };

        // 마우스 및 터치 이벤트에 대한 리스너 추가
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            // 컴포넌트가 언마운트될 때 리스너 제거
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]); // ref나 handler가 변경될 때마다 실행
}
