import EventEmitter from 'events'

/**
 Saves notes to dat. Each note will be a json file.
 Also, updates the file index.json that has all the notes
 positions
 TODO: clean, are the beaker apis being used correctly?
**/
class DatDataProvider extends EventEmitter {

	constructor() {
		super();
		this.index = [];
		this.initData = this.initDat.bind(this);
		this.addNoteToIndex = this.addNoteToIndex.bind(this);
		this.addNote = this.addNote.bind(this);
		this.updateNote = this.updateNote.bind(this);
		this.monitorArea = this.monitorArea.bind(this);
		this.initDat();
	}

	async initDat() {

		var url = window.location.toString();

		//Get current archive
		this.archive = await new DatArchive(url)
		if(!this.archive) {

			this.archive = await  DatArchive.create({
				title:'Notica Workspace',
				description:'Store Notica notes here',
			}).catch(()=>{
				console.log('Error creating archive')
			})
		}
		
		await this.archive.mkdir('/items').catch(err=>{
			console.log('items folder already exist')
		})

		//init index file (index will store ids and location)

		var stats = await this.archive.stat('/items-index.json').catch(err=>{
			console.log("items-index.json doesn't exist")
		})

		if(!stats) {
		   console.log('creating intems-index.json')
		   await this.archive.writeFile('/items-index.json','[]')
		}

		var indexContents = await this.archive.readFile('/items-index.json')
		this.index = JSON.parse(indexContents);
		

	}

	async addNoteToIndex(note) {
		//update index
		//persist changes
		this.index.push({
			lat: note.lat,
			lon: note.lon,
			id: note.id
		})

		return this.archive.writeFile('/items-index.json', JSON.stringify(this.index))
	}

	async addNote(item) {
		await this.archive.writeFile('/items/'+item.id, JSON.stringify(item))
	    return addNoteToIndex(item)

	}

	async updateNote(item) {
		await this.archive.writeFile('/items/'+item.id, JSON.stringify(item))
	}

	async monitorArea(from, to) {
		console.log('monitoring area', from, to)
		//Buscar todas las notas donde la posicion esté entre from y to
		//TODO: usar un algoritmo más rápido, box intersection
		this.index.forEach(async(indexNote)=>{
			if(indexNote.lat >= from.x &&
			   indexNote.lat <= to.x &&
			   indexNote.lon >= from.y &&
			   indexNote.lon <= to.y) {
				//This note is inside the area
				//Read it and emit it
				this.archive.readFile('/items/'+indexNote.id).then(content=>{
					this.emit('item', JSON.parse(content));
				})
			}
		})
	}
}
export default DatDataProvider	