const getAllUserDB = () => {
    const CONFIG = {
        method: "GET",
        dataType: "json"
    }
    const cookieData = getCookie();
    return new Promise((resolve, reject) => {
        fetch("/all", CONFIG).then(res => {
            if (res.status === 200) {
                res.json().then(response => {
                    resolve(response);
                });
            } else {
                body.style.backgroundColor = cookieData.color.split(" ").slice(-1)[0];
                const elem = ` 
                <h1 class="error">ERROR</h1>
                `
                formContainer.insertAdjacentHTML("afterbegin", elem);
                document.querySelector(".welcome").style.opacity = 0;
            }

        }).catch(err => reject(err));
    })
}

const setCookie = (value) => {
    const day = new Date();
    day.setTime(day.getTime() + (90 * 24 * 60 * 60 * 1000));
    let expires = `expires=${day.toUTCString()}`;
    document.cookie = `username=${value.name};${expires};path=/;`;
    document.cookie = `color=${value.color};${expires};path=/;`
}

const getCookie = () => {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [k, v] = el.split('=');
        cookie[k.trim()] = v;
    });
    return cookie;
}
const getColorDB = () => {
    const CONFIG = {
        method: "GET",
        dataType: "json"
    }
    return new Promise((resolve, reject) => {
        fetch("/all/color", CONFIG).then(res => {
            res.json().then(response => resolve(response));
        }).catch(err => reject(err));
    })
}

const createUser = (obj) => {
    return new Promise((resolve, reject) => {
        fetch("/create", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }
        ).then(res => {
            res.json().then(response => resolve(response));
        }).catch(err => reject(err));
    })
}

const updateUser = (obj) => {
    return new Promise((resolve, reject) => {
        fetch("/api/user/update", {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(res => {
            res.json().then(response => resolve(response));
        }).catch(err => reject(err));
    })
}


export { getAllUserDB, setCookie, getColorDB, createUser, getCookie, updateUser }