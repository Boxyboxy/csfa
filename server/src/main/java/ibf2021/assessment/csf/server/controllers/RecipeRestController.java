package ibf2021.assessment.csf.server.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;

import java.util.Optional;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

/* Write your request hander in this file */
@RestController
@RequestMapping(path = "/api/recipe", produces = MediaType.APPLICATION_JSON_VALUE)
public class RecipeRestController {

  private final Logger logger = Logger.getLogger(RecipeRestController.class.getName());

  @Autowired
  private RecipeService recipeService;

  @GetMapping(path = "{recipe_id}")
  public ResponseEntity<String> getRecipeAsJson(@PathVariable String recipe_id) {

    Optional<Recipe> optRecipe = recipeService.getRecipeById(recipe_id);

    if (optRecipe.isEmpty()) {
      JsonObjectBuilder errorBuilder = Json.createObjectBuilder()
          .add("error", "recipe not present");
      JsonObject errorJObj = errorBuilder.build();

      // defining response entity
      return new ResponseEntity<>(errorJObj.toString(), HttpStatus.BAD_REQUEST);

    } else {
      Recipe recipe = recipeService.getRecipeById(recipe_id).get();

      // build ingredients JsonArray
      JsonArrayBuilder ingredientsArrayBuilder = Json.createArrayBuilder();
      recipe.getIngredients().stream().forEach(ingredient -> ingredientsArrayBuilder.add(ingredient));
      JsonArray ingredientJArray = ingredientsArrayBuilder.build();

      // build JsonObject with recipe
      JsonObject recipeJObj = Json.createObjectBuilder()
          .add("id", recipe.getId())
          .add("title", recipe.getTitle())
          .add("image", recipe.getImage())
          .add("instruction", recipe.getInstruction())
          .add("ingredients", ingredientJArray)
          .build();

      return ResponseEntity.ok(recipeJObj.toString());

    }

  }

  @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<String> saveRecipe(@RequestBody Recipe recipe) {
    String id = recipe.getId();
    logger.info("ID from POST(JSON) >>>>> %s".formatted(id));

    recipeService.addRecipe(recipe);
    logger.info(recipe.toString());

    final JsonObject response = Json.createObjectBuilder()
        .add("message", "stored recipe into memory")
        .build();
    return ResponseEntity.status(HttpStatus.CREATED).body(response.toString());
  }

}