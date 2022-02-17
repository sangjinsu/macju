SELECT p.post_id, p.updated_at, p.beer_id, b.beer_name, p.is_deleted, b.english_name
FROM dbmaster.post p
LEFT JOIN dbmaster.beer b ON b.beer_id = p.beer_id
WHERE p.updated_at > :sql_last_value AND p.updated_at < convert_tz(now(),'+00:00','+09:00')
ORDER BY p.post_id

