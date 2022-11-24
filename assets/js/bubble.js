var ns = 'http://www.w3.org/2000/svg'
var div = document.getElementById('drawing')


var svg = document.createElementNS(ns, 'svg')
svg.setAttributeNS(null, 'width', '100%')
svg.setAttributeNS(null, 'height', '66%')
div.appendChild(svg)




class Target {



    constructor(size, color, name, time) {
        this.size = size;
        this.color = color;
        this.name = name;
        this.time = time;

        this.randomX = Math.random() * (1800 - 50)
        this.randomY = Math.random() * (380 - 10)

        this.element = document.createElementNS(ns, 'circle');
        this.element.setAttribute('id', name);
        this.element.setAttributeNS(null, 'width', 200);
        this.element.setAttributeNS(null, 'height', 100);
        this.element.setAttributeNS(null, 'cx', this.randomX + 50);
        this.element.setAttributeNS(null, 'cy', this.randomY);
        this.element.setAttributeNS(null, 'r', size);
        this.element.setAttributeNS(null, 'stroke', 'black');
        this.element.setAttributeNS(null, 'stroke-width', 1);
        this.element.setAttributeNS(null, 'fill', color);

        setTimeout( this.fadeAway, this.time, this.element);
    }

    fadeAway = ( function (element) {
                element.style.transition = "opacity " + 0.5 + "s";
                element.style.opacity = 0;
                element.addEventListener("transitionend", function() {
                    element.style.display = "none";
                  });
    });


}



for (let i = 0; i < 1; i ++) {

    let tokyo = new Target(15, '#fa0a1a', 'tokyo', 500)
    let tokyo2 = new Target(15, '#fa0a1a', 'tokyo', 500)
    let tokyo3= new Target(15, '#fa0a1a', 'tokyo', 500)
    let tokyo4 = new Target(15, '#fa0a1a', 'tokyo', 500)

svg.appendChild(tokyo.element);
svg.appendChild(tokyo2.element);
svg.appendChild(tokyo3.element);
svg.appendChild(tokyo4.element);

    
}
