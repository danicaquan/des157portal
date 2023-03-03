(function(){
    'use strict';
    console.log('running js')

    const indicator = document.querySelector('div');
    const img = document.querySelector('img');
    const sins = document.querySelectorAll('.sins')

    indicator.addEventListener('mouseover', function(){
        indicator.className='show';
    });

    indicator.addEventListener('mouseout', function(){
        indicator.classList.remove('show');
    });

    indicator.addEventListener('click', function(){
        img.className='closeup';
        for (let i =0; i<sins.length; i++){
        sins[i].style.opacity = '100%';
    }
    });
})();