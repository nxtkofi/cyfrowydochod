package pl.server.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.transaction.Transactional;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.BillingAddress;
import pl.server.server.models.User;
import pl.server.server.repositories.BillingAddressRepository;
import pl.server.server.repositories.UserRepository;
@RestController
@RequestMapping("/api/billingAddresses")
public class BillingAddressController {
    @Autowired
    private BillingAddressRepository billingAddressRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{userId}")
    public BillingAddress getBillingAddress(@PathVariable String userId){
        return billingAddressRepository.findByUserId(userId);
    }

    @PostMapping("/{userId}")
    @Transactional
    public void addBillingAddress(@PathVariable String userId, @RequestBody BillingAddress billingAddress) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        billingAddress.setUser(user);
        billingAddressRepository.save(billingAddress);
        System.out.println("Billing address from reqBody: "+billingAddress);
        System.out.println("userId from pathvariable: "+userId);
        user.setBillingAddress(billingAddress);
        userRepository.save(user);
    }

    @PutMapping("/{userId}")
    @Transactional
    public BillingAddress UpdateBillingAddress(@PathVariable String userId, @RequestBody BillingAddress billingAddress) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        BillingAddress addressToUpdate = user.getBillingAddress();

        addressToUpdate.setCity(billingAddress.getCity());
        addressToUpdate.setFullName(billingAddress.getFullName());
        addressToUpdate.setZipCode(billingAddress.getZipCode());
        addressToUpdate.setHouseNumber(billingAddress.getHouseNumber());
        addressToUpdate.setStreetName(billingAddress.getStreetName());

        billingAddressRepository.save(addressToUpdate);
        return addressToUpdate;
    }

    @DeleteMapping("/{billingAddressId}")
    @Transactional
    public void deleteBillingAddress(@PathVariable String billingAddressId) {
        BillingAddress billingAddress = billingAddressRepository.findById(billingAddressId)
                .orElseThrow(() -> new ResourceNotFoundException("Billing Address not found"));
        billingAddressRepository.delete(billingAddress);
    }


}
