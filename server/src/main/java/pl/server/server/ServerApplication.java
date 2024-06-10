package pl.server.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import pl.server.server.controllers.BillingAddressController;
import pl.server.server.controllers.BookController;
import pl.server.server.controllers.OrdersController;
import pl.server.server.controllers.UserController;
import pl.server.server.models.BillingAddress;
import pl.server.server.models.User;
import pl.server.server.repositories.BillingAddressRepository;
import pl.server.server.repositories.BookRepository;
import pl.server.server.repositories.OrdersRepository;
import pl.server.server.repositories.UserRepository;

import java.util.List;


@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class ServerApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}
	@Autowired
	UserRepository userRepository;
	@Autowired
	UserController userController;
	@Autowired
	BookController bookController;
	@Autowired
	BillingAddressController billingAddressController;
	@Autowired
	OrdersController ordersController;
	@Override
	public void run(String... args) throws Exception {

//		userController.createUser(new User("Jakub","@gra.pl","xyz"));

//		billingAddressController.addBillingAddress(String.valueOf(userController.findByEmail("@gra.pl").getId()),new BillingAddress("Jakub Kaczyński","ul.publiczna",8,"42-986","Warszawa"));
//		var user = userController.findByEmail("@gra.pl").getId();
//		billingAddressController.UpdateBillingAddress(user,new BillingAddress("Jakub Kaczyński","ul.publiczna",10,"42-986","Warszawa"));
//
//		var cos = billingAddressController.getBillingAddress(userController.findByEmail("@gra.pl").getId());
//		System.out.println(cos.getStreetName());

//		billingAddressController.deleteBillingAddress(userController.findByEmail("@gra.pl").getBillingAddress().getAddressId());
		// for tests
	}
}
