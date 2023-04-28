function myScope() {
    showLoading()
    const result = document.querySelector('.contract')
    result.innerHTML = ''

    firebase.firestore()
        .collection('employee')
        .orderBy('name', 'asc')
        .get()
        .then(snapshot => {
            const employee = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }))
            hideLoading()
            if(!employee.length) {
                const warning = document.createElement('div')
                warning.classList.add('warning')
                const pWarning = document.createElement('p')
                pWarning.innerHTML = 'Não existem resultados a serem exibidos'
                warning.appendChild(pWarning)
                result.appendChild(warning)
            }
            for (i = 0; i < employee.length; i++) {
                const contractModal = document.createElement('div')
                contractModal.classList.add('contractModal')
                contractModal.id = employee[i].uid
                result.appendChild(contractModal)
                const divEdit = document.createElement('div')
                divEdit.classList.add('top')
                contractModal.appendChild(divEdit)
                const h2 = document.createElement('h2')
                h2.innerHTML = `<b>${employee[i].name}</b>`
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
                const pMotherName = document.createElement('p')
                const pbDay = document.createElement('p')
                const pGeralRegister = document.createElement('p')
                const reference = document.createElement('p')
                const pReferenceOneName = document.createElement('p')
                const phone = document.createElement('p')
                const phoneEmployeeIcons = document.createElement('div')
                phoneEmployeeIcons.classList.add('phone-employee-icons')
                const callPhoneEmployee = document.createElement('i')
                callPhoneEmployee.classList.add('bx', 'bxs-phone')
                const whatsappEmployee = document.createElement('i')
                whatsappEmployee.classList.add('bx', 'bxl-whatsapp')
                const callPhone = document.createElement('i')
                callPhone.classList.add('bx', 'bxs-phone')
                const whatsapp = document.createElement('i')
                whatsapp.classList.add('bx', 'bxl-whatsapp')
                const secondCallPhone = document.createElement('i')
                secondCallPhone.classList.add('bx', 'bxs-phone')
                const secondWhatsapp = document.createElement('i')
                secondWhatsapp.classList.add('bx', 'bxl-whatsapp')
                const referenceDiv = document.createElement('div')
                referenceDiv.classList.add('reference-call')
                const namePhone = document.createElement('div')
                namePhone.classList.add('namePhone')
                const callDiv = document.createElement('div')
                callDiv.classList.add('call')
                const secondReferenceDiv = document.createElement('div')
                secondReferenceDiv.classList.add('reference-call')
                const secondNamePhone = document.createElement('div')
                secondNamePhone.classList.add('namePhone')
                const secondCallDiv = document.createElement('div')
                secondCallDiv.classList.add('call')
                const pReferenceOnePhone = document.createElement('p')
                const pReferenceTwoName = document.createElement('p')
                const pReferenceTwoPhone = document.createElement('p')
               
                phone.innerHTML = `<b>Telefone:</b> ${employee[i].phone}`
                pMotherName.innerHTML = `<b>Nome da mãe:</b> ${employee[i].motherName}`
                pbDay.innerHTML = `<b>Data de Nascimento:</b> ${formatDate(employee[i].bday)}`
                pGeralRegister.innerHTML = `<b>Numero do RG:</b> ${employee[i].geralRegister}`
                reference.innerHTML = '<b>Referências</b>'
                pReferenceOneName.innerHTML = `<b>Nome:</b> ${employee[i].referenceOneName}`
                pReferenceOnePhone.innerHTML = `<b>Telefone:</b> ${employee[i].referenceOnePhone}`
                pReferenceTwoName.innerHTML = `<b>Nome:</b> ${employee[i].referenceTwoName}`
                pReferenceTwoPhone.innerHTML = `<b>Telefone:</b> ${employee[i].referenceTwoPhone}`
               

                spam.appendChild(phone)
                divEdit.appendChild(phoneEmployeeIcons)
                phoneEmployeeIcons.appendChild(callPhoneEmployee)
                phoneEmployeeIcons.appendChild(whatsappEmployee)
                spam.appendChild(pMotherName)
                spam.appendChild(pbDay)
                spam.appendChild(pGeralRegister)                
                spam.appendChild(reference)                
                spam.appendChild(referenceDiv)              
                referenceDiv.appendChild(namePhone)                
                namePhone.appendChild(pReferenceOneName)
                namePhone.appendChild(pReferenceOnePhone)
                referenceDiv.appendChild(callDiv)
                callDiv.appendChild(callPhone)
                callDiv.appendChild(whatsapp)
                spam.appendChild(pReferenceTwoName)
                spam.appendChild(pReferenceTwoPhone)
                spam.appendChild(secondReferenceDiv)              
                secondReferenceDiv.appendChild(secondNamePhone)                
                secondNamePhone.appendChild(pReferenceTwoName)
                secondNamePhone.appendChild(pReferenceTwoPhone)
                secondReferenceDiv.appendChild(secondCallDiv)
                secondCallDiv.appendChild(secondCallPhone)
                secondCallDiv.appendChild(secondWhatsapp)

                const hideSpam = document.querySelector('#spam' + i)
                hideSpam.setAttribute('style', 'display: none')
                phoneEmployeeIcons.setAttribute('style', 'display: none')

                h2.addEventListener('click', () => {
                    hideSpam.style.display = (hideSpam.style.display == 'none') ? 'block' : 'none';
                    divEditDelete.style.display = (divEditDelete.style.display == 'none') ? 'block' : 'none';
                    phoneEmployeeIcons.style.display = (phoneEmployeeIcons.style.display == 'none') ? 'flex' : 'none';
                })

                const uid = employee[i].uid
                const phoneOne = employee[i].referenceOnePhone
                const phoneTwo = employee[i].referenceTwoPhone
                const disk = employee[i].phone

                edit.addEventListener('click', () => {
                    window.location.href = `../form-edit-employee/form-edit-employee?uid=` + uid
                })

                delButton.addEventListener('click', (e) => {
                    showLoading()
                    e.stopPropagation()
                    const shoulRemove = confirm('Deseja remover este usuário?')
                    if (shoulRemove) {
                        firebase.firestore()
                            .collection('employee')
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

                callPhone.addEventListener('click', () => {
                    window.location.href = `tel:+55` + phoneOne
                    console.log(phoneOne)
                })

                whatsapp.addEventListener('click', () => {
                    window.open(`https://wa.me/55` + phoneOne, '_blank')
                })
            
                secondCallPhone.addEventListener('click', () => {
                    window.location.href = `tel:+55` + phoneTwo
                })

                secondWhatsapp.addEventListener('click', () => {
                    window.open(`https://wa.me/55` + phoneTwo, '_blank')
                })

                callPhoneEmployee.addEventListener('click', () => {
                    window.location.href = `tel:+55` + disk
                })

                whatsappEmployee.addEventListener('click', () => {
                    window.open(`https://wa.me/55` + disk, '_blank')
                })
            }
        })

    function formatDate(date) {
        return new Date(date).toLocaleDateString('pt-br')
    }
}



myScope()