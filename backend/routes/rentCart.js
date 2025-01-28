const express = require('express');
const router = express.Router();
const RentCart = require('../models/RentCart');

// Route to add a product to the rent cart
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, description, pickupDate, returnDate } = req.body;

    // Ensure dates are in the correct format for comparison
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);

    // Check if the product is already rented for any overlapping period
    const existingRent = await RentCart.findOne({
      product: productId,
      $or: [
        {
          // Case where existing rent starts before or at the new pickup date and ends after or at the new pickup date
          pickupDate: { $lte: pickup },
          returnDate: { $gte: pickup },
        },
        {
          // Case where existing rent starts before or at the new return date and ends after or at the new return date
          pickupDate: { $lte: returnD },
          returnDate: { $gte: returnD },
        },
        {
          // Case where existing rent fully covers the new rental period
          pickupDate: { $gte: pickup },
          returnDate: { $lte: returnD },
        },
      ],
    });

    if (existingRent) {
      return res.status(400).json({
        message: "This product is already rented for the selected dates.",
      });
    }

    // Create a new rent cart object
    const newRentCart = new RentCart({
      user: userId,
      product: productId,
      pickupDate: pickupDate,
      returnDate: returnDate,
    });

    // Save the rent cart to the database
    await newRentCart.save();

    res.status(201).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to fetch rent cart items for a specific user
router.get('/:userId', async (req, res) => {
  try {
      const userId = req.params.userId;
      const rentCartItems = await RentCart.find({ user: userId }).populate('product');
      res.json(rentCartItems);
  } catch (error) {
      console.error('Error fetching rent cart items:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to delete a rent cart item
router.delete('/delete/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;
    await RentCart.findByIdAndDelete(itemId);
    res.status(200).json({ message: 'Rent cart item deleted successfully' });
  } catch (error) {
    console.error('Error deleting rent cart item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to clear all rent cart items for a specific user
router.delete('/clearCart/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    await RentCart.deleteMany({ user: userId });
    res.status(200).json({ message: 'All rent cart items cleared successfully' });
  } catch (error) {
    console.error('Error clearing rent cart items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
