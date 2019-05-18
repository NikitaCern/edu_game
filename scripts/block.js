class Rectangle {
  constructor(color, width, height, x, y, speed) {
    this.height = height;
    this.width = width;
    this.color = color;
    this.period = 0;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.free = true;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
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