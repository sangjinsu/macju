package controllers

import (
	"Search/queries"
	"Search/utils/loaddotenv"
	"Search/utils/searchtag"
	"bytes"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"sync"
)

const (
	KO_MAIN   string = "ko_main"
	KO_DETAIL string = "ko_detail"
	EN_MAIN   string = "en_main"
	EN_DETAIL string = "en_detail"
)

var wg sync.WaitGroup
var searchTag = searchtag.New().Addresses(loaddotenv.LoadDotEnv("EC2_SERVER")).Build()
var searchQueries = queries.SearchQueries{}

type userHashTagResponse struct {
	Posts []float64 `json:"posts"`
}

type beerNameResponse struct {
	BeerID float64   `json:"beer_id"`
	Posts  []float64 `json:"posts"`
}

type hashTagResponse struct {
	Beers []float64 `json:"beers"`
}

type typeResponse struct {
	Beers []float64 `json:"beers"`
}

func SearchBeerName(c *fiber.Ctx) error {
	tag := c.Query("query")
	lang := c.Query("lang")

	responses := map[string]*beerNameResponse{}

	var r map[string]interface{}
	nameType := "beer_name"
	if lang == "ko" || lang == "" {
		r = searchTag.Query(searchQueries.BeerKoName(tag), "post")
	} else if lang == "en" {
		r = searchTag.Query(searchQueries.BeerEnName(tag), "post")
		nameType = "english_name"
	}

	hits := r["hits"].(map[string]interface{})["hits"].([]interface{})

	for _, hit := range hits {
		source := hit.(map[string]interface{})["_source"].(map[string]interface{})
		beerName := source[nameType].(string)
		beerId := source["beer_id"].(float64)
		postId := source["post_id"].(float64)
		if s, ok := responses[beerName]; ok {
			s.Posts = append(s.Posts, postId)
		} else {
			responses[beerName] = &beerNameResponse{
				BeerID: beerId,
				Posts:  []float64{postId},
			}
		}
	}
	return c.JSON(responses)
}

func SearchBeerType(c *fiber.Ctx) error {
	tag := c.Query("query")

	responseChan := make(chan map[string]*typeResponse)

	wg.Add(4)
	go searchBeer(responseChan, tag, KO_MAIN)
	go searchBeer(responseChan, tag, KO_DETAIL)
	go searchBeer(responseChan, tag, EN_MAIN)
	go searchBeer(responseChan, tag, EN_DETAIL)

	go func() {
		wg.Wait()
		close(responseChan)
	}()

	var responses []map[string]*typeResponse
	for response := range responseChan {
		fmt.Println(response)
		responses = append(responses, response)
	}

	return c.JSON(responses)
}

func searchBeer(responseChan chan map[string]*typeResponse, tag string, queryType string) {
	defer wg.Done()

	var query bytes.Buffer
	switch queryType {
	case KO_MAIN:
		query = searchQueries.BeerKoMainType(tag)
	case KO_DETAIL:
		query = searchQueries.BeerKoDetailType(tag)
	case EN_MAIN:
		query = searchQueries.BeerEnMainType(tag)
	case EN_DETAIL:
		query = searchQueries.BeerEnDetailType(tag)
	}

	r := searchTag.Query(query, "beer")
	hits := r["hits"].(map[string]interface{})["hits"].([]interface{})

	response := map[string]*typeResponse{}
	for _, hit := range hits {
		source := hit.(map[string]interface{})["_source"].(map[string]interface{})
		beerType := source[queryType].(string)
		beerId := source["beer_id"].(float64)
		if s, ok := response[beerType]; ok {
			s.Beers = append(s.Beers, beerId)
		} else {
			response[beerType] = &typeResponse{Beers: []float64{beerId}}
		}
	}

	responseChan <- response
}

func SearchUserHashTag(c *fiber.Ctx) error {
	tag := c.Query("query")

	r := searchTag.Query(searchQueries.UserHashTag(tag), "userhashtag")
	hits := r["hits"].(map[string]interface{})["hits"].([]interface{})

	responses := map[string]*userHashTagResponse{}

	for _, hit := range hits {
		source := hit.(map[string]interface{})["_source"].(map[string]interface{})
		content := source["content"].(string)
		postId := source["post_id"].(float64)
		if s, ok := responses[content]; ok {
			s.Posts = append(s.Posts, postId)
		} else {
			responses[content] = &userHashTagResponse{Posts: []float64{postId}}
		}
	}
	return c.JSON(responses)
}

func SearchAroma(c *fiber.Ctx) error {
	tag := c.Query("query")

	r := searchTag.Query(searchQueries.AromaHashTag(tag), "beerhasaromahashtag")
	hits := r["hits"].(map[string]interface{})["hits"].([]interface{})

	responses := map[string]*hashTagResponse{}

	for _, hit := range hits {
		source := hit.(map[string]interface{})["_source"].(map[string]interface{})
		aroma := source["aroma"].(string)
		beerId := source["beer_id"].(float64)
		if s, ok := responses[aroma]; ok {
			s.Beers = append(s.Beers, beerId)
		} else {
			responses[aroma] = &hashTagResponse{Beers: []float64{beerId}}
		}
	}
	return c.JSON(responses)
}

func SearchFlavor(c *fiber.Ctx) error {
	tag := c.Query("query")

	r := searchTag.Query(searchQueries.FlavorHashTag(tag), "beerhasflavorhashtag")
	hits := r["hits"].(map[string]interface{})["hits"].([]interface{})

	responses := map[string]*hashTagResponse{}

	for _, hit := range hits {
		source := hit.(map[string]interface{})["_source"].(map[string]interface{})
		flavor := source["flavor"].(string)
		beerId := source["beer_id"].(float64)
		if s, ok := responses[flavor]; ok {
			s.Beers = append(s.Beers, beerId)
		} else {
			responses[flavor] = &hashTagResponse{Beers: []float64{beerId}}
		}
	}
	return c.JSON(responses)
}
