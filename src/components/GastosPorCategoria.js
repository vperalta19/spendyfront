import React from 'react';
import { GlobalContext } from '../controllers/Context';
import ReactEcharts from 'echarts-for-react';

import '../styles/GastosPorCategoria.css';
import Categoria from '../classes/Categoria';

export default class GastosPorCategoria extends React.Component {
	static contextType = GlobalContext;

	constructor() {
		super();

		this._inicio = new Date();
		this._fin = new Date();

		this.state = {
			option: 'day',
			data: []
		}
	}
	
	async componentDidMount() {
		this.updateData();
	}

	async updateData() {
		const fondo = this.context.FondosController.getSelected();
		const gastos = await this.context.EstadisticasController.getGastosPorCategoria(fondo.id, this._inicio, this._fin, 'pesos', this.context);

		this.setState({
			data: gastos
		});
	}

	getDay() {
		this.setState({
			option: 'day'
		});

		this._inicio = new Date();
		this._fin = new Date();

		this.updateData().then( () => { this.render(); });
	}

	getWeek() {
		this.setState({
			option: 'week'
		});

		this._inicio = new Date();
		this._inicio.setDate(this._inicio.getDate() - 7);
		this._fin = new Date();

		this.updateData();
	}

	getMonth() {
		this.setState({
			option: 'month'
		});

		this._inicio = new Date();
		this._inicio.setMonth(this._inicio.getMonth() - 1);
		this._fin = new Date();
		
		this.updateData();
	}

	getYear() {
		this.setState({
			option: 'year'
		});

		this._inicio = new Date();
		this._inicio.setFullYear(this._inicio.getFullYear() - 1);
		this._fin = new Date();
		
		this.updateData();
	}

	getCustom() {
		this.setState({
			option: 'custom'
		});
	}

	render() {
		return (
			<div className='gxc'>
				<div className='header noselect'>
					<div
						className={'option ' + (this.state.option === 'day' ? 'selected' : '')}
						onClick={() => { this.getDay(); }}>dia</div>
					<div
						className={'option ' + (this.state.option === 'week' ? 'selected' : '')}
						onClick={() => { this.getWeek(); }}>semana</div>
					<div
						className={'option ' + (this.state.option === 'month' ? 'selected' : '')}
						onClick={() => { this.getMonth(); }}>mes</div>
					<div
						className={'option ' + (this.state.option === 'year' ? 'selected' : '')}
						onClick={() => { this.getYear(); }}>año</div>
					{/* <div
						className={'option ' + (this.state.option === 'custom' ? 'selected' : '')}
						onClick={() => { this.getCustom(); }}>personalizado</div> */}
				</div>
				<div className='body'>
					{
						this.state.option !== 'custom' ? (
							<div>
								<ReactEcharts
									option={{
										legend: {
											type: 'scroll',
											orient: 'vertical',
											left: 10,
											top: 20,
											bottom: 20,
											data: this.state.data.map(
												(g) => {
													return g.categoria.nombre;
												}
											),
										},
										color: this.state.data.map(
											(g) => {
												return g.categoria.color;
											}
										),
										series: [{ 
											name: 'gastos',
											type: 'pie',
											center: ['60%', '50%'],
											data: this.state.data.map(
												(g) => {
													return {
														name: g.categoria.nombre,
														value: Math.abs(g.monto)
													};
												}
											)
										}]
									}}/>
							</div>
						)
						:
						(
							<div>
								Custom
							</div>
						)
					}
				</div>
			</div>
		);
	}
}