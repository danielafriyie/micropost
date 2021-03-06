class UI {
    constructor() {
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.formState = 'add';
    }

    showPosts(posts) {
        let output = '';
        posts.forEach((post) => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body}</p>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil-alt"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-times"></i>
                        </a>
                    </div>
                </div>
            `;
        });
        this.post.innerHTML = output;
        this.formState = 'add';
    }

    showAlert(msg, klass) {
        this.clearAlert();
        const div = document.createElement('div');
        div.className = klass;
        div.appendChild(document.createTextNode(msg));
        const container = document.querySelector('.postsContainer');
        const posts = document.querySelector('#posts');
        container.insertBefore(div, posts);
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearFields() {
        this.titleInput.value = this.bodyInput.value = '';
    }

    clearIdInput() {
        this.idInput.value = '';
    }

    changeFormState(state) {
        if (state === 'edit') {
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className = 'post-submit btn btn-warning btn-block';

            // create cancel button
            if (this.formState !== 'edit') {
                const button = document.createElement('button');
                button.className = 'post-cancel btn btn-light btn-block';
                button.appendChild(document.createTextNode('Cancel Edit'));
                const cardForm = document.querySelector('.card-form');
                const formEnd = document.querySelector('form-end');
                cardForm.insertBefore(button, formEnd);
            }
        } else {
            this.postSubmit.textContent = 'Post It';
            this.postSubmit.className = 'post-submit btn btn-primary btn-block';
            if (document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }
            this.clearIdInput();
            this.clearFields();
        }
    }

    fillForm(post) {
        this.idInput.value = post.id;
        this.titleInput.value = post.title;
        this.bodyInput.value = post.body;
        this.changeFormState('edit');
        this.formState = 'edit';
    }
}

export const ui = new UI();