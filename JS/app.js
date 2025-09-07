"use strict"


let name = document.getElementById('termekLista')
let price = document.getElementById('tPrice')
let count = document.getElementById('tDB')
let addBTN = document.getElementById('addButton')

let list = document.getElementById('itemList')
let sum = document.getElementById('summaryLBL')
let sumCount =0

let dataLista = document.getElementById('datalistOptions')

name.value = ''
price.value = 0
count.value = 0


let Items = []
let termekLista = []

addBTN.addEventListener('click', () =>{
    if (name.value == '' || price.value == 0 || count.value == 0) {
        alert("Nem adtál meg semmit")
        return
    }



    Items.push({
        Tname: name.value,
        Tprice: price.value,
        Tcount: count.value,
        Tsum: price.value*count.value
    })


    termekListaFetoltes()
    refreshTable()
    save()
    
    

})


function refreshTable() {
    list.innerHTML = ''

    let allSum = 0

    for (let i = 0; i < Items.length; i++) {
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        let td4 = document.createElement('td')
        let td5 = document.createElement('td')
        let td6 = document.createElement('td')

        let torlesInTBL = document.createElement('button')
        torlesInTBL.classList.add('btn', 'btn-danger', 'adatTorles')
        torlesInTBL.innerHTML = 'X'
        torlesInTBL.addEventListener('click', () => {
            deleteItem(i)
        })

        allSum += Items[i].Tsum
        td6.appendChild(torlesInTBL)
    

        td1.innerHTML = i+1+'.'
        td2.innerHTML = Items[i].Tname
        td3.innerHTML = Items[i].Tprice
        td4.innerHTML = Items[i].Tcount
        td5.innerHTML = `${Items[i].Tsum} Ft`

        td3.classList.add('text-end')
        td4.classList.add('text-end')
        td5.classList.add('text-end')

    
    
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.appendChild(td6)

    
        list.appendChild(tr)

    }

    sum.innerText = allSum


}
//Mentés
function save() {
    localStorage.setItem('bevLista', JSON.stringify(Items))
    localStorage.setItem('TermekLista', JSON.stringify(termekLista))

}

function load() {
    if (localStorage.getItem('bevLista')) {
        Items = JSON.parse(localStorage.getItem('bevLista'))
        termekLista = JSON.parse(localStorage.getItem('TermekLista'))

    }
    
}


//Törlés
function clearForm() {
    name.value = ''
    price.value = 0
    count.value = 0

    list.innerHTML = ''
}

function deleteItem(idx) {
    if (confirm('Biztosan törlöd?')) {
        Items.splice(idx, 1)
        refreshTable()
        save()

    }
}


load()
refreshTable()
termekListaFetoltes()



function termekListaFetoltes() {
    
    let ujTermekName = document.getElementById('termekLista').value
    let ujTermekPrice = document.getElementById('tPrice').value

    let ujTermek ={
        uTname: ujTermekName,
        uTprice: ujTermekPrice
    }

    if (!termekLista.includes(ujTermek)) {
        termekLista.push(ujTermek)
    }

    dataLista.innerHTML = ''
    if (!termekLista.length == 0) {
            termekLista.forEach(a =>
        dataLista.innerHTML += `<option value="${a.uTname}"></option>`)
    }

    refreshTable()
}




name.addEventListener('change', () => {
    let selectedOption = termekLista.find(a => a.uTname == name.value)
    if (selectedOption) {
        price.value = selectedOption.uTprice
    } else {
        price.value = 0
    }
})

//selectionchange a terméknévnél (ár feltöltése)