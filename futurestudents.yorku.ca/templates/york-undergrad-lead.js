import { LitElement, html } from "./node_modules/lit-element/lit-element.js";
import { unsafeHTML } from "./node_modules/lit-html/directives/unsafe-html.js";

import "./node_modules/@polymer/iron-form/iron-form.js";
import "./node_modules/@polymer/iron-ajax/iron-ajax.js";
import "./node_modules/@polymer/paper-input/paper-input.js";
import "./node_modules/@polymer/paper-dropdown-menu/paper-dropdown-menu.js";
import "./node_modules/@polymer/paper-listbox/paper-listbox.js";
import "./node_modules/@polymer/paper-item/paper-item.js";
import "./node_modules/@polymer/paper-checkbox/paper-checkbox.js";
import "./node_modules/@polymer/paper-button/paper-button.js";
import "./node_modules/@webcomponents/paper-dropdown/paper-dropdown.js";

class YorkUndergradLeadv2 extends LitElement {
	static get properties() {
		return {
			header:{
				type:String
			},
			header_size:{
				type:String
			},
			blurb:{
				type:String
			},
			submitted_header:{
				type:String
			},
			submitted_blurb:{
				type:String
			},			
			topic:{
				type:String
			},
			marketing_tag:{
				type:String
			},
			cohort:{
				type:String
			},
			medium:{
				type:String
			},
			submitted:{
				type:Boolean
			},
			one_column:{
				type:Boolean
			},
			one_column_forced:{
				type:Boolean
			},	
			infocard:{
				type:String
			},
			path:{
				type:String
			},
			cluster:{
				type:Number
			},
			pdf:{
				type:String
			},
			formStorage:{
				type:Object
			},
			white:{
				type:Boolean
			},
			recruiter:{
				type:String
			},
			phoneNumberPopulated:{
				type:Boolean
			},
			faculty:{
				type:String
			},
			campus:{
				type:String
			},
			set_markham:{
				type:Boolean
			},
			i_am:{
				type:Boolean
			},
			show_phone:{
				type:Boolean
			},
			clusterset:{
				type:String
			},
			grad:{
				type:Boolean
			},
			is_french:{
				type:Boolean
			},
			faculty_program:{
				type:String
			},
			faculty_program_programs:{
				type:Object
			},
			show_area_of_interest:{
				type:Boolean
			},
			get_academic_history:{
				type:Boolean
			},
			show_campus:{
				type:Boolean
			}
		};
	}
	
	constructor() {
		super();
		
		//this.serverURL = 	'http://futurestudents.yorku.ca/themes/custom/york/vsg/';
		
		/*const link = 		document.createElement('link');
		link.rel = 			'stylesheet';
		link.type = 		'text/css';
		link.crossOrigin = 	'anonymous';
		link.href = 		this.serverURL + 'vsg.css';
		document.head.appendChild(link);	*/	
		
		this.header_size = 	'3rem';
		this.blurb = 		'';
		
		this.phoneNumberPopulated = false;
		
		this.header_original = 				'Request More Information';
		this.header = 						this.header_original;
		this.submitted_header_original = 	'Request More Information';
		this.submitted_header = 			this.submitted_header_original;
		this.submitted_blurb_original = 	'Thank you! We’ll be in touch soon with information about York University.';
		this.submitted_blurb = 				this.submitted_blurb_original;
		
		this.submitted = false;
		this.white = false;
		this.show_phone = false;
		this.show_area_of_interest = false;
		this.get_academic_history = false;
		this.show_campus = false;
		
		let mql = 			window.matchMedia('(max-width: 800px)');
		this.one_column = 	mql.matches;
		
		this.one_column_forced = false;
		
		let host =		this;
		mql.addListener(function(event){
			if(!host.one_column_forced){
				host.one_column = event.matches;
			}
		});
		
		this.year = 2024;
		//this.year_prefix = '2019-20';
		this.invert = false;
		
		this.addEventListener('iron-form-presubmit', function(event){
			if(this.shadowRoot.getElementById('i_am') && this.shadowRoot.getElementById('i_am').selectedItem){
				this.shadowRoot.getElementById('form').request.body.i_am = 					this.shadowRoot.getElementById('i_am').selectedItem.attributes['value'].value;
				this.shadowRoot.getElementById('form').request.body.i_am_at = 				this.shadowRoot.getElementById('listbox_i_am').selected;
			}
			
			if(this.shadowRoot.getElementById('start_in_month') && this.shadowRoot.getElementById('start_in_month').selectedItem){
				this.shadowRoot.getElementById('form').request.body.start_in_month = 		this.shadowRoot.getElementById('start_in_month').selectedItem.attributes['value'].value;
				this.shadowRoot.getElementById('form').request.body.start_in_month_at = 	this.shadowRoot.getElementById('listbox_start_in_month').selected;
			}
			
			if(this.shadowRoot.getElementById('academic_hx') && this.shadowRoot.getElementById('academic_hx').selectedItem){
				this.shadowRoot.getElementById('form').request.body.academic_hx = 			this.shadowRoot.getElementById('academic_hx').selectedItem.attributes['value'].value;
				this.shadowRoot.getElementById('form').request.body.academic_hx_at = 		this.shadowRoot.getElementById('listbox_academic_hx').selected;
			}
			
			if(this.shadowRoot.getElementById('study_visa') && this.shadowRoot.getElementById('study_visa').selectedItem){
				this.shadowRoot.getElementById('form').request.body.study_visa = 			this.shadowRoot.getElementById('study_visa').selectedItem.attributes['value'].value;
				this.shadowRoot.getElementById('form').request.body.study_visa_at = 		this.shadowRoot.getElementById('listbox_study_visa').selected;
			}
			
			if(this.shadowRoot.getElementById('country_of_residence') && this.shadowRoot.getElementById('country_of_residence').selectedItem){
				this.shadowRoot.getElementById('form').request.body.country_of_residence = 		this.shadowRoot.getElementById('country_of_residence').selectedItem.attributes['value'].value;
				this.shadowRoot.getElementById('form').request.body.country_of_residence_at = 	this.shadowRoot.getElementById('listbox_country_of_residence').selected;
			}
			
			if(this.shadowRoot.getElementById('area_of_interest') && this.shadowRoot.getElementById('area_of_interest').value){
				this.shadowRoot.getElementById('form').request.body.area_of_interest = 		this.shadowRoot.getElementById('area_of_interest').value.join(';');
				this.shadowRoot.getElementById('form').request.body.area_of_interest_at = 	this.shadowRoot.getElementById('area_of_interest').value;
			}
			
			this.formStorage = this.shadowRoot.getElementById('form').request.body;
			localStorage.setItem('york-undergrad-lead', JSON.stringify(this.formStorage));
		});	
		
		this.formStorage = JSON.parse(localStorage.getItem('york-undergrad-lead'));
		if(this.formStorage){
			this.phoneNumberPopulated = (this.formStorage.phone_number ? true : false);
			
			if(this.formStorage.area_of_interest_at){
				this.area_of_interest = this.formStorage.area_of_interest_at;
			}
		}
		else{
			this.formStorage = {};
		}				
		
		if(typeof ga === 'function'){
			ga('create', 'UA-54028600-1', {'name':'main'});
			ga('main.send', 'event', window.location.hostname, "undergrad_leadform_loaded", window.location.href);			
		}
		
		//UTM capture
		const query = window.location.search;
		const urlParameters = new URLSearchParams(query);
		if(urlParameters.get('utm_medium')){
			this.medium = urlParameters.get('utm_medium');
		}
	}
	
	phoneNumberPopulatedUpdate(){
		if(this.shadowRoot.getElementById('phone_number')){
			this.phoneNumberPopulated = this.shadowRoot.getElementById('phone_number').value;
		}
	}
	
	attributeChangedCallback(name, oldValue, newValue){
		super.attributeChangedCallback(name, oldValue, newValue);
		
		if(name == 'one_column' && oldValue == null){
			this.one_column = true;
			this.one_column_forced = true;
		}
		else if(name == 'set_markham' && oldValue == null){
			this.set_markham = true;
			this.campus = 'markham';
		}
		else if(name == 'is_french' && oldValue == null){		
			if(this.header == this.header_original){
				this.header = 'Pour en savoir plus';
			}
			if(this.submitted_header == this.submitted_header_original){
				this.submitted_header = 'Pour en savoir plus';
			}
			if(this.submitted_blurb == this.submitted_blurb_original){
				this.submitted_blurb = 	'Merci! Nous communiquerons bientôt avec plus d\'informations sur l\'Université York.';
			}
		}
	}	
	
	updated(changedProperties){
		for(let [key, value] of changedProperties){
			if(key == 'faculty_program'){
				this.shadowRoot.getElementById('facultyProgram').generateRequest();
			}
		}
	}
	
	reportDownload(){
		this.shadowRoot.getElementById('reportDownload').generateRequest();
	}
	
	submitRFIForm(){
		let form = this.shadowRoot.getElementById('form');
		if(form.validate()){
			form.submit();
			this.submitted = true;
			
			if(this.infocard){
				this.shadowRoot.getElementById('infocard').generateRequest();
			}
			
			let customEvent = new CustomEvent('york-undergrad-lead-submitted', {
				detail:	{message:"York Undergrad Lead Submitted"},
				bubbles: true,
				composed: true
			});
			this.dispatchEvent(customEvent);
			
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
				'event': 'undergradLeadFormSubmitted',
				'topic': this.topic
			});
		}
	}
	
	setFacultyPrograms(response){
		this.faculty_program_programs = response.detail.response;
	}
	
	infocardResponse(response){
		window.location = response.detail.response.data;
	}
	
	render() {
		this.blurbHTML = 			html`${unsafeHTML(this.blurb)}`;
		this.submittedBlurbHTML= 	html`${unsafeHTML(this.submitted_blurb)}`;
		
		return html`
			<style>
				:host{
					font-size:16px;
					font-family:"IBM Plex Sans";
				}
				
				:host([white]){
					color:#FFF;
					--paper-input-container-color:#FFF;
					--paper-input-container-focus-color:#FFF;
					--paper-input-container-input-color:#FFF;
					--paper-checkbox-label-color:#FFF;
				}
				
				*{
					font-family:"IBM Plex Sans";
				}
				
				
			
				.flex{
					display:flex;
				}			
					.flex.column{
						flex-direction:column;
					}
					
					.flex.row{
						flex-direction:row;
					}
				
				.flex > *{
					flex:1;
				}
				
				.flex > *:first-child{
					margin-right:20px;
				}
				
				.flex > *:last-child{
					margin-left:20px;
				}	
				
					.flex.column > *:first-child{
						margin-right:0;
					}
					
					.flex.column > *:last-child{
						margin-left:0;
					}		
					
					
				.column #blurb-wrapper img{
					display:none !important;
				}		
				
			
				.header{
					/* font-family:'Interstate UltraBlack'; */
					font-size:${this.header_size};
					/* text-transform:uppercase; */
					font-weight:500;
					line-height:1.1;
					margin-top:0;
					margin-bottom:25px;
				}
				
					@media (max-width:600px){
						.header{
							font-size:2em;
							margin-bottom:0;
						}
					}
					
					@media (max-width:400px){
						.header{
							font-size:1.5em;
							margin-bottom:0;
						}
					}
					
				.blurb{
					margin:16px 0 32px;
				}				
					
				
				paper-dropdown-menu,
				paper-button,
				paper-dropdown{
					display:block;
					width:100%;
				}
				
				paper-checkbox{
					margin:15px 0;
					--paper-checkbox-vertical-align:top;
					--paper-checkbox-unchecked-color:var(--background-color, #e31837);
					--paper-checkbox-checked-color:var(--background-color, #e31837);
				}
				
				paper-button{
					text-align:center;
					margin:10px 0;
					background-color:var(--background-color, #e31837);
					color:var(--foreground-color, #FFF);
				}
				
				a{
					text-decoration:none;
				}
			</style>
			
			<iron-ajax id="reportDownload" url="https://futurestudents.yorku.ca/ajax/report/landing-page-pdf/${this.topic}"></iron-ajax>
			<iron-ajax id="facultyProgram" url="https://futurestudents.yorku.ca/ajax/crm/undergraduatev2/faculty-programs/${this.faculty_program}" handle-as="json" @response="${this.setFacultyPrograms}"></iron-ajax>
			
			<div class="flex ${this.one_column ? `column` : `row`}">
				${this.submitted ? 
					html`<div style="margin-bottom:100px;font-family:'Interstate Light'" id="blurb-wrapper">
							<h2 class="header">${this.submitted_header}</h2>
							<div class="blurb">${this.submittedBlurbHTML}</div>
							${this.pdf ? html`<a href="${this.pdf}" download @click="${this.reportDownload}"><paper-button raised>Download Your Career Map</paper-button></a>` : html``}
						</div>
						<div>
						</div>` :
					html`<div style="font-family:'Interstate Light'" id="blurb-wrapper">
						<h2 class="header">${this.header}</h2>
						<div class="blurb">${this.blurbHTML}</div>
					</div>
									
					<div id="form-wrapper">
						<iron-form id="form">
							<form is="iron-form" method="post" action="https://futurestudents.yorku.ca/ajax/crm/undergraduatev2">
								<paper-input required="true" label="${this.is_french ? `Prénom` : `First Name`}" name="first_name" value="${this.formStorage.first_name ? this.formStorage.first_name : ''}"></paper-input>
								<paper-input required label="${this.is_french ? `Nom de famille` : `Last Name`}" name="last_name" value="${this.formStorage.last_name ? this.formStorage.last_name : ''}"></paper-input>
								<paper-input type="email" auto-validate required error-message="Please enter valid email address!" label="${this.is_french ? `Votre courriel` : `Your Email`}"" name="email" value="${this.formStorage.email ? this.formStorage.email : ''}"></paper-input>
								
								${this.set_markham || this.i_am ? html`<paper-dropdown-menu no-animations="true" required label="I am a" name="i_am" id="i_am">
									<paper-listbox slot="dropdown-content" id="listbox_i_am" attr-for-selected="value" selected="${this.formStorage.i_am_at !== false ? this.formStorage.i_am_at : -1}">
										<paper-item value="100000000">High School Student / Graduate</paper-item>
										<paper-item value="100000001">University or College Student</paper-item>
										<paper-item value="100000004">Teacher / Guidance Counsellor</paper-item>
									</paper-listbox>
								</paper-dropdown-menu>` : ``}
								
								
								<div style="display:flex">
									<paper-dropdown-menu no-animations="true" required label="${this.is_french ? `J’ai l’intention de commencer à York en :` : `I intend to start York in`}" name="start_in_year" id="start_in_year" style="margin-right:8px;">
										<paper-listbox slot="dropdown-content" attr-for-selected="value" id="listbox_start_in_year" selected="${this.formStorage.start_in_year !== false ? this.formStorage.start_in_year : -1}">
											<paper-item value="${this.year}">${this.year}</paper-item>
											<paper-item value="${this.year + 1}">${this.year + 1}</paper-item>
											<paper-item value="${this.year + 2}">${this.year + 2}</paper-item>
											<paper-item value="${this.year + 3}">${this.year + 3}</paper-item>
										</paper-listbox>
									</paper-dropdown-menu>
									
									<paper-dropdown-menu no-animations="true" required name="start_in_month" id="start_in_month">
										<paper-listbox slot="dropdown-content" attr-for-selected="value" id="listbox_start_in_month" selected="${this.formStorage.start_in_month !== false ? this.formStorage.start_in_month : -1}">
											<paper-item value="914310001">${this.is_french ? `Janvier` : `January`} (${this.is_french ? `hiver` : `Winter`})</paper-item>
											<paper-item value="914310002">${this.is_french ? `Mai` : `May`} (${this.is_french ? `été` : `Summer`})</paper-item>
											<paper-item value="914310000">${this.is_french ? `Septembre` : `September`} (${this.is_french ? `automne` : `Fall`})</paper-item>
										</paper-listbox>
									</paper-dropdown-menu>
								</div>
								
								${this.get_academic_history ? html`<paper-dropdown-menu no-animations="true" label="${this.is_french ? `Historique scolaire récent` : `Recent Academic History`}" id="academic_hx">
									<paper-listbox slot="dropdown-content" id="listbox_academic_hx" selected="${this.formStorage.academic_hx_at !== false ? this.formStorage.academic_hx_at : -1}">
										<paper-item value="100000000">${this.is_french ? `Je suis à l’école secondaire` : `I am a high-school student`}</paper-item>
										<paper-item value="100000001">${this.is_french ? ` J’ai fini au moins une année d’études à temps plein dans un collège ou une université` : `I have completed at least one year of full-time study at college or university`}</paper-item>
										<paper-item value="100000002">${this.is_french ? `J’ai fini l’école secondaire depuis deux ans au moins` : `I have been away from high-school for at least two years`}</paper-item>
									</paper-listbox>
								</paper-dropdown-menu>` : ``}
														
								${this.show_area_of_interest ? html`<paper-dropdown name="area_of_interest" id="area_of_interest" label="Area(s) of Interest" multi="true" value="${this.area_of_interest}">
										<paper-item value="Business & Economics">Business & Economics</paper-item>
										<paper-item value="Earth, Environment & Sustainability">Earth, Environment & Sustainability</paper-item>
										<paper-item value="Education">Education</paper-item>
										<paper-item value="Engineering & Technology">Engineering & Technology</paper-item>
										<paper-item value="Government, Law & Politics">Government, Law & Politics</paper-item>
										<paper-item value="Health & Life Sciences">Health & Life Sciences</paper-item>
										<paper-item value="Humanities & Social Sciences">Humanities & Social Sciences</paper-item>
										<paper-item value="Languages, Culture, & Communication">Languages, Culture & Communication</paper-item>
										<paper-item value="Math, Chemistry & Physics">Math, Chemistry & Physics</paper-item>
										<paper-item value="Media & Creative Arts">Media & Creative Arts</paper-item>
									</paper-dropdown>`:``}							
								
								
								${this.faculty_program_programs ? html`
								<paper-dropdown name="program_of_interest" id="program_of_interest" label="Program(s) of Interest" multi="true" value="${this.program_of_interest}">
									${this.faculty_program_programs.map(i=>html`<paper-item value="${i.path}">${i.name}</paper-item>`)}
								</paper-dropdown>`: ``}	
								
								<paper-dropdown-menu no-animations="true" required label="${this.is_french ? `Pays de résidence` : `Country of Residence`}" name="country_of_residence" id="country_of_residence">
									<paper-listbox slot="dropdown-content" id="listbox_country_of_residence" attr-for-selected="value" selected="${this.formStorage && this.formStorage.country_of_residence && this.formStorage.country_of_residence !== false ? this.formStorage.country_of_residence : 0}">
										<paper-item value="CAN">Canada</paper-item>
										<paper-item value="AFG">Afghanistan</paper-item>
										<paper-item value="ALA">Åland Islands</paper-item>
										<paper-item value="ALB">Albania</paper-item>
										<paper-item value="DZA">Algeria</paper-item>
										<paper-item value="ASM">American Samoa</paper-item>
										<paper-item value="AND">Andorra</paper-item>
										<paper-item value="AGO">Angola</paper-item>
										<paper-item value="AIA">Anguilla</paper-item>
										<paper-item value="ATA">Antarctica</paper-item>
										<paper-item value="ATG">Antigua and Barbuda</paper-item>
										<paper-item value="ARG">Argentina</paper-item>
										<paper-item value="ARM">Armenia</paper-item>
										<paper-item value="ABW">Aruba</paper-item>
										<paper-item value="AUS">Australia</paper-item>
										<paper-item value="AUT">Austria</paper-item>
										<paper-item value="AZE">Azerbaijan</paper-item>
										<paper-item value="BHS">Bahamas</paper-item>
										<paper-item value="BHR">Bahrain</paper-item>
										<paper-item value="BGD">Bangladesh</paper-item>
										<paper-item value="BRB">Barbados</paper-item>
										<paper-item value="BLR">Belarus</paper-item>
										<paper-item value="BEL">Belgium</paper-item>
										<paper-item value="BLZ">Belize</paper-item>
										<paper-item value="BEN">Benin</paper-item>
										<paper-item value="BMU">Bermuda</paper-item>
										<paper-item value="BTN">Bhutan</paper-item>
										<paper-item value="BOL">Bolivia (Plurinational State of)</paper-item>
										<paper-item value="BES">Bonaire, Sint Eustatius and Saba</paper-item>
										<paper-item value="BIH">Bosnia and Herzegovina</paper-item>
										<paper-item value="BWA">Botswana</paper-item>
										<paper-item value="BVT">Bouvet Island</paper-item>
										<paper-item value="BRA">Brazil</paper-item>
										<paper-item value="IOT">British Indian Ocean Territory</paper-item>
										<paper-item value="BRN">Brunei Darussalam</paper-item>
										<paper-item value="BGR">Bulgaria</paper-item>
										<paper-item value="BFA">Burkina Faso</paper-item>
										<paper-item value="BDI">Burundi</paper-item>
										<paper-item value="CPV">Cabo Verde</paper-item>
										<paper-item value="KHM">Cambodia</paper-item>
										<paper-item value="CMR">Cameroon</paper-item>
										<paper-item value="CYM">Cayman Islands</paper-item>
										<paper-item value="CAF">Central African Republic</paper-item>
										<paper-item value="TCD">Chad</paper-item>
										<paper-item value="CHL">Chile</paper-item>
										<paper-item value="CHN">China</paper-item>
										<paper-item value="CXR">Christmas Island</paper-item>
										<paper-item value="CCK">Cocos (Keeling) Islands</paper-item>
										<paper-item value="COL">Colombia</paper-item>
										<paper-item value="COM">Comoros</paper-item>
										<paper-item value="COG">Congo</paper-item>
										<paper-item value="COD">Congo, Democratic Republic of the</paper-item>
										<paper-item value="COK">Cook Islands</paper-item>
										<paper-item value="CRI">Costa Rica</paper-item>
										<paper-item value="HRV">Croatia</paper-item>
										<paper-item value="CUB">Cuba</paper-item>
										<paper-item value="CUW">Curaçao</paper-item>
										<paper-item value="CYP">Cyprus</paper-item>
										<paper-item value="CZE">Czechia</paper-item>
										<paper-item value="CIV">Côte d'Ivoire</paper-item>
										<paper-item value="DNK">Denmark</paper-item>
										<paper-item value="DJI">Djibouti</paper-item>
										<paper-item value="DMA">Dominica</paper-item>
										<paper-item value="DOM">Dominican Republic</paper-item>
										<paper-item value="ECU">Ecuador</paper-item>
										<paper-item value="EGY">Egypt</paper-item>
										<paper-item value="SLV">El Salvador</paper-item>
										<paper-item value="GNQ">Equatorial Guinea</paper-item>
										<paper-item value="ERI">Eritrea</paper-item>
										<paper-item value="EST">Estonia</paper-item>
										<paper-item value="SWZ">Eswatini</paper-item>
										<paper-item value="ETH">Ethiopia</paper-item>
										<paper-item value="FLK">Falkland Islands (Malvinas)</paper-item>
										<paper-item value="FRO">Faroe Islands</paper-item>
										<paper-item value="FJI">Fiji</paper-item>
										<paper-item value="FIN">Finland</paper-item>
										<paper-item value="FRA">France</paper-item>
										<paper-item value="GUF">French Guiana</paper-item>
										<paper-item value="PYF">French Polynesia</paper-item>
										<paper-item value="ATF">French Southern Territories</paper-item>
										<paper-item value="GAB">Gabon</paper-item>
										<paper-item value="GMB">Gambia</paper-item>
										<paper-item value="GEO">Georgia</paper-item>
										<paper-item value="DEU">Germany</paper-item>
										<paper-item value="GHA">Ghana</paper-item>
										<paper-item value="GIB">Gibraltar</paper-item>
										<paper-item value="GRC">Greece</paper-item>
										<paper-item value="GRL">Greenland</paper-item>
										<paper-item value="GRD">Grenada</paper-item>
										<paper-item value="GLP">Guadeloupe</paper-item>
										<paper-item value="GUM">Guam</paper-item>
										<paper-item value="GTM">Guatemala</paper-item>
										<paper-item value="GGY">Guernsey</paper-item>
										<paper-item value="GIN">Guinea</paper-item>
										<paper-item value="GNB">Guinea-Bissau</paper-item>
										<paper-item value="GUY">Guyana</paper-item>
										<paper-item value="HTI">Haiti</paper-item>
										<paper-item value="HMD">Heard Island and McDonald Islands</paper-item>
										<paper-item value="VAT">Holy See</paper-item>
										<paper-item value="HND">Honduras</paper-item>
										<paper-item value="HKG">Hong Kong</paper-item>
										<paper-item value="HUN">Hungary</paper-item>
										<paper-item value="ISL">Iceland</paper-item>
										<paper-item value="IND">India</paper-item>
										<paper-item value="IDN">Indonesia</paper-item>
										<paper-item value="IRN">Iran (Islamic Republic of)</paper-item>
										<paper-item value="IRQ">Iraq</paper-item>
										<paper-item value="IRL">Ireland</paper-item>
										<paper-item value="IMN">Isle of Man</paper-item>
										<paper-item value="ISR">Israel</paper-item>
										<paper-item value="ITA">Italy</paper-item>
										<paper-item value="JAM">Jamaica</paper-item>
										<paper-item value="JPN">Japan</paper-item>
										<paper-item value="JEY">Jersey</paper-item>
										<paper-item value="JOR">Jordan</paper-item>
										<paper-item value="KAZ">Kazakhstan</paper-item>
										<paper-item value="KEN">Kenya</paper-item>
										<paper-item value="KIR">Kiribati</paper-item>
										<paper-item value="PRK">Korea (Democratic People's Republic of)</paper-item>
										<paper-item value="KOR">Korea, Republic of</paper-item>
										<paper-item value="KWT">Kuwait</paper-item>
										<paper-item value="KGZ">Kyrgyzstan</paper-item>
										<paper-item value="LAO">Lao People's Democratic Republic</paper-item>
										<paper-item value="LVA">Latvia</paper-item>
										<paper-item value="LBN">Lebanon</paper-item>
										<paper-item value="LSO">Lesotho</paper-item>
										<paper-item value="LBR">Liberia</paper-item>
										<paper-item value="LBY">Libya</paper-item>
										<paper-item value="LIE">Liechtenstein</paper-item>
										<paper-item value="LTU">Lithuania</paper-item>
										<paper-item value="LUX">Luxembourg</paper-item>
										<paper-item value="MAC">Macao</paper-item>
										<paper-item value="MDG">Madagascar</paper-item>
										<paper-item value="MWI">Malawi</paper-item>
										<paper-item value="MYS">Malaysia</paper-item>
										<paper-item value="MDV">Maldives</paper-item>
										<paper-item value="MLI">Mali</paper-item>
										<paper-item value="MLT">Malta</paper-item>
										<paper-item value="MHL">Marshall Islands</paper-item>
										<paper-item value="MTQ">Martinique</paper-item>
										<paper-item value="MRT">Mauritania</paper-item>
										<paper-item value="MUS">Mauritius</paper-item>
										<paper-item value="MYT">Mayotte</paper-item>
										<paper-item value="MEX">Mexico</paper-item>
										<paper-item value="FSM">Micronesia (Federated States of)</paper-item>
										<paper-item value="MDA">Moldova, Republic of</paper-item>
										<paper-item value="MCO">Monaco</paper-item>
										<paper-item value="MNG">Mongolia</paper-item>
										<paper-item value="MNE">Montenegro</paper-item>
										<paper-item value="MSR">Montserrat</paper-item>
										<paper-item value="MAR">Morocco</paper-item>
										<paper-item value="MOZ">Mozambique</paper-item>
										<paper-item value="MMR">Myanmar</paper-item>
										<paper-item value="NRU">Nauru</paper-item>
										<paper-item value="NPL">Nepal</paper-item>
										<paper-item value="NLD">Netherlands</paper-item>
										<paper-item value="NCL">New Caledonia</paper-item>
										<paper-item value="NZL">New Zealand</paper-item>
										<paper-item value="NIC">Nicaragua</paper-item>
										<paper-item value="NER">Niger</paper-item>
										<paper-item value="NGA">Nigeria</paper-item>
										<paper-item value="NIU">Niue</paper-item>
										<paper-item value="NFK">Norfolk Island</paper-item>
										<paper-item value="MKD">North Macedonia</paper-item>
										<paper-item value="MNP">Northern Mariana Islands</paper-item>
										<paper-item value="NOR">Norway</paper-item>
										<paper-item value="OMN">Oman</paper-item>
										<paper-item value="PAK">Pakistan</paper-item>
										<paper-item value="PLW">Palau</paper-item>
										<paper-item value="PSE">Palestine, State of</paper-item>
										<paper-item value="PAN">Panama</paper-item>
										<paper-item value="PNG">Papua New Guinea</paper-item>
										<paper-item value="PRY">Paraguay</paper-item>
										<paper-item value="PER">Peru</paper-item>
										<paper-item value="PHL">Philippines</paper-item>
										<paper-item value="PCN">Pitcairn</paper-item>
										<paper-item value="POL">Poland</paper-item>
										<paper-item value="PRT">Portugal</paper-item>
										<paper-item value="PRI">Puerto Rico</paper-item>
										<paper-item value="QAT">Qatar</paper-item>
										<paper-item value="ROU">Romania</paper-item>
										<paper-item value="RUS">Russian Federation</paper-item>
										<paper-item value="RWA">Rwanda</paper-item>
										<paper-item value="REU">Réunion</paper-item>
										<paper-item value="BLM">Saint Barthélemy</paper-item>
										<paper-item value="SHN">Saint Helena, Ascension and Tristan da Cunha</paper-item>
										<paper-item value="KNA">Saint Kitts and Nevis</paper-item>
										<paper-item value="LCA">Saint Lucia</paper-item>
										<paper-item value="MAF">Saint Martin (French part)</paper-item>
										<paper-item value="SPM">Saint Pierre and Miquelon</paper-item>
										<paper-item value="VCT">Saint Vincent and the Grenadines</paper-item>
										<paper-item value="WSM">Samoa</paper-item>
										<paper-item value="SMR">San Marino</paper-item>
										<paper-item value="STP">Sao Tome and Principe</paper-item>
										<paper-item value="SAU">Saudi Arabia</paper-item>
										<paper-item value="SEN">Senegal</paper-item>
										<paper-item value="SRB">Serbia</paper-item>
										<paper-item value="SYC">Seychelles</paper-item>
										<paper-item value="SLE">Sierra Leone</paper-item>
										<paper-item value="SGP">Singapore</paper-item>
										<paper-item value="SXM">Sint Maarten (Dutch part)</paper-item>
										<paper-item value="SVK">Slovakia</paper-item>
										<paper-item value="SVN">Slovenia</paper-item>
										<paper-item value="SLB">Solomon Islands</paper-item>
										<paper-item value="SOM">Somalia</paper-item>
										<paper-item value="ZAF">South Africa</paper-item>
										<paper-item value="SGS">South Georgia and the South Sandwich Islands</paper-item>
										<paper-item value="SSD">South Sudan</paper-item>
										<paper-item value="ESP">Spain</paper-item>
										<paper-item value="LKA">Sri Lanka</paper-item>
										<paper-item value="SDN">Sudan</paper-item>
										<paper-item value="SUR">Suriname</paper-item>
										<paper-item value="SJM">Svalbard and Jan Mayen</paper-item>
										<paper-item value="SWE">Sweden</paper-item>
										<paper-item value="CHE">Switzerland</paper-item>
										<paper-item value="SYR">Syrian Arab Republic</paper-item>
										<paper-item value="TWN">Taiwan, Province of China</paper-item>
										<paper-item value="TJK">Tajikistan</paper-item>
										<paper-item value="TZA">Tanzania, United Republic of</paper-item>
										<paper-item value="THA">Thailand</paper-item>
										<paper-item value="TLS">Timor-Leste</paper-item>
										<paper-item value="TGO">Togo</paper-item>
										<paper-item value="TKL">Tokelau</paper-item>
										<paper-item value="TON">Tonga</paper-item>
										<paper-item value="TTO">Trinidad and Tobago</paper-item>
										<paper-item value="TUN">Tunisia</paper-item>
										<paper-item value="TKM">Turkmenistan</paper-item>
										<paper-item value="TCA">Turks and Caicos Islands</paper-item>
										<paper-item value="TUV">Tuvalu</paper-item>
										<paper-item value="TUR">Türkiye</paper-item>
										<paper-item value="UGA">Uganda</paper-item>
										<paper-item value="UKR">Ukraine</paper-item>
										<paper-item value="ARE">United Arab Emirates</paper-item>
										<paper-item value="GBR">United Kingdom of Great Britain and Northern Ireland</paper-item>
										<paper-item value="UMI">United States Minor Outlying Islands</paper-item>
										<paper-item value="USA">United States of America</paper-item>
										<paper-item value="URY">Uruguay</paper-item>
										<paper-item value="UZB">Uzbekistan</paper-item>
										<paper-item value="VUT">Vanuatu</paper-item>
										<paper-item value="VEN">Venezuela (Bolivarian Republic of)</paper-item>
										<paper-item value="VNM">Viet Nam</paper-item>
										<paper-item value="VGB">Virgin Islands (British)</paper-item>
										<paper-item value="VIR">Virgin Islands (U.S.)</paper-item>
										<paper-item value="WLF">Wallis and Futuna</paper-item>
										<paper-item value="ESH">Western Sahara</paper-item>
										<paper-item value="YEM">Yemen</paper-item>
										<paper-item value="ZMB">Zambia</paper-item>
										<paper-item value="ZWE">Zimbabwe</paper-item>
									</paper-listbox>
								</paper-dropdown-menu>	
								
								${this.show_campus ? html`<div style="margin:24px 0;">
									<label slot="label">I am interested in:</label>
									<div style="display:flex">
										<paper-checkbox name="campus_keele" ?checked="${this.formStorage.campus_keele == 'on'}" style="margin:8px 24px 8px 0;">${this.is_french ? `Campus Keele` : `Keele Campus`}</paper-checkbox>
										<paper-checkbox name="campus_glendon" ?checked="${this.formStorage.campus_glendon == 'on'}" style="margin:8px 24px 8px 0;">${this.is_french ? `Campus Glendon` : `Glendon Campus`}</paper-checkbox>
										<paper-checkbox name="campus_markham" ?checked="${this.formStorage.campus_markham == 'on'}" style="margin:8px 24px 8px 0;">${this.is_french ? `Campus Markham` : `Markham Campus`}</paper-checkbox>
									</div>						
								</div>` : ``}
								
								${this.set_markham ? `` : html`<paper-dropdown-menu no-animations="true" required label="${this.is_french ? `Avez-vous besoin d’un visa pour étudier au Canada?` : `Do you need a study permit to study in Canada?`}" name="study_visa" id="study_visa">
									<paper-listbox slot="dropdown-content" attr-for-selected="value" id="listbox_study_visa" selected="${this.formStorage.study_visa !== false ? this.formStorage.study_visa : -1}">
										<paper-item value="yes">${this.is_french ? `Oui` : `Yes`}</paper-item>
										<paper-item value="no">${this.is_french ? `Non` : `No`}</paper-item>
									</paper-listbox>
								</paper-dropdown-menu>`}
								
								<paper-checkbox required name="consent" ?checked="${this.formStorage.consent == 'on'}">${this.is_french ? `J’AIMERAIS recevoir par courriel des renseignements sur l’Université York, notamment sur le ou les programmes de mon choix, les conditions d’admission et les alertes sur les événements. Je peux retirer mon consentement à recevoir des communications de l’Université York à tout moment (obligatoire).` : `I WOULD LIKE TO receive information about York University, which may include, but is not limited to my program(s) of choice, admission requirements and event alerts via email. I can withdraw my consent to receive communications from York University at any time (required).`}</paper-checkbox>
								
								${this.show_phone ? html`<paper-input type="tel" id="phone_number" label="${this.is_french ? `Votre numéro de téléphone cellulaire` : `Your Mobile Phone Number`}" name="phone_number" value="${this.formStorage.phone_number ? this.formStorage.phone_number : ''}" @input=${this.phoneNumberPopulatedUpdate}></paper-input>
									
								<paper-checkbox name="consent_phone" ?checked="${this.formStorage.consent_phone == 'on'}">${this.is_french ? `J’accepte de recevoir des informations importantes concernant ma demande d’inscription à l’Université York par message texte SMS (obligatoire si vous fournissez un numéro de téléphone).` : `I agree to receive important information about my application to York University via SMS text message (required with phone number).`}</paper-checkbox>` : ``}
								
								
								${this.recruiter ? 	html`<input type="hidden" name="recruiter" value="${this.recruiter}" />` : ``}
								${this.topic ? 	html`<input type="hidden" name="topic" value="${this.topic}" />` : ``}
								${this.marketing_tag ? 	html`<input type="hidden" name="marketing_tag" value="${this.marketing_tag}" />` : ``}
								${this.cohort ? html`<input type="hidden" name="cohort" value="${this.cohort}" />` : ``}
								${this.medium ? html`<input type="hidden" name="medium" value="${this.medium}" />` : ``}
								${this.path ? 	html`<input type="hidden" name="path" value="${this.path}" />` : ``}
								${this.cluster ? html`<input type="hidden" name="cluster" value="${this.cluster}" />` : ``}
								${this.clusterset ? html`<input type="hidden" name="clusterset" value="${this.clusterset}" />` : ``}
								${this.faculty ? html`<input type="hidden" name="faculty" value="${this.faculty}" />` : ``}
											
								<paper-button raised @click="${this.submitRFIForm}">${this.is_french ? `Envoyer` : `Submit`}</paper-button>							
							</form>
						</iron-form>
					</div>`}
			</div>
		`;
	}
}

customElements.define('york-undergrad-lead', YorkUndergradLeadv2);
//customElements.define('york-undergrad-leadv2', YorkUndergradLeadv2);