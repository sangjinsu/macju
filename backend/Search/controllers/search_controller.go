package controllers

import (
	"Search/queries"
	"Search/utils/loaddotenv"
	"Search/utils/searchtag"
	"fmt"
	"github.com/gofiber/fiber/v2"
)

var searchTag = searchtag.New().Addresses(loaddotenv.LoadDotEnv("EC2_SERVER")).Build()
var searchQueries = queries.SearchQueries{}

func SearchBeerName(c *fiber.Ctx) error {
	tag := c.Query("query")

	r := searchTag.Query(searchQueries.BeerName(tag), "post")
	hits := r["hits"].(map[string]interface{})["hits"].([]interface{})

	type data struct {
		BeerID  float64 `json:"beer_id"`
		PostCnt int     `json:"post_cnt"`
	}

	datas := map[string]*data{}

	for _, hit := range hits {
		source := hit.(map[string]interface{})["_source"].(map[string]interface{})
		beerName := source["beer_name"].(string)
		beerId := source["beer_id"].(float64)
		s, ok := datas[beerName]
		fmt.Println(ok)
		if ok {
			s.PostCnt += 1
		} else {
			datas[beerName] = &data{BeerID: beerId, PostCnt: 1}
		}
		fmt.Println(datas)
	}
	return c.JSON(datas)
}
