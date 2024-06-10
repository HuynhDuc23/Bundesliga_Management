const selectedSeason = "<%= selectedSeason %>";
document.getElementById('seasonSelect').addEventListener('change',(event)=>{
    const selectedSeason = event.target.value
    if(selectedSeason){
        const newUrl = `/api/v1/playermatch/edit?name=${selectedSeason}`
        window.location.href = newUrl 
    }
});