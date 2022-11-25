function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

class Target {



    constructor(draw, size, color, name, time) {
        this.size = size ;
        this.color = color;
        this.name = name;
        this.time = time;
        this.isDead = false;

        this.x = getRandomInt(window.innerWidth)
        this.y = getRandomInt(380)

        this.element = draw.circle(this.size);
        this.element.center(this.x, this.y);
        this.element.stroke({ color: 'black', opacity: 1, width: 1 });
        this.element.fill(color);
        this.element.animate({duration: this.time}).ease('-').move(getRandomInt(window.innerWidth), getRandomInt(380));


        setTimeout( this.fadeAway, this.time, this);
    }

    fadeAway = ( function (target) {
        target.isDead = true;
        target.element.animate()
                .opacity(0)
                .after(function () {
                    target.element.remove()
                })
                ;
    });
    

    touch (x, y) {
        let colisionHalo = this.size / 2 ;
        
        if(x >= this.element.cx() - colisionHalo && x <= this.element.cx() + colisionHalo 
            && y >= this.element.cy() - colisionHalo && y <= this.element.cy() + colisionHalo) {
                return true;
        }

        return false;
    }

    kill() {
        this.isDead = true;
        this.element.remove();

        document.getElementById(this.name).innerHTML += 
            '<img src="/assets/img/plane.png" class="' 
            + this.name + 'Point score" style="background-color: ' 
            + this.color + '">';
    }


}



const trump = document.getElementById('phanphan_trump');
const gamePanel = document.getElementById('gamePanel');
let draw = SVG("#drawPanel");
let targets = [];

document.onmousemove = (event) => {
    let x = event.clientX * 100 / window.innerWidth ;
    let y = event.clientY * 100 / window.innerHeight ;

    let angle =  Math.atan2(50 - y,50 - x) * 40 - 60;

    
    if(angle < -120) angle += 220;
    if(angle < -65) angle = -65;
    if(angle > 65) angle = 65;

    let translateX = (x - 50) / 2;
    let translateY = (y - 50) / 2;
    
    trump.style.transform = 'rotate(' + angle  + 'deg)';
    trump.style.transform += ' translateX(' + translateX + 'px)';
    trump.style.transform += ' translateY(' + translateY + 'px)';
}

document.onclick = (event) => {
    let x = event.clientX;
    let y = event.clientY;

    draw.ellipse(150, 100)
        .fill('#002933')
        .move(trump.getBoundingClientRect().top, trump.getBoundingClientRect().left + 20 )
        .animate()
        .ease('-')
        .move(x, y)
        .fill('#008fb3') 
        .after(function () {
            this.element().remove();

            const bang = document.createElement("div");

            for (const target of targets) {
                if(target.isDead) continue;

                if(target.touch(x, y))
                {
                    bang.classList.add("bang");
                    bang.innerHTML = "SPLASH";
                    bang.style.top = y + "px";
                    bang.style.left = x + "px";
                    gamePanel.appendChild(bang);

                    target.kill();
                    break; 
                }
            }

            setTimeout(() => {
                bang.remove();
            }, "300")

            
        })   
        ;

    
}


function loopTarget () {
    targetTypes = [
        [80, '#fa0a1a', 'Tokyo', 1900 ],
        [150, 'green', 'Berlin', 1800 ],
        [250, 'orange', 'Dunkerque', 2400 ],
    ];
    for (let index = 0; index < getRandomInt(3); index++) {
        let i = getRandomInt(targetTypes.length);
        targets.push(new Target(draw, 
            targetTypes[i][0], 
            targetTypes[i][1], 
            targetTypes[i][2], 
            targetTypes[i][3]));
    }
    setTimeout(loopTarget, getRandomInt(1000));
}


draw.text("3").font({family:'Impact', size: 144}).size(50).move(window.innerWidth /2, 190).animate({duration: 1500}).size(100).opacity(0)
.after(function() {
    draw.text("2").font({family:'Impact', size: 144}).size(50).move(window.innerWidth /2, 190).animate({duration: 1500}).size(100).opacity(0)
    .after(function() {
        draw.text("1").font({family:'Impact', size: 144}).size(50).move(window.innerWidth /2, 190).animate({duration: 1500}).size(100).opacity(0)
        .after(function () {
            loopTarget();
        });
    });
});




