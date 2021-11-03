// Elements

const btnSubmit = document.querySelector(".btn-submit");
const userInput = document.querySelector(".user-input");
const form = document.querySelector(".form");
const dropdown = document.querySelector(".dropdown");
let bool = false;
const validation = (str, prom) => {
    const regex = /[\u0590-\u05FF]/;
    if (regex.test(str)) {
        prom.then(res => console.log(res))
        console.log(str);
    }
}

dropdown.addEventListener("click", async () => {

    // to Get all the colors from the DB
    const arrayObjColors = await getColorDB();
    arrayObjColors.map((color, i) => {
        const html = `
        <option value=${i} class="option">${color.name}</option>
      `;
        dropdown.insertAdjacentHTML('beforeend', html);
    });
    const selecetValue = getOption();
    submitForm(selecetValue)
})
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
const getOption = () => {
    return new Promise((resolve, reject) => {
        resolve(dropdown.options[dropdown.selectedIndex].text);
    })
}