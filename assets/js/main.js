var $, containerSpin, containerStyles, spin;

function createContainer() {
    containerSpin = document.createElement("div");

    containerSpin.style.backgroundColor = "#C3C3C3";
    containerSpin.style.position = "relative";
    containerSpin.style.width = "340px";
    containerSpin.style.height = "340px";

    document.body.insertBefore(containerSpin, document.body.childNodes[0]);

    spin = new Spin(containerSpin,120);
}

var Spin = (function(){
    function Spin(container_, center_){
        Spin.scope = this;

        this.container = container_;
        this.center = center_;

        this.wheel;
        this.wheelDiameter = 300;

        this.pin;
        this.pinw = 52;
        this.pinh = 62;
        this.tlPin;

        this.minRotation = 33;

        this.init();
    };

    Spin.prototype.init = function(){

        this.wheel = new Image();
        this.wheel.src = "assets/img/wheel.png";
        this.wheel.style.position = "absolute";
        this.wheel.style.left = "20px";
        this.wheel.style.top = "20px";
        this.container.appendChild(this.wheel);

        this.pin = new Image();
        this.pin.src = "assets/img/pin.png"
        this.pin.style.position = "absolute";
        this.pin.style.left = "144px";
        this.pin.style.top = "134px";
        this.container.appendChild(this.pin);

        this.counterMouseDown = 0;

        this.tlPin = new TimelineMax({repeat:-1});

        this.addListeners();
    };

    Spin.prototype.addListeners = function(){

        Spin.scope.container.addEventListener('mousedown',Spin.scope.onMouseDown);
        Spin.scope.container.addEventListener('mouseup',Spin.scope.onMouseUp);

        Spin.scope.container.addEventListener('touchstart',Spin.scope.onMouseDown);
        Spin.scope.container.addEventListener('touchend',Spin.scope.onMouseUp);
    };

    Spin.prototype.removeListeners = function(){

        Spin.scope.container.removeEventListener('mousedown',Spin.scope.onMouseDown);
        Spin.scope.container.removeEventListener('mouseup',Spin.scope.onMouseUp);
        Spin.scope.container.removeEventListener('mousemove',Spin.scope.getCounter);

        Spin.scope.container.removeEventListener('touchstart',Spin.scope.onMouseDown);
        Spin.scope.container.removeEventListener('touchend',Spin.scope.onMouseUp);
        Spin.scope.container.removeEventListener('touchmove',Spin.scope.getCounter);
    };

    Spin.prototype.onMouseDown = function(){
        Spin.scope.container.addEventListener('mousemove',Spin.scope.getCounter);
        Spin.scope.container.addEventListener('touchmove',Spin.scope.getCounter);
    };

    Spin.prototype.getCounter = function(){
        Spin.scope.counterMouseDown++;
    };

    Spin.prototype.onMouseUp = function(){
        Spin.scope.removeListeners();
        Spin.scope.anim(Spin.scope.counterMouseDown);
    };

    Spin.prototype.getRotation = function (rotation) {
        var value;
        var addValue = 68;
        var maxDegree = 360;

        if(rotation > 0 && rotation <= 360) value = maxDegree * 2 + addValue;
        if(rotation > 360 && rotation <= 720) value = maxDegree * 4 + addValue;
        if(rotation > 720 && rotation <= 1080) value = maxDegree * 6 + addValue;
        if(rotation > 1080 && rotation <= 1440) value = maxDegree * 7 + addValue;
        if(rotation > 1440 && rotation <= 1800) value = maxDegree * 8 + addValue;
        if(rotation > 1800 && rotation <= 2160) value = maxDegree * 9 + addValue;
        if(rotation > 2160 && rotation <= 2520) value = maxDegree * 10 + addValue;
        if(rotation > 2520 && rotation <= 2880) value = maxDegree * 11 + addValue;

        return value;
    };

    Spin.prototype.anim = function(factor){
        /*Spin.scope.tlPin.to(Spin.scope.pin,.15,{rotation:-3})
                  .to(Spin.scope.pin,.15,{rotation:3});*/

        var time = (Math.sqrt(factor)/8);
        var rotationInitial = Spin.scope.minRotation * factor;

        if(rotationInitial > 2880) rotationInitial = 2880;

        var rotationSelected = Spin.scope.getRotation(rotationInitial);

        /*console.log('factor: ' + factor);
        console.log('time: ' + time);
        console.log('rotationInitial: ' + rotationInitial);
        console.log('rotationSelected: ' + rotationSelected);*/

        TweenMax.to(Spin.scope.wheel,5 - time,{rotation:"+=" + rotationSelected, ease:Cubic.easeInOut, transformOrigin:'50% 50%', onComplete:Spin.scope.resetWheel});
    };

    Spin.prototype.resetWheel = function(){
       /* Spin.scope.tlPin.to(Spin.scope.pin,.4,{rotation:0});
        Spin.scope.tlPin.stop();*/
        TweenMax.set(Spin.scope.wheel,{delay:2, rotation:0, onComplete:function(){
            Spin.scope.counterMouseDown = 0;
            Spin.prototype.addListeners();
        }});
    };

    return Spin;
})();

function init() {
    createContainer();
}

function $(selector) {
    var element;
    selector.indexOf('#') == 0 ? element = document.querySelector(selector) : element = document.querySelectorAll(selector);
    return element;
}

document.addEventListener('DOMContentLoaded',init);