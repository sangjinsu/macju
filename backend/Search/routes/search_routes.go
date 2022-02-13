package routes

import (
	"Search/controllers"
	"github.com/gofiber/fiber/v2"
)

func SearchRoutes(app *fiber.App) {
	route := app.Group("/v1/search")

	route.Get("name", controllers.SearchBeerName)
	route.Get("aroma", controllers.SearchAroma)
	route.Get("flavor", controllers.SearchFlavor)
	route.Get("type", controllers.SearchBeerType)
	route.Get("user", controllers.SearchUserHashTag)
}
