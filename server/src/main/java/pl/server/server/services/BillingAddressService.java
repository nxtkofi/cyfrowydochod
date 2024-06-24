package pl.server.server.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
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
        try {
            return billingAddressRepository.findByUserId(userId);
        } catch (Exception ex){
            System.err.println(ex);
            return null;
        }
    }

    @Transactional
    public BillingAddress createBillingAddress(String userId,BillingAddress newBillingAddress) {
        try {
            User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));

            user.setBillingAddress(newBillingAddress);
            newBillingAddress.setUser(user);
            userRepository.save(user);
            return billingAddressRepository.save(newBillingAddress);
        } catch (Exception ex) {
            System.err.println(ex);
            return null;
        }
    }

    public BillingAddress updateBillingAddress(String userId,BillingAddress newBillingAddress) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            if (!billingAddressRepository.existsById(user.getBillingAddress().getAddressId())) {
                throw new ResourceNotFoundException("user billing address does not exist");
            }

            BillingAddress addressToUpdate = user.getBillingAddress();
            BeanUtils.copyProperties(newBillingAddress,addressToUpdate,"addressId");
            billingAddressRepository.save(addressToUpdate);
            return addressToUpdate;
        } catch (Exception ex) {
            System.err.println(ex);
            return null;
        }
    }

    @Transactional
    public void deleteBillingAddress(String billingAddressId) {
        try {
            BillingAddress billingAddress = billingAddressRepository.findById(billingAddressId)
                    .orElseThrow(() -> new ResourceNotFoundException("Billing Address not found"));

            User user = billingAddress.getUser();
            if (user != null) {
                user.setBillingAddress(null);
                userRepository.save(user);
            }

            billingAddressRepository.delete(billingAddress);
        } catch (Exception ex) {
            System.err.println(ex);
        }
    }
}
