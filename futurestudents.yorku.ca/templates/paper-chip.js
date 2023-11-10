import { LitElement, html, css } from "./node_modules/lit-element/lit-element.js";
import "./node_modules/@polymer/iron-icons/iron-icons.js";
import "./node_modules/@polymer/iron-icon/iron-icon.js";
import "./node_modules/@polymer/paper-material/paper-material.js";
import './node_modules/@polymer/paper-styles/paper-styles.js';

class PaperChip extends LitElement {
  static get properties() {
    return {
      /**
       * Whether or not the chip is removable. If `true`, a remove button will
       * be shown.
       *
       * @attribute removable
       * @type boolean
       * @default false
       */
      removable: {
        type: Boolean,
        reflect: true
      },

      /**
       * Whether or not the chip contains additional content. Single-line chips do not open.
       */
      singleLine: {
        type: Boolean,
        reflect: true
      },

      /**
       * Always show remove button
       */
      persistRemoveButton: {
        type: Boolean,
        reflect: true
      },

      /**
       * Whether or not the chip uses an animated transition between opened and
       * closed states
       *
       * @attribute animated
       * @type boolean
       * @default true
       */
      animated: {
        type: Boolean,
        reflect: true
      },

      /**
       * Whether or not the chip is in its opened state.
       *
       * @attribute opened
       * @type boolean
       * @default false
       */
      opened: {
        type: Boolean,
        reflect: true
      },

	  permaopened: {
        type: Boolean,
        reflect: true
      },

      /**
       * Whether or not the chip state is "active". If `true`, the main chip
       * area will be highlighted when in the opened state.
       *
       * @attribute active
       * @type boolean
       * @default false
       */
      active: {
        type: Boolean,
        reflect: true
      },
      _elevation: {
        type: Number
      },
      _keyTarget: {
        type: Object
      }
    };
  }

  constructor() {
    super();
    
    this.removable = false;
    this.persistRemoveButton = false;
    this.animated = false;
    this.opened = false;
    this.active = false;
    this._elevation = 1;
    
    this.addEventListener('click', this._onClick);
    this.addEventListener('blur', this._onBlur);
  }

  _onClick(event) {
    if (!this.singleLine && !this.permaopened) {
      this.opened = !this.opened;
    }
  }

  _onBlur(event) {
    this.opened = false;
  }

  _remove(event) {
    this.parentNode.removeChild(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
		super.attributeChangedCallback(name, oldValue, newValue);
		let hostObject = this;
		
		if (name == 'permaopened') {
			this.permaopened = true;
			this.opened = true;
		}
  }

  static get styles() {
    return css`
			:host{
		        display: inline-block;
		        vertical-align: top;
		        position: relative;
		        outline: none;
		        font-size: 14px;
		        cursor: pointer;
		        margin: 8px 0;
		        height: 32px;
		        overflow: visible;
		        /* @apply --paper-chip; */
		        font-family:Roboto;
			}
			
			:host([animated]) *,
			:host([animated]) ::slotted(*){
				transition:200ms ease-in;
			}
			
			#main, #chip{
				border-radius:16px;
			}
			
			#main {
				background-color: var(--paper-grey-200);
				position: relative;
				color: var(--secondary-text-color);
				
				/* @apply --layout-vertical; */
		        display: -ms-flexbox;
		        display: -webkit-flex;
		        display: flex;
		        -ms-flex-direction: column;
		        -webkit-flex-direction: column;
		        flex-direction: column;        				
			}
			
			#chip {
				box-sizing: border-box;
				height: 32px;
				
				/* @apply --layout-horizontal; */
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex;
				-ms-flex-direction: row;
				-webkit-flex-direction: row;
				flex-direction: row;
				
				/* @apply --layout-center; */
		        -ms-flex-align: center;
		        -webkit-align-items: center;
		        align-items: center;
			}
			
			paper-material {
				border-radius: 16px;
				background-color: var(--paper-grey-200);
			}
			
			#icon {
				/* @apply --layout-horizontal; */
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex;
				-ms-flex-direction: row;
				-webkit-flex-direction: row;
				flex-direction: row;
				
				/* @apply --layout-center; */
		        -ms-flex-align: center;
		        -webkit-align-items: center;
		        align-items: center;				
				
				/* @apply --layout-center-justified; */
				-ms-flex-pack: center;
				-webkit-justify-content: center;
				justify-content: center;
			}
      
			#icon ::slotted([slot=icon]) {
				margin-left: 4px;
				margin-right: -4px;
				width: 24px;
				height: 24px;
				line-height: 32px;
				border-radius: 100%;
				overflow: hidden;
				text-align: center;
				vertical-align: middle;
				font-size: 16px;
				font-weight: bold;
				background-color: var(--paper-grey-500);
				color: var(--text-primary-color);
				
				/* @apply --layout-flex; */
				-ms-flex: 1 1 0.000000001px;
				-webkit-flex: 1;
				flex: 1;
				-webkit-flex-basis: 0.000000001px;
				flex-basis: 0.000000001px;			
			}
			
			#icon ::slotted(iron-icon.icon),
			#icon ::slotted(iron-icon.icon svg) { /* FIXME: only top-level selectors allowed */
				width: 32px;
				height: 32px;
			}
      
			#icon ::slotted(iron-icon.icon) {
				vertical-align: bottom;
			}
			
			#label {
				padding: 0 4px 0 12px;
				
				/* @apply --layout-flex-auto; */
				-ms-flex: 1 1 auto;
				-webkit-flex: 1 1 auto;
				flex: 1 1 auto;				
				
				/* @apply --layout-self-center; */
				-ms-align-self: center;
				-webkit-align-self: center;
				align-self: center;
			}
			
			:host([single-line]:not([removable])) #label {
				padding-right: 12px;
			}
			
			#label ::slotted([slot=label]),
			#label ::slotted([slot=caption]) {
				display: block;
				white-space: nowrap;
				margin: 0;
				font-weight: normal;
				font-size: 14px;
			}
			
			/* #label ::slotted([slot=label]) {
				@apply --paper-chip-label;
			}
			
			#label ::slotted([slot=caption]) {
				@apply --paper-chip-caption;
			} */
      
			.icon-btn-wrapper {
				/* @apply --layout-self-center; */
				-ms-align-self: center;
				-webkit-align-self: center;
				align-self: center;			
			}
	      
			#removeBtn {
				position: relative;
				margin: 0 8px 0 4px;
				padding: 2px;
				width: 12px;
				height: 12px;
				border-radius: 100%;
				background-color: var(--paper-grey-400);
				color: var(--text-primary-color);
				cursor: pointer;
				/* @apply --paper-chip-removebtn; */
			}
			
			#removeBtn iron-icon {
				width: 12px;
				height: 12px;
				display: block;
				/* @apply --paper-chip-removebtn-icon; */
			}
	      
			:host(:not([removable])) #removeBtn {
				display: none;
			}
	      
			/* pressed state */
			:host([pressed]) #main {
				background-color: var(--paper-grey-300);
			}
	
			/* initially hidden elements */
			:host(:not([opened])) #label ::slotted([slot=caption]) {
				color: var(--secondary-text-color);
				font-size: 0;
				height: 0;
			}
			
				:host(:not([opened])) #main:hover{
					background-color:#666;
					transition:all 0.2s ease-in-out;
				}
				
				:host(:not([opened])) #main:hover #label ::slotted([slot=label]){
					color:#FFF;
					transition:all 0.2s ease-in-out;
				}							
	      
			:host(:not([persist-remove-button]):not([single-line]):not([opened])) #removeBtn,
			:host(:not([persist-remove-button]):not([single-line]):not([opened])) #removeBtn .icon {
				width: 0;
				height: 0;
				margin: 0;
				padding: 0;
			}
			
			:host(:not([persist-remove-button]):not([single-line]):not([opened])) #label {
				padding-right: 12px;
			}
			
			:host(:not([opened])) #content {
				width: 0;
				height: 0;
				min-width: 100%;
				overflow: hidden;
			}
			
			:host(:not([opened])) #label ::slotted([slot=label]) {
				color: var(--secondary-text-color);
			}
			
			/* opened state */
			:host([opened]) #main, :host([opened]) #chip {
				border-radius: 0;
			}
			
			:host([opened]) #content {
				height: auto;
				width: auto;
				min-width: 100%;
				overflow: hidden;
				/* @apply --paper-chip-content; */
			}
			
			:host([opened]) #chip {
				height: 72px;
			}
			
			:host([opened]) #icon ::slotted([slot=icon]) {
				margin-left:0;
			}			
			
			:host([opened]) #chip,
			:host([opened]) #content ::slotted(*) {
			padding: 16px 12px;
				background-color: var(--paper-grey-50);
			}
			
			:host([opened]) #label ::slotted([slot=label]) {
				color: var(--primary-text-color);
				font-size: 16px;
				/* @apply --paper-chip-label-opened; */
			}
			
			:host([opened]) paper-material {
				border-radius: 0;
			}
			
			:host([opened]) #icon ::slotted([slot=icon]),
			:host([opened]) #icon ::slotted(iron-icon.icon svg) { /* FIXME: only top-level selectors allowed)
				font-size: 20px;
				width: 40px;
				height: 40px;
				line-height: 40px;
			}
			
			:host([opened]) #removeBtn {
				padding: 4px;
				margin-left: 20px;
				width: 16px;
				height: 16px;
			}
			:host([opened]) #removeBtn iron-icon {
				width: 16px;
				height: 16px;
			}
			
			/* open + active state */
			:host([opened][active]) #chip,
			:host([opened][active]) ::slotted {
				background-color: var(--accent-color);
						color: var(--text-primary-color);
			}
			
			:host([opened][active]) #removeBtn {
				color: var(--accent-color);
				background-color: var(--text-primary-color);
			}
			
			:host([opened][active]) #chip #label ::slotted([slot=label]) {
				color: var(--text-primary-color);
			}
			
			:host([opened][active]) #chip #label ::slotted(h2) {
				color: var(--text-primary-color);
			}						
		`;
  }

  render() {
    return html`
			<paper-material id="shadow" elevation="${this._elevation}" ?animated="${this.animated}">
				<div id="main">
					<div id="chip">
						<div id="icon">
							<slot name="icon"></slot>
						</div>
						<div id="label">
							<slot name="label"></slot>
							<slot name="caption"></slot>
						</div>
						<div id="removeBtn" @click="${this._remove}" aria-label="Remove button">
							<iron-icon icon="close" class="icon"></iron-icon>
						</div>
					</div>	
					<div id="content">
						<slot></slot>
					</div>			
				</div>
			</paper-material>
		`;
  }

}

customElements.define('paper-chip', PaperChip);