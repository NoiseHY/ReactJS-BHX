use API_BachHoaXanh_ReactJS
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
        D.ing AS ing,
        D.note AS note,
        D.stor AS stor,
        D.pop AS pop,
        U.nameUn AS nameUn,
        S.nameSup AS nameSup,
        C.nameCat AS nameCat
    FROM 
        products P
    LEFT JOIN 
        detailProd D ON P.id = D.idProd
    LEFT JOIN 
        units U ON D.idUnit = U.id
    LEFT JOIN 
        sups S ON D.idSup = S.id
    LEFT JOIN 
        categories C ON P.idCat = C.id
    WHERE 
        P.id = @ProductId;
END;

exec GetProductByID 1	

--drop procedure GetProductByID


--- bảng tài khoản ---

---> user



--> admin

-- >>> Login 

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
        DECLARE @idAuth INT, @idCuts INT;

        SELECT @idAuth = idAuth, @idCuts = idCuts
        FROM acc 
        WHERE nameAcc = @Username AND pasAcc = @Password;

        -- Cập nhật thời gian đăng nhập
        UPDATE acc
        SET timeLogin = GETDATE()
        WHERE nameAcc = @Username AND pasAcc = @Password;

        -- Trả về thông tin tài khoản và idAuth, idCuts
        SELECT 1 AS Result, @idAuth AS idAuth, @idCuts AS idCuts;
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

--GIỏ hàng (cart ) 

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
