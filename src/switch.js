class InputSwitch extends HTMLElement {
  constructor() {
    super()
    this.internals = this.attachInternals()
    this.internals.name = this.getAttribute('name')
    const shadow = this.attachShadow({ mode: 'closed' })

    const inputSwitch = document.createElement('div')
    inputSwitch.classList.add('input-switch')
    inputSwitch.innerHTML = `<input id='${this.internals.name}' type="checkbox" name="check-me" value="1" tabindex="0">
    <label class="knob" for='${this.internals.name}'>
      <div class="check-icon"></div>
    </label>`

    const inputElement = inputSwitch.querySelector('input')
    this.internals.inputElement = inputElement

    if (this.getAttribute('checked') !== null) {
      inputElement.setAttribute('checked', true)
    }

    if (this.getAttribute('disabled') !== null) {
      inputElement.setAttribute('disabled', true)
    }

    const style = document.createElement('style')

    style.textContent = `
      * {
        box-sizing: border-box;
      }
      .input-switch {
        --theme-primary: rgb(35, 165, 90);
        --theme-secondary: #80848e;
        --theme-intermediary: #648e7e;
        --sizeHeight: 38px;
        --sizeWidth: 69px;
        --circleSize: calc(var(--sizeHeight) * 0.8);
        --padding: 4px;

        width: var(--sizeWidth);
        height: var(--sizeHeight);

        &:has(input:disabled){
          pointer-events: none;
          opacity:.5;
          cursor: not-allowed;
        }
      }
      .input-switch label.stretch,
      .input-switch input:checked + label.stretch {
        --theme-secondary: var(--theme-intermediary);
      }
      .input-switch label {
        display: flex;
        width: 100%;
        height: 100%;
        background-color: var(--theme-secondary);
        position: relative;
        border-radius: 20px;
        align-items: center;
        padding: var(--padding);
        cursor: pointer;
        box-shadow: inset 1px 1px 2px #00000036;
      }
      .input-switch label.stretch .check-icon {
        width: calc(var(--sizeWidth) * 0.6);
        border-radius:17px
        box-shadow: 0 0 2px #00000036;
      }
      .input-switch label .check-icon {
        pointer-events: none;
        background-color: #fff;
        border-radius: 15px;
        width: var(--circleSize);
        height: var(--circleSize);
        transition: all 0.16s ease;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translate(0) rotate(0);
        box-shadow: 1px 1px 2px #00000036;
      }
      .input-switch label .check-icon:after,
      .input-switch label .check-icon:before {
        position: absolute;
        content: '';
        background-color: var(--theme-secondary);
        width: 3px;
        height: 15px;
        transition: all 0.16s ease;
        box-shadow: inset 1px 1px 2px #00000036;
      }
      .input-switch label .check-icon:after {
        transform: rotate(45deg);
      }
      .input-switch label .check-icon:before {
        transform: rotate(-45deg);
      }
      .input-switch input {
        opacity: 0;
        position: absolute;
      }
      .input-switch input:checked + label {
        --theme-secondary: var(--theme-primary);
        box-shadow: inset -1px 1px 2px #00000036;
      }
      .input-switch input:checked + label .check-icon {
        transform: translate(100%) rotate(0);
        box-shadow: -1px 1px 2px #00000036;
      }
      .input-switch input:checked + label .check-icon:after {
        transform: rotate(45deg) translate(90%, -5%);
      }
      .input-switch input:checked + label .check-icon:before {
        height: 6px;
        transform: rotate(-225deg) translate(177.5%, 20%);
      }
      .input-switch input:checked + label.stretch .check-icon {
        transform: translate(calc(100% - var(--sizeWidth) * 0.32)) rotate(0);
      }
    `

    shadow.appendChild(inputSwitch)
    shadow.appendChild(style)

    const inputSwitchActions = (el, state = {}) => {
      const hold = (e) => {
        state.holding = true
        e.target.classList.add('stretch')
      }
      const release = (e) => {
        state.holding = false
        e.target.classList.remove('stretch')
      }

      console.log('el :>> ', el)
      el.addEventListener('pointerdown', hold)
      el.addEventListener('pointerup', release)
      el.addEventListener('pointerout', release)
    }

    inputSwitchActions(inputSwitch)
  }

  get value() {
    return this.internals.inputElement.checked
  }

  get name() {
    return this.getAttribute('name')
  }

  static get observedAttributes() {
    return ['name', 'checked']
  }
}

customElements.define('input-switch', InputSwitch)
