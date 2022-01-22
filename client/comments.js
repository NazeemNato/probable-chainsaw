let view = document.querySelector('#comments');

function timeago(time) {
    return moment(time).fromNow();
}

export default function Comment(comment, i) {
    return `
     <div class="nested-comments-${i}">
      <p class="header">
       <b>${randomName()}</b> .  <i>${timeago(comment.createdAt)} </i>
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