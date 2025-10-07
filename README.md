# Vue TypeScript Calculator

Простое приложение-калькулятор, построенное на Vue 3 с TypeScript, для расчета цены, количества и суммы товаров.

## 🚀 Особенности

- **Vue 3** с Composition API
- **TypeScript** для типобезопасности
- **Vite** для быстрой разработки
- **Автоматический деплой** на GitHub Pages
- **Логирование событий** в реальном времени
- **LocalStorage** для сохранения данных
- **Debounce** для оптимизации ввода

## 📋 Функциональность

- Ввод цены, количества и суммы
- Автоматический пересчет при изменении любого поля
- Сохранение данных в localStorage
- Логирование всех действий пользователя
- Симуляция отправки данных на сервер
- Отображение текущего состояния localStorage

## 🛠 Технологии

- **Vue 3.5.22** - прогрессивный JavaScript фреймворк
- **TypeScript 5.9.0** - типизированный JavaScript
- **Vite 7.1.7** - быстрый инструмент сборки
- **Vue TSC** - проверка типов для Vue компонентов

## 📦 Установка

```bash
# Клонирование репозитория
git clone https://github.com/MariaAfanasyevam/vue-project.git

# Переход в директорию проекта
cd vue-project

# Установка зависимостей
npm install
```

## 🚀 Запуск

```bash
# Режим разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview

# Проверка типов TypeScript
npm run type-check
```

## 🌐 Деплой

Приложение автоматически деплоится на GitHub Pages при каждом push в ветку `master`.

**Живая версия:** [https://mariaafanasyevam.github.io/vue-project/](https://mariaafanasyevam.github.io/vue-project/)

## 📁 Структура проекта

```
vue-project/
├── src/
│   ├── App.vue          # Главный компонент приложения
│   └── style/
│       └── style.css    # Стили приложения
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions для деплоя
├── package.json         # Зависимости и скрипты
├── tsconfig.json        # Конфигурация TypeScript
└── README.md           # Документация
```

## 🎯 Использование

1. **Ввод данных**: Введите цену, количество или сумму в соответствующие поля
2. **Автоматический расчет**: При изменении любого поля автоматически пересчитываются остальные
3. **Сохранение**: Нажмите кнопку "Сохранить" для сохранения данных в localStorage
4. **Просмотр логов**: Все действия отображаются в разделе "События"

## 🔧 Типизация TypeScript

Проект использует строгую типизацию:

```typescript
interface EventData {
  id: number;
  type: string;
  body: string;
  time: string;
}

interface LocalStorageData {
  counter: number;
  price: number;
  quantity: number;
  amount: number;
}

type InputField = "price" | "quantity" | "amount";
```

## 📝 Скрипты

- `npm run dev` - запуск dev сервера
- `npm run build` - сборка для продакшена
- `npm run preview` - предварительный просмотр сборки
- `npm run type-check` - проверка типов TypeScript

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/AmazingFeature`)
3. Зафиксируйте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Отправьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. См. файл `LICENSE` для получения дополнительной информации.

## 👨‍💻 Автор

**Maria Afanasyeva**
- GitHub: [@MariaAfanasyevam](https://github.com/MariaAfanasyevam)

---

⭐ Если этот проект был полезен, поставьте звезду!