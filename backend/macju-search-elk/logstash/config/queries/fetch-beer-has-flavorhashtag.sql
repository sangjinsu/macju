SELECT b.beer_has_flavor_hash_tag_id, b.beer_id, ht.flavor
FROM dbmaster.beer_has_flavor_hash_tag b
LEFT JOIN dbmaster.flavor_hash_tag ht ON b.flavor_hash_tag_id = ht.flavor_hash_tag_id