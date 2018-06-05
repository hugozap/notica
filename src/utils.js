//immutable point structure
export class Point {

	constructor(x=0, y=0) {
		this.x = x;
		this.y = y;
	}
	add({x,y}) {
		return new Point(this.x+x, this.y+y)
	}
}