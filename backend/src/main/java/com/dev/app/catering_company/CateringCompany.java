package com.dev.app.catering_company;

import jakarta.persistence.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
@Table(name = "catering_companies")
public class CateringCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "company_name")
    private String companyName;

    @JsonManagedReference
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "cateringCompany")
    private List<Menu> menus;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contact_info_id")
    private ContactInformation contactInformation;

    @Column(name = "delivery")
    private boolean delivery;

    @ElementCollection(targetClass = SpecialSpecifications.class,fetch = FetchType.EAGER )
    @JoinTable(name = "catering_company_special_specifications", joinColumns = @JoinColumn(name = "catering_company_id"))
    @Column(name = "special_specification")
    @Enumerated(EnumType.STRING)
    private List<SpecialSpecifications> specialSpecifications;

    @Column(name = "capacity")
    private int capacity;

    
    public int getId() {
        return id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public List<Menu> getMenus() {
        return menus;
    }

    public ContactInformation getContactInformation() {
        return contactInformation;
    }

    public boolean isDelivery() {
        return delivery;
    }
   
    public List<SpecialSpecifications> getSpecialSpecifications() {
        return specialSpecifications;
    }

    public int getCapacity() {
        return capacity;
    
}
public void setId(int id) {
    this.id = id;
}

public void setCompanyName(String companyName) {
    this.companyName = companyName;
}

public void setMenus(List<Menu> menus) {
    this.menus = menus;
}

public void setContactInformation(ContactInformation contactInformation) {
    this.contactInformation = contactInformation;
}

public void setDelivery(boolean delivery) {
    this.delivery = delivery;
}

public void setSpecialSpecifications(List<SpecialSpecifications> specialSpecifications) {
    this.specialSpecifications = specialSpecifications;
}

public void setCapacity(int capacity) {
    this.capacity = capacity;
}
}