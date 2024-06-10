document.addEventListener('DOMContentLoaded', function(){
    const selectTypes = document.getElementById("select_action");
    const selectCards = document.getElementById("select_card");
    const errorPopup = document.getElementById("error-popup");
    const errorClose = document.getElementById("error-close");
    if(errorPopup){
        errorPopup.style.display = 'block';
        errorClose.addEventListener('click',()=>{
            errorPopup.style.display = 'none';
        })
        setTimeout(() => {
            errorPopup.style.display = 'none';
        },5000)
    }
    if(selectTypes.value=='foul'){
        selectCards.style.display = 'block';
    }else {
        selectCards.style.display = 'none';
    }
    selectTypes.addEventListener("change",(event) => {
        var value = event.target.value;
        if(value=='foul'){
            selectCards.style.display = 'block';
        }else{
            selectCards.style.display = 'none';
        }
    })
});