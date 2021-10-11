var itemReciept = JSON.parse(localStorage["itemIdUser"])
idU = itemReciept[0]
idUDetail = itemReciept[1]


function showTemCmt(idUPost, idUser) {
    return `<div class="card-block user-box">
                                                                    
                                                                    <div class="media">
                                                                        <a class="media-left" href="#">
                                                                            <img class="media-object img-radius m-r-20" src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Generic placeholder image">
                                                                        </a>
                                                                        <div class="media-body">
                                                                            <form class="">
                                                                                <div class="">
                                                                                    <textarea rows="5" cols="5" class="form-control" placeholder="Write Something here..." id="content${idUPost}"></textarea>
                                                                                    <div class="text-right m-t-20"><a onclick="creatCmt(${idUPost},${idUser})" href="#" class="btn btn-primary waves-effect waves-light">Post</a></div>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
</div>
</div>
</div>
</div>`

}

function showUserPost(idUPost) {
    let str = ""
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/UserPost/findById${idUPost}`,
        //xử lý khi thành công
        success: function (UPost) {
            var date=new Date(UPost.postUser_time)
            str = `<div class="social-timelines p-relative">
                                                    <div class="row timeline-right p-t-35">
                                                        <div class="col-2 col-sm-2 col-xl-1">
                                                            <div class="social-timelines-left">
                                                                <img class="img-radius timeline-icon" src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="">
                                                            </div>
                                                        </div>
                                                        <div class="col-10 col-sm-10 col-xl-11 p-l-5 p-b-35">
                                                            <div class="card">
                                                                <div class="card-block post-timelines">
                                                                    <span class="dropdown-toggle addon-btn text-muted f-right service-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" role="tooltip"></span>
                                                                    <div class="dropdown-menu dropdown-menu-right b-none services-list">
                                                                        <a class="dropdown-item" href="#">Remove tag</a>
                                                                        <a class="dropdown-item" href="#">Report Photo</a>
                                                                        <a class="dropdown-item" href="#">Hide From Timeline</a>
                                                                        <a class="dropdown-item" href="#">Blog User</a>
                                                                    </div>
                                                                    <div class="chat-header f-w-600">${UPost.postUser_user.user_fullname} posted on your timeline</div>
                                                                    <div class="social-time text-muted" >${date}</div>
                                                                </div>
                                                                <img src="${UPost.postUser_img}" class="img-fluid width-100" alt="">
                                                                <div class="card-block">
                                                                    <div class="timeline-details">
                                                                    
                                                                        <p class="text-muted">${UPost.postUser_content} </p>
                                                                    </div>
                                                                </div>
                                                                <div class="card-block b-b-theme b-t-theme social-msg">
                                                                    <a href="#" onclick="likePost(idU,${idUPost})"> <i class="icofont icofont-heart-alt text-muted"></i><span class="b-r-muted">Like (${UPost.postUser_like})</span> </a>
                                                                    <a href="#"  onclick="showCmtFull(${UPost.postUser_id})"> <i class="icofont icofont-comment text-muted"></i> <span class="b-r-muted">Comments (${UPost.postUser_numCmt})</span></a>
                                                                    <a href="#" onclick="share(${UPost.postUser_id})"> <i class="icofont icofont-share text-muted"></i> <span>Share (10)</span></a>
                                                               
                                                                   <div id="showButtonEdit${UPost.postUser_id}"></div>
                                                                   <div id="showButtonDelete${UPost.postUser_id}"</div>
                                                                </div>


`

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
            str = `  <div class="card-block">
       <div class="timeline-details">
     <div class="chat-header"><img class="media-object img-radius m-r-20" style="height: 30px;width: 30px" src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Generic placeholder image"><a href="http://localhost:63342/Module4_case/html/PeoplePost.html" onclick="getUserDetail(${cmt.upc_user.user_id})">${cmt.upc_user.user_fullname}</a></div>
      <p class="text-muted">${cmt.upc_content} <a href="#" onclick="likeCmt(idU,${idCmt})">like(${cmt.upc_like})</a> <div id="showButtonCmtEdit${idCmt}"></div><div id="showButtonCmtDelete${idCmt}"></div></p>
       </div>
        </div>`


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
    showButtonCmtDetail()

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
        url: `http://localhost:8080/UserPost/findAllByUser${idUser}`,
        //xử lý khi thành công
        success: function (ArrUPost) {

            let str = ""
            for (let i = 0; i < ArrUPost.length; i++) {
                str += showUserPost(ArrUPost[i].postUser_id)
                str += showArrCmtFinal(ArrUPost[i].postUser_id)
                str += showTemCmt(ArrUPost[i].postUser_id, idUser)
                showArrCommentLimit(ArrUPost[i].postUser_id)
            }
            document.getElementById("ArrUPost").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })
    showButton();
    showButtonCmtDetail()

}


showArrUPost(idUDetail);

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

        },
        async: false,
        error: function (err) {
            console.log(err)
        }
    })
}

function showInfo(idUser) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/user/findId${idUser}`,
        //xử lý khi thành công
        success: function (user) {

            let str = `<form>
                                                                    <table class="table table-responsive m-b-0">
                                                                        <tbody>
                                                                        <tr>
                                                                            <th class="social-label b-none p-t-0">Full Name
                                                                            </th>
                                                                            <td class="social-user-name b-none p-t-0 text-muted">${user.user_fullname}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th class="social-label b-none">Phone</th>
                                                                            <td class="social-user-name b-none text-muted">${user.user_phone}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th class="social-label b-none">Birth Date</th>
                                                                            <td class="social-user-name b-none text-muted">${user.user_birthday}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th class="social-label b-none">Address</th>
                                                                            <td class="social-user-name b-none text-muted">${user.user_address}</td>
                                                                        </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </form>`

            document.getElementById("showInfo").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })
}

showInfo(idUDetail)


function showArrImg(idUser) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/UserPost/findAllByUser${idUser}`,
        //xử lý khi thành công
        success: function (ArrUPost) {

            let str = ""
            for (let i = 0; i < ArrUPost.length; i++) {
                str += `<li class="col-md-4 col-lg-2 col-sm-6 col-xs-12">
                                                            <a href="#" data-toggle="lightbox" data-title="A random title" data-footer="A custom footer text">
                                                                <img src="${ArrUPost[i].postUser_img}" class="img-fluid" alt="" width="100%">
                                                            </a>
                                                        </li>`
            }
            document.getElementById("showImg").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })

}

showArrImg(idUDetail)

function showFriend(idUser) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/friend/findFriend${idUser}`,
        //xử lý khi thành công
        success: function (U) {

            let str = ""
            for (let i = 0; i < U.length; i++) {
                str += `<div class="col-lg-12 col-xl-6">
                                                <div class="card">
                                                    <div class="card-block post-timelines">
                                                        <span class="dropdown-toggle addon-btn text-muted f-right service-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" role="tooltip"></span>
                                                        <div class="dropdown-menu dropdown-menu-right b-none services-list">
                                                            <a class="dropdown-item" href="#">Remove tag</a>
                                                            <a class="dropdown-item" href="#">Report Photo</a>
                                                            <a class="dropdown-item" href="#">Hide From Timeline</a>
                                                            <a class="dropdown-item" href="#">Blog User</a>
                                                        </div>
                                                        <div class="media bg-white d-flex">
                                                            <div class="media-left media-middle">
                                                                <a href="#">
                                                                    <img class="media-object" width="120" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="">
                                                                </a>
                                                            </div>
                                                            <div class="media-body friend-elipsis">
                                                                <div class="f-15 f-bold m-b-5">${U[i].user_fullname}</div>
                                                                <div class="text-muted social-designation">${U[i].user_address}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`
            }
            document.getElementById("showFriend").innerHTML = str;
        },
        error: function (err) {
            console.log(err)
        }
    })
}

showFriend(idUDetail)

function creatCmt(idUPost, idUser) {
    let UPC = {
        upc_id: null,
        upc_content: document.getElementById(`content${idUPost}`).value,
        upc_like: 0,
        upc_dislike: 0,
        upc_user: {user_id: idUser},
        upc_postUser: {postUser_id: idUPost}
    }
    let contentCmt = document.getElementById(`content${idUPost}`).value

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
                    notifi(UPost.postUser_user.user_id, `${showNameUser(idUser)} comment:${contentCmt} By Post ${UPost.postUser_content}`)

                }
                ,
                async: false,
                error: function (err) {
                    console.log(err)
                }
            })
            showArrUPost(idUDetail)
        },
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
        showArrUPost(idUDetail)
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
        showArrUPost(idUDetail)
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
        showArrUPost(idUDetail)
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
        showArrUPost(idUDetail)
    }

}

function getUserDetail(idUser) {
    let item = [idU, idUser]
    localStorage["itemIdUser"] = JSON.stringify(item)
}

function share(idUPost) {
    if (idU != idUDetail) {
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/UserPost/findById${idUPost}`,
            //xử lý khi thành công
            success: function (UPost) {
                let UPC = {
                    postUser_id: null,
                    postUser_content: ` Post Share of ${UPost.postUser_user.user_fullname}: ${UPost.postUser_content}`,
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

                        showArrUPost(idU)
                    },
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
    } else {
        alert("Bạn ko thể share bài của mình")
    }
}

window.onload =
    function () {
    console.log(idUDetail)
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/friend/findFriend${idU}`,
            //xử lý khi thành công
            success: function (ListFri) {
                let check = false;
                for (let i = 0; i < ListFri.length; i++) {
                    if (idUDetail == ListFri[i]) {
                        check = true
                        break
                    }
                }
                if (check == false) {
                }

                document.getElementById("addFriend").innerHTML = `<a href="#" class="btn btn-primary waves-effect waves-light m-r-10" onclick="addfriend(idU,idUDetail)">AddFriend</a>`

            },
            async: false,
            error: function (err) {
                console.log(err)
            }

        })
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/user/findId${idUDetail}`,
            //xử lý khi thành công
            success: function (u) {
                console.log("avas")

                str1=`${u.user_fullname}`
                str2=`${u.user_address}`
                document.getElementById("showNamePage").innerHTML = str1;
                document.getElementById("showAddressPage").innerHTML = str2;

            },
            async:false,
            error: function (err) {
                console.log(err)
            }
        })

    }

window.onload = function () {
    console.log(idU)
    console.log(idUDetail)

}

function addfriendByListUnF(idU, idUTarget) {
    let UPC = {
        friend_id: null,
        friend_userSource: {user_id: idU},
        friend_userTarget: {user_id: idUTarget},
        friend_isAgree: false
    }
    let url = `http://localhost:8080/friend/save`;
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
            alert("Da gui loi moi ket ban")
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function addfriend() {

    let UPC = {
        friend_id: null,
        friend_userSource: {user_id: idU},
        friend_userTarget: {user_id: idUDetail},
        friend_isAgree: false
    }
    let url = `http://localhost:8080/friend/save`;
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
            alert("Da gui loi moi ket ban")
        },
        error: function (err) {
            console.log(err)
        }
    })
}

window.onload = function () {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/friend/findUnFriend${idU}`,
        //xử lý khi thành công
        success: function (List) {
            str = ""
            for (let i = 0; i < List.length; i++) {
                str += `<div class="card-block user-box">
                                            <div class="media m-b-10">
                                                <a class="media-left" href="#!">
                                                    <img class="media-object img-radius"
                                                         src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                         alt="Generic placeholder image" data-toggle="tooltip"
                                                         data-placement="top" title="" data-original-title="user image">
                                                    <div class="live-status bg-danger"></div>
                                                </a>
                                                <div class="media-body">
                                                    <div class="chat-header">${List[i].user_fullname}</div>
                                                    <div class="text-muted social-designation">${List[i].user_address}</div>
                                                    <button type="button" onclick="addfriendByListUnF(idU,${List[i].user_id})">AddFriend</button>
                     <x></x>                           </div>
                                            </div>

                                        </div>`
            }

            document.getElementById("listUnFr").innerHTML = str
        },
        error: function (err) {
            console.log(err)
        }

    })
}

function createPost() {
    let UPC = {
        postUser_id: null,
        postUser_content: document.getElementById("UPost_content").value,
        postUser_time: document.getElementById("UPost_date").value,
        postUser_img: document.getElementById("UPost_img").value,
        postUser_numCmt: 0,
        postUser_isPublic: document.getElementById("UPost_isPublic").value,
        postUser_like: 0,
        postUser_dislike: 0,
        postUser_user: {user_id: idU}
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
            alert("Tạo thành công")
        },
        error: function (err) {
            console.log(err)
        }
    })
    showArrUPost(idU)
}

function showButton() {
    if (idU == idUDetail) {
        console.log(idU)
        console.log(idUDetail)
        $.ajax({
            type: "GET",
            url: `http://localhost:8080/UserPost/findAllByUser${idU}`,
            //xử lý khi thành công
            success: function (ArrUPost) {
                strEdit = ""
                strDelete = ""

                for (let i = 0; i < ArrUPost.length; i++) {
                    strEdit = `
<p>
<a href="#" onclick="document.getElementById('editUPost${ArrUPost[i].postUser_id}').style.display='block'"> <i class="icofont icofont-share text-muted"></i> <span style="color: darkorchid">Edit</span></a>
    
</p>

<div id="editUPost${ArrUPost[i].postUser_id}" class="w3-modal">
    <div class="w3-modal-content w3-animate-zoom">
        <div class="w3-container w3-black w3-display-container">
            <span onclick="document.getElementById('editUPost${ArrUPost[i].postUser_id}').style.display='none'"
                  class="w3-button w3-display-topright w3-large">x</span>
            <h1>EDIT</h1>
        </div>
        
            <table class="table">
                <tr>
                                                           <td>Content<input id="UPost_content${ArrUPost[i].postUser_id}" value="${ArrUPost[i].postUser_content}"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Image<input id="UPost_img${ArrUPost[i].postUser_id}" value="${ArrUPost[i].postUser_img}"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Date<input id="UPost_date${ArrUPost[i].postUser_id}" value="${ArrUPost[i].postUser_time}"></td>
                                                            </tr>
                                                            <tr>
                                                                <td>Public Status<input id="UPost_isPublic${ArrUPost[i].postUser_id}" value="${ArrUPost[i].postUser_isPublic}"></td>
                                                            </tr> 
                                             
            <button type="submit" class="btn btn-success" onclick="editPost(${ArrUPost[i].postUser_id})" >Edit</button>
      
    </div>
</div>`
                    document.getElementById(`showButtonEdit${ArrUPost[i].postUser_id}`).innerHTML = strEdit;
                    strDelete = ` <a href="#" onclick="deleteUPost(${ArrUPost[i].postUser_id})"> <i class="icofont icofont-share text-muted"></i> <span style="color:red">Delete</span></a>`
                    document.getElementById(`showButtonDelete${ArrUPost[i].postUser_id}`).innerHTML = strDelete;
                }

            },
            error: function (err) {
                console.log(err)
            }
        })
    }
}

function editPost(idUPost) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/UserPost/findById${idUPost}`,
        //xử lý khi thành công
        success: function (UPost) {
            let UPC = {
                postUser_id: UPost.postUser_id,
                postUser_content: document.getElementById(`UPost_content${idUPost}`).value,
                postUser_time: document.getElementById(`UPost_date${idUPost}`).value,
                postUser_img: document.getElementById(`UPost_img${idUPost}`).value,
                postUser_numCmt: UPost.postUser_numCmt,
                postUser_isPublic: document.getElementById(`UPost_isPublic${idUPost}`).value,
                postUser_like: UPost.postUser_like,
                postUser_dislike: 0,
                postUser_user: {user_id: idU}
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
                    alert("Edit thành công")
                },
                error: function (err) {
                    console.log(err)
                }
            })
        },

        error: function (err) {
            console.log(err)
        }
    })
}

function deleteUPost(idUPost) {
    if (confirm("You are sure?")) {
        let url = `http://localhost:8080/UserPost/remove${idUPost}`;
        $.ajax({
            headers: {
                'Accept': 'application/json',

            },
            type: "DELETE",
            url: url,
            //xử lý khi thành công
            success: function (data) {
                alert("Delete thành công")
            },
            error: function (err) {
                console.log(err)
            }
        })
        showArrUPost(idU)
    }
}

function showButtonCmtDetail() {
    str = "";
    str1 = ""
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/UPC/findCmtByUser${idUDetail},${idU}`,
        //xử lý khi thành công
        success: function (Cmt) {

            for (let i = 0; i < Cmt.length; i++) {
                str = `<p>
<a href="#" onclick="document.getElementById('editCmt${Cmt[i].upc_id}').style.display='block'"> <i class="icofont icofont-share text-muted"></i> <span style="color: darkorchid">Edit</span></a>
    
</p>

<div id="editCmt${Cmt[i].upc_id}" class="w3-modal">
    <div class="w3-modal-content w3-animate-zoom">
        <div class="w3-container w3-black w3-display-container">
            <span onclick="document.getElementById('editCmt${Cmt[i].upc_id}').style.display='none'"
                  class="w3-button w3-display-topright w3-large">x</span>
            <h1>EDIT</h1>
        </div>
        
            <table class="table">
                <tr>
                                                           <td>Content<input id="Cmt_content${Cmt[i].upc_id}" value=${Cmt[i].upc_content}></td>
                                                            </tr>
                                                            
                                             
            <button type="submit" class="btn btn-success" onclick="editCmt(${Cmt[i].upc_id})" >Edit</button>
      
    </div>
</div>`

                if (document.getElementById(`showButtonCmtEdit${Cmt[i].upc_id}`) !== null) {
                    document.getElementById(`showButtonCmtEdit${Cmt[i].upc_id}`).innerHTML = str
                }

                str1 = `<a onclick="deleteCmt(${Cmt[i].upc_id})" style="color: #E2A917">Delete</a>`;
                if (document.getElementById(`showButtonCmtDelete${Cmt[i].upc_id}`) !== null) {
                    document.getElementById(`showButtonCmtDelete${Cmt[i].upc_id}`).innerHTML = str1
                }
            }
        },

        error: function (err) {
            console.log(err)
        }
    })
}

function editCmt(idCmt) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/UPC/findById${idCmt}`,
        //xử lý khi thành công
        success: function (cmt) {
            let UPC = {
                upc_id: cmt.upc_id,
                upc_content: document.getElementById(`Cmt_content${idCmt}`).value,
                upc_like: cmt.upc_like,
                upc_dislike: cmt.upc_dislike,
                upc_user: {user_id: cmt.upc_user.user_id},
                upc_postUser: {postUser_id: cmt.upc_postUser.postUser_id}

            }
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
                    alert("Edit thành công")
                    showArrUPost(idU)
                },
                error: function (err) {
                    console.log(err)
                }
            })
        },

        error: function (err) {
            console.log(err)
        }
    })
}

function deleteCmt(idCmt) {
    if (confirm("You are sure?")) {
        let url = `http://localhost:8080/UPC/remove${idCmt}`;
        $.ajax({
            headers: {
                'Accept': 'application/json',

            },
            type: "DELETE",
            url: url,
            //xử lý khi thành công
            success: function (data) {
                alert("Delete thành công")
            },
            error: function (err) {
                console.log(err)
            }
        })
        showArrUPost(idU)
    }
}

function showNoti() {

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/Notifi/findNotifiByUser${idU}`,
        //xử lý khi thành công
        success: function (Noti) {
            str = ""
            for (let i = 0; i < Noti.length; i++) {
                str += `<tr>
                         <td>${Noti[i].title}</td>
                         </tr><br>`
            }
            document.getElementById("showNotification").innerHTML = str

        }
        ,
        async: false,
        error: function (err) {
            console.log(err)
        }
    })
    document.getElementById('showNoti').style.display = 'block'
}

function showNotiFriend() {

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/friend/findAddFriend${idU}`,
        //xử lý khi thành công
        success: function (Noti) {
            str = ""
            for (let i = 0; i < Noti.length; i++) {
                str += `<tr>
                         <td>${Noti[i].friend_userSource.user_fullname}</td><td><button type="submit" class="btn btn-success" onclick="agreeFriend(${Noti[i].friend_userSource.user_id})" >Agree</button></td>
                         </tr><br>`
            }
            document.getElementById("showNotificationFriend").innerHTML = str

        }
        ,
        async: false,
        error: function (err) {
            console.log(err)
        }
    })
    document.getElementById('showNotiFriend').style.display = 'block'
}

function agreeFrSave(idSource, idTarget) {
    let UPC = {
        friend_id: null,
        friend_userSource: {user_id: idSource},
        friend_userTarget: {user_id: idTarget},
        friend_isAgree: true

    }
    let url = `http://localhost:8080/friend/save`;
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

        },
        error: function (err) {
            console.log(err)
        }
    })
}

function agreeFrEdit(idSource, idTarget) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/friend/findSourceAndTarget${idSource},${idTarget}`,
        //xử lý khi thành công
        success: function (User) {
            for (let i = 0; i < User.length; i++) {
                let UPC = {
                    friend_id: User[i].friend_id,
                    friend_userSource: {user_id: User[i].friend_userSource.user_id},
                    friend_userTarget: {user_id: User[i].friend_userTarget.user_id},
                    friend_isAgree: true
                }
                let url = `http://localhost:8080/friend/save`;
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

                    },
                    error: function (err) {
                        console.log(err)
                    }
                })
            }

        },

        error: function (err) {
            console.log(err)
        }
    })

}

function agreeFriend(idUser) {
agreeFrEdit(idUser,idU)
    agreeFrSave(idU,idUser)
}