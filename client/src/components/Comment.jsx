import React from "react";
import moment from "moment";

function Comment({ comment, i, upvote, replay }) {
  return (
    <div className={`nested-comments-${i}`}>
      <p className="header">
        <b>{comment?.name}</b> . <i> {moment(comment?.createdAt).fromNow()}</i>
      </p>
      <p className="content">{comment?.text}</p>
      <p className="row buttons">
        <div className="upvote-button" onClick={() => upvote(comment?.id)}>
          {comment?.upvotes} ▲ upvote
        </div>
        {i <= 2 ? (
          <div className="reply-button" onClick={() => replay(comment?.id)}>
            Reply
          </div>
        ) : (
          ""
        )}
      </p>

      {comment?.children && comment?.children.length > 0
        ? comment?.children.map((comment) => (
            <Comment
              comment={comment}
              key={comment.id}
              i={i + 1}
              upvote={upvote}
              replay={replay}
            />
          ))
        : ""}
    </div>
  );
}

export default Comment;
