import { getData } from "./useData.js";
import { useNavigation } from "./useNavigation.js";

const createProductCard = (product, fragment) => {
	const currentCategory =
		product.category === "men"
			? "Товары для мужчин"
			: product.category === "women"
			? "Товары для женщин"
			: product.category === "child"
			? "Товаря для детей"
			: "Другие товары";
	const productCard = document.createElement("div");
	productCard.className = "col";
	productCard.innerHTML = `
       <div class="card h-100 item">
               <div class="item-header">
                  <img
                     src="${product.img}"
                     class="card-img-top" alt="${product.title}">
               </div>
               <div class="item-body card-body">
                  <h5 class="card-title">${product.title}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text">${currentCategory}</p>
                  <p class="card-text">${product.price} $</p>
               </div>
               <div class="item-footer card-footer">
                  <button class="btn btn-primary btn-sm" data-id="${product.id}">В корзину</button>
               </div>
            </div>
    `;
	fragment.appendChild(productCard);
};

export const renderProducts = async (category = "") => {
	const page = useNavigation();
	if (page !== "index.html") {
		return;
	} else {
		try {
			const products = await getData(category);
			const productsContainer = document.getElementById("products-container");
			productsContainer.innerHTML = "";

			const fragment = document.createDocumentFragment();

			products.forEach((product) => {
				createProductCard(product, fragment);
			});
			productsContainer.appendChild(fragment);
			// здесь будет обработчик событий для кнопки добавления товара в корзину
		} catch (error) {
			console.error("Ошибка при отрисовке продуктов:", error.message);
		}
	}
};
