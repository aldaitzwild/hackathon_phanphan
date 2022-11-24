const trump = document.getElementById('phanphan_trump');
const gamePanel = document.getElementById('gamePanel');

document.onmousemove = (event) => {
    let x = event.clientX * 100 / window.innerWidth ;
    let y = event.clientY * 100 / window.innerHeight ;

    let angle =  Math.atan2(50 - y,50 - x) * 40 - 60;

    
    if(angle < -120) angle += 250;
    if(angle < -90) angle = -90;
    if(angle > 90) angle = 90;
    
    trump.style.transform = 'rotate(' + angle  + 'deg)';
    trump.style.transform += ' translateX(' + ((x - 50) * 2) + 'px)';
    trump.style.transform += ' translateY(' + ((y - 50) * 2) + 'px)';
}

document.onclick = (event) => {
    let x = event.clientX;
    let y = event.clientY;

    const bang = document.createElement("div");
    bang.classList.add("bang");
    bang.innerHTML = "BANG";
    bang.style.top = y + "px";
    bang.style.left = x + "px";

    gamePanel.appendChild(bang);
}

