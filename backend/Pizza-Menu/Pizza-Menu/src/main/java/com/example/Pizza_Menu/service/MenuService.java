package com.example.Pizza_Menu.service;

import com.example.Pizza_Menu.data.Menu;
import com.example.Pizza_Menu.data.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuService {
    @Autowired
    private MenuRepository menuRepository;

    public List<Menu> getAllMenu(){
        return menuRepository.findAll();
    }

    public Menu saveMenu(Menu menu){
        return menuRepository.save(menu);
    }

    public Menu getMenuById(int id) {
        Optional<Menu> menu = menuRepository.findById(id);
        return menu.orElse(null);
    }

    public String deleteMenu(int id){
        menuRepository.deleteById(id);
        return "delete succussfully";
    }



}
