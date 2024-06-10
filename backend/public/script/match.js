// Example JavaScript code for dynamic interaction with teams and match details

// Function to fetch teams and populate the left panel
async function fetchTeams() {
    try {
        const response = await fetch('/api/teams');
        const teams = await response.json();
        const teamList = document.getElementById('team-list');
        teamList.innerHTML = '';
        teams.forEach(team => {
            const li = document.createElement('li');
            li.textContent = team.name;
            li.addEventListener('click', () => selectTeam(team));
            teamList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
}

// Function to display selected team details in the right panel
function selectTeam(team) {
    const selectedTeamDiv = document.getElementById('selected-team');
    selectedTeamDiv.innerHTML = `<p>Name: ${team.name}</p>`;
    // Add more details if needed
}

// Function to handle form submission and add match
async function addMatch(event) {
    event.preventDefault();
    // Retrieve form data
    const formData = new FormData(event.target);
    const date = formData.get('date');
    // Add more form data as needed

    try {
        // Send data to server to add match
        const response = await fetch('/api/matches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: date,
                // Add more fields here
            })
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Match added successfully:', data);
        } else {
            console.error('Failed to add match:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding match:', error);
    }
}

// Initialize the page
window.onload = () => {
    fetchTeams();
    const matchForm = document.getElementById('match-form');
    matchForm.addEventListener('submit', addMatch);
};
