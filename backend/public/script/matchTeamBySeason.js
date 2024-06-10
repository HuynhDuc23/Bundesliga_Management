const selectedSeason = "<%= selectedSeason %>";
document.getElementById('seasonSelect').addEventListener('change',(event)=>{
    const selectedSeason = event.target.value
    if(selectedSeason){
        const newUrl = `/api/v1/season/${selectedSeason}`;
        window.location.href = newUrl 
    }
});