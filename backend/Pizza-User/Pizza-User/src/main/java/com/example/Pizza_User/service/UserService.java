package com.example.Pizza_User.service;

import com.example.Pizza_User.data.User;
import com.example.Pizza_User.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUser(){
        return userRepository.findAll();
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

    public ResponseEntity<String> deleteUser(int id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
            return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    public User loginUser(String email,String password){
        User user = userRepository.findByEmail(email);
        if (user != null && password.equals(user.getPassword())) {
            return user;
        }
        return null;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserById(int id) {
        Optional<User> menu = userRepository.findById(id);
        return menu.orElse(null);
    }

}
