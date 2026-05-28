# The Artisan Kiln — Форма заказа керамической плитки

SPA-интерфейс оформления заказа для авторской керамической плитки: адаптивный **mobile-first** checkout и **desktop**-макет в три колонки с **drag-and-drop сеткой 6×6** на Redux.

## Стек

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** — дизайн-токены через `@theme` в [`app/globals.css`](app/globals.css)
- **Redux Toolkit** — итоги корзины + состояние сетки (см. [`store/`](store/))
- **@dnd-kit** — перетаскивание плиток из палитры в сетку (desktop)
- **Framer Motion** — анимации строк и ячеек
- **Vitest** — unit-тесты для расчётов и валидации

## Бизнес-правила

- **Subtotal** = Σ(количество × цена за единицу) по всем строкам каталога (`data/tiles.ts`).
- **Shipping** = `$0`, если subtotal **`> $500`**, иначе **`$25`**.
- **Grand total** = subtotal + shipping.
- Валидация checkout-полей (**customer + card**) реализована в [`lib/validation.ts`](lib/validation.ts) (демо без backend).

### Локальный запуск

```bash
npm install
npm run dev        # http://localhost:3000
```

### Скрипты

| Команда | Назначение |
|---------|---------|
| `npm run dev` | запуск dev-сервера Turbopack |
| `npm run build` | production-сборка |
| `npm run lint` | ESLint (`eslint-config-next`) |
| `npm run test` | Vitest (calc / validation / cart slice) |
| `npm run test:watch` | Vitest в режиме watch |
| `npm run extract-decor` | нарезка декоративных ассетов из `design/*.png` в `public/decor/` (требуется `sharp`) |

## Структура проекта

- [`app/layout.tsx`](app/layout.tsx) — шрифты (Bebas Neue + Inter), глобальные провайдеры
- [`app/providers.tsx`](app/providers.tsx) — Redux `<Provider>`
- [`app/page.tsx`](app/page.tsx) — рендерит [`OrderPageShell`](components/order/OrderPageShell.tsx)
- [`components/order/MobileLayout.tsx`](components/order/MobileLayout.tsx) — мобильная колонка (customer → cart → payment)
- [`components/order/DesktopLayout.tsx`](components/order/DesktopLayout.tsx) — cart | design grid (lazy) | checkout
- [`components/checkout/`](components/checkout/) — `CheckoutProvider` с `state` / `actions` / `meta`; payment, toast и submit для обоих макетов
- [`components/order/DesignToolLazy.tsx`](components/order/DesignToolLazy.tsx) — `next/dynamic` подгружает DnD-инструмент только на desktop
- [`public/tiles/*.svg`](public/tiles/) — превью паттернов плитки
- [`public/decor/*.png`](public/decor/) — угловой и нижний декор, нарезанный из макетов

### Деплой

Рекомендуемый вариант — **[Vercel](https://vercel.com)** (push репозитория → New Project → фреймворк определяется автоматически). Переменные окружения для этого демо не обязательны.

## Примечания по согласованным вопросам ТЗ

Ниже — ответы заказчика на уточняющие вопросы и как это реализовано в проекте.

### 1) Валюта в UI и расчётах

В ТЗ изначально встречались евро, но заказчик подтвердил, что можно использовать любую валюту, и для совпадения с макетами нужно использовать **доллары ($)**.  
В проекте используются именно доллары: форматирование через `formatUSD` и расчеты в USD.

### 2) Tailwind CSS v4 и `tailwind.config.js`

Заказчик подтвердил: можно сделать оптимальным способом и добавить пояснение об отклонении.  
Проект создан на **Tailwind CSS v4**, где используется CSS-first подход через `@theme` в [`app/globals.css`](app/globals.css).  
Отдельный `tailwind.config.js` не добавлялся, чтобы не дублировать конфигурацию и не конфликтовать с пайплайном Tailwind v4.

### 3) Декоративная графика из макетов

Заказчик подтвердил, что декор нужно извлекать из PNG-макетов и подключать как статические изображения.  
В проекте декор нарезан из [`design/design_desktop.png`](design/design_desktop.png) и [`design/design_mobile.png`](design/design_mobile.png), затем подключен из [`public/decor/`](public/decor/).  
Для обновления ассетов используется скрипт [`scripts/extract-decor.mjs`](scripts/extract-decor.mjs).

---

Текст задания: [`ТЗ.md`](ТЗ.md), PNG-референсы: [`design/`](design/).
