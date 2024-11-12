// Вставить email
$("#manager-email-insert").on("click tap", async () => {
    const text = await navigator.clipboard.readText()
    $("#manager-email").val(text)
    $(".new-manager__error").hide()
})

// Убираем ошибку при обновлении любого инпута
$(".new-manager").on("propertychange input", "input", () => {
    $(".new-manager__error").hide()
})

// Генерация пароля
$("#manager-pass-gen").on("click tap", () => {
    $("#manager-pass").val(Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8))
    $(".new-manager__error").hide()
})

$("#manager-email").change(() => { // Удаление пробелов
    $("#manager-email").val($("#manager-email").val().replace(/ /g,''))
})

$("#manager-pass").change(() => { // Удаление пробелов
    $("#manager-pass").val($("#manager-pass").val().replace(/ /g,''))
})

// Отправка формы нового менеджера
const newManagerForm = document.querySelector(".new-manager")
newManagerForm.addEventListener('submit', (event) => {
    // Отключение базового перехода
    event.preventDefault()
    

    // Отключаем кнопку на 5 секунды
    $("#new-manager-submit").attr("disabled", "disabled")
    setTimeout(() => {
        $("#new-manager-submit").removeAttr("disabled")
    }, 5000)


    // Получаем поля из фомы
    const formData = new FormData(newManagerForm)
    let formName = formData.get("manager-name").trim()
    let formEmail = formData.get("manager-email").trim()
    let formPass = formData.get("manager-pass").trim()

    if (formPass.length < 8) {
        inputError("#manager-pass")
        $(".new-manager__error").text(`Ошибка "Пароль меньше 8 символов"`)
        $(".new-manager__error").show()
        return
    }

    let reEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
    if (!reEmail.test(formEmail)) {
        inputError("#manager-email")
        $(".new-manager__error").text(`Ошибка "Неверный email"`)
        $(".new-manager__error").show()
        return
    }

    try {
        // Пробуем btoa
        let testBtoa = btoa(formEmail + ":" + formPass)
    } catch {
        // Если ошибка
        inputError("#manager-email")
        inputError("#manager-pass")
        $(".new-manager__error").text(`Ошибка "Используйте только англ. буквы и цифры"`)
        $(".new-manager__error").show()
    }

    formName = formName.split(" ")
    let managerName = formName.shift()
    let managerSurname = formName.join(" ")

    let newManager = {
        login: formEmail,
        password: formPass,
        name: managerName || "", // Если значение есть, то вставляем, иначе пустая строка
        surname: managerSurname || "", // Если значение есть, то вставляем, иначе пустая строка
        phone: "",
        is_active: true,
        is_admin: false
    }

    DBaddManager(newManager, (data) => {
        renderManagers()
    }, (error) => {
        // Если в итоге email не уникальный
        inputError("#manager-email")
        $(".new-manager__error").text(`Ошибка "Введенный email занят"`)
        $(".new-manager__error").show()
    })
})