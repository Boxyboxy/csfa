package ibf2021.assessment.csf.server.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

/* Write your request hander in this file */

@RestController
@RequestMapping(path = "/api/recipes", produces = MediaType.APPLICATION_JSON_VALUE)
public class RecipesRestController {

  @Autowired
  private RecipeService recipeService;

  @GetMapping()
  public ResponseEntity<String> getRecipesAsJson() {
    List<Recipe> recipes = recipeService.getAllRecipes();

    // build JsonArray of recipes
    final JsonArrayBuilder arrBuilder = Json.createArrayBuilder();

    recipes.stream().forEach(recipe -> arrBuilder.add(Json.createObjectBuilder()
        .add("id", recipe.getId())
        .add("name", recipe.getTitle())
        .build()));

    JsonArray recipesJsonArray = arrBuilder.build();

    return ResponseEntity.ok(recipesJsonArray.toString());

  }

}
