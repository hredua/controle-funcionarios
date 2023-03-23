function getContractsUid() {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('uid') 
}

function isNewContract() {
    return getContractsUid() ? false : true;
}


function myScope () {
    const form = document.querySelector('#add-client')
    const contratante = document.querySelector('#contratante');
    const funcionario = document.querySelector('#funcionario');
    const employee = document.querySelector('.employee');
    const boss = document.querySelector('.boss');
    const portion = document.querySelector('.portion');
    const radio = document.querySelector('.radio')
    const name = form.querySelector('#name')
    const phone = form.querySelector('#phone')
    const lastName = form.querySelector('#lastName')
    const dateInit = form.querySelector('#dateInit')
    const endDate = form.querySelector('#endDate')
    const vacance = form.querySelector('#vacancy')
    const vacancyValue = form.querySelector('#vacancyValue')
    const portionOne = form.querySelector('#portion1')
    const portionTwo = form.querySelector('#portion2')
    const btnSalvar = form.querySelector('#btnSalvar')
    const motherName = form.querySelector('#motherName')
    const bday = form.querySelector('#bday')
    const geralRegister = form.querySelector('#rg')
    const reference1Name = form.querySelector('#reference1Name')
    const reference1Phone = form.querySelector('#reference1Phone')
    const reference2Name = form.querySelector('#reference2Name')
    const reference2Phone = form.querySelector('#reference2Phone')



    if(!isNewContract()) {
        const uid = getContractsUid()
        findContractByUid(uid)
    }

    function findContractByUid(uid) {
        showLoading()
        firebase.firestore()
        .collection('employee')
        .doc(uid)
        .get()
        .then(doc => {
            hideLoading()
            if (doc.exists) {
                fillContractScreen(doc.data())
                console.log(doc.data())
            }else {
                alert('Documento não encontrado')
                window.location.href = '../employee/employee'
            }
        })
        .catch(() => {
            hideLoading()
            alert('Erro ao recuperar documento')
            window.location.href = '../employee/employee'
        })
    }

    function fillContractScreen(employee){
        if (employee.type == "boss") {
            contratante.checked = true;
            name.value = employee.name
            phone.value = employee.phone
            lastName.value = employee.lastName
            dateInit.value = employee.date
            endDate.value = employee.endDate
            vacance.value = employee.vacancy
            vacancyValue.value = employee.vacancyValue
            portionOne.checked = employee.portionOne
            portionTwo.checked = employee.portionTwo
            validateFields()
        } else {
            funcionario.checked = true;
            name.value = employee.name
            lastName.value = employee.lastName
            phone.value = employee.phone
            motherName.value = employee.motherName
            bday.value = employee.bday
            geralRegister.value = employee.geralRegister
            reference1Name.value = employee.referenceOneName
            reference1Phone.value = employee.referenceOnePhone
            reference2Name.value = employee.referenceTwoName
            reference2Phone.value = employee.referenceTwoPhone
            validateFields()

        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        saveContract()
    })



    if (contratante.checked){
        employee.setAttribute('style', 'display:none')
        boss.setAttribute('style', 'display: flex')
        portion.setAttribute('style', 'display: flex')
    } else {
        employee.setAttribute('style', 'display:flex')
        boss.setAttribute('style', 'display: none')
        portion.setAttribute('style', 'display: none ')
        validateFields()
    }

    radio.addEventListener('change', (e) => {
        if (contratante.checked){
            employee.setAttribute('style', 'display:none')
            boss.setAttribute('style', 'display: flex')
            portion.setAttribute('style', 'display: flex')
            validateFields()
            
        }
        if (funcionario.checked){
            employee.setAttribute('style', 'display:flex')
            boss.setAttribute('style', 'display: none')
            portion.setAttribute('style', 'display: none ')
            validateFields()
        }
    })

    function saveContract() {
        showLoading()
        const contract = {
            type: contratante.checked ? 'boss' : 'employee',
            name: name.value,
            lastName: lastName.value,
            date: dateInit.value,
            endDate: endDate.value,
            vacancy: vacance.value,
            vacancyValue: Number(vacancyValue.value),
            portionOne: portionOne.checked,
            portionTwo: portionTwo.checked,
            user: {
                uid: firebase.auth().currentUser.uid
            }
        }

        const employee = {
            type: funcionario.checked ? 'employee' : 'boss',
            name: name.value,
            lastName: lastName.value,
            motherName: motherName.value,
            bday: bday.value,
            geralRegister: geralRegister.value,
            referenceOneName: reference1Name.value,
            referenceOnePhone: reference1Phone.value,
            referenceTwoName: reference2Name.value,
            referenceTwoPhone: reference2Phone.value,
            user: {
                uid: firebase.auth().currentUser.uid
            }
        }

        if (isNewContract()) {
            if(contratante.checked){
                firebase.firestore()
                .collection('contracts')
                .add(contract)
                .then(() => {
                    hideLoading()
                    window.location.href = '../home/home'
                })
                .catch(() => {
                    hideLoading()
                    alert('Erro ao salvar cliente')
                })
            } else {
                firebase.firestore()
                .collection('employee')
                .add(employee)
                .then(() => {
                    hideLoading()
                    window.location.href = '../home/home'
                })
                .catch(() => {
                    hideLoading()
                    alert('Erro ao salvar cliente')
                })
            }
        }else {
            if(contratante.checked) {
                showLoading()
            firebase.firestore()
                .collection('contracts')
                .doc(getContractsUid())
                .update(contract)
                .then(() => {
                    hideLoading()
                    window.location.href = '../employer/employer'
                })
                .catch(() => {
                    hideLoading()
                    alert('Erro ao atualizar cliente')
                })
            } else {
                showLoading()
                firebase.firestore()
                    .collection('employee')
                    .doc(getContractsUid())
                    .update(employee)
                    .then(() => {
                        hideLoading()
                        window.location.href = '../employee/employee'
                    })
                    .catch(() => {
                        hideLoading()
                        alert('Erro ao atualizar cliente')
                    })
            }
        }        
    }

}

function validateFields() {
    const form = document.querySelector('#add-client')
    const contratante = document.querySelector('#contratante');
    const funcionario = document.querySelector('#funcionario');
    const name = form.querySelector('#name')
    const lastName = form.querySelector('#lastName')
    const dateInit = form.querySelector('#dateInit')
    const endDate = form.querySelector('#endDate')
    const vacance = form.querySelector('#vacancy')
    const vacancyValue = form.querySelector('#vacancyValue')
    const motherName = form.querySelector('#motherName')
    const bday = form.querySelector('#bday')
    const geralRegister = form.querySelector('#rg')
    const reference1Name = form.querySelector('#reference1Name')
    const reference1Phone = form.querySelector('#reference1Phone')
    const reference2Name = form.querySelector('#reference2Name')
    const reference2Phone = form.querySelector('#reference2Phone')

    const btnSalvar = form.querySelector('#btnSalvar')

    if(contratante.checked) {
        if(!name.value || !lastName.value || !dateInit.value || !endDate.value || !vacance.value || !vacancyValue.value) {
            btnSalvar.disabled = true
        }
        if(name.value && lastName.value && dateInit.value && endDate.value && vacance.value && vacancyValue.value) {
            btnSalvar.disabled = false
        }
    }
    if(funcionario.checked) {
        if(!name.value || !lastName.value || !motherName.value || !bday.value || !geralRegister.value || !reference1Name.value || !reference1Phone.value || !reference2Name.value || !reference2Phone.value) {
            btnSalvar.disabled = true
        }
        if(name.value && lastName.value && motherName.value && bday.value && geralRegister.value && reference1Name.value && reference1Phone.value && reference2Name.value && reference2Phone.value) {
            btnSalvar.disabled = false
        }

    }
}
getContractsUid()
myScope()
logout()