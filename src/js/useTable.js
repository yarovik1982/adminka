import { getData } from "./useData.js";

const createTable = (product, fragment) => {
	const productItem = document.createElement("tr");
	productItem.innerHTML = `
      <th scope="row">${product.id}</th>
      <td>${product.title}</td>
      <td style="display:flex; align-items:center;">
         <div class="product-img flex-shrink-0">
            <img src="${product.img}" alt="${product.title}" />
         </div>
         <div class="product-src">${product.img}</div>
      </td>
      <td>${product.description}</td>
      <td>${product.price}</td>
      <td>
         <button class="btn btn-success btn-sm" data-id="${product.id}">Edit</button>
         <button class="btn btn-danger btn-sm" data-id="${product.id}">Delete</button>
      </td>
   `;
	fragment.appendChild(productItem);

	// Добавляем обработчики событий для кнопок "Edit" и "Delete"
	const editButton = productItem.querySelector(".btn-success");
	const deleteButton = productItem.querySelector(".btn-danger");

	editButton.addEventListener("click", () => handleEdit(product.id));
	deleteButton.addEventListener("click", () => handleDelete(product.id));
};

const handleEdit = (id) => {
	console.log(`Редактирование продукта с ID: ${id}`);
	// Добавьте логику для редактирования продукта
};

const handleDelete = (id) => {
	console.log(`Удаление продукта с ID: ${id}`);
	// Добавьте логику для удаления продукта
};

export const renderProductsForAdmin = async (tbody) => {
	try {
		const products = await getData();

		// Проверяем, что данные являются массивом
		if (!Array.isArray(products)) {
			throw new Error("Полученные данные не являются массивом");
		}

		const fragment = document.createDocumentFragment();
		products.forEach((product) => createTable(product, fragment));
		tbody.appendChild(fragment);
	} catch (error) {
		console.error("Ошибка при загрузке данных:", error.message);
		throw error; // Перебрасываем ошибку выше
	}
};
