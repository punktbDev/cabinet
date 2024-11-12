// Получить актуальную информацию о профиле
function DBgetUserData(func, func_error) {
    $.ajax({
        url: "https://punctb-service.ru/api/v1/manager",
        method: "GET",
        headers: {
            "Authorization": "Basic " + btoa(userData.login + ":" + userData.password)
        },
        success: func,
        error: func_error
    })
}    

// Обновить информацию о пользователе
function DBchangeUserData(data, func, func_error) {
    $.ajax({
        url: "https://punctb-service.ru/api/v1/manager",
        method: "PUT",
        headers: {
            "Authorization": "Basic " + btoa(userData.login + ":" + userData.password)
        },
        data: JSON.stringify(data),
        success: func,
        error: func_error
    })
}

// Получить актуальную информацию о клиентах менеджера
function DBgetClients(func) {
    $.ajax({
        url: "https://punctb-service.ru/api/v1/clients",
        method: "GET",
        headers: {
            "Authorization": "Basic " + btoa(userData.login + ":" + userData.password)
        },
        success: func
    })
}

// Установить клиента просмотренным
function DBsetClientChecked(data, func) {
    $.ajax({
        url: "https://punctb-service.ru/api/v1/client/is-new",
        method: "POST",
        headers: {
            "Authorization": "Basic " + btoa(userData.login + ":" + userData.password)
        },
        data: JSON.stringify(data),
        success: func
    })
}

// Установить клиента в архив или обратно
function DBsetClientArchive(data, func) {
    $.ajax({
        url: "https://punctb-service.ru/api/v1/client/is-archive",
        method: "POST",
        headers: {
            "Authorization": "Basic " + btoa(userData.login + ":" + userData.password)
        },
        data: JSON.stringify(data),
        success: func
    })
}