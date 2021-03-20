import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COMMENT_UPLOAD_REQUEST } from "../../../redux/types";

import SingleComment from "./SingleComment";

const CommentComponent = ({ categoryName, num }) => {
  const dispatch = useDispatch();
  const commentList = useSelector((state) => state.comment.comments);
  const userId = useSelector((state) => state.auth.id);

  const [formValue, setFormValue] = useState({
    content: "",
    studentId: "",
  });

  const resetValue = useRef(null);

  const onChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { content } = formValue;
    const body = {
      content: content.replace(/(?:\r\n|\r|\n)/g, ' <br /> '),
      studentId: userId,
      categoryName,
      num,
    };

    if (body.content.length === 0) {
      alert("댓글이 비었습니다.");
    } else {
      dispatch({
        type: COMMENT_UPLOAD_REQUEST,
        payload: body,
      });

      resetValue.current.value = "";

      setFormValue({
        content: "",
        studentId: userId,
      });
    }
  };

  return (
    <>
      {commentList ? (
        commentList.map((comment) => {
          return (
            <SingleComment
              comment={comment}
              key={comment.num}
              categoryName={categoryName}
              num={num}
            />
          );
        })
      ) : (
        <></>
      )}

      <form className="detail-comment">
        <h1 className="comment-title">Write comments</h1>
        <div className="comment-submit-box">
          {userId ? (
            <>
              <textarea
                ref={resetValue}
                type="textarea"
                name="content"
                id="comment-content-area"
                className="comment-content-area"
                onChange={onChange}
                placeholder="Comment"
              />
              <button className="comment-submit-btn" onClick={onSubmit}>
                Submit
              </button>
            </>
          ) : (
            <p className="not-login-comment">로그인 후에 댓글을 생성하실 수 있습니다.</p>
          )}
        </div>
      </form>
    </>
  );
};

export default CommentComponent;
