import React from 'react';
import TransaccionesController from './TransaccionesController';
import CategoriasController from './CategoriasController';
import FondosController from './FondosController';
import EstadisticasController from './EstadisticasController';
import UsuariosController from './UsuariosController';
import LimitesYObjetivosController from './LimitesYObjetivosController';

const globalState = {
	FondosController: new FondosController(),
	CategoriasController: new CategoriasController(),
	TransaccionesController: new TransaccionesController(),
	UsuariosController: new UsuariosController(),
	EstadisticasController: new EstadisticasController(),
	LimitesYObjetivosController: new LimitesYObjetivosController()
};

export const GlobalContext = React.createContext(globalState);
const GlobalContextProvider = (props) => {
	return (
		<GlobalContext.Provider value={globalState}>
			{props.children}
		</GlobalContext.Provider>
	);
};
export default GlobalContextProvider;
