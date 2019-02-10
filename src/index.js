


const dogUrl = 'http://localhost:3000/dogs'
const tableHead = document.querySelector("#table-head")


fetch(dogUrl)
.then(res => (res.json()))
.then(data => data.forEach(displayDogs))

function displayDogs(dog) {

	tableHead.innerHTML += `<tr><td>${dog.name}</td> <td> ${dog.breed} </td> <td>${dog.sex}</td> <td><button class="dog-class" data-id=${dog.id} '>Edit</button></td></tr>`
}




tableHead.addEventListener('click', (e) => {
	editDog(e)
})


let dogForm = document.getElementById('dog-form');

function editDog(e){
if(e.target.className === 'dog-class'){
	fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`)
	.then(res => res.json())
	.then( data => {
		dogForm.elements[0].value = data.name
		dogForm.elements[1].value = data.breed
		dogForm.elements[2].value = data.sex
		dogForm.dataset.id = data.id
		console.log(e.target.dataset.id)
	})


		dogForm.addEventListener('submit', (e) => {

		e.preventDefault()

	fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`, {
	      method: "PATCH",
	      headers: {
	        'Content-Type': 'application/json'
	      },
	      body: JSON.stringify({
	        "name": dogForm.elements[0].value, // name
	        "breed": dogForm.elements[1].value, // breed
	        "sex": dogForm.elements[2].value // sex
	      })
	    }).then(res => res.json())
			.then(data => {
				fetch(dogUrl)
				.then(res => res.json())
				.then(dogs => {
					const tableHead = document.querySelector("#table-head")
					tableHead.innerHTML = " "
					dogs.forEach(dog=> {
						tableHead.innerHTML += `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class="dog-edit" data-id="${dog.id}">Edit</button></td></tr>`
					})
				})
			})




})

}
}
