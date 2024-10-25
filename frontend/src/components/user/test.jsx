const handleBookMeal = async (e) => {
  e.preventDefault();

  const now = new Date();
  const bookDate = new Date(date);

  // Ensure booking date is not in the past
  if (bookDate < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
    alert("Cannot book for past days.");
    return;
  }

  // Ensure bookings for today are before 11:00 AM
  const isToday = bookDate.toDateString() === now.toDateString();
  if (isToday && now.getHours() >= 11) {
    alert("Booking is not allowed after 11:00 AM for today.");
    return;
  }

  try {
    await MealBookingService.bookMeal(currentUserId, { date, mealCount });
    setMessage("Booking successful!");
    setDate("");
    setMealCount(1);
    alert("Meal booked successfully!");
  } catch (error) {
    console.error("Error booking meal:", error);
    setMessage("Error creating booking. Please try again.");
    alert("Failed to book meal. Please try again.");
  }
};
