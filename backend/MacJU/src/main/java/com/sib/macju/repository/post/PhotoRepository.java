package com.sib.macju.repository.post;

import com.sib.macju.domain.post.Photo;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

    /*@Query("insert into Photo(photo_id, post_id, data) value(:photo.photoId, :photo.postId, :photo.data)")
    int insertPhoto(Photo photo);
*/
    @Override
    <S extends Photo> S save(S entity);

    @Override
    void deleteById(Long photoId);


    List<Photo> findAllByPhotoId(@Param("photoId") Long photoId);

    List<Photo> findAllByPostId(@Param("postID") Long postId);
}
