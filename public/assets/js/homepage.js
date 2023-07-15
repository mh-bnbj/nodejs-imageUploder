async function copyToClipboard(copyText, element) {
    try {
        await navigator.clipboard.writeText(copyText)
        console.log('Content copied to clipboard')
        var tooltip = element.children[0]
        tooltip.innerHTML = 'Copied: ' + copyText
    } catch (err) {
        console.error('Failed to copy: ', err)
    }
    setTimeout(() => {
        element.blur()
    }, 50)
}

function tooltipLeave(element) {
    var tooltip = element.children[0]
    tooltip.innerHTML = 'Copy to clipboard'
}

function uploadImage(element) {
    document.querySelector('#uploadModal .error-container').innerHTML = ''
    var xhr = new XMLHttpRequest()
    xhr.open('POST', '/upload')
    xhr.onload = function (event) {
        // alert('Success, server responded with: ' + event.target.response) // raw response
        console.log(event)
        if (Math.floor(event.currentTarget.status / 100) == 4) {
            document.querySelector('#uploadModal .error-container').innerHTML = `<div class="alert alert-danger" role="alert">
                                                                                    error happend : ${event.currentTarget.statusText}
                                                                                </div>`
            document.querySelector('.toast-container ').style.zIndex = '2000'
            document.getElementById('toast-upload-failed').classList.add('show')
            document.querySelector('#toast-upload-failed .progress-bar')
            let i = 0
            const myInterval = setInterval(function () {
                document.querySelector('#toast-upload-failed .progress-bar').style.width = `${i}%`
                document.querySelector('#toast-upload-failed .progress-bar').setAttribute('aria-valuenow', `${i}`)
                i += 3
            }, 100)

            setTimeout(() => {
                document.querySelector('#toast-upload-failed .progress-bar').style.width = `${0}%`
                document.querySelector('#toast-upload-failed .progress-bar').setAttribute('aria-valuenow', `${0}`)
                document.getElementById('toast-upload-failed').classList.remove('show')
                document.querySelector('.toast-container ').style.zIndex = '-1'
                clearInterval(myInterval)
            }, 4500)
        } else {
            document.querySelector('#uploadModal .btn-close[aria-label="Close"]').click()
            document.querySelector('#uploadModal input[name="image"]').value = ''
            document.querySelector('#uploadModal input[name="title"]').value = ''

            document.querySelector('.toast-container ').style.zIndex = '2000'
            document.getElementById('toast-upload-successful').classList.add('show')
            document.querySelector('#toast-upload-successful .progress-bar')
            let i = 0
            const myInterval = setInterval(function () {
                document.querySelector('#toast-upload-successful .progress-bar').style.width = `${i}%`
                document.querySelector('#toast-upload-successful .progress-bar').setAttribute('aria-valuenow', `${i}`)
                i += 5
            }, 100)

            setTimeout(() => {
                clearInterval(myInterval)
                document.querySelector('#toast-upload-failed .progress-bar').style.width = `${0}%`
                document.querySelector('#toast-upload-failed .progress-bar').setAttribute('aria-valuenow', `${0}`)
                document.getElementById('toast-upload-successful').classList.remove('show')
                sessionStorage.setItem('create', 'true')
                window.location.reload()
            }, 2000)
        }
    }
    xhr.onerror = function (err) {}
    // or onerror, onabort
    var formData = new FormData(document.getElementById('uploadForm'))
    xhr.send(formData)
}

function deleteImage(element) {
    const imageId = element.getAttribute('value')

    var xhr = new XMLHttpRequest()
    xhr.open('GET', `/deleteImage?imageId=${imageId}`)
    xhr.onload = function (event) {
        // alert('Success, server responded with: ' + event.target.response) // raw response

        if (Math.floor(event.currentTarget.status / 100) == 4) {
            console.log('error')
            document.querySelector('.toast-container ').style.zIndex = '2000'
            document.getElementById('toast-delete-failed').classList.add('show')
            document.querySelector('#toast-delete-failed .progress-bar')
            let i = 0
            const myInterval = setInterval(function () {
                document.querySelector('#toast-delete-failed .progress-bar').style.width = `${i}%`
                document.querySelector('#toast-delete-failed .progress-bar').setAttribute('aria-valuenow', `${i}`)
                i += 3
            }, 100)

            setTimeout(() => {
                document.querySelector('#toast-delete-failed .progress-bar').style.width = `${0}%`
                document.querySelector('#toast-delete-failed .progress-bar').setAttribute('aria-valuenow', `${0}`)
                document.getElementById('toast-delete-failed').classList.remove('show')
                document.querySelector('.toast-container ').style.zIndex = '-1'
                clearInterval(myInterval)
            }, 4500)
        } else {
            element.parentElement.parentElement.parentElement.style.backgroundColor = 'rgb(255,200,200)'
            document.querySelector('.toast-container ').style.zIndex = '2000'
            document.getElementById('toast-delete-successful').classList.add('show')
            document.querySelector('#toast-delete-successful .progress-bar')
            let i = 0
            const myInterval = setInterval(function () {
                document.querySelector('#toast-delete-successful .progress-bar').style.width = `${i}%`
                document.querySelector('#toast-delete-successful .progress-bar').setAttribute('aria-valuenow', `${i}`)
                i += 6
            }, 100)

            setTimeout(() => {
                clearInterval(myInterval)
                document.querySelector('#toast-delete-failed .progress-bar').style.width = `${0}%`
                document.querySelector('#toast-delete-failed .progress-bar').setAttribute('aria-valuenow', `${0}`)
                document.getElementById('toast-delete-successful').classList.remove('show')
                window.location.reload()
            }, 2000)
        }
    }
    xhr.onerror = function (err) {}
    // or onerror, onabort
    xhr.send()
}
