import { LitElement, css, html } from "./node_modules/lit-element/lit-element.js";
import "./node_modules/@polymer/iron-ajax/iron-ajax.js";
import './node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import './node_modules/@polymer/paper-item/paper-item.js';
import './node_modules/@polymer/paper-input/paper-input.js';
import './node_modules/@polymer/paper-listbox/paper-listbox.js';

class YorkAwardSearch extends LitElement {
	static get properties() {
		return {
			awards:{
				type:Array
			},
			show_list:{
				type:Array
			},
			timing:{
				type:String
			},
			award_id:{
				type:Number
			}
		};
	}
	
	constructor() {
		super();
		this.show_list = [];
		
		const urlParams = new URLSearchParams(window.location.search);
		if(urlParams.get('awardID')){
			this.award_id = urlParams.get('awardID');
		}
	}
	
	attributeChangedCallback(name, oldValue, newValue){
		super.attributeChangedCallback(name, oldValue, newValue);
	}
	
	static get styles(){
		return css`
			.award-search-control{
				display:flex;
			}
			
				@media(max-width: 991px){
					.award-search-control{
						flex-direction:column;
					}
				}
		
			paper-dropdown-menu{
				flex:1;
				margin-right:16px;
			}
			
			.award-search-control paper-button{
				align-self:center;
			}
			
			.award-search-display{
				padding:0 36px;
			}
			
			.award-search-display h2 span{
				color:#e31837;
			}
			
			.award-search-award{
				padding:36px 0;
				position:relative;
			}
			
			.award-search-award + .award-search-award:before{
				content:'';
				width:60%;
				top:0;
				border-top:1px solid #666;
				position:absolute;
				left:20%;
			}
			
			.award-search-award h3{
				color:#e31837;
			}
			
			.award-search-award .award-search-award-type{
				text-transform:uppercase;
				margin-bottom:8px;
				display:inline-block;
			}
			
			paper-input{
				width:100%;
			}
		`;
	}
	
	resetForm(){
		this.shadowRoot.getElementById('status_in_canada').selected = undefined;
		this.shadowRoot.getElementById('faculty').selected = undefined;
		this.shadowRoot.getElementById('type_of_awards').selected = undefined;
		this.shadowRoot.getElementById('timing_in_canada').selected = undefined;
		this.award_id = undefined;
		
		this.executeSearch();
	}
	
	loadAll(response){
		this.awards = response.detail.response;
		this.executeSearch();
	}
	
	executeSearch(){
		if(!this.awards){
			return;
		}
		
		let status = 		this.shadowRoot.getElementById('status_in_canada').selected === '-' ? undefined : this.shadowRoot.getElementById('status_in_canada').selected;
		let faculty = 		this.shadowRoot.getElementById('faculty').selected === '-' ? undefined : this.shadowRoot.getElementById('faculty').selected;
		let type_of_awards = this.shadowRoot.getElementById('type_of_awards').selected === '-' ? undefined : this.shadowRoot.getElementById('type_of_awards').selected;
		let timing = 		this.shadowRoot.getElementById('timing_in_canada').selected === '-' ? undefined : this.shadowRoot.getElementById('timing_in_canada').selected;
		
		let keyword = 		this.shadowRoot.getElementById('filter_keyword').value.trim().toUpperCase();
		
		this.show_list.splice(0, this.show_list.length);
		
		if(!status && !faculty && !type_of_awards && !timing && !this.award_id && !keyword){
			this.requestUpdate();
		}
		else{
			for(let i = 0; i < this.awards.length; i++){
				let award = this.awards[i];
				
				if(typeof status !== 'undefined' && status !== award.status_in_canada){
					continue;
				}
				
				if(typeof faculty !== 'undefined' && award.faculties.indexOf(faculty) === -1){
					continue;
				}
				
				if(typeof type_of_awards !== 'undefined' && award.type_search.indexOf(type_of_awards) === -1){
					continue;
				}
				
				if(typeof timing !== 'undefined' && award.timing_search.indexOf(timing) === -1){
					continue;
				}
				
				if(typeof this.award_id !== 'undefined' && award.id !== this.award_id){
					continue;
				}
				
				if(typeof keyword !== 'undefined' && keyword !== '' && award.name.toUpperCase().indexOf(keyword) === -1){
					continue;
				}
				
				this.show_list.push(i);
			}
			
			this.requestUpdate();
		}
	}
	
	render() {
		return html`
			<iron-ajax id="loadAll" auto url="https://currentstudents.yorku.ca/ajax/award-search/all" handle-as="json" @response="${this.loadAll}"></iron-ajax>
		
			<link rel="stylesheet" href="https://currentstudents.yorku.ca/themes/custom/york/css/styles.css">
			<link rel="stylesheet" href="https://currentstudents.yorku.ca/themes/custom/york/css/york_styles.css">
			<link rel="stylesheet" href="https://currentstudents.yorku.ca/themes/custom/york/css/styles.2020.css">
			<link rel="stylesheet" href="https://currentstudents.yorku.ca/themes/custom/york/css/styles.2020wp.css">
			
			<div class="award-search-introduction">
				<p>This tool lets you view awards, scholarships, prizes and bursaries offered at York University. Take a few moments to search for awards you may be eligible for: you can search by Faculty, award type, activity level or type in the name of an award that you may be familiar with. Unless otherwise stated, all full-time, part-time and mature students are eligible for all the awards in the system so long as they meet the published criteria.</p>
				
				<p>For additional graduate awards, visit the <a href="https://gradstudies.yorku.ca/current-students/student-finances/funding-awards">York Financial Assistance</a> section of the Faculty of Graduate Studies website. You can also see <a href="https://sfs.yorku.ca/scholarships/external">a listing of external awards</a> elsewhere on this site.</p>
				
				<p>Note: All awards listed on this website are subject to change or cancellation without notice.</p>
			</div>
			
			<hr class="my-5" />
			
			<div class="wp-block-group border-lg border-primary p-4 window-frame mt-4 mb-5">
				<div>
					<h2 class="h5">Answer any of the following four questions to start searching for awards:</h2>
				
					<div class="award-search-control wp-block-group__inner-container">			
						<paper-dropdown-menu label="Your Status in Canada">
							<paper-listbox slot="dropdown-content" id="status_in_canada" attr-for-selected="value" @selected-changed="${this.executeSearch}">
								<paper-item value="-">(None selected)</paper-item>
								<paper-item value="Domestic Student">Domestic Student</paper-item>
								<paper-item value="International Student">International Student</paper-item>
								<paper-item value="Conventional Refugee">Conventional Refugee</paper-item>
							</paper-listbox>
						</paper-dropdown-menu>
						
						<paper-dropdown-menu label="Awards for Faculty">
							<paper-listbox slot="dropdown-content" id="faculty" attr-for-selected="value" @selected-changed="${this.executeSearch}">
								<paper-item value="-">(None selected)</paper-item>
								<paper-item value="FA">School of the Arts, Media, Performance & Design</paper-item>
								<paper-item value="ED">Faculty of Education</paper-item>
								<paper-item value="EU">Faculty of Environmental & Urban Change</paper-item>
								<paper-item value="GL">Glendon</paper-item>
								<paper-item value="HH">Faculty of Health</paper-item>
								<paper-item value="LE">Lassonde School of Engineering</paper-item>
								<paper-item value="AP">Liberal Arts & Professional Studies</paper-item>
								<paper-item value="LW">Osgoode Hall Law School</paper-item>
								<paper-item value="SB">Schulich School of Business</paper-item>
								<paper-item value="SC">Faculty of Science</paper-item>
								<paper-item value="GS">Faculty of Graduate Studies</paper-item>
							</paper-listbox>
						</paper-dropdown-menu>
						
						<paper-dropdown-menu label="Type of Awards">
							<paper-listbox slot="dropdown-content" id="type_of_awards" attr-for-selected="value" @selected-changed="${this.executeSearch}">
								<paper-item value="-">(None selected)</paper-item>
								<paper-item value="award">Awards</paper-item>
								<paper-item value="bursary">Bursaries</paper-item>
								<paper-item value="fellowship">Fellowship</paper-item>
								<paper-item value="medal">Medal</paper-item>
								<paper-item value="prize">Prize</paper-item>
								<paper-item value="scholarship">Scholarships</paper-item>
								<paper-item value="other">Other</paper-item>
							</paper-listbox>
						</paper-dropdown-menu>
						
						<paper-dropdown-menu label="Timing of Award">
							<paper-listbox slot="dropdown-content" id="timing_in_canada" attr-for-selected="value" @selected-changed="${this.executeSearch}">
								<paper-item value="-">(None selected)</paper-item>
								<paper-item value="entrance">At Entrance</paper-item>
								<paper-item value="attending-fall">While Attending (Fall Term)</paper-item>
								<paper-item value="attending-winter">While Attending (Winter Term)</paper-item>
								<paper-item value="attending-summer">While Attending (Summer Term)</paper-item>
								<paper-item value="convocation">At Convocation</paper-item>
							</paper-listbox>
						</paper-dropdown-menu>
						
						<paper-button @click="${this.resetForm}">Reset</paper-button>
					</div>
				</div>
				<div class="mt-5">
					<h2 class="h5">Or filter by award name:</h2>
					<paper-input id="filter_keyword" @keyup="${this.executeSearch}" label="Enter keyword to filter by award name"></paper-input>
				</div>
			</div>
			
			<div class="award-search-display">
				${this.show_list.length > 0 ? html`<h2 class="h5">We found <span>${this.show_list.length}</span> award(s):</h2>` : ``}
				${this.show_list.map(i => html`
					<div class="award-search-award">
						<span class="award-search-award-type">${this.awards[i].type}</span>
						<h3>${this.awards[i].name}</h3>
						<div>
							<ul>
								<li><strong>Value:</strong> ${this.awards[i].value}</li>
								<li><strong>Number of Awards:</strong> ${this.awards[i].number} </li>
							</ul>
						</div>
						<div>
							<h4>Description</h4>
							<p>${this.awards[i].description}</p>
						</div>
						<div>
							<h4>Process</h4>
							<p>${this.awards[i].process}</p>
						</div>
					</div>
				`)}
			</div>
		`;
	}
}

customElements.define('york-award-search', YorkAwardSearch);