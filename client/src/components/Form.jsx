import React, { useState } from "react";

function Form({ onSubmit, setText, text }) {
  return (
    <div className="row">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={text}
          required
          onChange={(e) => setText(e.target.value)}
          className="comment-input"
          placeholder="What are your thoughts?"
        />
        <button className="comment-button">Comment</button>
      </form>
    </div>
  );
}

export default Form;
