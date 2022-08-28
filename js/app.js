const loadMeals = (search) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals))
    .catch((error) => console.log(error));
};

const displayMeals = (meals) => {
  const mealsContainer = document.getElementById("meals-container");
  mealsContainer.textContent = "";
  meals.forEach((meal) => {
    // console.log(meal);
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
    <div class="card">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p>${meal.strInstructions.slice(0, 150)}...</p> 
    </div>
    <button onclick="mealsDetails(${
      meal.idMeal
    })" class="btn btn-primary">Meal Details</button>
  </div>
    `;
    mealsContainer.appendChild(mealDiv);
  });
};

const searchMeals = () => {
  const searchInput = document.getElementById("search-input").value;
  loadMeals(searchInput);
};

const mealsDetails = (idMeal) => {
  //   console.log(idMeal);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealsDetails(data.meals[0]));
};

const displayMealsDetails = (meal) => {
  const mealDetail = document.getElementById("meal-detail");
  mealDetail.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
   <img src="${meal.strMealThumb}" class="card-img-top" alt="">
   <div class="card-body">
     <h5 class="card-title">${meal.strMeal}</h5>
     <p>${meal.strInstructions.slice(0, 200)}...</p> 
   </div>
    `;
  mealDetail.appendChild(div);
};

loadMeals("");
