package com.example.Pizza.Admin.service;

import com.example.Pizza.Admin.data.Admin;
import com.example.Pizza.Admin.data.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;

    public Admin loginAdmin(String email,String password){
        Admin admin = adminRepository.findByEmail(email);
        if (admin != null && password.equals(admin.getPassword())) {
            return admin;
        }
        return null;
    }
}
