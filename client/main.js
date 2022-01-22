import './style.css'
import Comment from './comments.js';
async function fetchComments() {
  const response = await fetch("https://cautious-spork-backend.nazeemnato.repl.co/api")
  const comments = await response.json()
  return comments
}

const main = async () => {

  let comments = null;
  let hasError = false;

  let view = document.querySelector('#comments');

  try {
    comments = await fetchComments();
  } catch (e) {
    hasError = true
    console.log(e)
  }

  if (hasError) {
    view.innerHTML = `<div class="error">
      <h2>Something went wrong</h2>
      <p>Please try again later</p>
    </div>`
  }

  view.innerHTML = `${comments.map(comment => Comment(comment, 1)).join('')}`
  const upvoteButtons = document.querySelectorAll('.upvote-button');
  upvoteButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      const id = e.target.id
      await fetch(`https://cautious-spork-backend.nazeemnato.repl.co/api/${id}/upvote`, {
        method: "PUT"
      })
      // refresh website
      window.location.reload()
    })
  }
  )

  const replyButtons = document.querySelectorAll('.reply-button');
  replyButtons.forEach(button => {
    button.addEventListener('click', async (e) => {

      var res = window.prompt("Reply to comment:")
      if (res) {
        const id = e.target.id
        await fetch(`https://cautious-spork-backend.nazeemnato.repl.co/api/${id}/reply`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            reply: res
          })
        })
        window.location.reload()
      }
    })
  }
  )


  const commentInput = document.querySelector('#comment-input');
  const commentButton = document.querySelector('#comment-button');
  commentButton.addEventListener('click', async () => {
    const input = commentInput.value
    if (input.length > 0) {
      await fetch("https://cautious-spork-backend.nazeemnato.repl.co/api", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comment: input
        })
      })
      const comments = await fetchComments();
      view.innerHTML = `${comments.map(comment => Comment(comment, 1)).join('')}`
      commentInput.value = ""
    } else {
      alert('Please enter a comment')
    }
  })
}

main()