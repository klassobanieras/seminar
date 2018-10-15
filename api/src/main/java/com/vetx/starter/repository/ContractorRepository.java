package com.vetx.starter.repository;

import com.vetx.starter.model.Contractor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;
import java.util.concurrent.Future;

@Repository
@CrossOrigin
//@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
public interface ContractorRepository extends JpaRepository<Contractor, Long> {
  Optional<Contractor> findByAfm(String afm);
}
