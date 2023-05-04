function myScope() {
    showLoading()
     const result = document.querySelector('.container');
     result.innerHTML = '';

     firebase.firestore()
        .collection('contracts')
        .orderBy('endDate', 'asc')
        .get()
        .then(snapshot => {
            const contracts = snapshot.docs.map(docs => docs.data())
            hideLoading()
            if(!contracts.length) {
                const h2 = document.querySelector('h2')
                h2.style.display = 'none'
                const warning = document.createElement('div')
                warning.classList.add('warning')
                const pWarning = document.createElement('p')
                pWarning.innerHTML = 'Não existem resultados a serem exibidos'
                warning.appendChild(pWarning)
                result.appendChild(warning)
            }
            for(i = 0; i < contracts.length; i++) {
                let time = new Date(contracts[i].endDate) - new Date()
                let daysRemaining = time / (1000 * 60 * 60 * 24)
                const createDiv = document.createElement('div')
                createDiv.classList.add('result')
                const createP = document.createElement('p')
                let resultTextName = `${contracts[i].name}: `
                let resultTextDays = `Restam <strong>${Math.ceil(daysRemaining)}</strong> dias para o fim do contrato`
                createP.innerHTML = `${resultTextName} <br> ${resultTextDays}`
                createDiv.appendChild(createP)
                result.appendChild(createDiv) 
             }
            
        })
 }
 
 window.onload= () => {
     logout()
     myScope()
 }