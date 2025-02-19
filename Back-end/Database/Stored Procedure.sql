﻿use API_BachHoaXanh_ReactJS
go

--- bảng sản phẩm ---

-- lấy 10 sản phẩm mới nhất 
CREATE PROCEDURE GetNewProducts
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 10
        id, nameProd, desProd, num, up , img, rating
    FROM 
        products
    ORDER BY 
        dateBegin DESC;
END;


exec GetNewProducts 

-- lấy sản phẩm được xem nhiều nhất 
CREATE PROCEDURE GetBestViewProducts
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 10
        id, nameProd, desProd, num, up, img, rating, viewProd
    FROM 
        products
    ORDER BY 
        viewProd DESC, rating DESC;
END;

exec  GetBestViewProducts

--Lấy chi tiết sản phẩm theo id
CREATE PROCEDURE GetProductByID
    @ProductId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        P.id AS idProd,
        P.nameProd AS nameProd,
        P.desProd AS desProd,
        P.num AS num,
        P.up AS up,
        P.rating AS rating,
        P.idCat AS idCat,
        P.idUnits AS idUnits,
        P.img AS img,
        PD.ing AS ing,
        PD.note AS note,
        PD.stor AS stor,
        PD.pop AS pop,
		PD.img AS imgDetails,
        U.nameUn AS nameUn,
        S.nameSup AS nameSup,
        C.nameCat AS nameCat
    FROM 
        products P
    LEFT JOIN 
        prodDetails PD ON P.id = PD.idProd
    LEFT JOIN 
        units U ON PD.idUnit = U.id
    LEFT JOIN 
        sups S ON PD.idSup = S.id
    LEFT JOIN 
        categories C ON P.idCat = C.id
    WHERE 
        P.id = @ProductId;
END;


exec GetProductByID 1	

--drop procedure GetProductByID

---> admin
-- stored procedure để lấy tất cả các sản phẩm trong bảng sản phẩm 
CREATE PROCEDURE GetAllProducts
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM 
        products;
END;

exec GetAllProducts

--drop procedure GetAllProducts

--stored procedure để thêm một sản phẩm mới
CREATE PROCEDURE AddProduct
    @nameProd NVARCHAR(50),
    @desProd NVARCHAR(MAX),
    @num INT,
    @up DECIMAL(18, 0),
    @img NVARCHAR(200),
    @rating FLOAT,
    @viewProd INT,
    @idCat INT,
    @idUnits INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO products (nameProd, desProd, num, up, img, rating, viewProd, idCat, idUnits, dateBegin)
    VALUES (@nameProd, @desProd, @num, @up, @img, @rating, @viewProd, @idCat, @idUnits, GETDATE());
END;

-- stored procedure để sửa sản phẩm 
CREATE PROCEDURE UpdateProduct
    @id INT,
    @nameProd NVARCHAR(50),
    @desProd NVARCHAR(MAX),
    @num INT,
    @up DECIMAL(18, 0),
    @img NVARCHAR(200),
    @rating FLOAT,
    @viewProd INT,
    @idCat INT,
    @idUnits INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE products
    SET 
        nameProd = @nameProd,
        desProd = @desProd,
        num = @num,
        up = @up,
        img = @img,
        rating = @rating,
        viewProd = @viewProd,
        idCat = @idCat,
        idUnits = @idUnits,
        dateEnd = GETDATE() -- Cập nhật ngày sửa
    WHERE 
        id = @id;
END;

-- stored procedure để xóa 
CREATE PROCEDURE DeleteProduct
    @id INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM products
    WHERE id = @id;
END;

--- bảng chi tiết sản phẩm ---
-- sửa
CREATE PROCEDURE AddProductDetail
    @idProd INT,
    @ing NVARCHAR(500) = N'Không có',
    @note NVARCHAR(200) = N'Không có',
    @stor NVARCHAR(200) = N'Không có',
    @pop NVARCHAR(100),
    @idUnit INT,
    @idSup INT,
    @img NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO prodDetails (idProd, ing, note, stor, pop, idUnit, idSup, img, dateBegin)
    VALUES (@idProd, @ing, @note, @stor, @pop, @idUnit, @idSup, @img, GETDATE());
    
END;

-- xóa
CREATE PROCEDURE DeleteDetails
    @id INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM prodDetails
    WHERE id = @id;
END;

exec DeleteDetails 4

--- bảng tài khoản ---

---> user



--> admin

-- >>> Đăng nhập 

CREATE PROCEDURE LoginAccount
    @Username NVARCHAR(50),
    @Password NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1 
        FROM acc 
        WHERE nameAcc = @Username AND pasAcc = @Password
    )
    BEGIN
        -- Lấy thông tin tài khoản nếu hợp lệ
        DECLARE @idAuth INT, @idCuts INT, @idCart INT;

        SELECT @idAuth = idAuth, @idCuts = idCuts
        FROM acc 
        WHERE nameAcc = @Username AND pasAcc = @Password;

        -- Lấy id của giỏ hàng
        SELECT @idCart = id
        FROM cart
        WHERE idCust = @idCuts;

        -- Cập nhật thời gian đăng nhập
        UPDATE acc
        SET timeLogin = GETDATE()
        WHERE nameAcc = @Username AND pasAcc = @Password;

        -- Trả về thông tin tài khoản, idAuth, idCuts và idCart
        SELECT 1 AS Result, @idAuth AS idAuth, @idCuts AS idCuts, @idCart AS idCart;
    END
    ELSE
    BEGIN
        -- Tài khoản không hợp lệ
        SELECT 0 AS Result;
    END
END;


--drop procedure LoginAccount;

exec LoginAccount admin, 123; 
exec LoginAccount nam, 123; 

--stored procedure SQL Server để lấy img

CREATE PROCEDURE GetAccountImgAndCartCount
    @id INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @img NVARCHAR(MAX);
    DECLARE @CartProductCount INT;

    -- Lấy img của tài khoản theo id
    SELECT 
        @img = img 
    FROM 
        custs 
    WHERE 
        id = @id;

    -- Lấy số lượng sản phẩm có trong giỏ hàng theo idCust
    SELECT 
        @CartProductCount = COUNT(*)
    FROM 
        cartDetails 
    WHERE 
        idCart = (SELECT id FROM cart WHERE idCust = @id);

    -- Trả về kết quả cuối cùng
    SELECT 
        @img AS img,
        @CartProductCount AS CartProductCount;
END;


--drop procedure GetAccountImgAndCartCount

exec GetAccountImgAndCartCount 1

--get all 

CREATE PROCEDURE GetAllAccounts
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        id, nameAcc, pasAcc, email, idAuth, idCuts, dateBegin, dateEnd, checkAcc
    FROM 
        acc;
END;

--drop procedure GetAllAccounts

exec GetAllAccounts

--create account
CREATE PROCEDURE CreateAccount
    @Name NVARCHAR(50),
    @Password NVARCHAR(50),
    @Email NVARCHAR(50),
    @AuthorizationID INT,
    @CustomerID INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO acc (nameAcc, pasAcc, email, idAuth, idCuts, dateBegin)
    VALUES (@Name, @Password, @Email, @AuthorizationID, @CustomerID, GETDATE());
END;

--edit account
CREATE PROCEDURE UpdateAccount
    @AccountID INT,
    @Name NVARCHAR(50) = NULL,
    @Password NVARCHAR(50) = NULL,
    @Email NVARCHAR(50) = NULL,
    @AuthorizationID INT = NULL,
    @CustomerID INT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE acc
    SET
        nameAcc = ISNULL(@Name, nameAcc),
        pasAcc = ISNULL(@Password, pasAcc),
        email = ISNULL(@Email, email),
        idAuth = ISNULL(@AuthorizationID, idAuth),
        idCuts = ISNULL(@CustomerID, idCuts),
		dateEnd = GETDATE()
    WHERE
        id = @AccountID;
END;

EXEC UpdateAccount @AccountID = 10, @Email = 'newemail123@example.com', @AuthorizationID = 2;

select * from acc

--delete acc

CREATE PROCEDURE DeleteAccount
    @AccountID INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM acc
    WHERE id = @AccountID;
END;


EXEC DeleteAccount @AccountID = 4;

select * from acc

-- bảng giỏ hàng (cart ) 

-- thêm một sản phẩm vào giỏ hàng
CREATE PROCEDURE AddProductToCart
    @CustomerId INT,
    @ProductId INT,
    @Quantity INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @CartId INT;

    -- Tạo một giỏ hàng mới nếu khách hàng chưa có giỏ hàng
    IF NOT EXISTS (SELECT 1 FROM cart WHERE idCust = @CustomerId)
    BEGIN
        INSERT INTO cart (idCust) VALUES (@CustomerId);
        SET @CartId = SCOPE_IDENTITY();
    END
    ELSE
    BEGIN
        SELECT @CartId = id FROM cart WHERE idCust = @CustomerId;
    END;

    -- Thêm sản phẩm vào giỏ hàng chi tiết
    INSERT INTO cartDetails (idCart, idPro, num) VALUES (@CartId, @ProductId, @Quantity);

END;

-- kiểm tra xem một sản phẩm có trong giỏ hàng k

CREATE PROCEDURE CheckProductInCart
    @UserId INT,
    @ProductId INT,
    @IsInCart BIT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra xem sản phẩm có trong giỏ hàng của người dùng không
    IF EXISTS (
        SELECT 1 
        FROM CartItems 
        WHERE UserId = @UserId AND ProductId = @ProductId
    )
    BEGIN
        SET @IsInCart = 1; -- Sản phẩm có trong giỏ hàng
    END
    ELSE
    BEGIN
        SET @IsInCart = 0; -- Sản phẩm không có trong giỏ hàng
    END
END;

--lấy chi tiết giỏ hàng theo id
CREATE PROCEDURE GetCartDetailsByCustomerId
    @CustomerId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        CD.id AS CartDetailId,
        CD.idCart AS CartId,
        P.id AS ProductId,
        P.nameProd AS ProductName,
        P.desProd AS ProductDescription,
        P.up AS UnitPrice,
		p.img AS Img,
        CD.num AS Quantity,
        U.nameUn AS UnitName,
        S.nameSup AS SupplierName
    FROM 
        cart C
    INNER JOIN 
        cartDetails CD ON C.id = CD.idCart
    INNER JOIN 
        products P ON CD.idPro = P.id
    LEFT JOIN 
        units U ON P.idCat = U.id
    LEFT JOIN 
        sups S ON P.id = S.id
    WHERE 
        C.idCust = @CustomerId;
END;

--drop procedure GetCartDetailsByCustomerId

exec GetCartDetailsByCustomerId 1

--stored procedure để thêm nhiều sản phẩm vào giỏ hàng
CREATE PROCEDURE AddMultipleProductsToCart
    @CustomerId INT,
    @Products NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @CartId INT;

    -- Tạo giỏ hàng mới nếu không có
    IF NOT EXISTS (SELECT 1 FROM cart WHERE idCust = @CustomerId)
    BEGIN
        INSERT INTO cart (idCust, dateBegin)
        VALUES (@CustomerId, GETDATE());

        SET @CartId = SCOPE_IDENTITY();
    END
    ELSE
    BEGIN
        SELECT @CartId = id FROM cart WHERE idCust = @CustomerId;
    END

    -- Chuyển đổi danh sách sản phẩm từ JSON sang bảng
    DECLARE @ProductTable TABLE (
        ProductId INT,
        Quantity INT
    );

    INSERT INTO @ProductTable (ProductId, Quantity)
    SELECT ProductId, Quantity
    FROM OPENJSON(@Products)
    WITH (
        ProductId INT '$.ProductId',
        Quantity INT '$.Quantity'
    );

    -- Thêm sản phẩm vào chi tiết giỏ hàng
    INSERT INTO cartDetails (idCart, idPro, num, dateBegin)
    SELECT @CartId, ProductId, Quantity, GETDATE()
    FROM @ProductTable;
END;
--
CREATE PROCEDURE DeleteCartDetails
    @id INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM cartDetails
    WHERE id = @id;
END;

--drop procedure DeleteCartDetails

--> bảng hóa đơn 

-- stored procedure để thêm nhiều sản phẩm vào chi tiết hóa đơn
CREATE PROCEDURE AddMultipleProductsToInvoiceDetails
    @CustomerId INT,
    @CountInv DECIMAL,
    @Products NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    -- Tạo hóa đơn mới
    DECLARE @NewInvoiceId INT;
    INSERT INTO invs (countInv, idCus, dateBegin)
    VALUES (@CountInv, @CustomerId, GETDATE());
    SET @NewInvoiceId = SCOPE_IDENTITY();

    -- Chuyển đổi danh sách sản phẩm từ JSON sang bảng
    DECLARE @ProductTable TABLE (
        ProductId INT,
        Quantity INT
    );

    INSERT INTO @ProductTable (ProductId, Quantity)
    SELECT idPro, num
    FROM OPENJSON(@Products)
    WITH (
        idPro INT '$.idPro',
        num INT '$.num'
    );

    -- Thêm sản phẩm vào chi tiết hóa đơn
    INSERT INTO invDetails (idInv, idPro, num, up, countInv)
    SELECT @NewInvoiceId, PT.ProductId, PT.Quantity, P.up, PT.Quantity * P.up
    FROM @ProductTable PT
    INNER JOIN products P ON PT.ProductId = P.id;

    -- Cập nhật tổng tiền trong hóa đơn
    UPDATE invs
    SET countInv = (SELECT SUM(countInv) FROM invDetails WHERE idInv = @NewInvoiceId)
    WHERE id = @NewInvoiceId;
END;


--drop procedure AddMultipleProductsToInvoiceDetails


-- stored procedure để lấy chi tiết hóa đơn bán dựa trên mã hóa đơn bán 
CREATE PROCEDURE GetInvoiceDetailsByInvoiceId
    @InvoiceId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        ID.id AS InvoiceDetailId,
        ID.idInv AS InvoiceId,
        P.id AS ProductId,
        P.nameProd AS ProductName,
        ID.num AS Quantity,
        ID.up AS UnitPrice,
        ID.countInv AS TotalPrice,
        D.nameDsc AS DiscountName,
        D.note AS DiscountNote
    FROM 
        invDetails ID
    INNER JOIN 
        products P ON ID.idPro = P.id
    LEFT JOIN 
        discs D ON ID.idDisc = D.id
    WHERE 
        ID.idInv = @InvoiceId;
END;


--drop procedure GetInvoiceDetailsByInvoiceId

exec GetInvoiceDetailsByInvoiceId 10

--stored procedure để lấy tất cả chi tiết hóa đơn bán và tổng tiền
CREATE PROCEDURE GetInvoiceDetailsByID
    @InvoiceID INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Lấy thông tin tổng tiền của hóa đơn bán từ bảng invs
    SELECT 
        invDetails.id AS InvoiceDetailID,
        invDetails.idPro AS ProductID,
        products.nameProd AS ProductName,
        products.img AS Img,
        invDetails.num AS Quantity,
        invDetails.up AS UnitPrice,
        invDetails.countInv AS TotalPrice
    FROM 
        invs
    INNER JOIN 
        invDetails ON invs.id = invDetails.idInv
    INNER JOIN 
        products ON invDetails.idPro = products.id
    WHERE 
        invs.id = @InvoiceID;
END;

--drop procedure GetInvoiceDetailsByID
exec GetInvoiceDetailsByID 10

-- stored procedure để lấy tất cả hóa đơn bán theo mã khách hàng
CREATE PROCEDURE GetInvoicesByCustomerID
    @CustomerId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        *
    FROM 
        invs
    WHERE 
        idCus = @CustomerId;
END;

--drop procedure GetInvoicesByCustomerID

exec GetInvoicesByCustomerID 1

-- stored procedure để lấy ID của hóa đơn bán mới nhất
CREATE PROCEDURE GetLatestInvoiceID
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @LatestInvoiceID INT;

    -- Lấy ID của hóa đơn bán mới nhất
    SELECT TOP 1 @LatestInvoiceID = id
    FROM invs
    ORDER BY dateBegin DESC;

    -- Trả về ID của hóa đơn bán mới nhất
    SELECT @LatestInvoiceID AS id;
END;

--drop procedure GetLatestInvoiceID

exec GetLatestInvoiceID

--> bảng khách hàng

-- stored procedure để lấy thông tin của khách hàng
CREATE PROCEDURE GetCustomerByID
    @CustomerId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM custs
    WHERE id = @CustomerId;
END;

exec GetCustomerByID 1

-- bảng danh mục --
-- lấy theo id 
CREATE PROCEDURE GetCatByID
    @CategoryID INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Lấy thông tin của danh mục
    SELECT 
        id ,
        nameCat
    FROM 
        categories
    WHERE 
        id = @CategoryID;
END;

--drop procedure GetCatByID

exec GetCatByID 1 

-- lấy tất cả 
CREATE PROCEDURE GetAllCategories
AS
BEGIN
    SET NOCOUNT ON;

    -- Lấy thông tin của tất cả các danh mục
    SELECT 
        *
    FROM 
        categories;
END;

--drop procedure GetAllCategories

exec GetAllCategories 
--
CREATE PROCEDURE AddCat
    @nameCat NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO cats (nameCat)
    VALUES (@nameCat);

    -- Trả về ID của danh mục vừa được thêm
    SELECT SCOPE_IDENTITY() AS NewCatID;
END;
--
CREATE PROCEDURE UpdateCat
    @id INT,
    @nameCat NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE cats
    SET nameCat = @nameCat
    WHERE id = @id;
END;
--
CREATE PROCEDURE DeleteCat
    @id INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM cats
    WHERE id = @id;
END;

-- bảng nhà cung cấp --
-- lấy tất cả 
CREATE PROCEDURE GetAllSups
AS
BEGIN
    SET NOCOUNT ON;

    -- Lấy thông tin của tất cả các đơn vị
    SELECT 
        *
    FROM 
        sups;
END;

exec GetAllSups
--

CREATE PROCEDURE AddSup
    @nameSup NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO sups (nameSup)
    VALUES (@nameSup);

END;
--
CREATE PROCEDURE AddSup
    @nameSup NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO sups (nameSup)
    VALUES (@nameSup);

    -- Trả về ID của nhà cung cấp vừa được thêm
    SELECT SCOPE_IDENTITY() AS NewSupID;
END;
--
CREATE PROCEDURE UpdateSup
    @id INT,
    @nameSup NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE sups
    SET nameSup = @nameSup
    WHERE id = @id;
END;
--
CREATE PROCEDURE DeleteSup
    @id INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM sups
    WHERE id = @id;
END;

-- bảng đơn vị --
-- lấy theo id 
CREATE PROCEDURE GetUnitByID
    @UnitID INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Lấy thông tin của đơn vị
    SELECT 
        id ,
        nameUn
    FROM 
        units
    WHERE 
        id = @UnitID;

END;

--drop procedure GetUnitByID

exec GetUnitByID 1

-- lấy tất cả 
CREATE PROCEDURE GetAllUnits
AS
BEGIN
    SET NOCOUNT ON;

    -- Lấy thông tin của tất cả các đơn vị
    SELECT 
        *
    FROM 
        units;
END;

--drop procedure GetAllUnits

exec GetAllUnits
--
CREATE PROCEDURE AddUnit
    @nameUn NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO units (nameUn)
    VALUES (@nameUn);

END;
--
CREATE PROCEDURE UpdateUnit
    @id INT,
    @nameUn NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE units
    SET nameUn = @nameUn
    WHERE id = @id;
END;
--
CREATE PROCEDURE DeleteUnit
    @id INT
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM units
    WHERE id = @id;
END;
