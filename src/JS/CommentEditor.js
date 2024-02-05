import { useRef, useCallback, useEffect, useState } from 'react';
import '../CSS/DebateDetail.css';

import { createDiscussionComment, fetchDiscussionEach } from './WonAPI';

const CommentEditor = ({ onCreate }) => {
  const commentInput = useRef();
  const handleResizeHeight = useCallback(() => {
    commentInput.current.style.height = commentInput.current.scrollHeight + "px";
  }, []);

  const [state, setState] = useState({
    author: "",
    content: "",
    favorite: "",
    profile: "",
    created_date: ""
  });

  const [commentArea, setCommentArea] = useState("");
  const handleCommentChange = (event) => {
    setCommentArea(event.target.value);
  };

  const handleChangeState = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (state.content.length < 1) {
      commentInput.current.focus();
      return;
    }

    try {
      const replyCommentCreateDTO = {
        subjectId: 74,
        comment: state.content
      };

      const CommentData = await createDiscussionComment(replyCommentCreateDTO);
      console.log(CommentData);

      const CommentListData = await fetchDiscussionEach(74);
      const testhyun = CommentListData.data.commentListsDTOList;
      const lastComment = testhyun && testhyun[testhyun.length - 1];
      console.log(lastComment);

      const targetDate = new Date(lastComment.createdAt);
      const currentDate = new Date();
      const timeDiff = currentDate - targetDate;
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

      let displayDate;
      if (daysDiff < 30) {
        displayDate = `${daysDiff}일 전`;
      } else if (daysDiff < 365) {
        const monthsDiff = Math.floor(daysDiff / 30);
        displayDate = `${monthsDiff}달 전`;
      } else {
        const yearsDiff = Math.floor(daysDiff / 365);
        displayDate = `${yearsDiff}년 전`;
      }

      setState((prev) => ({
        ...prev,
        author: lastComment.nickName,
        content: lastComment.comment,
        favorite: lastComment.likeCount,
        profile: lastComment.profileUrl,
        created_date: displayDate,
      }));

      onCreate(lastComment.nickName, lastComment.content, lastComment.likeCount, lastComment.profileUrl, displayDate);///
      setCommentArea("");
    } catch (error) {
      console.log('Error creating comment:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const CommentListData = await fetchDiscussionEach(74);
        const testhyun = CommentListData.data.commentListsDTOList;
        const lastComment = testhyun && testhyun[testhyun.length - 1];

        setState((prev) => ({
          ...prev,
          author: lastComment.nickName,
          content: lastComment.comment,
          favorite: lastComment.likeCount,
          profile: lastComment.profileUrl,
          created_date: lastComment.createdAt,
        }));
        
      } catch (error) {
        console.log('Error fetching initial data:', error);
      }
    };

    fetchData(); // 컴포넌트가 처음 마운트될 때 한 번만 데이터를 불러오도록 설정
  }, []); // 빈 배열을 의존성으로 사용하여 한 번만 실행되도록 설정

  

  return (
    <div className='commentEditor'>
      <div className='debatedetail_comment'>
        <textarea
          ref={commentInput}
          name="content"
          value={commentArea}
          className='debate_comment'
          placeholder='댓글을 작성해주세요'
          onInput={handleResizeHeight}
          onChange={(e) => {
            handleChangeState(e);
            handleCommentChange(e);
          }}
        ></textarea>
        <button className={`comment_enroll ${commentArea ? 'active' : ''}`} onClick={handleSubmit}>
          등록
        </button>
      </div>
    </div>
  );
};

export default CommentEditor;
