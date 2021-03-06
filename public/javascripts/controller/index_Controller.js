    app.controller("indexController", ['$scope', 'indexFactory','configFactory', ($scope, indexFactory, configFactory) => {     // Eng asosiy qisimlar yoziladi: : Client qismi 
        $scope.messages = [];
        console.log($scope.messages)
        // $scope.players = {};
        // $scope.$apply();
    
    function scrollTop () {
        setTimeout(() => {
            const el = document.querySelector(".chat_area");
            el.scrollTop = el.scrollHeight;
        })
    }

    $scope.init = () => {
        const username = prompt(`Iltimos Ismingizni yozing`); //aziz

        if(username){
            InitSocket(username)
        }
        else{
            return false
        }
    }
  async function InitSocket(username){
        const connectionOptions = {  // object 
            reconnectionAttempts: 3,
            reconnectionDelay: 600
        }

        const socketUrl = await configFactory.getConfig()

        // console.log(socketUrl.data.socketUrl);

        indexFactory.connectSocket(socketUrl.data.socketUrl, connectionOptions)
        .then((socket) => {
            // console.log("Boglanish amalga oshirildi", socket);

            socket.emit("newUser",  { username }) 


            // socket.on("initPlayers", (players) => {
            //     $scope.messages.push(players)
            //     $scope.$apply();
            //     pleyerColor =players
            // })
            
            socket.on("newUser", (data) => {
                // console.log(data);
                const messageData = {
                    type: {
                        code: 0, // server or user message
                        message: 1,
                          // login or disconnect
                    }, 
                    username: data.username ,
                    color:data.color
                }
                $scope.messages.push(messageData);
                $scope.$apply();
                //clientIshlashi uchun
            })

            // Chiqib Ketganda 
            socket.on("disUser", (user) => {
                const messageData = {
                    type: {
                        code: 0, // server or user message
                        message: 0 // login or disconnect
                    }, 
                    username: user.username ,
                    color:user.color
                }
                $scope.messages.push(messageData)
                $scope.$apply();
            })


            // Biz bekendan message qarshilavomiz

            socket.on("newMessage", message => {
                $scope.messages.push(message)
                $scope.$apply()
                scrollTop()
            })
           
            $scope.mobilClick =($event)=>{
                $('.navbar_nav').addClass('active')
                $('.backLink').fadeIn()
                $('#app').addClass('active')
            }
            $scope.backClick =($event)=>{
                $('.navbar_nav').removeClass('active')
                $('.backLink').fadeOut()
                $('#app').removeClass('active')

            }
            
            $scope.newMessage = () => {
                let message = $scope.message;
                const messageData = {
                    type: {
                        code: 1, 
                    }, 
                    username: username, // aziz
                    text: message,
                    color:randomColors()
                }
                $scope.messages.push(messageData);
                $scope.message = '';
                scrollTop()
                socket.emit("newMessage", messageData)
               
                


                // $scope.$apply();
            }   
           

        }).catch((err) => {
            console.log(err);
        })
    }
    
    
}])