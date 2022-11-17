/* llamamos al formulario y asignamos un evento con el valor tipo submit y llamamos a la funcion */

document.querySelector(".form").addEventListener("submit", savetaks)

/* creamos la funcion que sera llamada al enviar el formulario */

function savetaks(e) {
  /* almacenamos en dos variables el titulo y la descripcion con el valor que contiene los campos */

  let title = document.querySelector("input").value
  let description = document.querySelector("textarea").value

  /* los valores que tiene los campos almacenados en las variables las convertimos en un objeto */

  const task = { title, description }

  /* Preguntamos si ya hay tareas en el localStorage, sino hay las agrega y si hay las actualiza */

  if (localStorage.getItem("tasks") === null) {
    let tasks = []
    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks))
  } else {
    let tasks = JSON.parse(localStorage.getItem("tasks"))
    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }

  /* agregamos la funcion que muestra en el DOM para que cada vez que se agregue una tarea se ejecute sin necesidad de recargar */

  getTask()

  /* cada que guardemos una tarea, haremos que el formulario se actualice */
  document.querySelector(".form").reset()
  e.preventDefault()
}

/* creamos una funcion para mostrar en el DOM las tareas agregadas */

function getTask() {
  /* Desde el localStorage pedimos las tareas y almacenamos en un variable */
  let tasks = JSON.parse(localStorage.getItem("tasks"))

  /* llamamos del HTMl el contenedor para almacenar las tareas y almacenamos en una variable*/
  let viewtasks = document.querySelector(".taks")

  /* dejamos los datos insertados en limpio en caso de que existan nuevos datos */
  viewtasks.innerHTML = ""

  /* empezamos a recorrer el array de las tareas */

  for (let i = 0; i < tasks.length; i++) {
    /* creamos dos variables que almacene el indice y la propiedad */

    let title = tasks[i].title
    let description = tasks[i].description

    /* empezamos a mostrar en pantalla las tareas por medio del innerHTML */

    viewtasks.innerHTML += `<div class="card" >
    <div class="card--body">
    <h2>${title}</h2>
    <p>${description}</p>

    <button class="remove" onclick="deleteTasks('${title}')">DELETE</button>
    </div>
    </div>`
  }
}

/* creamos un nuevo evento para borrar las tareas */
function deleteTasks(title) {
  let tasks = JSON.parse(localStorage.getItem("tasks"))

  /* recorremos las tareas para ver si hay alguna coincidencia y asi eliminarlas */

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title == title) {
      tasks.splice(i, 1)
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks))
  getTask()
}
/* llamamos a la funcion */
getTask()
