var app = new Vue({
    el: '#main_body',
    data: {
        height_input:1,
        difficulty_input:1,
        nr_of_chars:1,
    },
    methods: {
        recieve: function() {
          console.log(this.height_input)
          console.log(this.difficulty_input)
          console.log(this.nr_of_chars)
        }
    }
})
