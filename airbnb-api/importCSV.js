const importCSV = () => {
    const listings = [];
    fs.createReadStream('listings.csv') // Path to your CSV file
      .pipe(csv())
      .on('data', (row) => {
        // Sanitize the price field by removing non-numeric characters
        const price = parseFloat(row.price.replace(/[^0-9.-]+/g, ''));
  
        if (isNaN(price)) {
          console.error(`Invalid price: ${row.price} for listing: ${row.name}`);
          return; // Skip this entry if the price is invalid
        }
  
        // Map the CSV data to the schema
        const listing = {
          name: row.name,
          summary: row.summary,
          property_type: row.property_type,
          bedrooms: Number(row.bedrooms),
          bathrooms: Number(row.bathrooms),
          price: price, // Store the sanitized price
          address: {
            street: row.street,
            suburb: row.suburb,
            country: row.country,
          },
          amenities: row.amenities.split(';'), // Assuming amenities are semicolon separated
          images: {
            picture_url: row.picture_url,
          },
        };
        listings.push(listing);
      })
      .on('end', () => {
        // Once the CSV has been read, insert the data into the database
        Listing.insertMany(listings)
          .then(() => {
            console.log('Data successfully imported into MongoDB');
            mongoose.disconnect(); // Disconnect after operation
          })
          .catch((error) => {
            console.error('Error importing data:', error);
            mongoose.disconnect();
          });
      });
  };
  