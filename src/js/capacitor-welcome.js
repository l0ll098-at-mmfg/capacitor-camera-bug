import { Camera } from '@capacitor/camera';

window.customElements.define("app-toolbar", class extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          min-height: env(safe-area-inset-top);
          max-height: env(safe-area-inset-top);
          background-color: #73B5F6;
        }
      </style>
      <div></div>
    `;
  }
});

window.customElements.define("camera-demo", class extends HTMLElement {

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>
        :host {
          overflow-y: auto;
        }

        button {
          display: inline-block;
          padding: 10px;
          background-color: #73B5F6;
          color: #fff;
          font-size: 0.9em;
          border: 0;
          border-radius: 3px;
          text-decoration: none;
          cursor: pointer;
        }

        main {
          padding: env(safe-area-inset-top) 1rem 4rem 1rem;
        }

        .code {
          font-family: monospace;
        }

        #images {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        #images img {
          width: 33%;
          aspect-ratio: 1/1;
        }
      </style>

      <div>
        <main>
          <p>
            Demo app to show that results from <span class="code">Camera.pickImages</span> are not stable, as described in issue <a href="https://github.com/ionic-team/capacitor-plugins/issues/1950">#1950</a>.
          </p>
          <p>
            Steps to reproduce the issue:
            <ul>
              <li>Click button "Pick images"</li>
              <li>Allow full access to gallery when asked</li>
              <li>
                Select a bunch of images. The more you select, the more obvious the problm is.<br>
                <b>Note: keep in mind in which order you select those images!</b>
              </li>
              <li>Wait until selected images are shown below the button</li>
              <li>
                Take a look at displayed images and, more specifically, the order in which they are shown.
                You should see them in a random order and, if you repeat this process multiple times while keeping the same selection order, you should see that results are shown in different orders each time.<br>
                <b>Note: you may need to repeat this process multiple times, especially if you are using just a few images</b>
              </li>
            </ul>
          </p>
          <button id="pickImages">Pick images</button>

          <div id="images"></div>
        </main>
      </div>
    `;
  }


  connectedCallback() {
    this.shadowRoot.querySelector("#pickImages").addEventListener("click", () => this.pickImages());
  }

  async pickImages() {
    const photosDiv = this.shadowRoot.querySelector("#images");
    photosDiv.innerHTML = "";

    try {
      const { photos } = await Camera.pickImages({
        quality: 100,
      });

      console.log(photos);

      for (const photo of photos) {
        photosDiv.innerHTML += `<img src="${photo.webPath}"></img>`;
      }
    } catch (e) {
      alert('User cancelled');
    }
  }
});
