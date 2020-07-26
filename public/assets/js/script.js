$(function () {

    $("#submit").on("click", (event) => {
        event.preventDefault();
        var newPost = {
            name: $("#name").val().trim(),
            message: $("#message").val().trim()
        }

        if (validInput(newPost.name) && validInput(newPost.message)) {
            $.ajax("/api/posts", {
                type: "POST",
                data: newPost
            }).then(() => {
                console.log("New Post submitted to DB");
                location.reload();
            })
        } else {
            alert("Post cannot have empty field")
        }

    })

    $(".delete-post").on("click", function (event) {
        event.preventDefault();
        var id = $(this).data("id");
        
        $.ajax("/api/posts/" + id, {
            type: "DELETE"
        }).then( () => {
            location.reload();
        })
    })

    $(".editBtn").on("click", function (event) {
        event.preventDefault();
        var id = $(this).data("id");

        $(`.editBtn[data-id = ${id}]`).addClass("is-hidden")
        $(`.cancelBtn[data-id = ${id}]`).removeClass("is-hidden")
        $(`.edit[data-id = ${id}]`).removeClass("is-hidden")

        $(`.media.container[data-id = ${id}]`).after(`
        <div class="field">
        <div class="control">
          <textarea class="textarea is-primary editMessage" data-id="${id}" name="editMessage"></textarea>
        </div>
      </div>`)

        
    })

    $(".cancelBtn").on("click", function () {
        var id = $(this).data("id");
        $(`.editBtn[data-id = ${id}]`).removeClass("is-hidden")
        $(`.cancelBtn[data-id = ${id}]`).addClass("is-hidden")
        $(`.edit[data-id = ${id}]`).addClass("is-hidden")

        var id = $(this).data("id");
        $(`textarea[data-id = ${id}]`).remove()
    })


    $(document).on("click", ".edit", function (event) {
        event.preventDefault();
        const editedMessage = $(".editMessage").val().trim()

        if (validInput(editedMessage)){
            const updatedPost = {
                message: editedMessage
            }
    
            var id = $(this).data("id");
    
            $.ajax("/api/posts/" + id, {
                type: "PUT",
                data: updatedPost
            }).then( () => {
                location.reload();
            })
        } else {
            alert("Post cannot have empty field")
        }
    
    })

})

function validInput(string) {
    if (string.trim() === "") return false
    else return true
}