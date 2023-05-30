package com.dev.app.flight;

import java.time.LocalDateTime;
import java.util.List;

import com.dev.app.catering_company.Menu;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder // Building the object using the design pattern builder
@NoArgsConstructor
@AllArgsConstructor // When we are working with the design pattern builder we use this parameter
@Entity
@Table(name = "flights")
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "flight_number")
    private String flightNumber;

    @Column(name = "airline")
    private String airline;

    @Column(name = "departure_airport")
    private String departureAirport;

    @Column(name = "arrival_airport")
    private String arrivalAirport;

    @Column(name = "departure_time")
    private LocalDateTime departureTime;

    @Column(name = "arrival_time")
    private LocalDateTime arrivalTime;

    @Column(name = "seats_available")
    private int seatsAvailable;

    @Column(name = "price")
    private double price;
    
    @ManyToMany
    @JoinTable(name = "flight_menu", joinColumns = @JoinColumn(name = "flight_id"),
    inverseJoinColumns = @JoinColumn(name = "menu_id"))
    private List<Menu> menus;


    // toString
    @Override
    public String toString() {
        return "Flight [id=" + id + ", flightNumber=" + flightNumber + ", airline=" + airline + ", departureAirport="
                + departureAirport + ", arrivalAirport=" + arrivalAirport + ", departureTime=" + departureTime
                + ", arrivalTime=" + arrivalTime + ", seatsAvailable=" + seatsAvailable + ", price=" + price + "]";
    }
}