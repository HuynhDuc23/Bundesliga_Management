document.addEventListener('DOMContentLoaded', function(){
    const selectTypes = document.getElementById("select_action");
    const selectCards = document.getElementById("select_card");
    selectTypes.addEventListener("change",(event) => {
        var value = event.target.value;
        if(value=='foul'){
            selectCards.style.display = 'block';
        }else{
            selectCards.style.display = 'none';
        }
    })
});