var clock = new Date();
var startTime = clock.getTime();
var app = new Vue({
    el: '#app',
    data: {
        pause: false,
        reverse: false,
        page_width: 0,
        page_height: 0,
        canvas: null,
        context: null,
        frameNo: 0,
        tower: [],
        interval: null,
        score: {
            time: null,
            rezult: null
        },
        height_input:1,
        difficulty_input:1,
        lable: [null,null],
        myAnswer: "",
        description: "Ievadiet naturālu skaitli un spiediet Enter, lai atbildētu uz zemāko uzdevumu"
    },
    created: function () {
        var url = new URL(window.location);
        const urlParams = new URLSearchParams(url.search);
        this.height_input = urlParams.get('h');
        this.difficulty_input = urlParams.get('d');
    },
    computed: {
        perSecond() {
            return (parseFloat(this.score.rezult.text)*60/parseFloat(this.score.time.text)).toFixed(1)
        }
    },
    beforeUpdate: function(){
    },
    updated: function(){
    },
    mounted: function () {
        this.$nextTick(function () {
            window.addEventListener('resize', this.resize, true);
            window.addEventListener("keyup", function(event) {
                if (event.keyCode === 13) {
                    this.evaluate();
                }
            }.bind(this));
            this.startGame()
        })
    },
    methods: {
        addRect:function(question, answer){
            this.tower.push(new Rectangle("#A6978A",600,120,this.page_width/2-300,0,"30px", "Consolas",question,answer));
        },
        clear: function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        evaluate: function(){
            var clockLocal = new Date();
            if(this.tower[1].answer==this.myAnswer){
                this.score.rezult.text=(parseInt(this.score.rezult.text)+1).toString();
                this.explosion();
                this.tower[0].text="";
            }else startTime-=10000;
        },
        explosion: function(){
            if(this.tower.length==1) return;
            if(this.tower.length>2){
                this.pause = true;
                this.reverse = true;
            }else{
                this.pause = false;
                this.reverse = false;
            }
            for(let i=2,len=this.tower.length;i<len;i++){
                this.tower[i-1] = this.tower[i];
                this.tower[i-1].free = true;
                this.tower[i-1].period=0;
            }
            this.tower.pop();
        },
        resize: function() {
            this.page_width=$(window).width();
            this.page_height=$(window).height();
            this.canvas.width = this.page_width;
            this.canvas.height = this.page_height;
        },
        start: function() {
            this.canvas = document.createElement("canvas");
            this.canvas.width = this.page_width;
            this.canvas.height = this.page_height;
            this.context = this.canvas.getContext("2d");
            document.getElementById("app").appendChild(this.canvas);
            this.lable[0] = (new Rectangle("#253840",130,80,this.page_width-170,-80,"20px", "Consolas","Atrisinati"));
            this.score.rezult = (new Rectangle("#586E73",130,100,this.page_width-170,-80,"30px", "Consolas","0"));
            this.lable[1] = (new Rectangle("#253840",130,80,20,-80,"20px", "Consolas","Laiks"));
            this.score.time = (new Rectangle("#586E73",130,100,20,-80,"30px", "Consolas","0"));
            this.tower.push(new Rectangle("#253840",this.page_width,200,0,this.page_height-100,"30px", "Consolas",""));
            this.frameNo = 0;
            this.recieve();
            this.interval = setInterval(this.updateGameArea, 10);
        },
        startGame: function() {
            this.page_width=$(window).width();
            this.page_height=$(window).height();
            this.start();
        },
        updateGameArea: function() {
            if(this.pause==false){
                this.clear();
                for(let i=0,len=this.tower.length;i<len;i++){
                    if(this.tower[i].free==true){
                        this.tower[i].period+=10;
                        if(i==0){
                            this.tower[i].collisionGround(this.page_height);
                        }else this.tower[i].collision(this.tower[i-1]);
                    }
                    this.context.fillStyle = this.tower[i].color;
                    this.context.fillRect(this.tower[i].x, this.tower[i].y, this.tower[i].width, this.tower[i].height);
                    this.tower[i].update(this.context);
                }
                if(this.score.time.free==true){
                    this.score.time.period+=10;
                    this.score.time.collision(this.tower[0]);
                }
                this.context.fillStyle = this.score.time.color;
                this.context.fillRect(this.score.time.x, this.score.time.y, this.score.time.width, this.score.time.height);
                if(this.score.rezult.free==true){
                    this.score.rezult.period+=10;
                    this.score.rezult.collision(this.tower[0]);
                }
                this.context.fillStyle = this.score.rezult.color;
                this.context.fillRect(this.score.rezult.x, this.score.rezult.y, this.score.rezult.width, this.score.rezult.height);
                var clockLocal = new Date();
                this.score.time.text = (((clockLocal.getTime() - startTime)/1000).toFixed(0)).toString();
                this.score.time.update(this.context);
                this.score.rezult.update(this.context);
                if(this.lable[0].free==true){
                    this.lable[0].period+=10;
                    this.lable[0].collision(this.score.rezult);
                }
                this.context.fillStyle = this.lable[0].color;
                this.context.fillRect(this.lable[0].x, this.lable[0].y, this.lable[0].width, this.lable[0].height);
                this.lable[0].update(this.context);
                if(this.lable[1].free==true){
                    this.lable[1].period+=10;
                    this.lable[1].collision(this.score.time);
                }
                this.context.fillStyle = this.lable[1].color;
                this.context.fillRect(this.lable[1].x, this.lable[1].y, this.lable[1].width, this.lable[1].height);
                this.lable[1].update(this.context);

                this.context.beginPath();
                this.context.moveTo(this.page_width/2-305,this.page_height-200);
                this.context.lineTo(this.page_width/2-305,this.page_height-320);
                this.context.lineTo(this.page_width/2+305,this.page_height-320);
                this.context.lineTo(this.page_width/2+305,this.page_height-200);
                this.context.closePath();
                this.context.strokeStyle="#FF383F";
                this.context.lineWidth = 15;
                this.context.stroke();

                if(this.tower.length==1) this.pause = true;
            }
            if(this.reverse==true){
                if(4-9*parseFloat(this.tower[1].period/1000)<=0){
                    this.pause = false;
                    this.reverse = false;
                    for(let i=1,len=this.tower.length;i<len;i++){
                        this.tower[i].period=0;
                    }
                }else{
                    this.clear();
                    this.context.fillStyle = this.tower[0].color;
                    this.context.fillRect(this.tower[0].x, this.tower[0].y, this.tower[0].width, this.tower[0].height);
                    this.tower[0].update(this.context);
                    this.context.fillStyle = this.score.time.color;
                    this.context.fillRect(this.score.time.x, this.score.time.y, this.score.time.width, this.score.time.height);
                    this.context.fillStyle = this.score.rezult.color;
                    this.context.fillRect(this.score.rezult.x, this.score.rezult.y, this.score.rezult.width, this.score.rezult.height);
                    this.score.rezult.update(this.context);
                    var clockLocal = new Date();
                    this.score.time.text = (((clockLocal.getTime() - startTime)/1000).toFixed(0)).toString();
                    this.score.time.update(this.context);
                    this.context.fillStyle = this.lable[0].color;
                    this.context.fillRect(this.lable[0].x, this.lable[0].y, this.lable[0].width, this.lable[0].height);
                    this.lable[0].update(this.context);
                    this.context.fillStyle = this.lable[1].color;
                    this.context.fillRect(this.lable[1].x, this.lable[1].y, this.lable[1].width, this.lable[1].height);
                    this.lable[1].update(this.context);
                    for(let i=1,len=this.tower.length;i<len;i++){
                        this.tower[i].period+=10;
                        this.tower[i].y -= 4-9*parseFloat(this.tower[i].period/1000);
                        this.context.fillStyle = this.tower[i].color;
                        this.context.fillRect(this.tower[i].x, this.tower[i].y, this.tower[i].width, this.tower[i].height);
                        this.tower[i].update(this.context);
                    }
                    this.context.beginPath();
                    this.context.moveTo(this.page_width/2-305,this.page_height-200);
                    this.context.lineTo(this.page_width/2-305,this.page_height-320);
                    this.context.lineTo(this.page_width/2+305,this.page_height-320);
                    this.context.lineTo(this.page_width/2+305,this.page_height-200);
                    this.context.closePath();
                    this.context.strokeStyle="#FF383F";
                    this.context.lineWidth = 15;
                    this.context.stroke();
                }
            }
            if(this.reverse==false && this.pause==true){
                this.interval = null;
                this.clear();
            }
        },
        getRandomLimits: function(max){
            return Math.floor(Math.random() * Math.floor(max));
        },
        recieve: function() {
            var operator = ["+",
                            "+-",
                            "+-*",
                            "+-*/"];
            var difficulty = [ [1,1],
                            [1,2],
                            [2,2],
                            [3,2],
                            [3,3]
                          ];
            for (var i = 0; i < this.height_input; i++) {
              var chosen_operator = operator[difficulty[this.difficulty_input][0]].charAt(this.getRandomLimits(difficulty[this.difficulty_input][0]+1));
              var nr_of_chars = difficulty[this.difficulty_input][1];
              //console.log(operator[difficulty[this.difficulty_input][0]])
              //console.log(nr_of_chars)
              if(chosen_operator == "+"){
                var n = this.getRandomLimits(Math.pow(10 , nr_of_chars));
                var m = this.getRandomLimits(Math.pow(10 , nr_of_chars));
                var quest = n+"+"+m+"=";
                var answer = n+m;
              }
              if(chosen_operator == "-"){
                var n = this.getRandomLimits(Math.pow(10 , nr_of_chars));
                var m = this.getRandomLimits(Math.pow(10 , nr_of_chars));
                if(n<m){
                  var temp = n;
                  n = m;
                  m=temp;
                }
                var quest = n+"-"+m+"=";
                var answer = n - m;
              }
              if(chosen_operator == "*"){
                var n = this.getRandomLimits(Math.pow(10 , nr_of_chars));
                var m = this.getRandomLimits(Math.pow(10 , nr_of_chars));
                var quest = n+"*"+m+"=";
                var answer = n*m;
              }
              if(chosen_operator == "/"){
                var m = this.getRandomLimits(Math.pow(10 , nr_of_chars));
                var n = m*this.getRandomLimits(Math.pow(10 , nr_of_chars));
                var  answer=n/m;
                var quest = n+"/"+m+"=";
              }
              //console.log(quest);
              //console.log(answer);
              this.addRect(quest, answer);
            }
        }
    }
})
