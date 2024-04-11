window.addEventListener("load", solve);

function solve() {
    const baseUrl = 'http://localhost:3030/jsonstore/tasks';
    const loadBtnElement = document.getElementById('load-course');
    const courseListElement = document.getElementById('list');
    const [nameElement, typeElement, teacherNameElement] = document.getElementsByTagName('input');
    const dscrElement = document.getElementById('description');
    const addBtnElement = document.getElementById('add-course');
    const editButtonElement = document.getElementById('edit-course');

    let courseId;

    const courseLoader = async () => {
        const response = await fetch(baseUrl);
        const courseses = await response.json();

        courseListElement.innerHTML = '';

        for (const course of Object.values(courseses)) {
            const title = course.title;
            const teacher = course.teacher;
            const type = course.type;
            const description = course.description;
            const divElement = document.createElement('div')
            divElement.classList.add('container');
            divElement.innerHTML = `
            <h2>${course.title}</h2>
            <h3>${course.teacher}</h3>
            <h3>${course.type}</h3>
            <h4>${course.description}</h4>`

            const editBtnElement = document.createElement('button');
            editBtnElement.classList.add('edit-btn');
            editBtnElement.textContent = 'Edit Course';
            editBtnElement.addEventListener('click', () => {
                nameElement.value = title;
                typeElement.value = type;
                dscrElement.value = description;
                teacherNameElement.value = teacher;
                courseId = course._id;
                divElement.remove()
                addBtnElement.disabled = true;
                editButtonElement.disabled = false;
            })
            const finishBtnElement = document.createElement('button');
            finishBtnElement.classList.add('finish-btn');
            finishBtnElement.textContent = 'Finish Course';
            finishBtnElement.addEventListener('click', async () => {
                await fetch(`${baseUrl}/${course._id}`, {
                    method: 'DELETE'
                })

                courseLoader();
            })
            divElement.appendChild(editBtnElement);
            divElement.appendChild(finishBtnElement);
            courseListElement.appendChild(divElement);
        }
    }

    loadBtnElement.addEventListener('click', courseLoader)

    addBtnElement.addEventListener('click', async () => {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                title: nameElement.value,
                type: typeElement.value,
                description: dscrElement.value,
                teacher: teacherNameElement.value,
            })
        })
        if (!response.ok) {
            return;
        }
        clearInput()
        courseLoader();
    })
    editButtonElement.addEventListener('click', async () => {
        const response = await fetch(`${baseUrl}/${courseId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: nameElement.value,
                type: typeElement.value,
                description: dscrElement.value,
                teacher: teacherNameElement.value,
                _id: courseId,
            })
        })
        if (!response.ok) {
            return;
        }
        addBtnElement.disabled = false;
        editButtonElement.disabled = true;
        clearInput()
        courseLoader();
    })
    function clearInput() {
        nameElement.value = '';
        typeElement.value = '';
        dscrElement.value = '';
        teacherNameElement.value = '';
    }
}