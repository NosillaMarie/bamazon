CREATE database bamazon;

use bamazon;

CREATE TABLE products (
	item_id INTEGER (11) auto_increment not null,
    product_name VARCHAR(50) not null,
    department_name VARCHAR(50) not null,
    sale_price INTEGER(11) not null,
    availible_quantity integer(11),
    PRIMARY KEY(item_id)
    );
    
    INSERT INTO products (product_name, department_name, sale_price, availible_quantity)
		VALUES ('Case for iPhone 7 -Space Black', 'Cell Phone Cases', 9.99, 20),
					   ('Self-Therapy Note Pad', 'Memo & Scratch Pads', 6.95, 55),
                       ('nonda USB-C to USB 3.0', 'Gadgets', 8.78, 150),
                       ('Instant Pot Duo Mini Pressure Cooker', 'Kitchen & Dining', 69.99, 37),
                       ('Labrador Buddies Soft Throw Blanket', 'Home & Kitchen', 15.29, 75),
                       ('Newspaper Squeaky Toy', 'Dog Toys', 9.99, 132),
                       ('Paisley Apple Watch Band', 'Women' 's Fashion', 32.99, 23),
                       ('Pearl Earings', 'Women' 's Fashion', 117.99, 60);
                       
    select * from products;
    
    
INSERT INTO products (product_name, department_name, sale_price, availible_quantity)
	VALUES('30oz Yeti Tumbler', 'Kitchen & Dining', 29.99, 78),
				  ('Custom Monogram Vinyl Sticker', 'Handmade Home Decor', 6.00, 99);