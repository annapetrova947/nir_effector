# Развёртывание проекта со стейт-менеджером Effector с использованием Docker

## Системные требования

- Docker: 20.10+ (или совместимый, например Podman)
- RAM: от 512 МБ (рекомендуется 1 ГБ+)
- CPU: 1+ ядро
- Поддержка Node.js в образе (в сборочном этапе)

## Шаги по сборке и запуску

1. Перейдите в директорию проекта:

```bash
cd effector_nir
```

2. Соберите Docker-образ:

```bash
docker build -t effector-nir .
```

3. Запустите контейнер:

```bash
docker run -p 3000:80 effector-nir
```

4. Откройте в браузере:

```
http://localhost:3000
```
