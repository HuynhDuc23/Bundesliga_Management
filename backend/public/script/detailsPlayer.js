
var modal = document.getElementById("eventModal");
var span = document.getElementsByClassName("close")[0];
const requestOptions = (idPlayer) => ({
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({playerId:idPlayer})
});

var getEvents = async (id,idPlayer) => {
    try {
        const response = await fetch('/api/v1/player/events/' + id, requestOptions(idPlayer));
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data.data; 
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; 
    }
}
var transMinute = (minutes) => {
    if(minutes>90){
        return '90+'+(minutes-90);
    }
    return minutes.toString();
}
async function showMatchInfo(matchId,playerId) {
    const events = await getEvents(matchId,playerId);
    if (!events || events.length === 0) {
        document.getElementById("detailsEvent").innerHTML = "<p>No events found for this match.</p>";
    } else {
        const eventDetails = events.map(event => `
            <p>${(event.type).toUpperCase()} ${(event.type == 'goal') ? '<span><i class="fa-solid fa-futbol"></i></span>' : '<span><i class="fa-solid fa-ban"></i></span>' }  </p>
            <p>Minutes: ${transMinute(event.minutes)}'</p>
            <p>Action: ${event.action || ''}</p>
            ${event.type === 'foul' ? `<p>Card: ${event.card == 'yellow' ? '<img class="description__content--info__foul" src="/img/yellow_card.png" alt="">' : '<img class="description__content--info__foul" src="/img/red_card.png" alt="">' || 'N/A'}</p>` : ''}
            <hr>
        `).join('');
        document.getElementById("detailsEvent").innerHTML = eventDetails;
    }
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
