package pl.server.server.controllers;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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

    @GetMapping("/street/{streetName}")
    public BillingAddress getBillingAddressByStreetName(@PathVariable String streetName){
        return billingAddressRepository.findByStreetName(streetName);
    }

    @GetMapping
    public BillingAddress getBillingAddress(@PathVariable String userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return billingAddressRepository.findByUserId(user.getId());
    }

    @PostMapping("/{userId}")
    @Transactional
    public void addBillingAddress(@PathVariable String userId, @RequestBody BillingAddress billingAddress) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        billingAddress.setUser(user);
        billingAddressRepository.save(billingAddress);

        user.setBillingAddress(billingAddress);
        userRepository.save(user);
    }

    @PutMapping
    @Transactional
    public BillingAddress UpdateBillingAddress(@PathVariable String userId, @RequestBody BillingAddress billingAddress) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
//        if (user.getBillingAddress() == null) {
//            throw new ResourceNotFoundException("Provided billing address does not exist.");
//        }
//        if (!billingAddress.getUser().getId().equals(user.getId())) { in progress!!
//            throw new ResourceNotFoundException("Provided billing address does not belong to the user.");
//        }

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
