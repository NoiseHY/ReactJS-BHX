﻿--use master
--go
--create database API_BachHoaXanh_ReactJS
--go

--use master
--go
--drop database API_BachHoaXanh_ReactJS

use API_BachHoaXanh_ReactJS
go

-- Tạo bảng Thể loại
CREATE TABLE categories (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nameCat NVARCHAR(250) not null ,
	--motatheloai
	dateBegin datetime default getdate(),
	--ngaysua
	dateEnd datetime
);

INSERT INTO categories (nameCat, dateEnd) VALUES 
(N'Bánh bao, bánh mì, pizza', NULL),
(N'Xúc xích, lạp xưởng tươi', NULL),
(N'Cá viên, bò viên', NULL);

select * from categories

--Tạo bảng đơn vị 
create table units (
	id int identity(1,1) primary key,
	nameUn nvarchar(50) not null,
	dateBegin datetime default getdate(),
	--ngaysua
	dateEnd datetime
)

insert into units (nameUn, dateEnd)
values 
(N'Thùng ', null),
(N'Hộp', null),
(N'Lon', null),
(N'Cái', null),
(N'Chai', null),
(N'Hộp', null),
(N'Gói', null)
;

select * from units

-- Tạo bảng Nhà cung cấp
CREATE TABLE sups (
    id INT IDENTITY(1,1) PRIMARY KEY not null,
    nameSup NVARCHAR(50) not null,
    addressSup NVARCHAR(100) ,
    num NVARCHAR(10),
	stat int default 1,
	dateBegin datetime default getdate(),
	--ngaysua
	dateEnd datetime
);

--drop table sups

INSERT INTO sups (nameSup, addressSup, num)
VALUES
(N'Công ty TNHH Thực phẩm XYZ', N'123 Đường ABC, Quận XYZ, Thành phố XYZ', '0123456789'),
(N'Cửa hàng Thực phẩm ABC', N'456 Đường XYZ, Quận ABC, Thành phố ABC', '0987654321'),
(N'Nhà cung cấp XYZ', N'789 Đường XYZ, Quận XYZ, Thành phố XYZ', '0123456789');

select * from sups


-- Tạo bảng Sản phẩm
CREATE TABLE products (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nameProd NVARCHAR(50) not null,
    desProd NVARCHAR(max) ,
    num INT ,
	--dongia (unit price)
    up DECIMAL(18, 00) ,
	img nvarchar (200),
	rating float,
	viewProd int,
	idCat INT ,
	idUnits int,
	stat int default 1,
	dateBegin datetime default getdate(),
	--ngaysua
	dateEnd datetime
	Foreign key (idCat) references categories(id) on delete cascade on update cascade,
	foreign key(idUnits) references units(id) on delete cascade on update cascade
);

--drop table products

INSERT INTO products (nameProd, desProd, num, up, idCat, idUnits,img, rating, viewProd,dateEnd) VALUES 
(N'Bò viên Hoa Doanh 200g', N'Bò viên đông lạnh Hoa Doanh là sản phẩm cá viên, bò viên thơm ngon từ nguyên liệu tự nhiên tuyệt vời, được bày bán ở rất nhiều các tụ điểm bán hàng, đa dạng sản phẩm. Bò viên  đông lạnh Hoa Doanh 200g làm từ thịt bò tươi ngon tự nhiên, chế biến được nhiều món ăn ấn tượng, ngon hoàn hảo.'
, 100, 36000, 3, 7, 'gao-co-may-lut-nau-organic-hop-1kg-202106260813001938.jpg', 5, 200,NULL),
(N'Xúc xích Mỹ Le Gourmet gói 500g', N'Xúc xích Le Gourmet sử dụng nguồn nguyên liệu thực phẩm tươi sạch, công nghệ an toàn vệ sinh. Mua Xúc xích Mỹ Le Gourmet gói 500g với công thức tẩm ướp đặc biệt, là loại xúc xích dễ dàng chế biến như chiên, hoặc chế biến thành nhiều món ăn.'
, 100, 43000, 2, 7,'gao-co-may-lut-nau-organic-hop-1kg-202106260813001938.jpg', 3.5, 140,NULL),
(N'Pizza phô mai Manna 120g', N'Là dòng pizza tự chế biến tại nhà, với lớp phô mai Mozzarella dày, béo ngậy được phủ bên trên. Pizza Manna luôn cố gắng đếm lại những sản phẩm chất lượng, an toàn nhất đến người tiêu dùng. Pizza phô mai Manna hộp 120g - sự lựa chọn của nhanh chóng, tiện lợi.'
, 100, 28000, 1, 7,'gao-co-may-lut-nau-organic-hop-1kg-202106260813001938.jpg', 4, 320,NULL);

select * from products

-- Tạo bảng chi tiết sản phẩm
create table prodDetails (
	id int identity(1,1) primary key,
	--thanhphan(ingredient)
	ing nvarchar(500) default N'Không có ',
	--luuy
	note nvarchar(200) default N'Không có ',
	--baoquan
	stor nvarchar(200) default N'Không có ',
	--nsx (place of production)
	pop nvarchar(100),
	--donvi
	idUnit int,
	--thuonghieu
	idSup int,
	idProd int,
	img nvarchar(max),
	dateBegin datetime default getdate(),
	--ngaysua
	dateEnd datetime,
	foreign key (idUnit) references units(id) ,
	foreign key (idSup) references sups(id),
	foreign key (idProd) references products(id) on delete cascade on update cascade 
)

--drop table prodDetails

INSERT INTO prodDetails (ing, note, stor, pop, idUnit, idSup, idProd, img)
VALUES
(N'123',N'123', N'123', N'Việt Nam', 1, 1, 1, N'banh-bao-nhan-khoai-mon-cp-270g-202212261129150539.jpg, 
banh-bao-nhan-khoai-mon-cp-270g-202212261129142314.jpg'),
(N'123', N'123', N'123', N'Argentina', 2, 2, 2, null),
(N'123', N'123', N'123', N'Việt Nam', 3, 3,3, null );

select * from prodDetails;



-- Tạo bảng Khách hàng
CREATE TABLE custs (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nameCus NVARCHAR(100) not null,
    addressCus NVARCHAR(100) ,
    num NVARCHAR(10) ,
	email nvarchar(100),
	dateBegin datetime default getdate(),
	--ngaysua
	dateEnd datetime
);

ALTER TABLE custs
ADD img NVARCHAR(MAX);


--drop table custs

insert into custs (
    nameCus ,
    addressCus ,
    num ,
	email ,
	--ngaysua
	dateEnd
)
values
	(N'Nguyễn Công Nam', N'Hưng Yên', '0123456789', 'congnamhy1@gmail.com', null)

insert into custs (
    nameCus ,
    addressCus ,
    num ,
	email ,
	--ngaysua
	dateEnd
)
values
	(N'Nguyễn Nam', N'Hưng Yên', '0123456789', 'congnamhy1@gmail.com', null)

UPDATE custs
SET img = 'istockphoto-1495088043-612x612.jpg'
WHERE id = 1;


select * from custs

-- Tạo bảng Giảm giá (discount)
CREATE TABLE discs (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nameDsc NVARCHAR(20) not null,
    dateBegin DATE ,
    dateEnd DATE ,
	--dieukien
    note NVARCHAR(1000),
	dateBegin2 datetime default getdate(),
	--ngaysua
	dateEnd2 datetime
);

-- Tạo bảng Hóa đơn bán (invoice)
CREATE TABLE invs (
    id INT IDENTITY(1,1) PRIMARY KEY,
	--tongtien
    countInv DECIMAL(18,0) ,
    idCus INT ,
	dateBegin datetime default getdate(),
	--ngaysua
	dateEnd datetime,
    FOREIGN KEY (idCus) REFERENCES custs(id) on delete cascade on update cascade
);

-- Tạo bảng Chi tiết hóa đơn bán
CREATE TABLE invDetails (
    id INT IDENTITY(1,1) PRIMARY KEY not null,
    idInv INT ,
    idPro INT ,
    num INT ,
    up DECIMAL(18,0) ,
    countInv DECIMAL(18,0) not null,
	idDisc INT ,
	Foreign key (idInv) references invs(id) on delete cascade on update cascade,
    FOREIGN KEY (idPro) REFERENCES products(id) on delete cascade on update cascade,
	foreign key (idDisc) references discs (id) on delete cascade on  update cascade
 );

-- Tạo bảng Hóa đơn nhập (purchase order)
CREATE TABLE po (
    id INT IDENTITY(1,1) PRIMARY KEY,
    countPo DECIMAL(18,2) ,
    datePo datetime default getdate(),
    idSup INT not null,
    FOREIGN KEY (idSup) REFERENCES Sups(id) on delete cascade on update cascade
);

-- Tạo bảng Chi tiết hóa đơn nhập
CREATE TABLE poDetails (
    id INT IDENTITY(1,1) PRIMARY KEY,
	idPo INT ,
    idPro INT ,
    num INT ,
    up DECIMAL(18,0) ,
    countPo DECIMAL(18,0),
	dateBegin datetime default getdate(),
	--ngaysua
	dateEnd datetime
    FOREIGN KEY (idPo) REFERENCES po(id) on delete cascade on  update cascade,
    FOREIGN KEY (idPro) REFERENCES products(id) on delete cascade on  update cascade
);


-- Tạo bảng Phân quyền (authorization)
CREATE TABLE auth (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nameAuth NVARCHAR(50) not null,
    desAuth NVARCHAR(200) ,
	dateBegin datetime default getdate(),
	--ngaysua
	dateEnd datetime
)

insert into auth (
    nameAuth ,
    desAuth  ,
	dateEnd)
values
	('admin', N'Quản trị hệ thống', null),
	('customer', N'Khách hàng', null)

select * from auth

-- Tạo bảng Tài khoản
CREATE TABLE acc (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nameAcc NVARCHAR(50) not null,
    pasAcc NVARCHAR(50) not null,
	email NVARCHAR(50) ,
    idAuth INT not null,
    idCuts INT ,
	timeLogin datetime,
	dateBegin datetime default getdate(),
	--ngaysua
	dateEnd datetime,
	checkAcc int default '1',
	-- duy nhất 
	CONSTRAINT UQ_nameAcc UNIQUE (nameAcc),
    FOREIGN KEY (idAuth) REFERENCES auth(id) on delete cascade on update cascade,
    FOREIGN KEY (idCuts) REFERENCES custs(id) on delete cascade on  update cascade
	);

--drop table acc 

insert into acc (
    nameAcc ,
    pasAcc,
	email ,
    idAuth,
    idCuts  ,
	dateEnd
	)
values 
	('admin', '123', 'congnamhy1@gmail.com', 1, null, null),
	('nam', '123', '123@gmail.com', 2, 1, null)

select * from acc

--drop table acc 

-- Tạo bảng giỏ hàng
CREATE TABLE cart (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idCust INT, 
    dateBegin datetime DEFAULT GETDATE(),
    dateEnd datetime,
    FOREIGN KEY (idCust) REFERENCES custs(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO cart (idCust)
VALUES
(1);



select * from cart

--drop table cart 

-- Bảng chi tiết giỏ hàng (cartDetails)
CREATE TABLE cartDetails (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idCart INT, 
    idPro INT,  
    num INT,    
    dateBegin datetime DEFAULT GETDATE(),
    dateEnd datetime,
    FOREIGN KEY (idCart) REFERENCES cart(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (idPro) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Thêm dữ liệu vào bảng chi tiết giỏ hàng (cartDetails)
INSERT INTO cartDetails (idCart, idPro, num)
VALUES
(1, 1, 2),   
(1, 2, 1);   

select * from cartDetails

-- Tạo bảng bình luận 
CREATE TABLE cmt (
    id INT IDENTITY(1,1) PRIMARY KEY,
    idPro INT, 
    idAcc INT,
	--danhgia
    review INT, 
	cmt NVARCHAR(250),
    dateBegin datetime default getdate(),
	--ngaysua
	dateEnd datetime, 
	foreign key (idPro) references products (id) on delete cascade on  update cascade,
	foreign key (idAcc) references acc (id) on delete cascade on  update cascade
);
--


