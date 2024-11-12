// Открываем модальное окно
$("#search-manager").on("click tap", () => {
    $("#managers-filter-wrapper").css("display", "flex")
})

// При нажатие на обвертку модальное окно закрывается
$("#managers-filter-wrapper").on("click tap", (event) => {
    // Если клик непосредственно на обвертку
    if (event.target.id === "managers-filter-wrapper") {
        $("#managers-filter-wrapper").css("display", "none")
    }
})

let containerManagersHtml = "" // Уже отрендеренный код контейнера

// Включаем поиск по менеджерам
$("#managers-filter-submit").on("click tap", () => {
    // Поиск по менеджерам срабатывает при обновления поля Поиска
    if ($("#managers-filter-name").val() === "") {
        renderManagers()
    } else {
        if (!containerManagersHtml) { // Если поиск первый раз, то просто сохраняем код всего контейнера что бы потом по нему иска, а не рендерить заново
            containerManagersHtml = $("#container-managers .content").html()
        } else {
            $("#container-managers .content").html(containerManagersHtml)
        }

        $(".manager-container").addClass("hide")
        $(".manager-container").each((i, element) => { 
            // Если есть совпадение в поле Name, то отображается
            if ($(element).find(".js-input-name").val().toLowerCase().includes($("#managers-filter-name").val().toLowerCase())) {
                $(element).removeClass("hide")
            }

            // Если есть совпадение в поле Email, то отображается
            if ($(element).find(".js-input-email").val().toLowerCase().includes($("#managers-filter-name").val().toLowerCase())) {
                $(element).removeClass("hide")
            }
        })

        // Удаляем все не подходящие элементы
        $(".manager-container.hide").remove()
    }
    
    // Скрываем модальное окно
    $("#managers-filter-wrapper").css("display", "none")
})

$("#managers-filter-reset").on("click tap", () => {
    $("#managers-filter-name").val("")
})

// При нажатие на обвертку модальное окно закрывается
$("#managers-block-wrapper").on("click tap", (event) => {
    // Если клик непосредственно на обвертку
    if (event.target.id === "managers-block-wrapper") {
        $("#managers-block-wrapper").css("display", "none")
    }
})

// Если да, то меняем значение в бд
$("#managers-block-yes").on("click tap", (event) => {
    $("#managers-block-wrapper").css("display", "none")
    DBsetManagerActive(blockManagerId, (data) => {
        renderManagers()
    })
})

// Если нет, то просто закрываем модальное окно
$("#managers-block-no").on("click tap", (event) => {
    $("#managers-block-wrapper").css("display", "none")
})



// При нажатие на обвертку модальное окно закрывается
$("#managers-access-wrapper").on("click tap", (event) => {
    // Если клик непосредственно на обвертку
    if (event.target.id === "managers-access-wrapper") {
        $("#managers-access-wrapper").css("display", "none")
    }
})

// Если да, то меняем значение в бд
$("#managers-access-yes").on("click tap", (event) => {
    $("#managers-access-wrapper").css("display", "none")
    DBsetManagerAccess(accessManagerId, (data) => {
        renderManagers()
    })
})

// Если нет, то просто закрываем модальное окно
$("#managers-access-no").on("click tap", (event) => {
    $("#managers-access-wrapper").css("display", "none")
})