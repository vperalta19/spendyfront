import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Categoria from '../classes/Categoria';

export default class Categorias extends React.Component {

	constructor() {
		super();
		this.state = {
			selectedCat: null
		}
	}

	createCategoriaList(categoriaList) {
		return categoriaList.map(
			(categoria) => {
				const selName = this.state.selectedCat ? this.state.selectedCat.name : '####';
				return (
					<div 
					style={{backgroundColor: categoria.name === selName? categoria.color : 'white'}}
					className={'categoria-item ' + (categoria.name === selName? 'selected' : '')}
					onClick={() => {this.selectCategory(categoria)}}>
						<div className='organizer'>
							<div className='icon-container'>
								<FontAwesomeIcon color={categoria.name === selName? 'white' : categoria.color} className='icon' icon={categoria.iconName} size='2x'/>
							</div>
							<div style={{color: categoria.name === selName? 'white' : categoria.color}} className='texto'><span style={{"white-space": nowrap}}>{categoria.name}</span></div>
						</div>
					</div>
				);
			}
		)
	}

	selectCategory(categoria) {
		this.setState({selectedCat: categoria});
	}

	render() {
		const supermercado = new Categoria("Supermercado", "shopping-cart", "#F8C29E");
		const mascotas = new Categoria("Mascotas", "paw", "#D6976D");
		const otros = new Categoria("Otros", "question", "#B4BCC2");
		const sueldo = new Categoria("Sueldo", "hand-holding-usd", "#98ECDE");

		const categoriasGastos = [supermercado, mascotas, otros, sueldo, supermercado, mascotas, otros, sueldo, supermercado, otros, sueldo, supermercado, otros, sueldo, supermercado ];
		const categoriasIngresos = [supermercado, mascotas, otros, sueldo];

		const valuePortion = 
			this.state.selectedCat == null ?
			(
				<div></div>
			) :
			(
			<Fragment>
				<div style={{backgroundColor: this.state.selectedCat.color}} className='titulo'>
					<div className='icon'>
						<FontAwesomeIcon icon={this.state.selectedCat.iconName} size='3x'/>
					</div>
					<div className='text'>
						{this.state.selectedCat.name}
					</div>	
				</div>
				<div className='content'>

				</div>
				<div className='buttons'>
					<button className='button-p'>Confirmar Cambios</button>
					<button className='button-s'>Eliminar</button>
				</div>
			</Fragment>
			);

		return (
			<div className='categorias-container floating-container'>
				<div className='categotrias-list'>
					<div>Gastos</div>
					<div className='gastos-list'>
						{this.createCategoriaList(categoriasGastos)}
					</div>
					<div>Ingresos</div>
					<div className='ingresos-list'>
						{this.createCategoriaList(categoriasIngresos)}
					</div>
				</div>
				<div className='separator'></div>
				<div className='categoria-value'>
					{valuePortion}
				</div>
			</div>
		);
	}
}