package com.dev.app.flight;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/flight")
public class FlightController {
    
    @Autowired
    private FlightRepository flightRepository;

    public FlightController() {
	}

    @PostMapping
    public ResponseEntity<Flight> createFlight(@RequestBody Flight flight) {
        return new ResponseEntity<Flight>(flightRepository.save(flight), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Flight> getFlightById(@PathVariable Long id) {
        Optional<Flight> flight = flightRepository.findById(id);
        if (flight.isPresent()) {
            return ResponseEntity.ok(flight.get());
        } else {
            return ResponseEntity.notFound().build();
        }    
    }

    @GetMapping("/all")
    public Iterable<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Flight> updateFlightById(@PathVariable Long id, @RequestBody Flight updatedFlight) {
        Optional<Flight> flightOptional = flightRepository.findById(id);
        if (flightOptional.isPresent()) {
            Flight flight = flightOptional.get();
            // Update the flight attributes with the values from the updatedFlight object
            flight.setFlightNumber(updatedFlight.getFlightNumber());
            flight.setAirline(updatedFlight.getAirline());
            flight.setDepartureAirport(updatedFlight.getDepartureAirport());
            flight.setArrivalAirport(updatedFlight.getArrivalAirport());
            flight.setDepartureTime(updatedFlight.getDepartureTime());
            flight.setArrivalTime(updatedFlight.getArrivalTime());
            flight.setSeatsAvailable(updatedFlight.getSeatsAvailable());
            flight.setPrice(updatedFlight.getPrice());
    
            return ResponseEntity.ok(flightRepository.save(flight));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Flight> deleteFlightById(@PathVariable Long id) {
        Optional<Flight> flightOptional = flightRepository.findById(id);
        if (flightOptional.isPresent()) {
            flightRepository.deleteById(id);
            return ResponseEntity.ok(flightOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/airline/{airline}")
    public Iterable<Flight> getFlightsByAirline(@PathVariable String airline) {
        return flightRepository.findByAirline(airline);
    }

    @GetMapping("/count-today")
    public ResponseEntity<Long> getTodayFlightsCount() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(23, 59, 59); // Set the end time to 23:59:59
        long count = flightRepository.countByDepartureTimeBetween(startOfDay, endOfDay);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/count-today-passengers")
    public ResponseEntity<Integer> countTodayPassengers() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(23, 59, 59);
        int totalPassengers = flightRepository.sumSeatsAvailableByDepartureTimeBetween(startOfDay, endOfDay);
        return ResponseEntity.ok(totalPassengers);
    }

    @GetMapping("/count-today-revenue")
    public ResponseEntity<Double> countTodayRevenue() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(23, 59, 59);
        double totalRevenue = flightRepository.sumPriceByDepartureTimeBetween(startOfDay, endOfDay);
        return ResponseEntity.ok(totalRevenue);
    }

    @GetMapping("/count-upcoming-passengers")
    public ResponseEntity<Integer> countUpcomingPassengers() {
        LocalDate tomorrow = LocalDate.now().plusDays(1);

        LocalDate endOfYear = tomorrow.withDayOfYear(365);
        LocalDateTime startOfDay = tomorrow.atStartOfDay();
        LocalDateTime endOfYearday = endOfYear.atTime(23, 59, 59);

        int totalPassengers = flightRepository.sumSeatsAvailableByDepartureTimeBetween(startOfDay, endOfYearday);
        return ResponseEntity.ok(totalPassengers);
    }

    
}