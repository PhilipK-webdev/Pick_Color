// Elements

const btnSubmit = document.querySelector(".btn-submit");
const userInput = document.querySelector(".user-input");
const form = document.querySelector(".form");
const dropdown = document.querySelector(".dropdown");
const select = document.querySelector(".select");
const body = document.querySelector('body');
const formContainer = document.querySelector(".form-container");
async function init() {

    const cookieData = getCookie();
    if (Object.values(cookieData)[0] !== undefined) {
        const users = await getAllUserDB();
        const cookieObj = users.filter(us => us.name === cookieData.username);
        if (cookieObj.length > 0) {
            const html = `
            <option value=${cookieObj[0].id} class="option">${cookieObj[0].color}</option>
          `;
            userInput.value = "";
            document.querySelector(".label-name").innerHTML = `Welcome Back:${cookieObj[0].name}`
            dropdown.insertAdjacentHTML('beforeend', html);
        }
    } else {
        const arrayObjColors = await getColorDB();
        arrayObjColors.map((color, i) => {
            const html = `
        <option value=${i} class="option">${color.name + " " + color.rgb + " " + color.hex}</option>
      `;
            dropdown.insertAdjacentHTML('beforeend', html);
        });
        userInput.value = "";
    }
}

dropdown.addEventListener("click", async (e) => {
    e.stopPropagation();
    const arrayObjColors = await getColorDB();
    arrayObjColors.map((color, i) => {
        const html = `
    <option value=${i} class="option">${color.name + " " + color.rgb + " " + color.hex}</option>
  `;
        dropdown.insertAdjacentHTML('beforeend', html);
    });
    dropdown.onchange = function () {
        const selecetValue = this.options[this.selectedIndex].text;
        submitForm(selecetValue);
    };

});

const validation = (str, prom) => {
    const regex = /[\u0590-\u05FF]/;
    if (regex.test(str)) {
        const OBJ_USER = {
            name: str,
            color: prom
        }
        createUser(OBJ_USER);
        setCookie(OBJ_USER);
        userInput.value = "";
    }
}
const submitForm = (prom) => {
    btnSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        validation(userInput.value, prom);
    });
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

init();
