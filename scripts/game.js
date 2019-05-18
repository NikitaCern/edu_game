var app = new Vue({
    el: '#app',
    data: {
        pause: false,
        reverse: false,
        page_width: 0,
        page_height: 0,
        blocks: null,
        canvas: null,
        context: null,
        frameNo: 0,
        tower: [],
        interval: null,
        setting: {

        }
    },
    created: function () {
        var url = new URL(window.location);
        const urlParams = new URLSearchParams(url.search);
        this.blocks = urlParams.get('h');
    },
    computed: {
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
        addRect:function(){
            while(this.tower.length<=this.blocks){
                this.tower.push(new Rectangle("red",600,120,this.page_width/2-300,0));
            }
        },
        clear: function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        evaluate: function(){
            //if(this.tower.answer==)
            this.explosion();
        },
        explosion: function(){
            if(this.tower.length==1) return;
            if(this.tower.length>2){
                this.pause = true;
                this.reverse = true;
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
            this.tower.push(new RectangleText("green",this.page_width,80,0,0));
            this.frameNo = 0;
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
                }
            }
            if(this.reverse==true){
                if(this.tower[1].speed-9*parseFloat(this.tower[1].period/1000)<=0){
                    this.pause = false;
                    this.reverse = false;
                    for(let i=1,len=this.tower.length;i<len;i++){
                        this.tower[i].period=0;
                    }
                }else{
                    this.clear();
                    this.context.fillStyle = this.tower[0].color;
                    this.context.fillRect(this.tower[0].x, this.tower[0].y, this.tower[0].width, this.tower[0].height);
                    for(let i=1,len=this.tower.length;i<len;i++){
                        this.tower[i].period+=10;
                        this.tower[i].y -= this.tower[i].speed-9*parseFloat(this.tower[i].period/1000);
                        this.context.fillStyle = this.tower[i].color;
                        this.context.fillRect(this.tower[i].x, this.tower[i].y, this.tower[i].width, this.tower[i].height);
                    }
                }
            }
        },
    }
})
