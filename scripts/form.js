var email = document.getElementById('email'),
  subscribe = document.getElementById('subscribe'),
  popover = document.getElementById('popover')

email.addEventListener('keydown', hidePopover)
subscribe.addEventListener('click', handleSubscriptionRequest)

function handleSubscriptionRequest(event) {
  var backend = 'https://docs.google.com/forms/d/1p4Hk3LKLK6NqPSrxlSXbQdoo-ndSJZ0MmWFpgiHbMNY/formResponse',
    validator = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    iframe = document.createElement('iframe')

  event.preventDefault()

  if (validator.test(email.value)) {
    iframe.name = 'iframe'
    iframe.style.display = 'none'
    iframe.src = backend
    iframe.onload = cleanup

    document.body.appendChild(iframe)

    form.target = 'iframe'
    form.method = 'post'
    form.action = backend
    form.submit()

    finalize()
  } else {
    showPopover('Please enter a valid email address')
  }
}

function finalize() {
  showPopover('Thank you! We will keep you updated.')
  email.disabled = true
  subscribe.disabled = true
  setTimeout(hidePopover, 2000)
}

function cleanup() {
  document.body.removeChild(document.getElementsByTagName('iframe')[0])
  iframe = null
}

function hidePopover() {
  popover.className = 'popover hidden'
}

function showPopover(text) {
  popover.innerText = text
  popover.className = 'popover'
}