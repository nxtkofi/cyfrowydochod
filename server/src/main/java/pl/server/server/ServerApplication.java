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
import pl.server.server.models.Book;
import pl.server.server.models.User;
import pl.server.server.repositories.BillingAddressRepository;
import pl.server.server.repositories.BookRepository;
import pl.server.server.repositories.OrdersRepository;
import pl.server.server.repositories.UserRepository;
import pl.server.server.services.OrdersService;
import pl.server.server.services.UserService;

import java.util.ArrayList;
import java.util.List;


@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}
// 	@Autowired
// 	UserRepository userRepository;
// 	@Autowired
// 	UserController userController;
// 	@Autowired
// 	BookController bookController;
// 	@Autowired
// 	BillingAddressController billingAddressController;
// 	@Autowired
// 	OrdersController ordersController;

// 	@Autowired
// 	OrdersService ordersService;

// 	@Override
// 	public void run(String... args) throws Exception {

//		userController.createUser(new User("Jakub","@gra.pl","xyz"));

//		billingAddressController.addBillingAddress(String.valueOf(userController.findByEmail("@gra.pl").getId()),new BillingAddress("Jakub Kaczyński","ul.publiczna",8,"42-986","Warszawa"));
//		var user = userController.findByEmail("@gra.pl").getId();
//		billingAddressController.UpdateBillingAddress(user,new BillingAddress("Jakub Kaczyński","ul.publiczna",10,"42-986","Warszawa"));
//
//		var cos = billingAddressController.getBillingAddress(userController.findByEmail("@gra.pl").getId());
//		System.out.println(cos.getStreetName());

//		billingAddressController.deleteBillingAddress(userController.findByEmail("@gra.pl").getBillingAddress().getAddressId());
//		bookController.createBook(new Book("Witcher","Fantasy","Sapkowski",40));
//		bookController.createBook(new Book("Niezgodna","IDK","ktos",35));
//		bookController.createBook(new Book("Harry potter","Fantasy","J.K.Rowling",50));


//		bookController.updateBook("73899dcd-5291-4c6c-8c69-ba9c845f6a4b",new Book("Sapkowkski","Witcher","Fantasy",40));
//		List<String> allBooks = new ArrayList<>();
//		allBooks.add(bookController.getBookById("21883c7e-61af-4fa6-9caf-d321c562d47f").getId());
//		allBooks.add(bookController.getBookById("e99f04b8-a60f-432b-99cd-debcda5d8c6c").getId());
//		allBooks.add(bookController.getBookById("ca3a85ab-93ba-4d1c-a911-ff42ab5ad8b1").getId());
//		ordersService.createOrderFromCart(allBooks , userRepository.findByEmail("KrzysztofKrawczyk@onet.pl"));

//		bookController.createBook(new Book("Harry Potter","Fantasy","R.K.Ktośtam",20));
// 		for tests
	}
//}
