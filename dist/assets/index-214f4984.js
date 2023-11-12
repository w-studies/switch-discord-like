(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();class d extends HTMLElement{constructor(){super(),this.internals=this.attachInternals(),this.internals.name=this.getAttribute("name");const n=this.attachShadow({mode:"closed"}),r=document.createElement("div");r.classList.add("input-switch"),r.innerHTML=`<input id='${this.internals.name}' type="checkbox" name="check-me" value="1" tabindex="0">
    <label class="knob" for='${this.internals.name}'>
      <div class="check-icon"></div>
    </label>`;const i=r.querySelector("input");this.getAttribute("checked")!==null&&i.setAttribute("checked",!0),this.getAttribute("disabled")!==null&&i.setAttribute("disabled",!0);const e=document.createElement("style");e.textContent=`
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
    `,n.appendChild(r),n.appendChild(e),((s,a={})=>{const h=o=>{a.holding=!0,o.target.classList.add("stretch")},l=o=>{a.holding=!1,o.target.classList.remove("stretch")};console.log("el :>> ",s),s.addEventListener("pointerdown",h),s.addEventListener("pointerup",l),s.addEventListener("pointerout",l)})(r)}get value(){return this.shadowRoot.querySelector("input").checked}get name(){return this.getAttribute("name")}static get observedAttributes(){return["name","checked"]}}customElements.define("input-switch",d);document.querySelector("form").onsubmit=function(c){console.log("e :>> ",c),c.preventDefault();const n=new FormData(this),r={};this.querySelectorAll("input-switch").forEach(i=>{n.append(i.name,i.value),r[i.name]=i.value}),fetch(this.getAttribute("action")||"",{method:"POST",body:n})};
