let idU = window.localStorage.getItem("idU");


function showTemCmt(idUPost, idUser) {
    return `        <div class="social-comment">
                        <a href="" class="pull-left">
                            <img alt="image" src="https://bootdey.com/img/Content/avatar/avatar6.png">
                        </a>
                        <div class="media-body">
                        <form>
                            <textarea  id="content${idUPost}" class="form-control" placeholder="Write comment..."></textarea>
                            <button onclick="creatCmt(${idUPost},${idUser})" >Post</button>
                         </form>
                        </div>
                    </div>

                </div>

            </div>

        </div>

  </div>
   
`

}

function showUserPost(idUPost) {
    let str = ""
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/UserPost/findById${idUPost}`,
        //xử lý khi thành công
        success: function (UPost) {
            let date=new Date(UPost.postUser_time)
            str = `  <div class="col-md-7">
        <div class="social-feed-separated">
            <div class="social-avatar">
                <a href="">
                    <img alt="image" src="https://bootdey.com/img/Content/avatar/avatar1.png">
                </a>
            </div>

            <div class="social-feed-box">
                <div class="pull-right social-action dropdown">
                    <button data-toggle="dropdown" class="dropdown-toggle btn-white">
                        <i class="fa fa-angle-down"></i>
                    </button>
                    <ul class="dropdown-menu m-t-xs">
                        <li><a href="#">Config</a></li>
                    </ul>
                </div>
                <div class="social-avatar">
                    <a href="http://localhost:63342/Module4_case/html/PeoplePost.html" onclick="getUserDetail(${UPost.postUser_user.user_id})">
                        ${UPost.postUser_user.user_fullname}
                    </a>
                    <small class="text-muted">${date}</small>
                </div>
                <div class="social-body">
                    <p>
                        ${UPost.postUser_content} 
                    </p>
                    <img src="${UPost.postUser_img}" class="img-responsive">
                    <div class="btn-group">
                        <button onclick="likePost(idU,${idUPost})" class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like (${UPost.postUser_like})</button>
                        <button class="btn btn-white btn-xs" onclick="showCmtFull(${UPost.postUser_id})"><i class="fa fa-comments"></i> Comments (${UPost.postUser_numCmt})</button>
                        <button class="btn btn-white btn-xs" onclick="share(${UPost.postUser_id})"><i class="fa fa-share"></i> Share</button>
                    </div>
                </div>
                <div class="social-footer">`

        }
        ,
        async: false,
        error: function (err) {
            console.log(err)
        }
    })

    return str;
}

function showComment(idCmt) {
    let str = ""

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/UPC/findById${idCmt}`,
        //xử lý khi thành công
        success: function (cmt) {
            str = `<div class="social-comment">
                        <a href="" class="pull-left">
                            <img alt="image" src="https://bootdey.com/img/Content/avatar/avatar2.png">
                        </a>
                        <div class="media-body">
                            <a href="http://localhost:63342/Module4_case/html/PeoplePost.html" onclick="getUserDetail(${cmt.upc_user.user_id})">
                                ${cmt.upc_user.user_fullname}
                            </a>
                            ${cmt.upc_content}
                            <br>
                            <a href="#" class="small" onclick="likeCmt(idU,${idCmt})"><i class="fa fa-thumbs-up"></i> like(${cmt.upc_like})</a> -
                            <small class="text-muted" >12.06.2014</small>
                        </div>
                    </div> `


        },
        async: false,
        error: function (err) {
            console.log(err)
        }
    })

    return str
}

function showCmtFull(idPost) {
    showArrComment(idPost)

}

function showArrCmtFinal(idPost) {
    let str = `<div id="showCmtFull${idPost}"></div>`
    return str
}

function showArrComment(id) {
    let str = ""
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/UPC/findAllByPost${id}`,
        //xử lý khi thành công
        success: function (ArrCmt) {
            for (let i = 0; i < ArrCmt.length; i++) {
                str += showComment(ArrCmt[i].upc_id);
            }
            document.getElementById(`showCmtFull${id}`).innerHTML = str
        },

        error: function (err) {
            console.log(err)
        }
    })
}

function showArrCommentLimit(id) {
    let str = ""
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/UPC/findCmtLimit${id}`,
        //xử lý khi thành công
        success: function (ArrCmt) {
            for (let i = 0; i < ArrCmt.length; i++) {
                str += showComment(ArrCmt[i].upc_id);
            }
            document.getElementById(`showCmtFull${id}`).innerHTML = str
        },

        error: function (err) {
            console.log(err)
        }
    })


}


function showArrUPost(idUser) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/UserPost/findAllPostByFriend${idUser}`,
        //xử lý khi thành công
        success: function (ArrUPost) {

            let str = `<a href="PeoplePost.html" onclick="getUserDetail(idU)">Trang ca nhan</a>`
            for (let i = 0; i < ArrUPost.length; i++) {
                for (let j = 0; j < ArrUPost[i].length; j++) {
                    str += showUserPost(ArrUPost[i][j].postUser_id)
                    str += showArrCmtFinal(ArrUPost[i][j].postUser_id)
                    str += showTemCmt(ArrUPost[i][j].postUser_id, idUser)
                    showArrCommentLimit(ArrUPost[i][j].postUser_id)
                }
            }
            document.getElementById("ArrUPost").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })

}


showArrUPost(idU);

function showNameUser(idUser) {
    str = ""
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/user/findId${idUser}`,
        //xử lý khi thành công
        success: function (U) {
            str = U.user_fullname;

        }
        ,
        async: false,
        error: function (err) {
            console.log(err)
        }
    })
    return str
}

function notifi(idUser, title) {
    let UPC = {
        notifi_id: null,
        userTarget: {user_id: idUser},
        title: title

    }
    let url = `http://localhost:8080/Notifi/save`;
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
            console.log("thanhcong")
        },
        async: false,
        error: function (err) {
            console.log(err)
        }
    })
}

function creatCmt(idUPost, idUser) {
    let UPC = {
        upc_id: null,
        upc_content: document.getElementById(`content${idUPost}`).value,
        upc_like: 0,
        upc_dislike: 0,
        upc_user: {user_id: idUser},
        upc_postUser: {postUser_id: idUPost}
    }
    let contentCmt=document.getElementById(`content${idUPost}`).value
    let url = `http://localhost:8080/UPC/save`;
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
            $.ajax({
                type: "GET",
                url: `http://localhost:8080/UserPost/findById${idUPost}`,
                //xử lý khi thành công
                success: function (UPost) {
                    console.log("oke")
                    notifi(UPost.postUser_user.user_id, `${showNameUser(idUser)} comment :${contentCmt}  byPost  ${UPost.postUser_content}`)

                }
                ,
                async: false,
                error: function (err) {
                    console.log(err)
                }
            })

            showArrUPost(idU)
        },
        async: false,
        error: function (err) {
            console.log(err)
        }
    })
}

function islikePost(idUser, idPost) {
    let str = false
    let url = `http://localhost:8080/UPL/isLikePost${idUser},${idPost}`;
    $.ajax({
        headers: {
            'Accept': 'application/json'

        },
        type: "GET",
        url: url,
        //xử lý khi thành công
        success: function (data) {
            str = data
        },
        async: false,
        error: function (err) {
            console.log(err)
        }
    })
    console.log(str)
    return str
}

function incresaLike(idPost) {
    let url = `http://localhost:8080/UPL/increaseLikePost${idPost}`
    $.ajax({
        headers: {
            'Accept': 'application/json',
        },
        type: "POST",
        url: url,
        //xử lý khi thành công
        success: function (data) {

        },
        error: function (err) {
            console.log(err)
        }
    })
}

function decreaseLike(idPost) {
    let url = `http://localhost:8080/UPL/decreaseLikePost${idPost}`
    $.ajax({
        headers: {
            'Accept': 'application/json',
        },
        type: "POST",
        url: url,
        //xử lý khi thành công
        success: function (data) {

        },
        error: function (err) {
            console.log(err)
        }
    })
}

function likePost(idUser, idPost) {
    if (islikePost(idUser, idPost) == false) {
        incresaLike(idPost)
        let UPL = {
            upl_id: null,
            userPost: {postUser_id: idPost},
            user: {user_id: idUser}
        }
        let url = `http://localhost:8080/UPL/save`;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(UPL),
            type: "POST",
            url: url,
            //xử lý khi thành công
            success: function (data) {
                $.ajax({
                    type: "GET",
                    url: `http://localhost:8080/UserPost/findById${idPost}`,
                    //xử lý khi thành công
                    success: function (UPost) {
                        notifi(UPost.postUser_user.user_id, `${showNameUser(idUser)} like Post :${UPost.postUser_content}`)

                    }
                    ,
                    async: false,
                    error: function (err) {
                        console.log(err)
                    }
                })
            },
            async: false,
            error: function (err) {
                console.log(err)
            }
        })
        showArrUPost(idU)
    } else {
        decreaseLike(idPost)

        let url = `http://localhost:8080/UPL/deleteUPL${idUser},${idPost}`;
        $.ajax({
            headers: {
                'Accept': 'application/json'
            },
            type: "DELETE",
            url: url,
            //xử lý khi thành công
            success: function (data) {

            },
            async: false,
            error: function (err) {
                console.log(err)
            }
        })
        showArrUPost(idU)
    }
}


function islikeCmt(idUser, idCmt) {
    let str = false
    let url = `http://localhost:8080/UPCL/isLikeCmt${idUser},${idCmt}`;
    $.ajax({
        headers: {
            'Accept': 'application/json'

        },
        type: "GET",
        url: url,
        //xử lý khi thành công
        success: function (data) {
            str = data
        },
        async: false,
        error: function (err) {
            console.log(err)
        }
    })
    console.log(str)
    return str
}

function incresaLikeCmt(idCmt) {
    let url = `http://localhost:8080/UPCL/increaseLikeCmt${idCmt}`
    $.ajax({
        headers: {
            'Accept': 'application/json',
        },
        type: "POST",
        url: url,
        //xử lý khi thành công
        success: function (data) {
            console.log(idCmt)
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function decreaseLikeCmt(idCmt) {
    let url = `http://localhost:8080/UPCL/decreaseLikeCmt${idCmt}`
    $.ajax({
        headers: {
            'Accept': 'application/json',
        },
        type: "POST",
        url: url,
        //xử lý khi thành công
        success: function (data) {
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function likeCmt(idUser, idCmt) {
    if (islikeCmt(idUser, idCmt) == false) {
        incresaLikeCmt(idCmt)
        let UPCL = {
            upcl_id: null,
            userPostComment: {upc_id: idCmt},
            user: {user_id: idUser}
        }
        let url = `http://localhost:8080/UPCL/save`;
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(UPCL),
            type: "POST",
            url: url,
            //xử lý khi thành công
            success: function (data) {
                $.ajax({
                    type: "GET",
                    url: `http://localhost:8080/UPC/findById${idCmt}`,
                    //xử lý khi thành công
                    success: function (Cmt) {
                        notifi(Cmt.upc_user.user_id, `${showNameUser(idUser)} like Post :${Cmt.upc_content}`)

                    }
                    ,
                    async: false,
                    error: function (err) {
                        console.log(err)
                    }
                })
            },
            async: false,
            error: function (err) {
                console.log(err)
            }
        })
        showArrUPost(idU)
    } else {
        decreaseLikeCmt(idCmt)

        let url = `http://localhost:8080/UPCL/deleteUPCL${idUser},${idCmt}`;
        $.ajax({
            headers: {
                'Accept': 'application/json'
            },
            type: "DELETE",
            url: url,
            //xử lý khi thành công
            success: function (data) {

            },
            async: false,
            error: function (err) {
                console.log(err)
            }
        })
        showArrUPost(idU)
    }
}


function share(idUPost) {

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/UserPost/findById${idUPost}`,
        //xử lý khi thành công
        success: function (UPost) {
            if (idU != UPost.postUser_user.user_id) {
                let UPC = {
                    postUser_id: null,
                    postUser_content: `${UPost.postUser_user.user_fullname} Share post: ${UPost.postUser_content}`,
                    postUser_time: UPost.postUser_time,
                    postUser_img: UPost.postUser_img,
                    postUser_numCmt: 0,
                    postUser_isPublic: true,
                    postUser_like: 0,
                    postUser_dislike: 0,
                    postUser_user: {user_id: idU},
                }
                let url = `http://localhost:8080/UserPost/save`;
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
alert("share thanh cong")
                    },
                    error: function (err) {
                        console.log(err)
                    }
                })
            }else alert("Ban ko the share bai cua minh")
        },
        async: false,
        error: function (err) {
            console.log(err)
        }

    })

}

function getUserDetail(idUser) {
    let item = [idU, idUser]
    localStorage["itemIdUser"] = JSON.stringify(item)

}
