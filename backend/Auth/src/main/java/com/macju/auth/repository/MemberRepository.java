package com.macju.auth.repository;

import com.macju.auth.domain.Member;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface MemberRepository extends CrudRepository<Member, String>{
}


//public interface MemberRepository {
//
//    void save(Member member);
//    Map<String, Member> findAll();
//    Member findById(String kakaoMemberId);
//    void update(Member member);
//    void delete(String kakaoMemberId);
//}
