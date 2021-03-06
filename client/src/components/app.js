import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Match from 'preact-router/match';

// import components
import Nav from './Nav';
import Logo from './Logo';

// import routes
import Home from '../routes/home';
import Profile from '../routes/profile';
import Directions from '../routes/directions';
import Maps from '../routes/maps';
import Account from '../routes/account';
import SignOut from '../routes/signout';
import Settings from '../routes/settings';

// Available screen real state after factoring space for navbar
const AVAIL_PANE_HEIGHT = screen.availHeight * 0.93;

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			navbarHeight: screen.availHeight - AVAIL_PANE_HEIGHT,
			userPosition: null,
			searchResult: null,
			selectedPin: null,
		};

		this.updateSearchResult = this.updateSearchResult.bind(this);
		this.setUserPosition = this.setUserPosition.bind(this);
		this.setSelectedPin = this.setSelectedPin.bind(this);
	}

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	updateSearchResult(placeDetail) {
		this.setState({ searchResult: placeDetail });
	}

	setUserPosition(userPosition) {
		this.setState({ userPosition, });
	}

	setSelectedPin(selectedPin) {
		this.setState({ selectedPin });
	}

	render() {
		return (
			<div id="app">
				<Nav navHeight={this.state.navbarHeight} />
				<Router onChange={this.handleRoute}>
					<Home path="/" paneHeight={AVAIL_PANE_HEIGHT}
						setUserPosition={this.setUserPosition}
						updateSearchResult={this.updateSearchResult} selectedPin={this.setSelectedPin}/>
					<Profile path="/profile/" user="me" setSelectedPin={this.setSelectedPin} />
					<Profile path="/profile/:user" setSelectedPin={this.setSelectedPin} />
					<Account path="/register" paneHeight={AVAIL_PANE_HEIGHT} />
					<Account path="/signin" paneHeight={AVAIL_PANE_HEIGHT} />
					<Account path="/forgot-password" paneHeight={AVAIL_PANE_HEIGHT} />
					<Account path="/reset-password" paneHeight={AVAIL_PANE_HEIGHT} />
					<Settings path="/settings" paneHeight={AVAIL_PANE_HEIGHT} />
					<SignOut path="/signout" />
					<Directions path="/directions" />
					<Maps path="/maps" paneHeight={AVAIL_PANE_HEIGHT}
						userPosition={this.state.userPosition} placeDetail={this.state.searchResult} selectedPin={this.state.selectedPin} />
				</Router>
			</div>
		);
	}
}
