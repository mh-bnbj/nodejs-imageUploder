-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema imageUploader
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema imageUploader
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `imageUploader` DEFAULT CHARACTER SET utf8 ;
USE `imageUploader` ;

-- -----------------------------------------------------
-- Table `imageUploader`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `imageUploader`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(31) NOT NULL,
  `password` VARCHAR(127) NOT NULL,
  `token` VARCHAR(127) NULL,
  `token_expireDate` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `imageUploader`.`image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `imageUploader`.`image` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` TINYTEXT NOT NULL,
  `href` MEDIUMTEXT NOT NULL,
  `created_date` DATETIME NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_image_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_image_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
