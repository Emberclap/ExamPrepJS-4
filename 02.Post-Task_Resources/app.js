window.addEventListener("load", solve);

function solve() {
    const [titleElement, categoryElement] = document.getElementsByTagName('input');
    const textareaElement = document.getElementById('task-content');
    const publishBtnElementt = document.getElementById('publish-btn');
    const reviewListElement = document.getElementById('review-list');
    const publishELement = document.getElementById('published-list');



    publishBtnElementt.addEventListener('click', taskCreator)


    function taskCreator() {
        if (titleElement.value === '' || categoryElement.value === '' || textareaElement.value === '') {
            return;
        }
        const title = titleElement.value;
        const category = categoryElement.value;
        const textarea = textareaElement.value;
        const articleElement = document.createElement('article');
        articleElement.innerHTML = `
       <h4>${titleElement.value}</h4>
       <p>Category: ${categoryElement.value}</p>
       <p>Content: ${textareaElement.value}</p>`

        const editBtnElement = document.createElement('button');
        editBtnElement.classList.add('action-btn', 'edit');
        editBtnElement.textContent = 'Edit';
        editBtnElement.addEventListener('click', () => {
            titleElement.value = title;
            categoryElement.value = category;
            textareaElement.value = textarea;
            liElement.remove()
        })
        const postBtnElement = document.createElement('button');
        postBtnElement.classList.add('action-btn', 'post');
        postBtnElement.textContent = 'Post';
        postBtnElement.addEventListener('click', () => {
            postCreator(title, category, textarea)
            reviewListElement.innerHTML = '';
        })

        const liElement = document.createElement('li');
        liElement.classList.add('rpost')
        liElement.appendChild(articleElement);
        liElement.appendChild(editBtnElement);
        liElement.appendChild(postBtnElement);
        reviewListElement.appendChild(liElement);

        titleElement.value = '';
        categoryElement.value = '';
        textareaElement.value = '';
    }
    function postCreator(title, category, textarea) {
        const articleElement = document.createElement('article');
        articleElement.innerHTML = `
       <h4>${title}</h4>
       <p>Category: ${category}</p>
       <p>Content: ${textarea}</p>`
        const liElement = document.createElement('li');
        liElement.classList.add('rpost')
        liElement.appendChild(articleElement);
        publishELement.appendChild(liElement);

    }
}   