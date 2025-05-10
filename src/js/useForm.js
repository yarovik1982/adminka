import axios from "axios";
import { getData } from "./useData.js";
import { Toast } from "./useToaster.js";

async function createForm() {
	const products = await getData();
	const form = document.createElement("form");
	form.innerHTML = `
      <div class="mb-3">
         <label for="id" class="form-label">ID товара</label>
         <input type="text" class="form-control form-control-sm" id="id" name="id" value="${
										products.length + 1
									}" readonly>
      </div>
      <div class="mb-3">
         <label for="name" class="form-label">Наименование товара</label>
         <input type="text" class="form-control form-control-sm" id="name" name="name">
      </div>
      <div class="mb-3">
         <label class="form-label" for="img">Фото товара</label>
         <input type="text" class="form-control form-control-sm" id="img" name="img">
      </div>
      <div class="mb-3">
         <label class="form-label" for="description">Описание товара</label>
         <input type="text" class="form-control form-control-sm" id="description" name="description">
      </div>
      <div class="mb-3">
         <label class="form-label" for="price">Цена товара</label>
         <input type="text" class="form-control form-control-sm" id="price" name="price">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    `;
	return form;
}
export async function renderForm() {
	const form = await createForm();
	const container = document.querySelector(".modal-body");
	container.innerHTML = "";
	container.appendChild(form);
	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		const data = new FormData(form);
		const newData = {};
		for (const [key, value] of data) {
			newData[key] = value;
		}
		await sendData(newData);
		window.location.reload();
	});
}
async function sendData(newData) {
	try {
		const response = await axios.post("http://localhost:3000/products", newData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.status === 200) {
			console.log(response.data);
			new Toast('top-right',3000,'Товар успешно добавлен','success')
		} else {
			console.log("Ошибка отправки данных");
			new Toast('top-right',3000,'Ошибка отправки данных','danger')
		}
	} catch (error) {
		console.error("Ошибка при отправке данных:", error);
	}
}
