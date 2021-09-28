import React from "react";
import Player from "../components/Player.jsx";

class App extends React.Component {
	constructor() 
	{
		super();
		this.state = {
			numOfPlayers:	0
		};
		this.updateInputValue = this.updateInputValue.bind(this);
		this.setNumOfPlayers = this.setNumOfPlayers.bind(this);
	}
	setNumOfPlayers()
	{
		const player1 = new Player();
		const player2 = new Player();

		if(parseInt(this.state.numOfPlayers) === 1)
		{
			// assign blueCycle to player1
			player1.setPlayerType('human');
			// assign yellowCycle to computer
			player2.setPlayerType('computer');
		}
		if(parseInt(this.state.numOfPlayers) > 1)
		{
			// assign blueCycle to player1
			this.player1.setPlayerType('human');
			// assign yellowCycle to player2
			this.player2.setPlayerType('human');
			// console.log(this);
		}

	}
	updateInputValue(evt) 
	{
		// console.log('updateInputValue',evt.target.value);
		this.setState({
			numOfPlayers: evt.target.value
		});
	}
	render() {
		return (
			<div className="howManyPlayers">
				<h1>
					How Many Players?&nbsp;
					<input type="text" onChange={this.updateInputValue} />&nbsp;
					<button onClick={this.setNumOfPlayers} >Start!</button>
				</h1>
			</div>
		);
	}
}

export default App;
