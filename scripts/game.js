var app = new Vue({
    el: '#app',
    data: {
        pause: false,
        page_width: 0,
        page_height: 0,
        myParam: null,
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
        myParam = urlParams.get('myParam');
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
            this.startGame()
        })
    },
    methods: {
        start: function() {
            this.canvas = document.createElement("canvas");
            this.canvas.width = this.page_width;
            this.canvas.height = this.page_height;
            this.context = this.canvas.getContext("2d");
            document.getElementById("app").appendChild(this.canvas);
            this.frameNo = 0;
            this.interval = setInterval(this.updateGameArea, 20);
        },
        resize: function() {
            this.page_width=$(window).width();
            this.page_height=$(window).height();
            this.canvas.width = this.page_width;
            this.canvas.height = this.page_height;
        },
        clear: function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        startGame: function() {
            this.page_width=$(window).width();
            this.page_height=$(window).height();
            this.start();
        },
        updateGameArea: function() {
            if(this.pause==false){

            }
        },
        drawcBlock: function(){
            context.fillStyle = "#FF0000";
            context.fillRect(0, 0, 150, 75);
        }
    }
})
