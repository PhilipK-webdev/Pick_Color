// Elements

const btnSubmit = document.querySelector(".btn-submit");
const userInput = document.querySelector(".user-input");
const form = document.querySelector(".form");
const dropdown = document.querySelector(".dropdown");
const success = document.querySelector(".success");
const body = document.querySelector('body');
const formContainer = document.querySelector(".form-container");
import { getAllUserDB, getColorDB, createUser, getCookie, setCookie, updateUser } from "../utils/utils.js";

async function init() {
    const cookieData = getCookie();
    if (Object.values(cookieData)[0] !== undefined) {
        const users = await getAllUserDB();
        const cookieObj = users.filter(us => us.name === cookieData.username);
        if (cookieObj.length > 0) {
            const html = `
            <option value=${cookieObj[0].id} class="option">${cookieObj[0].color}</option>
          `;
            userInput.value = cookieObj[0].name;
            document.querySelector(".label-name").innerHTML = `Welcome Back: ${cookieObj[0].name}`;
            formContainer.style.color = "black";
            body.style.backgroundColor = cookieObj[0].color.split(" ").slice(-1)[0];
            dropdown.insertAdjacentHTML('beforeend', html);
        }
    } else {
        const arrayObjColors = await getColorDB();
        arrayObjColors.map((color, i) => {
            const html = `
        <option value=${i} class="option">${color.name + " " + color.rgb + " " + color.hex}</option> `;
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

const validation = async (str, prom) => {
    success.style.opacity = 0;
    const regex = /[\u0590-\u05FF]/;
    const cookieData = getCookie();
    const users = await getAllUserDB();
    const cookieObj = users.filter(us => us.name === cookieData.username);
    if (regex.test(str)) {

        const OBJ_USER = {
            name: str,
            color: prom
        }
        if (Object.values(cookieData)[0] === undefined) {
            setCookie(OBJ_USER);
        } else if (cookieData.username === userInput.value && cookieData.color.split(" ").slice(-1)[0] !== prom.split(" ").slice(-1)[0]) {
            document.querySelector(".standard-select").innerHTML = `עודכן בהצלחה`
            document.querySelector(".option").innerHTML = `${prom.split(" ").slice(-1)[0]}`;
            document.querySelector(".standard-select").style.backgroundColor = "#98fb98";
            setCookie(OBJ_USER);
            OBJ_USER["id"] = cookieObj[0].id;
            updateUser(OBJ_USER);
            body.style.backgroundColor = prom.split(" ").slice(-1)[0];

        } else {
            setCookie(OBJ_USER);
        }
        if (cookieObj.length === 0) {
            await createUser(OBJ_USER);
            await location.reload();
            success.style.opacity = 100;
            success.innerHTML = "הרשמה התבצעה בהצלחה"
        } else {
            if (cookieObj[0].name !== userInput.value) {
                btnSubmit.disabled = true;
                await createUser(OBJ_USER);
                btnSubmit.disabled = false;
                setTimeout(() => location.reload(), 1000);
                document.querySelector(".standard-select").innerHTML = "Colors Select";
                document.querySelector(".label-name").innerHTML = `Full Name:`;
                success.style.opacity = 100;
                success.innerHTML = "הרשמה התבצעה בהצלחה"
            }
        }

    } else {
        document.querySelector(".standard-select").innerHTML = `שגיאת התחברות:ניתן להכניס רק אותיות בעברית`;
        document.querySelector(".standard-select").style.color = "rgb(193, 133, 197)";
        userInput.value = "";
        document.querySelector(".label-name").innerHTML = `Welcome Back`;
    }
}
const submitForm = (prom) => {
    btnSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        validation(userInput.value, prom);


    });
}

init();
