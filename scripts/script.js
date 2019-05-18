var app = new Vue({
    el: '#main_body',
    data: {
        height_input:1,
        difficulty_input:1,
        nr_of_chars:1,
    },
    methods: {
        getRandomLimits: function(min, max){
            return floor(Math.random() * ( max - min ) + min);
        },
        recieve: function() {
            var operator = ["+",
                            "+-",
                            "+-*",
                            "+-*/"];
            for (var i = 0; i < this.height_input; i++) {
              var chosen_operator = operator[this.difficulty_input-1].charAt(getRandomLimits(0,this.difficulty_input-1));
              if(chosen_operator == "+"){
                var n = getRandomLimits(0, Math.pow(10 , this.nr_of_chars+1)-1);
                var m = getRandomLimits(0, Math.pow(10 , this.nr_of_chars+1)-1);
                var answer = n+m;
              }
              if(chosen_operator == "-"){
                var n = getRandomLimits(0, Math.pow(10 , this.nr_of_chars+1)-1);
                var m = getRandomLimits(0, Math.pow(10 , this.nr_of_chars+1)-1);
                if(n<m){
                  var temp = n;
                  n = m;
                  m=temp;
                }
                var answer = n - m;
              }
              if(chosen_operator == "*"){
                var n = getRandomLimits(0, Math.pow(10 , this.nr_of_chars)-1);
                var m = getRandomLimits(0, Math.pow(10 , this.nr_of_chars)-1);
                var answer = n*m;
              }
              if(chosen_operator == "/"){
                var n = getRandomLimits(0, Math.pow(10 , this.nr_of_chars)-1);
                var answer = n*getRandomLimits(0, Math.pow(10 , this.nr_of_chars)-1);
                var  m = answer / n;
              }
            }
        }
    }
})
