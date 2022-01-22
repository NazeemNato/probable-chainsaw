let view = document.querySelector('#comments');

function timeago(time) {
    return moment(time).fromNow();
}

async function fetchComments() {
    const response = await fetch("http://localhost:7000/api")
    const comments = await response.json()
    return comments
}

export default function Comment(comment, i) {
    return `
     <div class="nested-comments-${i}">
      <p class="header">
       <b>${comment?.name}</b> .  <i>${timeago(comment.createdAt)} </i>
      </p>
      <p class="content">
      ${comment.text}
      </p>
      <p class="row buttons">
      <a href="#"  class="upvote-button"  id="${comment.id}">${comment.upvotes} ▲  upvote</a>
      ${i <= 2 ? `<a href="#" class="reply-button" id="${comment.id}">Reply</a>` : ""}
      </p>
      ${comment?.children && comment?.children.length > 0 ? comment.children.map(comment => Comment(comment, i + 1)).join('') : ""}
    </div>
    `
}