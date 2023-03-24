(function(){
    'use strict';
    console.log('Reading JS');

    var myForm = document.querySelector('form');
        myForm.addEventListener('submit', function(event){
    const est = document.querySelector('#est').value;
    const adj1 = document.querySelector('#adj1').value;
    const name = document.querySelector('#name').value;
    const num = document.querySelector('#num').value;
    const adj2 = document.querySelector('#adj2').value;
    const noun = document.querySelector('#noun').value;
    const day = document.querySelector('#day').value;
    const location = document.querySelector('#location').value;
    const daytime = document.querySelector('#daytime').value;
    const brand = document.querySelector('#brand').value;

    const panel2 = document.querySelector('#panel2 p');
    const panel3 = document.querySelector('#panel3 p')
    const panel5 = document.querySelector('#panel5 p')

    const comic = document.querySelector('#comic');
            event.preventDefault();
            comic.className="show";

            panel2.innerHTML = `Hello my ${est} Ayre, it is me, ${adj1} ${name}, once again coming to woo you for the ${num} time today!`
            panel3.innerHTML = `Your ${adj2} eyes sparkle in the moonlight like ${noun} that reflects the light and shines into my soul. Would you perchance, do me the honor of going on a date with me? Perhaps next ${day}, at ${daytime}, in ${location}?`
            panel5.innerHTML = `Sorry, I had my ${brand} earbuds in. What did you say?`

            comic.scrollIntoView();
        });

})();