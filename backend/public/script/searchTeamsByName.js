function createElementWithClass(tagName, className) {
    const element = document.createElement(tagName);
    element.classList.add(className);
    return element;
}
const listItem = document.getElementById("listTeam");
const searchInput = document.getElementById("searchInput");
function displayAllTeam(){
const list = document.getElementById("list");
const teamsData = JSON.parse(list.getAttribute("data"));
listItem.innerHTML = "";
    if(Array.isArray(teamsData)){
        teamsData.forEach(item => {
            const elements = {
                alink: createElementWithClass("a", "teams_content__link"),
                div: createElementWithClass("div", "teams_content__boxitem"),
                logo: createElementWithClass("img", "teams_content__boxitem--img"),
                teamName: createElementWithClass("p", "teams_content__boxitem--name")
            };
        
            elements.logo.src = item.logo;
            elements.teamName.textContent = item.name;
            elements.alink.href = `/api/v1/team/${item._id}`
            elements.div.append(elements.logo, elements.teamName);
            elements.alink.append(elements.div);
            listItem.appendChild(elements.alink);
                })
    }

}
searchInput.addEventListener("input",(event) => {
        console.log(event.target.value)
        const searchInput = event.target.value.trim();
        if(searchInput.length>0){
            fetch(`/api/v1/team/search?name=${searchInput}`).then(response => response.json()).then(data => {
                const result = data.data;
                console.log(result)
                listItem.innerHTML = "";
                if(Array.isArray(result)){
                    result.forEach(item => {
                        const elements = {
                            alink: createElementWithClass("a", "teams_content__link"),
                            div: createElementWithClass("div", "teams_content__boxitem"),
                            logo: createElementWithClass("img", "teams_content__boxitem--img"),
                            teamName: createElementWithClass("p", "teams_content__boxitem--name")
                        };
                    
                        elements.logo.src = item.logo;
                        elements.teamName.textContent = item.name;
                        elements.alink.href = `/api/v1/team/${item._id}`
                        elements.div.append(elements.logo, elements.teamName);
                        elements.alink.append(elements.div);
                        listItem.appendChild(elements.alink);
                })
                }
                // Xử lý dữ liệu trả về từ API và hiển thị trên giao diện
            }).catch(error => console.log(error))
        }else{
            displayAllTeam();
        }
    })