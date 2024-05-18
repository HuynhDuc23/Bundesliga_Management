function deleteSeason(seasonId) {
    if (confirm('Are you sure you want to delete this season?')) {
        fetch(`/api/v1/season/${seasonId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.ok) {
                alert('Season deleted successfully');
                window.location.href = '/api/v1/season'; // Reload the page or navigate to another page
            } else {
                return response.json().then(data => {
                    alert('Failed to delete season: ' + data.message);
                });
            }
        })
        .catch(error => {
            console.error('Error deleting season:', error);
            alert('Error deleting season: ' + error.message);
        });
    }
}