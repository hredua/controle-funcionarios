function logout(){
    const btnExit = document.querySelector('#exit')
    btnExit.addEventListener('click', (e) => {
     firebase.auth().signOut().then(() => {
         window.location.href = "../../index"
     }).cath(() => {
         alert('Erro ao fazer logout')
     })
    })
 }

 function navbar() {
    const home = document.querySelector('.bxs-home-heart')
    home.addEventListener('click', (e) => {
        window.location.href = "../home/home"
    })

    const boss = document.querySelector('.bx-male-female')
    boss.addEventListener('click', () => {
        window.location.href = "../employer/employer"
    })

    const employee = document.querySelector('.bx-female')
    employee.addEventListener('click', () => {
        window.location.href = "../employee/employee"
    })
 }

 navbar()

 logout()