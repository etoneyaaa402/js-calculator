## JS Calculator
Простой одностраничный калькулятор на JavaScript, собираемый через Webpack.
**Homepage:** `https://etoneyaaa402.github.io/js-calculator`

## Task
https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit#heading=h.5dt3hghpa22f


## How to run the app
**Quick start**
- Установить зависимости:
```powershell
npm install
```
- Запустить локальный dev-сервер:
```powershell
npm start
```
- Собрать production-версию:
```powershell
npm run build
```

**Скрипты** (из `package.json`)

- `npm start` — запустить `webpack-dev-server` для разработки.
- `npm run build` — собрать production-бандл в `dist`.
- `npm run lint` / `lint:fix` — запустить/починить ESLint.
- `npm run deploy` — запускает `gh-pages -d dist`.

**Структура проекта**

- `package.json` — список зависимостей и npm-скриптов (build, start, deploy).
- `webpack.config.js` — конфигурация сборки Webpack (точка входа `src/index.js`, выход `dist/bundle.js`).
- `src/` — исходники приложения:
  - `index.html` — HTML-разметка.
  - `index.js` — основной JS-код приложения.
  - `styles/` — папка со стилями.
- `dist/` — собранные файлы. Содержит `index.html` и `bundle.js`.
- `node_modules/` — установленные пакеты.
