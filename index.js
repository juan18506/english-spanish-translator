'use strict'

const form = document.querySelector('form')
const textAlert = document.querySelector('.alert')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const formData = Object.fromEntries(
    new FormData(e.target)
  )

  const { englishText } = formData
  if (!englishText) return

  translate(englishText)
    .then(translateObj => {
      const { translations } = translateObj
      if (!translations) {
        const err = 'No translation found :('
        textAlert.innerHTML = err
        return
      }
      const translation = translateObj.translations[0].translation
      textAlert.innerHTML = translation
    })
})

async function translate(englishText) {
  const res = await fetch('https://api.apilayer.com/language_translation/translate?target=es', {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'apikey': 'kfhSmhbYWughtB2ijpcCvsu1naCyMCGl',
    },
    body: `${englishText}`,
  })

  const translation = await res.json()
  return translation
}
