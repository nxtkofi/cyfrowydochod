package pl.server.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



@SpringBootApplication
public class ServerApplication{

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

// //		userController.createUser(new User("Jakub","@gra.pl","xyz"));

// //		billingAddressController.addBillingAddress(String.valueOf(userController.findByEmail("@gra.pl").getId()),new BillingAddress("Jakub Kaczyński","ul.publiczna",8,"42-986","Warszawa"));
// //		billingAddressController.UpdateBillingAddress(user,new BillingAddress("Jakub Kaczyński","ul.publiczna",10,"42-986","Warszawa"));
// //
// //		var cos = billingAddressController.getBillingAddress(userController.findByEmail("@gra.pl").getId());
// //		System.out.println(cos.getStreetName());

// //		billingAddressController.deleteBillingAddress(userController.findByEmail("@gra.pl").getBillingAddress().getAddressId());


// //		List<String> allBooks = new ArrayList<>();
// //		allBooks.add(bookController.getBookById("39396fc7-7da1-4c6c-a686-7d249c7a51d1").getId());
// //		allBooks.add(bookController.getBookById("73899dcd-5291-4c6c-8c69-ba9c845f6a4b").getId());
// //		allBooks.add(bookController.getBookById("aff07518-faa0-4504-bca5-80245fb354da").getId());
// //		ordersService.createOrderFromCart(allBooks , userRepository.findByEmail("@gra.pl"));

// //		bookController.createBook(new Book("Harry Potter","Fantasy","R.K.Ktośtam",20));
// // 		for tests
// 	}
}
