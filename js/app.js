const typeDropDownBtn = document.querySelector('.type button')
const typeList = document.querySelector('.type .type-list')
const typeCurrentSelection = document.querySelector('.type button .current-selection')
const typeOptions = document.querySelector('.type .type-options')
const close = document.querySelector('.type .cross')


close.addEventListener('click', function(e){
    typeDropDownBtn.classList.toggle('list-visible')
})

typeDropDownBtn.addEventListener('click', function(e){
    typeDropDownBtn.classList.toggle('list-visible')
    console.log(e.target)
})

typeOptions.addEventListener('click', function(e){
    const typeChecked = typeOptions.querySelector('.fade-in')
    const li = e.target.closest('li')
    const span = li.querySelector('span')
    const img = li.querySelector('img')
    typeChecked.classList.remove('fade-in')
    img.classList.add('fade-in')
    const option = span.textContent
    console.log('option', option)
    typeCurrentSelection.textContent = option
    typeDropDownBtn.classList.toggle('list-visible')
})

console.log(typeDropDownBtn)