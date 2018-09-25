package com.vetx.starter.security;

import com.vetx.starter.model.auth.User;
import com.vetx.starter.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserPrincipalService implements UserDetailsService {

  private UserRepository userRepository;

  @Autowired
  public UserPrincipalService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }


  @Override
  public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
    User user = userRepository
        .findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
        .orElseThrow(() ->
            new UsernameNotFoundException("User not found with username or email : " + usernameOrEmail)
        );

    return UserPrincipal.create(user);
  }

  // This method is used by JWTAuthenticationFilter
  @Transactional
  public UserDetails loadUserById(Long id) {
    User user = userRepository
        .findById(id)
        .orElseThrow(
            () -> new UsernameNotFoundException("User not found with id : " + id)
        );

    return UserPrincipal.create(user);
  }
}
