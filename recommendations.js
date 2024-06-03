// Jaccard benzerlik fonksiyonu
function jaccardSimilarity(setA, setB) {
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return intersection.size / union.size;
  }
  
  // Öneri fonksiyonu
  function recommendSimilarMeals(favoriteMeal, allMeals) {
    let favoriteIngredients = new Set(favoriteMeal.ingredients);
    let recommendations = [];
  
    allMeals.forEach(meal => {
      if (meal.title !== favoriteMeal.title) {
        let mealIngredients = new Set(meal.ingredients);
        let similarityScore = jaccardSimilarity(favoriteIngredients, mealIngredients);
        if (similarityScore > 0) { // Eşik değeri
          recommendations.push({ meal: meal.title, score: similarityScore });
        }
      }
    });
    console.log('Recommendations:', recommendations);
    return recommendations.sort((a, b) => b.score - a.score);
  }
  
  module.exports = { jaccardSimilarity, recommendSimilarMeals };
  