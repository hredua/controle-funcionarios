function myScope() {
    showLoading()
    const result = document.querySelector('.contract')
    result.innerHTML = ''

    firebase.firestore()
        .collection('budgets')
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
                h2.innerHTML = `<b>${contracts[i].name}</b>`
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
                const email = document.createElement('p')
                const district = document.createElement('p')
                const pVacance = document.createElement('p')
                const pVacanceValue = document.createElement('p')
                const time = document.createElement('p')
                const age = document.createElement('p')


                phone.innerHTML = `<b>Telefone:</b> ${contracts[i].tel}`
                email.innerHTML = `<b>E-mail:</b> ${contracts[i].email}`
                district.innerHTML = `<b>Bairro:</b> ${contracts[i].district}`
                pVacance.innerHTML = `<b>Descrição da vaga:</b> ${contracts[i].type}`
                pVacanceValue.innerHTML = `<b>Valor da vaga:</b> R$ ${contracts[i].wage}`
                time.innerHTML = `<b>Horário:</b> ${contracts[i].time}`
                age.innerHTML = `<b>Idade das crianças:</b> ${contracts[i].age}`

                divEdit.appendChild(phoneEmployerIcons)
                phoneEmployerIcons.appendChild(callPhoneEmployer)
                phoneEmployerIcons.appendChild(whatsappEmployer)
                spam.appendChild(phone)
                spam.appendChild(email)
                spam.appendChild(district)
                spam.appendChild(pVacance)
                spam.appendChild(time)
                spam.appendChild(age)
                spam.appendChild(pVacanceValue)
                

                const hideSpam = document.querySelector('#spam' + i)
                hideSpam.setAttribute('style', 'display: none')
                phoneEmployerIcons.setAttribute('style', 'display: none')

                h2.addEventListener('click', () => {
                    hideSpam.style.display = (hideSpam.style.display == 'none') ? 'block' : 'none';
                    divEditDelete.style.display = (divEditDelete.style.display == 'none') ? 'block' : 'none';
                    phoneEmployerIcons.style.display = (phoneEmployerIcons.style.display == 'none') ? 'flex' : 'none';
                })

                const uid = contracts[i].uid
                const disk = contracts[i].tel

                edit.addEventListener('click', () => {
                    window.location.href = `../budgets-edit/form?uid=` + uid
                })

                delButton.addEventListener('click', (e) => {
                    showLoading()
                    e.stopPropagation()
                    const shoulRemove = confirm('Deseja remover este usuário?')
                    if (shoulRemove) {
                        firebase.firestore()
                            .collection('budgets')
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
                })

                whatsappEmployer.addEventListener('click', () => {
                    window.open(`https://wa.me/55` + disk, '_blank')
                })
            }
        })
}



myScope()