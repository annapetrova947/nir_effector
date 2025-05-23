# Тестирование и замеры производительности Effector-приложения

## Цель

Целью является замер производительности реализации на основе [Effector](https://effector.dev), включая:

- Время рендера и ререндера компонентов
- Использование оперативной памяти

## Реализация

В рамках проекта **замеры встроены непосредственно в интерфейс**. После того, как компоненты приложения отрендерены, появляется **всплывающее окно**, в котором отображаются:

- Время, затраченное на рендер
- Использованная память
- Количество ререндеров

Метрики генерируются динамически и позволяют в реальном времени наблюдать за производительностью приложения на `Effector`.

## Как протестировать

1. Запустите приложение:

   - Через Docker (`docker run -p 3000:80 effector-nir`)
   - Или локально (`npm start`)

2. Откройте браузер и перейдите по адресу:

```
http://localhost:3000
```

3. Наблюдайте за всплывающим окном:

   - Появляется после загрузки и рендера компонентов
   - Отображает ключевые метрики

4. Взаимодействуйте с интерфейсом (например, обновите стейт), чтобы посмотреть влияние на производительность.

## Примечания

- Замеры выполнены с использованием `performance.now()` и/или `window.performance.memory` (доступно в Chrome).
- Такой подход позволяет удобно демонстрировать эффективность реализации на защите или в отчёте по ВКР.