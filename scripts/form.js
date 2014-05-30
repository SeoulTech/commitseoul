var email = document.getElementById('email'),
  subscribe = document.getElementById('subscribe'),
  popover = document.getElementById('popover')

listenTo(email, 'keydown', hidePopover)
listenTo(subscribe, 'click', handleSubscriptionRequest)

function listenTo(obj, event, callback) {
  if (obj.addEventListener) {
    obj.addEventListener(event, callback, false)
  } else {
    obj.attachEvent('on' + event, callback)
  }
}

function handleSubscriptionRequest(event) {
  var backend = 'https://docs.google.com/forms/d/1p4Hk3LKLK6NqPSrxlSXbQdoo-ndSJZ0MmWFpgiHbMNY/formResponse',
    validator = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    iframe = document.createElement('iframe')

  if (event.preventDefault) {
    event.preventDefault()
  } else {
    event.returnValue = false
  }

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