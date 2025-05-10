export class Toast {
	constructor(position, time = 5000, msg, type) {
		this.message = msg;
		this.time = time;
		this.position = position;
		this.type = type;//['danger','success', 'warning', 'info']
		this.toast = null;

		this.init();
	}

	init() {
		this.create();
		this.show(); 
	}

	create() {
		if (this.toast) return; 
		const el = document.createElement("div");
		el.classList.add(
			"toast",
			"note",
			"align-items-center",
			`text-bg-${this.type}`,
			`${this.position}`,
		);
		el.innerHTML = `
        <div class="d-flex">
           <div class="toast-body">
              ${this.message}
           </div>
           <button type="button" class="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button>
        </div>
     `;

		const closeButton = el.querySelector(".btn-close");
		closeButton.addEventListener("click", () => this.close());

		this.toast = el;
		return el;
	}

	show() {
		if (!this.toast) return; 
		document.body.appendChild(this.toast);
		this.toast.classList.add("show");
		setTimeout(() => this.close(), this.time);
	}

	close() {
		if (!this.toast) return; 
		this.toast.classList.remove("show");
		setTimeout(() => {
			this.toast.remove();
			this.toast = null;
		}, 300); 
	}

	reset() {
		this.close();
		this.toast = null; 
	}
}
