'use-strict'

document.addEventListener('click', function(e){
    if (e.target.classList.contains('btn') || e.target.parentElement.classList.contains('btn')) {
        calc(e);

    }
});

document.addEventListener('mousedown', function(e){
    if (e.target.classList.contains('btn')) {
        e.target.classList.toggle('active');
    }
    if (e.target.parentElement.classList.contains('btn')) {
        e.target.parentElement.classList.toggle('active')
    }
})

document.addEventListener('mouseup', function(e){
    if (e.target.classList.contains('btn')) {
        e.target.classList.toggle('active');
    }
    if (e.target.parentElement.classList.contains('btn')) {
        e.target.parentElement.classList.toggle('active')
    }
})

document.addEventListener('keyup',calc);
document.addEventListener('keydown',calc);
