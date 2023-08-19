const loginInput = document.querySelector('#login-input');
const formL = document.querySelector('#form-login');
const formC = document.querySelector('#form-create');
const createInput = document.querySelector('#create-input');
const notificacion = document.querySelector('.notification');

//crear los eventos
formC.addEventListener('submit',async e=>{
    e.preventDefault();
    const response = await fetch('http://localhost:3000/users',{
        method:'GET'
    });
    const users = await response.json();

    //validar si el usuario existe
    const user = users.find(user=>user.username === createInput.value);

    //console.log(!createInput.value)
    if(!createInput.value){
        //el campo esta vacio
        //console.log('El campo esta vacio');
        notificacion.innerHTML = 'El campo de usuario no puede estar vacio';
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },3000);
    }else if(user){
        //caso de que el usuario exista
        notificacion.innerHTML = 'El usuario ya existe';
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },3000)
    }else{
        await fetch('http://localhost:3000/users',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({username:createInput.value}),
        })
        notificacion.innerHTML = `El usuario ${createInput.value} ah sido creado`;
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification')
        },3000);

        createInput.value = '';
    }
})

formL.addEventListener('submit',async e =>{
    e.preventDefault();

    const response = await fetch('http://localhost:3000/users',{method:'GET'});
    const users = await response.json();

    //validar si el usuario existe
    const user = users.find(user=>user.username === loginInput.value);

    //console.log(user);
    if(!user){
        //caso de q no existe el usuario
        notificacion.innerHTML = 'El usuario no existe';
        notificacion.classList.add('show-notification');

        setTimeout(()=>{
            notificacion.classList.remove('show-notification');

        },3000)
    }else{
        //caso que el usuario existe
        //console.log('el usuario existe');
        localStorage.setItem('user',JSON.stringify(user));
        window.location.href = '../tareas/tareas.html';
    }
})