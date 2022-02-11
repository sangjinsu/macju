package routes

import (
	"Search/controllers"
	"github.com/gofiber/fiber/v2"
)

func SearchRoutes(app *fiber.App) {
	route := app.Group("/v1/search")

	route.Get("", controllers.Search)
}
