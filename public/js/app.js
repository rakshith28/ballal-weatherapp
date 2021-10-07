console.log("check the page")




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgone = document.querySelector('#msg1')
const msgtwo = document.querySelector('#msg2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()


    const location = search.value
    msgone.textContent = ''
    msgtwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgone.textContent = data.error
            } else {
                msgone.textContent = data.location
                msgtwo.textContent = data.forecast

            }
        })
    })
})