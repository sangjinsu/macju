SELECT u.user_hashtag_id, u.content, u.updated_at, u.post_id, u.is_deleted
FROM dbmaster.user_hashtag u
WHERE u.updated_at > :sql_last_value AND u.updated_at < convert_tz(now(),'+00:00','+09:00')
ORDER BY u.user_hashtag_id
