import {createStore} from 'redux';
import Root_Reducer from './../redux_reducer/Root_Reducer';

const Store = createStore(Root_Reducer);

export default Store;