import './scss/styles.scss'
import './switch.js'

document.querySelector('form').onsubmit = function (e) {
  console.log('e :>> ', e)
  e.preventDefault()
  const formData = new FormData(this)
  const master = {}

  this.querySelectorAll('input-switch').forEach((el) => {
    formData.append(el.name, el.value)
    master[el.name] = el.value
  })

  fetch(this.getAttribute('action') || '', {
    method: 'POST',
    body: formData
  })
}
