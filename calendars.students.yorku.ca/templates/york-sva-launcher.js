import { LitElement, css, html } from "./node_modules/lit-element/lit-element.js";

import "./node_modules/@polymer/paper-toast/paper-toast.js";

class YorkSVALauncher extends LitElement {
	static get properties() {
		return {
			isFrench:{
				type:Boolean
			},
			current:{
				type:Boolean
			},
			osgoode:{
				type:Boolean
			},
			schulich:{
				type:Boolean
			},
			id:{
				type:Number
			},
			link:{
				type:String
			}
		};
	}

	constructor() {
		super();

		let host = this;

		localStorage.setItem('bilingual-toggle', (localStorage.getItem('bilingual-toggle') || "english"));
		this.isFrench = (localStorage.getItem('bilingual-toggle') == 'french' ? true : false);

		document.addEventListener('bilingual-toggle', function(event){
			host.isFrench = (localStorage.getItem('bilingual-toggle') == 'french' ? true : false);
		});


			let doorCode = host.id || null;
			if(host.current){
				doorCode = 3;
			}
			else if(host.osgoode){
				doorCode = 4;
			}
			else if(host.schulich){
				doorCode = 5;
			}
			host.link = "https://svaapp.uit.yorku.ca/web/" + (host.isFrench ? 'fr' : 'en') + (doorCode ? '?lp=' + doorCode : '');
		this.addEventListener('click', function(){
			if(typeof ga !== 'undefined'){
				ga('create', 'UA-54028600-1', {'name':'main'});
				ga('main.send','event','sva-launcher-' + (host.isFrench ? 'fr' : 'en'),'clicked', window.location);
				ga('main.send','event',window.location.host,'SAVY ' + (host.isFrench ? 'French' : 'English'));
			}
			window.open("https://svaapp.uit.yorku.ca/web/" + (host.isFrench ? 'fr' : 'en') + (doorCode ? '?lp=' + doorCode : ''), "MsgWindow", "width=350,height=950");
		})
	}

	static get styles(){
		return css`
			paper-toast {
				cursor:pointer;
				position:relative;
				padding:8px;
				background-color:transparent;
				color:white;
				box-shadow:none;
				display:flex;
				flex-direction:column;
				align-items:center;
				margin-right:30px;
				height:65px;
			}

			paper-toast > *{

			}

			paper-toast > a img{
				width:250px;
				max-width:250px;
			}

			paper-toast > img:focus {
				outline: 1px dotted red;
			}
		`;
	}

	render(){
		return html`
			<paper-toast horizontal-align="right" opened duration="0">
				<a href="${this.link}" tabindex="0" target="MsgWindow" width="350" height="950" area-label="Link to modal Passport York">
					<img src="/sites/default/files/images/savy-${this.isFrench ? 'fr' : 'en'}.svg" alt="Student Virtual Assistant (beta) Avatar">
				</a>
			</paper-toast>
		`;
	}
}

customElements.define('york-sva-launcher', YorkSVALauncher);
