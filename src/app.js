import {http} from './http';
import {ui} from "./ui";


function getPosts() {
    http.get('http://localhost:3000/posts')
        .then(data => ui.showPosts(data))
        .catch(err => ui.showAlert(err, 'alert alert-danger'));
}

function submitPost() {
    const title = document.querySelector('#title').value,
        body = document.querySelector('#body').value,
        id = document.querySelector('#id').value;
    if (title && body) {
        const post = {title, body};
        if (!id) {
            // create post
            http.post('http://localhost:3000/posts', post)
                .then(() => {
                    ui.showAlert('Post added!!!!!', 'alert alert-success');
                    ui.clearFields();
                })
                .catch(err => ui.showAlert(err, 'alert alert-danger'));
        } else {
            // update post
            http.put(`http://localhost:3000/posts/${id}`, post)
                .then(() => {
                    ui.showAlert('Post updated!!!!!', 'alert alert-success');
                    ui.changeFormState('add');
                })
                .catch(err => ui.showAlert(err, 'alert alert-danger'));
        }
        getPosts();

    } else {
        ui.showAlert('Pleaese fill all entries!', 'alert alert-danger')
    }
}

function deletePost(e) {
    if (e.target.parentElement.classList.contains('delete')) {
        const id = e.target.parentElement.dataset.id;
        if (confirm('Confirm Delete')) {
            http.delete(`http://localhost:3000/posts/${id}`)
                .then(() => {
                    ui.showAlert('Post removed!!!!', 'alert alert-success');
                    getPosts();
                })
                .catch(err => console.log(err));
        }
    }

    e.preventDefault();
}

function enableEdit(e) {
    const target = e.target;
    let parent;

    if (target.parentElement.classList.contains('edit')) {
        parent = target.parentElement;
    } else if (target.parentElement.parentElement.classList.contains('edit')) {
        parent = target.parentElement.parentElement;
    }

    if (parent) {
        const id = parent.dataset.id,
            title = parent.previousElementSibling.previousElementSibling.textContent,
            body = parent.previousElementSibling.textContent,
            post = {id, title, body};
        ui.fillForm(post);
    }

    e.preventDefault();
}

function cancelEdit(e) {
    if (e.target.classList.contains('post-cancel')) {
        ui.changeFormState('add');
    }
    e.preventDefault();
}

document.addEventListener('DOMContentLoaded', getPosts);
// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);
// listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);
// listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);
// listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);