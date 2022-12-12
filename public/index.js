
window.onload=function(){


    var button = document.getElementById("ShortenButton");
    button.addEventListener("click", function () {
        var http = new XMLHttpRequest()
        http.onload = function () {
            if(this.status === 200) {
            document.getElementById("URLArea").value = JSON.parse(http.response).ShortenedURL
        }
            else {
                document.getElementById("URLArea").value = "Invalid URL Inputted."

            }
        }
        http.open("post", "http://localhost:3000/create", true)
        http.setRequestHeader("Content-Type", "application/json")
        http.send(JSON.stringify({"url" : document.getElementById("URLArea").value}))
    });
}

