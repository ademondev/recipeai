const promptPreProcess = (ingredients : string[]) => {
    return `
    I'm going to give you a list of ingredients and you have to give me a recipe, its name, approximate cook time and required ingredients. If the ingredients list has an ingredient that shouldn't be used to cook or doesn't make sense, write "UNSAFE" after the "Recipe sense:". 

    Ingredient list:
    -${
        ingredients.join(`\n-`)
    }
    
    Recipe sense: 
    Recipe name: 
    Approximate cook time: 
    Required ingredients: 
    Recipe instructions: 
    `;
}

interface RecipeData {
    recipeName: string; 
    cookTime: string; 
    ingredients: string[];
    recipe: string;
}

const extractRecipeDataFromResponse = (response: string): RecipeData | null => {
    const pattern: RegExp = /Recipe name:\s*(.+)\nApproximate cook time:\s*(\d+.*?)\nRequired ingredients:\s*(.*?)\nRecipe instructions:\s*(.*)/s;
    const match: RegExpExecArray | null = pattern.exec(response);

    if (match) {
        const recipeName: string = match[1];
        const cookTime: string = match[2];
        const ingredients: string[] = match[3].split(', ');
        const recipe: string = match[4];

        console.log(`Recipe name: ${recipeName}`);
        console.log(`Cook time: ${cookTime}`);
        console.log(`Ingredients: ${ingredients}`);
        console.log(`Recipe: ${recipe}`);

        const recipeDataObject: RecipeData = {
            recipeName,
            cookTime,
            ingredients,
            recipe
        }
        return recipeDataObject;
    } else {
        return null;
    }
}

export { extractRecipeDataFromResponse };
export default promptPreProcess;
