-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2021 at 10:59 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fashionstore`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `search_advanced` (`prod_cat` VARCHAR(100), `prod_name` VARCHAR(100), `prod_pricefrom` INT, `prod_priceto` INT)  BEGIN
select p.id,p.categoryid,p.name,p.describes,p.price,p.image,p.quantity,p.article
from product as p
where p.name like prod_name 
and p.price between prod_pricefrom and prod_priceto 
and p.categoryid=prod_cat;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `customer_id` int(11) NOT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `account_roles`
--

CREATE TABLE `account_roles` (
  `id` int(11) NOT NULL,
  `role` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(30) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `alias` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `alias`) VALUES
(23, 'Thời trang nam', 0),
(24, 'Thời trang nữ', 0),
(25, 'Thời trang bé trai', 0),
(26, 'Thời trang bé gái', 0),
(28, 'Thời trang bà bầu', 0),
(30, 'Thời trang công sở', 0);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `phonenumber` varchar(12) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `fullname`, `address`, `phonenumber`, `email`) VALUES
(16, 'Harry', 'Văn Quán', '01656286765', ''),
(17, 'HarryWhite', 'Văn Quán', '01656286799', ''),
(18, 'Lucky Luke', 'ha noi', '12345678', '');

--
-- Triggers `customer`
--
DELIMITER $$
CREATE TRIGGER `delete_customer` AFTER DELETE ON `customer` FOR EACH ROW begin
delete from user where username=old.username;
end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `import_bill`
--

CREATE TABLE `import_bill` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `import_code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `import_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `import_bill_detail`
--

CREATE TABLE `import_bill_detail` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `import_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `import_code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `import_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(145) CHARACTER SET utf8 DEFAULT NULL,
  `content` text CHARACTER SET utf8 DEFAULT NULL,
  `createddate` datetime NOT NULL,
  `image` blob NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 NOT NULL,
  `edit_date` datetime NOT NULL,
  `alias` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `title`, `content`, `createddate`, `image`, `description`, `edit_date`, `alias`) VALUES
(1, 'Giới thiệu công ty', '<p>abc</p>', '0000-00-00 00:00:00', '', '', '0000-00-00 00:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `news_img`
--

CREATE TABLE `news_img` (
  `id` int(11) NOT NULL,
  `file` blob NOT NULL,
  `alias` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE `orderdetail` (
  `id` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `ship_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `total` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `customer_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `customer_phone` varchar(12) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orderdetail`
--

INSERT INTO `orderdetail` (`id`, `productid`, `order_id`, `customer_id`, `ship_date`, `total`, `quantity`, `customer_address`, `customer_phone`) VALUES
(1, 1, 0, 0, '2021-02-23 08:46:22', 0, 0, '', ''),
(2, 3, 0, 0, '2021-02-23 08:46:22', 0, 0, '', ''),
(4, 3, 0, 0, '2021-02-23 08:46:22', 0, 0, '', ''),
(9, 9, 0, 0, '2021-02-23 08:46:22', 0, 0, '', ''),
(10, 1, 0, 0, '2021-02-23 08:46:22', 0, 0, '', ''),
(11, 7, 0, 0, '2021-02-23 08:46:22', 0, 0, '', ''),
(12, 5, 0, 0, '2021-02-23 08:46:22', 0, 0, '', ''),
(13, 10, 0, 0, '2021-02-23 08:46:22', 0, 0, '', ''),
(14, 7, 0, 0, '2021-02-23 08:46:22', 0, 0, '', ''),
(15, 1, 0, 0, '2021-02-23 08:46:22', 0, 0, '', ''),
(16, 9, 0, 0, '2021-02-23 08:46:22', 0, 0, '', ''),
(17, 13, 0, 0, '2021-02-23 08:46:22', 0, 0, '', ''),
(18, 18, 0, 0, '2021-02-23 08:46:22', 0, 0, '', ''),
(19, 14, 0, 0, '2021-02-23 08:46:22', 0, 0, '', ''),
(20, 14, 0, 0, '2021-02-23 08:46:22', 0, 0, '', ''),
(21, 19, 0, 0, '2021-02-23 08:46:22', 0, 0, '', ''),
(22, 9, 0, 0, '2021-02-23 08:46:22', 0, 0, '', ''),
(23, 3, 0, 0, '2021-02-23 08:46:22', 0, 0, '', '');

--
-- Triggers `orderdetail`
--
DELIMITER $$
CREATE TRIGGER `update_quantity_2` AFTER INSERT ON `orderdetail` FOR EACH ROW begin
declare soluong integer;
set soluong=(select quantity from product where product.id=NEW.productid limit 1);
if (NEW.quantity < soluong) then
update product
set product.quantity=product.quantity-NEW.quantity
where product.id=NEW.productid;
end if;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_quantity_3` AFTER UPDATE ON `orderdetail` FOR EACH ROW begin
declare soluong integer;
set soluong=(select quantity from product where product.id=NEW.productid limit 1);
if (NEW.quantity < soluong) then
update product
set product.quantity=product.quantity-NEW.quantity
where product.id=NEW.productid;
end if;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `customerid` int(11) NOT NULL,
  `product_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `order_date` date NOT NULL,
  `quantity` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customerid`, `product_name`, `order_date`, `quantity`, `payment_id`) VALUES
(36, 16, '', '0000-00-00', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `categoryid` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `price` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `image` blob DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `vendor` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `evaluation` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `comments` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `categoryid`, `name`, `description`, `price`, `image`, `quantity`, `vendor`, `evaluation`, `comments`) VALUES
(1, 26, 'váy hồng xinh xắn', 'váy hồng cho bé gái 10 tuổi, chất lượng vải đẹp, màu sắc trang nhã', '200', 0x312e6a7067, 2, 'Mua hè này hãy mua cho con bạn những bộ đồ xinh xắn, đi du lịch, đi chơi và trong nhiều hoạt động khác', '', ''),
(3, 26, 'váy bò ', 'váy bò xinh xắn cho bé [New]', '350', 0x322e6a7067, 2, NULL, '', ''),
(5, 26, 'váy hồng có mũ', 'váy hồng có mũ, chất liệu vải cotton', '250', 0x332e6a7067, 12, NULL, '', ''),
(7, 26, 'váy bò xanh', 'váy bò màu xanh, cá tính', '400', 0x342e6a7067, 8, NULL, '', ''),
(8, 26, 'váy hồng có hoa', 'váy hồng có hoa, điệu đà cho bé gái', '230', 0x352e6a7067, 5, NULL, '', ''),
(9, 26, 'váy đỏ có túi', 'váy đỏ, 2 túi, cho bé năng động', '320', 0x372e6a7067, 2, NULL, '', ''),
(10, 26, 'chân váy hồng', 'váy hồng, xếp tầng, cho bé năng động', '135', 0x382e6a7067, 11, NULL, '', ''),
(11, 25, ' Bộ đồ sooc áo phông xanh', 'Bộ đồ sooc áo phông xanh [New]', '350', 0x74726169312e6a7067, 5, '<p>test noi dung<img src=\"tinymce/plugins/emoticons/img/smiley-wink.gif\" alt=\"\" /></p>', '', ''),
(12, 25, 'Bộ đồ sooc áo 3 lỗ trắng', 'áo ba lỗ trắng viền xanh thẫm, quần đùi chất liệu bò', '500', 0x74726169322e6a7067, 10, '<p>bai viet cho bo do nay</p>', '', ''),
(13, 25, 'Bộ sooc áo somi', 'Quần sooc xanh, áo sơ mi cộc tay sọc đỏ trắng', '345', 0x74726169332e6a7067, 10, '<p><span style=\"color: #333333;\">LT_BT037</span><br style=\"color: #333333;\" /><strong><span style=\"color: #333333;\">BỘ B&Eacute; TRAI CHILDRENS (USA)</span></strong><br style=\"color: #333333;\" /><span style=\"color: #333333;\">Size: 18M</span><br style=\"col', '', ''),
(14, 25, 'Bộ sooc có quai', 'Bộ sooc có quai, áo sơ mi trắng cho bé nam tự tin, lịch lãm', '510', 0x74726169342e6a7067, 1, '<p><img class=\"lazy\" style=\"display: inline;\" src=\"http://media3.sendo.vn/img/2013/11_10/bt3_2i3ra3og7t3fn_simg_19a19b_600x497_max.jpg\" alt=\"\" data-original=\"http://media3.sendo.vn/img/2013/11_10/bt3_2i3ra3og7t3fn_simg_19a19b_600x497_max.jpg\" /><img class', '', ''),
(15, 23, 'Áo thun cá sấu Trắng AT468-1', 'Áo thun cá sấu Trắng AT468-1', '150', 0x6e616d312e6a7067, 5, '', '', ''),
(16, 23, 'Áo Sơ Mi Nam Tay Dài Caro Xanh D9 - 9142', 'Công sở, Dạo phố, Dự tiệc ', '166', 0x6e616d322e6a7067, 11, '<p><strong>&Aacute;O SƠ MI THỜI TRANG NAM</strong></p>\r\n<p>C&aacute;c bạn xem th&ecirc;m sản phẩm của Mini Fashion tại:</p>\r\n<p><a href=\"http://www.sendo.vn/shop/minifashion\">http://www.sendo.vn/shop/minifashion</a></p>\r\n<p><strong>Th&ocirc;ng tin v&agrav', '', ''),
(17, 23, 'Áo polo Evisu Thời trang EVI_01', 'Dự tiệc, Thể thao, Công sở, Dã ngoại, Dạo phố, Mặc nhà ', '140', 0x6e616d332e6a7067, 30, '', '', ''),
(18, 24, 'Áo Sơ Mi Vai Đính Nút S191', 'Lụa tơ tằm ', '141', 0x6e75312e6a7067, 3, '<p style=\"margin-top: 0px; margin-bottom: 20px; font-family: Arial, Helvetica, sans-serif; font-size: 12px; text-align: justify;\"><span style=\"font-size: x-large;\">Chất liệu: Tơ nhung</span></p>\r\n<p style=\"margin-top: 0px; margin-bottom: 20px; font-family', '', ''),
(19, 24, 'Đầm 2 Dây Dún Eo M1789', 'Chất liệu:  - Thun Laza và Voan   Kích thước:  - Ngực 88-90cm; Eo 68-70cm; Dài 80cm', '300', 0x6e75322e6a7067, 11, '', '', ''),
(20, 24, 'ĐẦM REN TRẮNG XÒE CHÉO LƯNG (E317)', 'ĐẦM REN TRẮNG XÒE CHÉO LƯNG (E317)', '189', 0x616e68332e6a7067, 4, '<p><span style=\"padding: 0px; margin: 0px; font-size: 12px; vertical-align: baseline; border: 0px; list-style: none; color: #ff0000; line-height: 14.640000343322754px; background: transparent;\"><strong>Shop c</strong><strong>huy&ecirc;n cung cấp c&aacute;', '', ''),
(21, 24, 'Áo sơ mi phối ren tay hoa GS115', 'Chất liệu:  - Voan phối Ren   Kích thước:  - Freesize, dành cho bạn nữ 43-53kg, cao 1m50 trở lên', '200', 0x6e75342e6a7067, 5, '<h2 style=\"text-align: center;\"><span style=\"font-size: 18px; color: #0000ff;\">Thời Trang Năng Động</span></h2>\r\n<p style=\"text-align: center;\"><span style=\"font-size: 16px;\">Địa chỉ: 28/4 Văn Chung, Phường 13, Quận T&acirc;n B&igrave;nh, TP. Hồ Ch&iacute', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `product_img`
--

CREATE TABLE `product_img` (
  `id` int(11) NOT NULL,
  `file` int(11) NOT NULL,
  `alias` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `resetpassword`
--

CREATE TABLE `resetpassword` (
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `request_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `resetpassword`
--

INSERT INTO `resetpassword` (`username`, `email`, `token`, `request_time`) VALUES
('jelly', 'c5be2d532d66e107e0c85b234bb698dafdd3a8fd1fdf51839a16a5d060ddf57a', '2016-12-13', '2021-02-23 08:52:52');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `account_roles`
--
ALTER TABLE `account_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phonenumber_UNIQUE` (`phonenumber`);

--
-- Indexes for table `import_bill`
--
ALTER TABLE `import_bill`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `import_bill_detail`
--
ALTER TABLE `import_bill_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news_img`
--
ALTER TABLE `news_img`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `product_img`
--
ALTER TABLE `product_img`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `resetpassword`
--
ALTER TABLE `resetpassword`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `username` (`username`(20));

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
