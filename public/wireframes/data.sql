

CREATE TABLE IF NOT EXISTS category (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(100)
);


DECLARE @json NVARCHAR(MAX);


SELECT @json = BulkColumn
FROM OPENROWSET(BULK 'src/data/category.json', SINGLE_CLOB) AS j;


INSERT INTO categories (
    category_id,
    category_name
)
SELECT 
    category_id,
    category_name
FROM OPENJSON(@json)
WITH (
    category_id INT,
    category_name VARCHAR(100)
);


CREATE TABLE IF NOT EXISTS products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(200),
    price DECIMAL(10,2),
    image VARCHAR(255),
    product_description NVARCHAR(MAX),
    category_id VARCHAR(50)
);

DECLARE @json NVARCHAR(MAX);

SELECT @json = BulkColumn
FROM OPENROWSET(BULK 'src/data/products.json', SINGLE_CLOB) AS j;

INSERT INTO products (
    product_id,
    product_name,
    price,
    image,
    product_description,
    category_id
)
SELECT 
    product_id,
    product_name,
    price,
    image,
    product_description,
    category_id
FROM OPENJSON(@json)
WITH (
    product_id INT,
    product_name VARCHAR(200),
    price DECIMAL(10,2),
    image VARCHAR(255),
    product_description NVARCHAR(MAX),
    category_id VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS rols (
    rol_id INT PRIMARY KEY,
    rol_name VARCHAR(100)
);

DECLARE @json VARCHAR;

SELECT @json = BulkColumn
FROM OPENROWSET(BULK 'src/data/rols.json', SINGLE_CLOB) AS j;

INSERT INTO rols (
    rol_id,
    rol_name
)
SELECT 
    rol_id,
    rol_name
FROM OPENJSON(@json)
WITH (
    rol_id INT,
    rol_name VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    user_name VARCHAR(100),
    email VARCHAR(255),
    image VARCHAR(255),
    user_password VARCHAR(255),
    security_question VARCHAR(255),
    security_answer VARCHAR(255),
    rol_id INT
);

SELECT @json = BulkColumn
FROM OPENROWSET(BULK 'src/data/users.json', SINGLE_CLOB) AS j;


INSERT INTO users (
    user_id,
    first_name,
    last_name,
    user_name,
    email,
    image,
    user_password,
    security_question,
    security_answer,
    rol_id
)
SELECT 
    user_id,
    first_name,
    last_name,
    user_name,
    email,
    image,
    user_password,
    security_question,
    security_answer,
    CAST(rol_id AS INT)
FROM OPENJSON(@json)
WITH ( 
    user_id INT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    user_name VARCHAR(100),
    email VARCHAR(255),
    image VARCHAR(255),
    user_password VARCHAR(255),
    security_question VARCHAR(255),
    security_answer VARCHAR(255),
    rol_id VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS carts (
    cart_id INT PRIMARY KEY,
    user_id INT,
    created_at TIMESTAMP
);

SELECT @json = BulkColumn
FROM OPENROWSET(BULK 'src/data/carts.json', SINGLE_CLOB) AS j;

INSERT INTO carts (
    cart_id,
    user_id,
    created_at
)
SELECT 
    cart_id,
    user_id,
    created_at
FROM OPENJSON(@json)
WITH (
    cart_id INT,
    user_id INT,
    created_at DATETIME
);

CREATE TABLE IF NOT EXISTS cart_details (
    cart_item_id INT PRIMARY KEY,
    cart_id INT,
    quantity INT,
    created_at TIMESTAMP,
    product_id INT
);

SELECT @json = BulkColumn
FROM OPENROWSET(BULK 'src/data/cart_details.json', SINGLE_CLOB) AS j;

INSERT INTO cart_details (
    cart_item_id,
    cart_id,
    quantity,
    created_at,
    product_id
)
SELECT 
    cart_item_id,
    cart_id,
    quantity,
    created_at,
    product_id
FROM OPENJSON(@json)
WITH (
    cart_item_id INT,
    cart_id INT,
    quantity INT,
    created_at DATETIME,
    product_id INT
);

CREATE TABLE IF NOT EXISTS sizes (
    size_id INT PRIMARY KEY,
    size_name VARCHAR(100)
    size_description VARCHAR(255)
);

SELECT @json = BulkColumn
FROM OPENROWSET(BULK 'src/data/sizes.json', SINGLE_CLOB) AS j;

INSERT INTO sizes (
    size_id,
    size_name,
    size_description
)
SELECT 
    size_id,
    size_name,
    size_description
    FROM OPENJSON(@json)
    WITH (
        size_id INT,
        size_name VARCHAR(100),
        size_description VARCHAR(255)
    );

    CREATE TABLE IF NOT EXISTS colors (
    color_id INT PRIMARY KEY,
    color_name VARCHAR(100),
    color_code VARCHAR(255)
);

SELECT @json = BulkColumn
FROM OPENROWSET(BULK 'src/data/colors.json', SINGLE_CLOB) AS j;

INSERT INTO colors (
    color_id,
    color_name,
    color_code
)
SELECT 
    color_id,
    color_name,
    color_code
    FROM OPENJSON(@json)
    WITH (
        color_id INT,
        color_name VARCHAR(100),
        color_code VARCHAR(255)
    );