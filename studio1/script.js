(function(){
    'use strict';
    console.log('Reading JS');

    var myForm = document.querySelector('form');
        myForm.addEventListener('submit', function(event){

            event.preventDefault();

        processFormData(formData);

    });

    const panel2 = document.querySelector('#panel2 p');
    const panel3 = document.querySelector('#panel3 p')
    const panel5 = document.querySelector('#panel5 p')
    const formData = document.querySelectorAll("input[type=text]");

    function processFormData(formData) {
        const words = [];
        const emptyfields = [];
        let counter = 0;

        for (const eachWord of formData) {
            if (eachWord.value) {
            words.push(eachWord.value);
            eachWord.style.outline= 'none';
            eachWord.style.boxShadow='0';
            }
            else { 
            emptyfields.push(counter);
            eachWord.style.outline= '1px solid red';
            eachWord.style.boxShadow='0 0 5px red';
            }
            counter++;
        }

        if (emptyfields.length > 0) {
            showErrors(formData, emptyfields);
        }
        else {
            makeComic();
        }
}

    function showErrors (formData, emptyfields) {
        const errorID = formData[emptyfields[0]].id;
        const errorText = `Please fill out the marked fields:`;
        document.querySelector('form h3').remove();
        document.querySelector('form h2').innerHTML = errorText;
        document.querySelector(`#${errorID}`).focus();
    }
    function makeComic(){
    const comic = document.querySelector('#comic');
    const est = document.querySelector('#est').value;
    const adj1 = document.querySelector('#adj1').value.charAt(0).toUpperCase();
    const name = document.querySelector('#name').value.charAt(0).toUpperCase();;
    const num = document.querySelector('#num').value;
    const adj2 = document.querySelector('#adj2').value;
    const noun = document.querySelector('#noun').value;
    const day = document.querySelector('#day').value;
    const location = document.querySelector('#location').value;
    const daytime = document.querySelector('#daytime').value;
    const brand = document.querySelector('#brand').value;
            comic.className="show";

            panel2.innerHTML = `Hello my <b>${est}</b> Ayre, it is me, <b>${adj1} ${name}</b>, once again coming to woo you for the <b>${num}</b> time today!`
            panel3.innerHTML = `Your <b>${adj2}</b> eyes sparkle in the moonlight like <b>${noun}</b> that reflects the light and shines into my soul. Would you perchance, do me the honor of going on a date with me? Perhaps next <b>${day}</b>, at <b>${daytime}</b>, in <b>${location}</b>?`
            panel5.innerHTML = `Sorry, I had my <b>${brand}</b> earbuds in. What did you say?`

            comic.scrollIntoView();
        }

})();