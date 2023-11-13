import { LitElement, html } from "./node_modules/lit-element/lit-element.js";

class YorkVSGBanner extends LitElement {
	static get properties() {
		return {
			imageURL:	{
				type:String,
				attribute:'image-url'
			},	
			swoosh:{
				type:String
			},
			swoosh_derivative:{
				type:String
			},
			vertical:{
				type:Boolean
			},
			verticalCompact:{
				type:Boolean,
				attribute:'vertical-compact'
			},
			breakpoint: {
				type:String
			},
			root: {
				type:String
			},
			focus: {
				type:String
			},
			pattern:{
				type:String
			},
			tall:{
				type:Boolean
			},
			swooshAvailable:{
				type:Boolean
			},
			norepeat:{
				type:Boolean
			}
		};
	}
	
	constructor() {
		super();
		
		//this.root = 'https://secure.students.yorku.ca/sites/all/themes/york/vsg/';
		this.root = '/themes/custom/york/vsg/';
		
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.crossOrigin = 'anonymous';
		link.href = this.root + 'vsg.css';
		document.head.appendChild(link);
		
		this.imageURL = null;
		this.vertical = false;
		this.verticalCompact = false;
		
		this.breakpoint = 	'(max-width: 700px)';
		this.norepeat = 	true;
		
		var host = this;
		var mediaQuery = window.matchMedia(this.breakpoint);
		
		this.swooshAvailable = !(host.swoosh == 'None' || host.swoosh == null || host.swoosh == undefined);
		
		host.vertical = mediaQuery.matches;
		host.swoosh_derivative = host.swoosh + (host.vertical ? '' : '-v');
		
		mediaQuery.addListener(function(event){
			host.vertical = event.matches;
			host.swoosh_derivative = host.swoosh + (host.vertical ? '' : '-v');
		});
		
		this.focus = '50% 50%';
	}
	
	attributeChangedCallback(name, oldValue, newValue){
		super.attributeChangedCallback(name, oldValue, newValue);
		
		this.swooshAvailable = !(this.swoosh == 'None' || this.swoosh == null || this.swoosh == undefined);
		this.swoosh_derivative = this.swoosh + (this.vertical ? '' : '-v');
		
		if(name == 'pattern'){
			this.pattern = this.root + 'patterns/' + this.pattern + '.svg';
			this.norepeat = false;
		}
	}
	
	render() {
		var urlExists = this.querySelectorAll('div[slot="url"]').length > 0;
		
		return html`
			<style>
				img.wordmark{
					display:block;
					margin-top:-34px;
					margin-bottom:25px;
					width:200px;
				}
			
				slot[name="main-heading"],
				slot[name="sub-heading"]{
					font-family:'Interstate BlackCondensed';
				}
				
				slot[name="main-heading"]{
					font-size:2.5em;
					text-transform:uppercase;
					display:inline-block;
					line-height:1.1;
					margin-bottom:10px;
				}
				
				slot[name="sub-heading"]{
					font-size:1.5em;
					text-transform:uppercase;
				}	
				
				slot[name="body"]{
					display:block;
					font-size:1.2em;
					font-family:'Interstate LightCondensed';
					margin:10px 0;
				}
				
				slot[name="url"]{
					font-size:1.5em;
					font-family:'Interstate BoldCondensed';
					display:${urlExists ? html`inline-block` : html`none`};
					color:#FFF;
					background-color:#e31837;
					margin:25px 0 0 -50px;
					border-top-right-radius:25px;
					border-bottom-right-radius:25px;
					line-height:1.1;	
					padding:15px 50px 15px 50px;				
				}				
				
				#root{
					position:relative;
					overflow:hidden;
					display:flex;
					font-size:16px;
					flex-direction:row;
					line-height:normal;
					height:100%;
				}
				
				#root[vertical="true"]{
					flex-direction:column;
				}				
				
				#content{
					flex:40;
					position:relative;
					z-index:2;
					padding:35px 25px 10px 25px;
					background-color:#FFF;
				}
				
				#root[tall="true"] #content{
					padding:70px 25px 70px 35px;
				}
				
				#root[vertical="true"] #content{
					padding:25px;
				}
				
				#root[vertical="true"] #content slot[name="url"]{
					font-family:'Interstate LightCondensed';					
					font-size:1.25em;
					margin:10px 0 0 -25px;
					padding-left:25px;
					padding-right:25px;				
				}											
				
				#decoration{
					flex:60;
					background-image:url(${this.imageURL||this.pattern});
					background-size:${this.imageURL ? `cover` : `300%`};
					background-position:${this.focus};
					${this.norepeat ? `background-repeat:no-repeat` : ``};
					position:relative;
				}
				
				#root[vertical="true"][vertical-compact="true"] #decoration{
					display:none;
				}
				
				#root[vertical="true"] #decoration{
					min-height:300px;
				}				
				
				#decoration:before{
					${this.swooshAvailable ? 
						`background-image:url(${this.root}swoops/${this.swoosh_derivative}.svg);`: ``}
					content:' ';
					position:absolute;
					top:-2px;
					left:-2px;
					width:100%;
					height:101%;
					background-repeat:no-repeat;
					background-position:100%;
					transform:scaleX(-1);
				}
				
				#root[vertical="true"] #decoration:before{
					transform:scaleX(1);
					background-position:0 0;
					top:-3px;
					left:0;
					width:101%;
					height:100%;
				}					
			</style>
			
			<div id="root" vertical="${this.vertical}" vertical-compact="${this.verticalCompact}" tall="${this.tall}">
				<div id="content">
					<slot name="main-heading"></slot>
					<slot name="sub-heading"></slot>
					<slot name="body"></slot>
					<slot name="url"></slot>
				</div>
				<div id="decoration">
				</div>
			</div>
		`;
	}
}

customElements.define('york-vsg-banner', YorkVSGBanner);