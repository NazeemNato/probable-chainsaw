import React, { useState, useEffect } from "react";
import axio from "axios";
import Form from "./components/Form";
import Comment from "./components/Comment";

function App() {
  // set initial state to null
  const [data, setData] = useState(null);
  // set initial loading state to true
  const [loading, setLoading] = useState(true);
  // set comment form text to empty string
  const [text, setText] = useState("");
  // fetch data from the server
  const fetchData = async () => {
    const response = await axio.get(
      "https://cautious-spork-backend.nazeemnato.repl.co/api"
    );
    setData(response.data);
    setLoading(false);

  };
  // useEffect to fetch data from the server
  useEffect(() => {
    fetchData();
  }, []);
  // refetch data from the server every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  //  comment form submit handler
  const onSubmit = async (e) => {
    e.preventDefault();
    await axio.post("https://cautious-spork-backend.nazeemnato.repl.co/api", {
      comment: text,
    });
    await fetchData();
    setText("");
  };
  // upvote handler
  const upvote = async (id) => {
      // update data in the state
        const updatedData = data.map((comment) => {
            if (comment.id === id) {
                return {
                    ...comment,
                    upvotes: comment.upvotes + 1,
                };
            }
            return comment;
        });
    setData(updatedData);
    // so no delay in posting to the server
    await axio.put(
      `https://cautious-spork-backend.nazeemnato.repl.co/api/${id}/upvote`
    );
    await fetchData();
  }
  // replay handler
  const replay  = async (id) => {
      const prompt = window.prompt("Reply to this comment");
        if (prompt) {
            await axio.post(
                `https://cautious-spork-backend.nazeemnato.repl.co/api/${id}/reply`,
                {
                    reply: prompt,
                }
            );
            await fetchData();
        }
  }

  return (
    <div className="container">
      <h1>Discussion</h1>
      <div>
        <Form text={text} onSubmit={onSubmit} setText={setText} />
      </div>
      <hr />
      {data === null && loading && <div>Loading...</div>}
      {data &&
        !loading &&
        data.map((comment) => (
          <Comment comment={comment} key={comment.id} i={1} upvote={upvote} replay={replay} />
        ))}
    </div>
  );
}

export default App;
