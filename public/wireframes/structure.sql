-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_e-commerce_Tabare
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_e-commerce_Tabare
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_e-commerce_Tabare` DEFAULT CHARACTER SET utf8 ;
USE `db_e-commerce_Tabare` ;

-- -----------------------------------------------------
-- Table `db_e-commerce_Tabare`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_e-commerce_Tabare`.`category` (
  `category_id(PK)` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`category_id(PK)`));


-- -----------------------------------------------------
-- Table `db_e-commerce_Tabare`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_e-commerce_Tabare`.`products` (
  `product_id(PK)` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NOT NULL,
  `price` FLOAT NOT NULL,
  `image` VARCHAR(100) NULL,
  `product_description` VARCHAR(5000) NULL,
  `features` VARCHAR(5000) NULL,
  `category_id` INT NOT NULL,
  `stock` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`product_id(PK)`),
  INDEX `category_id_idx` (`category_id` ASC),
  CONSTRAINT `category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `db_e-commerce_Tabare`.`category` (`category_id(PK)`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_e-commerce_Tabare`.`rols`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_e-commerce_Tabare`.`rols` (
  `rol_id` INT NOT NULL AUTO_INCREMENT,
  `rol_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`rol_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_e-commerce_Tabare`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_e-commerce_Tabare`.`users` (
  `user_id(PK)` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `user_name` VARCHAR(45) NOT NULL,
  `email` TINYTEXT NOT NULL,
  `image` VARCHAR(100) NULL,
  `user_password` TINYTEXT NOT NULL,
  `security_question` VARCHAR(100) NOT NULL,
  `security_answer` VARCHAR(100) NOT NULL,
  `rol_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`user_id(PK)`),
  INDEX `rol_id_idx` (`rol_id` ASC),
  CONSTRAINT `rol_id`
    FOREIGN KEY (`rol_id`)
    REFERENCES `db_e-commerce_Tabare`.`rols` (`rol_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_e-commerce_Tabare`.`carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_e-commerce_Tabare`.`carts` (
  `cart_id(PK)` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`cart_id(PK)`),
  INDEX `id_usuario_idx` (`user_id` ASC),
  CONSTRAINT `id_usuario`
    FOREIGN KEY (`user_id`)
    REFERENCES `db_e-commerce_Tabare`.`users` (`user_id(PK)`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '	';


-- -----------------------------------------------------
-- Table `db_e-commerce_Tabare`.`cart_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_e-commerce_Tabare`.`cart_details` (
  `cart_item_id(PK)` INT NOT NULL AUTO_INCREMENT,
  `cart_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`cart_item_id(PK)`),
  INDEX `id_carrito_idx` (`cart_id` ASC),
  INDEX `id_producto_idx` (`product_id` ASC),
  CONSTRAINT `id_carrito`
    FOREIGN KEY (`cart_id`)
    REFERENCES `db_e-commerce_Tabare`.`carts` (`cart_id(PK)`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_producto`
    FOREIGN KEY (`product_id`)
    REFERENCES `db_e-commerce_Tabare`.`products` (`product_id(PK)`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_e-commerce_Tabare`.`sizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_e-commerce_Tabare`.`sizes` (
  `size_id` INT NOT NULL AUTO_INCREMENT,
  `size_name` VARCHAR(45) NOT NULL,
  `size_description` VARCHAR(255) NULL,
  PRIMARY KEY (`size_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_e-commerce_Tabare`.`colors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_e-commerce_Tabare`.`colors` (
  `color_id` INT NOT NULL AUTO_INCREMENT,
  `color_name` VARCHAR(45) NOT NULL,
  `color_code` VARCHAR(45) NULL DEFAULT ' Código hexadecimal o RGB del color.',
  PRIMARY KEY (`color_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_e-commerce_Tabare`.`product_variations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_e-commerce_Tabare`.`product_variations` (
  `product_variation_id` INT NOT NULL AUTO_INCREMENT,
  `product_id_variations` INT NOT NULL,
  `size_id_variations` INT NOT NULL,
  `color_id_variations` INT NOT NULL,
  `stock` INT NOT NULL,
  PRIMARY KEY (`product_variation_id`),
  INDEX `product_id_idx` (`product_id_variations` ASC),
  INDEX `size_id_variatons_idx` (`size_id_variations` ASC),
  INDEX `color_id_variations_idx` (`color_id_variations` ASC),
  CONSTRAINT `product_id_variations`
    FOREIGN KEY (`product_id_variations`)
    REFERENCES `db_e-commerce_Tabare`.`products` (`product_id(PK)`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `size_id_variatons`
    FOREIGN KEY (`size_id_variations`)
    REFERENCES `db_e-commerce_Tabare`.`sizes` (`size_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `color_id_variations`
    FOREIGN KEY (`color_id_variations`)
    REFERENCES `db_e-commerce_Tabare`.`colors` (`color_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
