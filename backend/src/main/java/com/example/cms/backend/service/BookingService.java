//package com.example.cms.backend.service;
//
//import com.example.cms.backend.dto.ReqRes;
//import com.example.cms.backend.entity.Booking;
//import com.example.cms.backend.entity.User;
//import com.example.cms.backend.repository.BookingRepo;
//import com.example.cms.backend.repository.UserRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.util.List;
//
//@Service
//public class BookingService {
//
//    @Autowired
//    private BookingRepo bookingRepo;
//
//    @Autowired
//    private UserRepo userRepo;
//
//    public ReqRes createBooking(ReqRes bookingRequest) {
//        ReqRes response = new ReqRes();
//        try {
//            User user = userRepo.findById(bookingRequest.getUserId())
//                    .orElseThrow(() -> new RuntimeException("User not found"));
//
//            Booking booking = new Booking();
//            booking.setUser(user);
//            booking.setMenuId(bookingRequest.getMenuId());
//            booking.setDate(LocalDate.parse(bookingRequest.getDate()));
//            booking.setMealCount(bookingRequest.getMealCount());
//
//            Booking savedBooking = bookingRepo.save(booking);
//            response.setBooking(savedBooking);
//            response.setMessage("Booking created successfully");
//            response.setStatusCode(200);
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setError(e.getMessage());
//        }
//        return response;
//    }
//
//    public ReqRes cancelBooking(Long bookingId) {
//        ReqRes response = new ReqRes();
//        try {
//            Booking booking = bookingRepo.findById(bookingId)
//                    .orElseThrow(() -> new RuntimeException("Booking not found"));
//            booking.setCancelled(true);
//            Booking updatedBooking = bookingRepo.save(booking);
//            response.setBooking(updatedBooking);
//            response.setMessage("Booking cancelled successfully");
//            response.setStatusCode(200);
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setError(e.getMessage());
//        }
//        return response;
//    }
//
//    public ReqRes getUserBookingsForDate(Integer userId, String date) {
//        ReqRes response = new ReqRes();
//        try {
//            List<Booking> bookings = bookingRepo.findByUserIdAndDate(userId, LocalDate.parse(date));
//            response.setBookingList(bookings);
//            response.setMessage("Bookings retrieved successfully");
//            response.setStatusCode(200);
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setError(e.getMessage());
//        }
//        return response;
//    }
//
//    public ReqRes getAllBookings() {
//        ReqRes response = new ReqRes();
//        try {
//            List<Booking> bookings = bookingRepo.findAll();
//            response.setBookingList(bookings);
//            response.setMessage("All bookings retrieved successfully");
//            response.setStatusCode(200);
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setError(e.getMessage());
//        }
//        return response;
//    }
//}

//package com.example.cms.backend.service;
//
//import com.example.cms.backend.dto.ReqRes;
//import com.example.cms.backend.entity.Booking;
//import com.example.cms.backend.entity.User;
//import com.example.cms.backend.repository.BookingRepo;
//import com.example.cms.backend.repository.UserRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.util.List;
//
//@Service
//public class BookingService {
//
//    @Autowired
//    private BookingRepo bookingRepo;
//
//    @Autowired
//    private UserRepo userRepo;
//
//    public ReqRes createBooking(Integer userId, ReqRes bookingRequest) {
//        ReqRes response = new ReqRes();
//        try {
//            User user = userRepo.findById(userId)
//                    .orElseThrow(() -> new RuntimeException("User not found"));
//
//            Booking booking = new Booking();
//            booking.setUser(user);
//            booking.setMenuId(bookingRequest.getMenuId());
//            booking.setDate(LocalDate.parse(bookingRequest.getDate()));
//            booking.setMealCount(bookingRequest.getMealCount());
//
//            Booking savedBooking = bookingRepo.save(booking);
//            response.setBooking(savedBooking);
//            response.setMessage("Booking created successfully");
//            response.setStatusCode(200);
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setError(e.getMessage());
//        }
//        return response;
//    }
//
//    public ReqRes cancelBooking(Integer userId, Long bookingId) {
//        ReqRes response = new ReqRes();
//        try {
//            User user = userRepo.findById(userId)
//                    .orElseThrow(() -> new RuntimeException("User not found"));
//
//            Booking booking = bookingRepo.findById(bookingId)
//                    .orElseThrow(() -> new RuntimeException("Booking not found"));
//
//            if (!booking.getUser().getId().equals(userId) && !user.getRole().equals("ADMIN")) {
//                throw new RuntimeException("Unauthorized to cancel this booking");
//            }
//
//            booking.setCancelled(true);
//            Booking updatedBooking = bookingRepo.save(booking);
//            response.setBooking(updatedBooking);
//            response.setMessage("Booking cancelled successfully");
//            response.setStatusCode(200);
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setError(e.getMessage());
//        }
//        return response;
//    }
//
//    public ReqRes getUserBookingsForDate(Integer userId, String date) {
//        ReqRes response = new ReqRes();
//        try {
//            User user = userRepo.findById(userId)
//                    .orElseThrow(() -> new RuntimeException("User not found"));
//
//            List<Booking> bookings = bookingRepo.findByUserIdAndDate(userId, LocalDate.parse(date));
//            response.setBookingList(bookings);
//            response.setMessage("Bookings retrieved successfully");
//            response.setStatusCode(200);
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setError(e.getMessage());
//        }
//        return response;
//    }
//
//    public ReqRes getAllBookings(Integer userId) {
//        ReqRes response = new ReqRes();
//        try {
//            User user = userRepo.findById(userId)
//                    .orElseThrow(() -> new RuntimeException("User not found"));
//
//            if (!user.getRole().equals("ADMIN")) {
//                throw new RuntimeException("Unauthorized to view all bookings");
//            }
//
//            List<Booking> bookings = bookingRepo.findAll();
//            response.setBookingList(bookings);
//            response.setMessage("All bookings retrieved successfully");
//            response.setStatusCode(200);
//        } catch (Exception e) {
//            response.setStatusCode(500);
//            response.setError(e.getMessage());
//        }
//        return response;
//    }
//}


package com.example.cms.backend.service;

import com.example.cms.backend.dto.ReqRes;
import com.example.cms.backend.entity.Booking;
import com.example.cms.backend.entity.Menu;
import com.example.cms.backend.entity.User;
import com.example.cms.backend.repository.BookingRepo;
import com.example.cms.backend.repository.MenuRepo;
import com.example.cms.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private MenuRepo menuRepo;

    //added upload menu
    public void uploadMenu(MultipartFile file) throws IOException {
        Menu menu = new Menu();
        menu.setUploadDate(LocalDate.now());
        menu.setPdfData(file.getBytes());
        menuRepo.save(menu);
    }

    //added get menu
    public Menu getLatestMenu() {
        return menuRepo.findTopByOrderByUploadDateDesc();
    }

    public ReqRes createBooking(Integer userId, ReqRes bookingRequest) {
        ReqRes response = new ReqRes();
        try {
            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            LocalDate bookingDate = LocalDate.parse(bookingRequest.getDate());
            if (bookingDate.isBefore(LocalDate.now())) {
                throw new IllegalArgumentException("Cannot book for past dates");
            }

            Booking booking = new Booking();
            booking.setUser(user);
            booking.setDate(bookingDate);
            booking.setMealCount(bookingRequest.getMealCount());
            booking.setEvent(bookingRequest.getEvent());
            booking.setRefNo(bookingRequest.getRefNo());
            booking.setRemark(bookingRequest.getRemark());

            Booking savedBooking = bookingRepo.save(booking);
            response.setBooking(savedBooking);
            response.setMessage("Booking created successfully");
            response.setStatusCode(200);

            // Send confirmation email
            String subject = "Booking Confirmation \uD83C\uDF8A";
//            String body = "Dear " + user.getName() + ",\n\nYour Meal booking has been confirmed for " + bookingDate + ".\n\nNo of Meals:" + booking.getMealCount();
            String body = "\uD83C\uDF7D\uFE0F Booking Confirmed!! \uD83C\uDF7D\uFE0F\n" +
                    "\n" +
                    "Hello " + user.getName() + ",\n" +
                    "\n" +
                    "Your meal booking has been successfully confirmed! \uD83E\uDD73. Here are the details:\n" +
                    "\n" +
                    "\uD83D\uDCC5 Date: " + bookingDate + "\n" +
                    "\uD83C\uDF74 Number of Meals: " + booking.getMealCount() + "\n" +
                    "\n" +
                    "We’re excited to serve you a delicious meal. Enjoy your break and have a great day at work!\n" +
                    "\n" +
                    "Bon appétit!" ;
            emailService.sendBookingConfirmationEmail(user.getEmail(), subject, body);
        } catch (Exception e) {
            response.setStatusCode(400);
            response.setError(e.getMessage());
        }
        return response;
    }

    public ReqRes cancelBooking(Integer userId, Long bookingId) {
        ReqRes response = new ReqRes();
        try {
            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Booking booking = bookingRepo.findById(bookingId)
                    .orElseThrow(() -> new RuntimeException("Booking not found"));

            if (!booking.getUser().getId().equals(userId) && !user.getRole().equals("ADMIN")) {
                throw new RuntimeException("Unauthorized to cancel this booking");
            }

            LocalDate today = LocalDate.now();
            if (booking.getDate().isBefore(today)) {
                throw new IllegalStateException("Cannot cancel past bookings");
            }

            if (booking.getDate().isEqual(today)) {
                LocalDate cancellationDeadline = LocalDate.now().atStartOfDay().plusHours(10).toLocalDate();
                if (LocalDate.now().isAfter(cancellationDeadline)) {
                    throw new IllegalStateException("Meal cancellation is only allowed until 11:00 AM for today's bookings");
                }
            }

            booking.setCancelled(true);
            Booking updatedBooking = bookingRepo.save(booking);
            response.setBooking(updatedBooking);
            response.setMessage("Booking cancelled successfully");
            response.setStatusCode(200);
        } catch (Exception e) {
            response.setStatusCode(400);
            response.setError(e.getMessage());
        }
        return response;
    }

    public ReqRes getUserBookings(Integer userId, LocalDate date) {
        ReqRes response = new ReqRes();
        try {
            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<Booking> bookings;
            if (date != null) {
                bookings = bookingRepo.findByUser_IdAndDateOrderByDateDesc(userId, date);
            } else {
                bookings = bookingRepo.findByUser_IdOrderByDateDesc(userId);
            }
            response.setBookingList(bookings);
            response.setMessage("Bookings retrieved successfully");
            response.setStatusCode(200);
        } catch (Exception e) {
            response.setStatusCode(400);
            response.setError(e.getMessage());
        }
        return response;
    }

    public ReqRes getTodayBookings(Integer userId, LocalDate date) {
        ReqRes response = new ReqRes();
        try {
            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (!user.getRole().equals("ADMIN")) {
                throw new RuntimeException("Unauthorized to view all bookings");
            }

            List<Booking> bookings = bookingRepo.findByDateOrderByDateDesc(date);

            int totalCancelledBookings = (int) bookings.stream().filter(Booking::isCancelled).count();
            int totalConfirmedBookings = bookings.size() - totalCancelledBookings;

//            response.setCount(bookings.size());
            response.setTodayCancellations(totalCancelledBookings);
            response.setTodayBookings(totalConfirmedBookings);
            response.setBookingList(bookings);
            response.setMessage("Today's bookings retrieved successfully");
            response.setStatusCode(200);
        } catch (Exception e) {
            response.setStatusCode(400);
            response.setError(e.getMessage());
        }
        return response;
    }

    public ReqRes createEmergencyBooking(Integer userId, ReqRes bookingRequest) {
        ReqRes response = new ReqRes();
        try {
            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (!user.getRole().equals("ADMIN")) {
                throw new RuntimeException("Only admins can book emergency meals");
            }

            Booking booking = new Booking();
            booking.setUser(user);
            booking.setDate(LocalDate.now());
            booking.setMealCount(bookingRequest.getMealCount());

            Booking savedBooking = bookingRepo.save(booking);
            response.setBooking(savedBooking);
            response.setMessage("Emergency meal booked successfully");
            response.setStatusCode(200);
        } catch (Exception e) {
            response.setStatusCode(400);
            response.setError(e.getMessage());
        }
        return response;
    }

    public ReqRes getAllBookings(Integer userId) {
        ReqRes response = new ReqRes();
        try {
            User user = userRepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (!user.getRole().equals("ADMIN")) {
                throw new RuntimeException("Unauthorized to view all bookings");
            }

            List<Booking> bookings = bookingRepo.findAll();
            response.setBookingList(bookings);
            response.setMessage("All bookings retrieved successfully");
            response.setStatusCode(200);
        } catch (Exception e) {
            response.setStatusCode(400);
            response.setError(e.getMessage());
        }
        return response;
    }
}