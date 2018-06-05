import EventEmitter from 'events'

class TestDataProvider extends EventEmitter {
	constructor() {
		super();
	}

	monitorArea(from, to) {
		for (var i = 0; i < 10; i++) {
			let lat = Math.random()*to.x - from.x
			let lon = Math.random()*to.y - from.y
			this.emit('item', {
				id:Math.random()*100,
				text:'Some text' + Math.random()*2000,
				lat,
				lon,
			})
		}
	}
}
export default TestDataProvider