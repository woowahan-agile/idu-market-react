import React, { useState } from "react";
import { RiDeleteBin6Line, RiPencilLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  COMMENT_GET_REQUEST,
  COMMENT_UPDATE_REQUEST,
  COMMENT_DELETE_REQUEST,
} from "../../../redux/types";

const ReplyComment = ({ comment, num, categoryName }) => {
  const userId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  const [openUpdate, setOpenUpdate] = useState(false);

  const [updateFormValue, setUpdateFormValue] = useState({
    content: comment.content,
    studentId: userId,
    commentNum: comment.num,
    categoryName,
    num,
    groupNum: comment.groupNum,
  });

  const onOpenUpdate = () => {
    setOpenUpdate(!openUpdate);
  };

  const onUpdateChange = (e) => {
    setUpdateFormValue({
      ...updateFormValue,
      [e.target.name]: e.target.value,
    });
  };

  const onUpdate = (e) => {
    e.preventDefault();

    const {
      content,
      categoryName,
      num,
      groupNum,
      commentNum,
    } = updateFormValue;

    const body = {
      content,
      studentId: userId,
      categoryName,
      commentNum,
      num,
      groupNum,
    };

    if (body.content.length === 0) {
      alert("댓글이 비었습니다.");
    } else {
      dispatch({
        type: COMMENT_UPDATE_REQUEST,
        payload: body,
      });

      setTimeout(() => {
        dispatch({
          type: COMMENT_GET_REQUEST,
          payload: body,
        });
      }, 100);
    }

    setOpenUpdate(!openUpdate);
  };

  const onDelete = (e) => {
    e.preventDefault();

    const body = {
      commentNum: comment.num,
      categoryName,
      num,
      studentId: userId,
      depth: comment.depth,
    };

    const deleteConfirm = window.confirm("답글을 삭제하시겠습니까?");

    if (deleteConfirm) {
      dispatch({
        type: COMMENT_DELETE_REQUEST,
        payload: body,
      });

      setTimeout(() => {
        dispatch({
          type: COMMENT_GET_REQUEST,
          payload: body,
        });
      }, 100);
    }
  };

  return (
    <>
      <div className="reply-box">
        <div className="comment-student-id">
          <img
            src={comment.profilePath}
            alt="프로필 이미지"
            className="comment-profile-img"
          />
          <Link to={`/students/${comment.studentId}`}>{comment.nickname}</Link>
        </div>
        <div className="comment-content">
          <span>{comment.content}</span>
        </div>
        <div className="comment-comment-date">
          <span>{comment.inDate}</span>
        </div>

        {openUpdate ? (
          <div className="comment-submit-box">
            <textarea
              type="textarea"
              name="content"
              id="comment-content-area"
              className="comment-content-area update"
              onChange={onUpdateChange}
              placeholder="Comment"
              defaultValue={comment.content}
            />

            <button className="comment-submit-btn update" onClick={onUpdate}>
              Update
            </button>
          </div>
        ) : (
          <></>
        )}

        {userId === comment.studentId ? (
          <div className="comment-update-box">
            <button className="comment-update-icon" onClick={onOpenUpdate}>
              <RiPencilLine />
            </button>
            <button className="comment-delete-icon" onClick={onDelete}>
              <RiDeleteBin6Line />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ReplyComment;
