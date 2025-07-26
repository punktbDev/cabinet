$("#open-card-conclusion").on("click tap", () => {
    // Передаем данные для аутентификации
    window.open("https://conclusion.intdata.ru?auth=" + btoa(userData.login + ":" + userData.password), "_blank")
})
