document.getElementById("search").addEventListener("click", () => {
    document.getElementById("recipe").style.display = "none";
    const input = document.getElementById("keyword").value;
    apiRequest(input);
})



async function apiRequest(keyword) {
    const urlApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`;
    const apiLoad = await fetch(urlApi);
    apiResult(await apiLoad.json());
}



const apiResult = result => {
    let temp = '';
    result.meals.forEach(item => {
        const loadMeal = `
        <div onclick="mealRecipe('${item.strMeal}')" class="mealItem">
        <div>
            <img src="${item.strMealThumb}">
            <p>${item.strMeal}</p>
        </div>
        </div>
        `;
        temp += loadMeal;
    });
    document.getElementById("meal").innerHTML = temp;
}



const mealRecipe = data => {
    document.getElementById("recipe").style.display = "block";
    const urlRecipe = `https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`;
    fetch(urlRecipe)
        .then(apiResponse => apiResponse.json())
        .then(data => {
            const selectedMeal = data.meals[0];
            const loadRecipe = `
            <div class="recipeItem">
                <img style="width: 100%;" src="${selectedMeal.strMealThumb}">
                <h1>${selectedMeal.strMeal}</h1>
                <p>Ingredients</p>
                <ul style="list-style: none;">
                    <li><i class="fas fa-check-square"></i> ${selectedMeal.strMeasure1} - ${selectedMeal.strIngredient1}</li>
                    <li><i class="fas fa-check-square"></i> ${selectedMeal.strMeasure2} - ${selectedMeal.strIngredient2}</li>
                    <li><i class="fas fa-check-square"></i> ${selectedMeal.strMeasure3} - ${selectedMeal.strIngredient3}</li>
                    <li><i class="fas fa-check-square"></i> ${selectedMeal.strMeasure4} - ${selectedMeal.strIngredient4}</li>
                    <li><i class="fas fa-check-square"></i> ${selectedMeal.strMeasure5} - ${selectedMeal.strIngredient5}</li>
                    <li><i class="fas fa-check-square"></i> ${selectedMeal.strMeasure6} - ${selectedMeal.strIngredient6}</li>
                </ul>
            </div>
            `;
            document.getElementById("recipe").innerHTML = loadRecipe;
        })
}