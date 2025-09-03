let name = document.getElementById('termekLista')
let price = document.getElementById('tPrice')
let count = document.getElementById('tDB')
let addBTN = document.getElementById('addButton')

let list = document.getElementById('itemList')
let sum = document.getElementById('summaryLBL')
let sumCount =0

let Items = []
let termekLista = []

addBTN.addEventListener('click', () =>{
    if (name.value == '' || price.value == 0 || count.value == 0) {
        alert("Nem adtál meg semmit")
        return
    }

    else if (price.value <= 20) {
        alert("Nem lehet ilyen olcsó semmi pali :((")
        return
    }



    Items.push({
        Tname: name.value,
        Tprice: price.value,
        Tcount: count.value,
        Tsum: price.value*count.value
    })
    save()

    list.innerHTML = ''
    sumCount = 0

    termekListaFetoltes()
    refreshTable()
    
    

    sum.innerHTML = sumCount
})


function refreshTable() {
    list.innerHTML = ''

    for (let i = 0; i < Items.length; i++) {
        let tr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')
        let td3 = document.createElement('td')
        let td4 = document.createElement('td')
        let td5 = document.createElement('td')
        let td6 = document.createElement('td')

        let torlesInTBL = document.createElement('button')
        torlesInTBL.id = `adatTorles`
        torlesInTBL.classList.add('btn', 'btn-danger', 'adatTorles')
        torlesInTBL.textContent = 'x'
        torlesInTBL.addEventListener('click', () => {
            deleteItem(i)
        })
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

        sumCount += Items[i].Tsum

    }

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
    console.log(idx)
    if (confirm('Biztosan törlöd?')) {
        Items.splice(idx, 1)
        refreshTable()
        save()
    }
}


load()
refreshTable()


function termekListaFetoltes() {
    let ujTermek = document.getElementById('termekLista').value
    if (!(termekLista.find(a => a.name == ujTermek))) {
        termekLista.push(ujTermek)
    }

    document.getElementById('datalistOptions').innerHTML += `<option value="${ujTermek}"></option>`
    refreshTable()
}

//selectionchange a terméknévnél (ár feltöltése)