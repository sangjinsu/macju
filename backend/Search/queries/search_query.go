package queries

import (
	"bytes"
	"encoding/json"
	"log"
)

type SearchQueries struct {
}

func (sq *SearchQueries) BeerName(name string) bytes.Buffer {

	//query := map[string]interface{}{
	//	"query": map[string]interface{}{
	//		"match_phrase_prefix": map[string]interface{}{
	//			"beer_name": name,
	//		},
	//	},
	//}

	query := map[string]interface{}{
		"_source": []string{"post_id", "beer_id", "beer_name"},
		"query": map[string]interface{}{
			"bool": map[string]interface{}{
				"should": []map[string]interface{}{
					{
						"match_phrase_prefix": map[string]interface{}{
							"beer_name": name,
						},
					},
				},
			},
		},
	}

	buf := encodeQuery(query)

	return buf
}

func (sq *SearchQueries) BeerType() {

}

func (sq *SearchQueries) UserHashTag() {

}

func (sq *SearchQueries) AromaHashTag() {

}

func (sq *SearchQueries) FlavorHashTag() {

}

func encodeQuery(query map[string]interface{}) bytes.Buffer {
	var buf bytes.Buffer

	if err := json.NewEncoder(&buf).Encode(query); err != nil {
		log.Fatalf("Error encoding query: %s", err)
	}
	return buf
}
