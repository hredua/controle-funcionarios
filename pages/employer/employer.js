function myScope() {
    showLoading()
    const result = document.querySelector('.contract')
    result.innerHTML = ''

    firebase.firestore()
        .collection('contracts')
        .orderBy('name', 'asc')
        .get()
        .then(snapshot => {
            const contracts = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }))
            hideLoading()
            if(!contracts.length) {
                const warning = document.createElement('div')
                warning.classList.add('warning')
                const pWarning = document.createElement('p')
                pWarning.innerHTML = 'Não existem resultados a serem exibidos'
                warning.appendChild(pWarning)
                result.appendChild(warning)
            }
            for (i = 0; i < contracts.length; i++) {
                const contractModal = document.createElement('div')
                contractModal.classList.add('contractModal')
                contractModal.id = contracts[i].uid
                result.appendChild(contractModal)
                const divEdit = document.createElement('div')
                divEdit.classList.add('top')
                contractModal.appendChild(divEdit)
                const h2 = document.createElement('h2')
                h2.innerHTML = `<b>${contracts[i].name} ${contracts[i].lastName}</b>`
                const divEditDelete = document.createElement('div')
                divEditDelete.classList.add('edit-delete')
                const edit = document.createElement('i')
                edit.classList.add('bx', 'bxs-edit')
                const delButton = document.createElement('i')
                delButton.classList.add('bx', 'bxs-trash')
                divEdit.appendChild(h2)
                divEdit.appendChild(divEditDelete)
                divEditDelete.appendChild(edit)
                divEditDelete.appendChild(delButton)

                const spam = document.createElement('div')
                spam.id = 'spam' + i
                contractModal.appendChild(spam)
                const phoneEmployerIcons = document.createElement('div')
                phoneEmployerIcons.classList.add('phone-employee-icons')
                const callPhoneEmployer = document.createElement('i')
                callPhoneEmployer.classList.add('bx', 'bxs-phone')
                const whatsappEmployer = document.createElement('i')
                whatsappEmployer.classList.add('bx', 'bxl-whatsapp')
                const phone = document.createElement('p')
                const pDate = document.createElement('p')
                const pEndDate = document.createElement('p')
                const pVacance = document.createElement('p')
                const pVacanceValue = document.createElement('p')
                const portionDiv = document.createElement('div')
                portionDiv.classList.add('portion')
                const portion1 = document.createElement('div')
                portion1.classList.add('portion1')
                const portion2 = document.createElement('div')
                portion2.classList.add('portion2')
                const pPortion1 = document.createElement('p')
                const pPortion2 = document.createElement('p')
                const checkPortion1 = document.createElement('input')
                checkPortion1.type = "checkbox"
                checkPortion1.disabled = true
                const checkPortion2 = document.createElement('input')
                checkPortion2.type = "checkbox"
                checkPortion2.disabled = true

                phone.innerHTML = `<b>Telefone:</b> ${contracts[i].phone}`
                pDate.innerHTML = `<b>Início do contrato:</b> ${formatDate(contracts[i].date)}`
                pEndDate.innerHTML = `<b>Contrato válido até:</b> ${formatDate(contracts[i].endDate)}`
                pVacance.innerHTML = `<b>Descrição da vaga:</b> ${contracts[i].vacancy}`
                pVacanceValue.innerHTML = `<b>Valor da vaga:</b> R$ ${contracts[i].vacancyValue}`
                pPortion1.innerHTML = `<b>Primeira Parcela:</b> R$ ${contracts[i].vacancyValue / 10} `
                pPortion2.innerHTML = `<b>Segunda Parcela:</b> R$ ${contracts[i].vacancyValue / 10} `

                if (contracts[i].portionOne === true) {
                    checkPortion1.checked = true
                }

                if (contracts[i].portionTwo === true) {
                    checkPortion2.checked = true
                }

                divEdit.appendChild(phoneEmployerIcons)
                phoneEmployerIcons.appendChild(callPhoneEmployer)
                phoneEmployerIcons.appendChild(whatsappEmployer)
                spam.appendChild(phone)
                spam.appendChild(pDate)
                spam.appendChild(pEndDate)
                spam.appendChild(pVacance)
                spam.appendChild(pVacanceValue)
                spam.appendChild(portionDiv)
                portionDiv.appendChild(portion1)
                portion1.appendChild(pPortion1)
                portion1.appendChild(checkPortion1)
                portionDiv.appendChild(portion2)
                portion2.appendChild(pPortion2)
                portion2.appendChild(checkPortion2)

                const hideSpam = document.querySelector('#spam' + i)
                hideSpam.setAttribute('style', 'display: none')
                phoneEmployerIcons.setAttribute('style', 'display: none')

                h2.addEventListener('click', () => {
                    hideSpam.style.display = (hideSpam.style.display == 'none') ? 'block' : 'none';
                    divEditDelete.style.display = (divEditDelete.style.display == 'none') ? 'block' : 'none';
                    phoneEmployerIcons.style.display = (phoneEmployerIcons.style.display == 'none') ? 'flex' : 'none';
                })

                const uid = contracts[i].uid
                const disk = contracts[i].phone

                edit.addEventListener('click', () => {
                    window.location.href = `../form-add/form?uid=` + uid
                })

                delButton.addEventListener('click', (e) => {
                    showLoading()
                    e.stopPropagation()
                    const shoulRemove = confirm('Deseja remover este usuário?')
                    if (shoulRemove) {
                        firebase.firestore()
                            .collection('contracts')
                            .doc(uid)
                            .delete()
                            .then(() => {
                                hideLoading()
                                document.getElementById(uid).remove()
                            })
                    }else{
                        hideLoading()
                    }
                })

                callPhoneEmployer.addEventListener('click', () => {
                    window.location.href = `tel:+55` + disk
                    console.log('clicou')
                })

                whatsappEmployer.addEventListener('click', () => {
                    window.open(`https://wa.me/55` + disk, '_blank')
                })
            }
        })

    function formatDate(date) {
        return new Date(date).toLocaleDateString('pt-br')
    }
}



myScope()