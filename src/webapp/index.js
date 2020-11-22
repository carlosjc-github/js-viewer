const status = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
},
    methods = {
        DELET: 'delete',
        GET: 'get',
        POST: 'post',
        DELETE: 'delete'
    },
    selectors = {
        DIRECTORY_PATH_INPUT: '#directory-path',
        SEARCH_BUTTON: '#search',
        DIRECTORY_FILES_OUTPUT: '#directory-files',
    };


document.addEventListener("DOMContentLoaded", function (event) {
    onSearchDirectory();
});

function onSearchDirectory() {
    document.querySelector(selectors.SEARCH_BUTTON).addEventListener('click', () => {
        const path = document.querySelector(selectors.DIRECTORY_PATH_INPUT).value;

        sendRequest({
            method: methods.GET,
            url: `${window.location}rest/directory-files?path=${path}`,
        })
            .then(response => {
                const ul = document.createElement('ul'),
                    files = response ? response.split(',') : [],
                    outputDiv = document.querySelector(selectors.DIRECTORY_FILES_OUTPUT);
                let li = null;

                if (files.length === 0) {
                    outputDiv.textContent = 'Empty directory.';
                }
                else {
                    files.forEach(file => {
                        li = document.createElement('li');
                        li.textContent = file;
                        ul.appendChild(li);
                    });

                    outputDiv.innerHTML = '';
                    outputDiv.appendChild(ul);
                }
            });
    });
}

function sendRequest(request) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(request.method, request.url, true);

        xhr.onreadystatechange = function () {
            if (this.readyState !== 4) {
                return;
            }

            switch (this.status) {
                case status.OK:
                case status.CREATED:
                case status.NO_CONTENT:
                case status.NOT_FOUND:
                case status.CONFLICT:
                case status.INTERNAL_SERVER_ERROR:
                    resolve(this.response);
                    break;
                default:
                    reject(this.status);
                    throw new Error(`error : ${this.status} ${this.statusText}`);
            }
        };

        xhr.send();
    });
}
