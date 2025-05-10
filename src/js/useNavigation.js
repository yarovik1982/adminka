export function useNavigation() {
   // Получаем все ссылки навигации
   const list = document.querySelectorAll('.nav-link');
   if (!list.length) return; // Если ссылок нет, завершаем функцию

   // Получаем текущий путь без первого слеша
   const currentPage = window.location.pathname
   // .split('/').filter(Boolean)[0] || 'index.html';
   console.log(currentPage);
   // console.log(window.location.pathname.endsWith);
   // Проходим по всем ссылкам
   list.forEach((link) => {
      // Извлекаем путь из атрибута href
      const linkPath = link.getAttribute('href').split('/').filter(Boolean)[0] || 'index.html';
      link.classList.remove('active'); // Удаляем класс active

      // Сравниваем текущий путь с путем ссылки
      if (linkPath === currentPage) {
         link.classList.add('active'); // Добавляем класс active
      }
   });

   return currentPage;
}