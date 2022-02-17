SELECT b.beer_id, b.beer_name, b.english_name, bt.ko_main, bt.ko_detail, bt.en_main, bt.en_detail
FROM dbmaster.beer b
LEFT JOIN dbmaster.beer_type bt ON b.beer_type_id = bt.beer_type_id
