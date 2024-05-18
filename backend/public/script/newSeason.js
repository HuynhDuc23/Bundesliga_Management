
function deleteListItem(button) {
  button.closest('li').remove();
}
function deleteAndAddListItem(button) {
  console.log(button);
  // const teamList = document.querySelector('.team-list-ul');
  // const listItem = document.createElement('li');
  // listItem.classList.add('team-item'); // Thêm class 'team-item'
  // listItem.innerHTML = `
  //         <img src="${button.logo}" alt="${team.name} Logo">
  //         <span>${team.name}</span>
  //         <button class="add-button" data-team-id="${team._id}" onclick="deleteAndAddListItem(this)">ADD</button>
  //         `;
  // teamList.appendChild(listItem);
  button.closest('li').remove();
}
function showModalListTeam() {
  const modal = document.querySelector('.modalListTeam');
  modal.style.display = 'block';

  fetch(`/api/v1/team/json`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },
  })
  .then(response => {
      if (response.status === 200) {
          return response.json(); 
      } else {
          throw new Error('Lỗi ' + response.status);
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