import MapView from './MapView';
import TestRandomDataProvider from './TestRandomDataProvider2';


//this should render the parcels
new MapView({
	dataProvider: new TestRandomDataProvider(),
	parcelLength: 500
})