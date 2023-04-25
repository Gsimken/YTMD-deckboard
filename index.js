/**
 * @author Gary Simken <https://github.com/Gsimken>
 */

const {
	Extension,
	log,
	INPUT_METHOD,
	PLATFORMS,
	
} = require('deckboard-kit');
const fetch = require('node-fetch');


class YoutubeMusicDesktopExtension extends Extension {
	constructor(props) {
		super(props);
		this.dialog=props.dialog;
		this.setValue=props.setValue;
		this.name = 'Youtube Music Desktop App';
		this.platforms = [PLATFORMS.WINDOWS, PLATFORMS.MAC];
		this.code = ""
		this.url = "http://localhost:9863"
		this.inputs = [
			{
				label: 'Track Play/Pause',
				value: 'track-play-pause',
				icon: 'play',
				color: '#FF0000',
			},
			{
				label: 'Track next',
				value: 'track-next',
				icon: 'step-forward',
				color: '#FF0000',
			},
			{
				label: 'Track previous',
				value: 'track-previous',
				icon: 'step-backward',
				color: '#FF0000',
			},
			{
				label: 'Volume up',
				value: 'player-volume-up',
				icon: 'volume-up',
				color: '#FF0000',
			},
			{
				label: 'Volume down',
				value: 'player-volume-down',
				icon: 'volume-down',
				color: '#FF0000',
			},
		];
		this.configs = {
			urlRemoteControl: {
				type: "text",
				name: "Remote control url:",
				description: "Put the URL from remote server [Default: http://localhost:9863 ]",
				value:  "http://localhost:9863"

			},
			codeRemoteControl: {
				type: "text",
				name: "Remote control password: ",
				description: "Put code of Remote control server here [Settings->Integration->Remote control(ON)->Protect remote control with paswword (on)]",
				value: ""
			}
		};
		this.initExtension();
	}

	initExtension(){
		this.code= this.configs.codeRemoteControl.value
		this.url = this.configs.urlRemoteControl.value
	}
	// make a post query to server ytmd
	async postQuery(command){
		
		let value=true //maybe in a future can be upgrade to new actions 
		let apiUrl = this.url
		let code= this.code
		if (apiUrl===null || apiUrl===""){apiUrl = "http://localhost:9863"}
		const url= `${apiUrl}/query`;
		const data=JSON.stringify({
			command,
			value,
			});
		try{
			
			const response =  await fetch(url, {
				method: 'post',
				headers: {
				"Content-Type": "text/plain",
				Authorization: `Code ${code}`,
				},
				body: data
			});
			

		}catch(error){
			log(error)
		}
		
	}
	// Executes when the extensions loaded every time the app start.
	execute(action, args) {
		switch (action) {
			case 'track-play-pause':
				this.postQuery(action)
				break;
			case 'track-next':
				this.postQuery(action)
				break;
			case 'track-previous':
				this.postQuery(action)
				break;
			case 'player-volume-up':
				 this.postQuery(action)
				break;
			case 'player-volume-down':
				 this.postQuery(action)
				break;
			default:
				break;
		}
	};
}

module.exports = sendData => new YoutubeMusicDesktopExtension(sendData);
