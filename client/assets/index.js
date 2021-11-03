// Elements

const btnSubmit = document.querySelector(".btn-submit");
const userInput = document.querySelector(".user-input");
const form = document.querySelector(".form");
const dropdown = document.querySelector(".dropdown");
const validation = (str) => {
    const regex = /[\u0590-\u05FF]/;
}

console.dir(dropdown);
dropdown.addEventListener("click", async () => {

    // to Get all the colors from the DB
    const arrayObjColors = await getColorDB();
    arrayObjColors.map(color => {
        const html = `
        <option value=${color.name} class="option">${color.name}</option>
      `;
        dropdown.insertAdjacentHTML('beforeend', html);
    })

})
btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    validation(userInput.value)
});

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