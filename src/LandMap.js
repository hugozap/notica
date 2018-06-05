/*
  Componente LandMap encargado de mostrar las parcelas 
  y la navegación entre ellas

  Las parcelas se representan en un objeto así:
  ABC
  DEF
  GHI

  Cuando hay movimientos se calcula lat,lon para cada
  una de las posiciones del objeto.

*/

import EventEmitter from 'events'
import {Point} from './utils'


const defaultOpts = {
	parcelLength: 200,
	offset: new Point(0,0)
}

//relations between parcels (useful to recalculate)
const REF_MAP ={
			A:{lat:-1, lon:-1},
			B:{lat: 0, lon:-1},
			C:{lat: 1, lon:-1},
			D:{lat:-1, lon: 0},
			E:{lat: 0 ,lon: 0},
			F:{lat: 1, lon: 0},
			G:{lat:-1, lon: 1},
			H:{lat: 0, lon: 1},
			I:{lat: 1, lon: 1}
		}

class LandMap extends EventEmitter {

	constructor(opts = defaultOpts) {
		super();
		this.parcelLength = opts.parcelLength;
		//Active parcels
		this.parcelMap = {
			A:{lat:-1, lon:-1},
			B:{lat: 0, lon:-1},
			C:{lat: 1, lon:-1},
			D:{lat:-1, lon: 0},
			E:{lat: 0 ,lon: 0},
			F:{lat: 1, lon: 0},
			G:{lat:-1, lon: 1},
			H:{lat: 0, lon: 1},
			I:{lat: 1, lon: 1},
		}
		this.offset = opts.offset
	}

	getActiveParcels() {
		return this.parcelMap;
	}

	move({x=0,y=0}) {
		this.offset = this.offset.add({x,y})
		this.emit('offsetchanged', this.offset);
		this.recalculatePosition(this.offset);
	}

	//Returns 2 points (top,left) and (bottom,right)
	//encompassing the total area (the 9 parcels)
	getArea() {
		const from = {
			x: this.parcelMap['A'].lat,
			y: this.parcelMap['A'].lon,
		}

		const to = {
			x: this.parcelMap['I'].lat + 1,
			y: this.parcelMap['I'].lon + 1,
		}
		return [new Point(from.x, from.y), new Point(to.x, to.y)]
	}

	recalculatePosition(offset) {

		const nextLat = Math.floor(offset.x / (this.parcelLength - 1));
		const nextLon = Math.floor(offset.y / (this.parcelLength - 1));
		//calculate the new map
		const newParcelMap = {}
		//Use the reference map to calculate the lat, lon
		//based on the value of E (the center parcel)
		const centerParcel = {
			lat:nextLat,
			lon:nextLon
		}

		//save the previous values of 'A' to detect if
		//the map changed
		const prevStart = {...this.parcelMap['A']}

		Object.keys(this.parcelMap).forEach((id)=>{
			newParcelMap[id] =  {
				lat: centerParcel.lat + REF_MAP[id].lat,
				lon: centerParcel.lon + REF_MAP[id].lon,
			}
		})

		const newStart = {...newParcelMap['A']}
		if(prevStart.lat != newStart.lat || prevStart.lon != newStart.lon) {
			//the start parcel 'A' changed, so all the map changed
			this.parcelMap = newParcelMap;
			//the area to monitor changed
			let newArea = this.getArea()
			this.emit('areachanged', newArea[0], newArea[1] );
		}


	}


}

export {REF_MAP};
export default LandMap;