function showLoading() {
    const div = document.createElement('div')
    const img = document.createElement('img')
    img.src = "/assets/images/logo-sl.png"
    img.classList.add('pulsate-fwd')
    div.appendChild(img)
    div.classList.add('loading')
    document.body.appendChild(div)
}

function hideLoading() {
    const loadings = document.querySelectorAll('.loading')
    if (loadings.length) {
        loadings[0].remove()
    }
}