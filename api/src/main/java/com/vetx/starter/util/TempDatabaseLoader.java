package com.vetx.starter.util;

import com.vetx.starter.model.Seminar;
import com.vetx.starter.model.SeminarRepository;
import com.vetx.starter.model.SeminarType;
import com.vetx.starter.model.auth.Role;
import com.vetx.starter.model.auth.RoleName;
import com.vetx.starter.model.auth.RoleRepository;
import com.vetx.starter.model.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class TempDatabaseLoader implements CommandLineRunner {
  private final UserRepository userRepository;
  private final RoleRepository roleRepository;
  private final SeminarRepository seminarRepository;

  @Autowired
  public TempDatabaseLoader(UserRepository userRepository, RoleRepository roleRepository, SeminarRepository seminarRepository) {
    this.userRepository = userRepository;
    this.roleRepository = roleRepository;
    this.seminarRepository = seminarRepository;
  }


  @Override
  public void run(String... args) throws Exception {
    this.roleRepository.save(Role.builder().name(RoleName.ROLE_ADMIN).build());
    this.roleRepository.save(Role.builder().name(RoleName.ROLE_GUEST).build());
    this.roleRepository.save(Role.builder().name(RoleName.ROLE_USER).build());
//
//    Seminar seminar = new Seminar();
//    seminar.setDate(Instant.now());
//    seminar.setSeminarType(SeminarType.BASIC);
//    seminar.setName("Temp Sewminar");
//    seminarRepository.save(seminar);

  }
}