import React from 'react';
import NavBar from '../components/NavBar';

import LimitesCard, { CrearLimite } from '../components/LimitesCard';
import ObjetivosCard, { CrearObjetivo } from '../components/ObjetivosCard';
import BotonFlotante from '../components/BotonFlotanteLyO';

import "../styles/LimitesYObjetivos.css"
import "../styles/Dashboard.css"
import Popup from 'reactjs-popup';

export default class LimitesYObjetivos extends React.Component {

	constructor() {
		super();
		this.state = {
			crearObjetivoOpen: false, 
			crearLimiteOpen: false, 
		}
	}

	openLimiteFn() {
		this.setState({ crearLimiteOpen: true });
	}
	closeLimiteFn() {
		this.setState({ crearLimiteOpen: false });
	}
	openObjetivoFn() {
		this.setState({ crearObjetivoOpen: true });
	}
	closeObjetivoFn() {
		this.setState({ crearObjetivoOpen: false });
	}

	render() {
		return (
			<div className='fill limites-objetivos'>
				<NavBar></NavBar>
				<div className='dashboard fill'>
					<LimitesCard className='spendy-card limites-card'></LimitesCard>
					<ObjetivosCard className='spendy-card objetivos-card'></ObjetivosCard>
				</div>
				<BotonFlotante className='floating-button' openLimiteFn={()=>{this.openLimiteFn()}} openObjetivoFn={()=>{this.openObjetivoFn()}}/>
				<Popup open={this.state.crearLimiteOpen} className='crear-limite-popup' onClose={()=>{this.closeLimiteFn()}}>
					<CrearLimite closeFn={()=>{this.closeLimiteFn()}}/>
				</Popup>
				<Popup open={this.state.crearObjetivoOpen} className='crear-objetivo-popup' onClose={()=>{this.closeObjetivoFn()}}>
					<CrearObjetivo/>
				</Popup>
			</div>
		);
	}
}