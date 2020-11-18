import React from 'react';
import TransaccionesCard from '../components/TransaccionesCard';
import NavBar from '../components/NavBar';

import "../styles/Movimientos.css"
import "../styles/Dashboard.css"

class Movimientos extends React.Component {

	render() {
		return (
			<div className='fill movimientos'>
				<NavBar></NavBar>
				<div className='dashboard fill'>
					<TransaccionesCard className='spendy-card trans-card'></TransaccionesCard>
				</div>
			</div>
		);
	}
}

export default Movimientos;