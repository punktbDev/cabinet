// Ивент submit у формы входа
const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
    // Отключаем кнопку на 2 секунды
    $("#login-submit").attr("disabled", "disabled")
    setTimeout(() => {
        $("#login-submit").removeAttr("disabled")
    }, 2000)

    // Получаем поля из фомы
    const formData = new FormData(form)
    const formLogin = formData.get("login").trim()
    const formPassword = formData.get("password").trim()

    // Функция авторизации
    $.ajax({
        url: "https://punctb-service.ru/api/v1/login",
        method: "GET",
        headers: {
            "Authorization": "Basic " + btoa(formLogin + ":" + formPassword),
        },
        success: (data) => {
            data.login = formLogin
            data.password = formPassword

            // При успехе удаляем старые данные и сохраняем новые и переноси в кабинет
            localStorage.removeItem("userData")
            localStorage.setItem("userData", JSON.stringify(data))

            if (data.is_admin) {
                location.href = "/admin/"
            } else {
                location.href = "/"
            }
        },
        error: (error) => {
            inputError("#login-input")
            inputError("#password-input")

            // Ставим текст ошибки
            $("#login-error").addClass("show")
            setTimeout(() => {
                $("#login-error").removeClass("show")
            }, 2000)
        }
    })

    // Отключение базового перехода
    event.preventDefault()
})


// Кнопка "забыли пароль"
$("#forgot-password").on("click tap", () => {
    window.open("/forgot-password/", "_blank")
})


// Просмотр пароля у поля пароль
$("#password-show").on("click tap", () => {
    // По нажатию проверка, если инпут внутри с типом "Пароль", то меняется картинка и тип на "Текст"
    if ($("#password-input").attr("type") === "password") {
        $("#password-show").attr("src", "https://sun9-9.userapi.com/impg/QUqWeT558rMWZb9qXEnFINCBw9GeXUP7kfOABA/ffmOtqJTi_Y.jpg?size=20x20&quality=96&sign=e04699c99774ca3b38a39f486aa17b1a&type=album")
        $("#password-input").attr("type", "text")
        return
    }

    // Если тип "Текст", то возвращаем пароль и иконку открытого глаза
    $("#password-show").attr("src", "https://sun9-22.userapi.com/impg/dxnTH0YfbX30oSu95YgdwUBfTKQTNre2pR4spQ/RX2l5PyoxX4.jpg?size=20x20&quality=96&sign=97393bbce30213c930243aa178f6fbec&type=album")
    $("#password-input").attr("type", "password")
})