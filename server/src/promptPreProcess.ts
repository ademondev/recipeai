import { nanoid } from "nanoid";

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
    recipe: string[];
    id: string
}

const extractRecipeDataFromResponse = (response: string): RecipeData | null => {
    const pattern: RegExp = /Recipe name:\s*(.+)\nApproximate cook time:\s*(\d+.*?)\nRequired ingredients:\s*(.*?)\nRecipe instructions:\s*(.*)/s;
    const match: RegExpExecArray | null = pattern.exec(response);

    if (match) {
        const recipeName: string = match[1];
        const cookTime: string = match[2];
        const ingredients: string[] = match[3].split(', ');
        const recipe: string[] = splitRecipeList(match[4]);

        console.log(`Recipe name: ${recipeName}`);
        console.log(`Cook time: ${cookTime}`);
        console.log(`Ingredients: ${ingredients}`);
        console.log(`Recipe: ${recipe}`);

        const recipeDataObject: RecipeData = {
            // nanoid provides a unique id for every recipe sent.
            // this id is used for easing use of Map in the saved 
            // recipes section of the app. In this case, nanoid(10)
            // returns a unique string id of length 10
            id: nanoid(10),
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

const splitRecipeList = (recipeList: string): string[] => {
    const regex = /\d+\.\s+/g; // Matches any number followed by a period and whitespace
    const steps = recipeList.split(regex); // Split the string by the regex pattern
    // Filter out any empty or whitespace-only strings
    return steps.filter((step) => step.trim().length > 0);
}
  

export { extractRecipeDataFromResponse };
export default promptPreProcess;
