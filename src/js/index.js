import { useNavigation } from "./useNavigation.js";
import { renderProducts } from "./useProducts.js";
import { renderProductsForAdmin } from "./useTable.js";
import { Toast } from "./useToaster.js";
import { renderForm } from "./useForm.js";
// import { useOffCanvas } from "./useOffCanvas.js";
import "bootstrap/dist/js/bootstrap.js"

async function init() {
   const currentPage = window.location.pathname;
   const select = document.getElementById("categories");
   const tbody = document.getElementById("tbody");
	const addProduct = document.getElementById("add-product");

   // Проверяем, что мы находимся на нужной странице
   if (select && currentPage.endsWith("index.html")) {
      select.addEventListener("change", async (event) => {
         try {
            const category = event.target.value;
            await renderProducts(category === "Категории" ? "" : category);

            // Показываем уведомление об успешной загрузке
            new Toast('top-left', 3000, 'Данные загружены', 'success');
         } catch (error) {
            console.error("Ошибка при загрузке данных:", error.message);
            new Toast('top-left', 5000, 'Ошибка загрузки данных', 'danger');
         }
      });

      // Инициализация навигации и отрисовка продуктов
      useNavigation();
      renderProducts();
		// useOffCanvas();
   } else if (tbody && currentPage.endsWith("admin.html")) {
      try {
         await renderProductsForAdmin(tbody);
			addProduct.addEventListener("click", renderForm);
      } catch (error) {
         console.error("Ошибка при загрузке данных:", error.message);
         new Toast('top-left', 5000, 'Ошибка загрузки данных', 'danger');
      }
   }
}

init();