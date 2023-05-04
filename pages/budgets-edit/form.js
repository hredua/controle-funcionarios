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
    const employee = document.querySelector('.employee');
    const name = form.querySelector('#name')
    const phone = form.querySelector('#phone')
    const district = form.querySelector('#district')
    const dateInit = form.querySelector('#dateInit')
    const endDate = form.querySelector('#endDate')
    const vacance = form.querySelector('#vacancy')
    const vacancyValue = form.querySelector('#vacancyValue')
    const time = form.querySelector('#time')
    const age = form.querySelector('#age')
    const portionOne = form.querySelector('#portion1')
    const portionTwo = form.querySelector('#portion2')



    if(!isNewContract()) {
        const uid = getContractsUid()
        findContractByUid(uid)
    }

    function findContractByUid(uid) {
        showLoading()
        firebase.firestore()
        .collection('budgets')
        .doc(uid)
        .get()
        .then(doc => {
            hideLoading()
            if (doc.exists) {
                fillContractScreen(doc.data())
                console.log(doc.data())
            }else {
                alert('Documento não encontrado')
                // window.location.href = '../employer/employer'
            }
        })
        .catch(() => {
            hideLoading()
            alert('Erro ao recuperar documento')
            // window.location.href = '../employer/employer'
        })
    }

    function fillContractScreen(contract){
            contratante.checked = true;
            name.value = contract.name
            phone.value = contract.tel
            district.value = contract.district
            dateInit.value = contract.date
            endDate.value = contract.endDate
            vacance.value = contract.type
            vacancyValue.value = contract.wage
            time.value = contract.time
            age.value = contract.age
            portionOne.checked = contract.portionOne
            portionTwo.checked = contract.portionTwo
            validateFields()
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        saveContract()
    })

    function saveContract() {
        showLoading()
        const contract = {
            type: 'boss',
            name: name.value,
            phone: phone.value,
            district: district.value,
            date: dateInit.value,
            endDate: endDate.value,
            vacancy: vacance.value,
            vacancyValue: Number(vacancyValue.value),
            time: time.value,
            age: age.value,
            portionOne: portionOne.checked,
            portionTwo: portionTwo.checked,
            user: {
                uid: firebase.auth().currentUser.uid
            }
        }

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
    }

}

function validateFields() {
    const form = document.querySelector('#add-client')
    const name = form.querySelector('#name')
    const dateInit = form.querySelector('#dateInit')
    const endDate = form.querySelector('#endDate')
    const vacance = form.querySelector('#vacancy')
    const vacancyValue = form.querySelector('#vacancyValue')

    const btnSalvar = form.querySelector('#btnSalvar')

    if(contratante.checked) {
        if(!name.value || !dateInit.value || !endDate.value || !vacance.value || !vacancyValue.value) {
            btnSalvar.disabled = true
        }
        if(name.value && dateInit.value && endDate.value && vacance.value && vacancyValue.value) {
            btnSalvar.disabled = false
        }
    }
}
getContractsUid()
myScope()
logout()