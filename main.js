// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
  listenToHeart();
}) 

const errorModal = document.getElementById('modal')
errorModal.className = 'hidden'

function listenToHeart() {
  const body = document.querySelector('body');
  body.addEventListener('click', function(event) {
    if (event.target.tagName === "SPAN") {
      const heart = event.target
      mimicServerCall()
        .then(resp => {
          if (heart.innerText === FULL_HEART) {
            heart.className = ''
            heart.innerText = EMPTY_HEART
          } else {
          heart.className = 'activated-heart'
          heart.innerText = FULL_HEART
          }
        })
        .catch((error) => renderError(error))
    }
  })
}

function renderError(error) {
  errorModal.className = '';
   const modalMsg = document.getElementById('modal-message');
   modalMsg.innerText = error;
  hideModal();
}

function hideModal() {
  setTimeout(() => {
    errorModal.className = 'hidden'
  }, 5000)
}


//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
