/**
 * Created by keziyuan on 2016/4/2 0002.
 */

function WinResize(resize) {
    var setTimeResize;
    $(window).resize(function () {
        if (setTimeResize) {
            clearTimeout(setTimeResize);
        }
        setTimeResize = setTimeout(resize, 200)
    });
    return setTimeResize;
}

!(function (window) {

    var m             = Math,
        u             = m.PI * 2,
        MathCos       = m.cos,
        winWidth,
        winHeight,
        pr            = 1, //window.devicePixelRatio || 1,
        random        = m.random,
        isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|Windows Phone|Tizen|Bada)/);


    var Particle = function (option) {
        this.r = 0;//记录递增的值
        this.resizeId = function () {
        };
        this.option = {
            globalAlpha    : 0.5,//透明
            popple         : 1.5,//增幅
            flap           : 100,//透明
            resizeOption   : function () {
                if (winWidth > 1200) {
                    this.option.popple = 1;
                    this.option.flap = 180;
                } else if (winWidth > 768) {
                    this.option.popple = 1.2;
                    this.option.flap = 150;
                } else if (winWidth > 480) {
                    this.option.popple = 1.3;
                    this.option.flap = 120;
                } else {
                    this.option.popple = 1.4
                    this.option.flap = 100;
                }
            },
            getSideLength  : function () {//多边形的边数
                return 3
            },
            getInitialAngle: function () {// 初始角度
                return random() * u;
            },
            getRadius      : function () {//半径
                return Math.random() * Math.random() * 50
            }
        };
        this.init = function (option) {
            this.option = $.extend(this.option, option);
            for (var key in option) {
                if (/^get/i.test(key) && typeof option[key] !== "function") {
                    var value = this.option[key];
                    this.option[key] = function () {
                        return value;
                    }
                } else {
                    this.option[key] = option[key];
                }
            }
            this.canvas = document.getElementById(option._id);
            this.ctx = this.canvas.getContext('2d');
            this.resize();
        }
    }

    Particle.prototype.resize = function () {
        winWidth = $(window).width();
        winHeight = $(window).height();
        console.log(winWidth,winHeight,pr);
        this.option.resizeOption.call(this);
        this.canvas.width = winWidth * pr;
        this.canvas.height = winHeight * pr;
        this.ctx.scale(pr, pr);
        this.ctx.globalAlpha = this.option.globalAlpha;
        this.reset();
    }

    Particle.prototype.reset = function () {
        this.ctx.clearRect(0, 0, winWidth, winHeight);
        this.point = [{x: 0, y: winHeight * .7 + this.option.flap}, {
            x: 0,
            y: winHeight * .7 - this.option.flap
        }];
        while (this.point[1].x < winWidth + this.option.flap)
            this.draw(this.point[0], this.point[1])
    }

    Particle.prototype.getNext = function (target) {
        var next = target + (random() * 2 - 1.1) * this.option.flap;
        return (next > winHeight || next < 0) ? this.getNext(target) : next
    }

    Particle.prototype.getFillStyle = function () {
        this.r -= u / -50;
        return '#' + (MathCos(this.r) * 127 + 128 << 16 | MathCos(this.r + u / 3) * 127 + 128 << 8 | MathCos(this.r + u / 3 * 2) * 127 + 128).toString(16);
    }

    /* 绘制多边形 */
    Particle.prototype.drawPolygon = function (i, j, k, fillStyle) {
        this.ctx.beginPath();
        var p = {};//中心
        p.x = (i.x + j.x + k.x) / 3 + (random() * this.option.popple - 0.25) * this.option.flap;
        p.y = (i.y + j.y + k.y) / 3 + (random() * this.option.popple - 0.25) * this.option.flap;

        var sideLength = this.option.getSideLength();
        var initialAngle = this.option.getInitialAngle();
        var radius = this.option.getRadius() / this.option.popple;

        var angle = u / sideLength;
        var x = radius * Math.cos(initialAngle) + p.x;
        var y = radius * Math.sin(initialAngle) + p.y;
        this.ctx.moveTo(x, y);
        for (var i = 1; i < sideLength; i++) {
            x = radius * Math.cos(initialAngle + i * angle) + p.x;
            y = radius * Math.sin(initialAngle + i * angle) + p.y;
            this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        this.ctx.fillStyle = fillStyle;
        this.ctx.fill();
    }

    /* 绘制圆形 */
    Particle.prototype.drawCircle = function (i, j, k, fillStyle) {
        this.ctx.beginPath();
        var p = {};
        p.x = (i.x + j.x + k.x) / 3 + (random() * this.option.popple - 0.25) * this.option.flap;
        p.y = (i.y + j.y + k.y) / 3 + (random() * this.option.popple - 0.25) * this.option.flap;
        this.ctx.arc(p.x, p.y, random() * random() * 50 / this.option.popple, 0, 2 * Math.PI, false);
        this.ctx.closePath();
        this.ctx.fillStyle = fillStyle;
        this.ctx.fill();
    }

    /* 绘制线条 */
    Particle.prototype.drawLine = function (i, j, k, fillStyle) {
        this.ctx.beginPath()
        this.ctx.moveTo(i.x, i.y)
        this.ctx.lineTo(j.x, j.y)
        this.ctx.lineTo(k.x, k.y)
        this.ctx.closePath()
        this.ctx.fillStyle = fillStyle;
        this.ctx.fill();
    }

    var ParticleLine = function () {
        this.draw = function (i, j) {
            var k = {};
            k.x = j.x + (random() * this.option.popple - 0.25) * this.option.flap;
            k.y = this.getNext(j.y);

            var fillStyle = this.getFillStyle();
            this.drawLine(i, j, k, fillStyle);

            this.point[0] = this.point[1];
            this.point[1] = k;
        }
    }
    ParticleLine.prototype = new Particle();

    var ParticleCircle = function () {
        this.draw = function (i, j) {
            var k = {};
            k.x = j.x + (random() * this.option.popple - 0.25) * this.option.flap;
            k.y = this.getNext(j.y);

            var fillStyle = this.getFillStyle();
            this.drawCircle(i, j, k, fillStyle);

            this.point[0] = this.point[1];
            this.point[1] = k;
        }
    }
    ParticleCircle.prototype = new Particle();

    var ParticleLineAndCircle = function () {
        this.draw = function (i, j) {
            var k = {};
            k.x = j.x + (random() * this.option.popple - 0.25) * this.option.flap;
            k.y = this.getNext(j.y);

            var fillStyle = this.getFillStyle();

            this.drawLine(i, j, k, fillStyle);
            this.drawCircle(i, j, k, fillStyle);

            this.point[0] = this.point[1];
            this.point[1] = k;
        }
    }
    ParticleLineAndCircle.prototype = new Particle();

    var ParticlePolygon = function () {
        this.draw = function (i, j) {
            var k = {};
            k.x = j.x + (random() * this.option.popple - 0.25) * this.option.flap;
            k.y = this.getNext(j.y);

            var fillStyle = this.getFillStyle();

            this.drawPolygon(i, j, k, fillStyle);

            this.point[0] = this.point[1];
            this.point[1] = k;
        }
    }
    ParticlePolygon.prototype = new Particle();

    var getParticles = {
        "line"       : ParticleLine,
        "circle"     : ParticleCircle,
        "line_circle": ParticleLineAndCircle,
        "polygon"    : ParticlePolygon
    };

    function resizeHandler() {
        var _this = this;

        clearTimeout(_this.resizeId);
        _this.resizeId = setTimeout(function () {
            _this.resize();
        }, 500);

        //if (isTouchDevice) {
        //
        //    if ($(document.activeElement).attr('type') !== 'text') {
        //        var currentHeight = $(window).height();
        //
        //        if (Math.abs(currentHeight - winHeight) > (20 * Math.max(winHeight, currentHeight) / 100)) {
        //            _this.resize();
        //            winHeight = currentHeight;
        //        }
        //    }
        //} else {
        //    clearTimeout(_this.resizeId);
        //    _this.resizeId = setTimeout(function () {
        //        _this.resize();
        //    }, 500);
        //}

    }

    function createParticle(option) {
        var particle;
        if (typeof option == "string") {
            option = {"_id": option};
            particle = new getParticles["line"]();
        } else {
            particle = new getParticles[option.type]();
        }
        if ($("#" + option._id).length == 0)
            return false;
        particle.init(option);
        $(window).resize(resizeHandler.bind(particle));
        if (option.onclickTarget) {
            $(option.onclickTarget).on("click", function () {
                particle.reset()
            })
        }
        return particle
    };

    window.createParticle = createParticle;

})(window)

!(function (window) {

    var m       = Math,
        u       = m.PI * 2,
        MathCos = m.cos,
        winWidth,
        winHeight,
        pr      = window.devicePixelRatio || 1,
        random  = m.random;

    function particlePolygon(_id) {

        var centerX, centerY;
        var canvas = document.getElementById(_id);
        var context = canvas.getContext("2d");
        var particles;
        var t = 0;
        var todo;
        //粒子类
        function Particle() {
            this.radius = 41.6;
            this.radiusTime = 2;
            this.color = {};
            this.r = 0;
            this.render = function (context) {
                context.beginPath();
                var x = this.radius * Math.cos(0) + centerX;
                var y = this.radius * Math.sin(0) + centerY;
                context.moveTo(x, y);
                for (var i = 1; i < 4; i++) {
                    x = this.radius * Math.cos(i * Math.PI / 2) + centerX;
                    y = this.radius * Math.sin(i * Math.PI / 2) + centerY;
                    context.lineTo(x, y);
                }
                context.closePath();

                var times = 3 / 4 - this.radius / Math.min(winWidth, winHeight);
                context.lineWidth = 5 * times;
                context.shadowBlur = 1 * times;
                //context.shadowColor = "rgb(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + ")"
                context.shadowColor = "rgba(32,97,167)";
                //context.fillStyle = "rgba(32,97,167," + time + ")";
                //context.fill();
                context.strokeStyle = "rgba(32,97,167," + times + ")";
                context.stroke();

            }
            this.update = function () { //更新自己的方法
                //this.r -= Math.PI * 2 / -50;
                //var color = (Math.cos(this.r) * 127 + 128 << 16 | Math.cos(this.r + Math.PI * 2 / 3) * 127 + 128 << 8 | Math.cos(this.r + Math.PI * 2 / 3 * 2) * 127 + 128).toString(16);
                //color = color.toLowerCase();
                //var sColorChange = [];
                //for (var i = 0; i < 7; i += 2) {
                //    sColorChange.push(parseInt("0x" + color.slice(i, i + 2)));
                //}
                //this.color.r = sColorChange[0];
                //this.color.g = sColorChange[1];
                //this.color.b = sColorChange[2];
                if (this.radius >= winWidth * 3 / 4 || this.radius >= winHeight * 3 / 4) {
                    if (todo) {
                        //clearTimeout(todo)
                    }
                    particles.shift();
                } else {
                    this.radius += this.radiusTime;
                }
            }
        }

        var resize = function () {
            winHeight = $(window).height();
            winWidth = $(window).width();
            centerX = winWidth / 2;
            centerY = winHeight / 2;
            canvas.width = winWidth * pr;
            canvas.height = winHeight * pr;
            context.clearRect(0, 0, winWidth, winHeight);
            particles = [new Particle()];
        }

        var resizeId;
        $(window).resize(function () {
            clearTimeout(resizeId);
            resizeId = setTimeout(function () {
                resize();
            }, 500);
        });

        resize();
        var render = function () {
            context.clearRect(0, 0, winWidth, winHeight);
            // 绘制数组中的每一个粒子
            for (var i = 0; i < particles.length; i++) {
                var particle = particles[i];
                particle.render(context);
                particle.update(i);
            }
            if (t > 60) {
                //每60帧随机产生一个粒子加入数组
                particles.push(new Particle());
                t = 0;
            }
            t++;
            todo = requestAnimationFrame(render)
        }
        requestAnimationFrame(render);
    }

    window.particlePolygon = particlePolygon;

})(window)


