window.onload= () => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location.href = './pages/home/home';
        }
    })
}

const form =  document.querySelector('.form-login')
const email = document.querySelector('#email')
const password = form.querySelector('#password')
const btn1 = form.querySelector('#btn1')
const btn2 = form.querySelector('#btn2')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    showLoading()
    login()
    resetFields()
})


function login() {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(response => {
        hideLoading()
        window.location.href = './pages/home/home'
    }).catch(error => {
        hideLoading()
        alert(getErrorMessage(error));
        validateFields()
    })
}

function getErrorMessage(error) {
    if (error.code == "auth/user-not-found") {
        return "Usuário não encontrado"
    }
    if (error.code == "auth/wrong-password") {
        return "Senha incorreta"
    }
    return error.message;
}

function validateFields() {
    if (!validateEmail(email.value) || !password.value) {
        btn1.disabled = true
    } else if (validateEmail(email.value) && password.value) {
        btn1.disabled = false
    }
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email)
}

function resetFields() {
    email.value = ''
    password.value = ''
}

