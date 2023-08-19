'use strict'

const form = document.querySelector('form')
const textAlert = document.querySelector('.alert')
const changeButton = document.getElementById('change')
const label = document.getElementById('label')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const formData = Object.fromEntries(
    new FormData(e.target)
  )

  const { text } = formData
  if (!text) return

  const lang = label.innerHTML === 'English text' ? 'es' : 'en'
  translate(text, lang)
    .then(translateObj => {
      const { translations } = translateObj
      if (!translations) {
        const err = 'No translation found :('
        textAlert.innerHTML = err
        return
      }
      const translation = translations[0].translation
      textAlert.innerHTML = translation
    })
})

changeButton.addEventListener('click', () => {
  console.log(label.innerHTML);
  const labelText = label.innerHTML === 'English text' ? 'Spanish text' : 'English text'
  label.innerHTML = labelText
})

async function translate(text, lang) {
  const endpoint = `https://api.apilayer.com/language_translation/translate?target=${lang}`

  const res = await fetch(endpoint, {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'apikey': 'kfhSmhbYWughtB2ijpcCvsu1naCyMCGl',
    },
    body: `${text}`,
  })

  const translation = await res.json()
  return translation
}
