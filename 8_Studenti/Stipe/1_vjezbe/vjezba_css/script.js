const tabButton = document.querySelectorAll(".tab-btn");
const tabContent = document.querySelectorAll(".tab-content");
tabButton.forEach(button  => {
    button.addEventListener("click",() =>{
        tabButton.forEach(btn => btn.classList.remove("active"));
        tabButton.forEach(btn => tab.classList.remove("active"));
        button.classList.add("active");
        document.getElementById(button.dataset.tab).classList.add("active");

    });
});