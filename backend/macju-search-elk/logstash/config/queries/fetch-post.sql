SELECT p.post_id, p.updated_at, p.beer_id, b.beer_name,  p.is_deleted, b.english_name
FROM dbmaster.post p
LEFT JOIN dbmaster.beer b ON b.beer_id = p.beer_id
WHERE p.is_deleted = 0