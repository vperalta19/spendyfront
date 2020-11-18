import React from 'react';
import GlobalContextProvider, { GlobalContext } from './controllers/Context';
import	{BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Landing from './pages/LandingPage';
import InicioSesion from './pages/InicioSesion';
import Movimientos from './pages/Movimientos';
import Estadisticas from './pages/Estadisticas';
import SeleccionarFondo from './pages/SeleccionarFondo';
import LimitesYObjetivos from './pages/LimitesYObjetivos';
import Registro from './pages/Registro';

import prueba from './components/Moneda';

import './styles/App.css';
import './styles/Categorias.css';

export class App extends React.Component {
	static contextType = GlobalContext;

	render() {
		return (
			<GlobalContextProvider>
				<Router>
					<div className="fill App">
						<Switch>
							<Route path='/' exact component={Landing} />
							<Route path='/InicioSesion' component={InicioSesion} />
							<Route path='/Registro' component={Registro} />
							<Route path='/Movimientos' component={Movimientos} />
							<Route path='/Estadisticas' component={Estadisticas} />
							<Route path='/Fondos' component={SeleccionarFondo} />
							<Route path='/Limites' component={LimitesYObjetivos} />
							<Route path='/Prueba' component={prueba} />
						</Switch>
					</div>
				</Router>
			</GlobalContextProvider>
		);
	}
}

export function copyToClipboard(str) { 
	const el = document.createElement('textarea');
	el.value = str; el.setAttribute('readonly', '');
	el.style.position = 'absolute'; el.style.left = '-9999px';
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
};
