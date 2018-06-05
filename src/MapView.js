import LandMap,{REF_MAP} from './LandMap'
import * as domUtils from './domUtils'
import {Point} from './utils'
import noteRenderer from './NoteRenderer'
/**
 La clase mapview se encarga de manipular el DOM para
 mostrar las parcelas
**/

//TODO: format, change tabs to spaces


//pixels moved when arrows are pressed
const KEYBOARD_STEP  = 400;
const defaultOpts = {
	containerElement: 'body',
	itemRenderer: noteRenderer,
	parcelLength: 200,
	dataProvider: null,

}

//TODO: add base css here

const css = `

	.content-container {
		position: absolute;
		top: 0;
		left: 0;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	.item {
	    position: absolute;
	    top: 0;
	    left: 0;
	    transition: transform 0.5s;
	    word-wrap: break-word;
	}
`

domUtils.injectCSS(css);

export default class MapView {

	constructor(opts) {
		opts = Object.assign({}, defaultOpts,  opts);
		this.opts = opts; 
		this.offset = opts.offset || new Point(0,0)
		this.dataProvider = opts.dataProvider;
		this.container = typeof opts.containerElement === 'string' ? 
			document.querySelector(opts.containerElement) :
			opts.containerElement

		this.map = new LandMap({
			parcelLength: opts.parcelLength,
			offset: this.offset
		})
		this.initDOM()
		this.attachEvents()
		//Start monitoring the initial map areachanged
		var initialArea = this.map.getArea();
		this.dataProvider.monitorArea(initialArea[0], initialArea[1])

	}

	initDOM() {
		//Create contentContainer
		this.contentContainer = this.createContentContainer();

	}

	createContentContainer() {
		var contentContainer = document.createElement('div');
		contentContainer.classList.add('content-container');
		this.container.appendChild(contentContainer);
		return contentContainer
	}



	attachEvents() {
		this.monitorMapOffset();
		this.connectToDataProvider();
		this.addKeyboardEvents();
		this.addMouseEvents()
	}

	monitorMapOffset() {

		this.map.on('offsetchanged', (offset)=>{
			console.log('offset changed', offset);
			//map was moved
			this.offset = offset;
			//update transform attribute so they move
			this.updateElementPositions(offset);
		})

		//when the area to monitor changes
		//receives the newArea [P1,P2] where
		//P1 is the top left point (lat,lon)
		//and P2 is the bottom right point
		this.map.on('areachanged', (startPoint, endPoint)=>{
			//When current parcel changes (and their surroundings)
			//TODO: call monitorarea (dataprovider)
			console.log('parcel map changed')
			this.dataProvider.monitorArea(startPoint, endPoint)
		})
	}

	updateElementPositions(offset) {
		//upate dom elements transform attribute
		var elems = Array.from(this.contentContainer.querySelectorAll('.item'))
		elems.forEach((elem)=>{
			let pos = this.getItemPosition(Number(elem.dataset.lat), Number(elem.dataset.lon), offset);
			elem.style.transform = `translate(${pos.x}px,${pos.y}px)`

		})
	}

	connectToDataProvider() {
		this.dataProvider.on('item', (item)=>{
			console.log('item received,', item)
			let itemElem = this.createItemElement(item);
			itemElem.classList.add('item')
			itemElem.dataset.lat = item.lat
			itemElem.dataset.lon = item.lon

			//todo: add to a itemcontainr layer
			this.contentContainer.appendChild(itemElem);
			//set position
			let pos = this.getItemPosition(item.lat, item.lon, this.offset);
			console.log('item pos', pos)
			itemElem.style.transform = `translate(${pos.x}px,${pos.y}px)`

		})
	}

	getItemPosition(lat, lon, offset) {
		//calculate item the pixel position
 		//TODO: don't access parcelMap directly

		return {
			x: lat * this.opts.parcelLength + offset.x,
			y: lon * this.opts.parcelLength + offset.y
		}
	}

	createItemElement(item) {
		//todo delegate this to item renderer
		var elem = document.createElement('div')
		elem.innerHTML = this.opts.itemRenderer(item);
		return elem;
	}

	addKeyboardEvents() {
		document.addEventListener('keyup', (ev)=>{
			const allowed = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
			if(allowed.indexOf(ev.key) >= 0 ) {
					switch(ev.key) {
					case "ArrowDown":
						this.map.move({y:-KEYBOARD_STEP});
						break;
					case "ArrowLeft":
						this.map.move({x:KEYBOARD_STEP});
						
						break;
					case "ArrowRight":
						this.map.move({x:-KEYBOARD_STEP});
						break;
					case "ArrowUp":
						this.map.move({y:KEYBOARD_STEP});
						break;
					default:
						break;
				}	
			}
		})
	}

	addMouseEvents() {

	}

}

