# Парсер ВК
### Назначение

Собирает список активных участников в группе ВКонтакте на основе их лайков и комментариев к постам.  
Лайки и комментарии каждого пользователя суммируются.
### Функции
✔️ Анализ лайков и комментариев за последние N постов  
✔️ Сортировка пользователей по активности  
✔️ Экспорт результатов в CSV  
✔️ Автоматическая обработка задержек VK API  
✔️ Поддержка поиска группы по ID или названию  

### Установка
Введите в терминале следующие команды:  
• для клонирования  репозитория
```sh
git clone https://github.com/FiloniJ/VKparser
```
• для установки необходимых пакетов
```sh
cd VKparser
npm install
```

### Использование
• для запуска проекта
```sh
npm start
```
После запуска откроется новое окно в браузере (обычно по адресу http://localhost:3000/)
1. Вставьте ссылку на группу ВК.
2. Укажите количество последних записей для парсинга (чем больше записей, тем дольше процесс).
3. Поставьте галочки по каким параметрам парсить (лайки, комментарии или всё вместе).
4. Нажмите «Начать парсинг».
5. Дождитесь окончания результатов парсинга.
6. Можете ознакомиться с результатами парсинга и сохраннить данные в файле CSV (кнопка «Сохранить данные»). При клике на имя открывает профиль этого человек в ВК.


Имеется готовый файл .env с токеном (чтобы вручную не получать собственный токен - для быстрой проверки работоспособности проекта).
### Особенности проекта
| Функция| Описание| 
|-----------------------|--|
|**Стек запросов**|Поочередная отправка запросов к VK API. При превышении лимита – автоматическая пауза.|
|**Экспорт данных**|	Сохранение результатов в CSV (с именами, ссылками и количеством лайков/комментариев).|
|**Гибкие фильтры**|Можно парсить только лайки, только комментарии или всё вместе.|
|**Поиск группы**|Поддержка поиска группы по ID или названию. Ошибка, если группа не найдена.|

### Возможные ошибки
**Неправильный токен** – убедитесь, что в .env указан корректный VK_TOKEN.  
**Закрытая группа** – парсер работает только с открытыми группами (с закрытыми если у вас есть доступ к этой группе). Не работает если вы заблокированы в данной группе.