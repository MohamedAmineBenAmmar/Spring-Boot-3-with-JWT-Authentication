package com.dev.app.catering_companies;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "menu")
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "price_per_serving")
    private double pricePerServing;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "catering_company_id")
    private CateringCompany cateringCompany;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "menu_item", joinColumns = @JoinColumn(name = "menu_id"))
    @Column(name = "item")
    private List<String> items;

    @Enumerated(EnumType.STRING )
    @Column(name = "menu_type")
    private MenuType menuType;


    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPricePerServing() {
        return pricePerServing;
    }

    public List<String> getItems() {
        return items;
    }
    public MenuType getMenuType(){
        return menuType;
    }
    public void setId(int id) {
        this.id = id;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public void setPricePerServing(double pricePerServing) {
        this.pricePerServing = pricePerServing;
    }
    
    public void setItems(List<String> items) {
        this.items = items;
    }
    
    public void setMenuType(MenuType menuType) {
        this.menuType = menuType;
    }
    

}