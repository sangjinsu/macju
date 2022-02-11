package controllers

import (
	"Search/utils/loaddotenv"
	"Search/utils/searchtag"
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"log"
)

var searchTag = searchtag.New().Addresses(loaddotenv.LoadDotEnv("EC2_SERVER")).Build()

func Search(c *fiber.Ctx) error {
	tag := c.Query("query")

	var buf bytes.Buffer
	query := map[string]interface{}{
		"query": map[string]interface{}{
			"match_phrase": map[string]interface{}{
				"message": "id:" + tag,
			},
		},
	}

	if err := json.NewEncoder(&buf).Encode(query); err != nil {
		log.Fatalf("Error encoding query: %s", err)
	}

	type Data struct {
		ID   int      `json:"id"`
		Tags []string `json:"tags"`
	}

	var datas []Data

	r := searchTag.Query(buf)
	for _, hit := range r["hits"].(map[string]interface{})["hits"].([]interface{}) {

		message := hit.(map[string]interface{})["_source"].(map[string]interface{})["message"].(string)
		fmt.Println(message)
		var data Data
		err := json.Unmarshal([]byte(message), &data) // JSON DECODING

		// EXCEPTION
		if err != nil {
			fmt.Println("Failed to json.Unmarshal", err)
		}
		log.Println(data)
		datas = append(datas, data)
	}

	return c.JSON(datas)
}
