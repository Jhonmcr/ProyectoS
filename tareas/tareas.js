//crear los selectores
const user = JSON.parse(localStorage.getItem('user'));
const formulario = document.querySelector('#form-todos');
const lista = document.querySelector('#todos-list');
const inputF = document.querySelector('#form-input');
const cerrarBtn = document.querySelector('#cerrar-btn')

//console.log(user)
if(!user){
    window.location.href = '../home/index.html'
}

formulario.addEventListener('submit',async e =>{
    e.preventDefault();
    await fetch('http://localhost:3000/tareas',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({text:inputF.value,user:user.username})
    })
    
    //mostrar la lista de elementos en el HTML
    const listado = document.createElement('li');
    listado.innerHTML = `
        <li id=${lista.id} class="todo-item">
            <button class="delete-btn">&#10006;</button>
           ${inputF.value}
            <button class="check-btn">&#10003;</button>
        </li>
    `

    lista.appendChild(listado);
    inputF.value = '';
})

const obtenerLista = async ()=> {
    const respuesta = await fetch('http://localhost:3000/tareas',{method:'GET'});
    const list = await respuesta.json();
    const userList = list.filter(lista => lista.username === user.username)

    userList.forEach(lista => {
        const listado = document.createElement('li');
        listado.innerHTML = `
        <li class="todo-item">
            <button class="delete-btn">&#10006;</button>
            <p>${lista.checked ? 'class="check-todo"':null} ${lista.text}</p>
            <button class="check-btn">&#10003;</button>
        </li>
        `

        lista.appendChild(listado)
    });
}
obtenerLista();

lista.addEventListener('click',async e => {
    console.log(e.target)
    if (e.target.classList.contains('delete-btn')) {
        //eliminar esa linea/tarea
        const id = e.target.parentElement.id;

        const respuestaJSON = await fetch(`http://localhost:3000/tareas/${id}`,{method:'DELETE'});
        e.target.parentElement.remove();
    } else if (e.target.classList.contains('check-btn')){
        //CHECKEAR UNA TAREA
        const id = e.target.parentElement.id;
        const respuestaJSON = await fetch(`http://localhost:3000/tareas/${id}`,{
            method:'PATCH',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({checked:e.target.parentElement.classList.contains('check-todo')? false:true})
        });

        const response = await respuestaJSON.json();
        console.log(response);
        e.target.parentElement.classList.toggle('check-todo')
    }
})

cerrarBtn.addEventListener('click',async e =>{
    localStorage.removeItem('user');
    window.location.href = '../home/index.html'
})