package pl.server.server.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.BillingAddress;
import pl.server.server.models.User;
import pl.server.server.repositories.BillingAddressRepository;
import pl.server.server.repositories.UserRepository;


@Service
public class BillingAddressService {

    @Autowired
    BillingAddressRepository billingAddressRepository;

    @Autowired
    UserRepository userRepository;

    public BillingAddress getBillingAddress(String userId){
        return billingAddressRepository.findByUserId(userId);
    }

    @Transactional
    public BillingAddress createBillingAddress(String userId,BillingAddress newBillingAddress) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setBillingAddress(newBillingAddress);
        newBillingAddress.setUser(user);
        userRepository.save(user);
        return billingAddressRepository.save(newBillingAddress);
    }

    public BillingAddress updateBillingAddress(String userId,BillingAddress newBillingAddress) throws ResourceNotFoundException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if(!billingAddressRepository.existsById(user.getBillingAddress().getAddressId())) {
            throw new ResourceNotFoundException("user billing address does not exist");
        }

        BillingAddress addressToUpdate = user.getBillingAddress();

        addressToUpdate.setCity(newBillingAddress.getCity());
        addressToUpdate.setFullName(newBillingAddress.getFullName());
        addressToUpdate.setZipCode(newBillingAddress.getZipCode());
        addressToUpdate.setHouseNumber(newBillingAddress.getHouseNumber());
        addressToUpdate.setStreetName(newBillingAddress.getStreetName());

        billingAddressRepository.save(addressToUpdate);
        return addressToUpdate;
    }

    @Transactional
    public void deleteBillingAddress(String billingAddressId) {
        BillingAddress billingAddress = billingAddressRepository.findById(billingAddressId)
                .orElseThrow(() -> new ResourceNotFoundException("Billing Address not found"));

        User user = billingAddress.getUser();
        if (user != null) {
            user.setBillingAddress(null);
            userRepository.save(user);
        }

        billingAddressRepository.delete(billingAddress);
    }
}
