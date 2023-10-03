
let input = document.getElementById('inputfield');
let submit = document.getElementById('sendmsg')
let msgcontainer = document.getElementsByClassName('maincontainer')[0];
let userss=document.getElementById('no')
let camera=document.getElementById('camera');
let camerainput=document.getElementById("inputcamera");



var socket = io()
let userName;

do {
  userName = prompt("Please enter your name:");
} while (!userName);
socket.emit('name',userName)



// ----> this portion is for image handling 


camera.addEventListener("click", function() {
    camerainput.click();
});



camerainput.addEventListener('change', function() {
    const file = camerainput.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function() {
            const dataUrl = reader.result;
            console.log(dataUrl)

            
            const img = document.createElement('img')
            

            img.src = dataUrl;
            socket.emit("image-broadcast",dataUrl);
            img.classList.add("user-side-image");

            msgcontainer.appendChild(img);

            img.addEventListener("click",function(){
                let photoimage=document.createElement('img');
                photoimage.src=dataUrl;
                photoimage.classList.add("big-photo");

                photoimage.classList.add("zoomed-photo")
                document.body.appendChild(photoimage)

                

                
                photoimage.addEventListener("click", function() {
                    document.body.removeChild(photoimage);
                });
            
            
            
            
            });

            
        };

        reader.readAsDataURL(file);
    }
});



socket.on("broadcast-image",function(value){
    const img = document.createElement('img')
            

    img.src = value;
    img.classList.add("br-side-image");

    msgcontainer.appendChild(img);

    img.addEventListener("click",function(){
        let photoimage=document.createElement('img');
        photoimage.src=value;
        photoimage.classList.add("big-photo");

        photoimage.classList.add("zoomed-photo")
        document.body.appendChild(photoimage)

        

        
        photoimage.addEventListener("click", function() {
            document.body.removeChild(photoimage);
        });

})
})


// -----> 

socket.on('name_br',function(value){
    let joined_block=document.createElement('div');
    joined_block.classList.add('msg3');
    joined_block.innerHTML=value+" connected";
    msgcontainer.appendChild(joined_block);
})



socket.on('disc',function(value){
    let joined_block=document.createElement('div');
    joined_block.classList.add('msg3');
    joined_block.innerHTML=value+" disconnected";
    msgcontainer.appendChild(joined_block);
})



socket.on('no_of_users',function(value){
    userss.innerHTML=`${value}`;
})



function sendMessage(){
    let date = new Date();
    let hour = date.getHours();
    let minutes=date.getMinutes();
    let newelement = document.createElement('div');
    newelement.classList.add("msgs");
    let suraj=input.value;
    newelement.innerHTML=`<p class='name-of-user'>${userName}</p>${suraj}<p class='time'>${hour}:${minutes}</p>`;
    input.value="";
    socket.emit("user_name",`<p class='name-of-user'>${userName}</p>${suraj}<p class='time'>${hour}:${minutes}</p>`);
    msgcontainer.appendChild(newelement)
    

}


submit.addEventListener('click', sendMessage);



input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});


socket.on('broadcast',function(value){
    let broadelement = document.createElement('div');
    broadelement.classList.add("msgs2");
    broadelement.innerHTML=value;
    msgcontainer.appendChild(broadelement)
})