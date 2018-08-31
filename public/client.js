document.addEventListener('DOMContentLoaded', function(){
    let errorMessages = document.querySelector('.error');

    if (errorMessages !=='') {
        setTimeout(function(){
            errorMessages.innerHTML = '';
        },3000);
    }
});