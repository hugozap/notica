import EventEmitter from 'events'

class TestDataProvider extends EventEmitter {
	constructor() {
		super();
	}

	monitorArea(from, to) {
		for (var i = 0; i < 5; i++) {
			for(var j =0 ; j < 5 ; j++ ) {
				let lat = Math.random() * i
				let lon = Math.random() * j
				this.emit('item', {
					id:Math.random()*100,
					text:'Some text' + Math.random()*2000,
					lat:lat,
					lon:lon,
				})
			}
			
		}
	}
}
export default TestDataProvider