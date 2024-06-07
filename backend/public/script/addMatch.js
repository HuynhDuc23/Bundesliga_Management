function addMatch() {
    const date = document.getElementById('date').value;
    const ID_season = document.getElementById('ID_season').value;
    const teamId1 = document.getElementById('teamId1').value;
    const teamId2 = document.getElementById('teamId2').value;
    const stadium = document.getElementById('stadium').value;
    const description = document.getElementById('description').value;

    const formData = {
        date: date,
        ID_season: ID_season,
        teamId1: teamId1,
        teamId2: teamId2,
        stadium: stadium,
        description: description
    };

    fetch('/api/v1/matchteam/add-match', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create match');
            }
            return response.json();
        })
        .then(result => {
            //displayMatch(result.match, result.matchteam1, result.matchteam2);
            addMatchForm.style.display = 'none';
            overlay.style.display = 'none';
            addMatchForm.reset();
        })
        .catch(error => {
            console.error(error);
        });
}