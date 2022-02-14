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
	KoMain   string = "ko_main"
	KoDetail string = "ko_detail"
	EnMain   string = "en_main"
	EnDetail string = "en_detail"
)

var wg sync.WaitGroup
var searchTag = searchtag.New().Addresses(loaddotenv.LoadDotEnv("EC2_SERVER")).Build()
var searchQueries = queries.SearchQueries{}

type userHashTagResponse struct {
	Posts []float64 `json:"posts"`
}

type beerNameResponse struct {
	BeerID   float64   `json:"beer_id"`
	BeerName string    `json:"beer_name"`
	Posts    []float64 `json:"posts"`
}

type hashTagResponse struct {
	Beers []float64 `json:"beers"`
}

type typeResponse struct {
	Beers []float64 `json:"beers"`
}

func SearchBeerName(c *fiber.Ctx) error {
	lang := c.Query("lang")

	switch lang {
	case "ko":
		return SearchKoBeerName(c)
	case "en":
		return SearchEnBeerName(c)
	default:
		return SearchKoBeerName(c)
	}
}

func SearchKoBeerName(c *fiber.Ctx) error {
	tag := c.Query("query")

	var r map[string]interface{}

	r = searchTag.Query(searchQueries.BeerKoName(tag), "beer")
	hits := r["hits"].(map[string]interface{})["hits"].([]interface{})

	responses := []*beerNameResponse{}

	for _, hit := range hits {
		source := hit.(map[string]interface{})["_source"].(map[string]interface{})
		beerName := source["beer_name"].(string)
		beerId := source["beer_id"].(float64)
		response := createBeerNameResponse(beerId, beerName, r)
		responses = append(responses, response)
	}

	return c.JSON(responses)
}

func SearchEnBeerName(c *fiber.Ctx) error {
	tag := c.Query("query")

	var r map[string]interface{}

	r = searchTag.Query(searchQueries.BeerEnName(tag), "beer")
	hits := r["hits"].(map[string]interface{})["hits"].([]interface{})

	responses := []*beerNameResponse{}

	for _, hit := range hits {
		source := hit.(map[string]interface{})["_source"].(map[string]interface{})
		beerName := source["english_name"].(string)
		beerId := source["beer_id"].(float64)
		response := createBeerNameResponse(beerId, beerName, r)
		responses = append(responses, response)
	}

	return c.JSON(responses)
}

func createBeerNameResponse(beerId float64, beerName string, r map[string]interface{}) *beerNameResponse {
	response := &beerNameResponse{BeerID: beerId, BeerName: beerName, Posts: []float64{}}
	r = searchTag.Query(searchQueries.PostByBeerId(beerId), "post")
	beerNameHits := r["hits"].(map[string]interface{})["hits"].([]interface{})
	for _, beerNameHit := range beerNameHits {
		beerNameSource := beerNameHit.(map[string]interface{})["_source"].(map[string]interface{})
		postId := beerNameSource["post_id"].(float64)
		response.Posts = append(response.Posts, postId)
	}
	return response
}

func SearchBeerType(c *fiber.Ctx) error {
	tag := c.Query("query")

	responseChan := make(chan map[string]*typeResponse)

	wg.Add(4)
	go searchBeer(responseChan, tag, KoMain)
	go searchBeer(responseChan, tag, KoDetail)
	go searchBeer(responseChan, tag, EnMain)
	go searchBeer(responseChan, tag, EnDetail)

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
	case KoMain:
		query = searchQueries.BeerKoMainType(tag)
	case KoDetail:
		query = searchQueries.BeerKoDetailType(tag)
	case EnMain:
		query = searchQueries.BeerEnMainType(tag)
	case EnDetail:
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
