function createSeason() {
  const name = document.querySelector('#seasonName').value;
  const yearStart = document.querySelector('#yearBegin').value;
  const yearEnd = document.querySelector('#yearEnd').value;

  fetch('/api/v1/season', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, yearStart, yearEnd })
  })
  .then(response => {
      if (!response.ok) {
          return response.json().then(errorData => { throw new Error(errorData.message); });
      }
      return response.json();
  })
  .then(data => {
      if (data.message === "Create Season successfully") {
          alert('Season created successfully');
          createTeamSeasons(data.data._id);
      } else {
          alert('Failed to create season: ' + data.message);
      }
  })
  .catch(error => {
      console.error('Error creating season:', error);
      alert('Error creating season: ' + error.message);
  });
}

function createTeamSeasons(seasonId) {
  const teamListItems = document.querySelectorAll('.team-list-ul .team-list-li');
  const teamIds = Array.from(teamListItems).map(item => item.querySelector('.delete-button').getAttribute('data-team-id'));

  fetch('/api/v1/teamSeasons', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ seasonId, teamIds })
  })
  .then(response => {
      if (response.status === 201) {
          return response.json(); 
      } else {
        alert('lỗi 500 !', response.statusText);
      }
      })
  .then(data => {
      if (data.message === "Teams successfully added to the season") {
          alert('Teams successfully added to the season');
      } else {
          alert('Failed to add teams to the season: ' + data.message);
      }
  })
  .catch(error => {
      console.error('Error adding teams to the season:', error);
      alert('Error adding teams to the season: ' + error.message);
  });
}
function deleteListItem(button) {
  button.closest('li').remove();
}
function deleteAndAddListItem(button) {
  // Lấy phần tử li gần nhất
  const listItem = button.closest("li");
  
  // Lấy dữ liệu từ phần tử li gốc
  const imgSrc = listItem.querySelector("img").src;
  const imgAlt = listItem.querySelector("img").alt;
  const teamName = listItem.querySelector("span").textContent;
  const teamId = button.getAttribute("data-team-id");

  // Tạo phần tử li mới
  const newListItem = document.createElement("li");
  newListItem.classList.add("team-list-li");

  // Tạo nội dung cho li mới
  newListItem.innerHTML = `
      <img src="${imgSrc}" alt="${imgAlt}">
      <span>${teamName}</span>
      <button class="delete-button" data-team-id="${teamId}" onclick="deleteListItem(this)">Xóa</button>
  `;

  // Tìm phần tử ul có class team-list-ul
  const teamListUl = document.querySelector(".team-list-ul");
  
  // Thêm phần tử li mới vào team-list-ul
  teamListUl.appendChild(newListItem);
  
  // Xóa phần tử li gốc
  listItem.remove();
}
function showModalListTeam() {
  const modal = document.querySelector('.modalListTeam');
  modal.style.display = 'block';

  const teamIds = Array.from(document.querySelectorAll('.team-list-ul .team-list-li'))
      .map(li => li.querySelector('.delete-button').getAttribute('data-team-id'));
  fetch('/api/v1/team/json', {
      method: 'POST',  // Sử dụng POST để gửi dữ liệu
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ existingTeamIds: teamIds })
  })
  .then(response => {
      if (response.status === 200) {
          return response.json(); 
      } else {
        alert('lỗi 500 !', response.statusText);
      }
  })
  .then(data => {
    //data = JSON.stringify(data);
    console.log( data.data);
      const teamList = document.querySelector('.teamListModal');
      teamList.innerHTML = '';// Sửa tên thẻ
      data.data.forEach(team => {
          const listItem = document.createElement('li');
          listItem.classList.add('team-item'); // Thêm class 'team-item'
          listItem.innerHTML = `
          <img src="${team.logo}" alt="${team.name} Logo">
          <span>${team.name}</span>
          <button class="add-button" data-team-id="${team._id}" onclick="deleteAndAddListItem(this)">ADD</button>
          `;
          teamList.appendChild(listItem);
      });

      // Tải lại trang (nếu cần)
     //window.location.reload();
  })
  .catch(error => {
      console.error('Lỗi:', error.message);
  });
}
function   hideModalListTeam() {
  const modal = document.querySelector('.modalListTeam');
  modal.style.display = 'none';
  const teamList = document.querySelector('.teamListModal');
}


function showModal() {
  const modal = document.querySelector('.modalAddNewTeam');
  modal.style.display = 'block';
}
function hideModal() {
  const modal = document.querySelector('.modalAddNewTeam');
  modal.style.display = 'none';
}
function createTeam() {
  const teamName = document.querySelector('#teamName').value;
  const nameArena = document.querySelector('#nameArena').value;
  const logo = document.querySelector('#logo').value;
  const imgArena = document.querySelector('#imgArena').value;
  const description = document.querySelector('#description').value;
  console.log(teamName, nameArena, logo, imgArena, description);
  if (teamName === '' || nameArena === '' || logo === '' || imgArena === '') {
      alert('Vui lòng điền đầy đủ thông tin!');
  } else {
      fetch(`/api/v1/team`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name: teamName,
              nameArena: nameArena,
              logo: logo,
              imgArena: imgArena,
              description: description,
          }),
      })
      .then(response => {
          if (response.status === 201) {
              alert('Đội bóng đã được thêm thành công!');
              document.querySelector('#teamName').value = '';
              document.querySelector('#nameArena').value = '';
              document.querySelector('#logo').value = '';
              document.querySelector('#imgArena').value = '';
              document.querySelector('#description').value = '';
              window.location.reload();
          } else {
            alert('lỗi 500 !', response.statusText);
            document.querySelector('#teamName').value = '';
              document.querySelector('#nameArena').value = '';
              document.querySelector('#logo').value = '';
              document.querySelector('#imgArena').value = '';
              document.querySelector('#description').value = '';
          }
      })
      .catch(error => {
        alert('lỗi fetch', error.message);
      });
  }
}
function showModalPlayer() {
    const modal = document.querySelector('.modalListPlayer');
    modal.style.display = 'block';

    fetch('/api/v1/player', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status === 201) {
            return response.json();
        } else {
            throw new Error('Failed to fetch player data');
        }
    })
    .then(data => {
        const playerList = document.querySelector('.playerListModal');
        playerList.innerHTML = '';
        data.data.forEach(player => { 
            if(isPlayerInTeam(player._id)){
            const listItem = document.createElement('li');
            listItem.classList.add('player-item');
            listItem.innerHTML = `
            <span class="player-name">${player.name}</span>
            <span class="player-shirt-number">${player.shirtNumber}</span>
            <span class="player-goal">${player.goal}</span>
            <button class="add-button" data-player-id="${player._id}" onclick="addPlayerToTeam(this)">Add</button>
            `;
            playerList.appendChild(listItem);
            }
        });
    })
    .catch(error => {
        console.error('Error fetching player data:', error);
    });
}
function hideModalListPlayer() {
    const modal = document.querySelector('.modalListPlayer');
    modal.style.display = 'none';
  }
  function addPlayerToTeam(button) {
    const playerId = button.getAttribute('data-player-id');
    const playerItem = button.closest('.player-item');
    const teamPlayerList = document.querySelector('.teamPlayerListModal');
    teamPlayerList.appendChild(playerItem);
    button.innerText = 'Remove';
    button.classList.remove('add-button');
    button.classList.add('delete-button');
    button.setAttribute('onclick', 'removePlayerFromTeam(this)');
}

function removePlayerFromTeam(button) {
    const playerItem = button.closest('.player-item');
    const playerList = document.querySelector('.playerListModal');
    playerList.appendChild(playerItem);
    button.innerText = 'Add';
    button.classList.remove('delete-button');
    button.classList.add('add-button');
    button.setAttribute('onclick', 'addPlayerToTeam(this)');
}
function isPlayerInTeam(playerId) {
    const teamPlayerList = document.querySelectorAll('.teamPlayerListModal .player-item');
    for (const playerItem of teamPlayerList) {
        const playerIdAttr = playerItem.querySelector('button').getAttribute('data-player-id');
        if (playerIdAttr === playerId) {
            return false; // Cầu thủ đã tồn tại trong danh sách của đội bóng
        }
    }
    return true; // Cầu thủ chưa tồn tại trong danh sách của đội bóng
}
function addTeam() {
    const teamName = document.getElementById('teamName').value;
    const nameArena = document.getElementById('nameArena').value;
    const logo = document.getElementById('logo').value;
    const imgArena = document.getElementById('imgArena').value;
    const description = document.getElementById('description').value;
    
    const playerItems = document.querySelectorAll('.teamPlayerListModal .player-item');
    const playerIds = Array.from(playerItems).map(item => item.querySelector('button').getAttribute('data-player-id'));

    fetch('/api/v1/team', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: teamName,
            nameArena: nameArena,
            logo: logo,
            imgArena: imgArena,
            description: description,
            players: playerIds
        })
    })
    .then(response => {
        if (response.ok) {
            // Nếu tạo team thành công, gửi yêu cầu PATCH để cập nhật status của các player
            return fetch('/api/v1/player/updateStatus', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ playerIds: playerIds })
            });
        }
        throw new Error('Failed to add team');
    })
    .then(playerResponse => {
        if (playerResponse.ok) {
            console.log('Team and player status updated successfully');
            // Thực hiện các hành động khác sau khi cập nhật thành công
        } else {
            throw new Error('Failed to update player status');
        }
    })
    .catch(error => {
        console.error('Error adding team:', error);
    });
}
