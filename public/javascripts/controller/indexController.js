app.controller("indexController", ['$scope', 'indexFactory', ($scope, indexFactory) => {
    // const socket = io.connect('http://localhost:3000')

    $scope.messages=[]


    $scope.init = () => {
        const userName = prompt('iltioms ismingizni yozing')
        if (userName) {
            initSocket(userName)
        }
        else {
            return false
        }
    }

    function initSocket(userName) {
        const connectOptions = {
            reconnectionAttemps: 3,
            reconnectionDelay: 600,

        }
        indexFactory.connectionSocket('http://localhost:3000', connectOptions)
            .then((socket) => {
                // console.log('boglanish bajarildi', socket);
                socket.emit('newUser', { userName })
                socket.on('newUsername' , (data)=>{
                    // console.log(data);
                    const messageData = {
                        type:0,
                        username:data.userName
                    }
                    $scope.messages.push(messageData);
                    $scope.$apply();
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

}])