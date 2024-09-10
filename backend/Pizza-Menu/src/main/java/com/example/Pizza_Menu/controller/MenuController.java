package com.example.Pizza_Menu.controller;
import com.example.Pizza_Menu.data.Menu;
import com.example.Pizza_Menu.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/menu")
public class MenuController {
    @Autowired
    private MenuService menuService;

    @GetMapping("/items")
    public List<Menu> getAllMenu(){
        return menuService.getAllMenu();
    }

    @PostMapping("/item")
    public ResponseEntity<Menu> addMenu(
            @RequestParam("name") String name,
            @RequestParam("price") double price,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        Menu menu = new Menu();
        menu.setName(name);
        menu.setPrice(price);
        menu.setDescription(description);
        menu.setCategory(category);
        if (image != null) {
            try {
                menu.setImage(image.getBytes());
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }
        Menu savedmenu = menuService.saveMenu(menu);
        return ResponseEntity.ok(savedmenu);
    }

    @PutMapping("/item/{id}")
    public ResponseEntity<Menu> updateMenu(
            @PathVariable("id") int id,
            @RequestParam("name") String name,
            @RequestParam("price") double price,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        Menu findMenu = menuService.getMenuById(id);
        if (findMenu == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        findMenu.setName(name);
        findMenu.setPrice(price);
        findMenu.setDescription(description);
        findMenu.setCategory(category);
        if (image != null) {
            try {
                findMenu.setImage(image.getBytes());
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }
        Menu updatedMenu = menuService.saveMenu(findMenu);
        return ResponseEntity.ok(updatedMenu);
    }

    @DeleteMapping(path="/item/{menuId}")
    public String deleteMenu(@PathVariable("menuId") int id){
        return menuService.deleteMenu(id);
    }

    @GetMapping(path ="/items/{menuId}")
    public ResponseEntity<Menu> getMenueById(@PathVariable("menuId")int id){
        Menu menu = menuService.getMenuById(id);
        if(menu != null){
            return ResponseEntity.ok(menu);
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


}
