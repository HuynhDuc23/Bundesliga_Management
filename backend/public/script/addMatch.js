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

// Hàm để xóa trận đấu
async function deleteMatch(matchId) {
    try {
        const response = await fetch(`/api/v1/match/${matchId}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete match');
        // Xóa trận đấu khỏi giao diện
        document.querySelector(`.match[data-match-id="${matchId}"]`).remove();
    } catch (error) {
        console.error('Error deleting match:', error);
    }
}

async function updateMatch(matchId, id1, id2) {
    const addMatchForm = document.getElementById('addMatchForm');
    const formData = new FormData(addMatchForm);
    const formObj = Object.fromEntries(formData.entries());
    formObj.matchId = matchId;
    formObj.id1 = id1;
    formObj.id2 = id2;
    console.log(formObj);
    
    try {
        const response = await fetch('/api/v1/match/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObj)
        });

        if (!response.ok) throw new Error('Failed to update match');

        const result = await response.json();
        console.log('Match updated successfully:', result);

        // Cập nhật giao diện người dùng hoặc làm mới danh sách trận đấu
        document.getElementById('addMatchForm').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        addMatchForm.reset();

        // Tải lại trang
        window.location.reload();
    } catch (error) {
        console.error('Error updating match:', error);
    }
}                