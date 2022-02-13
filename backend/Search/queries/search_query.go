package queries

import (
	"bytes"
	"encoding/json"
	"log"
)

type SearchQueries struct {
}

func encodeQuery(query map[string]interface{}) bytes.Buffer {
	var buf bytes.Buffer

	if err := json.NewEncoder(&buf).Encode(query); err != nil {
		log.Fatalf("Error encoding query: %s", err)
	}
	return buf
}

func (sq *SearchQueries) BeerKoName(name string) bytes.Buffer {
	query := map[string]interface{}{
		"_source": []string{"post_id", "beer_id", "beer_name"},
		"query": map[string]interface{}{
			"bool": map[string]interface{}{
				"must": []map[string]interface{}{
					{
						"match": map[string]interface{}{
							"is_deleted": false,
						},
					},
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

func (sq *SearchQueries) BeerEnName(name string) bytes.Buffer {
	query := map[string]interface{}{
		"_source": []string{"post_id", "beer_id", "english_name"},
		"query": map[string]interface{}{
			"bool": map[string]interface{}{
				"must": []map[string]interface{}{
					{
						"match": map[string]interface{}{
							"is_deleted": false,
						},
					},
					{
						"match_phrase_prefix": map[string]interface{}{
							"english_name": name,
						},
					},
				},
			},
		},
	}

	buf := encodeQuery(query)

	return buf
}

func (sq *SearchQueries) BeerKoMainType(beerType string) bytes.Buffer {
	query := map[string]interface{}{
		"_source": []string{"ko_main", "beer_id"},
		"query": map[string]interface{}{
			"bool": map[string]interface{}{
				"should": []map[string]interface{}{
					{
						"match_phrase_prefix": map[string]interface{}{
							"ko_main": beerType,
						},
					},
				},
			},
		},
	}

	buf := encodeQuery(query)

	return buf
}

func (sq *SearchQueries) BeerEnMainType(beerType string) bytes.Buffer {
	query := map[string]interface{}{
		"_source": []string{"en_main", "beer_id"},
		"query": map[string]interface{}{
			"bool": map[string]interface{}{
				"should": []map[string]interface{}{
					{
						"match_phrase_prefix": map[string]interface{}{
							"en_main": beerType,
						},
					},
				},
			},
		},
	}

	buf := encodeQuery(query)

	return buf
}

func (sq *SearchQueries) BeerKoDetailType(beerType string) bytes.Buffer {
	query := map[string]interface{}{
		"_source": []string{"ko_detail", "beer_id"},
		"query": map[string]interface{}{
			"bool": map[string]interface{}{
				"should": []map[string]interface{}{
					{
						"match_phrase_prefix": map[string]interface{}{
							"ko_detail": beerType,
						},
					},
				},
			},
		},
	}

	buf := encodeQuery(query)

	return buf
}

func (sq *SearchQueries) BeerEnDetailType(beerType string) bytes.Buffer {
	query := map[string]interface{}{
		"_source": []string{"en_detail", "beer_id"},
		"query": map[string]interface{}{
			"bool": map[string]interface{}{
				"should": []map[string]interface{}{
					{
						"match_phrase_prefix": map[string]interface{}{
							"en_detail": beerType,
						},
					},
				},
			},
		},
	}

	buf := encodeQuery(query)

	return buf
}

func (sq *SearchQueries) UserHashTag(tag string) bytes.Buffer {
	query := map[string]interface{}{
		"_source": []string{"post_id", "content"},
		"query": map[string]interface{}{
			"bool": map[string]interface{}{
				"must": []map[string]interface{}{
					{
						"match": map[string]interface{}{
							"is_deleted": false,
						},
					},
					{
						"match_phrase_prefix": map[string]interface{}{
							"content": tag,
						},
					},
				},
			},
		},
	}

	buf := encodeQuery(query)

	return buf
}

func (sq *SearchQueries) AromaHashTag(tag string) bytes.Buffer {
	query := map[string]interface{}{
		"_source": []string{"aroma", "beer_id"},
		"query": map[string]interface{}{
			"match_phrase_prefix": map[string]interface{}{
				"aroma": tag,
			},
		},
	}

	buf := encodeQuery(query)

	return buf
}

func (sq *SearchQueries) FlavorHashTag(tag string) bytes.Buffer {
	query := map[string]interface{}{
		"_source": []string{"flavor", "beer_id"},
		"query": map[string]interface{}{
			"match_phrase_prefix": map[string]interface{}{
				"flavor": tag,
			},
		},
	}

	buf := encodeQuery(query)

	return buf
}
