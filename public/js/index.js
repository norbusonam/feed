const socket = io();

// Selectors
const newPostForm = $('#post-form')
const postList = $('#post-list')
const userCount = $('#users-online')

// Create new post
newPostForm.submit((e) => {
  e.preventDefault()
  const title = newPostForm.find('input[name="title"]').val()
  const body = newPostForm.find('textarea[name="body"]').val()
  socket.emit('new post', title, body)
  newPostForm.trigger('reset')
})


// New post was created
socket.on('new post', (title, body, time) => {
  const formattedTime = moment(time).format('dddd, MMMM Do YYYY, h:mm:ss a')
  const newPostItem = `<li><div class="uk-card uk-card-default uk-animation-slide-top-small"><div class="uk-card-header"><div class="uk-grid-small uk-flex-middle" uk-grid><div class="uk-width-expand"><h3 class="uk-card-title uk-margin-remove-bottom">${title}</h3><p class="uk-text-meta uk-margin-remove-top">${formattedTime}</p></div></div></div><div class="uk-card-body"><p>${body}</p></div></div></li>`
  postList.prepend(newPostItem)
  console.log(time.toLocaleString())
})

// User count changed
socket.on('new user count', (count) => {
  userCount.text(count)
})