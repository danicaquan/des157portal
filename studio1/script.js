(function(){
    'use strict';
    console.log('JS is running');

    const est = document.getElementById("est").value;
    const panel2 = document.querySelector('p')

    var myForm = document.querySelector('form');
        myForm.addEventListener('submit', function(event){
            event.preventDefault();
        });

})();