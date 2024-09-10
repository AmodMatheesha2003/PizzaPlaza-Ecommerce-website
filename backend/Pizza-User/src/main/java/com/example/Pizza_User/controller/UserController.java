package com.example.Pizza_User.controller;

import com.example.Pizza_User.data.User;
import com.example.Pizza_User.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/all")
    public List<User> getAllUser(){
        return userService.getAllUser();
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        User existingUser = userService.findByEmail(user.getEmail());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already has an account");
        }
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully");
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User loginUserCheck = userService.loginUser(user.getEmail(),user.getPassword());
        if(loginUserCheck != null){
            return ResponseEntity.ok(loginUserCheck.getId());
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @DeleteMapping(path="/{userId}")
    public String deleteUser(@PathVariable("userId") int id){
        return userService.deleteUser(id);
    }

    @GetMapping(path ="/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable("userId")int id){
        User user = userService.getUserById(id);
        if(user != null){
            return ResponseEntity.ok(user);
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}
