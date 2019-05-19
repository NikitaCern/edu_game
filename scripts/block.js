class Rectangle {
    constructor(color, width, height, x, y,size,font,text,answer = null,description = "") {
        this.height = height;
        this.width = width;
        this.color = color;
        this.period = 0;
        this.text = text;
        this.answer = answer;
        this.font = font;
        this.size = size;
        this.x = x;
        this.y = y;
        this.free = true;
        this.description = description;
    }
    update(ctx) {
        if(this.description!=""){
            ctx.font = "30px " + this.font;
            ctx.fillStyle = "#D9CBBF";
            ctx.fillText(this.description, this.x + 30, this.y + this.height/2+6);
        }
        ctx.font ="bold "+ this.size + " " + this.font;
        ctx.fillStyle = "#D9CBBF";
        ctx.stroke();
        ctx.fillText(this.text, this.x + this.width/2-this.text.length*5.5, this.y + this.height/2+11);
    }
  // Getter
//   get area() {
//     return this.calcArea();
//   }
  // Method
    collision(other) {
        if(this.y + this.height > other.y){
            this.y = other.y - this.height;
            if(other.free == false)this.free = false;
            return;
        }
        this.y += 40*parseFloat(this.period/1000);
    }
    collisionGround(height){
        if(this.y + this.height > height){
            this.y = height - this.height;
            this.free = false;
            return;
        }
        this.y += 40*parseFloat(this.period/1000);
    }
}
