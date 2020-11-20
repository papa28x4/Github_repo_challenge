const typeDropDownBtn = document.querySelector('.type button');
const typeList = document.querySelector('.type .type-list');
const typeCurrentSelection = document.querySelector('.type button .current-selection');
const typeOptions = document.querySelector('.type .type-options')
const close = document.querySelector('.type .cross');
const hamburger = document.querySelector('.menu.nav-icons');
const mobileMenu = document.querySelector('.nav-item.search-field')
const rightPart = document.querySelector('.repository.right-part');

hamburger.addEventListener('click', function(e){
    mobileMenu.classList.toggle('desktop');
})

rightPart.addEventListener('click', function(e){
    const btn = e.target.closest('.btn-star');
    if(btn){
        btn.classList.toggle('starred')
        const starText = btn.querySelector('.user-review')
        starText.textContent = btn.classList.contains('starred')? 'Unstar' : 'Star'
    }
})

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


// console.log(typeDropDownBtn)