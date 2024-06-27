package pl.server.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.BillingAddress;
import pl.server.server.services.BillingAddressService;

@RestController
@RequestMapping("/api/billingAddresses")
public class BillingAddressController {
    @Autowired
    private BillingAddressService billingAddressService;

    @GetMapping("/{userId}")
    public ResponseEntity<BillingAddress> getBillingAddress(@PathVariable String userId) {
        try {
            BillingAddress billingAddress = billingAddressService.getBillingAddress(userId);
            return ResponseEntity.ok(billingAddress);
        } catch (ResourceNotFoundException notFoundException) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException exception) {
            System.err.println(exception);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{userId}")
    public ResponseEntity<BillingAddress> addBillingAddress(@PathVariable String userId, @RequestBody BillingAddress billingAddress) {
        try {
            billingAddressService.createBillingAddress(userId,billingAddress);
            return ResponseEntity.ok(billingAddress);
        } catch (ResourceNotFoundException notFoundException) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException exception) {
            System.err.println(exception);
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{userId}")
    public ResponseEntity<BillingAddress> updateBillingAddress(@PathVariable String userId, @RequestBody BillingAddress billingAddress) {
        try {
            billingAddressService.updateBillingAddress(userId,billingAddress);
            return ResponseEntity.ok(billingAddress);
        } catch (ResourceNotFoundException notFoundException) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException exception) {
            System.err.println(exception);
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{billingAddressId}")
    public ResponseEntity<BillingAddress> deleteBillingAddress(@PathVariable String billingAddressId) {
        try {
            billingAddressService.deleteBillingAddress(billingAddressId);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException notFoundException) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException exception) {
            System.err.println(exception);
            return ResponseEntity.badRequest().build();
        }
    }
}
