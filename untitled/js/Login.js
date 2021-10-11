function convertIdU(idUser) {
    window.localStorage.setItem("idU", idUser)
    window.location.href("/html/FeedPost.html")
}

function loginFb() {

    let username = document.getElementById("username").value
    let password = document.getElementById("pass").value;
    let isSuccess;
    $.ajax({

        type: "GET",
        url: `http://localhost:8080/user/isSuccessLogin${username},${password}`,
        //xử lý khi thành công
        success: function (U) {
            isSuccess = U;
        },
        async: false,
        error: function (err) {
            console.log(err)
        }
    })
    if (isSuccess == true) {
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/user/findByIdLogin${username},${password}`,
            //xử lý khi thành công
            success: function (U) {
                convertIdU(U)
            },
            async: false,
            error: function (err) {
                console.log(err)
            }
        })
    } else {
        alert("sai user pass")
    }
}

function regis() {
    let username = document.getElementById("user").value
    let password = document.getElementById("passwo").value;
    let phone = document.getElementById("phone").value;
    let fullname = document.getElementById("fullname").value;
    let birthday = document.getElementById("birthday").value;
    let address = document.getElementById("address").value;

    let isDuplicate;
    $.ajax({

        type: "GET",
        url: `http://localhost:8080/user/isDupliUser${username}`,
        //xử lý khi thành công
        success: function (U) {
            isDuplicate = U;
        },
        async: false,
        error: function (err) {
            console.log(err)
        }
    })
    if (isDuplicate == true) {
        alert("bi trung username")
    } else {
        let UPC = {
            user_id: null,
            user_username: username,
            user_password: password,
            user_phone: phone,
            user_fullname: fullname,
            user_birthday: birthday,
            user_address: address

        }
        let url = `http://localhost:8080/user/save`;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(UPC),
            type: "POST",
            url: url,
            //xử lý khi thành công
            success: function (data) {
               alert("tao thanh cong")

            },
            async: false,
            error: function (err) {
                console.log(err)
            }
        })
    }
}
