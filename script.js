const searchBox= document.querySelector('.searchBox');
const searchBtn= document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeContent = document.querySelector('.recipe-content');
const recipeClose = document.querySelector('.recipe-close-btn');

//Get recipes function
const fetchRecipes = async (query) =>{
    recipeContainer.innerHTML="<h2>Fetching recipes...</h2>"
    try{
const data =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
const response = await data.json();
recipeContainer.innerHTML="";
response.meals.forEach(meal=>{
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML=`
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
     <p><span>${meal.strArea}</span> Dish</p>
<p>Found in <span>${meal.strCategory}</span> Category</p>

    `
    const button = document.createElement('button');
    button.textContent = "See Recipe here";
    recipeDiv.appendChild(button);
// Adding EventListener to recipe button
button.addEventListener('click', ()=>{
    openRecipePopup(meal);
});
    recipeContainer.appendChild(recipeDiv);
});
}
catch(error){
recipeContainer.innerHTML="<h2>Error in fetching recipes...</h2>"
}
}
// Function to fetch ingredients and measurements
const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      if (ingredient) {
        const measure = meal[`strMeasure${i}`];
        ingredientsList += `<li>${measure} ${ingredient}</li>`;
      } else {
        break;
      }
    }
    return ingredientsList;
  };
  const openRecipePopup = (meal) => {
    recipeContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientsList">${fetchIngredients(meal)}</ul>
        <div class="instructions">
        <h3>Instructions:</h3>
        <p >${meal.strInstructions}</p></div>
    `;

    recipeContent.parentElement.style.display = "block";
};

recipeClose.addEventListener('click', () => {
    recipeContent.parentElement.style.display = "none";
});

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
      recipeContainer.innerHTML = '<h2>Type the meal in the search box.</h2>';
      return;
    }
    fetchRecipes(searchInput);
    console.log("Button clicked!");
});