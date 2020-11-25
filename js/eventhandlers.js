const wrapper = document.querySelector('#wrapper');
const tabsWrapper = document.querySelector('.tabs-wrapper');
const main = document.querySelector('.main')
const circle = document.querySelector('.circle')

wrapper.addEventListener('click', function(e){
    // console.log(e.target)
    const dropdowns = document.querySelectorAll('.nav-item.drop-menus')
    const dropDownBtns = document.querySelectorAll('.filter-btn')
    if(e.target.closest('.menu.nav-icons')){
        const mobileMenu = document.querySelector('.nav-item.search-field')
        const container = document.querySelector('.main>.container');
        mobileMenu.classList.toggle('desktop');
        container.classList.toggle('menu-out');
    }else if(e.target.closest('.btn-star')){
        btn = e.target.closest('.btn-star');
        btn.classList.toggle('starred')
        const starText = btn.querySelector('.user-review')
        starText.textContent = btn.classList.contains('starred')? 'Unstar' : 'Star'
    }
    else if(e.target.classList.contains('first')){
        dropdowns[1].classList.remove('on')
        dropdowns[0].classList.toggle('on')
    }else if(e.target.classList.contains('second')){
        dropdowns[0].classList.remove('on')
        dropdowns[1].classList.toggle('on')
    }else if(e.target.closest(".filter-btn")){
        const dropDownBtn = e.target.closest(".filter-btn")
        dropDownBtn.classList.toggle('list-visible')
    }else if(e.target.closest('.btn-close')){
        const dropDownBtn = e.target.closest('.box-list').children[0];
        dropDownBtn.classList.toggle('list-visible')
    }else if(e.target.closest('.options-list')){
        const typeOptions = e.target.closest('.options-list')
        const dropDownBtn = e.target.closest('.box-list').children[0]
        if(!dropDownBtn.classList.contains('list-visible')) return
        const currentSelection = dropDownBtn.children[0];
        const typeChecked = typeOptions.querySelector('.fade-in')
        const li = e.target.closest('li')
        const span = li.querySelector('span')
        const img = li.querySelector('img')
        typeChecked.classList.remove('fade-in')
        img.classList.add('fade-in')
        const option = span.textContent
        currentSelection.innerText = option
        dropDownBtn.classList.toggle('list-visible')
    }else{
        dropdowns.forEach(dropdown => dropdown.classList.remove('on'))
        dropDownBtns.forEach(dropDownBtn =>  dropDownBtn.classList.remove('list-visible') )
    }
})

window.addEventListener('scroll', function(){
    let image = circle.getBoundingClientRect()
    tabsWrapper.classList.toggle('sticky', window.scrollY > 86)
    main.classList.toggle('alt', image.bottom <= 0)
})
