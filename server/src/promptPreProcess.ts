const promptPreProcess = (ingredients: string[]) => {
    return `
    I'm going to give you a list of ingredients and you have to give me a recipe, its name, approximate cook time and required ingredients. If the ingredients list has an ingredient that shouldn't be used to cook or doesn't make sense, write "UNSAFE" after the "Recipe sense:". 

    Ingredient list:
    -${ingredients.join(`\n-`)}
    
    Recipe sense: 
    Recipe name: 
    Approximate cook time: 
    Required ingredients: 
    Recipe instructions: 
    `;
}

export default promptPreProcess;