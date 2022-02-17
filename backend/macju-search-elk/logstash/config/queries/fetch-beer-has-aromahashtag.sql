SELECT b.beer_has_aroma_hash_tag_id, b.beer_id, ht.aroma
FROM dbmaster.beer_has_aroma_hash_tag b
LEFT JOIN dbmaster.aroma_hash_tag ht ON b.aroma_hash_tag_id = ht.aroma_hash_tag_id
