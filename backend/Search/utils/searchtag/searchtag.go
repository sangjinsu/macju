package searchtag

import (
	"bytes"
	"context"
	"encoding/json"
	"github.com/elastic/go-elasticsearch/v7"
	"log"
)

type SearchTag interface {
	Query(buf bytes.Buffer, index string) map[string]interface{}
	ExistsIndex(index string) bool
}

type searchTag struct {
	es        *elasticsearch.Client
	addresses []string
}

func (st *searchTag) Query(buf bytes.Buffer, index string) map[string]interface{} {

	var r map[string]interface{}

	res, err := st.es.Search(
		st.es.Search.WithContext(context.Background()),
		st.es.Search.WithIndex(index),
		st.es.Search.WithBody(&buf),
		st.es.Search.WithTrackTotalHits(true),
		st.es.Search.WithPretty(),
	)
	if err != nil {
		log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()

	if res.IsError() {
		var e map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&e); err != nil {
			log.Fatalf("Error parsing the response body: %s", err)
		} else {
			// Print the response status and error information.
			log.Fatalf("[%s] %s: %s",
				res.Status(),
				e["error"].(map[string]interface{})["type"],
				e["error"].(map[string]interface{})["reason"],
			)
		}
	}

	if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
		log.Fatalf("Error parsing the response body: %s", err)
	}

	return r
}

func (st *searchTag) ExistsIndex(index string) bool {
	indices := st.es.Cat.Indices
	response, _ := indices(
		indices.WithV(true),
		indices.WithS("index"),
		indices.WithFormat("json"),
	)
	var results []map[string]interface{}
	err := json.NewDecoder(response.Body).Decode(&results)
	if err != nil {
		log.Fatalf("request indeces is failed")
	}

	searchESIndices := make([]string, len(results))
	for i, result := range results {
		searchESIndices[i] = result["index"].(string)
	}

	for _, searchESIndex := range searchESIndices {
		if searchESIndex == index {
			return true
		}
	}
	return false
}

type SearchTagBuilder interface {
	Addresses(...string) SearchTagBuilder
	Build() SearchTag
}

type searchTagBuilder struct {
	addresses []string
}

func (stb *searchTagBuilder) Addresses(addresses ...string) SearchTagBuilder {
	stb.addresses = addresses
	return stb
}

func (stb *searchTagBuilder) Build() SearchTag {

	cfg := elasticsearch.Config{
		Addresses: stb.addresses,
	}

	es, err := elasticsearch.NewClient(cfg)
	if err != nil {
		log.Fatalf("Error creating the searchtag: %s", err)
	}

	return &searchTag{
		addresses: stb.addresses,
		es:        es,
	}
}

func New() SearchTagBuilder {
	return &searchTagBuilder{}
}
