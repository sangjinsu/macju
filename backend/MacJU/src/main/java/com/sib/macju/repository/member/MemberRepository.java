package com.sib.macju.repository.member;

import com.sib.macju.domain.beer.Beer;
import com.sib.macju.domain.member.Member;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    @Override
    <S extends Member> S save(S entity);//signUp

    Member findByMemberId(@Param("memberId") Long memberId);

    Member findByNickName(@Param("nickName") String nickName);

    @Modifying
    @Query("update Member m set m.status = :status where m.memberId = :memberId")
    int withdraw(String status, Long memberId);
    //사용자 정지, 탈퇴

    @Modifying
    @Query("update Member m set m.nickName = :nickName , m.profileColor = :profileColor where m.memberId = :memberId")
    int changeProfileColor(String nickName, String profileColor, Long memberId);
    //사용자 정보 수정인데 수정할 게 없음 선호 향, 맛이 member 테이블에 없어서 어떻게 하는 게 좋을지 생각 중

    String fetchLikedBeerString = "select beer_id, content, english_name, name, volumn, beer_type_id " +
                                    "from beer " +
                                    "where beer_id in (select beer_id " +
                                    "from member m " +
                                    "left join member_like_beer b " +
                                    "on m.member_id = b.member_id " +
                                    "where m.member_id = :memberId)";
    @Query(fetchLikedBeerString)
    List<Beer> fetchLikedBeer(Long memberId);
    //일단 맥주 좋아요한 맥주 컨펌받고 좋아요한 포스트, 평가한 맥주 진행

/*
    @Query("delete from member_like_beer where member_id = :memberId and beer_id = :beerId")
    int like(Long memberId, Long beerId);
*/

    //팔로우...ㅠㅠ

}

