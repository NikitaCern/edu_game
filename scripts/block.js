class Rectangle {
    constructor(color, width, height, x, y,size,font,text) {
        this.height = height;
        this.width = width;
        this.color = color;
        this.period = 0;
        this.text = text;
        this.font = font;
        this.size = size;
        this.x = x;
        this.y = y;
        this.free = true;
    }
    update(ctx) {
        ctx.font = this.size + " " + this.font;
        ctx.fillStyle = "black";
        ctx.fillText(this.text, this.x + this.width/2-this.text.length*7.5, this.y + this.height/2+11);
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
        this.y += 20*parseFloat(this.period/1000);
    }
    collisionGround(height){
        if(this.y + this.height > height){
            this.y = height - this.height;
            this.free = false;
            return;
        }
        this.y += 20*parseFloat(this.period/1000);
    } 
}