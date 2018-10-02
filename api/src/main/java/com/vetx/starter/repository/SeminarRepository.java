package com.vetx.starter.repository;

import com.vetx.starter.model.Seminar;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeminarRepository extends PagingAndSortingRepository<Seminar, Long> {

}
