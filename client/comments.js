let view = document.querySelector('#comments');

function timeago(time) {
    return moment(time).fromNow();
}

async function fetchComments() {
    const response = await fetch("http://localhost:7000/api")
    const comments = await response.json()
    return comments
}

// since not name from api
function randomName() {
    let firstName = ["John", "Jane", "Mary", "Bob", "Tom", "Sam", "Jack", "Lily", "Linda", "Sally", "Sue", "Sara", "Sebastian", "Sophie", "Sofia"]
    let lastName = ["Peters", "Smith", "Jones", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris"]
    return firstName[Math.floor(Math.random() * firstName.length)] + " " + lastName[Math.floor(Math.random() * lastName.length)]
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