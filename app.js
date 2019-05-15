let messageElement = document.getElementById("message");

function begin() {
    let gameID = -1;
    fetch("http://localhost:3003/?id=begin")
        .then((response) => {
            messageElement.innerText = "Ожидание соперника";
            return response.json();
        })
        .then((data) => {
            gameID = parseFloat(data.gameID);
        })
        .then(async () => {
            while (true) {
                let res = await fetch("http://localhost:3003/?id=waiting");
                let data = await res.json();
                gameID = parseFloat(data.gameID);
                if (gameID!=-1)
                    break;
            }
        })
        .then(() => {
            messageElement.innerText = "Игра началась"+gameID;
        })
}
