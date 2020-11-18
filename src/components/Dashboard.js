import React from 'react';

import '../styles/Dashboard.css'
import TransaccionesCard from './TransaccionesCard';

class Dashboard extends React.Component {
	//FONDO
	render() {

		return (
			<div style={{overflowY: 'auto'}} className='fill'>
				<div className='dashboard'>
					<TransaccionesCard className='spendy-card trans-card'></TransaccionesCard>
					<div className='spendy-card estadistica-card'>
						
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;