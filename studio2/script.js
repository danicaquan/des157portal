(function(){
    'use strict';
    console.log('running js')

    const indicator = document.querySelector('#identifier');
    const img = document.querySelector('img');
    const sins = document.querySelectorAll('.sins');
    /*
    const wrath = document.querySelector('#wrath');
    const wrathInfo = document.querySelector('#wrathinfo');
    const gluttony = document.querySelector('#gluttony');
    const lust = document.querySelector('#lust');
    const envy = document.querySelector('#envy');
    const sloth = document.querySelector('#sloth');
    const greed = document.querySelector('#greed');
    const pride = document.querySelector('#pride');
    */

    const returnBtn = document.querySelector('#return');
    const backInfo = document.querySelectorAll('.info button');

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
        sins[i].style.transition = 'opacity 3s 1s';
        indicator.style.display = 'none';
        returnBtn.style.display = 'block';
    }
    });

    returnBtn.addEventListener('click', function(){
        img.className='general';
        for (let i =0; i<sins.length; i++){
        sins[i].style.opacity = '0';
        indicator.style.display = 'block';
        returnBtn.style.display = 'none';
    }
    });

   /* wrath.addEventListener('click', function(){
        wrathInfo.style.opacity = '100%';
        wrathInfo.style.display = 'flex';
        
    });*/

    for (const eachSin of sins) {
        eachSin.addEventListener('click', function(event){
            const thisSin = event.target.id;
            console.log(`${thisSin}`);
            document.querySelector(`#${thisSin}info`).style.opacity = '100%';
            document.querySelector(`#${thisSin}info`).style.display = 'flex';
            for (const eachBtn of backInfo) {
                eachBtn.addEventListener('click', function(event){
                    document.querySelector(`#${thisSin}info`).style.opacity = '0';
                    document.querySelector(`#${thisSin}info`).style.display = 'none';
        
                
            });
        }
        
    });
    
}
})();