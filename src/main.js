import MapView from './MapView';
import TestRandomDataProvider from './TestRandomDataProvider2';
import DatDataProvider from './DatDataProvider';

//this should render the parcels

//var provider = new DatDataProvider();
var provider = new TestRandomDataProvider()
var map = new MapView({
	dataProvider: provider,
	parcelLength: 500
})

map.on('content-area-click', (ev) =>{
	//create note at point
	console.log('click')
})
