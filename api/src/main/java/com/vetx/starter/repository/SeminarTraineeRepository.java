package com.vetx.starter.repository;

import com.vetx.starter.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(excerptProjection = SeminarTraineeProjection.class)
@CrossOrigin
//@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
public interface SeminarTraineeRepository extends JpaRepository<SeminarTrainee, Long> {

  List<SeminarTrainee> findByTraineeAndSeminar(Trainee trainee, Seminar seminar);

  List<SeminarTrainee> findAllBySeminarAndContractorAndSpecialty(Seminar seminar, Contractor contractor, Specialty specialty);

  List<SeminarTrainee> findDistinctBySeminarAndSpecialty(Seminar seminar, Specialty specialty);

  List<SeminarTrainee> findDistinctBySeminar(Seminar seminar);
}
