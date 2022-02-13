SELECT u.user_hashtag_id, u.content, u.updated_at, u.post_id, u.is_deleted
FROM dbmaster.user_hashtag u
WHERE u.is_deleted = 0
